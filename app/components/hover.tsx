import React from "react";
import "../styles/custom.css";


type HoverDefProps = {
  term: string;
  definition: string;
};

export default function HoverDef({ term, definition }: HoverDefProps) {
  return (
    <span className="hover-def">
      {term}
      <span className="hover-def__tooltip">
        {definition}
      </span>
    </span>
  );
}
