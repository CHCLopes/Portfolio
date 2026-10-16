# Auditoria de segurança - Portfólio

Data: 16/10/2026. Modo: observação local após as melhorias autorizadas de SEO e acessibilidade. Sem correções de segurança, commit, push ou publicação de issues.

Resultado: **0 vulnerabilidades confirmadas** nas cinco categorias. Isolamento de tenant/dono, autorização no servidor e IDOR não se aplicam à aplicação estática pública atual. O resultado não é certificação ou garantia de ausência de falhas.

## Arquivos

- [relatorio-auditoria-seguranca.pdf](relatorio-auditoria-seguranca.pdf): Relatório de auditoria em pt-BR.
- [gerar_relatorio.py](gerar_relatorio.py): Gerador reproduzível do PDF com ReportLab.
- [dados-auditoria.json](dados-auditoria.json): Escopo, stack, achados, evidências, limites e recomendações.
- [cobertura.json](cobertura.json): Cobertura por arquivo e por categoria, com motivo.
- [varrer_segredos.py](varrer_segredos.py): Varredura local não destrutiva, com valores sempre mascarados.
- [varredura-segredos.json](varredura-segredos.json): Manifesto de hashes, histórico e candidatos mascarados.
- [issues-github.md](issues-github.md): Rascunhos; nenhum achado confirmado, nenhuma issue publicada.
- [validacao-pdf.json](validacao-pdf.json): Conferências do PDF e estado da inspeção visual.
- [evidencias/visao-geral.png](evidencias/visao-geral.png): Montagem das páginas renderizadas para revisão visual.
- `evidencias/pagina-01.png` até `evidencias/pagina-11.png`: páginas do PDF rasterizadas.

## Regerar

A partir da raiz do repositório, com Python, Git e ReportLab disponíveis:

```bash
python docs/security-audit/varrer_segredos.py
python docs/security-audit/gerar_relatorio.py
```

O scanner registra possíveis candidatos, mas não transforma detecções em vulnerabilidades automaticamente. A revisão humana dos fluxos e a atualização dos dados estruturados continuam necessárias antes de emitir outro relatório. Não use dados antigos para atestar uma versão nova.

O gerador desta entrega aceita apenas o caso revisado de zero achados; caso novos achados sejam confirmados, deve ser ampliado para apresentar toda a evidência e as issues completas. Os valores de credenciais jamais devem aparecer nas saídas.

## Cobertura e limitações

Foram inventariados os arquivos da aplicação e do build e o histórico Git local disponível. O histórico binário não passou por OCR/decodificação. Credenciais reais, ambiente privado do provedor e assessoria de CVEs de dependências não foram testados. O conteúdo de work, outputs, node_modules, .netlify e os artefatos desta auditoria não compõe o código de aplicação auditado. Os arquivos locais não relacionados existentes foram preservados.

Recomendações de CSP e futuras validações de autorização são preventivas; não foram promovidas a vulnerabilidades nem implementadas nesta rodada.
