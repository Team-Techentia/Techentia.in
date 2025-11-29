export const CONTENT_CONFIG = {
    revalidate: 3600, // 1 hour ISR
    works: { path: 'content/works', publicPath: '/works', },
    services: { path: 'content/services', publicPath: '/services', },
} as const;