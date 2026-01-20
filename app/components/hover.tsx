import React from "react";
import "../styles/custom.css";

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
