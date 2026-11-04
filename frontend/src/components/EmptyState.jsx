export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink/15 bg-blush-50/40 px-6 py-12 text-center">
      {Icon && (
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-blush-500 shadow-sm">
          <Icon className="h-7 w-7" />
        </span>
      )}
      <h3 className="mt-4 font-sans text-lg font-semibold">{title}</h3>
      {text && <p className="mt-1 max-w-md text-sm text-ink/60">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
