import { registerUser, loginUser } from '../services/authService.js';
import { writeToken, readToken, deleteToken, writeCurrentUser, readCurrentUser, deleteCurrentUser } from '../storage/store.js';

export const state = {
    token: null,
    currentUser: null,
    isLoggedIn: false,
};

export function hydrateState() {

    const token = readToken();
    const currentUser = readCurrentUser();

    if (currentUser && token) {

        state.token = token;
        state.currentUser = currentUser;
        state.isLoggedIn = true;
    }
}

export async function register(userInput) {
    try {
        await registerUser(userInput);
        return true;

    } catch (error) {
        return false; // Implement custom error handling with displayToast later on
    }
}

export async function logIn(userInput) {
    try {
        const response = await loginUser(userInput);
        const { accessToken, ...userData } = response.data;

        writeToken(accessToken);
        writeCurrentUser(userData);

        state.token = accessToken;
        state.currentUser = userData;
        state.isLoggedIn = true;

        return true;

    } catch (error) {
        return false; // Implement custom error handling with displayToast later on
    }
}

export function logOut() {
    deleteToken();
    deleteCurrentUser();

    state.token = null;
    state.currentUser = null;
    state.isLoggedIn = false;
}