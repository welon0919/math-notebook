import katex from 'katex';

// `strict: 'error'` makes KaTeX throw on anything it would otherwise warn about,
// so a bad formula fails the build instead of rendering red text.
const katexOptions = { throwOnError: true, strict: 'error' } as const;

export function renderLatex(latex: string, display = false): string {
  return katex.renderToString(latex, { ...katexOptions, displayMode: display });
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** Render plain text containing `$...$` (inline) and `$$...$$` (display) math to HTML. */
export function renderMathText(text: string): string {
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let html = '';
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    html += escapeHtml(text.slice(last, match.index));
    html += match[1] !== undefined ? renderLatex(match[1], true) : renderLatex(match[2]);
    last = match.index + match[0].length;
  }
  html += escapeHtml(text.slice(last));
  if (html.includes('$')) {
    throw new Error(`Unmatched $ in math text: ${text}`);
  }
  return html;
}
