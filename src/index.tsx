import * as React from "react";

export function IIFC({ children }: { children(): React.ReactNode }) {
  return <>{children()}</>;
}
