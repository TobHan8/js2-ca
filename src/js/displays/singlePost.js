import { state } from '../state/manageState.js';
import { mainContainer } from '../constants.js';
import { getSinglePost, deletePost, updatePost } from '../services/socialService.js';

export function displaySinglePost() {
    if (state.isLoggedIn) {
        return `
            <div id="title-container" class="title-container"></div>
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

    document.getElementById('title-container').innerHTML = `<h1>${post.title}<h1>`;
    document.getElementById('single-post-container').innerHTML = 
    `<p class="single-post-body">${post.body}</p>
    <div id="single-post-author-container" class="single-post-author-container">
        <span id="single-created" class="single-created">Created: ${post.created.slice(0, 10)}</span>
        <a id="single-post-avatar-container" class="single-post-avatar-container">
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

    console.log(post);
    console.log(post.comments);

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

        const btnContainer = document.getElementById('single-post-btns-container');
        const editBtn = document.createElement('button');
        editBtn.classList.add('single-post-edit-btn');
        editBtn.textContent = 'EDIT';
        btnContainer.appendChild(editBtn);

        const delBtn = document.createElement('button');
        delBtn.classList.add('single-post-del-btn');
        delBtn.textContent = 'DELETE';
        btnContainer.appendChild(delBtn);
        
    }
    

}