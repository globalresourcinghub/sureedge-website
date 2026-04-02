interface LogoProps {
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ dark = false, size = "md" }: LogoProps) {
  const scales = { sm: 0.75, md: 1, lg: 1.3 };
  const s = scales[size];
  const w = Math.round(160 * s);
  const h = Math.round(52 * s);

  return (
    <svg width={w} height={h} viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* S2-7: Wide shield, navy fill, 2.5px gold border, 3 rising bars */}
      <path
        d="M26 2L3 11v18c0 14 11 24 23 28 12-4 23-14 23-28V11L26 2z"
        fill={dark ? "rgba(255,255,255,0.10)" : "#1a2e4a"}
        stroke="#b8962e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Rising bars inside shield */}
      <rect x="13" y="31" width="6" height="15" rx="1.2" fill={dark ? "rgba(255,255,255,0.25)" : "white"} opacity={dark ? 1 : 0.25} />
      <rect x="21" y="23" width="6" height="23" rx="1.2" fill={dark ? "rgba(255,255,255,0.5)" : "white"} opacity={dark ? 1 : 0.5} />
      <rect x="29" y="13" width="6" height="33" rx="1.2" fill="#b8962e" />

      {/* Wordmark */}
      <text
        x="62"
        y="22"
        fontFamily="-apple-system, 'Inter', sans-serif"
        fontSize="18"
        fontWeight="700"
        fill={dark ? "white" : "#1a2e4a"}
        letterSpacing="-0.4"
      >
        Sure<tspan fill="#b8962e">Edge</tspan>
      </text>
      <text
        x="63"
        y="36"
        fontFamily="-apple-system, 'Inter', sans-serif"
        fontSize="9"
        fill={dark ? "rgba(255,255,255,0.45)" : "#aaa"}
        letterSpacing="2"
      >
        TAX &amp; ACCOUNTING
      </text>
    </svg>
  );
}
