<template>
    <div class="auth">
        <form id="login-form" @submit.prevent="submitForm">
            <input type="text" name="uname" placeholder="Username" required="" v-model="username">
            <input type="password" name="pass" placeholder="Password" required="" v-model="password">

            <input id="login-submit" type="submit" value="Login">

            <!-- <a id="login-signup-link" href="./pages/signup.html">SignUp</a> -->
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default({
    name: 'Login',
    data(){
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
        async submitForm(){
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('token')

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)
                    
                    axios.defaults.headers.common['Authorization'] = 'Token ' + token
                    localStorage.setItem('token', token)
                    
                    this.$router.push('/labs')
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
        }
    },
    mounted(){
        document.title = 'Login'

        this.$store.commit('removeToken')
    },
})
</script>
