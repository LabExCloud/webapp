<template>
    <div class="top_navbar">
        <div class="hamburger">
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="search-box">
        <!-- <span class="icon"><font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon></span> -->
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
</template>


<script>

export default({
    name: 'Resources',
    data(){
        return{
            title: "Your Resources",
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