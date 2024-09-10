<template>
    <section id="products">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product">
        </ProductCard>
    </section>
</template>

<script>
import ProductCard from './ProductCard.vue'
export default {
    name: 'ProductsLayout',
    props: ['products'],
    components: { ProductCard }
}
</script>

<style scoped>
section#products {
    display: grid; gap: 10px;
    grid-template-columns: repeat(4, 1fr);
}
</style>