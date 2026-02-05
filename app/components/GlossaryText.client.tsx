import React from "react";
import HoverDef from "./hover.client";
import { glossaryData } from "./glossaryData";

type GlossaryTextProps = {
  children: React.ReactNode;
};

export function GlossaryText({ children }: GlossaryTextProps) {
  // Flatten children to plain text
  const text = React.Children.toArray(children)
    .map(child => (typeof child === "string" ? child : ""))
    .join("");

  // Prepare terms sorted by length (longest first)
  const terms = Object.keys(glossaryData).sort((a, b) => b.length - a.length);

  // Split the text into React nodes with HoverDef where matches occur
  let nodes: React.ReactNode[] = [text];

  terms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, "gi");

    nodes = nodes.flatMap(node => {
      if (typeof node !== "string") return node;

      return node.split(regex).map((part, i) =>
        regex.test(part) && glossaryData[term] ? (
          <HoverDef key={`${term}-${i}`} term={part} definition={glossaryData[term]} />
        ) : (
          part
        )
      );
    });
  });

  return <>{nodes}</>;
}
