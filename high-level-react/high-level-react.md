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

## When props change, Componet Lifecycle begins

---

# Components recieve data through props

```

```

---

## JSX

```JavaScript
// JSX
<h1 className="heading">Hello, world! I am an H1.</h1>

// Compiles to this
React.createElement('h1', {className: "heading"},
    "Hello, world! I am an H1."
)
```

---

## Components

- `class` components
- Stateless components

---

## Lifecycle Methods

![left](./react-lifecycle.png)

---

## Uni-directional Data

---

## React Native
## Isomorphic Rendering

---