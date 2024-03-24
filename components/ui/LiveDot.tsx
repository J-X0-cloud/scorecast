export function LiveDot({ label = "Live" }: { label?: string }) {
  return <span className="live-dot">{label}</span>;
}
