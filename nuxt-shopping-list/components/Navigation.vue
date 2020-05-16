<template>
    <div
        v-if="loggedIn"
        class="navigation"
    >
        <div>Welcome <strong>{{ this.user.name }}</strong></div>
        <a class="logout-link" @click.prevent="logout">
            Logout
        </a>
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
.navigation {
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    .logout-link {
        text-decoration: underline;
        &:hover {
            color: $blue-19;
            cursor: pointer;
        }
    }
}
</style>
