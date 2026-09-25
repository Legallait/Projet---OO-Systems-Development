const API_URL = "http://localhost:8080";

let activeRequests = 0;
const listeners = new Set();

function notify() {
    listeners.forEach((listener) => listener(activeRequests > 0));
}

function subscribeLoading(listener) {
    listeners.add(listener);
    listener(activeRequests > 0);
    return () => listeners.delete(listener);
}

function resolveAssetUrl(path) {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${API_URL}${path}`;
}

// Plain fetch, outside the loading counter: used to poll while the backend boots and seeds its data.
async function checkBackendReady() {
    try {
        const res = await fetch(`${API_URL}/status`);
        if (!res.ok) return false;
        const body = await res.json();
        return body.ready === true;
    } catch {
        return false;
    }
}

async function apiFetch(path, options = {}) {
    activeRequests += 1;
    notify();
    try {
        const res = await fetch(`${API_URL}${path}`, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(error.message);
        }
        return res.status === 204 ? null : res.json();
    } finally {
        activeRequests -= 1;
        notify();
    }
}

export { resolveAssetUrl, subscribeLoading, checkBackendReady };
export default apiFetch;