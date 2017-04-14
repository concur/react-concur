# PropTypes FTW

## Ben "Qube" Quarmby

???

- My background
- Nick name

---

# The "what" and "why"

* Component schema
* Contract with consumers
* Self documentation
* Validation

???

- Pause on validation
- Core of prop types
- Turned off in production
- Actually just functions
- Come back to look at signature later

---

# Using PropTypes

## Formerly built into React

```JavaScript
import React from 'react';

function MyComponent({href}) {
    return (
        <a href={href}>History Eraser Button</a>
    );
}

MyComponent.propTypes = {
    href: React.PropTypes.string
};

export default MyComponent;
```

---

# Using PropTypes

## Now an external dependency
<https://www.npmjs.com/package/prop-types>

```
npm install prop-types
```

```JavaScript
import PropTypes from 'prop-types';

function MyComponent({href}) {
    return (
        <a href={href}>History Eraser Button</a>
    );
}

MyComponent.propTypes = {
    href: PropTypes.string
};

export default MyComponent;
```

---

# Best practices

---

# Naming

Where possible, take inspiration from the DOM.

* HTML vernacular\
  `href` rather than `theLink`
* But\
  `camelCase` not `kebab-case`

???

- Terse and scoped to use
- Intersection of JavaScript and HTML

---

# Require your props

* Optional by default
* Use `isRequired`

```JavaScript
MyComponent.propTypes = {
    href: PropTypes.string.isRequired
};
```

???

- Creates noise in prop types, but worth it
- Shame it isn't other way around
- All required all the time for rest of examples

---

# Avoid `any` or `object`

```JavaScript
MyComponent.propTypes = {
    itinerary: PropTypes.object.isRequired
}
```

???

- What's wrong with this?
- Tells consumers very little
- Pushes runtime errors deeper

---

# Use `shape`

```JavaScript
MyComponent.propTypes = {
    itinerary: PropTypes.shape({
        itineraryId: PropTypes.string.isRequired,
        departureAirport: PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        arrivalAirport: PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
    }).isRequired
}
```

???

- Nesting possible
- Come back to manage nesting

---

# What about dictionaries and lists?

Use `objectOf` and `arrayOf`.

```JavaScript
const airports = {
    "SEA": {
        cityName: "Seattle",
        subdivisionName: "Washington",
        countryCode: "US"
    }
}
const flights = [{
    airportCode: "SEA",
    number: 786
}];

MyComponent.propTypes = {
    airports: PropTypes.objectOf({
        cityName: PropTypes.string.isRequired,
        subdivisionName: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired
    }).isRequired,
    flights: PropTypes.arrayOf({
        airportCode: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired
    }).isRequired
}
```

---

# For heterogeneous props use `oneOfType`

```JavaScript
MyComponent.propTypes = {
    airports: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};
```

## For enums use `oneOf`

```JavaScript
MyComponent.propTypes = {
    shopType: PropTypes.oneOf([
        "BY_PRICE",
        "BY_SCHEDULE",
        "FLEX_FARE"
    ]).isRequired
};
```

???

- Heterogenous props should give pause
- May be neccessary but...
- Schizophrenic API cost

---

# Except...

When you don't own the prop.

```JavaScript
function MyComponent({opaque}) {
    return (
        <div>
            <ExternalComponent opaque={opaque} />
        </div>
    );
}

MyComponent.propTypes = {
    opaque: PropTypes.any.isRequired
}
```

---

# Promote common shapes

Reuse inside a single component:

```JavaScript
const MyPropTypes = {
    airport: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

MyComponent.propTypes = {
    itinerary: PropTypes.shape({
        itineraryId: PropTypes.string.isRequired,
        departureAirport: MyPropTypes.airport.isRequired,
        arrivalAirport: MyPropTypes.airport.isRequired,
    }).isRequired
}
```

Or export and reuse in multiple components:

```JavaScript
export default MyPropTypes;
```

???

- Just JavaScript objects and functions
- Use React building blocks to make your own PropTypes
- Reduces nesting

---

# Build your own

```JavaScript
function awesomeSauce(isRequired, props, propName, componentName) {
    const value = props[propName];

    if (value === null || value === undefined) {
        if (!isRequired) {
            return;
        }

        return new Error(`Prop "${propName}" on component "${componentName}" is required.`);
    }

    if (!value.isAwesome) {
        return new Error(`Prop "${propName}" on component "${componentName}" is not awesome.`)
    }
}

const awesome = awesomeSauce.bind(null, false);
awesome.isRequired = awesomeSauce.bind(null, true);

export default awesome;
```

???

- Actual signature excludes `isRequired`
- Curry to create two versions

---

# Extra resources

* GitHub: [reactjs/prop-types](https://github.com/reactjs/prop-types)
* Facebook: [Typechecking With PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
* Blog: [Why React PropTypes are important](https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/)
* Blog: [React PropType Best Practices](http://davidwells.io/react-prop-type-best-practices/)
