export const saveToken = (t) => localStorage.setItem('token', t);
export const logout = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');
export const isLoggedIn = () => !!getToken();
