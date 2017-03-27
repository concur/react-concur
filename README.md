# react-concur
Materials for React workshop.

## Suggested Topics
- Demonstration of hosting react/redux in legacy screens - (15 - 30 min)
- Understanding the life cycle of server-side vs. client-side rendering - (45 min)
  - Data Fetching
  - Server-side data loading vs. client-side data loading with componentDidMount as an anti-pattern unless in a HOC
  
- Animations and integrating with redux state changes - (tbd)
- Prop Types best practices - (30 min) Jeff
  - Fully-declared propTypes and detailed shape definitions 
  - Don't unnecessarily invent prop names - align with HTML attribute names
- Pluralization practices (localization) - (15 min)
- Unit testing components (what to test, what a unit is, how to stub 3rd party dependencies) - (45 min) Ryan
  - Jest
  - mockState
  - etc.
- Accessability in React (30 min) Jeffrey
- Handling CSS in React
- Nui-widgets 

## In Progress
(45 min)
- Defining what code lives in a Presentational Component, mapStateToProps, and reducers (Cody Barrus)
- Separating the data access layer (Cody Barrus)
- when to use stateless components, and why (Cody barrus)
- what should NOT go into a component's state
  - Props - in component
  - Props + state - in mapStateToProps
  - State - redux
