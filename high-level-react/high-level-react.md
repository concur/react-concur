---

# High Level React

---

# The Ecosystem

---

# React
## The view layer

---

# Redux
## The data layer

---

# Babel
## The transpiler

---

# Webpack
## The code bundler

---

# Features of React

- Components
- Props
- Lifecycle
- JSX

---

# Components

- The building blocks of react

---

```javascript
const MyComponent = () => { // Stateless Functional Component
    return (
        <div>Hi<//div> // JSX
    );
};

class MyComponent extends React.Component { // Class Component
    render() { // render lifecycle method
        return (
            <div>Hi<//div> // JSX
        )
    }
}
```

---

## Components are instantiated in JSX

```
<div>
  ...
  <MyComponent /> // display MyComponent
  ...
</div>
```

---

## Compents recieve data through props

```
<MyComponent prop1={myData} prop2={myOtherData} />
```

---

## Components access props

```javascript
const MyComponent = (props) => {
    return (
        <div>{props.hi}<//div>
    );
};

class MyComponent extends React.Component {
    render() {
        return (
            <div>{this.props.hi}<//div>
        )
    }
}
```

---

## Component Lifecycle

### Mounting
- `constructor()`
- `componentWillMount()`
- `render()`
- `componentDidMount`

---

### Lifecycle continued

###Updating
- `componentWillReceiveProps()`
- `shouldComponentUpdate()`
- `componentWillUpdate()`
- `render()`
- `componentDidUpdate()`

---

## Stateless Functional Components

- A function that returns JSX
- No access lifecycle methods

---

## Redux
### The data layer

---

- Actions
- Reducers
- Store
- Data flow
- Working with React

---

## Features

- Single source of state
- Unidirectional data flow

---

## Actions

- Actions are payloads of information that send datat from your application to your store.
- Actions are plain javascript objects with a type key

---

```javascript
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

---

## Reducers

- Reducers recieve actions and update app state
- State is stored in a single object

---

## How Reducers work

```javascript
function myReducer(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                data: action.payload
            //new state
            };
        default:
            return {
                ...state
            }
    }
}
```

---

## Store

- Holds app state
- Allows access to state through `getState()`
- Allows state to be updated through `dispatch(action)`
- Registers listeners through `subscribe(listener)`
- Handles unregestering of listeners through function returned by `subscribe(listener)`

---

- Redux apps have a single store
- Complexity is handled through reducer composition

---

## Data Flow

---

### Step 1: call `dispatch(action)`

```javascript
dispatch({ type: MY_ACTION, payload: {mydata}});

or

const action = (data) => {
    return {
        type: MY_ACTION,
        payload: data
    };
};

dispatch(action(data));
```

---

### Step 2: Redux store calls the reducer function

- Store passes the current state tree and action to the reducers
- Reducer only computes next state. It is a pure function.

---

### Step 3: Root reducer may combine output of multiple reducers into a single state tree

- Using `combineReducers()`, redux passes action through all reducers
- 





