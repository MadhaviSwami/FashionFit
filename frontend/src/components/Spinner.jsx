export default function Spinner({ label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-sm text-ink/60 ${className}`} role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-blush-200 border-t-blush-600" />
      {label && <span>{label}</span>}
    </div>
  )
}
