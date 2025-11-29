import { WorkMetadata } from '@/lib/types'

export default function WorkTestimonial({ metadata }: { metadata: WorkMetadata }) {
    if (!metadata.testimonial) return null;

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm italic mb-4">"{metadata.testimonial.quote}"</p>
            <div className="flex items-center gap-3">
                {metadata.testimonial.avatar && (
                    <img
                        src={metadata.testimonial.avatar}
                        alt={metadata.testimonial.author}
                        className="w-10 h-10 rounded-full"
                    />
                )}
                <div>
                    <p className="font-medium text-sm">{metadata.testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{metadata.testimonial.role}</p>
                </div>
            </div>
        </div>
    )
}
