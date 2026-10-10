// Génère les images d'aperçu (1200 × 630) affichées quand on partage un lien sur WhatsApp,
// Telegram, VK ou les réseaux sociaux. Une image par page, aux couleurs de la marque.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp, { type Sharp } from 'sharp';
import type { Lang } from '../i18n/ui';

// Les chemins partent de la racine du projet (là où l'on lance `npm run build`).
const root = (p: string) => join(process.cwd(), p);
const font = (pkg: string, file: string) => readFile(root(`node_modules/@fontsource/${pkg}/files/${file}`));

let fontsCache: Awaited<ReturnType<typeof loadFonts>> | undefined;
async function loadFonts() {
  const [ys, lora, loraLat, fig4, fig7, golos4, golos6, golosLat, golosExt4, golosExt7] = await Promise.all([
    font('young-serif', 'young-serif-latin-400-normal.woff'),
    font('lora', 'lora-cyrillic-600-normal.woff'),
    font('lora', 'lora-latin-600-normal.woff'),
    font('figtree', 'figtree-latin-400-normal.woff'),
    font('figtree', 'figtree-latin-700-normal.woff'),
    font('golos-text', 'golos-text-cyrillic-400-normal.woff'),
    font('golos-text', 'golos-text-cyrillic-600-normal.woff'),
    font('golos-text', 'golos-text-latin-400-normal.woff'),
    // Le signe ₽ est dans le sous-ensemble « latin-ext » de Golos.
    font('golos-text', 'golos-text-latin-ext-400-normal.woff'),
    font('golos-text', 'golos-text-latin-ext-700-normal.woff'),
  ]);
  return [
    { name: 'Young Serif', data: ys, weight: 400 as const, style: 'normal' as const },
    { name: 'Lora', data: lora, weight: 600 as const, style: 'normal' as const },
    { name: 'Lora Latin', data: loraLat, weight: 600 as const, style: 'normal' as const },
    { name: 'Figtree', data: fig4, weight: 400 as const, style: 'normal' as const },
    { name: 'Figtree', data: fig7, weight: 700 as const, style: 'normal' as const },
    { name: 'Golos', data: golos4, weight: 400 as const, style: 'normal' as const },
    { name: 'Golos', data: golos6, weight: 700 as const, style: 'normal' as const },
    { name: 'Golos Latin', data: golosLat, weight: 400 as const, style: 'normal' as const },
    { name: 'Golos Ext', data: golosExt4, weight: 400 as const, style: 'normal' as const },
    { name: 'Golos Ext', data: golosExt7, weight: 700 as const, style: 'normal' as const },
  ];
}

const C = { creme: '#FEF7EE', choco: '#541F12', muted: '#7A5245', miel: '#D3902E', mielInk: '#8A5A12', alveole: '#F6E6CF' };
const HEX_W = 440;
const HEX_H = Math.round(HEX_W * 1.1547);
const hexMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${HEX_W}" height="${HEX_H}"><polygon points="${HEX_W / 2},0 ${HEX_W},${HEX_H / 4} ${HEX_W},${(HEX_H * 3) / 4} ${HEX_W / 2},${HEX_H} 0,${(HEX_H * 3) / 4} 0,${HEX_H / 4}" fill="#fff"/></svg>`,
);

async function hexImage(photo?: string): Promise<string> {
  let base: Sharp;
  if (photo) {
    base = sharp(await readFile(root(`src/assets/photos/${photo}`))).resize(HEX_W, HEX_H, { fit: 'cover' });
  } else {
    // Pas de photo : alvéole miel avec l'abeille au centre.
    const mark = await sharp(await readFile(root('public/ds-mark.svg'))).resize(Math.round(HEX_W * 0.5)).png().toBuffer();
    base = sharp({ create: { width: HEX_W, height: HEX_H, channels: 4, background: C.alveole } }).composite([{ input: mark, gravity: 'center' }]);
  }
  const png = await sharp(await base.png().toBuffer()).composite([{ input: hexMask, blend: 'dest-in' }]).png().toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export interface OgOptions {
  lang: Lang;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Pastille en bas à gauche (prix, horaires…). */
  badge?: string;
  photo?: string;
}

export async function renderOg(o: OgOptions): Promise<Buffer> {
  const fonts = (fontsCache ??= await loadFonts());
  const ru = o.lang === 'ru';
  const display = ru ? 'Lora, Lora Latin' : 'Young Serif';
  const body = ru ? 'Golos, Golos Latin, Golos Ext' : 'Figtree, Golos Ext';
  const mark = `data:image/svg+xml;base64,${(await readFile(root('public/ds-mark.svg'))).toString('base64')}`;
  const titleSize = o.title.length > 34 ? 56 : o.title.length > 22 ? 66 : 78;

  const tree = h('div', { width: 1200, height: 630, display: 'flex', background: C.creme, fontFamily: body, color: C.choco }, [
    h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 720, padding: '56px 0 56px 72px' }, [
      h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        h('img', { width: 64, height: 61 }, undefined, { src: mark }),
        h('div', { fontFamily: 'Young Serif', fontSize: 34 }, 'Double Sestry'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 18 }, [
        h('div', { fontSize: 22, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.mielInk }, o.eyebrow),
        h('div', { fontFamily: display, fontSize: titleSize, lineHeight: 1.04, fontWeight: ru ? 600 : 400 }, o.title),
        o.subtitle ? h('div', { fontSize: 28, lineHeight: 1.35, color: C.muted, maxWidth: 600 }, o.subtitle) : null,
      ].filter(Boolean)),
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        o.badge ? h('div', { background: C.choco, color: C.creme, fontSize: 28, fontWeight: 700, padding: '12px 26px', borderRadius: 999 }, o.badge) : null,
        h('div', { fontSize: 24, color: C.muted }, ru ? 'Брянск · под заказ' : 'Briansk · sur commande'),
      ].filter(Boolean)),
    ]),
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 480 }, [
      h('img', { width: HEX_W * 0.92, height: HEX_H * 0.92 }, undefined, { src: await hexImage(o.photo) }),
    ]),
  ]);

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

/** Adresse de l'image d'aperçu d'une page : /fr/carte/la-sestry/ → /og/fr/carte/la-sestry.png */
export function ogPath(pagePath: string): string {
  const clean = pagePath.replace(/^\/+|\/+$/g, '');
  return `/og/${clean || 'fr'}.png`;
}
