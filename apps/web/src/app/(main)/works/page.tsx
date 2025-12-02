// app/(main)/works/page.tsx

import { ComingSoon } from "../_ComingSoon";

export const dynamic = "force-static";

export const metadata = {
  title: "Our Work",
  description: "Case studies and real projects we have delivered",
  alternates: { canonical: "https://techentia.com/works" },
};

export default function page() {
  return (
    <ComingSoon title="Our Work" />
  )
}
