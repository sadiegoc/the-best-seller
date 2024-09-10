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
    width: 1200px;
    display: grid; gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    align-items: center; justify-items: center;
}
</style>