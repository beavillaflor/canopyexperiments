import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function GlossaryText({ children }: Props) {
  // Render children verbatim during SSR
  return <>{children}</>;
}
