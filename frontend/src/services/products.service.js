import http from "./http";
import store from "@/config/store";

class Product {
    get (page = 1) {
        const uid = store.state.user?.id || null
        return uid ? http.get(`/product?page=${page}&uid=${uid}`) : http.get(`/product?page=${page}`)
    }

    getById (pid) {
        const uid = store.state.user?.id || null
        return http.get(`/product/${pid}?uid=${uid}`)
    }

    getByCategory (cid, page = 1) {
        const uid = store.state.user?.id || null
        return http.get(`/product/category/${cid}?page=${page}&uid=${uid}`)
    }

    getByCollection (cid, page = 1) {
        const uid = store.state.user?.id || null
        return http.get(`/product/collection/${cid}?page=${page}&uid=${uid}`)
    }

    getFavorites (uid, page = 1) {
        return http.get(`/product/favorites/${uid}?page=${page}`)
    }
}

export default new Product()