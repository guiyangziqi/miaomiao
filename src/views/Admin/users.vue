<template>
    <div>
        <el-table 
        :data="nowTableData"
        border
        style="width: 100%">
            <el-table-column prop="userHead" label="用户头像">
                <template slot-scope="scope">
                    <img class="userHead" :src="scope.row.userHead" alt="">
                </template>
            </el-table-column>
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="Freeze(scope.$index,scope.row)">
                        {{scope.row.isFreeze ? '已冻结' : '未冻结'}}
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="ToDelete(scope.$index,scope.row)" ></el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination class="page"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size ="pageSize"
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name : 'users',
    data(){
        return{
            tableData:[],
            currentPage : 1,
            pageSize : 4
        }
    },
    mounted(){
        this.axios.get('/api2/admin/userList').then((res)=>{
            var status = res.data.status;
            if(status === 0){
                this.tableData = res.data.data.userList;
            }
        });
    },
    computed : {
        nowTableData(){
            return this.tableData.slice( (this.currentPage-1) * this.pageSize , this.currentPage * this.pageSize);
        }
    },
    methods : {
        Freeze(index,row){
            var infomation = row.isFreeze ? '解冻' : '冻结';
            this.$confirm('此操作将'+infomation+'该用户账号, 是否继续?', '提示',{confirmButtonText: '确定',
                                                                              cancelButtonText: '取消',
                                                                              type: 'warning'}).then(() => {
                this.axios.post('/api2/admin/updateFreeze',{
                    email : row.email,
                    isFreeze : !row.isFreeze
                }).then((res)=>{
                    var msg = row.isFreeze ? '用户已解冻' : '用户已冻结';
                    var status = res.data.status;
                    if(status === 0){
                        this.$message({
                            type: 'success',
                            message: msg
                        });

                        this.tableData[index].isFreeze = !row.isFreeze;
                    }
                    else{
                        this.$alert('冻结操作失败', '信息', {
                            confirmButtonText: '确定'
                        });
                    }
                });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        ToDelete(index,row){
            this.$confirm('此操作将冻结该用户账号, 是否继续?', '提示',{confirmButtonText: '确定',
                                                                    cancelButtonText: '取消',
                                                                    type: 'warning'}).then(() => {
                this.axios.post('/api2/admin/deleteUser',{
                    email : row.email
                }).then((res)=>{
                    var msg = '用户已删除';
                    var status = res.data.status;
                    if(status === 0){
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                        this.tableData.splice(index,1);
                    }
                    else{
                        this.$alert('删除操作失败', '信息', {
                            confirmButtonText: '确定'
                        });
                    }
                });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
}
</script>

<style scoped>
.page{ margin-top: 30px; }
.userHead{ width: 50px; height: 50px; border-radius: 50%; overflow: hidden; }
</style>