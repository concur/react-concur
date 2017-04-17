export default function createCallback() {
    // We will snapshot the listeners before dispatching
    // so subscription changes happen on nextListeners
    let currentListeners = [];
    let nextListeners = currentListeners;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function');
        }

        let isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }

            isSubscribed = false;

            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
        };
    }

    function dispatch(...params) {
        // snapshot the next listeners into current listeners
        currentListeners = nextListeners;

        const listeners = currentListeners;

        listeners.forEach((listener) => {
            listener(...params);
        });
    }

    return {
        subscribe,
        dispatch
    };
}
