import http from "./http";

class Product {
    get (page = 1) {
        return http.get(`/product?page=${page}`)
    }

    getById (pid) {
        return http.get(`/product/${pid}`)
    }

    getByCategory (cid, page = 1) {
        return http.get(`/product/category/${cid}?page=${page}`)
    }
}

export default new Product()