<template>
    <div>
        <div class="HeadBg">
            <div class="userHead">
                <img :src="$store.state.user.userHead" alt="">
            </div>
            <div class="b_div">
                
                <div class="username">
                    <div>
                        <p>{{$store.state.user.name}}</p>
                    </div>
                </div>
                <div class="admin" @click="toAdminPage"  v-if="$store.state.user.isAdmin">
                    管理员
                </div>
                <div v-else class="member">普通会员</div>
                <img src="../../../public/images/edit.svg" @click="toEdit()" alt="">
            </div>
            <!-- <input class="h_Input" type="file" name="file" value="上传头像" @change="toUpload"> -->
        </div>
        <!-- <div class="admin" v-if="$store.state.user.isAdmin">
            用户身份：管理员<br>
            <a href="/admin" target="_blank">管理员后台入口</a>
        </div>
        <div v-else>用户身份：普通会员</div> -->
        <a class="logout" href="javascript:;" @touchstart="handleToLogout">退出</a>
    </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from "@/components/JS";
export default {
    name : "center",
    methods : {
        toAdminPage(){
            let adminPage = this.$router.resolve({ path: '/admin', query: {  id: 1 } });
            window.open(adminPage.href, '_blank');

        },
        toEdit(){
            this.$router.push("/mine/edit");
        },
        // toUpload(ev){
        //     var file = ev.target.files[0];
        //     var param = new FormData();
        //     param.append('file',file,file.name);
        //     var config = {
        //         headers : {
        //             'Content-Type' : 'multipart/form-data'
        //         }
        //     };
        //     this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
        //         var status = res.data.status;
        //         var This = this;
        //         if(status === 0){
        //             messageBox({
        //                 title : '信息',
        //                 content : '头像上传成功',
        //                 ok : '确定',
        //                 handleOk(){
        //                     This.$store.commit("user/USER_NAME",{
        //                         name : This.$store.state.user.name ,
        //                         isAdmin : This.$store.state.user.isAdmin,
        //                         userHead : res.data.data.userHead + '?' + Math.random()
        //                         });
        //                 }
        //             });
        //         }
        //         else{
        //             messageBox({
        //                 title : '信息',
        //                 content : '头像上传失败',
        //                 ok : '确定'
        //             });
        //         }
        //     });
        // },
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit("user/USER_NAME",{ name : '', isAdmin : false, userHead : '' });
                    this.$router.push('/mine/login');
                }
            });
        }
    },
    //前置守卫
    beforeRouteEnter (to, from, next){
        axios.get("/api2/users/getUser").then((res)=>{
            var status = res.data.status;
            if(status === 0){
                next(vm => {
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit("user/USER_NAME",{ name : res.data.data.username ,
                                                        isAdmin : res.data.data.isAdmin,
                                                        userHead : res.data.data.userHead
                                                        });
                });
            }
            else{
                next('/mine/login');
            }
        });
    }
}
</script>

<style scoped>
.HeadBg{
    /* background: #020; */
    /* border: 1px solid black; */
    height: 110px;
    background-color: #e54847;
}
.HeadBg .userHead{
    width: 120px;
    height: 110px;
    float: left;
    /* border: 1px solid yellowgreen;z */
}
.HeadBg .userHead img{
    margin-left: 10px;
    margin-top: 10px;  
    width: 100px;
    height: 100px; 
    border-radius: 50%; 
    overflow: hidden; 
    /* border: solid 0.5px;   */
}
.HeadBg .b_div{
    float: left;
    width: 230px;
    height: 110px;
    /* border: 1px solid black; */
}
.HeadBg .b_div .username{
    margin-top: 15px; 
}
.HeadBg .b_div .username div{
    color: aliceblue;
    width: 100px;
    font-size: 22px;
    /* float: right; */
    text-align: center;
}
.HeadBg .b_div .admin{
    width: 60px;
    height: 18px;
    /* border : 1px solid black; */
    color: aliceblue;
    font-size: 6px;
    line-height: 18px;
    margin-left: 20px;
    text-align: center;
    background-color: 	DodgerBlue;
    border-radius: 25px;
}
.HeadBg .b_div .member{
    width: 60px;
    height: 18px;
    color: aliceblue;
    font-size: 6px;
    line-height: 18px;
    margin-left: 20px;
    text-align: center;
    background-color: 	DodgerBlue;
    border-radius: 25px;
}
.HeadBg .b_div img{
    width: 20px;
    height: 20px;
    float: right;
    margin-top: -40px;
}

.HeadBg .admin a{
    text-decoration:none;
}
.logout{
    text-decoration:none;

}
</style>
