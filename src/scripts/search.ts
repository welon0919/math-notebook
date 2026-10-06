import { normalize } from '../lib/search';

/**
 * Filters `[data-search-item]` elements inside each `[data-search]` container
 * by matching the query against their `data-search-text`.
 */
for (const root of document.querySelectorAll<HTMLElement>('[data-search]')) {
  const input = root.querySelector<HTMLInputElement>('input[type="search"]')!;
  const items = [...root.querySelectorAll<HTMLElement>('[data-search-item]')];
  const status = root.querySelector<HTMLElement>('[data-search-status]')!;
  const noun = root.dataset.search!;

  const update = () => {
    const terms = normalize(input.value).split(' ').filter(Boolean);
    let shown = 0;
    for (const item of items) {
      const text = item.dataset.searchText!;
      const match = terms.every((term) => text.includes(term));
      item.hidden = !match;
      if (match) shown++;
    }
    if (terms.length === 0) {
      status.textContent = '';
    } else if (shown === 0) {
      status.textContent = `找不到符合「${input.value.trim()}」的${noun}，試試其他關鍵字。`;
    } else {
      status.textContent = `找到 ${shown} 條${noun}。`;
    }
  };

  input.addEventListener('input', update);
  // Browsers may restore the field's value on back/forward navigation.
  update();
}
