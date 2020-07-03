# React IIFC

Use scoped hooks in react components.

I'm always too busy to extract part of one component's state and render result into another component. The IIFC pattern save me a lot of time on that and makes state closer to where they are used.

This is also especially useful when you want to use hooks in class components.

## Examples

### Usage in class components

```jsx
class TheClassComponentFromLastCentryYoullNeverBeWillingToRefactorMuchButInWhichYouWantToUseHooks extends React.Component {
  render() {
    return (
      <div>
        <IIFC>
          {() => {
            const [count, add] = useCounter();
            // calling `add` inscreases count by 1
            // Everything from this class component is still available
            return (
              <button onClick={() => add()}>
                {count} - {this.state.text}
              </button>
            );
          }}
        </IIFC>
      </div>
    );
  }
}
```

### Making hooks scoped

`App` renders 2 counter buttons

```jsx
function App() {
  const [appState] = useState("good");
  const [count1, add1] = useCounter();
  const [count2, add2] = useCounter();
  // Have to name them differently to prevent collision :(
  return (
    <div>
      <button onClick={() => add1()}>
        {count1} - {appState}
      </button>
      <button onClick={() => add2()}>
        {count2} - {appState}
      </button>
    </div>
  );
}
```

After refactoring with IIFC.

```jsx
function App() {
  const [appState] = useState("great");
  return (
    <div>
      <IIFC>
        {() => {
          const [count, add] = useCounter();
          // If you extract this button as component, you'll need to pass `appState` as a prop. But IIFC makes it available here naturally.
          return (
            <button onClick={() => add()}>
              {count} - {appState}
            </button>
          );
        }}
      </IIFC>
      <IIFC>
        {() => {
          const [count, add] = useCounter();
          // No name collision :)
          return (
            <button onClick={() => add()}>
              {count} - {appState}
            </button>
          );
        }}
      </IIFC>
    </div>
  );
}
```

## Install

Available as `react-iifc` on npm.

```bash
$ yarn add react-iifc
```

## More

> Q: The source code is too simple. Is this a joke?
>
> A: No. :|

> Q: What does IIFC mean?
>
> A: IIFC = Instantly Invoked Function Component. What IIFC is to component is like what IIFE to functions.
