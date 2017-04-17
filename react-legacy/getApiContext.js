function resolveOrchestrationUrl() {
    const nuiConfig = global.nui && global.nui.config;

    return nuiConfig && nuiConfig.orchestration && nuiConfig.orchestration.url;
}

function resolveToken() {
    const session = global.nui && global.nui.session;

    return session && session.jwt;
}

/**
 * Gets an API context appropriate to the outtask environment.
 * @returns {Object} The API context.
 */
export default function getApiContext() {
    const orchestrationUrl = resolveOrchestrationUrl();
    const jwt = resolveToken();

    return {
        orchestrationUrl,
        jwt
    };
}
