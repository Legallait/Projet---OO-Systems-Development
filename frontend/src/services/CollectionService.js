import apiFetch from './apiClient.js'

async function getCollection(playerId) {
    return res = await apiFetch(`${playerId}/inventory`);
}

export default getCollection;