<template>
    <img :class="class" :src="profileImage" :alt="alt">
</template>

<script>
export default {
    name: "ProfileImage",
    props: {
        src: {
            type: String,
            required: true
        },
        class: {
            type: String,
            default: 'w-28'
        },
        alt: {
            type: String,
            default: 'profile picture'
        }
    },
    computed: {
        profileImage() {
            return process.env.VUE_APP_ROOT_MEDIA + this.src
        }
    },
}
</script>