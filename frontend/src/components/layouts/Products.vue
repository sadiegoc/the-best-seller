<template>
    <section id="products">
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>price</th>
                    <th>stock</th>
                    <th>author</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.author }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    name: 'ProductsLayout',
    props: ['products']
}
</script>

<style scoped>

</style>