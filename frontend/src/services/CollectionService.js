import apiFetch from './apiClient.js'

async function getCollection(playerId) {  
    const res = await apiFetch(`/players/${playerId}/inventory`);
    return res;
}

export default getCollection;