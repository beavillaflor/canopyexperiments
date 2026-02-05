import React from "react";
import { HoverDef } from "./hover.client"; // make sure HoverDef is exported
import { glossaryData } from "./glossaryData";

type GlossaryTextProps = {
  children: string;
};

export function GlossaryText({ children }: GlossaryTextProps) {
  const renderWithGlossary = (text: string) => {
    const terms = Object.keys(glossaryData)
      .sort((a, b) => b.length - a.length)
      .map(term => ({
        term,
        regex: new RegExp(`\\b(${term})\\b`, "gi"),
      }));

    let nodes: React.ReactNode[] = [text];

    terms.forEach(({ term, regex }) => {
      nodes = nodes.flatMap(node => {
        if (typeof node !== "string") return node;
        return node.split(regex).map((part, i) =>
          regex.test(part) ? (
            <HoverDef key={`${term}-${i}`} term={part} definition={glossaryData[term]} />
          ) : (
            part
          )
        );
      });
    });

    return nodes;
  };

  return <>{renderWithGlossary(children)}</>;
}
