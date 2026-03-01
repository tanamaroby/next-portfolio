export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner ring + monogram */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Outer spinning ring */}
          <span
            className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
            style={{ animation: "spin 0.9s linear infinite" }}
            aria-hidden="true"
          />
          {/* Inner monogram badge */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary glow-primary-sm">
            <span className="font-mono text-xs font-bold text-primary-foreground select-none">
              RT
            </span>
          </div>
        </div>

        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
          Loading&hellip;
        </p>
      </div>
    </div>
  );
}
