import { state } from '../state/manageState.js';
import { Router } from '../routing/router.js';
import { mainContainer } from '../constants.js';
import { getProfile, getProfilePosts, followUser } from '../services/socialService.js';

export function displayProfile() {

    if (state.isLoggedIn) {
        return `
            <div id="profile-container" class="profile-container">
                <div id="profile-banner-container" class="profile-banner-container">
                    <img id="profile-banner">
                    <div class="profile-avatar-container">
                        <img id="profile-avatar">
                    </div>
                    <div id="profile-title-container" class="profile-title-container"></div>
                </div>
                <div class="profile-bot-container">
                    <div id="profile-count-container" class="profile-count-container"></div>
                    <div id="profile-btns-container" class="profile-btns-container"></div>
                </div>
            </div>

            <div id="profile-posts-container" class="index-container"></div>
        `;
    } else {
        setTimeout(() => {
            Router.navigate('#/login');
        });
        return `
            <div id="title-container" class="title-container">
                <h1>Please log in to view profile</h1>
            </div>
        `;
    }
}

export async function initProfile() {

    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const name = params.get('name');
    const response = await getProfile(name);
    const profile = response.data;

    document.getElementById('profile-title-container').innerHTML = `<h1>${profile.name}</h1>`; 
    
    const banner = document.getElementById('profile-banner');
    if (profile.banner) {
        banner.src = `${profile.banner.url}`;
        banner.alt = `${profile.banner.alt}`;
    }

    if (banner.src === 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500') {
        banner.src = '/assets/images/default_banner.png';
        banner.alt = 'Cackle default banner';
    }

    const avatar = document.getElementById('profile-avatar');
    if (profile.avatar) {
        avatar.src = `${profile.avatar.url}`;
        avatar.alt = `${profile.avatar.alt}`;

    }
    
    if(avatar.src === 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400') {
        avatar.src = '/assets/images/default_avatar.png';
        avatar.alt = 'Cackle default avatar';
    }

    document.getElementById('profile-count-container').innerHTML = `
        <span>Posts: ${profile._count.posts}</span>
        <span>Followers: ${profile._count.followers}</span>
        <span>Following: ${profile._count.following}</span>
    `;

    renderBtns(profile);

    const profilePosts = await getProfilePosts(profile.name);
            const profilePostsContainer = document.getElementById('profile-posts-container');
            profilePostsContainer.innerHTML = '';
            
            profilePosts.data.forEach(post => {
    
                const profilePostContainer = document.createElement('a');
                profilePostContainer.classList.add('index-post-container');
                profilePostContainer.href = '#/post?id='+ post.id;
                profilePostsContainer.appendChild(profilePostContainer);
    
                const profilePostTitle = document.createElement('h2');
                profilePostTitle.classList.add('index-post-title')
                profilePostTitle.textContent = `${post.title}`;
                profilePostContainer.appendChild(profilePostTitle);
    
                const profilePostBody = document.createElement('p');
                profilePostBody.classList.add('index-post-body');
                profilePostBody.textContent = `${post.body}`;
                profilePostContainer.appendChild(profilePostBody);
    
                const profilePostCreated = document.createElement('span');
                profilePostCreated.classList.add('index-created');
                profilePostCreated.textContent = `Created: ${post.created.slice(0, 10)}`;
                profilePostContainer.appendChild(profilePostCreated);
            });
}
  
async function followCheck(profile) {  

   const currentUser = await getProfile(`${state.currentUser.name}?_following=true`);

   if (currentUser.data.following.some(follower => follower.name === profile.name)) {
        return true;

   } else {
        return false;
   }
}

async function renderBtns(profile) {

    if (profile.name === state.currentUser.name) {
        return
    }
    
    const btnContainer = document.getElementById('profile-btns-container');
    const isFollowing = await followCheck(profile);
    
    if (!isFollowing) {

        btnContainer.innerHTML = `
            <button id="follow-btn" class="follow-btn">FOLLOW
                <i class="fa-solid fa-user-plus"></i>
            </button>
        `;

        const followBtn = document.getElementById('follow-btn');
        followBtn.addEventListener('click', async (event) => {
            const user = profile.name;
            await followUser(user, 'follow');
            console.log(`Followed ${user} successfully`); //Change to displayToast
            initProfile();
        });
    }

    if (isFollowing) {

        btnContainer.innerHTML = `
            <button id="unfollow-btn" class="unfollow-btn">UNFOLLOW
                <i class="fa-solid fa-user-minus"></i>
            </button>
        `;

        const unfollowBtn = document.getElementById('unfollow-btn');
        unfollowBtn.addEventListener('click', async (event) => {
            const user = profile.name;
            await followUser(user, 'unfollow');
            console.log(`Unfollowed ${user} successfully`); //Change to displayToast
            initProfile();
        });
    }

}
