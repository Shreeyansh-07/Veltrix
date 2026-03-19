'use client';

export default function BrandLogo({ size = 34, dark = false, className = '' }) {
  const glow = dark ? '#7dd3fc' : '#38bdf8';
  const steelA = dark ? '#f8fafc' : '#d1d5db';
  const steelB = dark ? '#94a3b8' : '#4b5563';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Veltrix logo"
      className={className}
    >
      <defs>
        <linearGradient id="veltrix-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={steelA} />
          <stop offset="100%" stopColor={steelB} />
        </linearGradient>
        <linearGradient id="veltrix-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <filter id="veltrix-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <polygon points="32,57 13,8 24,8 32,31 40,8 51,8" fill="url(#veltrix-steel)" />
      <path
        d="M9 37C16 22 29 18 41 23C49 26 54 22 56 19C55 24 51 32 43 35C32 39 24 41 16 49C12 45 10 41 9 37Z"
        fill="url(#veltrix-blue)"
        filter="url(#veltrix-glow)"
      />
      <path
        d="M54 26L58 24L56 29"
        stroke={glow}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
