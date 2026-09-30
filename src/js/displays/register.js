import { state, register } from '../state/manageState.js';
import { Router } from '../routing/router.js';

export function displayRegister() {

    if (state.isLoggedIn) { // This will never display in reality, but makes the form inaccessible if isLoggedIn: true
        return `
    <div id="title-container" class="title-container"> 
        <h1>Register new account</h1>
    </div>
    `
    } else {
    
        return `
        <div id="title-container" class="title-container">
            <h1>Register new account</h1>
        </div>

        <div id="register-container" class="register-container">

            <form id="register-form" name="register-form" class="register-form">

                <label for="name">Username</label>
                <input id="name" name="name" type="text" placeholder="Select your username" maxlength="20" pattern="[\\w_]+" required="true">

                <label for="email">Email (must end with @stud.noroff.no)</label>
                <input id="email" name="email" type="email" placeholder="example@stud.noroff.no" maxlength="30" pattern="[\\w@.]+" required="true">

                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Choose a password" minlength="8" required="true">

                <label for="password2">Confirm password</label>
                <input id="password2" name="password2" type="password" placeholder="Repeat password" minlength="8" required="true">

                <button id="submit-btn" class="submit-btn">REGISTER</button>

            </form>

            <a id="login-link" class="login-link">
                <span>Already have an account? Click here to log in</span>
            </a>

        </div>
        `
    }
}

function validateEmail(email) {
    if (email.endsWith('@stud.noroff.no')) {
        return true;
    } else {
        console.log('Error!', 'Invalid email address! Must be a valid @stud.noroff.no address. Please try again.', 'error');
        return false;
    }
}

function validatePassword(password, password2) {
    if (password !== password2) {
        console.log('Error!', 'Passwords do not match. Please try again.', 'error');
        return false;
    } else {
        return true;
    } 
}

export function initRegister() {

    if (state.isLoggedIn) {
        Router.navigate('/');

    } else {

        const loginLink = document.getElementById('login-link');
        
        loginLink.addEventListener('click', () => {
            Router.navigate('/login');
        });

        const registerForm = document.getElementById('register-form');
        
        if (!registerForm) {
            return
        }

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formObject = Object.fromEntries(formData);

            if (!validatePassword(formData.get('password'), formData.get('password2')) || (!validateEmail(formData.get('email')))) {
                return
            } else {
                const apiReq = await register(formObject);

                if (apiReq) {
                    console.log('Success! Account registered!');
                } else {
                    return
                }
            }
        });
    }
}
