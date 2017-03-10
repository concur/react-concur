# Leveling Up In React (working title)
## General tips and best practices when working in a React/Redux ecosystem
How to seperate your concerns.

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
    + Data manipulation can be done in the reducer.
    + Keep API calls in their own util. This can keep your actions cleaner, and simpler to unit test.
    + Call `getState` only once near the top of your function.
    + Don't call getState unecessarily to get data that's handled by the local reducer. Insead, dispatch an action and get that data from the reducer itself.
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

- A simple utility where API calls live
- Abstaracts API calls from Actions, leaving cleaner, easier to test actions.
- Handle any data manipulation for the sake of API calls here rather than in the action.
- This util is especially nice for complex api calls, as it removes the mental payload of parsing `Promise` chains.

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

#### Connected Component

- A connected component is one that uses the `react-redux` connect function to pass props directly from state. It looks a little more complexs, but in practice it will greately reduce the complexity and remove the tight coupling of components from your app.

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
                <MyComponent />
            </div>
        )
    }
}
```

- Using this pattern, both components are independant of one another. In other words, you could simply cut MyComponent and past it into another component, and it will work as intended.
- Keeps data flow through your app direct and simple
- Notice that we're not creating an external container file, importing MyComponent, and passing props to it, then exporting the container. This isn't necessary. Instead just use the `connect` function in the same file as your component, effectively making it it's own container.
- Avoid passing to many props, as each prop passed to a component has a linier affect on slowing time to render. For example

```
// avoid patterns like this, they'll cause a hit to your performance

connect(state => ({
    ...state
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
    + Easy to see when a component has expanded past its concern
    + Keeps props to a minimum, decreasing time to render

#### Connect cont'







