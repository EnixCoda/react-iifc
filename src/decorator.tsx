import * as React from "react";
import { IIFC } from "./IIFC";

export function asIIFC<T extends React.Component, Key extends keyof T>(
  target: T,
  property: Key,
  descriptor: TypedPropertyDescriptor<T[Key]>
) {
  const render = descriptor.value;
  if (typeof render !== "function")
    throw new Error(`IIFC decorator is only applicable on class methods`);

  descriptor.value = function (this: T) {
    return <IIFC>{render.bind(this)}</IIFC>;
  } as unknown as typeof render;
  return descriptor;
}
