/** Shared by build-time indexing and the client-side filter so both sides match. */
export function normalize(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\\${}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
