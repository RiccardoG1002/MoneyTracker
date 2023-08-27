// Local storage
export const fetchNonJsonData = (key) => {
    return localStorage.getItem(key);
};

export const fetchJsonData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key)
}   