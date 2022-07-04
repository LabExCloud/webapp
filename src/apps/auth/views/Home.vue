<template>

<div class="content bg-[url('https://github.com/JinsoRaj/ghhost/raw/master/img/last.svg')] bg-no-repeat relative">
    <nav class="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
        <div class="container m-auto px-2 md:px-12 lg:px-7">
            <div class="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
                <div class="w-full px-6 flex justify-between lg:w-max md:px-0">
                    <a href="#" aria-label="logo" class="flex space-x-2 items-center">
                        <img src="../../../../public/opele.svg" class="w-12" alt="opele logo" width="180" height="133">
                        <!-- <span class="text-yellow-600">OPELE</span> -->
                        <img class="mt-2" src="https://readme-typing-svg.herokuapp.com?font=Sniglet&size=30&duration=4000&color=F3CF11&vCenter=true&width=200&lines=OPELE+%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB">

                    </a>

                    
                </div>

                <div class="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
                    <div class="text-gray-300 lg:pr-4">
                        <ul class="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                            <li>
                                <button type="button" class="block md:px-4 transition hover:text-yellow-400" @click="$router.push('/about')">
                                    <span>About</span>
                                </button>
                            </li>
                            <li>
                                <a href="https://github.com/LabExCloud/webapp" target="_blank" class="block md:px-4 transition hover:text-yellow-400">
                                    <span>Github</span>
                                </a>
                            </li>
                            <li>
                                <button type="button" class="block md:px-4 transition hover:text-yellow-400" @click="$router.push('/contact')">
                                    <span>Contact Us</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full  border-yellow-200 md:w-max lg:border-l">
                        <button type="button" title="Get Started" class="w-full ml-4 py-2 px-8 text-center rounded-2xl transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max" @click="$router.push('/login')">
                            <span class="block text-yellow-900 font-semibold text-sm">
                                Login
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>




    <div class="h-full flex flex-row justify-center items-center">
        <div class="w-full flex flex-col justify-center items-center">
            <div class="flex flex-row text-sm">
                <img src="https://github.com/JinsoRaj/ghhost/raw/master/img/upliftCareerBoy.svg" width="250" height="400" class="mr-2">
                <img src="https://github.com/JinsoRaj/ghhost/raw/master/img/upliftCareerGirl.svg" width="250" height="400">

                <!-- <img src="../../../../public/opele.svg" width="300" height="50" class="-ml-24 -mt-5"> -->
            </div>
            <img class="mt-2" src="https://readme-typing-svg.herokuapp.com?font=Sniglet&size=20&duration=4000&color=CEAF0E&center=true&vCenter=true&width=650&lines=An+Online+Platform+for+Exams+and+Lab+Experiments...">

        </div>
        <div class="w-full">
            <button type="button" class="w-full py-3 px-8 text-center rounded-full transition duration-300 bg-gray-900 hover:bg-cyan-500 active:bg-cyan-600 focus:bg-cyan-800 border border-gray-500 sm:w-max" @click="$router.push('/login')">
                <span class="block text-white text-sm">
                    Get Started
                </span>
            </button>
        </div>
    </div>
    

</div>
</template>

<script>
export default({
    name:'Home',
    mounted(){
        document.title = 'OPELE'
    }
})
</script>