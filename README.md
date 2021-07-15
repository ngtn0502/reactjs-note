# What the f-ck is ReactJS

NhanNguyen

some little note by myself to remind what i did learn

---

## Things worth to review:

| No. | Content                                                                             |
| --- | ----------------------------------------------------------------------------------- |
|     |                                                                                     |
| 1   | [Redux](#redux) - DIFFICULT                                                         |
| 2   | [ReactDOM - memo - callback](#react-and-reactdom-and-memo-and-callback) - DIFFICULT |
| 3   | [Closure in ReactJS](#closure-in-reactjs) - DIFFICULT                               |
| 3   | [State scheduling and batching](#state-scheduling-and-batching) - DIFFICULT         |

---

---

# Section 12

## React and ReactDOM and memo and callback

`React` only is in charge of manage the state and component and give the change of two state snapshot to `ReactDOM` - because we use `ReactDOM` to render `App.js`

`ReactDOM` is the one control the `virtual DOM` and give the result to real `DOM`

=> and only those change not all the DOM tree

---

## React.memo come with useCallback()

**_React.memo()_**

When the parent component change - all the child component also change - because in the end, call a child component just like call an function and if the parent component re-evaluated -> child will be re-executed again

=> Use `React.memo()` to prevent re-evaluated child component when parent `re-evaluated`

=> We wrap the export of that component by `React.memo()` - it tell `React` this component `only re-evaluated` when the `props` passed down change

BUT that come along with a cost => everytime the parent component re-evaluated React.memo() will look up and do comparation the prev snapshot and current snapshot

```
export default React.memo(nameComponent);

```

---

React.memo() do not work with `child component` that have `props` as an `object` type, because it will receive difference thing in the end
=> useCallback() solve the problem

---

**_useCallback()_** - memoize for function

useCallback() meaning that preserve the `callback function` in the first argument of that hook, the second argument is dependencies

`useCallback()` tell `react` save the function object in `react internal storage` in every re-evaluated => we use same `function object` in every the component `re-executed`

## useMemo() - to memoize data which you want to store

it work similarly like `useCallback()` but `useMemo()` work for other kind of value

if you do not want specific intensive task run every re-render => useMemo()

```
const value = useMemo(callback return data, a denpendences)
```

---

## Closure in ReactJS

Actually `useCallback()` create `closure`

lecture 156 in Max course

## React and State management

`React` will make sure that as long as the component still in the DOM tree, every times it re-evaluated -> it will use the same useState and never re-initialization

## State scheduling and batching

batch: bundle, gôm lại

`React` will `schedule` `state update` because it give priority for other important intensive task (change input that user give to the screen, console.log)

after `setState` -> the component will `re-evaluated` -> and after that we could use `the latest state`

if you have two state updates in the same synchronous code snippet after each other (not in asynchrounous code or time delay)
=> `React` will batch two setState together to one state Update

lecture 159 - watch again

---

---

# Section xx

# Redux

1. Create `root reducer` contain all `reducer member`

2. `reducer member` where we receive dispatch action, and do "action" to change state in redux store

3. create `Store` in index.js file -> pass the `rootReducer` for the store -> wrap the `App.js` file by `provider` so that we can access state from everywhere in my `App`

4. connect our component with the store so that we can interact and use the state

   - Import `connect function` form `react-redux`. This function when involved will return `higher-order-component`
     . `connect()` will return `higher-order-component` then that `higher-order-component` will receive `other component` as an parameters

=> that `component` will be connected to `redux store`

5. `map` the `state` of the `rootReducer` from `redux store`

## Immutable of Redux

When we change state in `state object` -> Because object are `reference`, so Redux does not know `state` object change.

=> we have to return new `{...state}` to make sure the `state` change and it re-render every component that use this state

---

---

## Be able to add onClick to <div> in React JS

Is is because <div> tag in React Js, does not <div> in HTML

It is just a component div that React Js customize for use to use, and so that we can add onClick on that component

## Styled component vs CSS module

Two way of styling is use for one purpose - `scoping css` - making sure you do not repeat same name of `css selector`

## Adding breakpoint in ReactJS App

Sources tab => find src folder where app.js leave and give a break point

## Two-way binding - controlled component

A way to set back the value in the input form to empty when use submit the form (clear the input)

A way to pass new value back to `input form` in `controlled` component

---

---
