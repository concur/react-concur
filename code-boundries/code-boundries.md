# Code Boundries
## Where one module ends and another begins
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
    + Try to keep complexity out of your Actions when you can. Data manipulation can be done in the reducer.
    + Keep API calls in their own util. This can keep your actions cleaner, and simpler to unit test.
    + Call getState only once near the top of your function.
    + Don't call getState unecessarily to get data that's handled by the local reducer. Insead, dispatch an action and get that data from the reducer itself.     

#### Reducer

- Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers.
## Components




