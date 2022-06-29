<template>
<div class="content flex flex-col justify-center items-center">
    <img src="http://127.0.0.1:8000/static/images/opele.svg" width="500" height="600" class="-mt-10">
    <img class="-mt-10" src="https://readme-typing-svg.herokuapp.com?font=Sniglet&size=20&duration=4000&color=CEAF0E&center=true&vCenter=true&width=650&lines=An+Online+Platform+for+Exams+and+Lab+Experiments...">

    <button class="text-center text-[#E7240E] bg-[#0c010f] hover:bg-[#18021e] hover:scale-105 rounded border border-gray-500 px-8 py-1 my-6" @click="$router.push('/login')">
        Login
    </button>

</div>
</template>

<script>
export default({
    name:'Home'
})
</script>