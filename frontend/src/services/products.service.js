import http from "./http";

class Product {
    get (page = 1) {
        return http.get(`/product?page=${page}`)
    }

    getById (pid) {
        return http.get(`/product/${pid}`)
    }
}

export default new Product()