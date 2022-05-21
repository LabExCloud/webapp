<template>
    <div class="content">
        <div class="header">
            <p>{{ header }}</p>
        </div>

        <div class="navigation">
            <ul>
                <li>
                    <!-- <router-link to="/demo/addresource">
                        <span class="mx-4">Add Resource</span>
                    </router-link> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default({
    name: 'Demo',
    mounted(){
        document.title = this.$options.name + ' demo'
    },
    computed: {
        header(){ 
            return this.$options.name + ' demo'
        }
    }
})
</script>