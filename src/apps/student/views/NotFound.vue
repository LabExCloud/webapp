<template>
    <div class="content py-4">
        <div class="px-8 mx-auto h-full">
            <div class="grid grid-cols-2 gap-12">
            <!-- image - start -->
                <div class="flex justify-center items-center h-56 w-56 ml-28 my-52 bg-gray-100 overflow-hidden shadow-lg rounded-xl">
                    <img src="https://telegra.ph/file/e73deaad7af53481fde15.png" loading="lazy" alt="404 image" class="w-full h-full object-cover object-center rounded-xl border border-gray-500" />
                </div>
            <!-- image - end -->

            <!-- content - start -->
                <div class="flex flex-col justify-center items-center sm:items-start md:py-24 lg:py-32 xl:py-52">
                    <p class="text-indigo-500 text-sm md:text-base font-semibold uppercase mb-4">That’s a 404</p>
                    <h1 class="text-gray-300 text-2xl md:text-3xl font-bold text-center sm:text-left mb-2">Page not found</h1>

                    <p class="text-gray-500 md:text-lg text-center sm:text-left mb-8">The page you’re looking for doesn’t exist.</p>

                    <a @click="goBack" class="inline-block bg-gray-300 hover:bg-gray-100 hover:shadow-lg focus-visible:ring ring-indigo-300 text-black active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3 cursor-pointer">Go back</a>
                </div>
            <!-- content - end -->
            </div>
        </div>
    </div>
</template>

<script>
export default({
    name: 'NotFound',

    mounted(){
        document.title = 'Error: 404'
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    },
})
</script>
