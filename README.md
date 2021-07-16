# What the f-ck is ReactJS

NhanNguyen

some little note by myself to remind what i did learn

---

## Things worth to review:

| No. | Content                                                                     |
| --- | --------------------------------------------------------------------------- |
|     |                                                                             |
| 1   | [ReactDOM - memo - callback](#react-and-reactdom-and-memo-and-callback)     |
| 2   | [Closure in ReactJS](#closure-in-reactjs) - DIFFICULT                       |
| 3   | [State scheduling and batching](#state-scheduling-and-batching) - DIFFICULT |
| 4   | [Redux](#redux)                                                             |
|     | [Redux middleware](#redux-middleware)                                       |
|     | [Redux in HOOK](#redux-in-functional-component)                             |
|     | [Redux in CLASS](#redux-in-class-based-component)                           |

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

# Section 18

# Redux in CLASS-BASED COMPONENT

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

### Redux middleware

Sinh ra để tối ưu performance cho code

Để không cần `dispatch` data sau khi call `APIs`, ta cần dùng `middleware` redux-thunk, redux-saga => call `APIs` ngay trong action

 <img src="./public/1.png" alt="d">

---

Ta `call APIs` trong `action` không cần thông qua component

Nói ngắn gọn `middleware` giúp chúng ta xử lý bất đồng bộ trong `action`, **_dispatch an action in action_**

---

# Redux in FUNCTIONAL COMPONENT

1. There is one `store` to store all the `state` data and pass down data to all component
2. => component never directly mutate `state`, component just `dispatch action` to reducer
3. => `reducer` will process all the logic and return `state` to store
4. => component will connect/subscribe to `store` and use that data

 <img src="./public/2.png" alt="d">

---

**_In the component:_**

- `useSelector` and `useStore` => `react-redux` will automatically manage `connect` our component to redux store =>allow `retrieve` state from **_store to component_** by callback function will be call by redux

-`useDispatch` help us to `dispatch` `action` from **_component to store_**

---

## Redux in class-based and functional component

**_difference_**: different about how to `connect component to store`, `retrieve data` and `dispatch data`

`useStore`, `useSelector` help us `connect` component with the store equivalent to `connect` function and `mapStateToProps`

`useDispatch` equivalent to `mapDispatchToProps`

## When return state in Redux // IMUTABLE IN REDUX

when return `state` in `Redux` you must **_return all the state_** with the state update, if you just return one state it will `replace` (because redux wont `merge` the state)

lecture 254 4p

**_IMPORTANT_**: because `reducer` are `pure function` => you should never `mutate` state directly
=> with `primitive value` you can do that, because you change state in `reducer` does not `reference` to state in `redux store`

 <img src="./public/3.png" alt="d">

---

=> with `reference value` if we `mutate` state in `reducer` directly => it will lead to the change `state` in `redux store`

a way to avoid mutate:

```
  if (action.type === ADD_TO_CART) {
    const { amountCart, products, mainColor, id } = action.payload;
    const tempItem = state.cart.find((item) => {
      return item.id === id + mainColor;
    });
    if (tempItem) {
      // Create new updated array - hold all value of old array and over write the amount of object that already exist
      const temp = state.cart.map((product) => {
        if (product.id === id + mainColor) {
          let newAmount = product.item + amountCart;
          if (newAmount > product.max) {
            newAmount = product.max;
          }
          return { ...product, item: newAmount };
        } else {
          return product;
        }
      });
      //
      // Return all the state and over write the cart in every render
      return {
        ...state,
        cart: temp,
      };
    } else {
      // Create new array if it does not exist in the CART

      const newItem = {
        id: id + mainColor,
        color: mainColor,
        image: products.images[0].url,
        name: products.name,
        price: products.price,
        item: amountCart,
        max: products.stock,
      };
      // Create newItem object in the cart
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
```

## Async Code in Redux

## Redux toolkit

Purpose:

1. Help us prevent accidentally use the same `action type`
2. Help us return `state` value
3. Help us

---

I. **_createSlice_**: create Reducer
in `Redux toolkit` it allow us to `mutate` directly the `state`

`createSlice` to replace `reducer` it provide reducer method to avoid accidentally use the same `action type`

```
const mainSlice = createSlice({
  name: 'name reducer',
  initialState: 'init',
  reducer: 'reducer of that state' - it a map to all the reducer that Slice need
})
```

II. **_configureStore_**: merge reducer
`configureStore` help use to merge all the small reducer to one big reducer

```
const store = configureStore({
  reducer: {name: mainSlice}
})
```

III. **_mainSlice.action_** : Action creator

that is a `object` that contain all the `reducer method` that allow us to create `unique indentifier value` for the `action type`

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
