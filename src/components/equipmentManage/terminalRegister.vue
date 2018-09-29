<template>
    <div class="terminalRegister">
        <div class="terminalRegister_nav">
            终端管理<i class="iconfont icon-icon"></i>终端注册
        </div>
        <div class="terminalRegister_main">
            <div class="terminalRegister_top">
                <el-button type="primary" icon="plus " size="small" @click="terminalRegisterAdd">添加</el-button>
                <el-button type="primary" icon="edit" size="small" @click="terminalRegisterRevamp">修改</el-button>
                <el-button type="primary" icon="delete" size="small" @click="terminalRegisterDelete">删除</el-button>
            </div>
            <div class="terminalRegister_bottom">
                <div class="terminalRegister_bottom_top">
                    <div class="userManage_formtwo">
                        <span>用户名:</span>
                        <input type="text" maxlength="40" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="userManage_formtwo">
                        <span>姓名:</span>
                        <input type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户姓名">
                    </div>
                    <div class="userManage_formtwo">
                        <span>状态:</span>
                        <input type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户姓名">
                    </div>
                    <el-button type="primary" icon="search" style="height:30px;" size='small'>搜索</el-button>
                </div>
                <div class="terminalRegister_bottom_bottom">
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="用户名"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="带宽"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="fullName"
                        label="最大注册次数"
                        align='center'
                        width="130">
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="状态"
                        align='center'
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        label="账号有效期"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        label="ue认证有效期"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮箱"
                        align='center'
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'index',
        data () {
            return {
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:50
            }
        },
        mounted(){},
        methods:{
            //添加
            terminalRegisterAdd(){},
            //修改
            terminalRegisterRevamp(){},
            //删除
            terminalRegisterDelete(){},
            //列表选中change事件
            handleSelectionChange(val){},
            //列表条数事件
            handleSizeChange(val){},
            //列表页数事件
            handleCurrentChange(val){},
        },
        created(){}
    }
</script>
<style scoped>
.terminalRegister{width: 100%;height: 100%;padding: 15px;position: relative;}
.terminalRegister_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.terminalRegister_nav>i{font-size: 23px;}
.terminalRegister_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.terminalRegister_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.terminalRegister_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.terminalRegister_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.terminalRegister_bottom_bottom{height:auto;position: absolute;top: 50px;bottom: 10px;left: 10px;right:10px;}
.userManage_formtwo{display: flex;margin:0 10px;}
.userManage_formtwo>span{line-height: 30px;font-size: 15px;}
.userManage_formtwo>input{width: 126px;height: 30px;}
</style>
