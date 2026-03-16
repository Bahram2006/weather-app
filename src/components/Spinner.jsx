export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        Loading weather...
      </p>
    </div>
  )
}