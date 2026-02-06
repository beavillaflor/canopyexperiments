import React from "react";
import HoverDef from "./hover.client";
import { glossaryData } from "./glossaryData";

type GlossaryTextProps = {
  children: React.ReactNode;
};

export function GlossaryText({ children }: GlossaryTextProps) {
  // Flatten children to a single string
  const text = React.Children.toArray(children)
    .map(child => {
      if (typeof child === "string") return child;
      if (React.isValidElement(child) && typeof child.props.children === "string") {
        return child.props.children;
      }
      return "";
    })
    .join(" ");

  // Sort glossary terms by length to avoid partial matches
  const terms = Object.keys(glossaryData).sort((a, b) => b.length - a.length);

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
