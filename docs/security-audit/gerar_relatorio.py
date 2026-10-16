"""Gera o PDF a partir de dados-auditoria.json e cobertura.json. Não altera a aplicação."""
from pathlib import Path
import json,html,textwrap
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,Flowable,Preformatted,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE=Path(__file__).resolve().parent
D=json.loads((HERE/'dados-auditoria.json').read_text(encoding='utf-8'))
C=json.loads((HERE/'cobertura.json').read_text(encoding='utf-8'))
assert len({f.get('id') for f in D['findings']})==len(D['findings'])
assert not D['findings'], 'Revisar este gerador antes de produzir relatório com achados: não omitir evidências ou issues.'
FONT='Helvetica';BOLD='Helvetica-Bold'
if Path('C:/Windows/Fonts/segoeui.ttf').exists():
 pdfmetrics.registerFont(TTFont('AuditBody','C:/Windows/Fonts/segoeui.ttf'))
 pdfmetrics.registerFont(TTFont('AuditBold','C:/Windows/Fonts/seguisb.ttf'))
 FONT='AuditBody';BOLD='AuditBold'
INK=colors.HexColor('#153f43');MUTED=colors.HexColor('#496365');WASH=colors.HexColor('#e6efe8');LINE=colors.HexColor('#cddad4');NEUTRAL=colors.HexColor('#64748b');STRONG=colors.HexColor('#059669')
SEVERITY={'crítica':'#B91C1C','alta':'#EA580C','média':'#D97706','baixa':'#2563EB','informativa':'#64748B'}
styles=getSampleStyleSheet()
styles.add(ParagraphStyle('BodyAudit',fontName=FONT,fontSize=10,leading=14.5,textColor=INK,spaceAfter=8))
styles.add(ParagraphStyle('SmallAudit',parent=styles['BodyAudit'],fontSize=8.5,leading=12,spaceAfter=5))
styles.add(ParagraphStyle('TinyAudit',parent=styles['BodyAudit'],fontSize=7.8,leading=10.8,spaceAfter=0))
styles.add(ParagraphStyle('H1Audit',fontName=BOLD,fontSize=23,leading=29,textColor=INK,spaceAfter=15))
styles.add(ParagraphStyle('H2Audit',fontName=BOLD,fontSize=13,leading=17,textColor=INK,spaceBefore=8,spaceAfter=9))
styles.add(ParagraphStyle('H2Strong',parent=styles['H2Audit'],textColor=STRONG))
styles.add(ParagraphStyle('CoverAudit',fontName=FONT,fontSize=31,leading=39,textColor=INK,spaceAfter=20))
styles.add(ParagraphStyle('CodeAudit',fontName='Courier',fontSize=8.5,leading=12,backColor=colors.HexColor('#f1f5f3'),borderPadding=9,spaceBefore=4,spaceAfter=10))
styles.add(ParagraphStyle('TableHeader',parent=styles['SmallAudit'],fontName=BOLD,textColor=colors.white,spaceAfter=0))
def P(s,style='BodyAudit'):return Paragraph(html.escape(str(s)).replace('\n','<br/>'),styles[style])
def title(s):return P(s,'H1Audit')
def subtitle(s):return P(s,'H2Audit')
def tbl(rows,widths,repeat=1):
 t=Table([[P(cell,'TableHeader' if i==0 else 'SmallAudit') for cell in row] for i,row in enumerate(rows)],colWidths=widths,repeatRows=repeat,hAlign='LEFT')
 t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,0),.7,INK),('LINEBELOW',(0,1),(-1,-1),.4,LINE),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f6f8f5')])]))
 return t
class ZeroCharts(Flowable):
 def __init__(self):Flowable.__init__(self);self.width=480;self.height=216
 def draw(self):
  c=self.canv;c.setStrokeColor(LINE);c.setLineWidth(17);c.circle(105,119,53,stroke=1,fill=0)
  c.setFillColor(INK);c.setFont(BOLD,35);c.drawCentredString(105,109,'0')
  c.setFont(FONT,10);c.drawCentredString(105,32,'Achados confirmados')
  c.setFont(BOLD,10);c.drawString(220,199,'Contagem por categoria')
  for i,label in enumerate(['C1 / Isolamento','C2 / Permissões','C3 / IDOR','C4 / Segredos','C5 / XSS']):
   y=169-i*30;c.setFont(FONT,9);c.setFillColor(MUTED);c.drawString(220,y,label)
   c.setStrokeColor(LINE);c.setLineWidth(9);c.line(337,y+3,449,y+3)
   c.setFillColor(INK);c.setFont(BOLD,10);c.drawRightString(477,y,'0')
  c.setFillColor(NEUTRAL);c.setFont(FONT,8);c.drawString(220,10,'Faixas sem preenchimento: nenhum achado.')

