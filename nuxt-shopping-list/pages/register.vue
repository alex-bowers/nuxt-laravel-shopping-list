<template>
    <div>
        <form @submit.prevent="registerUser">
            <div>
                Name
                <input type="name" v-model="userForm.name" required>
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div>
                Email
                <input type="email" v-model="userForm.email" required>
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div>
                Password
                <input type="password" v-model="userForm.password" required>
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userForm: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        async registerUser() {
            await this.$axios.post("api/register", this.userForm);
            this.$auth.login({
                data: {
                    email: this.userForm.email,
                    password: this.userForm.password
                }
            })
            this.$router.push({
                path: "/list"
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
