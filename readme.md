# React IIFC

IIFC = Instantly Invoked Function Component. What IIFC is to component is like what IIFE to functions.

IIFC is the easiest way to use hooks in react class components.

We might be too busy to refactor & extract part of one component's state and render logic into another component. This IIFC pattern saves me a lot of time and makes state closer to where they are used.

## Example

### Decorator

This way is recommended if you just want to use hooks in class components.

```jsx
import { hooks } from "react-iifc";

// @hooks // The `hooks` decorator can be placed either on the whole class or on the `render` method
class AClassComponentWhichIsTooRiskyToRefactor extends React.Component {
  state = { text: "I Want Hooks!" };

  @hooks
  // This decorator is all you need for using hooks in the render method!
  render() {
    const [count, add] = useCounter();
    return (
      <button onClick={add}>
        {this.state.text} - {count}
      </button>
    );
  }
}
```

### IIFC Wrapper

This also enables hooks in class components. Meanwhile, it can be useful for creating scoped states.

```jsx
import { IIFC } from "react-iifc";

class AnotherClassComponentWhichIsTooRiskyToRefactor extends React.Component {
  state = { text: "I Want Hooks, too!" };

  render() {
    return (
      <div>
        <IIFC>
          {() => {
            // Here is a standalone scope created by IIFC, look how close
            // the declaration and usage of `count` and `add` are!
            const [count, add] = useCounter();
            return (
              <button onClick={() => add()}>
                {this.state.text} - {count}
              </button>
            )
          }
        </IIFC>
        <div>
          {/* Other rendering logics */}
        </div>
      </div>
    );
  }
}
```

## Playground

[Codesandbox](https://codesandbox.io/s/react-iifc-demo-krcod)

## Install

Available as `react-iifc` on npm.

```bash
$ yarn add react-iifc
```

## More

- Q: The source code is too simple. Is this a joke?
- A: No.
