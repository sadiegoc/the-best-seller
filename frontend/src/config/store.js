import { createStore } from "vuex";
import { userStorage } from "./global";

export default createStore({
    state: {
        user: JSON.parse(localStorage.getItem(userStorage)) || null,
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        setCart (state, cart) {
            state.cart = cart
        }
    }
})