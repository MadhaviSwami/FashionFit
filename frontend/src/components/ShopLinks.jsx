import { ExternalLink, ShoppingBag } from 'lucide-react'
import { SHOPS, hasAffiliate } from '../data/shops.js'

// Buttons that open the item's search results on popular Indian stores.
export default function ShopLinks({ query, label = 'Shop this look on', compact = false }) {
  if (!query) return null
  const rel = `noopener noreferrer nofollow${hasAffiliate ? ' sponsored' : ''}`
  return (
    <div className={compact ? 'pt-2' : 'space-y-3'}>
      <p className={`flex items-center gap-1.5 font-medium text-ink/70 ${compact ? 'text-[11px]' : 'text-sm'}`}>
        <ShoppingBag className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} /> {label}
      </p>
      <div className={`flex flex-wrap ${compact ? 'mt-1.5 gap-1.5' : 'gap-2'}`}>
        {SHOPS.map((shop) => (
          <a
            key={shop.key}
            href={shop.url(query)}
            target="_blank"
            rel={rel}
            title={`Search "${query}" on ${shop.name} (opens in a new tab)`}
            className={`inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white font-medium transition hover:border-ink hover:bg-ink hover:text-white ${
              compact ? 'px-2.5 py-1 text-[11px]' : 'px-4 py-2 text-sm'
            }`}
          >
            {shop.name}
            {!compact && <ExternalLink className="h-3.5 w-3.5" />}
          </a>
        ))}
      </div>
    </div>
  )
}
