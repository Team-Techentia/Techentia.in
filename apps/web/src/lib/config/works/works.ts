// lib/config/works/works.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { WorkMetadata } from '@/lib/types';

export async function getWorkBySlug(slug: string): Promise<{ metadata: WorkMetadata; content: string; } | null> {
    try {
        // Load JSON metadata
        const jsonPath = path.join(worksDirectory, `${slug}.json`);
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const metadata = JSON.parse(jsonContent) as WorkMetadata;

        // Load MDX content
        const mdxPath = path.join(worksDirectory, `${slug}.mdx`);
        const mdxContent = fs.readFileSync(mdxPath, 'utf8');
        const { content } = matter(mdxContent);

        return { metadata, content };
    } catch (error) {
        console.error(`Error loading work: ${slug}`, error);
        return null;
    }
}

const worksDirectory = path.join(process.cwd(), 'src/content/works');

export async function getAllWorks(): Promise<WorkMetadata[]> {
    if (!fs.existsSync(worksDirectory)) return [];
    const fileNames = fs.readdirSync(worksDirectory);

    const works = fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => {
            const filePath = path.join(worksDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContents) as WorkMetadata;
        })
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

    return works;
}

export function getWorkSlugs(): string[] {
    if (!fs.existsSync(worksDirectory)) return [];
    const fileNames = fs.readdirSync(worksDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.json'))
        .map(fileName => fileName.replace('.json', ''));
}

export async function getRelatedWorks(currentSlug: string, category: string[], limit: number = 3): Promise<WorkMetadata[]> {
    const allWorks = await getAllWorks();

    return allWorks
        .filter(work =>
            // work.slug !== currentSlug &&
            work.category.some(cat => category.includes(cat))).slice(0, limit);
}