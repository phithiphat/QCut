import api from './api';

const register = (username: string, email: string, password: string, role: string) => {
    return api.post('/auth/register', {
        username,
        email,
        password,
        role
    });
};

const login = (username: string, password: string) => {
    return api.post('/auth/login', {
        username,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            console.error("Error parsing user from local storage", e);
            localStorage.removeItem('user');
            return null;
        }
    }
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
