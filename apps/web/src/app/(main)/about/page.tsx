// app/(main)/about/page.tsx

import { ComingSoon } from "../_ComingSoon";

export const dynamic = "force-static";

export const metadata = {
  title: "About Us",
  description: "Learn about Techentia’s mission, vision, and team",
  alternates: { canonical: "https://techentia.com/about" },
};

export default function page() {
  return (
    <ComingSoon title="About us" />
  )
}
