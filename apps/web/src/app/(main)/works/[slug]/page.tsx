// app/(main)/works/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWorkBySlug, getWorkSlugs, getRelatedWorks } from '@/lib/config';
import { RelatedWorks, WorkContent, WorkGallery, WorkHero, WorkMetrics, WorkProjectInfo, WorkTableOfContents, WorkTestimonial, } from "../_components"

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for ISR
export function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata(props: WorkPageProps): Promise<Metadata> {
  const params = await props.params;
  const work = await getWorkBySlug(params.slug);

  if (!work) {
    return {
      title: 'Work Not Found',
    };
  }

  const { metadata } = work;

  return {
    title: metadata.seo.title,
    description: metadata.seo.description,
    keywords: metadata.seo.keywords,
    openGraph: {
      title: metadata.seo.title,
      description: metadata.seo.description,
      images: [
        {
          url: metadata.seo.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      type: 'article',
      publishedTime: metadata.publishedAt,
      authors: ['Techentia'],
      tags: metadata.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.seo.title,
      description: metadata.seo.description,
      images: [metadata.seo.ogImage],
    },
    alternates: {
      canonical: `/works/${params.slug}`,
    },
  };
}

export default async function WorkPage(props: WorkPageProps) {
  const params = await props.params;
  const work = await getWorkBySlug(params.slug);

  if (!work) {
    notFound();
  }

  const { metadata, content } = work;
  const relatedWorks = await getRelatedWorks(params.slug, metadata.category);

  // JSON-LD structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: metadata.title,
    description: metadata.description,
    image: metadata.heroImage,
    author: {
      '@type': 'Organization',
      name: 'Techentia',
      url: 'https://techentia.com',
    },
    datePublished: metadata.publishedAt,
    dateModified: metadata.completedAt,
    keywords: metadata.tags.join(', '),
    aggregateRating: metadata.testimonial ? {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full py-10">
        <WorkHero metadata={metadata} />

        {metadata.metrics && (
          <WorkMetrics metrics={metadata.metrics} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <WorkContent content={content} metadata={metadata} />

            {(metadata.images.length > 0 || metadata.videos || metadata.gifs) && (
              <WorkGallery
                images={metadata.images}
                videos={metadata.videos}
                gifs={metadata.gifs}
                title={metadata.title}
              />
            )}
          </div>

          {/* Sidebar with TOC */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents Component */}
              <WorkTableOfContents />

              {/* Project Info Card */}
              <WorkProjectInfo metadata={metadata} />

              {/* Testimonial */}
              <WorkTestimonial metadata={metadata} />
            </div>
          </aside>
        </div>

        {relatedWorks.length > 0 && (
          <RelatedWorks works={relatedWorks} />
        )}
      </article>
    </>
  );
}