import { Router } from '../routing/router.js';
import { state } from '../state/manageState.js';
import { getAllPosts, getSinglePost, createPost, updatePost, deletePost, searchPosts, getProfile, followUser } from '../services/socialService.js';

export function displayIndex() {
    if (state.isLoggedIn) {
        return `

        <div id="title-container" class="title-container">
            <h1>POST FEED</h1>
        </div>

        <div id="index-container" class="index-container">
        </div>


        `
    } else {
        return `
        <div id="title-container" class="title-container">
            <h1>Please log in to view post feed</h1>
        </div>
        `
    }
}

export async function initIndex() {

    if (state.isLoggedIn) {

        const allPosts = await getAllPosts();
        const indexContainer = document.getElementById('index-container');
        
        allPosts.data.forEach(post => {

            const indexPostContainer = document.createElement('div');
            indexPostContainer.classList.add('index-post-container');
            indexContainer.appendChild(indexPostContainer);

            const indexPostTitle = document.createElement('h2');
            indexPostTitle.classList.add('index-post-title')
            indexPostTitle.textContent = `${post.title}`;
            indexPostContainer.appendChild(indexPostTitle);

            const indexPostBody = document.createElement('p');
            indexPostBody.classList.add('index-post-body');
            indexPostBody.textContent = `${post.body}`;
            indexPostContainer.appendChild(indexPostBody);

            const indexCreated = document.createElement('span');
            indexCreated.classList.add('index-created');
            indexPostBody.textContent = `${post.created}`;
            indexPostContainer.appendChild(indexCreated);
        });

    } else {
        Router.navigate('/login');
    }
}