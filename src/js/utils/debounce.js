/**
 * Debounces a function to delay its execution until a timeout interval is finished.
 * When debounce is called on a function the timer resets every time.
 * The wait time argument is set by number value in milliseconds.
 * This debounce function is used in the dynamic search bar feature for all posts on the index page.
 * Its purpose is to limit requests sent to the external searchPosts() API endpoint when a user is typing in the search bar.
 * @param {Function} func - The function debounce delays. 
 * @param {number} wait - Number value of milliseconds to wait after last call before executing next call.
 * @returns {Function} - A debounced version of func.
 */
export function debounce(func, wait) {

    let timeOutId;

    return function (...args) {
        const context = this;

        clearTimeout(timeOutId);

        timeOutId = setTimeout(() => {
            func.apply(context, args);
        },wait);
    }
}