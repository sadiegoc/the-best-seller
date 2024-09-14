<template>
    <section id="search">
        <div class="title">
            <h1>
                Results for "{{ searchText }}"
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
import search from '@/services/search.service';
import { bookCovers } from '@/config/global';

export default {
    name: 'SearchPage',
    components: { Products },
    data: function () {
        return {
            products: [],
            searchText: ""
        }
    },
    methods: {
        loadSearch () {
            this.searchText = this.search
            search.search(this.searchText).then(res => {
                this.products = res.data.map(product => {
                    return {
                        ...product,
                        image_url: bookCovers + product.image_url
                    }
                })
            }).catch(err => console.log(err))
        }
    },
    mounted () {
        this.searchText = this.$route.params.search
        this.loadSearch()
    },
    watch: {
        '$route.params.search': function () {
            this.loadSearch()
        }
    },
    computed: {
        search () {
            return this.$route.params.search || null
        }
    }
}
</script>

<style scoped>
section#search {
    display: flex; flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.pages, .row {
    display: flex; align-items: center;
}

.title h1 {
    font-size: 1.6rem;
    font-family: roboto-regular;
}
</style>