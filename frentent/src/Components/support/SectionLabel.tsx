 export  function SectionLabel({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {



    const BG = "#11120D";
const INK = "#FFFBF4";
const ACCENT = "#4ADE80";

  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className="flex size-7 items-center justify-center rounded-lg border"
        style={{
          borderColor: `${ACCENT}33`,
          background: `${ACCENT}10`,
          color: ACCENT,
        }}
      >
        {icon}
      </span>
      <span
        className="font-space-grotesk text-sm font-semibold"
        style={{ color: INK }}
      >
        {title}
      </span>
      {hint && (
        <span
          className="font-mono text-[10px] uppercase tracking-wider"
          style={{ color: "rgba(255,251,244,0.45)" }}
        >
          — {hint}
        </span>
      )}
      <span
        className="ml-2 h-px flex-1"
        style={{ background: "rgba(255,251,244,0.08)" }}
      />
    </div>
  );
}
