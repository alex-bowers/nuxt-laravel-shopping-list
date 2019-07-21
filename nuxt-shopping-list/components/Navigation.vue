<template>
    <div>
        <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/list">Shopping List</nuxt-link></li>
            <li v-if="!loggedIn"><nuxt-link to="/login">Login</nuxt-link></li>
            <li v-if="!loggedIn"><nuxt-link to="/register">Register</nuxt-link></li>
            <li v-if="loggedIn"><a @click.prevent="logout">Logout</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
