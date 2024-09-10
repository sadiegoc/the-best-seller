<template>
    <article id="product">
        <div class="card-head">
            <div class="image" :style="{ 'background-image': 'url(' + product.image_url + ')' }"></div>
        </div>
        <div class="card-body">
            <small>{{ product.author }}</small>
            <router-link :to="{ name: 'product', params: { pid: product.id } }">
                {{ product.name }}
            </router-link>
            <button @click.prevent="addToCart">Add to cart | R$ {{ product.price }}</button>
        </div>
    </article>
</template>

<script>
import cart from '@/services/cart.service';
import { mapState } from 'vuex';

export default {
    name: 'ProductComponent',
    props: ['product'],
    computed: mapState(['user', 'cart']),
    methods: {
        addToCart () {
            const productInCart = this.cart.find(p => p.id === this.product.id)
            const productToSave = {
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                image_url: this.product.image_url
            }

            if (productInCart) {
                productToSave.amount = productInCart.amount + 1

                const newCart = this.cart.map(p => {
                    if (p.id === this.product.id)
                        return { ...p, amount: p.amount + 1 }
                    return { ...p }
                })

                localStorage.setItem('cart', JSON.stringify(newCart))
                this.$store.commit('setCart', newCart)
            } else {
                productToSave.amount = 1
                this.$store.state.cart.push(productToSave)
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }

            if (this.user) {
                if (productInCart) {
                    cart.edit(this.user.id, this.product.id, productToSave)
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err))
                } else {
                    cart.save(this.user.id, productToSave)
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err))
                }
            }
        }
    }
}
</script>

<style scoped>
#product {
    width: var(--card-width); height: calc(4 * var(--card-width) / 2);
    display: flex; flex-direction: column;
}

.image {
    width: 100%; height: calc(3 * var(--card-width) / 2);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
}

.card-body * {
    margin: 0; padding: 0;
}

.card-body {
    padding: 5px 0;
    display: flex; flex-direction: column;
    flex-grow: 1; justify-content: space-between;
}

small {
    color: #777;
    font-family: roboto-regular;
    font-size: 0.8rem;
}

a {
    color: #151515;
    font-size: 0.8rem;
    font-family: roboto-regular;
    text-decoration: none;
}

a:hover {
    color: var(--color-theme);
}

button {
    font-family: roboto-regular;
    font-size: 0.8rem;
    color: #fff;
    text-transform: uppercase;

    border: 1px solid var(--color-theme);
    background-color: var(--color-theme);
    border-radius: 5px;
    height: 30px;

    cursor: pointer;
}

button:hover {
    border-color: #000;
}
</style>