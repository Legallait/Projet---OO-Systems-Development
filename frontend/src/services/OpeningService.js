import apiFetch from "./apiClient";
import { getCurrentPlayer, updateCurrentPlayerCredits } from "./AuthService";

function getPlayerId() {
    const player = getCurrentPlayer();
    return player ? player.id : null;
}

function openBooster(boxId) {
    const playerId = getPlayerId();
    console.log("[OpeningService] openBooster called with boxId =", boxId, typeof boxId);
    return apiFetch(`/players/${playerId}/boxes/${boxId}/openings`, {
        method: "POST",
    }).then((result) => {
        console.log("[OpeningService] openBooster resolved", result);
        const pulls = Array.isArray(result) ? result : [result];
        updateCurrentPlayerCredits(pulls[pulls.length - 1]?.remainingCredits);
        return result;
    });
}

function getBooster(boxId) {
    console.log("[OpeningService] getBooster called with boxId =", boxId, typeof boxId);
    return apiFetch(`/boxes/${boxId}`).then((result) => {
        console.log("[OpeningService] getBooster resolved", result);
        return result;
    });
}

export default { openBooster, getBooster };