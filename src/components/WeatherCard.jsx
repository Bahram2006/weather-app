function formatTemp(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return `${Math.round(value)}°C`
}

export default function WeatherCard({ weather, loading = false }) {
  if (loading && !weather) {
    return (
      <div className="rounded-2xl border border-white/30 bg-white/60 p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 transition hover:scale-105">
        <div className="h-6 w-40 animate-pulse rounded bg-slate-200/70 dark:bg-white/10" />
        <div className="mt-4 h-12 w-28 animate-pulse rounded bg-slate-200/70 dark:bg-white/10" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded bg-slate-200/70 dark:bg-white/10" />
          <div className="h-10 animate-pulse rounded bg-slate-200/70 dark:bg-white/10" />
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="rounded-2xl border border-dashed border-white/40 bg-white/40 p-8 text-center text-sm text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
        Search for a city to see the current weather.
      </div>
    )
  }

  const cityName = weather?.name ?? '—'
  const country = weather?.sys?.country
  const temp = weather?.main?.temp
  const humidity = weather?.main?.humidity
  const wind = weather?.wind?.speed
  const condition = weather?.weather?.[0]?.main ?? '—'
  const description = weather?.weather?.[0]?.description ?? ''
  const icon = weather?.weather?.[0]?.icon
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null

  return (
    <div className="rounded-2xl border border-white/30 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {cityName}
            {country ? (
              <span className="ml-2 align-middle text-sm font-medium text-slate-600 dark:text-slate-300">
                {country}
              </span>
            ) : null}
          </h2>
          <p className="mt-1 text-sm capitalize text-slate-600 dark:text-slate-300">
            {description || condition}
          </p>
        </div>

        {iconUrl ? (
          <img
            src={iconUrl}
            width="72"
            height="72"
            alt={description ? `${description} icon` : 'Weather icon'}
            className="-mt-1 h-20 w-20"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-6xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {formatTemp(temp)}
        </div>
        <div className="rounded-xl bg-white/60 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200">
          {condition}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/30 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Humidity
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {typeof humidity === 'number' ? `${humidity}%` : '—'}
          </div>
        </div>
        <div className="rounded-xl border border-white/30 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Wind
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {typeof wind === 'number' ? `${wind} m/s` : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

