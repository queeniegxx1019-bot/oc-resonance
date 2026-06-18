"use client";

export default function BotanicalIllustration() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-forest-800/80 to-forest-950/90 shadow-2xl backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,228,160,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(232,160,184,0.08),transparent_50%)]" />

      {/* Sky gradient */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-sage-300/5 to-transparent" />

      {/* Ground */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-forest-950/80 to-transparent" />

      {/* Large flowers - CSS */}
      <div className="absolute bottom-[18%] left-[12%] h-24 w-24 animate-float">
        <div className="absolute bottom-0 left-1/2 h-16 w-0.5 -translate-x-1/2 bg-sage-500/40" />
        <div className="absolute bottom-12 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-blossom-300/30 blur-sm" />
        <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-5 w-5 rounded-full bg-blossom-300/50"
              style={{ transform: `rotate(${i * 72}deg) translateY(-8px)` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[22%] right-[18%] h-20 w-20 animate-float [animation-delay:-4s]">
        <div className="absolute bottom-0 left-1/2 h-14 w-0.5 -translate-x-1/2 bg-sage-500/30" />
        <div className="absolute bottom-10 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-sage-300/25" />
      </div>

      {/* Floating elements from wireframe */}
      <span className="absolute left-[8%] top-[20%] animate-float text-3xl opacity-70">🦋</span>
      <span className="absolute right-[12%] top-[15%] animate-float text-2xl opacity-60 [animation-delay:-2s]">
        🦋
      </span>
      <span className="absolute left-[25%] top-[35%] animate-float text-4xl opacity-50 [animation-delay:-6s]">
        🌿
      </span>
      <span className="absolute right-[28%] top-[40%] animate-float text-3xl opacity-55 [animation-delay:-8s]">
        🍃
      </span>
      <span className="absolute bottom-[35%] left-[38%] animate-float text-3xl opacity-45 [animation-delay:-3s]">
        🦊
      </span>
      <span className="absolute bottom-[40%] right-[35%] animate-float text-3xl opacity-50 [animation-delay:-10s]">
        🐺
      </span>
      <span className="absolute left-[55%] top-[18%] animate-float text-2xl opacity-40 [animation-delay:-5s]">
        🐦
      </span>
      <span className="absolute right-[8%] bottom-[45%] animate-float text-2xl opacity-45 [animation-delay:-7s]">
        🌸
      </span>
      <span className="absolute left-[15%] bottom-[50%] animate-float text-xl opacity-35 [animation-delay:-12s]">
        🌺
      </span>

      {/* Soft mist overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-forest-950/20" />
    </div>
  );
}
