import { Router } from '../routing/router.js';
import { state, logIn } from '../state/manageState.js';

export function displayLogin() {

    if (state.isLoggedIn) { // This will never display in reality, but makes the form inaccessible if isLoggedIn: true
        return `

        <div id="title-container" class="title-container">
            <h1>You are already logged in!</h1>
        </div>
        `
    } else {
        return `

        <div id="title-container" class="title-container">
            <h1>Log in to your account</h1>
        </div>

        <div id="login-container">

            <form id="login-form" name="login-form">

                <label for="email">Email (must end with @stud.noroff.no)</label>
                <input id="email" name="email" type="email" placeholder="example@stud.noroff.no" maxlength="30" pattern="[\\w@.]+" required="true">

                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Choose a password" minlength="8" required="true">

                <button id="submit-btn">LOG IN</button>

            </form>

            <a id="register-link" class="register-link">
                <span>Don't have an account? Click here to register</span>
            </a>

        </div>
        `
    }
}

function validateEmail(email) {
    if (email.endsWith('@stud.noroff.no')) {
        return true;
    } else {
        displayToast('Error!', 'Invalid email address! Must be a valid @stud.noroff.no address. Please try again.', 'error');
        return false;
    }
}

export async function initLogin() {

    if (state.isLoggedIn) {
        Router.navigate('/');

    } else {
        const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const formObject = Object.fromEntries(formData);

            if (!validateEmail(formData.get('email'))) {
                return

            } else {
                const apiReq = await logIn(formObject);

                if (apiReq) {
                    console.log('Successfully logged in!');
                    Router.navigate('/');
                } else {
                    return
                }
            }
        });
    }
}