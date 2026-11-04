import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

const STYLES = {
  info: { box: 'border-sky-200 bg-sky-50 text-sky-900', icon: Info },
  success: { box: 'border-emerald-200 bg-emerald-50 text-emerald-900', icon: CheckCircle2 },
  warning: { box: 'border-amber-200 bg-amber-50 text-amber-900', icon: AlertTriangle },
  error: { box: 'border-red-200 bg-red-50 text-red-900', icon: XCircle },
}

export default function Alert({ type = 'info', title, children, className = '' }) {
  const { box, icon: Icon } = STYLES[type]
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 text-sm ${box} ${className}`} role={type === 'error' ? 'alert' : 'status'}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  )
}
