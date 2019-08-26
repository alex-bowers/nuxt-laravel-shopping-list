<template>
    <div v-if="loggedIn">
        <ul>
            <li><a @click.prevent="logout">Logout</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout();
            this.$router.push({
                path: "/login"
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
