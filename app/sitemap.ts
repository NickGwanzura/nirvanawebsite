import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/about', '/classes', '/faqs', '/book', '/privacy'].map(path => ({ url: `https://nirvanastudiozw.com${path}` })) }
