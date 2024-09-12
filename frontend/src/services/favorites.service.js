import http from "./http";

class Favorites {
    get (uid, page = 1) {
        return http.get(`/favorites?page=${page}`, { uid })
    }

    save (uid, pid, token) {
        return http.post('/favorites', { uid, pid }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    remove (uid, pid, token) {
        return http.delete(`/favorites?uid=${uid}&pid=${pid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new Favorites()