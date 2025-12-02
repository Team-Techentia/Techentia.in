export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center pt-4">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-lg text-foreground/50 max-w-md">This page is being crafted with intention. Coming soon :)</p>
    </div>
  );
}