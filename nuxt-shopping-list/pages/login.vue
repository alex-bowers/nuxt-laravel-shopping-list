<template>
    <div class="login-form--page">
        <div class="login-form--container">
            <h1 class="login-form--header">Bowers Shopping List</h1>
            <p class="login-form--subheader">{{ subHeaderText }}</p>

            <form class="login-form" @submit.prevent="checkUser">
                <div
                    class="field-with-floating-input"
                    :class="{ 'is-focused': focus.email }"
                >
                    <label for="emailField">
                        Email address
                        <span
                            v-if="showEmailFieldRequiredMessage"
                            class="field-label--required"
                        >
                            - Required
                        </span>
                    </label>
                    <input
                        id="emailField"
                        v-model="userForm.email"
                        name="user_email"
                        type="email"
                        @blur="toggleLabelFocus('email')"
                        @focus="toggleLabelFocus('email')"
                    />
                </div>
                <div
                    class="field-with-floating-input"
                    :class="{ 'is-focused': focus.password }"
                >
                    <label for="passwordField">
                        Password
                        <span
                            v-if="showPasswordFieldRequiredMessage"
                            class="field-label--required"
                        >
                            - Required
                        </span>
                    </label>
                    <input
                        id="passwordField"
                        v-model="userForm.password"
                        name="user_password"
                        type="password"
                        @blur="toggleLabelFocus('password')"
                        @focus="toggleLabelFocus('password')"
                    />
                </div>
                <div class="button--container">
                    <button
                        class="submit-button"
                        type="submit"
                    >Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            failedResponse: {},
            focus: {
                email: false,
                password: false
            },
            hasLoginFailed: false,
            userForm: {
                email: "",
                password: ""
            }
        }
    },
    computed: {
        showEmailFieldRequiredMessage() {
            return this.hasLoginFailed && this.failedResponse.errors && this.failedResponse.errors.email
        },
        showPasswordFieldRequiredMessage() {
            return this.hasLoginFailed && this.failedResponse.errors && this.failedResponse.errors.password
        },
        subHeaderText() {
            return this.hasLoginFailed ?
                this.failedResponse.message :
                "Please log in."
        }
    },
    methods: {
        checkUser() {
            this.$auth.login({
                data: this.userForm
            })
            .catch((error) => {
                this.failedResponse = error.response.data
                this.hasLoginFailed = true
            })
            .finally(() =>  this.$router.push({ path: '/' }))
        },
        toggleLabelFocus(type) {
            if (!this.userForm[type]) {
                this.focus[type] = !this.focus[type]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$element-margin: 4rem;

.login-form--page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.login-form--container {
    max-width: 500px;
    width: 80%;
}

.login-form--header {
    color: $blue-17;
    font-size: 1.5rem;
    margin: 0;
}
.login-form--subheader {
    font-size: 0.875rem;
    color: $blue-13;
    margin-bottom: $element-margin;
    margin-top: 0;
}

.login-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
}

.field-with-floating-input {
    position: relative;
    input {
        border: 0;
        padding: 3px 0;
        border-bottom: 2px solid $blue-13;
        box-shadow: none;
        font-family: inherit;
        font-size: inherit;
        outline: 0;
        width: 100%;
        position: absolute;
        background-color: transparent;
        left: 0;
    }
    label {
        opacity: 0.5;
        pointer-events: none;
        position: absolute;
        left: 0.5rem;
        transform: translate3d(0, 0, 0) scale(1);
        transform-origin: left top;
        transition: 100ms;
        .field-label--required {
            font-size: 0.75rem;
        }
    }
    + .field-with-floating-input {
        margin-top: $element-margin;
    }
    &.is-focused {
        label {
            transform: translateY(-1.25rem) translateX(-0.5rem) scale(0.8);
        }
    }
}

.submit-button {
    margin-top: $element-margin;
    padding: 1rem;
    width: 100%;
    &:hover {
        background-color: $blue-15;
        color: $blue-11;
        cursor: pointer;
    }
}

@media (min-width: $breakpoint-medium) {
    .button--container {
        text-align: right;
        .submit-button {
            max-width: 200px;
        }
    }
}
</style>
