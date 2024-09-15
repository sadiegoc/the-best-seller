<template>
    <main id="content">
        <router-view></router-view>
    </main>
</template>

<script>
export default {
    name: 'ContentTemplate'
}
</script>

<style scoped>
main {
    min-height: calc(100vh - var(--header-h) - 250px);
}
</style>