<template>
<div class="content flex justify-center items-center">
    <button @click="$router.push('/login')">
        <img src="http://127.0.0.1:8000/static/images/opele.svg">
    </button>
</div>
</template>

<script>
export default({
    name:'Home'
})
</script>