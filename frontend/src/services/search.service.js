import http from "./http";

class Search {
    search (search) {
        return http.post('/product/search', { search })
    }
}

export default new Search()