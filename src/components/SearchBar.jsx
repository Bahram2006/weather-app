import { useId } from "react"

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onUseMyLocation,
  loading = false,
  error = ""
}) {

  const id = useId()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSearch?.()
  }

  const handleClear = () => {
    onChange?.("")
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      onSubmit={handleSubmit}
    >

      <div className="flex-1">

        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          City
        </label>

        <div className="relative">

          <input
            id={id}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="e.g., London"
            autoComplete="off"
            className="w-full rounded-xl border border-white/40 bg-white/80 px-4 py-3 text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3 text-sm text-slate-500 hover:text-red-500"
            >
              ✕
            </button>
          )}

        </div>

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

      </div>


      <div className="flex gap-2">

        <button
          type="submit"
          disabled={loading}
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={() => onUseMyLocation?.()}
          disabled={loading}
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/30 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
        >
          📍 My location
        </button>

      </div>

    </form>
  )
}