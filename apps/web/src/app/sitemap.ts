
// app/sitemap.ts
import { getServiceSlugs, getWorkSlugs } from '@/lib/config';

export default function sitemap() {
    const base = "https://techentia.com";
    const works = getWorkSlugs();
    const services = getServiceSlugs();

    return [
        { url: base, lastModified: new Date() },
        { url: `${base}/about` },
        { url: `${base}/services` },
        { url: `${base}/works` },
        { url: `${base}/contact` },
        { url: `${base}/blog` },

        ...services.map(slug => ({
            url: `https://techentia.com/services/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        })),

        ...works.map(slug => ({
            url: `https://techentia.com/works/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))
    ];
}
