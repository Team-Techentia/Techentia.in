// app/(main)/contact/page.tsx

import { ComingSoon } from "../_ComingSoon";

export const dynamic = "force-static";

export const metadata = {
  title: "Contact Us",
  description: "Hire us for AI, Blockchain, Web, Mobile, or SaaS development",
  alternates: { canonical: "https://techentia.com/contact" },
};

export default function page() {
  return (
    <ComingSoon title="Contact Us" />
  )
}
