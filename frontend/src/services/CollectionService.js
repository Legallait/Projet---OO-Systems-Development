import apiFetch from './apiClient.js'
import { updateCurrentPlayerCredits } from './AuthService.js'

async function getCollection(playerId) {  
    const res = await apiFetch(`/players/${playerId}/inventory`);
    return res;
}

export async function sellItem(playerId, itemId) {
    const res = await apiFetch(`/players/${playerId}/inventory/${itemId}/sell`, {
        method: "POST",
    });
    updateCurrentPlayerCredits(res.remainingCredits);
    return res;
}

export default getCollection;
