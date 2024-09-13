<template>
    <section id="product">
        <div class="container">
            <div class="image" :style="{ 'background-image': 'url(' + product.image_url + ')' }"></div>
            <div class="info">
                <div class="product-info">
                    <div class="author">{{ product.author }}</div>
                    <div class="name">{{ product.name }}</div>
                    <div class="category">{{ product.category }}</div>
                    <div class="description">{{ product.description }}</div>
                    <div class="stock">Stock: {{ product.stock }}</div>
                    <div class="favorite">
                        <button class="btn" @click.prevent="favorite" v-if="fav">
                            Remove from favorites
                        </button>
                        <button class="btn" @click.prevent="favorite" v-else>
                            Add to favorites
                        </button>
                    </div>
                </div>
                <div class="sale-info">
                    <div class="price">R$ {{ product.price }}</div>
                </div>
                <div class="add-cart">
                    <button class="btn" @click.prevent="addToCart">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { bookCovers } from '@/config/global';
import cart from '@/services/cart.service';
import favorites from '@/services/favorites.service';
import products from '@/services/products.service';
import { mapState } from 'vuex';

export default {
    name: 'ProductView',
    computed: mapState(['user', 'cart']),
    data: function () {
        return {
            product: {},
            fav: false
        }
    },
    methods: {
        async loadProduct () {
            const pid = this.$route.params.pid
            await products.getById(pid).then(res => {
                this.product = { ...res.data, image_url: bookCovers + res.data.image_url }
                this.fav = this.product.favorite
            }).catch(err => console.log(err))
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
        },
        addToCart () {
            const productInCart = this.cart.find(p => p.id === this.product.id)
            const productToSave = { ...this.product }

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
        },
    },
    mounted () {
        this.loadProduct()
    }
}
</script>

<style scoped>
section#product {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
}

.container {
    width: max-content;
    display: flex;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin: 0 20px;
}

.info {
    max-width: 350px; width: 100%;
    margin-left: 10px;
    display: flex; flex-direction: column;
}

.sale-info {
    width: 100%;
    display: flex; flex-direction: column;
    flex-grow: 1;
}

.image {
    min-width: var(--card-width); height: calc(3 * var(--card-width) / 2);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
}

.info *:not(:last-child) {
    margin-bottom: 5px;
}

.info * {
    font-family: roboto-regular;
}

.author {
    font-size: 0.9rem;
    color: #444;
}

.name {
    font-size: 1.2rem;
}

.category {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #888;
    width: fit-content; padding: 3px 10px;
    border-radius: 16px;
    color: white;
}

.description {
    font-size: 0.8rem;
}

.price {
    font-size: 2rem;
    font-family: roboto-thin;
}

.stock {
    font-size: 0.9rem;
}

.btn {
    border: none;
    background-color: var(--color-theme);
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.price, .add-cart {
    align-self: flex-end;
}

.price {
    display: flex;
    height: 100%;
    align-items: end;
}

@media (max-width: 572px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: var(--card-width);
        margin-bottom: 20px;
    }
}
</style>