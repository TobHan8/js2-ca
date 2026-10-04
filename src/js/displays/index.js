import { Router } from '../routing/router.js';
import { state } from '../state/manageState.js';
import { getAllPosts, createPost, searchPosts } from '../services/socialService.js';
import { debounce } from '../utils/debounce.js';

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

        <div class="search-container">
            <input id="search-bar" class="search-bar" type="text" placeholder="Search all posts...">
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

        try {
            await createPost(formObject);
            console.log('Post created successfully');

            event.target.reset();
            
            const container = document.getElementById('index-container');
            container.innerHTML = '';
            currentPage = 1;
            document.getElementById('load-more-btn').style.display = 'flex';
            await loadPosts(currentPage);
        } catch (error) {
            console.log('Failed to create post', error)
        }
    });

    search();
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

async function search() {

    const searchBar = document.getElementById('search-bar');

    const debounceSearch = debounce(async (query) => {
        const container = document.getElementById('index-container');
        const loadBtn = document.getElementById('load-more-btn');

        if (query.trim() === '') {
            container.innerHTML = '';
            currentPage = 1;
            loadBtn.style.display = 'flex';
            await loadPosts(currentPage);
            return;
        }

        try {
            const response = await searchPosts(query);
            container.innerHTML = '';
            loadBtn.style.display = 'none';
            response.data.forEach(post => renderPosts(post, container));

            if (response.data.length === 0) {
                container.innerHTML = `
                <span class="no-search">No posts matches the search "${query}". Please try again</span>
                `
            }

        } catch (error) {
            console.log('Failed to retrieve search', error); //Change to displayToast later 
        }

    }, 500);

    searchBar.addEventListener('input', (event) => {
            debounceSearch(event.target.value);
        });
}