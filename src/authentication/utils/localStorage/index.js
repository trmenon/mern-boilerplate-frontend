// Setting LocalStorage
const setLocalStorage= (key, value)=> {
    localStorage.setItem(key, JSON.stringify(value));
};

// Remove Local Storage
const removeLocalStorage= (key)=> {
    localStorage.removeItem(key);
};

export {
    setLocalStorage,
    removeLocalStorage
}