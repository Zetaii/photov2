"use client"

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">500</h1>
        <p className="text-white/60">Something went wrong</p>
      </div>
    </div>
  )
}
