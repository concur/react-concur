# Leveling Up In React (working title)
## General tips and best practices when working in a React/Redux ecosystem

## React/Redux Data Flow 30 Second Review

- Our redux code lives in a ducks module
    + With ducks, we store all our related constants, actions, action creators, and reducer in a single file.
    + If another module needs to listed for a particular constant or needs to dispatch a particular actions, we export the action here and import it where needed.
- Our data lives in the reducer.
- Using `react-redux`'s connect function, we pass data to the component through props.
    + When we use the connect function to pass data directly from the store to a presentational component, we call that the connected pattern.
    + Benefits include: all our connected components are independant.
- The component displays the data, and listens to events that may dispatch an action
- The action handles the new data and passes it to the reducer.
- The reducer updates the store, which sends updated data through props to the componet.

## Modules
### The data layer

- Our modules consist of
    + Constants
    + Actions
    + Reducer

#### Actions

- Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`

```
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

- A simple action just passes data and a type to the reducer

```
const addToDo = (toDo) => ({
    type: ADD_TODO,
    toDo    
});
```

- A complex action can take advantage of the `thunk` and `promise` middlewhere, and can easily get out of hand.
- A few pointers to keep these actions reasonable:
    + Try to keep complexity out of your Actions when you can. Pure actions (w/o side effects) are best actions.
    + Prefer data manipulation in the reducer when possible.
    + Keep API calls in their own util. This can keep your actions cleaner, and simpler to unit test.
    + Call `getState` only once near the top of your function.
    + Don't call `getState` unecessarily to get data that's handled by the local reducer. Insead, dispatch an action and access that data from within the reducer itself.
    + Always treat data from the store as though it were immutable.    

#### Reducer

- The Reducer specifies how the applications state changes in response to an action.
- A simple reducer looks like this:

```
const ADD_TODO = '@todoModule/ADD_TODO';

const initalState = []

export default const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state.slice(0, action.index),
                action.payload,
                ...state.slice(action.index, state.length + 1)
            ]
        defualt:
            return [
                ...state
            ];
    }
}
```

- Tips for clean, efficiant reducers:
    - The best reducers specialize in a single concern.
    - Reducers can listen for actions from another module if needed.

```
// expenseHomeModule.js

const RESET_EXPENSE_STATE = '@expenseHome/RESET_EXPENSE_STATE';

// expenseItemizationModule.js
import {RESET_EXPENSE_STATE} from '../expenseHomeModule';

export default const myReducer = (state = initialState, action) => {
    switch (action.type) {
        ....
        case RESET_EXPENSE_STATE:
            return {
                ...initialState
            }
        ....
    }
}

```


#### API Util

- Just a simple utility where API calls live
- Abstaracts API calls from Actions, leaving cleaner, easier to test actions.
- Handle any data manipulation for the sake of API calls here rather than in the action.
- This util is especially nice for complex api calls, as it removes the mental payload of parsing busy `Promise` chains within actions.

## Components

### Passing Props

- There are multiple ways to pass data to a component through props. Some work better than others, but none are a catch all solution. Best to evaluate each component carefully and chose the best method for your particular circumstance.

#### Component to Component

- The simplest and most easy to grok method of passing data to a component through props is Component to Component.

```
// Home.jsx

class Home extends React.Component {
    render() {
        return (
            <div>
                <MyComponent
                    prop1={this.state.thing1}
                    prop2={this.props.thing2}
                    prop3={this.props.thing3}
                    ....
                />
            </div>
        )
    }
}
```

- In this example, Home is getting props from somewhere and passing them straight through to MyComponent.
    + This form of passing data keeps these two components tightly coupled.
    + This makes your code harder to maintain, especially as your app grows and evolves. Simple data changes might force you to refactor at least 2, possibly more, components.

- When passing props from one component to another, avoid passing {...this.props}

```
class Home extends React.Component {
    render() {
        return (
            <div>
                <MyComponent
                    {...props} // :(
                />
            </div>
        )
    }
}
```

- This is an easy design patter that can greatly increase tech debt in your app as your app grows. Avoid it!
    + Makes parent and child component tightly couples.
    + Has added impact of now making the parent and it's parent component tightly coupled as well, as all props are handled in that grandparent componet.
    + Passing more `props` increases time to render (something we should avoid, especially in forms because every key stroke dispatches an onChange event. Slight decreases in perf add up when every keystroke is delayed even slightly)
    + Of course there's an exception to everything, including this. Higher Order Components often make use of `{...props}` which is fine. **Just be sure to think about when this works well and when it doesn't.**

- Summery
    + Always explicitly list props.
    + Avoid passing `this.props.foo` as this leads to tight coupling. Instead prefer the connected pattern (next).
    + Avoid spreading props from one component to another `{...props}` as it increases time to render and forms a tight couple between 3 layers of components.

#### Connected Component

- A connected component is one that uses the `react-redux` connect function to pass props directly from state. It looks a little more complex, but in practice it will greately reduce the complexity and remove the tight coupling of components from your app.

```
// MyComponent.jsx
import {connect} from 'react-redux';

const MyComponent = ({ prop1, prop2, prop3 }) => {
    return (
        <div>
            {`I am a ${prop1} that ${prop2} when ${prop3}`}
            ....
        </div>
    )
}

const mapStateToProps = state => ({
    prop1: state.expense.prop1,
    prop2: state.itemization.prop2,
    prop3: state.user.prop3    
});

export defualt connect(mapStateToProps)(MyComponent);


// Home.jsx

class Home extends React.Component {
    render() {
        return (
            <div>
                <MyComponent />  // :)
            </div>
        )
    }
}
```

