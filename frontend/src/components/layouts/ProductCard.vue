<template>
    <article id="product">
        <div class="card-head">
            <div class="image" :style="{ 'background-image': 'url(' + product.image_url + ')' }"></div>
        </div>
        <div class="card-body">
            <small>{{ product.author }}</small>
            <span>{{ product.name }}</span>
            <p>{{ product.price }}</p>
        </div>
    </article>
</template>

<script>
export default {
    name: 'ProductComponent',
    props: ['product']
}
</script>

<style scoped>
#product {
    width: var(--card-width); height: 100%;
}

.image {
    width: 100%; height: calc(3 * var(--card-width) / 2);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>