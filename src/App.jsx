import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import Spinner from "./components/Spinner";

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OWM_API_KEY;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");

    if (savedCity) {
      setCity(savedCity);
      fetchByCity(savedCity);
    }
  }, []);

  const canFetch = useMemo(() => Boolean(apiKey && apiKey.trim()), [apiKey]);

  async function fetchByCity(nextCity) {
    const q = (nextCity ?? "").trim();
    if (!q) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    if (!canFetch) {
      setError("Missing API key. Add VITE_OWM_API_KEY to your .env file.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("q", q);
      url.searchParams.set("appid", apiKey);
      url.searchParams.set("units", "metric");

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          "City not found. Please try again.";
        setError(msg);
        setWeather(null);
        return;
      }

      setWeather(data);
      localStorage.setItem("lastCity", q);
    } catch {
      setError("Something went wrong. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchByCoords(lat, lon) {
    if (!canFetch) {
      setError("Missing API key. Add VITE_OWM_API_KEY to your .env file.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.searchParams.set("lat", String(lat));
      url.searchParams.set("lon", String(lon));
      url.searchParams.set("appid", apiKey);
      url.searchParams.set("units", "metric");

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          "Unable to fetch location weather.";
        setError(msg);
        setWeather(null);
        return;
      }

      setWeather(data);
      if (data?.name) setCity(data.name);
    } catch {
      setError("Something went wrong. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute insite-0 overflow-hidden">
        <div className="cloud top-10 text-6xl">☁️</div>
        <div className="cloud top-40 text-5xl" style={{ animationDuration: "80s" }}>☁️</div>
        <div className="cloud top-72 text-7xl" style={{ animationDuration: "100s" }}>☁️</div>
      </div>
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 pt-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            WeatherNow
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Search a city to see current conditions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="rounded-xl border border-white/30 bg-white/60 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur hover:bg-white/70 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-14 pt-8">
        <div className="rounded-2xl border border-white/30 bg-white/60 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10">
          <SearchBar
            value={city}
            onChange={setCity}
            onSearch={() => fetchByCity(city)}
            onUseMyLocation={() => {
              if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser.");
                return;
              }
              setLoading(true);
              setError("");
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  fetchByCoords(pos.coords.latitude, pos.coords.longitude);
                },
                () => {
                  setLoading(false);
                  setError(
                    "Unable to access location. Please allow permission and try again.",
                  );
                },
              );
            }}
            loading={loading}
          />

          {error ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-100">
              {error}
            </div>
          ) : null}

          <div className="mt-5">
            {loading ? <Spinner /> : <WeatherCard weather={weather} />}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-600 dark:text-slate-400">
          Data by OpenWeatherMap.
        </p>
      </main>
    </div>
  );
}

export default App;
