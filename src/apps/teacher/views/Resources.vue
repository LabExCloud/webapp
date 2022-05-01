<template>

    <div class="content">
        <div class="header">
            <p> Resources </p>
        </div>
        
        <div class="search-sort-box">
            <input class="text-center py-2 w-72 bg-gray-700 border border-black rounded-xl" type="search" id="search" placeholder="Search Resources"/>
            <div class="add-box">
                <button class="text-center text-base w-40 text-white bg-gray-700 border border-black rounded-md">
                    <router-link to="/demo/addresource">
                        <span class="mx-4">+ New Resource</span>
                    </router-link>
                </button>
            </div>
        </div>

        

        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            <div class="py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center ">
                ExpNo - Demo <br><br>
                <table class="w-full">
                        <tr>
                            <td>
                                <router-link :to="'/resources/res/'">
                                <p> Note - Demo </p>
                                </router-link>
                            </td>
                            <td>
                                <p> Date - Demo </p>
                            </td>
                            <td>
                                <p>Tag - Demo</p>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <router-link :to="'/resources/res/'">
                                <p> Note - Demo </p>
                                </router-link>
                            </td>
                            <td>
                                <p> Date - Demo </p>
                            </td>
                            <td>
                                <p>Tag - Demo</p>
                            </td>
                        </tr>
                </table>
            </div><br>
        </div>


    </div>
</template>


<script>
import axios from 'axios'

export default({
    name: 'Resources',
    mounted(){
        document.title = `Resources`
    },
})
</script>