import * as React from "react";
import { hooks } from "../src";

function useCounter() {
  const [count, setCount] = React.useState(0);
  return [count, () => setCount((count) => count + 1)] as const;
}

export class DecoratedOnRenderComponent extends React.Component {
  state = { text: "Hello" };

  @hooks
  render() {
    const [count, add] = useCounter();
    return (
      <button onClick={() => add()}>
        {this.state.text} - {count}
      </button>
    );
  }
}

@hooks
export class DecoratedOnClassComponent extends React.Component {
  state = { text: "Hello" };

  render() {
    const [count, add] = useCounter();
    return (
      <button onClick={() => add()}>
        {this.state.text} - {count}
      </button>
    );
  }
}
