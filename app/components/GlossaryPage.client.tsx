// GlossaryPage.client.tsx
import React from "react";
import { glossaryData } from "./glossaryData";

export default function GlossaryPage() {
  return (
    <div style={{ border: "1px solid red", padding: 12 }}>
      <h3>Glossary</h3>
      <ul>
        {Object.entries(glossaryData).map(([term, def]) => (
          <li key={term}>
            <strong>{term}</strong>: {def}
          </li>
        ))}
      </ul>
    </div>
  );
}

