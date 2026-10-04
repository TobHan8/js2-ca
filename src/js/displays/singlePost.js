import { state } from '../state/manageState.js';
import { mainContainer } from '../constants.js';
import { getSinglePost, deletePost, updatePost } from '../services/socialService.js';
import { Router } from '../routing/router.js';

export function displaySinglePost() {
    if (state.isLoggedIn) {
        return `
            <div id="single-post-title-container" class="single-post-title-container"></div>
            <div id="single-post-container" class="single-post-container"></div>
            <div id="title-container" class="title-container">
                <h2>COMMENTS<H2>
            </div>
        `
    } else {
        return `
            <div id="title-container" class="title-container">
                <h1>Please log in to view post</h1>
            </div>
        `
    }
}

export async function initSinglePost() {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');

    const response = await getSinglePost(id);
    const post = response.data;

    document.getElementById('single-post-title-container').innerHTML = `<h1 id="single-post-title">${post.title}<h1>`;
    document.getElementById('single-post-container').innerHTML = 
    `<p id="single-post-body" class="single-post-body">${post.body}</p>
    <div id="single-post-author-container" class="single-post-author-container">
        <span id="single-created" class="single-created">Created: ${post.created.slice(0, 10)}</span>
        <a id="single-post-avatar-container" class="single-post-avatar-container" href="#/profile?name=${post.author.name}">
            <img id="single-post-avatar" class="single-post-avatar">
        </a>
        <span id="single-post-author" class="single-post-author">${post.author.name}</span>
        <span id="single-updated" class="single-updated"<span>
    </div>
    <div id="single-post-btns-container" class="single-post-btns-container">
    </div>
    `;


    const avatar = document.getElementById('single-post-avatar');
    if (post.author.avatar) {
        avatar.src = `${post.author.avatar.url}`;
        avatar.alt = `${post.author.avatar.alt}`;

    }
    
    if(avatar.src === 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400') {
        avatar.src = 'assets/images/default_avatar.png';
        avatar.alt = 'Cackle default avatar';
    }
    

    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    mainContainer.appendChild(commentsContainer);

    if (post.comments && post.comments.length > 0) {

        post.comments.forEach(comment => {
            const commentContainer = document.createElement('div');
            commentContainer.classList.add('comment-container');
            commentsContainer.appendChild(commentContainer);

            const commentText = document.createElement('p');
            commentText.classList.add('comment-text');
            commentText.textContent = `${comment.body}`;
            commentContainer.appendChild(commentText);
        });
    } else {
        
        const noComments = document.createElement('span');
        noComments.classList.add('no-comments');
        noComments.textContent = 'This post has no comments yet...';
        commentsContainer.appendChild(noComments);
    }

    if (post.author.email === state.currentUser.email) {
        renderEdit(post);
    }

}

let editing = false;

function renderEdit(post) {
    const singlePostTitle = document.getElementById('single-post-title');
    const singlePostBody = document.getElementById('single-post-body');
    const btnContainer = document.getElementById('single-post-btns-container');

    if (editing) {
        btnContainer.innerHTML = `
            <button id="single-post-save-btn" class="single-post-edit-btn">SAVE</button>
            <button id="single-post-cancel-btn" class="single-post-del-btn">CANCEL</button>
        `;

        const editPostTitle = document.createElement('input');
        editPostTitle.id = 'edit-single-post-title';
        editPostTitle.classList.add('edit-single-post-title');
        editPostTitle.value = post.title;
        singlePostTitle.replaceWith(editPostTitle);

        const editPostBody = document.createElement('textarea');
        editPostBody.id = 'edit-single-post-body';
        editPostBody.classList.add('edit-single-post-body');
        editPostBody.value = post.body;
        singlePostBody.replaceWith(editPostBody);

        document.getElementById('single-post-save-btn').addEventListener('click', async () => {
            const newBody = document.getElementById('edit-single-post-body').value;
            await updatePost(post.id, { title: post.title, body: newBody});
            editing = false;
            post.body = newBody;
            
            const textarea = document.getElementById('edit-single-post-body');
            const p = document.createElement('p');
            p.id = 'single-post-body';
            p.classList.add('single-post-body');
            p.textContent = newBody;
            textarea.replaceWith(p);

            renderEdit(post);
        });

        document.getElementById('single-post-cancel-btn').addEventListener('click', () => {
            editing = false;

            const input = document.getElementById('edit-single-post-title');
            const h1 = document.createElement('h1');
            h1.id = 'single-post-title';
            h1.classList.add('h1');
            h1.textContent = post.title;
            input.replaceWith(h1);

            const textarea = document.getElementById('edit-single-post-body');
            const p = document.createElement('p');
            p.id = 'single-post-body';
            p.classList.add('single-post-body');
            p.textContent = post.body;
            textarea.replaceWith(p);

            renderEdit(post);
        });

    } else {
        btnContainer.innerHTML = `
            <button id="single-post-edit-btn" class="single-post-edit-btn">EDIT</button>
            <button id="single-post-del-btn" class="single-post-del-btn">DELETE</button>
        `;

        document.getElementById('single-post-edit-btn').addEventListener('click', () => {
            editing = true;
            renderEdit(post);
        });

        document.getElementById('single-post-del-btn').addEventListener('click', async () => {
            await deletePost(post.id);
            console.log('Post successfully deleted!') //Change to displayToast later on
            setTimeout(() => {
                Router.navigate('/');
            },2000);
        });


    }
}