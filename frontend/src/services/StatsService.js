import apiFetch from "./apiClient.js";

function getStats(playerId) {
    return apiFetch(`/players/${playerId}/stats`);
}

export { getStats };