// lib/types/config.ts

export type WorkCategory = 'web3' | 'ai' | 'saas' | 'mobile' | 'design';
export type ServiceCategory = 'development' | 'consulting' | 'design' | 'ai';

export interface WorkMetadata {
    slug: string;
    title: string;
    description: string;
    client: string;
    category: WorkCategory[];
    tags: string[];
    featured: boolean;
    publishedAt: string;
    completedAt: string;
    thumbnail: string;
    heroImage: string;
    images: string[];
    videos?: string[];
    gifs?: string[];
    testimonial?: { quote: string; author: string; role: string; avatar?: string; };
    metrics?: { label: string; value: string; }[];
    technologies: string[];
    liveUrl?: string;
    caseStudyUrl?: string;
    seo: { title: string; description: string; keywords: string[]; ogImage: string; };
}

export interface ServiceMetadata {
    slug: string;
    title: string;
    description: string;
    category: ServiceCategory;
    icon: string;
    featured: boolean;
    price?: string;
    deliveryTime?: string;
    thumbnail: string;
    heroImage: string;
    features: string[];
    seo: { title: string; description: string; keywords: string[]; ogImage: string; };
}