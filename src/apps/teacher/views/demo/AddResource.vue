<template>
    <div class="content">
        <div class="header">
            <p>{{ header }}</p>
        </div>

        <div class="form">
            Class : 
            <select name="class" v-model="class_opt">
                <option v-for="(c, index) in classes" :key="index" :value="index">{{ c.batch.year }} - {{ c.department.dept_code }} - S{{ c.semester.sem }} - {{ c.subject.sub_name }}</option>
            </select><br>
            Resource Name: <input type="text" name="name" v-model="res_name"><br>
            Resource Description: <textarea name="desc" cols="30" rows="10" v-model="res_desc"></textarea><br>
            <div id="resources">
                <div v-for="(file, index) in files" :key="index">
                    {{ file.name }}
                    <input class="file" type="file" @change="setFile($event, index)" :id="index">
                    <button style="color: red; font-face:bold;" @click="removeResourceFile(index)">X</button>
                </div>
            </div>
            <button @click="addResourceFile">+ Add Resource File</button><br>
            <button @click="submitForm">Add</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default({
    name: 'AddResource',
    data(){
        return {
            files: [],
            classes: [],
            class_opt: undefined,
            res_name: '',
            res_desc: '',
        }
    },
    async mounted(){
        document.title = this.$options.name + ' demo'
        await this.fetchClass()
        console.log(this.classes);
    },
    computed: {
        header(){ 
            return this.$options.name + ' demo'
        }
    },
    methods: {
        async fetchClass(){
            const response = await axios.get('/api/v1/profile')
            this.classes = response.data.profile.classes
        },
        async submitForm(){
            if(this.class_opt !== undefined){
                const class_id = this.classes[this.class_opt].id
                console.log(class_id);

                const response = await axios.post(
                    `/api/v1/resource/${class_id}`,
                    {
                        res_name: this.res_name,
                        description: this.res_desc
                    }
                )

                if(response.status == 200){
                    const res_id = response.data.id
                    await this.files.forEach(async (file) => {
                        let data = new FormData()
                        data.append('file', file)

                        const response = await axios.post(
                            `/api/v1/resourcefile/${res_id}`,
                            data, {
                                headers: {"Content-Type": "multipart/form-data",},
                            }
                        )
                    });
                }
            }
        },
        addResourceFile(){
            var el = document.createElement('div')
            this.files.push({
                file: {
                }
            })
        },
        removeResourceFile(index){
            this.files.splice(index, 1)
        },
        setFile(event, index){
            this.files[index] = event.target.files[0]
        }
    }
})
</script>

<style>
.form{
    color: white;
    padding: 20px;
}

input:not(.file), select, textarea{
    color: black !important;
}

input, select, textarea, button{
    margin-top: 10px !important;
}

input[type='file'] {
  color: transparent;
}
</style>