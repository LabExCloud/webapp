<template>
    <div class="content">
        <h1 class="text-xl text-blue-400 text-center mt-7"> Students </h1>
        <button class="text-center text-base w-36 ml-9 mt-9 text-white bg-gray-700 border border-black rounded-md" @click="showAddClassModal">
            <span class="mx-3">+ Add student</span>
        </button>
        <div v-for="(student, index) in students" :key="index" class="grid grid-cols-3 gap-y-2 gap-x-5 py-2 px-10 mx-10 my-4 min-h-36 rounded-2xl shadow-md bg-cardclr hover:border-gray-300 hover:shadow-2xl text-white">
            
            <div>
                {{ index + 1 }}
            </div>
            <div class="">
                {{ student.first_name }} {{ student.last_name }}
            </div>
            <div class="">
                <span class="material-symbols-outlined text-lg">preview</span>
            </div>
        
        </div>

        <div>
            <!-- <h1 class="text-xl text-blue-400 text-center mt-7"> Analysis </h1> -->
            <v-chart class="chart" :option="option" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref } from "vue";
import axios from 'axios';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);


export default({
    name: 'Students',
    async mounted(){
        document.title = 'Students'
        await this.getStudents()
    },
    methods: {
        async getStudents(){
            const response = await axios.get(`/api/v1/class/students/${this.classs.id}`)
            this.students = response.data
        }
    },
    data() {
        return {
            students: []
        }
    },
    computed: {
        ...mapGetters([
            'classs',
        ]),
    },
    components: {
    VChart
    },
    provide: {
        [THEME_KEY]: "dark"
    },
    setup() {
        const option = ref({
        title: {
            text: "Analysis - Score",
            left: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            left: "left",
            data: ["Above 90%", "Above 80%", "Above 75%", "Above 50%", "Above 25%"]
        },
        series: [
            {
            name: "Analysis - Score",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
                { value: 14, name: "Above 90%" },
                { value: 42, name: "Above 80%" },
                { value: 31, name: "Above 75%" },
                { value: 19, name: "Above 50%" },
                { value: 3, name: "Above 25%" }
            ],
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
            }
        ]
        });
        return { option };
    }
    
})
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>

<style>
body {
  margin: 0;
}
</style>
