import apiFetch from "./apiClient";

const PLAYER_ID = 1;

function openBooster(boxId) {
    console.log("[OpeningService] openBooster called with boxId =", boxId, typeof boxId);
    return apiFetch(`/players/${PLAYER_ID}/boxes/${boxId}/openings`, {
        method: "POST",
    }).then((result) => {
        console.log("[OpeningService] openBooster resolved", result);
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