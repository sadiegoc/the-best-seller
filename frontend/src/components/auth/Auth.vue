<template>
    <section id="auth">
        <div class="container">
            <h1 v-if="isLogin">Login</h1>
            <h1 v-else>Sign Up</h1>
            <form class="form-auth" @submit.prevent="auth">
                <div class="form-group" v-if="!isLogin">
                    <label for="firstName">First name</label>
                    <input type="text" id="firstName" v-model="user.firstName">
                </div>
                <div class="form-group" v-if="!isLogin">
                    <label for="lastName">Last name</label>
                    <input type="text" id="lastName" v-model="user.lastName">
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" v-model="user.email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="user.password">
                </div>
                <div class="form-group" v-if="!isLogin">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" v-model="user.confirmPassword">
                </div>
                <div class="form-checkbox" v-if="!isLogin">
                    <input type="checkbox" id="checkbox" v-model="checkbox">
                    <span class="checkmark"></span>
                    <label for="checkbox">
                        By signing up, I agree to Terms of Service and Privacy Policy.
                    </label>
                </div>
                <div class="form-err" v-if="msg">
                    {{ this.msg }}
                </div>
                <div class="form-group" v-if="isLogin">
                    <button type="submit">
                        Login
                    </button>
                    <a href @click.prevent="isLogin = !isLogin">
                        Don't have an account? Sign Up
                    </a>
                </div>
                <div class="form-group" v-else>
                    <button type="submit" :disabled="!checkbox">
                        Sign Up
                    </button>
                    <a href @click.prevent="isLogin = !isLogin">
                        Already have an account? Sign In
                    </a>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { userStorage } from '@/config/global';
import authService from '@/services/auth.service';

export default {
    name: 'AuthComponent',
    data: function () {
        return {
            isLogin: false,
            user: {},
            checkbox: false,
            msg: ""
        }
    },
    methods: {
        auth () {
            if (this.isLogin) this.login()
            else this.signup()
        },
        login () {
            const userToLogin = {
                email: this.user.email,
                password: this.user.password
            }

            authService.login(userToLogin)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userStorage, JSON.stringify(res.data))
                    this.$router.push({ name: 'home' })
                })
                .catch(err => this.msg = err.response.data)
        },
        signup () {
            authService.register(this.user)
                .then(() => {
                    this.isLogin = true
                    this.msg = ""
                    this.user = {}
                })
                .catch(err => this.msg = err.response.data)
        }
    }
}
</script>

<style scoped>
section#auth {
    width: 100%; height: calc(100vh - 2 * var(--header-h));
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    max-width: 500px; width: 100%;
    margin: 0 20px;
    display: flex; flex-direction: column;

    padding: 10px 15px;
    
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.container h1 {
    text-align: center;
    font-size: 1.5rem;
    font-family: roboto-thin;
    border-bottom: 2px solid var(--color-theme);

    align-self: center; justify-self: center;
    padding: 10px 0; margin: 10px 0;
}

.form-auth {
    display: flex; flex-direction: column;
}

.form-group {
    display: flex; flex-direction: column;
    margin: 8px 0;
}

.form-group label {
    font-size: 0.8rem;
    font-family: roboto-regular;
    color: #777;
    margin-bottom: 10px;
}

.form-group input {
    background: transparent;
    border: 1px solid #ddd;
    padding: 10px 15px;
    outline: none;
    font-family: roboto-regular;
    border-radius: 5px;
}

.form-checkbox {
    display: flex; flex-direction: row;
    align-items: center;
    margin: 8px 0;
}

.form-checkbox label {
    text-align: left;
    width: fit-content;
    font-size: 0.8rem;
    font-family: roboto-regular;
    color: #555;
}

.form-checkbox input[type="checkbox"] {
    display: none;
}

.form-checkbox .checkmark {
    display: block; cursor: pointer;
    padding: 7px; width: 0; height: 0;
    background: transparent;
    border-radius: 50%;
    border: 1px solid #aaa;
    margin: 0 4px;
}

.form-checkbox input[type="checkbox"]:hover ~ .checkmark {
    background-color: #eee;
}

.form-checkbox input[type="checkbox"]:checked ~ .checkmark {
    background-color: var(--color-theme);
    border-color: var(--color-theme);
}

.form-group button {
    border: none; background-color: var(--color-theme);
    padding: 8px 16px; margin: 0;
    color: #fff;
    font-size: 1rem;
    font-family: roboto-regular;
    border-radius: 5px;
    cursor: pointer;
}

.form-group button:disabled {
    background-color: #ccc;
    cursor: default;
}

.form-group a {
    text-decoration: none;
    text-align: center;
    color: #555;
    margin-top: 15px;
}

.form-group a:hover {
    color: black;
    text-decoration: underline;
}

.form-err {
    font-family: roboto-regular;
    text-align: center;
}
</style>