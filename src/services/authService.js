import Cookies from 'js-cookie';

// Always use the proxy endpoint in both dev and production
const AUTH_API_URL = '/api/login';  

export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 30 });
        return { success: true, token: data.jwt_token };
      } else {
        return { success: false, error: data.error_msg };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  logout: () => {
    Cookies.remove('jwt_token');
  },

  getToken: () => {
    return Cookies.get('jwt_token');
  },

  isAuthenticated: () => {
    return !!Cookies.get('jwt_token');
  },
};
