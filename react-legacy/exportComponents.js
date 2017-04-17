import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { forOwn } from 'lodash';

function wrapComponent(Component, Container, containerProps) {
    return {
        createElement(componentProps) {
            const component = <Component {...componentProps} />;

            // If there is a Container type, then wrap the component in
            // a container element, providing the container its props
            if (Container) {
                return (
                    <Container {...containerProps} children={component} />
                );
            }

            return component;
        },

        render(props, containerId) {
            const container = document.getElementById(containerId);
            ReactDOM.render(this.createElement(props), container);
        },

        renderToStaticMarkup(props) {
            return ReactDOMServer.renderToStaticMarkup(this.createElement(props));
        }
    };
}

export default function exportComponents(componentTypes, Container, containerProps) {
    global.nui = global.nui || { };
    global.nui.travel = global.nui.travel || { };

    // Each component will become available on nui.travel with the following functions:
    // - createElement
    // - render
    // - renderToStaticMarkup
    forOwn(componentTypes, (componentType, name) => {
        global.nui.travel[name] = wrapComponent(componentType, Container, containerProps);
    });
}
