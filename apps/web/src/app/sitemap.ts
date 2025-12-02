// app/sitemap.ts

export default function sitemap() {
    const base = "https://techentia.com";

    return [
        { url: base, lastModified: new Date() },
        { url: `${base}/about` },
        { url: `${base}/services` },
        { url: `${base}/works` },
        { url: `${base}/contact` },
        { url: `${base}/blog` }
    ];
}
