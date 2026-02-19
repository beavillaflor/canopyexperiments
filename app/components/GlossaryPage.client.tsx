import React from "react";
import { glossaryData } from "./glossaryData";

type Props = {
  children: React.ReactNode;
};

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(extractText).join(" ");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return "";
}

export default function GlossaryPage({ children }: Props) {
  const text = extractText(children);

  const presentTerms = Object.entries(glossaryData).filter(([term]) =>
    new RegExp(`\\b${term}\\b`, "i").test(text)
  );

  if (presentTerms.length === 0) return null;

  return (
    <div className="glossary-page">
      <h3>Glossary</h3>

      <ul>
        {presentTerms.map(([term, def]) => (
          <li key={term}>
            <strong>{term}</strong>: {def}
          </li>
        ))}
      </ul>
    </div>
  );
}
