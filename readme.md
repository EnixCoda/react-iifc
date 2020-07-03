# React IIFC

Use scoped hooks in react components.

While components grow as app becomes more complicated, I'm always too busy to extract part of one component's state and render logic into another component. The IIFC pattern saves me a lot of time and makes state closer to where they are used. This is also especially useful when you want to use hooks in class components.

## Example
```jsx
class TheClassComponentFromLastCentryYoullNeverBeWillingToRefactorMuchButInWhichYouWantToUseHooks extends React.Component {
  state = { text: 'Hello' }

  render() {
    return (
      <div>
        <IIFC>
          {() => {
            const [count, add] = useCounter(); // calling `add` inscreases count by 1
            // When count increases, the class component will not rerender unnecessarily
            // as state is within the scope of IIFC

            return (
              <button onClick={() => add()}>
                {count} - {this.state.text}
                {/* Everything from this class component (e.g. state) is available within IIFC */}
              </button>
            );
          }}
        </IIFC>
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

> Q: The source code is too simple. Is this a joke?
>
> A: No. :|

> Q: What does IIFC mean?
>
> A: IIFC = Instantly Invoked Function Component. What IIFC is to component is like what IIFE to functions.
