import apiFetch from "./apiClient";

const CURRENT_PLAYER_KEY = "currentPlayer";

const listeners = new Set();

function notifyPlayerChanged() {
    listeners.forEach((listener) => listener());
}

export function subscribePlayer(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export async function register(username, password) {
    const player = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    saveCurrentPlayer(player);
    return player;
}

export async function login(username, password) {
    const player = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    saveCurrentPlayer(player);
    return player;
}

export function saveCurrentPlayer(player) {
    localStorage.setItem(CURRENT_PLAYER_KEY, JSON.stringify(player));
    notifyPlayerChanged();
}

export function updateCurrentPlayerCredits(credits) {
    const player = getCurrentPlayer();
    if (player && typeof credits === "number") {
        saveCurrentPlayer({ ...player, credits });
    }
}

export function getCurrentPlayer() {
    const raw = localStorage.getItem(CURRENT_PLAYER_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function logout() {
    localStorage.removeItem(CURRENT_PLAYER_KEY);
    notifyPlayerChanged();
}