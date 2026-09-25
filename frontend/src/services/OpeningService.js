import apiFetch from "./apiClient";
import { getCurrentPlayer, updateCurrentPlayerCredits } from "./AuthService";

function getPlayerId() {
    const player = getCurrentPlayer();
    return player ? player.id : null;
}

function openBooster(boxId) {
    const playerId = getPlayerId();
    return apiFetch(`/players/${playerId}/boxes/${boxId}/openings`, {
        method: "POST",
    }).then((result) => {
        const pulls = Array.isArray(result) ? result : [result];
        updateCurrentPlayerCredits(pulls[pulls.length - 1]?.remainingCredits);
        return result;
    });
}

function getBooster(boxId) {
    return apiFetch(`/boxes/${boxId}`);
}

export default { openBooster, getBooster };