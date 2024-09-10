import http from "./http";

class Cart {
    get (uid) {
        return http.get(`/cart/${uid}`)
    }

    save (uid, product) {
        return http.post(`/cart/${uid}`, product)
    }

    edit (uid, pid, product) {
        return http.patch(`/cart/${uid}/${pid}`, product)
    }

    remove (uid, pid) {
        return http.delete(`/cart/${uid}/${pid}`)
    }
}

export default new Cart()