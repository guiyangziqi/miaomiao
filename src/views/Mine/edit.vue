<template>
    <div>
        <div class="userHead">
            <img :src="$store.state.user.userHead" alt="">
            <div class="H_words">
                <a class="upload" href="javascript:;">
                    <input  class="h_Input" type="file" name="file" value="上传头像"  @change="toUpload">
                    上传头像
                </a>
            </div>
        </div>
        <hr>
        <div class="username">
            <div>{{$store.state.user.name}}</div>
            <p @click="toUpdateUsername">修改昵称</p>
        </div>
        <hr>
    </div>
</template>
<script>
import Header from "@/components/Header"; 
import axios from 'axios';
import { messageBox } from "@/components/JS";
export default {
    name: 'edit',
    components:{
        Header,
    },
    methods : {
        toUpdateUsername(){
            this.$router.push('/mine/updateUsername');
        },
        toUpload(ev){
            var file = ev.target.files[0];
            var param = new FormData();
            param.append('file',file,file.name);
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };
            this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
                var status = res.data.status;
                var This = this;
                if(status === 0){

                    messageBox({
                        title : '信息',
                        content : '头像上传成功',
                        ok : '确定',
                        handleOk(){
                            location.reload();
                            This.$store.commit("user/USER_NAME",{
                                name : This.$store.state.user.name ,
                                isAdmin : This.$store.state.user.isAdmin,
                                userHead : res.data.data.userHead + '?' + Math.random()
                                });
                        }
                    });
                }
                else{
                    messageBox({
                        title : '信息',
                        content : '头像上传失败',
                        ok : '确定'
                    });
                }
            });
        },
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
                next('/mine/center');
            }
        });
    }
}
</script>

<style scoped>
.userHead{
    width: 100%;
    height: 90px;
    /* border: 1px solid #000; */
}
.userHead img{
    float: left;
    margin-left: 10px;
    margin-top: 10px;  
    width: 70px;
    height:70px; 
    border-radius: 50%; 
    overflow: hidden; 
    /* border: solid 0.5px;   */
}
.userHead .H_words p{
    width: 120px;
    /* border: 1px solid black; */
    float: right;
    text-align: center;
    margin-top: 30px;
}
.userHead .H_words .upload{
    float: right;
    margin-top: 30px;
    margin-right: 20px;
    height: 20px;
    line-height: 20px;
    /* border: 1px solid #999; */
    text-decoration: none;
    color: #666;
}
.userHead .H_words .upload .h_Input{
    position: absolute;
    opacity: 0;
}
.username{
    width: 100%;
    height: 40px;
    /* border: 1px solid black; */
}
.username div{
    /* border: 1px solid darkblue; */
    float: left;
    width: 120px;
    height: 20px;
    margin-top: 10px;
    margin-left: 10px;
}
.username p{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
    color: #666;
}
</style>
