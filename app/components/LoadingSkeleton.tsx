export default function LoadingSkeleton() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Content Placeholders */}
      <div
        className="relative flex-1"
        style={{
          transform: "translateZ(0)",
          contain: "paint layout",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="relative"
              style={{
                width: "200px",
                height: "200px",
                position: "absolute",
                left: `${(i % 3) * 220}px`,
                top: `${Math.floor(i / 3) * 220}px`,
                transform: "translateZ(0)",
              }}
            >
              <div
                className="animate-pulse w-full h-full bg-white/5 rounded-2xl"
                style={{ contain: "paint layout" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
