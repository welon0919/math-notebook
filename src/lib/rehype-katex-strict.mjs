/**
 * rehype-katex only reports parse errors as warnings and renders them in red.
 * Run this after it to turn those warnings into a build failure.
 */
export default function rehypeKatexStrict() {
  return (_tree, file) => {
    const errors = file.messages.filter((m) => m.source === 'rehype-katex');
    if (errors.length > 0) {
      const details = errors.map((m) => `  ${m.place?.start?.line ?? '?'}: ${m.cause?.message ?? m.reason}`);
      throw new Error(`KaTeX errors in ${file.path}:\n${details.join('\n')}`);
    }
  };
}
