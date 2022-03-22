<template>
    <div class="top_navbar">
        <div class="hamburger">
            <!-- <a href="#">
                <i class="fas fa-bars"></i>
            </a> -->
            <p>{{ title }}</p>
        </div>
    </div>
    <div class="search-box">
        <input type="search" id="search" placeholder="Search Resources" />
    </div>
    <div class="resources-container">
        <p>class 1</p>
        <div class="resource-items">
            <table class="resource-table">
                    <tr>
                        <td>
                            <p>item one</p>
                        </td>
                        <td>
                            <p>date 1</p>
                        </td>
                        <td>
                            <p>tag 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item two</p>
                        </td>
                        <td>
                            <p>date 2</p>
                        </td>
                        <td>
                            <p>tag 2</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item three</p>
                        </td>
                        <td>
                            <p>date 3</p>
                        </td>
                        <td>
                            <p>tag 3</p>
                        </td>
                    </tr>
            </table>
        </div><br>
        <p>class 2</p>
        <div class="resource-items">
            <table class="resource-table">
                    <tr>
                        <td>
                            <p>item one</p>
                        </td>
                        <td>
                            <p>date 1</p>
                        </td>
                        <td>
                            <p>tag 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item two</p>
                        </td>
                        <td>
                            <p>date 2</p>
                        </td>
                        <td>
                            <p>tag 2</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item three</p>
                        </td>
                        <td>
                            <p>date 3</p>
                        </td>
                        <td>
                            <p>tag 3</p>
                        </td>
                    </tr>
            </table>
        </div><br>
        <p>class 3</p>
        <div class="resource-items">
            <table class="resource-table">
                    <tr>
                        <td>
                            <p>item one</p>
                        </td>
                        <td>
                            <p>date 1</p>
                        </td>
                        <td>
                            <p>tag 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item two</p>
                        </td>
                        <td>
                            <p>date 2</p>
                        </td>
                        <td>
                            <p>tag 2</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item three</p>
                        </td>
                        <td>
                            <p>date 3</p>
                        </td>
                        <td>
                            <p>tag 3</p>
                        </td>
                    </tr>
            </table>
        </div><br>
        <p>class 4</p>
        <div class="resource-items">
            <table class="resource-table">
                    <tr>
                        <td>
                            <p>item one</p>
                        </td>
                        <td>
                            <p>date 1</p>
                        </td>
                        <td>
                            <p>tag 1</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item two</p>
                        </td>
                        <td>
                            <p>date 2</p>
                        </td>
                        <td>
                            <p>tag 2</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>item three</p>
                        </td>
                        <td>
                            <p>date 3</p>
                        </td>
                        <td>
                            <p>tag 3</p>
                        </td>
                    </tr>
            </table>
        </div><br>
    </div>
</template>


<script>

export default({
    name: 'Resources',
    data(){
        return{
            title: "Your Resources"
        }
    }
})
</script>