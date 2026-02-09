import React from "react";
import { glossaryData } from "./glossaryData";

export default function GlossaryList() {
  const entries = Object.entries(glossaryData).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <section className="glossary-section">
      <h2>Glossary</h2>
      <dl className="glossary-list">
        {entries.map(([term, definition]) => (
          <div key={term} className="glossary-entry">
            <dt className="glossary-term">{term}</dt>
            <dd className="glossary-definition">{definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
