import http from "./http";

class Cart {
    get (uid) {
        return http.get(`/cart/${uid}`)
    }

    save (uid, product) {
        return http.post(`/cart/${uid}`, product)
    }
}

export default new Cart()