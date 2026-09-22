export function writeToken(accessToken) {
    try {
        localStorage.setItem('accessToken', accessToken);
    } catch (error) { //Add custom error handling later on
        return null;
    }
}

export function readToken() {
    try {
        return localStorage.getItem('accessToken');
    } catch (error) { //Add custom error handling later on
        return null;
    }
}

export function deleteToken() {
    try {
        localStorage.removeItem('accessToken');
    } catch (error) { //Add custom error handling later on
        return null;
    }
}

export function writeCurrentUser(currentUser) {
    try {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } catch (error) { //Add custom error handling later on
        return null;
    }
}

export function readCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) { //Add custom error handling later on
        return null;
    }
}

export function deleteCurrentUser() {
    try {
        localStorage.removeItem('currentUser');
    } catch (error) {  //Add custom error handling later on
        return null;
    }
}