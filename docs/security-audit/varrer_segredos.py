from pathlib import Path
import subprocess,re,json,hashlib
ROOT=Path.cwd();OUT=ROOT/'docs/security-audit';OUT.mkdir(parents=True,exist_ok=True)
def git(*args): return subprocess.check_output(['git',*args],cwd=ROOT)
patterns={
 'aws_access_key':r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b',
 'github_token':r'\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{70,})\b',
 'google_api_key':r'\bAIza[A-Za-z0-9_-]{35}\b',
 'openai_token':r'\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}\b',
 'slack_token':r'\bxox[baprs]-[A-Za-z0-9-]{10,}\b',
 'credential_url':r'(?i)\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis|amqps?)://[^:\s]+:[^@\s]+@',
 'private_key':r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
 'jwt':r'\beyJ[A-Za-z0-9_-]{5,}\.eyJ[A-Za-z0-9_-]{5,}\.[A-Za-z0-9_-]{10,}\b',
 'literal_credential':r'''(?i)\b(?:password|passwd|token|secret|client[_-]?secret|api[_-]?key|secret[_-]?key|access[_-]?token|accountkey)['"]?\s*[:=]\s*['"]([^'"\n]{6,})['"]''',
}
compiled={k:re.compile(v) for k,v in patterns.items()}
# Values are never written to the evidence file or terminal.
def scan(data,where):
    text=data.decode('utf-8',errors='replace');result=[]
    for label,pattern in compiled.items():
        for m in pattern.finditer(text):
            result.append({**where,'detector':label,'line':text.count('\n',0,m.start())+1,'value':'[MASCARADO]','context_hash':hashlib.sha256(m.group(0).encode()).hexdigest()[:12]})
    return result
tracked=git('ls-files','-z').decode().split('\0')
paths=[p for p in tracked if p and not p.startswith('docs/security-audit/')]
paths += [p for p in git('ls-files','--others','--exclude-standard','-z').decode().split('\0') if p.startswith(('src/','public/','scripts/'))]
current=[];inventory=[]
for rel in sorted(set(paths)):
    p=ROOT/rel
    if not p.is_file(): continue
    data=p.read_bytes();istext=b'\0' not in data[:4096] and p.suffix.lower() not in ['.png','.jpg','.webp','.woff2','.ttf','.pdf','.ico']
    inventory.append({'path':rel,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data),'text':istext,'lines':data.count(b'\n')+1 if istext else None})
    if istext: current+=scan(data,{'scope':'working-tree','path':rel})
blobs={}
for row in git('rev-list','--objects','--all').decode().splitlines():
    sha,_,path=row.partition(' ')
    if path:blobs.setdefault(sha,path)
history=[];scanned=0;binary=0
# cat-file batch avoids one process per historical object.
proc=subprocess.Popen(['git','cat-file','--batch'],cwd=ROOT,stdin=subprocess.PIPE,stdout=subprocess.PIPE)
for sha,path in blobs.items():
    proc.stdin.write((sha+'\n').encode());proc.stdin.flush()
    header=proc.stdout.readline().decode().strip().split()
    if len(header)!=3:continue
    size=int(header[2]);data=proc.stdout.read(size);proc.stdout.read(1)
    if header[1]!='blob':continue
    if b'\0' in data[:8192]:binary+=1;continue
    scanned+=1
    history+=scan(data,{'scope':'git-blob','path':path,'blob':sha})
proc.stdin.close();proc.wait()
dist=[]
for p in (ROOT/'dist').rglob('*'):
    if p.is_file() and p.suffix in ['.html','.js','.css','.json']:
        dist+=scan(p.read_bytes(),{'scope':'build-bundle','path':p.relative_to(ROOT).as_posix()})
result={'head':git('rev-parse','HEAD').decode().strip(),'shallow':git('rev-parse','--is-shallow-repository').decode().strip()=='true','commits':int(git('rev-list','--count','--all')),'history_text_blobs_scanned':scanned,'history_binary_blobs_not_text_scanned':binary,'scope_files':inventory,'candidates':current+history+dist,'bundles':sorted(p.relative_to(ROOT).as_posix() for p in (ROOT/'dist/assets').glob('*.js')),'note':'Detecção por padrões não prova ausência de segredos; histórico local de todas as refs disponíveis. Valores candidatos sempre mascarados. Binários históricos não decodificados como texto.'}
(OUT/'varredura-segredos.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k not in ['scope_files']},ensure_ascii=False))