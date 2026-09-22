import { API_KEY, BASE_SITE_URL } from "../constants";
import { getToken } from '../'

async function apiClient(endpoint, options = {}) {

    const accessToken = getToken();
    const { body, ...customOptions } = options;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
    };

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
        const response = await fetch(BASE_SITE_URL + endpoint, config);

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