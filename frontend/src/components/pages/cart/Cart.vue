<template>
    <section id="cart">
        <div class="container">
            <div class="content">
                <div class="product" v-for="p in cart" :key="p.id">
                    <div class="image" :style="{ 'background-image': 'url(' + p.image_url + ')' }"></div>
                    <div class="data">
                        <div class="author">
                            {{ p.author }}
                        </div>
                        <div class="name">
                            <router-link :to="{ name: 'product', params: { pid: p.id } }">
                                {{ p.name }}
                            </router-link>
                        </div>
                        <div class="price">
                            R${{ p.price.toString().replace('.', ',') }}
                        </div>
                    </div>
                    <div class="control">
                        <div class="amount">
                            <button class="minus" @click.prevent="minus(p.id)">-</button>
                            <div class="quantity">
                                {{ p.amount }}
                            </div>
                            <button class="plus" @click.prevent="plus(p.id)">+</button>
                        </div>
                        <button class="remove" @click.prevent="remove(p.id)">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div class="summary">
                <div class="card">
                    <h1>Summary</h1>
                    <div class="description">
                        <div class="subtotal">
                            <span>
                                Subtotal
                            </span>
                            <span>
                                R$ {{ subTotal.toFixed(2).toString().replace('.', ',') }}
                            </span>
                        </div>
                        <div class="shipping">
                            <span>Shipping</span>
                            <span>R$ 0,00</span>
                        </div>
                        <div class="discount">
                            <span>Discount</span>
                            <span>R$ 0,00</span>
                        </div>
                        <div class="total">
                            <span>Total :</span>
                            <span>
                                R$ {{ subTotal.toFixed(2).toString().replace('.', ',') }}
                            </span>
                        </div>
                    </div>
                </div>
                <button class="checkout">
                    Checkout
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import cart from '@/services/cart.service';
import { mapState } from 'vuex';

export default {
    name: 'CartView',
    data: function () {
        return {
            subTotal: 0
        }
    },
    computed: mapState(['cart', 'user']),
    methods: {
        calculateSubTotal () {
            this.subTotal = 0
            this.cart.forEach(product => {
                this.subTotal += product.price * product.amount
            });
        },
        minus (pid) {
            let productToSave = {}
            const cartToSave = this.cart.map(product => {
                if (product.id === pid && product.amount > 0) {
                    productToSave = { ...product, amount: product.amount - 1 }
                    return productToSave
                }

                return { ...product }
            })

            this.updateCart(cartToSave)
            this.calculateSubTotal()
            if (this.user) {
                cart.edit(this.user.id, pid, productToSave)
                    .then(resp => console.log(resp.data))
                    .catch(err => console.log(err))
            }
        },
        plus (pid) {
            let productToSave = {}
            const cartToSave = this.cart.map(product => {
                if (product.id === pid && product.amount < product.stock) {
                    productToSave = { ...product, amount: product.amount + 1 }
                    return productToSave
                }

                return { ...product }
            })

            this.updateCart(cartToSave)
            this.calculateSubTotal()
            if (this.user) {
                cart.edit(this.user.id, pid, productToSave)
                    .then(resp => console.log(resp.data))
                    .catch(err => console.log(err))
            }
        },
        remove (pid) {
            if (this.user) {
                cart.remove(this.user.id, pid)
                    .then(res => {
                        this.updateCart(res.data)
                        this.calculateSubTotal()
                    })
                    .catch(err => console.log(err))
            } else {
                const cartToSave = this.cart.filter(product => product.id !== pid)
                this.updateCart(cartToSave)
                this.calculateSubTotal()
            }
        },
        updateCart (cartToSave) {
            this.$store.commit('setCart', cartToSave)
            localStorage.setItem('cart', JSON.stringify(cartToSave))
        }
    },
    mounted () {
        if (this.user) {
            cart.get(this.user.id)
                .then(resp => this.$store.commit('setCart', resp.data))
                .catch(err => console.log(err))
        }
        this.calculateSubTotal()
    }
}
</script>

<style scoped>
section#cart {
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    margin: 30px 10px;
}

.container {
    width: 100%;
    display: flex; flex-direction: row;
    justify-content: center; align-items: flex-start;
}

.content {
    width: 100%; max-width: 600px;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
}

.product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px; border-radius: 5px;
}

.product:not(:last-child) {
    margin-bottom: 10px;
}

.data {
    flex-grow: 1;
    display: flex; flex-direction: column;
    margin: 0 10px;
}

.data .name a {
    text-decoration: none;
    color: #333;
    font-family: roboto-regular;
    font-size: 0.9rem;
}

.data .name a:hover {
    text-decoration: underline;
}

.data .author {
    font-family: roboto-regular;
    font-size: 0.8rem;
    color: #777;
}

.data .price {
    font-family: roboto-regular;
    font-size: 1rem;
}

.image {
    min-width: calc(var(--card-width) / 2); height: calc(3 * var(--card-width) / 4);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
}

.price {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
}

.control, .control button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.control {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.control .quantity {
    display: flex; align-items: center;
    font-family: roboto-regular;
}

.control .amount {
    border: 1px solid #ddd;
    height: fit-content;
    align-self: center;
    border-radius: 5px;
    display: flex;
    margin: 0 5px;
    font-family: roboto-regular;
}

.control .amount button {
    border: none;
    background: transparent;
    width: 30px; height: 30px;
    cursor: pointer;
    padding: 0; margin: 0;
    font-family: roboto-regular;
    font-size: 1rem;
}

.control button.remove {
    background: transparent;
    border: none;
    font-family: roboto-regular;
    font-size: 0,7rem;
    margin: 5px 0;
    cursor: pointer;
}

.control button.remove:hover {
    text-decoration: underline;
}

.summary {
    max-width: 500px; width: 100%;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;

    margin-left: 10px;
}

.card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.summary h1 {
    text-align: center;
    padding: 10px 0; margin: 0;
    width: 100%;
    border-bottom: 1px solid #ddd;
}

.summary, .description {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.description div {
    display: flex; justify-content: space-between;
    padding: 10px 20px;
}

.description div span {
    font-family: roboto-regular;
    font-size: 0.8rem;
    text-transform: uppercase;
}

.description div:not(:first-child) {
    border-top: 1px solid #ddd;
}

.total span {
    font-weight: 600;
}

.summary h1 {
    font-family: roboto-regular;
}

button.checkout {
    border: none;
    border-radius: 5px;
    background-color: darkgreen;
    height: 40px;
    font-family: roboto-regular;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    margin-top: 10px;
}

@media (max-width: 772px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .summary {
        margin: 10px auto;
    }
}
</style>