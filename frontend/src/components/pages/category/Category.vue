<template>
    <section id="category">
        <div class="products">
            <Products :products="products"></Products>
        </div>
        <div class="pages">
            <div class="row">
                <button v-for="p in pages" :key="p" :class="{ 'active': p == currentPage }" @click.prevent="loadByCategory(p)">
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
    name: 'CategoryView',
    components: { Products },
    data: function () {
        return {
            products: [],
            count: 0,
            limit: 0,
            pages: 0,
            currentPage: 0
        }
    },
    methods: {
        loadByCategory (page) {
            if (this.categoryId) {
                products.getByCategory(this.categoryId, page).then(res => {
                    this.products = res.data.products.map(product => {
                        return {
                            id: product.id,
                            name: product.name,
                            price: product.price.toString().replace('.', ','),
                            stock: product.stock,
                            author: product.author,
                            image_url: bookCovers + product.image_url
                        }
                    })

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
        this.loadByCategory()
    },
    watch: {
        '$route.params.cid': function () {
            this.loadByCategory(1)
        }
    },
    computed: {
        categoryId () {
            return this.$route.params.cid || null
        }
    }
}
</script>

<style scoped>
section#category {
    display: flex; flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin: 50px 0;
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
</style>