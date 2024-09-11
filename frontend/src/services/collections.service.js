import http from "./http";

class Collections {
    get () {
        return http.get('/collections')
    }
}

export default new Collections()