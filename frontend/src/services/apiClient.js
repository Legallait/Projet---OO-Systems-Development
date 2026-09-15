const API_URL = "http://localhost:8080";

async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message);
    }
    return res.status === 204 ? null : res.json();
}

export default apiFetch;