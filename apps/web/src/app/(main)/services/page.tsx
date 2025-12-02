// app/(main)/services/page.tsx

import { ComingSoon } from "../_ComingSoon";

export const dynamic = "force-static";

export const metadata = {
  title: "Our Services",
  description: "AI, Blockchain, Web Development, Mobile App Development, SEO",
  alternates: { canonical: "https://techentia.com/services" },
};

export default function page() {
  return (
      <ComingSoon title="Our Services" />
  )
}
