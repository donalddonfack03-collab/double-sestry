// robots.txt : autorise Google et Yandex, et indique où se trouve le plan du site.
import type { APIRoute } from 'astro';
import { withBase } from '../i18n/ui';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('sitemap-index.xml'), site).href;
  const body = ['User-agent: *', 'Allow: /', `Disallow: ${withBase('styleguide/')}`, '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
