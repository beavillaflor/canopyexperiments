/*import React from "react";
import HoverDef from "./hover";

export function renderWithGlossary(
  text: string,
  glossary: Record<string, string>
) {
  const terms = Object.keys(glossary)
    .sort((a, b) => b.length - a.length) // longest first
    .map(term => ({
      term,
      regex: new RegExp(`\\b(${escapeRegExp(term)})\\b`, "gi"),
    }));

  let nodes: React.ReactNode[] = [text];

  terms.forEach(({ term, regex }) => {
    nodes = nodes.flatMap(node => {
      if (typeof node !== "string") return node;

      return node.split(regex).map((part, i) =>
        regex.test(part) ? (
          <HoverDef
            key={`${term}-${i}`}
            term={part}
            definition={glossary[term]}
          />
        ) : (
          part
        )
      );
    });
  });

  return nodes;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}*/

import React from "react";
import HoverDef from "./hover";

export function renderWithGlossary(
  text: string,
  glossary: Record<string, string>,
  usedTerms: Set<string> // pass a Set to collect matches
) {
  const terms = Object.keys(glossary)
    .sort((a, b) => b.length - a.length) // longest first
    .map(term => ({
      term,
      regex: new RegExp(`\\b(${escapeRegExp(term)})\\b`, "gi"),
    }));

  let nodes: React.ReactNode[] = [text];

  terms.forEach(({ term, regex }) => {
    nodes = nodes.flatMap(node => {
      if (typeof node !== "string") return node;

      return node.split(regex).map((part, i) => {
        if (regex.test(part)) {
          usedTerms.add(term); // track the term
          return (
            <HoverDef
              key={`${term}-${i}`}
              term={part}
              definition={glossary[term]}
            />
          );
        }
        return part;
      });
    });
  });

  return nodes;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

