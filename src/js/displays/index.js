import { Router } from '../routing/router.js';
import { state } from '../state/manageState.js';
import { getAllPosts, getSinglePost, createPost, updatePost, deletePost, searchPosts, getProfile, followUser } from '../services/socialService.js';

export function displayIndex() {
    if (state.isLoggedIn) {
        return `

        <div id="title-container" class="title-container">
            <h1>CREATE NEW POST</h1>
        </div>

        <form id="create-post-form" name="create-post-form" class="create-post-form">
            <input id="title" name="title" class="create-post-title" type="text" maxlength="30" minlength="3" placeholder="Choose a title for your post"></input>
            <textarea id="body" name="body" class="post-input" maxlength="300" placeholder="What are we cackling about today...?"></textarea>
            <button id="publish-button" class="publish-button">PUBLISH POST</button>
        </form>

        <div id="title-container" class="title-container">
            <h1>POST FEED</h1>
        </div>

        <div id="index-container" class="index-container"></div>
        
        <div class="load-btn-container">
            <button id="load-more-btn" class="load-more-btn">LOAD MORE</button>
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

    if (!state.isLoggedIn) {
        setTimeout(() => {
            Router.navigate('/login');
        }, 2000);
        return;
    }

    currentPage = 1;
    await loadPosts(currentPage);

    document.getElementById('load-more-btn').addEventListener('click', () => {
        if (!isFetching) {
            currentPage++;
            loadPosts(currentPage);
        }
    });

    const postForm = document.getElementById('create-post-form');

    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData);

        const apiReq = await createPost(formObject);

        if (apiReq) {
            console.log('Post created successfully!'); //Change to displayToast later

            setTimeout(() => {
                Router.navigate('/');
            }, 2000);

        } else {
            return
        }
    });
}

function renderPosts(post, container) {

    const indexPostContainer = document.createElement('a');
    indexPostContainer.classList.add('index-post-container');
    indexPostContainer.href = '#/post?id='+ post.id;
    container.appendChild(indexPostContainer);

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
    indexCreated.textContent = `Created: ${post.created.slice(0, 10)}`;
    indexPostContainer.appendChild(indexCreated);
}

let currentPage = 1;
let isFetching = false;

async function loadPosts(page) {

    isFetching = true;
    const loadBtn = document.getElementById('load-more-btn');
    loadBtn.textContent = 'LOADING...';
    loadBtn.disabled = true;

    try {
        const response = await getAllPosts(page);
        const posts = response.data;
        const meta = response.meta;

        const container = document.getElementById('index-container');
        posts.forEach(post => renderPosts(post, container));

        if (meta.isLastPage) {
            loadBtn.style.display = 'none';
        } else {
            loadBtn.textContent = 'LOAD MORE';
            loadBtn.disabled = false;
        }
    } catch (error) {
        console.log('Failed to load posts', error) // Change to displayToast
        loadBtn.textContent = 'TRY AGAIN';
        loadBtn.disabled = false;
    } finally {
        isFetching = false;
    }
}