export function LogoMark({ size = 30, tile = true }: { size?: number; tile?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" focusable="false">
      {tile && <rect width="32" height="32" rx="8" fill="#0F6CBD" />}
      <path
        d="M7 11.5c3.5-3.5 11-4 14.5-.5 2.8 2.8 2.2 7-1 8.6-2.6 1.3-5.6.3-6.4-2-.6-1.8.6-3.4 2.3-3.5M25 20.5c-3.5 3.5-11 4-14.5.5"
        stroke={tile ? '#fff' : 'currentColor'}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`font-display text-[21px] font-bold tracking-tight ${light ? 'text-white' : 'text-sea'}`}
      >
        Typhoonpost
      </span>
    </span>
  );
}
