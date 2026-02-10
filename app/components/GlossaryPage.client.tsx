import React, { useMemo } from "react";
import HoverDef from "./hover";
import { glossaryData } from "./glossaryData";

function applyGlossary(
  node: React.ReactNode,
  usedTerms: Set<string>
): React.ReactNode {
  if (typeof node === "string") {
    return replaceText(node, usedTerms);
  }

  if (React.isValidElement(node)) {
    return React.cloneElement(node, {
      children: React.Children.map(node.props.children, child =>
        applyGlossary(child, usedTerms)
      ),
    });
  }

  return node;
}

function replaceText(text: string, usedTerms: Set<string>) {
  let nodes: React.ReactNode[] = [text];
  const terms = Object.keys(glossaryData).sort((a, b) => b.length - a.length);

  terms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, "g");

    nodes = nodes.flatMap(node => {
      if (typeof node !== "string") return node;

      return node.split(regex).map((part, i) => {
        if (part === term) {
          usedTerms.add(term);
          return (
            <HoverDef
              key={`${term}-${i}`}
              term={part}
              definition={glossaryData[term]}
            />
          );
        }
        return part;
      });
    });
  });

  return nodes;
}

export default function GlossaryPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const usedTerms = useMemo(() => new Set<string>(), []);

  const content = useMemo(() => {
    return React.Children.map(children, child =>
      applyGlossary(child, usedTerms)
    );
  }, [children]);

  return (
    <>
      {content}

      {usedTerms.size > 0 && (
        <section className="page-glossary">
          <h2>Glossary</h2>
          <dl>
            {[...usedTerms].sort().map(term => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{glossaryData[term]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}
