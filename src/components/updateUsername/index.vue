<template>
    <div class="username_body">
        <div class="username_email">
            邮箱：<input v-model="email" class="username_text" type="text"><button @touchstart="handleToVerify">发送验证码</button>
        </div>
        <div>
            新昵称：<input v-model="new_username" class="username_text" type="text">
        </div>
        <div>
            验证码：<input v-model="verify" class="username_text" type="text">
        </div>
        <div class="username_btn">
            <button @touchstart="handleToUsername">修改名称</button>
        </div>
        <div class="username_link">
                <a href="#" @click="back">立即返回</a>
        </div>
    </div>
</template>

<script>
import { messageBox } from "@/components/JS";
export default {
    name : 'findPassword',
    data(){
        return{
            email: '',
            new_username: '',
            verify: ''
        }
    },
    methods : {
        back(){
            this.$router.push();
        },
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    messageBox({
                        title : '验证码',
                        content : '已发送至邮箱',
                        ok : '确定'
                    });
                }
                else{
                    messageBox({
                        title : '验证码',
                        content : '发送失败',
                        ok : '确定'
                    });
                }
            });
        },
        handleToUsername(){
            this.axios.post('/api2/users/updateUsername',{
                email : this.email,
                username : this.new_username,
                verify : this.verify
            }
            ).then((res)=>{
                var status = res.data.status;
                var This = this;
                if(status === 0){
                     messageBox({
                        title : '信息',
                        content : '修改成功',
                        ok : '确定',
                        handleOk(){
                            This.$router.push('/mine/edit');
                        }
                    });
                }
                else{
                     messageBox({
                        title : '信息',
                        content : res.data.msg,
                        ok : '确定',
                        handleOk(){
                            This.$router.push('/mine/edit');
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
#content .username_body{  width:100%;}
.username_body .username_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.username_body .username_btn{ height:50px; margin:10px;}
.username_body .username_email{ position: relative; }
.username_body .username_email button{ position: absolute; right: 10px; top: 10px; height: 30px; border-radius: 3px; border:none; padding: 5px;} 
.username_body .username_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.username_body .username_link{ display: flex; justify-content:space-between;}
.username_body .username_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>

