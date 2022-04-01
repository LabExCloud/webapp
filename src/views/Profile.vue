<template>
<div class="section">
    <div class="top_navbar">
        <div class="hamburger">
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="container">
        <div class="profile">
            <img :src="user.profile.get_image" alt="student picture">
            <h3>{{ user.first_name }} {{ user.last_name }}</h3>
            <p>S{{ user.profile.semester }} - {{ user.profile.rollno }}</p>
        </div>
        <table class="form-div">
            
            <form class="settings-form">
                <tr>
                    <td>
                        <label for="name">Name:</label>
                    </td>
                    <td>
                        <input type="text" id="name" name="name">
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="sem">Semester:</label>
                    </td>
                    <td>
                        <select id="sem-select" name="sem">
                            <option value="s1">S1</option>
                            <option value="s2">S2</option>
                            <option value="s3">S3</option>
                            <option value="s4">S4</option>
                            <option value="s5">S5</option>
                            <option value="s6">S6</option>
                            <option value="s7">S7</option>
                            <option value="s8">S8</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="username">Username:</label>
                    </td>
                    <td>
                        <input type="text" id="username" name="username">
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="pass">Password:</label>
                    </td>
                    <td>
                        <input type="password" id="pass" name="pass">
                    </td>
                </tr>

            </form>
        </table>
    </div>
</div>
</template>


<script>
import axios from 'axios'

export default({
    name: 'Profile',
    mounted(){
        document.title = 'Profile'
        this.getProfile()
    },
    data(){
        return{
            title: "Your Profile",
            user: {
                profile: {}
            },
        }
    },
    methods: {
        getProfile(){
            axios({
                method: 'get',
                url: '/api/v1/profile/isebella',
            }).then(response => this.user = response.data)
        },
    },
})
</script>