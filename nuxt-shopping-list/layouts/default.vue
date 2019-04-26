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
    margin: 0;
    background-color: $city-blue;
}
</style>
