import * as React from "react";
import { IIFC } from "./IIFC";

function renderMethodDecorator<T extends React.Component, Key extends keyof T>(
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

function ComponentDecorator<C extends typeof React.Component>(constructor: C) {
  const render = constructor.prototype.render;
  constructor.prototype.render = function (this: React.Component) {
    return <IIFC>{render.bind(this)}</IIFC>;
  };
}

export function hooks<T extends React.Component, Key extends keyof T>(
  target: T,
  property: Key,
  descriptor: TypedPropertyDescriptor<T[Key]>
): TypedPropertyDescriptor<T[Key]>;
export function hooks<C extends typeof React.Component>(constructor: C): void;

export function hooks(this: any, ...args: any[]) {
  return typeof args[0] === "function"
    ? ComponentDecorator.apply(this, args as any)
    : renderMethodDecorator.apply(this, args as any);
}
