<template>
    <section id="home">
        <div class="container">
            <div class="image-start">
                <h1>Stephen Hawking</h1>
                <router-link :to="{ name: 'collection', params: { cid: 3 } }">
                    Know the collection
                </router-link>
            </div>
            <div class="new-arrivals">
                <h1>New Arrivals</h1>
            </div>
            <div class="categories">
                <div class="buttons">
                    <button :class="{ active: !currentCategory }" @click.prevent="loadProducts()">All</button>
                    <button v-for="c in categories" :key="c.id" @click.prevent="loadProducts(1, c.id)" :class="{ active: currentCategory === c.id }">{{ c.name }}</button>
                </div>
            </div>
            <div class="products">
                <Products :products="products"></Products>
            </div>
            <div class="pages" v-if="pages > 1">
                <div class="row">
                    <button v-for="p in pages" :key="p" :class="{ 'active': p == currentPage }" @click.prevent="loadProducts(p, currentCategory)">
                        {{ p }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Products from '@/components/layouts/Products.vue';
import products from '@/services/products.service';
import { bookCovers } from '../../../config/global';
import { mapState } from 'vuex';

export default {
    name: 'HomeView',
    computed: mapState(['categories']),
    components: { Products },
    data: function () {
        return {
            products: [],
            count: 0,
            limit: 0,
            pages: 0,
            currentPage: 0,
            currentCategory: null
        }
    },
    methods: {
        loadProducts (page = 1, cid = null) {
            if (cid) {
                this.currentCategory = cid
                this.loadByCategory(page, cid)
            } else {
                this.currentCategory = null
                this.loadAllProducts(page)
            }
        },
        loadAllProducts (page = 1) {
            products.get(page).then(res => {
                this.products = res.data.products.map(product => {
                    return {
                        ...product,
                        image_url: bookCovers + product.image_url
                    }
                })
    
                this.definePages(res.data.count, res.data.limit, page)
            }).catch(err => console.log(err))
        },
        loadByCategory (page = 1, cid) {
            products.getByCategory(cid, page).then(res => {
                this.products = res.data.products.map(product => {
                    return {
                        ...product,
                        image_url: bookCovers + product.image_url
                    }
                })

                this.definePages(res.data.count, res.data.limit, page)
            }).catch(err => console.log(err))
        },
        definePages (count, limit, page) {
            this.count = count
            this.limit = limit
            this.pages = Math.ceil(this.count / this.limit)
            this.currentPage = page
        }
    },
    mounted () {
        this.loadAllProducts()
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

.categories {
    width: 100%;
    display: flex; justify-content: center;
}

.categories .buttons {
    text-align: center;
}

.categories button {
    border: 1px solid #ccc; background: #fff;
    border-radius: 5px;
    padding: 10px; margin: 0 5px;
    cursor: pointer;
    color: #000;
    font-family: roboto-regular;
}

.categories button.active {
    background-color: var(--color-theme);
    color: white;
    border-color: var(--color-theme);
}

.pages, .row {
    display: flex; align-items: center;
}

.row button {
    border: 1px solid #ccc; border-radius: 50%;
    padding: 0; margin: 0 5px;
    width: 30px; height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #fff;
    cursor: pointer;
    font-size: 1.1rem;
}

.row button.active {
    background-color: var(--color-theme);
    color: white;
    border-color: var(--color-theme);
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