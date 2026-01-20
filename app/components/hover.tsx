import React from "react";

export default function HoverDef({ term, definition }) {
  return (
    <span className="hover-def">
      {term}
      <span className="hover-def__tooltip">
        {definition}
      </span>
    </span>
  );
}
