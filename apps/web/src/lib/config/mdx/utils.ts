// // lib/mdx/parseHeadings.ts
// export interface ExtractedHeading {
//   id: string;
//   text: string;
//   level: number;
// }

// export function extractHeadingsFromMDX(raw: string): ExtractedHeading[] {
//   const lines = raw.split('\n');
//   const out: ExtractedHeading[] = [];

//   lines.forEach((line, i) => {
//     const match = line.match(/^(#{2,3})\s+(.*)/);
//     if (!match) return;

//     const level = match[1].length;     // ## → 2, ### → 3
//     const text = match[2].trim();

//     const id =
//       text
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-|-$/g, '') || `heading-${i}`;

//     out.push({ id, text, level });
//   });

//   return out;
// }
