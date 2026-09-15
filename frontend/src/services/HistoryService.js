import apiFetch from "./apiClient";

function getHistory(playerId) {
    return apiFetch(`/players/${playerId}/history`);
}

export default { getHistory };