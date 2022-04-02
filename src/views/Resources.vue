<template>

    <div class="content">
        <div class="header">
            <p> Your Resources </p>
        </div>
        
        <div class="grid grid-cols-1 gap-10 py-14 px-8 text-white">
            
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
            <div class="grid grid-cols-3 py-8 h-36 border border-borderclr rounded-2xl bg-cardclr text-center">
                <div> item 1 </div>
                <div> date 1 </div>
                <div> tag 1 </div>
                <div> item 2 </div>
                <div> date 2 </div>
                <div> tag 2 </div>
            </div>
        </div>
    </div>

<!-- <div class="section">
    <div class="top_navbar">
        <div class="hamburger">
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="search-box">
        
        <input type="search" id="search" placeholder="Search Resources" />
        <div class="sort-box">
            <label for="sort">sort:</label>&nbsp;
            <select id="sort" name="sort">
                <option value="recent">Recent</option>
                <option value="star">Starred</option>
                <option value="date">Date</option>
                <option value="alph">Alphabet</option>
            </select>
        </div>
    </div>
    <div class="resources-container">
        <div class="each-resource-box" v-for="item in resourceItems" :key="item">
            <p>{{ item.name }}</p>
            <div class="resource-items">
                <table class="resource-table">
                        <tr v-for="content in item.contents" :key="content">
                            <td>
                                <p>{{ content.title }}</p>
                            </td>
                            <td>
                                <p>{{ content.date }}</p>
                            </td>
                            <td>
                                <p>{{ content.tag }}</p>
                            </td>
                        </tr>
                </table>
            </div><br>
        </div>
    </div>
</div> -->
</template>


<script>

export default({
    name: 'Resources',
    mounted(){
        document.title = 'Resources'
    },
    data(){
        return{
            resourceItems: [
                {
                    name: 'Python',
                    contents:[
                        {
                        title: 'item 1',
                        date: 'date 1',
                        tag: 'tag 1'
                        },
                        {
                        title: 'item 2',
                        date: 'date 2',
                        tag: 'tag 2'
                        },
                        {
                        title: 'item 3',
                        date: 'date 3',
                        tag: 'tag 3'
                        },
                        {
                        title: 'item 4',
                        date: 'date 4',
                        tag: 'tag 4'
                        }
                    ]
                },
                {
                    name: 'C++',
                    contents:[
                        {
                        title: 'item 1',
                        date: 'date 1',
                        tag: 'tag 1'
                        },
                        {
                        title: 'item 2',
                        date: 'date 2',
                        tag: 'tag 2'
                        },
                        {
                        title: 'item 3',
                        date: 'date 3',
                        tag: 'tag 3'
                        },
                        {
                        title: 'item 4',
                        date: 'date 4',
                        tag: 'tag 4'
                        }
                    ]
                },
                {
                    name: 'SQL',
                    contents:[
                        {
                        title: 'item 1',
                        date: 'date 1',
                        tag: 'tag 1'
                        },
                        {
                        title: 'item 2',
                        date: 'date 2',
                        tag: 'tag 2'
                        },
                        {
                        title: 'item 3',
                        date: 'date 3',
                        tag: 'tag 3'
                        },
                        {
                        title: 'item 4',
                        date: 'date 4',
                        tag: 'tag 4'
                        }
                    ]
                },
                {
                    name: 'Java',
                    contents:[
                        {
                        title: 'item 1',
                        date: 'date 1',
                        tag: 'tag 1'
                        },
                        {
                        title: 'item 2',
                        date: 'date 2',
                        tag: 'tag 2'
                        },
                        {
                        title: 'item 3',
                        date: 'date 3',
                        tag: 'tag 3'
                        },
                        {
                        title: 'item 4',
                        date: 'date 4',
                        tag: 'tag 4'
                        }
                    ]
                }
            ]
        }
    }
})
</script>