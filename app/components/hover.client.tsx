import React, { useRef, useState, useLayoutEffect } from "react";

type HoverDefProps = {
  term: string;
  definition: string;
};

export default function HoverDef({ term, definition }: HoverDefProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const tooltipWidth = 240;

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));

    setStyle({
      left,
      top: rect.bottom + 8,
    });
  }, []);

  return (
    <span className="hover-def" ref={ref}>
      {term}
      <span className="hover-def__tooltip" style={style}>
        {definition}
      </span>
    </span>
  );
}
