// "Shop this look" links: open a store's own search results for an item.
// These are plain links to public search pages: no API, no scraping, and no
// product data is copied. Fashion Fit is not affiliated with these stores.
//
// Optional: if you join a store's affiliate programme, put your tag in
// frontend/.env (e.g. VITE_AMAZON_TAG=yourtag-21) to earn commission.

const AMAZON_TAG = import.meta.env.VITE_AMAZON_TAG || ''

const enc = encodeURIComponent
const slug = (q) => q.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const SHOPS = [
  {
    key: 'amazon',
    name: 'Amazon',
    url: (q) => `https://www.amazon.in/s?k=${enc(q)}${AMAZON_TAG ? `&tag=${enc(AMAZON_TAG)}` : ''}`,
  },
  { key: 'myntra', name: 'Myntra', url: (q) => `https://www.myntra.com/${slug(q)}?rawQuery=${enc(q)}` },
  { key: 'meesho', name: 'Meesho', url: (q) => `https://www.meesho.com/search?q=${enc(q)}` },
  { key: 'flipkart', name: 'Flipkart', url: (q) => `https://www.flipkart.com/search?q=${enc(q)}` },
  { key: 'ajio', name: 'Ajio', url: (q) => `https://www.ajio.com/search/?text=${enc(q)}` },
]

export const hasAffiliate = Boolean(AMAZON_TAG)
