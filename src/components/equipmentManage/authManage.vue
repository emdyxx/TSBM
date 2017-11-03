<template>
    <div class="authManage">
        <div class="authManage_nav">
            设备管理<i class="iconfont icon-icon"></i>认证管理
        </div>
        <div class="authManage_main">
            <div class="authManage_top">
                <el-button type="primary" icon="plus " size="small">添加</el-button>
                <el-button type="primary" icon="edit" size="small">修改</el-button>
                <el-button type="primary" icon="delete" size="small">删除</el-button>
            </div>
            <div class="authManage_bottom">
                <div class="authManage_bottom_top"></div>
                <div class="authManage_bottom_bottom">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
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
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="fullName"
                        label="姓名"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="分组"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        label="电话"
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
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="sizes"
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
            currentPage4:1,
            total:30,
            sizes:10,
        }
    },
    methods:{
        //选中行事件
        handleSelectionChange(val){},
        //选择条数事件
        handleSizeChange(val) {},
        //选择页数事件
        handleCurrentChange(val) {},
    },
    created(){},
}
</script>
<style scoped>
.authManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.authManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.authManage_nav>i{font-size: 23px;}
.authManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.authManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.authManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.authManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;position: absolute;}
.authManage_bottom_bottom{position: absolute;top: 40px;bottom: 0;height: auto;left: 0;right: 0;}

</style>
