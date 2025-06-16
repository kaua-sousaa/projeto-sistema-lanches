const API_BASE_URL = 'http://localhost:8080';

export const fetchWithAuth = async (path, options = {}) => {
    const token = localStorage.getItem('userToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, 
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const finalOptions = {
        ...options,
        headers,
    };

    return fetch(`${API_BASE_URL}${path}`, finalOptions);
};