import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = resolve(process.argv[2] ?? 'dist');
const canonical = 'https://portfoliocarloslopes.netlify.app/';
const html = await readFile(resolve(base, 'index.html'), 'utf8');
assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, 'A página deve ter uma única URL canônica.');
assert.ok(html.includes(`rel="canonical" href="${canonical}"`), 'URL canônica incorreta.');
for (const name of ['description', 'author', 'robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
  assert.match(html, new RegExp(`<meta[^>]+name="${name}"[^>]+content="[^\"]+"`), `Metadado ausente: ${name}`);
}
for (const name of ['og:url', 'og:title', 'og:description', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height']) {
  assert.ok(html.includes(`property="${name}"`), `Metadado ausente: ${name}`);
}
const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(json, 'JSON-LD ausente.');
const graph = JSON.parse(json[1])['@graph'];
for (const type of ['WebSite', 'ProfilePage', 'Person']) assert.ok(graph.some(item => item['@type'] === type), `Tipo ausente: ${type}`);
const person = graph.find(item => item['@type'] === 'Person');
assert.ok(person.sameAs.includes('https://github.com/CHCLopes'));
assert.ok(person.sameAs.includes('https://www.linkedin.com/in/carlos-lopes-b445aa201/'));
assert.equal(graph.find(item => item['@type'] === 'ProfilePage').mainEntity['@id'], person['@id']);
const robots = await readFile(resolve(base, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots), 'Rastreamento bloqueado.');
const sitemap = await readFile(resolve(base, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 1, 'Seções com # não são páginas distintas.');
assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
const notFound = await readFile(resolve(base, '404.html'), 'utf8');
assert.ok(notFound.includes('noindex, follow'));
for (const asset of ['social/portfolio-og.jpg', 'hero/agent-layers-640.webp', 'hero/agent-layers-1280.webp']) {
  const info = await stat(resolve(base, asset));
  assert.ok(info.size > 0 && info.size < 200_000, `Imagem ausente ou acima do orçamento: ${asset}`);
}
assert.ok(html.includes('imagesrcset=') && html.includes('fetchpriority="high"'), 'Hero sem preload responsivo prioritário.');
console.log('SEO: canônica, metadados, JSON-LD, robots, sitemap, 404 e orçamento das imagens verificados.');