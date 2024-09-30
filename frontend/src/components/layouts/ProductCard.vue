<template>
    <article id="product">
        <div class="card-head">
            <div @click.prevent="selectProduct" class="image" :style="{ 'background-image': 'url(' + product.image_url + ')' }"></div>
            <button class="favorite" :class="{ show: fav }" v-if="user" @click.prevent="favorite"></button>
        </div>
        <div class="card-body">
            <small>{{ product.author }}</small>
            <router-link :to="{ name: 'product', params: { pid: product.id } }">
                {{ product.name }}
            </router-link>
            <button @click.prevent="addToCart">Add to cart | R$ {{ product.price.toString().replace('.', ',') }}</button>
        </div>
    </article>
</template>

<script>
import cart from '@/services/cart.service';
import favorites from '@/services/favorites.service';
import { mapState } from 'vuex';

export default {
    name: 'ProductComponent',
    props: ['product'],
    data: function () {
        return {
            fav: false
        }
    },
    computed: mapState(['user', 'cart']),
    methods: {
        addToCart () {
            const productInCart = this.cart.find(p => p.id === this.product.id)
            const productToSave = { ...this.product }
            
            if (this.user) {
                if (productInCart) {
                    productToSave.amount = productInCart.amount + 1
                    cart.edit(this.user.id, this.product.id, productToSave)
                        .then(res => {
                            localStorage.setItem('cart', JSON.stringify(res.data))
                            this.$store.commit('setCart', res.data)
                        })
                        .catch(err => console.log(err))
                } else {
                    productToSave.amount = 1
                    cart.save(this.user.id, productToSave)
                        .then(res => {
                            localStorage.setItem('cart', JSON.stringify(res.data))
                            this.$store.commit('setCart', res.data)
                        })
                }
            } else {
                if (productInCart) {
                    const newCart = this.cart.map(prod => {
                        if (prod.id === this.product.id)
                            return { ...prod, amount: prod.amount + 1 }
                        return { ...prod }
                    })

                    this.$store.commit('setCart', newCart)
                    localStorage.setItem('cart', JSON.stringify(newCart))
                } else {
                    productToSave.amount = 1
                    this.$store.state.cart.push(productToSave)
                    localStorage.setItem('cart', JSON.stringify(this.cart))
                }
            }
        },
        selectProduct () {
            this.$router.push({ name: 'product', params: { pid: this.product.id } })
        },
        favorite () {
            if (this.user) {
                if (this.fav) {
                    favorites.remove(this.user.id, this.product.id, this.user.token)
                        .then(() => this.fav = !this.fav)
                        .catch(err => console.log(err))
                } else {
                    favorites.save(this.user.id, this.product.id, this.user.token)
                        .then(() => this.fav = !this.fav)
                        .catch(err => console.log(err))
                }
            }
        }
    },
    mounted () {
        this.fav = this.product.favorite
    }
}
</script>

<style scoped>
#product {
    width: var(--card-width); height: calc(4 * var(--card-width) / 2);
    display: flex; flex-direction: column;
}

.card-head {
    position: relative;
}

.image {
    cursor: pointer;
    width: 100%; height: calc(3 * var(--card-width) / 2);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;

    display: flex; justify-content: flex-end;
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

.favorite {
    width: 40px; height: 40px;
    background: rgba(255, 255, 255, 0.6);
    border: none; margin: 5px;
    
    background-image: url(../../assets/imgs/icons/favorites.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;

    z-index: 990; position: absolute;
    top: 0; right: 0;
}

.favorite:hover, .favorite.show {
    background-image: url(../../assets/imgs/icons/heart.png);
}
</style>