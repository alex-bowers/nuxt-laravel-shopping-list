<template>
    <div>
        <form @submit.prevent="addUser">
            <div>
                Email
                <input type="email" v-model="userForm.email">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div>
                Password
                <input type="password" v-model="userForm.password" required>
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userForm: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async addUser() {
            await this.$auth.login({
                data: this.userForm
            });
            this.$router.push({
                path: '/list'
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
