// lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ServiceMetadata } from '@/lib/types';

const servicesDirectory = path.join(process.cwd(), 'src/content/services');

export async function getAllServices(): Promise<ServiceMetadata[]> {
    if (!fs.existsSync(servicesDirectory)) return [];
    const fileNames = fs.readdirSync(servicesDirectory);

    const services = fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => {
            const filePath = path.join(servicesDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContents) as ServiceMetadata;
        })
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.title.localeCompare(b.title);
        });

    return services;
}

export async function getServiceBySlug(slug: string): Promise<{ metadata: ServiceMetadata; content: string; } | null> {
    try {
        const jsonPath = path.join(servicesDirectory, `${slug}.json`);
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const metadata = JSON.parse(jsonContent) as ServiceMetadata;

        const mdxPath = path.join(servicesDirectory, `${slug}.mdx`);
        const mdxContent = fs.readFileSync(mdxPath, 'utf8');
        const { content } = matter(mdxContent);

        return { metadata, content };
    } catch (error) {
        console.error(`Error loading service: ${slug}`, error);
        return null;
    }
}

export function getServiceSlugs(): string[] {
    if (!fs.existsSync(servicesDirectory)) return [];
    const fileNames = fs.readdirSync(servicesDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => fileName.replace('.json', '')) || [];
}