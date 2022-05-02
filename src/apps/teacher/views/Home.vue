<template>

    <div class="content">
        <div class="flex justify-center items-center bg-cardclr border border-borderclr text-white h-32 mx-96 mt-10 rounded-md">
            <div class="flex  w-full mx-4 my-5">
                <img class="w-20 rounded-full" src="https://tghost.cf/17241/image_2022-05-02_10-13-00.png?hash=AgADDQ" alt="student picture">
                <div class="grid grid-cols-2 gap-y-1 gap-x-1 w-full ml-12">
                    <div>
                        Name:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        Steve Harry
                    </div>
                    
                    <div>
                        Department:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        Information Technology
                    </div>
                
                    <div>
                        Active Classes:
                    </div>
                    <div class="bg-gray-800 rounded px-3 text-gray-300">
                        8
                    </div>   
                </div>
            </div>
        </div>

        <div class="w-full pl-7">
            <label class="text-white text-lg" for="year">Classes: </label>
            <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="year" name="year">
                <option value="2122" selected>2021-22</option>
                <option value="2021">2020-21</option>
                <option value="1920">2019-20</option>
                <option value="1819">2018-19</option>
                <option value="1718">2017-18</option>
            </select>
        </div>

        <!-- {{classes}} -->

        <div class="grid grid-cols-3 gap-10 py-14 px-4 text-white">
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 1</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 2</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 3</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 4</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 5</div>
            <div class="h-36 border border-borderclr rounded-2xl bg-cardclr">item 6</div>
        </div>

    </div>

</template>


<script>
import axios from 'axios'

export default({
    name: 'Home',
    async mounted(){
        document.title = 'Home'
        await this.getClasses();
    },
    data(){
        return{
            classes: {}
        }
    },
    methods: {
        async getClasses(){
            var url = '/api/v1/classes';

            const response = await axios.get(url);
            this.classes = response.data;
        }
    },
})
</script>