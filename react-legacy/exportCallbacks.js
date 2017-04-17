export default function exportCallbacks(callbacks) {
    global.nui = global.nui || { };

    // Add any callbacks (created through createCallback)
    // to the nui.travel namespace
    global.nui.travel = {
        ...global.nui.travel,
        ...callbacks
    };
}
