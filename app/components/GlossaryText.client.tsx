import React from "react";
import HoverDef from "./hover.client";
import { glossaryData } from "./glossaryData";

type GlossaryTextProps = {
  children: React.ReactNode;
};

// Recursively extract text from MDX / React nodes
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) return extractText(node.props.children);
  return "";
}

export function GlossaryText({ children }: GlossaryTextProps) {
  const text = extractText(children);

  const terms = Object.keys(glossaryData).sort((a, b) => b.length - a.length);

  let nodes: React.ReactNode[] = [text];

  terms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");

    nodes = nodes.flatMap(node => {
      if (typeof node !== "string") return node;

      return node.split(regex).map((part, i) =>
        part.match(regex) ? (
          <HoverDef
            key={`${term}-${i}`}
            term={part}
            definition={glossaryData[term]}
          />
        ) : (
          part
        )
      );
    });
  });

  return <>{nodes}</>;
}
