<template>
    <div class="logManage">
        <div class="logManage_nav">
            系统管理<i class="iconfont icon-icon"></i>日志管理
        </div>
        <div class="logManage_main" 
        v-loading.body='loading'
        element-loading-text="拼命加载中">
            <el-tabs type="border-card" v-model.lazy="activeName" @tab-click="handleClick" style="width:100%;height:100%;position:absolute;">
                <el-tab-pane label="登录日志" name='1'>
                    <div class="logManage_main_top">
                        <div class="logManage_form">
                            <span>用户名:</span>
                            <input type="text" v-model.lazy="username"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="logManage_form">
                            <span>用户登录IP:</span>
                            <input type="text" v-model.lazy="ipAddress" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="logManage_form">
                            <span>登录状态:</span>
                            <el-select v-model.lazy="status" size='small' style="width:126px;" clearable placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" icon="search" @click="LoginSearch" style="height:30px;" size='small'>搜索</el-button>
                    </div>
                    <div class="logManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="logManagetableData"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            prop="username"
                            align='center'
                            label="用户名"
                            width="180">
                            </el-table-column>  
                            <el-table-column
                            prop="ipAddress"
                            label="ip"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="认证"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="登录状态"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="ts"
                            label="登录时间"
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
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="操作日志" name='2'>
                    <div class="logManage_main_top">
                        <div class="logManage_form">
                            <span>用户名:</span>
                            <input type="text" v-model.lazy="usernametwo"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="logManage_form">
                            <span>日志类型:</span>
                            <el-select v-model.lazy="statustwo" size='small' style="width:126px;" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionstwo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="logManage_form">
                            <span>操作类型:</span>
                            <el-select v-model.lazy="statusthree" size='small' style="width:126px;" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsthree"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="operation" icon="search" style="height:30px;" size='small'>搜索</el-button>
                    </div>
                    <div class="logManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="logManagetableDatatwo"
                            border
                            stripe
                            empty-text='暂无数据'
                            slot="empty"
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            prop="logTypeValue"
                            align='center'
                            label="操作模块"
                            width="180">
                            </el-table-column>  
                            <el-table-column
                            prop="operationTypeValue"
                            label="操作"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="userName"
                            label="操作人员"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="dataId"
                            label="操作数据id"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remarke"
                            label="备注"
                            slot="empty"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="ts"
                            label="操作时间"
                            align='center'
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="handleSizeChangetwo"
                            @current-change="handleCurrentChangetwo"
                            :current-page="currentPage4two"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSizetwo"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totaltwo">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
   export default{
       name: 'index',
       data (){
           return {
                activeName:'1',
                loading:false,
                serverurl:localStorage.serverurl,
                username:'',
                ipAddress:'',
                status:"",
                options:[{
                    value:'0',
                    label:'成功'
                },{
                    value:'1',
                    label:'失败'
                }],
                logManagetableData:[],
                currentPage4:1,
                total:100,
                pageSize:10,
                pageIndex:1,
                optionstwo:[{
                    value:'0',
                    label:'用户'
                },{
                    value:'1',
                    label:'组织'
                }],
                optionsthree:[{
                    value:'0',
                    label:'新增'
                },{
                    value:'1',
                    label:'编辑'
                },{
                    value:'2',
                    label:'删除'
                }],
                usernametwo:'',
                statustwo:'',
                statusthree:'',
                logManagetableDatatwo:[],
                currentPage4two:1,
                totaltwo:100,
                pageSizetwo:10,
                pageIndextwo:1,
           }
       },
       methods:{
           //登录日志页面数据渲染
           ready(){
               var that = this;
               this.loading = true
               $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'log/getLoginLogList',
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        username:that.username,
                        ipAddress:that.ipAddress,
                        status:that.status,
                        remark:'',
                    },
                    success:function(data){
                        if(data.errorCode=='0'){ 
                            for(var i=0;i<data.rows.length;i++){
                                if(data.rows[i].status=='0'){
                                    data.rows[i].status='成功'
                                }else{
                                    data.rows[i].status='失败'  
                                }
                            }
                            that.logManagetableData = data.rows
                            that.total = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data.errorCode)
                            that.loading = false
                        }
                    }
               })
           },
           //登录日志搜索
           LoginSearch(){
               this.ready();
           },
           //登录日志选择条数事件
           handleSizeChange(val){
               this.pageSize = val
               this.ready()
           },
           //登录日志选择页数事件
           handleCurrentChange(val){
               this.pageIndex = val
               this.ready()
           },

           //操作日志页面数据渲染
           readytwo(){
               var that = this;
               this.loading = true
               $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'log/getSystemLogList',
                    data:{
                        pageIndex:that.pageIndextwo,
                        pageSize:that.pageSizetwo,
                        username:that.usernametwo,
                        logType:that.statustwo,
                        operationType:that.statusthree,
                    },
                    success:function(data){
                        if(data.errorCode=='0'){ 
                            for(var i=0;i<data.rows.length;i++){
                                if(data.rows[i].status=='0'){
                                    data.rows[i].status='成功'
                                }else{
                                    data.rows[i].status='失败'  
                                }
                            }
                            that.logManagetableDatatwo = data.rows
                            that.totaltwo = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
               })
           },
           //操作日志搜索
           operation(){
               this.readytwo();
           },
           //操作日志选择条数事件
           handleSizeChangetwo(val){
               this.pageSizetwo = val
               this.readytwo()
           },
           //操作日志选择页数事件
           handleCurrentChangetwo(val){
               this.pageIndextwo = val
               this.readytwo()
           },

           //判断选中标签页
           handleClick(tab){
               var that = this
               if(tab.name=='1'){
                   this.ready()
               }
               if(tab.name=='2'){
                   this.readytwo()
               }
           },
        },
        created(){
            this.ready()
        }
    } 
</script>
<style scoped>
.logManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.logManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.logManage_nav>i{font-size: 23px;}
.logManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.logManage_main_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.logManage_main_input{width: 126px;height: 30px;}
.logManage_form{display: flex;margin:0 10px;}
.logManage_form>span{line-height: 30px;font-size: 15px;}
.logManage_main_bottom{width: 100%;height:auto;position: absolute;top:39px;bottom:10px;}
.el-tab-pane{height: 100%;position: relative;}
</style>