def page_frame(c,doc):
 c.saveState();w,h=A4;c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(56.7,h-38, w-56.7,h-38);c.line(56.7,39,w-56.7,39)
 c.setFont(FONT,8);c.setFillColor(MUTED);c.drawString(56.7,h-30,'AUDITORIA DE SEGURANÇA / PORTFÓLIO')
 c.drawString(56.7,25,D['date']+' | Revisão local, não destrutiva')
 c.drawRightString(w-56.7,25,f'Página {doc.page}');c.restoreState()

story=[]
story += [Spacer(1,43),P('RELATÓRIO TÉCNICO / SEGURANÇA','SmallAudit'),Spacer(1,14),P('Relatório de Auditoria de Segurança','CoverAudit'),P(D['project'],'H2Audit'),Spacer(1,20)]
story += [tbl([['Data e escopo','Versão examinada'],[D['date']+' / '+D['timezone'],'Cinco categorias da skill auditoria-seguranca-codigo'],['Modo de execução','Observação do código; relatório e fontes estruturadas'],['Base Git',D['base_commit']],['Snapshot da aplicação',D['snapshot']]], [135,347])]
story += [Spacer(1,22),P('0 vulnerabilidades confirmadas','H1Audit'),P('Três categorias não se aplicam à stack atual. Segredos e XSS foram examinados nos fluxos disponíveis. O resultado não significa ausência garantida de vulnerabilidades.'),P('Metodologia: inventário da aplicação, rastreio de entradas e destinos de renderização, verificação do histórico Git local e busca de padrões de credenciais no bundle. Não foram executados ataques contra serviços reais.'),P('O relatório registra a árvore de trabalho após as melhorias autorizadas de SEO e acessibilidade. Nenhuma correção de segurança, issue pública, commit ou push foi executada nesta auditoria.','SmallAudit'),PageBreak()]
story += [title('Resumo executivo'),P('Não foi confirmado fluxo explorável nas cinco categorias avaliadas. A aplicação distribui conteúdo público, sem backend autenticado, banco de dados ou objetos privados por usuário.'),ZeroCharts()]
counts=[['Severidade','Contagem']]+[[k.capitalize(),'0'] for k in SEVERITY]
story += [tbl(counts,[350,132]),Spacer(1,12),P('A rosca fica neutra porque a contagem é zero. Não há fatias artificiais. Pontos fortes e recomendações informativas não entram na contagem de vulnerabilidades.','SmallAudit'),P('Paleta de severidade: crítica #B91C1C; alta #EA580C; média #D97706; baixa #2563EB. Pontos fortes #059669; informações e limites em cinza.','SmallAudit'),PageBreak()]
story += [title('Stack e superfície examinada')]
for k,v in D['stack'].items():story.append(P(k.capitalize()+': '+v))
inv=D['inventory']
story += [subtitle('Inventário de autorização e objetos'),P('Handlers de backend: 0. Gates de papel autenticado no frontend: 0. Os atributos role encontrados são semântica de acessibilidade; não controlam privilégios.'),P('Controles públicos: '+', '.join(inv['public_controls'])+'.'),P(f"Corpus atual: {inv['files']} arquivos no manifesto, dos quais {inv['text_files']} textuais. Histórico local não raso: {inv['git_commits']} commits e {inv['historical_text_blobs']} blobs textuais examinados. {inv['historical_binary_blobs']} blobs binários históricos não foram decodificados."),P('Bundle disponível: '+', '.join(inv['bundles'])+'.','SmallAudit'),PageBreak()]
story += [title('Resultado por categoria')]
rows=[['Categoria','Estado','Resultado e motivo']]
for item in D['categories']:rows.append([item['id']+' / '+item['name'],item['status'],item['reason']])
story += [tbl(rows,[126,100,256]),Spacer(1,12),subtitle('Tabela de achados detalhados'),tbl([['Severidade','Arquivo:linha','Descrição'],['Nenhuma','Não aplicável','0 achados confirmados. Não há vulnerabilidade a atribuir a arquivo/linha.']],[90,110,282]),P('Ausência de banco ou autenticação não é uma falha nesta aplicação pública. Caso essas superfícies sejam adicionadas, as categorias C1, C2 e C3 precisam ser reavaliadas.','SmallAudit'),PageBreak()]
for chunk in [D['evidence'][:3],D['evidence'][3:]]:
 story.append(title('Pontos fortes com evidências'))
 for e in chunk:
  story += [P(e['id']+' / '+e['file'],'H2Strong'),P(f"Linha {e['line_start']} da árvore de trabalho examinada.",'SmallAudit'),Preformatted('\n'.join(textwrap.wrap(e['snippet'],width=72,replace_whitespace=False,drop_whitespace=False)),styles['CodeAudit']),P(e['note']),Spacer(1,8)]
 story += [P('Referências de linha pertencem ao snapshot local desta revisão. Não são linhas de revisões históricas.','SmallAudit'),PageBreak()]
