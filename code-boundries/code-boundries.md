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



## Components




