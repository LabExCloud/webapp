<template>
    <select class="text-center text-sm text-gray-400 bg-gray-700 border border-black rounded" id="sem" name="sem" @change="selectSem">
        <option v-for="o in semSelectBox" :key="o.sem" :value="o.sem">{{ o.text }}</option>
    </select>
</template>

<script>
export default({
    name: 'SemesterSelectBox',
    data(){
        return {
            semSelectBox: [],
        }
    },
    props: {
        sems: [],
    },
    mounted() {
        const sems = this.sems
        sems.sort((a, b) => b - a)
        sems.forEach(sem => {
            this.semSelectBox.push({
                sem,
                text: `S${sem}`
            })
        });
        this.semSelectBox.push({
            sem: 0,
            text: 'All'
        })
    },
    methods: {
        selectSem(event){
            const sem = parseInt(event.target.value)
            const sobj = this.semSelectBox.find(o => o.sem == sem)
            this.$emit('selectSem', sobj)
        }
    }
})
</script>