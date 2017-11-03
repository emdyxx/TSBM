<template>
    <div class="equipmentUser">
        <div class="equipmentUser_nav">
            设备管理<i class="iconfont icon-icon"></i>终端用户
        </div>
        <div class="equipmentUser_main">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width:100%;height:100%;position:absolute;">
                <el-tab-pane label="所有" name='1'>
                    <div class="equipmentUser_top">
                        
                    </div>
                    <div class="equipmentUser_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="username"
                            align='center'
                            label="设备名称"
                            width="120">
                            </el-table-column>  
                            <el-table-column
                            prop="ipAddress"
                            label="ip地址"
                            align='center'
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="连接设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width='80'>
                            </el-table-column>
                                <!-- <template scope="scope">
                                    <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>   -->
                            <el-table-column
                            prop="remark"
                            label="在线时长"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="上传"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已上传"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="90">
                                <!-- <template scope="scope">
                                    <el-button type="primary" size="small">修改</el-button>
                                </template> -->
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="SizeChange"
                            @current-change="CurrentChange"
                            :current-page="pageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="认证用户" name='2'>
                    <div class="equipmentUser_top">
                       <el-button @click="approve" type="primary" size='small' style="height:30px;margin-top:3px;">新增用户</el-button>
                       <el-button type="primary" size='small' style="height:30px;margin-top:3px;">删除</el-button>
                    </div>
                    <div class="equipmentUser_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="username"
                            align='center'
                            label="设备名称"
                            width="120">
                            </el-table-column>  
                            <el-table-column
                            prop="ipAddress"
                            label="ip地址"
                            align='center'
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="连接设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width='100'>
                            </el-table-column>
                                <!-- <template scope="scope">
                                    <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>   -->
                            <el-table-column
                            prop="remark"
                            label="在线时长"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="上传"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已上传"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="90">
                                <!-- <template scope="scope">
                                    <el-button type="primary" size="small">修改</el-button>
                                </template> -->
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="SizeChange2"
                            @current-change="CurrentChange2"
                            :current-page="pageIndex2"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total2">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册用户" name='3'>
                    <div class="equipmentUser_top">
                       <el-button @click="approve" type="primary" size='small' style="height:30px;margin-top:3px;">新增用户</el-button>
                       <el-button type="primary" size='small' style="height:30px;margin-top:3px;">删除</el-button>
                    </div>
                    <div class="equipmentUser_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tableData3"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="username"
                            align='center'
                            label="设备名称"
                            width="120">
                            </el-table-column>  
                            <el-table-column
                            prop="ipAddress"
                            label="ip地址"
                            align='center'
                            width="130">s
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="连接设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width='100'>
                            </el-table-column>
                                <!-- <template scope="scope">
                                    <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>   -->
                            <el-table-column
                            prop="remark"
                            label="在线时长"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="上传"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已下载"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="已上传"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="90">
                                <!-- <template scope="scope">
                                    <el-button type="primary" size="small">修改</el-button>
                                </template> -->
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="SizeChange3"
                            @current-change="CurrentChange3"
                            :current-page="pageIndex3"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize3"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total3">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 认证用户模态框 -->
            <div class="modal fade" id="approvemyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">新增用户</h4>
                        </div>
                        <div class="modal-body">在这里添加一些文本</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary">提交更改</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<script>
    export default{
       name: 'index',
       data (){
           return {
               activeName:'1',
               tableData:[],
               pageIndex:1,
               pageSize:10,
               total:10,

               tableData2:[],
               pageIndex2:1,
               pageSize2:10,
               total2:10,

               tableData3:[],
               pageIndex3:1,
               pageSize3:10,
               total3:10,
           }
       },
       methods:{
           //所有页面数据选择
           handleClick(){},
           SizeChange(){},
           CurrentChange(){},

           handleClick2(){},
           SizeChange2(){},
           CurrentChange2(){},
           //认证用户点击添加
           approve(){
               $('#approvemyModal').modal('show')
           },

           handleClick3(){},
           SizeChange3(){},
           CurrentChange3(){},
       },
       created(){}
    }
</script>
<style scoped>
.equipmentUser{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUser_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
equipmentUser_nav>i{font-size: 23px;}
.equipmentUser_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentUser_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.equipmentUser_bottom{width: 100%;height:auto;position: absolute;top:39px;bottom:10px;}
</style>
