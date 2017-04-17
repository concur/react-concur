import { bindActionCreators } from 'redux';

export default function exportActions(actions, dispatch) {
    global.nui = global.nui || { };

    // Bind the action creators and add them onto nui.travel
    global.nui.travel = {
        ...global.nui.travel,
        ...bindActionCreators(actions, dispatch)
    };
}
