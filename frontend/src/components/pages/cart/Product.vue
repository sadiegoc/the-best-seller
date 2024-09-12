<template>
    <section class="product">
        <div class="container">
            <div class="card">
                <div class="image" :style="{ 'background-image': 'url(' + product.image_url + ')' }"></div>
                <div class="info">
                    <div class="title">
                        {{ product.name }}
                    </div>
                    <div class="author">
                        {{ product.author }}
                    </div>
                </div>
                <div class="value">
                    <div class="price">
                        {{ product.price }}
                    </div>
                    <div class="amount">
                        {{ product.amount }}
                    </div>
                    <div class="total">
                        {{ product.amount * product.price }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProductComponent',
    props: ['product']
}
</script>

<style scoped>

</style>