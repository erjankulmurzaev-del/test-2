export const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
]

export default function TaskFilter({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-xl border border-black bg-white px-3 text-xs outline-none focus:ring-2 focus:ring-brand/40"
      aria-label="Фильтры">
      {FILTERS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
      <optgroup label="Приоритет">
        <option value="p:low">Low</option>
        <option value="p:normal">Normal</option>
        <option value="p:high">High</option>
      </optgroup>
    </select>
  )
}
