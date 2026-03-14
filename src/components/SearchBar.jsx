import { useId } from 'react'

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onUseMyLocation,
  loading = false,
}) {
  const id = useId()

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.()
      }}
    >
      <div className="flex-1">
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          City
        </label>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="e.g., London"
          autoComplete="off"
          className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200/60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-indigo-300/50 dark:focus:ring-indigo-400/20"
        />
      </div>

      <div className="flex gap-2 sm:mt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
        <button
          type="button"
          onClick={() => onUseMyLocation?.()}
          disabled={loading}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/30 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15 sm:flex-none"
        >
          Use my location
        </button>
      </div>
    </form>
  )
}

