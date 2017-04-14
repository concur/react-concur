# PropTypes FTW

## Ben "Qube" Quarmby

---

# The "what" and "why"

* Component schema
* Contract with consumers
* Self documentation
* Validation

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

---

# Require your props

* Optional by default
* Use `isRequired`

```JavaScript
MyComponent.propTypes = {
    href: PropTypes.string.isRequired
};
```

---

# Avoid `any` or `object`

```JavaScript
MyComponent.propTypes = {
    itinerary: PropTypes.object.isRequired
}
```

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
