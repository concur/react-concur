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
  `href` not `theLink`
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
    itinerary: PropTypes.object
}
```

---

# Use `shape`

```JavaScript
MyComponent.propTypes = {
    itinerary: PropTypes.shape({
        itineraryId: PropTypes.string.isRequired,
        departureName: PropTypes.string.isRequired,
        arrivalTime: PropTypes.date.isRequired
    })
}
```

---

# For dictionaries use `objectOf`

---

# For arrays use `arrayOf`

---

# For enums use `oneOf`

---

# For heteregeneous props use `oneOfType`

---

# Except...

When you don't own it.

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
