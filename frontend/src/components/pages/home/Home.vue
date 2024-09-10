<template>
    <section id="home">
        <div class="container">
            <div class="image-start">
                <h1>Stephen Hawking</h1>
                <router-link to="/collection">
                    Know the collection
                </router-link>
            </div>
            <div class="new-arrivals">
                <h1>New Arrivals</h1>
            </div>
            <div class="categories">
                <div class="buttons">
                    <button class="active">All</button>
                    <button>Adventure</button>
                    <button>Romance</button>
                    <button>Terror</button>
                </div>
            </div>
            <div class="products">
                <Products :products="products"></Products>
            </div>
        </div>
    </section>
</template>

<script>
import Products from '@/components/layouts/Products.vue';
import products from '@/services/products.service';
import { bookCovers } from '../../../config/global';

export default {
    name: 'HomeView',
    components: { Products },
    data: function () {
        return {
            products: [],
            page: this.$route.params.page || 1
        }
    },
    methods: {
        loadProducts () {
            products.get(this.page).then(res => {
                this.products = res.data.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price.toString().replace('.', ','),
                        stock: product.stock,
                        author: product.author,
                        image_url: bookCovers + product.image_url
                    }
                })
            })
        }
    },
    mounted () {
        this.loadProducts()
    }
}
</script>

<style scoped>
section#home {
    width: 100%; height: 100%;
    margin: 0; padding: 0;
}

.container {
    max-width: 1200px; width: 100%; height: auto;
    margin: 0 auto; padding: 0;

    display: flex; flex-direction: column;
    justify-content: start; align-items: center;
}

.image-start {
    position: relative;
    width: 100%; height: 500px;
    background-image: url(../../../assets/imgs/stephen-hawking.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.image-start h1, .image-start a {
    position: absolute;
}

.image-start h1 {
    top: 40px; right: 40px;
    margin: 0; color: #fff;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
}

.image-start a {
    background: rgba(0, 0, 0, 0.7);
    bottom: 40px; right: 40px;
    margin: 0; color: var(--color-theme);
    text-decoration: none;
    border: 2px solid var(--color-theme);
    padding: 10px;
}

.products {
    margin: 50px auto;
}

.new-arrivals h1 {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 100;
    margin: 30px 0;
    text-align: center;
    border-bottom: 3px solid var(--color-theme);
}

.categories button {
    border: none; background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    padding: 10px; margin: 0 5px;
    cursor: pointer;
    color: #000;
    font-family: roboto-regular;
}

.categories button.active {
    background-color: var(--color-theme);
    color: white;
}

@media (max-width: 920px) {
    .image-start {
        height: 350px;
    }
}

@media (max-width: 572px) {
    .image-start h1 {
        top: 20px; right: 20px;
        font-size: 1.2rem;
    }

    .image-start a {
        bottom: 20px; right: 20px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .image-start {
        height: 250px;
    }
}
</style>