import http from "./http";

class Categories {
    get () {
        return http.get('/categories')
    }
}

export default new Categories()