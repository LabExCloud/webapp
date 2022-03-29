<template>
    <div class="menu-sidebar">
        <div class="profile">
            <img :src="user.profilepic" alt="student picture">
            <h3>{{ user.name }}</h3>
            <p>{{ user.class }}</p>
        </div>
        <ul>
            <li>
              <router-link to="/labs">
                <span class="icon"><font-awesome-icon :icon="['fas', 'desktop']"></font-awesome-icon></span>
                <span class="item">Lab</span>
              </router-link>
            </li>
            <li>
              <router-link to="/exam">
                <span class="icon"><font-awesome-icon :icon="['fas', 'keyboard']"></font-awesome-icon></span>
                <span class="item">Exam</span>
              </router-link>
            </li>
            <li>
              <router-link to="/resources">
                <span class="icon"><font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon></span>
                <span class="item">Resources</span>
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                <span class="icon"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></span>
                <span class="item">Profile Settings</span>
              </router-link>
            </li>
            <li>
                <a href="/login.html">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'sign-out-alt']"></font-awesome-icon></span>
                    <span class="item">Logout</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

export default({
    name: 'Navigation',
    props: {
        user: {}
    }
})
</script>
