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

@media (max-width: 1250px) {
    section#products {
        width: 1000px;
    }
}

@media (max-width: 1050px) {
    section#products {
        width: 800px;
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 850px) {
    section#products {
        width: 600px;
    }
}

@media (max-width: 700px) {
    section#products {
        width: 480px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 530px) {
    section#products {
        width: 100%;
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>