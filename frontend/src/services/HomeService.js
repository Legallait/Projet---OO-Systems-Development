import apiFetch from "./apiClient";

function getBoosters() {
    return apiFetch("/boxes");
}

export default { getBoosters };