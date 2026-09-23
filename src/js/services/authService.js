import { apiClient } from './apiClient.js';
import { AUTH_REGISTER_URL, AUTH_LOGIN_URL } from '../constants.js';

export function registerUser(body) {
    return apiClient(AUTH_REGISTER_URL, {body, authHeaders: false})
}

export function loginUser(body) {
    return apiClient(AUTH_LOGIN_URL, { body, authHeaders: false});
}