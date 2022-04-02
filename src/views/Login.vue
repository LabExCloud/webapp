<template>
    <div class="auth">
        <form id="login-form" @submit.prevent="submitForm">
            <input type="text" name="uname" placeholder="Username" required="" v-model="username">
            <input type="password" name="pass" placeholder="Password" required="" v-model="password">

            <div class="flex flex-col justify-center items-center py-10">

                <button type="submit"> Login </button>
                <!-- <a class="text-blue-500" href="./labs.html"> SignUp </a> -->

            </div>
        </form>
    </div>
</template>

<style>
.auth{
    @apply flex bg-cardclr mt-20 mb-32 border border-borderclr rounded-xl;
}

.auth form{
    @apply py-8 px-11;
}

.auth input{
    @apply block w-52 my-10 px-16 py-2 border border-black rounded-lg;
}

.auth button{
    @apply w-24 py-1 bg-gray-600 text-white mb-10 border border-black rounded-lg;
}
</style>

<script>
import axios from 'axios'

export default({
    name: 'Login',
    data(){
        return {
            username: '',
            password: '',
            errors: [] // TODO: display this somewhere
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
