import { WorkMetadata } from "@/lib/types";

export default function WorkProjectInfo({ metadata }: { metadata: WorkMetadata }) {
    return (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h4 className="font-heading text-xl">Project Info</h4>

            <div className="space-y-3">
                <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{metadata.client}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="font-medium">
                        {new Date(metadata.completedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Categories</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {metadata.category.map(cat => (
                            <span
                                key={cat}
                                className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Technologies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {metadata.technologies.slice(0, 6).map(tech => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {metadata.liveUrl && (
                    <a
                        href={metadata.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-accent text-accent-foreground text-center py-2 rounded-lg hover:bg-accent/80 transition-colors"
                    >
                        Visit Live Site →
                    </a>
                )}
            </div>
        </div>
    )
}
