import { header } from '../constants.js';
import { state, logOut } from '../state/manageState.js';

export function displayHeader() {

    header.innerHTML = '';
    
    const headerNav = document.createElement('nav');
    headerNav.classList.add('header-buttons');
    header.appendChild(headerNav);

    const toggleBtnContainer = document.createElement('div');
    toggleBtnContainer.classList.add('toggleBtn-container');
    headerNav.appendChild(toggleBtnContainer);

    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.id = 'toggle-btn';
    toggleBtn.name = 'Menu toggle button';
    toggleBtn.ariaLabel = 'Click to open menu';
    toggleBtnContainer.appendChild(toggleBtn);

    const toggleBtnIcon = document.createElement('i');
    toggleBtnIcon.classList.add('fa-solid', 'fa-bars');
    toggleBtnIcon.id = 'toggle-icon';
    toggleBtn.appendChild(toggleBtnIcon);

    const toggleBtnIcon2 = document.createElement('i');
    toggleBtnIcon2.classList.add('fa-solid', 'fa-xmark');
    toggleBtnIcon2.id = 'toggle-icon2';
    toggleBtnIcon2.style.display = 'none';
    toggleBtn.appendChild(toggleBtnIcon2);

    toggleBtn.addEventListener('click', () => {
        headerToggle();
    });

    const headerLogoContainer = document.createElement('div');
    headerLogoContainer.classList.add('header-logo-container');
    headerNav.appendChild(headerLogoContainer);

    const headerLogo = document.createElement('a');
    headerLogo.href = '/';
    headerLogo.ariaLabel = 'Return to home page'
    headerLogo.classList.add('header-logo');
    headerLogoContainer.appendChild(headerLogo);

    const logoImg = document.createElement('img');
    logoImg.src = '../../assets/images/logo.png';
    logoImg.alt = 'Cackle clickable logo';
    logoImg.classList.add('header-logo-img');
    headerLogo.appendChild(logoImg);

    const buttonsRight = document.createElement('div');
    buttonsRight.classList.add('header-buttons-right');
    headerNav.appendChild(buttonsRight);

    const loginBtn = document.createElement('a');
    loginBtn.href = '/#/login';
    loginBtn.ariaLabel = 'Go to log in page';
    loginBtn.textContent = 'LOG IN';
    loginBtn.classList.add('header-login-btn');
    buttonsRight.appendChild(loginBtn);

    const registerBtn = document.createElement('a');
    registerBtn.classList.add('header-register-btn');
    registerBtn.href = '/#/register';
    registerBtn.ariaLabel = 'Go to register page';
    registerBtn.text = 'REGISTER';
    buttonsRight.appendChild(registerBtn);

    const dropdownNav = document.createElement('nav');
    dropdownNav.classList.add('dropdown-nav')
    header.appendChild(dropdownNav);

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'HOME';
    homeLink.ariaLabel = 'Go to home page';
    homeLink.classList.add('nav-buttons');
    dropdownNav.appendChild(homeLink);

    const homeLinkIcon = document.createElement('i');
    homeLinkIcon.classList.add('fa-solid', 'fa-house');
    homeLink.appendChild(homeLinkIcon); 

    if (!state.isLoggedIn) {

        const logInLink = document.createElement('a');
        logInLink.href = '/#/login';
        logInLink.ariaLabel = 'Go to log in page';
        logInLink.textContent = 'LOG IN';
        logInLink.classList.add('nav-buttons');
        dropdownNav.appendChild(logInLink);

        const logInIcon = document.createElement('i');
        logInIcon.classList.add('fa-solid', 'fa-right-to-bracket'); 
        logInLink.appendChild(logInIcon);

        const registerLink = document.createElement('a');
        registerLink.href = '/#/register';
        registerLink.ariaLabel = 'Go to register page';
        registerLink.textContent = 'REGISTER';
        registerLink.classList.add('nav-buttons');
        dropdownNav.appendChild(registerLink);

        const registerIcon = document.createElement('i');
        registerIcon.classList.add('fa-solid', 'fa-user-plus');
        registerLink.appendChild(registerIcon);


    } else {

        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';

        const profileButton = document.createElement('a');
        profileButton.href = '/#/profile';
        profileButton.ariaLabel = 'Click to view profile';
        profileButton.classList.add('header-profile-btn');
        buttonsRight.appendChild(profileButton);
        
        const profileIcon2 = document.createElement('i');
        profileIcon2.classList.add('fa-regular', 'fa-circle-user')
        profileButton.appendChild(profileIcon2);

        const profileLink = document.createElement('a');
        profileLink.href = '/#/profile';
        profileLink.textContent = 'VIEW PROFILE';
        profileLink.ariaLabel = 'Click to view profile';
        profileLink.classList.add('nav-buttons');
        dropdownNav.appendChild(profileLink);

        const profileIcon = document.createElement('i');
        profileIcon.classList.add('fa-solid', 'fa-user');
        profileLink.appendChild(profileIcon);

        const createBtn = document.createElement('a');
        createBtn.href = '/';
        createBtn.classList.add('header-create-btn');
        createBtn.ariaLabel = 'Create new post';
        buttonsRight.appendChild(createBtn);

        const createIcon = document.createElement('i');
        createIcon.classList.add('fa-solid', 'fa-pen-to-square');
        createBtn.appendChild(createIcon);

        const createBtn2 = document.createElement('a');
        createBtn2.href = '/';
        createBtn2.textContent = 'CREATE POST';
        createBtn2.ariaLabel = 'Click to create new post';
        createBtn2.classList.add('header-create-button');
        dropdownNav.appendChild(createBtn2);

        const createIcon2 = document.createElement('i');
        createIcon2.classList.add('fa-solid', 'fa-pen-to-square');
        createBtn2.appendChild(createIcon2);

        const menuLogOutBtn = document.createElement('button');
        menuLogOutBtn.classList.add('menu-log-out-btn');
        menuLogOutBtn.ariaLabel = 'Click to log out';
        menuLogOutBtn.textContent = 'LOG OUT';
        dropdownNav.appendChild(menuLogOutBtn);

        const logOutIcon = document.createElement('i');
        logOutIcon.classList.add('fa-solid', 'fa-right-from-bracket');
        menuLogOutBtn.appendChild(logOutIcon);

        menuLogOutBtn.addEventListener('click', () => {
            logOut();
        })
    }

}

let currentState = 0;

function headerToggle() {
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleBtnIcon = document.getElementById('toggle-icon');
    const toggleBtnIcon2 = document.getElementById('toggle-icon2');
    const dropdown = document.querySelector('.dropdown-nav');

        if(currentState === 0) {
            dropdown.style.maxHeight = '600px';
            dropdown.style.overflow = 'auto';
            toggleBtnIcon.style.display = 'none';
            toggleBtnIcon2.style.display = 'flex';
            currentState = 1;

        } else {
            dropdown.style.maxHeight = '0';
            dropdown.style.overflow = 'hidden';
            toggleBtnIcon2.style.display = 'none'
            toggleBtnIcon.style.display = 'flex'
            currentState = 0;
        }
}