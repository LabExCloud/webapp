<template>
    <div class="auth">
        <form id="login-form">
            <input type="text" name="uname" placeholder="Username" required="">
            <input type="password" name="pass" placeholder="Password" required="">

            <input id="login-submit" type="submit" value="Login">

            <!-- <a id="login-signup-link" href="./pages/signup.html">SignUp</a> -->
        </form>
    </div>
</template>

<script>

export default({
    name: 'Login',
    mounted(){
        document.title = 'Login'
    },
})
</script>
