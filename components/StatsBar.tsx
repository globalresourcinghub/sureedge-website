const stats = [
  { value: "CPA & EA", label: "Dual Credentials" },
  { value: "100%", label: "Virtual Service" },
  { value: "Nationwide", label: "Client Coverage" },
  { value: "2 Days", label: "Quote Response" },
];

export default function StatsBar() {
  return (
    <div className="flex" style={{background:"#1a2e4a"}}>
      {stats.map((s, i) => (
        <div key={s.value} className="flex-1 text-center py-3.5" style={{borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none"}}>
          <div className="text-xl font-bold" style={{color:"#b8962e"}}>{s.value}</div>
          <div className="text-[10px] mt-0.5" style={{color:"rgba(255,255,255,0.5)"}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
