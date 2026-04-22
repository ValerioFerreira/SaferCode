import React from "react";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px flex-1 bg-border" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,0 16,16 0,16" fill="hsl(48 96% 53% / 0.5)" />
      </svg>
      <div className="w-24 h-px bg-primary/40" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect x="1" y="1" width="8" height="8" stroke="hsl(48 96% 53% / 0.4)" strokeWidth="1.5" />
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}