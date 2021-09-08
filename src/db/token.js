const TOKEN = 'token';

export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }
  getToken() {
    return localStorage.getItem(TOKEN);
  }
  clearToken() {
    return localStorage.clear(TOKEN);
  }
}
