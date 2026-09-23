import { get, post, put, del } from './apiClient.js';
import { ALL_POSTS_URL, SINGLE_POST_URL, PROFILE_URL, PROFILE_POSTS_URL } from '../constants.js';

export function getAllPosts() {
    return get(ALL_POSTS_URL);
}

export function getSinglePost(id) {
    return get(SINGLE_POST_URL + id);
}

export function createPost(body) {
    return post(ALL_POSTS_URL, body);
}

export function updatePost(id, body) {
    return put(SINGLE_POST_URL + id, body);
}

export function deletePost(id) {
    return del(SINGLE_POST_URL + id);
}

export function searchPosts(query) {
    return get(ALL_POSTS_URL + '/search?q=' + query);
}

export function getProfile(id) {
    return get(PROFILE_URL + id);
}

export function getProfilePosts(name) {
    return get(PROFILE_POSTS_URL + name + '/posts')
}

export function followUser(id, status) {
    if (status === 'follow') {
        return put(PROFILE_URL + id + '/follow');

    } else if (status === 'unfollow') {
        return put(PROFILE_URL + id + '/unfollow');
    }
}

