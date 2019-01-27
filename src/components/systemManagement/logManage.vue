<template>
    <div class="logManage">
        <!-- <div class="logManage_nav">
            {{$t('logManage.SystemManagement')}}<i class="iconfont icon-icon"></i>{{$t('logManage.LogManagement')}}
        </div> -->
        <div class="logManage_main" 
        v-loading.body='loading'
        element-loading-text="拼命加载中">
            <el-tabs type="card" v-model.lazy="activeName" @tab-click="handleClick" style="width:100%;height:100%;position:absolute;">
                <el-tab-pane :label="$t('logManage.LogonLog')" name='1' style="border: 1px solid #c4c4c4;border-top: none;">
                    <div class="logManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="logManagetableData"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange'
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            sortable='custom'
                            prop="username"
                            align='center'
                            :label="$t('logManage.UserName')"
                            width="180">
                            </el-table-column>  
                            <el-table-column
                            sortable='custom'
                            prop="ipAddress"
                            :label="$t('logManage.UserLoginIP')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="remark"
                            :label="$t('logManage.Authentication')"
                            align='center'
                            width="180">
                                <template scope="scope">
                                    <span v-if="scope.row.remark=='登录成功'">{{$t('logManage.LoginSuccess')}}</span>
                                    <span v-if="scope.row.remark=='登录失败'">{{$t('logManage.LoginFailure')}}</span>
                                    <span v-if="scope.row.remark=='认证成功'">{{$t('logManage.CertificationSuccess')}}</span>
                                    <span v-if="scope.row.remark=='认证失败'">{{$t('logManage.AuthenticationFailure')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="status"
                            :label="$t('logManage.LoginStatus')"
                            align='center'
                            width="180">
                                <template scope="scope">
                                    <span v-if="scope.row.status=='0'">{{$t('logManage.Success')}}</span>
                                    <span v-if="scope.row.status=='1'">{{$t('logManage.beDefeated')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="ts"
                            :label="$t('logManage.LoginTime')"
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
                <el-tab-pane :label="$t('logManage.OperationLog')" name='2' style="border: 1px solid #c4c4c4;border-top: none;">
                    <div class="logManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="logManagetableDatatwo"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange2'
                            border
                            stripe
                            empty-text='暂无数据'
                            slot="empty"
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            sortable='custom'
                            prop="logTypeValue"
                            align='center'
                            :label="$t('logManage.OperationModule')"
                            width="180">
                                <template scope="scope">
                                    <span v-if="scope.row.logType=='0'">{{$t('logManage.usermanagement')}}</span>
                                    <span v-if="scope.row.logType=='1'">{{$t('logManage.Organizationandmanagement')}}</span>
                                    <span v-if="scope.row.logType=='4'">{{$t('logManage.TSBmanagement')}}</span>
                                    <span v-if="scope.row.logType=='5'">{{$t('logManage.Groupmanagement')}}</span>
                                    <span v-if="scope.row.logType=='6'">{{$t('logManage.Equipmentlocation')}}</span>
                                    <span v-if="scope.row.logType=='7'">{{$t('logManage.Templatemanagement')}}</span>
                                    <span v-if="scope.row.logType=='8'">{{$t('logManage.EquipmentUpgradePackage')}}</span>
                                    <span v-if="scope.row.logType=='9'">{{$t('logManage.Regionalmanagement')}}</span>
                                    <span v-if="scope.row.logType=='10'">{{$t('logManage.Authenticateduser')}}</span>
                                    <span v-if="scope.row.logType=='11'">{{$t('logManage.Registeredusers')}}</span>
                                    <span v-if="scope.row.logType=='12'">{{$t('logManage.Alarminformation')}}</span>
                                    <span v-if="scope.row.logType=='13'">{{$t('logManage.Eventinformation')}}</span>
                                    <span v-if="scope.row.logType=='14'">{{$t('logManage.Applicationfirmware')}}</span>
                                </template>
                            </el-table-column>  
                            <el-table-column
                            sortable='custom'
                            prop="operationType"
                            :label="$t('logManage.Operate')"
                            align='center'
                            width="180">
                                <template scope="scope">
                                    <span v-if="scope.row.operationType=='0'">{{$t('logManage.NewlyIncreased')}}</span>
                                    <span v-if="scope.row.operationType=='1'">{{$t('logManage.Edit')}}</span>
                                    <span v-if="scope.row.operationType=='2'">{{$t('logManage.Delete')}}</span>
                                    <span v-if="scope.row.operationType=='3'">{{$t('logManage.Toconfigure')}}</span>
                                    <span v-if="scope.row.operationType=='4'">{{$t('logManage.Grouping')}}</span>
                                    <span v-if="scope.row.operationType=='5'">{{$t('logManage.upgrade')}}</span>
                                    <span v-if="scope.row.operationType=='6'">{{$t('logManage.restart')}}</span>
                                    <span v-if="scope.row.operationType=='7'">{{$t('logManage.Reset')}}</span>
                                    <span v-if="scope.row.operationType=='8'">{{$t('logManage.Enable')}}</span>
                                    <span v-if="scope.row.operationType=='9'">{{$t('logManage.Prohibit')}}</span>
                                    <span v-if="scope.row.operationType=='10'">{{$t('logManage.upload')}}</span>
                                    <span v-if="scope.row.operationType=='11'">{{$t('logManage.join')}}</span>
                                    <span v-if="scope.row.operationType=='12'">{{$t('logManage.remove')}}</span>
                                    <span v-if="scope.row.operationType=='13'">{{$t('logManage.sign')}}</span>
                                    <span v-if="scope.row.operationType=='14'">{{$t('logManage.Import')}}</span>
                                    <span v-if="scope.row.operationType=='15'">{{$t('logManage.Authentication')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="userName"
                            :label="$t('logManage.OperatingUser')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="summary"
                            :label="$t('logManage.Operationcontent')"
                            align='center'
                            min-width="250">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="ts"
                            :label="$t('logManage.OperateTime')"
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
            <div v-if="activeName=='1'" class="logManage_main_div" style="left:200px;">
                <el-input
                    icon="search"
                    size='small'
                    :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                    v-model="keyword"
                    @change="LoginSearch"
                    style="width:150px;">
                </el-input>
                <span style="margin-left:20px;">{{$t('logManage.LoginStatus')}}:</span>
                <el-select v-model.lazy="status" @change="LoginSearch" size='small' style="width:126px;" clearable>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div v-if="activeName=='2'" class="logManage_main_div" style="left:200px;">
                <el-input
                    icon="search"
                    size='small'
                    :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                    v-model="keyword2"
                    @change="operation"
                    style="width:150px;">
                </el-input>
                <span style="margin-left:20px;">{{$t('logManage.LogType')}}:</span>
                <el-select v-model.lazy="statustwo" @change="operation" size='small' style="width:126px;" clearable>
                    <el-option
                    v-for="item in optionstwo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-left:20px;">{{$t('logManage.OperationType')}}:</span>
                <el-select v-model.lazy="statusthree" @change="operation" size='small' style="width:126px;" clearable>
                    <el-option
                    v-for="item in optionsthree"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
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
                keyword:'',
                status:"",
                options:[],
                logManagetableData:[],
                currentPage4:1,
                total:100,
                pageSize:10,
                pageIndex:1,
                optionstwo:[],
                optionsthree:[],
                keyword2:'',
                statustwo:'',
                statusthree:'',
                logManagetableDatatwo:[],
                currentPage4two:1,
                totaltwo:100,
                pageSizetwo:10,
                pageIndextwo:1,
                props:'',//排序字段
                orders:'',
                props2:'',//排序字段
                orders2:'',
           }
       },
       methods:{
            sortChange(column, prop, order){
                this.props = column.prop
                this.orders = column.order
                this.ready()
            },
            sortChange2(column, prop, order){
                this.props2 = column.prop
                this.orders2 = column.order
                this.readytwo()
            },
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
                        keyword:that.keyword,
                        // username:that.username,
                        // ipAddress:that.ipAddress,
                        status:that.status,
                        order:that.props,
                        orderBy:that.orders
                        // remark:'',
                    },
                    success:function(data){
                        if(data.errorCode=='0'){ 
                            // for(var i=0;i<data.rows.length;i++){
                            //     if(data.rows[i].status=='0'){
                            //         data.rows[i].status='成功'
                            //     }else{
                            //         data.rows[i].status='失败'  
                            //     }
                            // }
                            that.logManagetableData = data.rows
                            that.total = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data)
                            that.loading = false
                        }
                    }
               })
           },
           //登录日志搜索
           LoginSearch(){
               this.pageIndex = 1
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
                        keyword:that.keyword2,
                        logType:that.statustwo,
                        operationType:that.statusthree,
                        order:that.props2,
                        orderBy:that.orders2
                    },
                    success:function(data){
                        if(data.errorCode=='0'){ 
                            that.logManagetableDatatwo = data.rows
                            that.totaltwo = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data)
                        }
                    }
               })
           },
           //操作日志搜索
           operation(){
               this.pageIndextwo = 1
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
            if(localStorage.locale=='en'){
                this.options = [{value:'0',label:'Success'},{value:'1',label:'beDefeated'}]
                this.optionstwo = [{value:'0',label:'User'},{value:'1',label:'Organization'}]
                this.optionsthree = [{value:'0',label:'NewlyIncreased'},{value:'1',label:'Edit'},{value:'2',label:'Delete'}]
            }else{
                this.options = [{value:'0',label:'成功'},{value:'1',label:'失败'}]
                this.optionstwo = [{value:'0',label:'用户'},{value:'1',label:'组织'}]
                this.optionsthree = [{value:'0',label:'新增'},{value:'1',label:'编辑'},{value:'2',label:'删除'}]
            }
        }
    } 
</script>
<style scoped>
.logManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.logManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.logManage_nav>i{font-size: 23px;}
/* border: 1px solid #c4c4c4; */
.logManage_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border-radius: 4px;}
.logManage_main_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.logManage_main_input{width: 126px;height: 30px;}
.logManage_form{display: flex;margin:0 10px;}
.logManage_form>span{line-height: 30px;font-size: 15px;}
.logManage_main_bottom{width: 100%;height:auto;position: absolute;top:0;bottom:10px;padding: 5px;}
.el-tab-pane{height: 100%;position: relative;}

.logManage_main_div{position: absolute;height: 29px;top:3px;display: flex}
.logManage_main_div>span{line-height: 29px;font-size: 16px}

</style>
