import http from "./http";

class Auth {
    login (user) {
        return http.post('/login', user)
    }

    register (user) {
        return http.post('/register', user)
    }
}

export default new Auth()