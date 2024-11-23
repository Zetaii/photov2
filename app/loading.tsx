export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="space-y-4">
        <div className="w-32 h-32 rounded-full bg-white/5 animate-pulse" />
        <div className="w-48 h-8 bg-white/5 animate-pulse rounded-lg mx-auto" />
      </div>
    </div>
  )
}
