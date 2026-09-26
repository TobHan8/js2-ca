import { API_KEY, BASE_URL } from "../constants.js";
import { readToken } from "../storage/store.js";

export async function apiClient(endpoint, options = {}) {

    const { body, authHeaders = true, ...customOptions } = options;

    const token = readToken();

    const headers = {
        'Content-Type': 'application/json',
        
    };

    if (authHeaders) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['X-Noroff-API-Key'] = API_KEY;
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customOptions,
        headers: {
            ...headers,
            ...customOptions.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(BASE_URL + endpoint, config);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.errors?.[0]?.message || 'Error! Failed to retrieve data from external API' // Add more custom error handling and classes later on
            );
        }

        if (response.status === 204) {
            return null; 
        }

        return await response.json();
    } catch (error) { // Add more custom error handling and classes later on
        throw error;
    }
}

export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) => apiClient(endpoint, { method: 'PUT', body });
export const del = (endpoint) => apiClient(endpoint, { method: 'DELETE' });