<template>
    <section id="collection">
        <div class="title">
            <h1>
                {{ collection }}
            </h1>
        </div>
        <div class="products">
            <Products :products="products"></Products>
        </div>
        <div class="pages" v-if="pages > 1">
            <div class="row">
                <button v-for="p in pages" :key="p" :class="{ 'active': p == currentPage }" @click.prevent="loadByCollection(p)">
                    {{ p }}
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import Products from '@/components/layouts/Products.vue';
import { bookCovers } from '@/config/global';
import products from '@/services/products.service';

export default {
    name: 'CollectionPage',
    components: { Products },
    data: function () {
        return {
            products: [],
            collection: "",
            count: 0,
            limit: 0,
            pages: 0,
            currentPage: 0
        }
    },
    methods: {
        loadByCollection (page) {
            if (this.collectionId) {
                products.getByCollection(this.collectionId, page).then(res => {
                    this.products = res.data.products.map(product => {
                        return {
                            ...product,
                            image_url: bookCovers + product.image_url
                        }
                    })

                    this.collection = this.products[0].collection
                    this.definePages(res.data.count, res.data.limit, page)
                }).catch(err => console.log(err))
            }
        },
        definePages (count, limit, page) {
            this.count = count
            this.limit = limit
            this.pages = Math.ceil(this.count / this.limit)
            this.currentPage = page
        }
    },
    mounted () {
        this.loadByCollection()
    },
    watch: {
        '$route.params.cid': function () {
            this.loadByCollection(1)
        }
    },
    computed: {
        collectionId () {
            return this.$route.params.cid || null
        }
    }
}
</script>

<style scoped>
section#collection {
    display: flex; flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

.title h1 {
    font-size: 1.6rem;
    font-family: roboto-regular;
    text-transform: uppercase;
}
</style>