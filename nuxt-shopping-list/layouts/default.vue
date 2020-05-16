<template>
    <div>
        <navigation />
        <nuxt />
    </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
    components: {
        Navigation
    }
}
</script>


<style lang="scss">
body {
    background-color: $blue-4;
    color: $blue-19;
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    margin: 0;
}
</style>
