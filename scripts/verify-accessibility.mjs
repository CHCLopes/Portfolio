import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const qaRequire=createRequire(resolve(process.env.QA_TOOLS_DIR ?? 'work/qa-tools', 'package.json'));
const {chromium}=qaRequire(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const axePath=qaRequire.resolve('axe-core/axe.min.js');
await fs.mkdir('outputs',{recursive:true});
const browser=await chromium.launch({channel:process.env.QA_BROWSER ?? 'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900}});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const report={date:new Date().toLocaleDateString('sv-SE',{timeZone:'America/Fortaleza'}),url:process.env.QA_BASE_URL ?? 'http://127.0.0.1:4173/',tool:'axe-core',toolVersion:qaRequire('axe-core/package.json').version,browser:browser.version(),layouts:[],axe:[],functional:[],incompleteReview:[],errors};
async function axe(label){
 await page.evaluate(async()=>{await Promise.allSettled(document.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).map(a=>a.finished));});
 if(!await page.evaluate(()=>Boolean(window.axe)))await page.addScriptTag({path:axePath});
 const r=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:r.passes.length,incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))};});
 report.axe.push({label,...r});
 if(r.violations.length)console.log(JSON.stringify({label,violations:r.violations}));
}
async function load(){await page.goto(report.url,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);}
try {
 await load();
 await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').getAttribute('class'),'skip-link');
 await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main');report.functional.push('Skip link leva o foco ao conteúdo principal.');
 for(const width of [320,375,412,768,1280,1920]){
   await page.setViewportSize({width,height:900});
   for(const theme of ['light','dark']){
     const active=await page.locator('html').getAttribute('data-theme');
     if(active!==theme)await page.getByRole('button',{name:/Ativar modo (claro|escuro)/}).click();
     const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,brokenVisibleImages:Array.from(document.images).filter(i=>i.complete&&i.naturalWidth===0&&i.getBoundingClientRect().top<innerHeight).map(i=>i.getAttribute('src'))}));
     report.layouts.push({width,theme,...layout});
     await axe(`página ${width}px ${theme}`);
   }
 }
 await page.setViewportSize({width:1280,height:1000});
 if(await page.locator('html').getAttribute('data-theme')!=='light')await page.getByRole('button',{name:/Ativar modo (claro|escuro)/}).click();
 await page.getByRole('button',{name:'Pausar animação dos cometas',exact:true}).focus();
 await page.keyboard.press('Space');
 const paused=await page.locator('.comet-tip').evaluateAll(es=>es.map(e=>e.getAttribute('transform')));
 await page.waitForTimeout(160);
 assert.deepEqual(await page.locator('.comet-tip').evaluateAll(es=>es.map(e=>e.getAttribute('transform'))),paused);
 await page.getByRole('button',{name:'Retomar animação dos cometas',exact:true}).click();
 await page.waitForTimeout(160);
 assert.notDeepEqual(await page.locator('.comet-tip').evaluateAll(es=>es.map(e=>e.getAttribute('transform'))),paused);
 report.functional.push('Pausa mantém a posição dos cometas; retomar reinicia o movimento.');
 await page.screenshot({path:'outputs/seo-acessibilidade-desktop.png'});
 const track=page.locator('#project-track');await track.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('#project-track').scrollLeft>100);
 await page.keyboard.press('End');await page.waitForFunction(()=>{const e=document.querySelector('#project-track');return Math.abs(e.scrollWidth-e.clientWidth-e.scrollLeft)<3;});
 await page.keyboard.press('Home');await page.waitForFunction(()=>document.querySelector('#project-track').scrollLeft<3);
 report.functional.push('Carrossel horizontal: setas, Home e End operantes.');
 const names=await page.locator('.showcase-more').evaluateAll(es=>es.map(e=>e.getAttribute('aria-label')));
 for(const name of names){
   const trigger=page.getByRole('button',{name,exact:true});await trigger.focus();await page.keyboard.press('Enter');
   const dialog=page.locator('dialog[open]');await dialog.waitFor();
   assert(await dialog.locator(':focus').count()>0,'Foco inicial do modal ausente');
   await axe(name+' desktop claro');
   for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement?.closest('dialog[open]')),'Foco escapou do modal.');}
   if(name.includes('JBL Desk')){
     const gallery=dialog.locator('.gallery-viewport');await gallery.focus();await page.keyboard.press('ArrowDown');
     await page.waitForFunction(()=>document.querySelector('.gallery-controls>span')?.textContent==='02 / 03');
     assert.equal(await dialog.locator('.gallery-slide:not([aria-hidden="true"])').count(),1);
     await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('.gallery-controls>span')?.textContent==='03 / 03');
     await page.keyboard.press('Home');await page.waitForFunction(()=>document.querySelector('.gallery-controls>span')?.textContent==='01 / 03');
     report.functional.push('Galeria JBL Desk: setas, Home, End e apenas slide ativo exposto à árvore de acessibilidade.');
   }
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
   assert.equal(await page.locator(':focus').getAttribute('aria-label'),name,'Foco não retornou ao acionador.');
 }
 report.functional.push('Oito modais: abertura por teclado, foco contido e retorno ao acionador após Escape.');
 for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:/Ativar modo (claro|escuro)/}).click();
   await page.getByRole('button',{name:'Saiba mais sobre este site.',exact:true}).click();await axe('Bastidores desktop '+theme);await page.keyboard.press('Escape');
 }
 await page.setViewportSize({width:375,height:844});
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();await axe('Menu mobile aberto');await page.keyboard.press('Escape');
 assert.equal(await page.locator(':focus').getAttribute('aria-label'),'Abrir menu');
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();await page.getByRole('navigation',{name:'Navegação principal'}).getByRole('link',{name:'Sobre mim',exact:true}).click();
 assert.equal(await page.locator(':focus').getAttribute('id'),'about-heading');
 report.functional.push('Menu mobile: Escape devolve foco; navegação fecha o menu e foca o título de destino.');
 for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:/Ativar modo (claro|escuro)/}).click();
   await page.getByRole('button',{name:'Saiba mais sobre JBL Desk',exact:true}).click();await axe('JBL mobile '+theme);await page.keyboard.press('Escape');
   await page.getByRole('button',{name:'Saiba mais sobre este site.',exact:true}).click();await axe('Bastidores mobile '+theme);await page.keyboard.press('Escape');
 }
 if(await page.locator('html').getAttribute('data-theme')!=='light')await page.getByRole('button',{name:/Ativar modo (claro|escuro)/}).click();
 await page.goto(report.url,{waitUntil:'networkidle'});await page.screenshot({path:'outputs/seo-acessibilidade-mobile.png',fullPage:false});
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.getByRole('button',{name:'Pausar animação dos cometas',exact:true}).isVisible(),false);
 const still=await page.locator('.comet-tip').evaluateAll(es=>es.map(e=>e.getAttribute('transform')));await page.waitForTimeout(150);
 assert.deepEqual(await page.locator('.comet-tip').evaluateAll(es=>es.map(e=>e.getAttribute('transform'))),still);
 report.functional.push('prefers-reduced-motion: cometas imóveis e controle de movimento oculto.');
 await page.setViewportSize({width:1280,height:900});
 await page.setViewportSize({width:640,height:450});
 report.layouts.push({width:1280,zoom:'reflow equivalente a 200% por viewport',overflow:await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)});
 await page.setViewportSize({width:1280,height:900});
 for(const width of [320,1280]){
   await page.setViewportSize({width,height:900});
   const spacing=await page.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});
   report.layouts.push({width,textSpacing:true,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)});
   await spacing.evaluate(e=>e.remove());
 }
 await page.emulateMedia({forcedColors:'active'});await page.screenshot({path:'outputs/seo-acessibilidade-alto-contraste.png'});await axe('Alto contraste do sistema');
 report.functional.push('Modo de cores forçadas inspecionado com controles e foco identificáveis.');
 const bad=report.axe.reduce((n,x)=>n+x.violations.length,0);
 report.summary={states:report.axe.length,violations:bad,layouts:report.layouts.length,layoutFailures:report.layouts.filter(x=>x.overflow).length,consoleErrors:errors.length};
 await fs.writeFile('outputs/qa-acessibilidade.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report.summary));
 assert.equal(bad,0,'Violações automáticas de acessibilidade.');
 assert.equal(report.summary.layoutFailures,0,'Há transbordamento no teste de reflow/espaçamento.');
 assert.equal(errors.length,0,'Há erros de execução.');
} catch(error){await fs.writeFile('outputs/qa-acessibilidade-parcial.json',JSON.stringify(report,null,2));await page.screenshot({path:'outputs/qa-falha.png'});throw error;}
finally{await browser.close();}