- Using this pattern, both components are independant of one another. In other words, you could simply cut MyComponent and past it into another component, and it will work as intended.
- Keeps data flow through your app direct and simple
- Notice that we're not creating an external container file, importing MyComponent, and passing props to it, then exporting the container. This isn't necessary. Instead just use the `connect` function in the same file as your component, effectively making it it's own container.
- Avoid passing too many props, as each prop passed to a component has a linier affect on slowing time to render. For example

```
// avoid patterns like this, they'll cause a hit to your performance

connect(state => ({
    ...state // NEVER!
}));

// or even

connect(state => ({
    movies: ...state.movies,
    books: ...state.books,
    tvShows: ...state.tvShows
}));
```

Better to explicity require each prop needed for that particular component.

```
connect(state => ({
    movieTitles: state.movies.titles,
    bookTitles: state.books.titles,
    tvShowTitles: state.tvShows.titles
}));
```

- Benefits of explicitly declaring props include:
    + Easy to see when a component has expanded past its concern.
    + Keeps props to a minimum, decreasing time to render.

- Summery
    + Prefer Connected Pattern over Component to Component pattern.
    + Connected componets are simplier to maintain, and reduce tech debt significantly.
    + When using connect, avoid the spread opporator because each prop passed hits perf.
    + Also spread in connect obscures your props a bit. Explicit is better.

#### Higher Order Components

- A higher-order component is a function that takes a component and returns a new component.
- A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React's compositional nature.

```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it.
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

- Adds additional functionality, or injects data, into the component it wraps.
- Good for behaviour that is needed throughout the app, or common data sets needed in several components.
- Does come with a perf hit. If you're managing your `props` well else where, you can usually get away with this hit to perf. If you're not, your User Experiance could deminish.

#### Passing Props Summery

- Each prop passed comes at the expense of time to render. Avoid passing unnecessary props.
- Favor Connected Components and Higher Order Compontents over the Component to Component pattern
- When a component has too many props, consider breaking into several, more focused components.
- All these rules have exceptions. Every circumstance is different.

### Stateless Functional Components (SFC)

- SFCs are the simplest way to declare components.
- They are basic javascript functions that take props and return jsx.

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- SFCs do not have access to state or any React lifecycle methods.
- Simpler than Class components and easier to maintain.
- Favor SFCs over Class components whenever possible. This keeps your components cleaner and easier to maintain.
- Class components are best used as the root component of a view, or for components that rely on lifecycle methods. In all other cases, use SFCs.

### Reaching into child components

- There are two primary ways for a parent componet to reach into a child component: 1) event handlers, 2) refs.
- Event handlers map to typical html events like `onChange`, `onBlur`, etc.
- `Ref`s are references to DOM elements within a component.
- `Ref`s should only be used within the component itself and not passed to child or parent componets as it creates tight coupling, and can be difficult to maintain.
- Event handlers can be surfaced to parent componets through `props` using simple techniques like:
```
const MyComponent = (props) => {
    const handleChange = (e) => {
        doSomething();
        props.onChange(e.target.value);
    };

    return (
        <input value={props.value} onChange={handleChange} ... />
    );
}
```

- Favor event handlers over `ref`s. Avoid `ref`s when possible.

### State

- There are several ways to handle the state of a particular component. Let's look at some of the methods and compair.
- `class` components have access to `this.state` whereas SFCs do not.
- Accessing and updating a components state is relatively painless.

```
class MyComponent extende React.Component {
    ....

    handleChange(value) {
        this.setState({
            foo: value   
        });
    }
    ....

    render (
        ...
        <span>{state.value}</span>
        ...
    )
}

``` 
```
- Pros of internal state:
    + Easy
    + Great for managing things that aren't related to data in the store. For example, active states, is modal open, etc.
- Cons of internal state:
    + In some cases, relying on component state too much can make components difficult to reuse and maintain. 
    + As the code base grows, too much state manipulation can greately affect your technical debt.
    + Storing data in state leads to components being difficult for developers to adapt to different circumstances.
- If you need to use 'componentWillRecieveProps' to fit some data change into the component, consider refactoring it to instead just read data from the store.
- Instead of storing data in component state, opt for making the component a connected component, and store data in the store.

```
// Dont do this

class MyComponent extende React.Component {
    ....

    handleChange(value) {
        this.setState({
            foo: value   
        });
    }

    handleBlur(){
        this.props.onBlur(this.state.foo) // used to update the store
    }
    ....

    render (
        ...
        <span>{state.value}</span>
        ...
    )
}

// instead, favor this
import {updateValue} from 'myModule';

const MyComponent = (props) => {
    const handleChange = (value) => {
        this.props.onChange(value)
    }

    return (
        ...
        <span>{props.value}</span>
        ...
    )
}

export defautl connect(state => ({
    ...
}), {
   onChange: updateValue 
})(MyComponent)
```

- In the example above we refactored our class component into a SFC, we stopped saving data to state and instad read data from props and pass actions through props to update data in the store.
- This method takes a little more boilerplate work, but is vastly more maintainable in the long run.