story += [title('Limites e observações')]
for i,note in enumerate(D['limits'],1):story.append(P(str(i)+'. '+note))
story.append(subtitle('Pontos de atenção, sem classificação de vulnerabilidade'))
for note in D['weaknesses']:story += [P(note['file']+' / '+note['type'],'SmallAudit'),P(note['note'])]
story += [PageBreak(),title('Recomendações priorizadas')]
for r in D['recommendations']:story += [subtitle(r['priority']+' / '+r['title']),P(r['description'])]
story += [subtitle('Reprodução e rastreabilidade'),P('A partir da raiz do repositório, execute:','SmallAudit'),Preformatted('python docs/security-audit/varrer_segredos.py\npython docs/security-audit/gerar_relatorio.py',styles['CodeAudit']),P('O scanner usa somente a biblioteca padrão do Python e o Git. O gerador usa ReportLab. Os dados estruturados e a cobertura registram a revisão humana; executar o scanner ou o gerador não substitui uma nova análise dos fluxos.'),P('SHA-256 do manifesto do snapshot:\n'+D['snapshot_sha256'],'SmallAudit'),PageBreak()]
story += [title('Cobertura por arquivo'),P('Cada categoria e seu motivo estão detalhados em cobertura.json. A tabela compacta abaixo cobre todos os arquivos textuais do manifesto. Assets binários têm hash registrado, com inspeção de conteúdo sensível declarada como não verificada.'),P('T = tenant/dono; A = autorização; I = IDOR; S = segredos; X = XSS. NA = não aplicável; V = verificado por padrões; P = protegido nos fluxos revisados.','SmallAudit')]
rows=[['Arquivo / linhas','T','A','I','S','X']]
for item in C:
 rows.append([item['file']+' / '+str(item['lines']),'NA','NA','NA','V','P' if item['categories']['xss']['status']=='protegido' else 'NA'])
coverage_table=tbl(rows,[302,36,36,36,36,36])
coverage_table.setStyle(TableStyle([('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
story += [coverage_table,Spacer(1,12),P('Os arquivos binários não recebem status V de ausência de segredos: apenas integridade por hash foi registrada. Ver varredura-segredos.json.','SmallAudit'),PageBreak()]
story += [title('ISSUES PARA O GITHUB'),P('Nenhuma issue de vulnerabilidade foi gerada porque não há achados confirmados. As recomendações preventivas e lacunas de verificação permanecem separadas.'),Preformatted('--- ISSUES ---\n0 achados confirmados nas cinco categorias.\nNenhuma issue para publicar.\n--- FIM ISSUES ---',styles['CodeAudit']),P('O mesmo conteúdo está disponível em issues-github.md. Não houve publicação automática.'),subtitle('Fontes e procedimento')]
for ref in D['references']:story += [P(ref['title'],'SmallAudit'),P(ref['url'],'SmallAudit')]
story += [subtitle('Aceitação e próximos passos'),P('A avaliação humana e a autorização de publicação continuam com o responsável pelo projeto. Mudanças no backend, nas integrações ou nas fontes de conteúdo exigem nova revisão proporcional ao risco.')]
output=HERE/'relatorio-auditoria-seguranca.pdf'
doc=SimpleDocTemplate(str(output),pagesize=A4,rightMargin=56.7,leftMargin=56.7,topMargin=58,bottomMargin=56,title='Relatório de Auditoria de Segurança - '+D['project'],author='Codex | Revisão técnica para Carlos Henrique Lopes')
doc.build(story,onFirstPage=page_frame,onLaterPages=page_frame)
print(json.dumps({'pdf':str(output),'achados':len(D['findings']),'cobertura':len(C)},ensure_ascii=False))