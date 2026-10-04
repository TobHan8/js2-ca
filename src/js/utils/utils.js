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