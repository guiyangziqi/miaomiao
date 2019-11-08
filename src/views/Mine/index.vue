<template>
    <div id="main">
        <Header :title='this.title'/>
        <router-view />
        <TabBar />
    </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
    name: 'Mine',
    data(){
        return{
            title: '我的喵呜'
        }
    },
    components:{
        Header,
        TabBar,
        Login
    }
}
</script>

<style>

</style>
