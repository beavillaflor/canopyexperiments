import React from "react";
import { glossaryData } from "./glossaryData";

export function PageGlossary({ usedTerms }: { usedTerms: Set<string> }) {
  const entries = Array.from(usedTerms).sort();

  if (entries.length === 0) return null;

  return (
    <section className="page-glossary">
      <h2>Glossary</h2>
      <dl>
        {entries.map(term => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{glossaryData[term]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
