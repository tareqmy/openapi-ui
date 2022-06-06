import {ACCESS_TOKEN} from "./Constant";

export const apiUserAuth = () => {
    return {
        Authorization: "Basic " + btoa("spring-cloud-gateway-server:jAmB1geKuFpMWemctlx6hmzEPVrDWMTW")
    }
}

export const authorizationHeader = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) return {};
    return {"Authorization": `Bearer ${accessToken}`};
}

export const getErrorMessage = (error) => {
    try {
        return error.response.data.error_description;
    } catch (e) {
        return "Something went wrong."
    }
}

export const customStringify = (v) => {
    const cache = new Set();
    return JSON.stringify(v, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                // Circular reference found
                try {
                    // If this value does not reference a parent it can be deduped
                    return JSON.parse(JSON.stringify(value));
                } catch (err) {
                    // discard key if value cannot be deduped
                    return;
                }
            }
            // Store value in our set
            cache.add(value);
        }
        return value;
    });
};