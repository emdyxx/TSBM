<template>
    <div class="alarm">
        <div class="alarm_nav">
            事件管理<i class="iconfont icon-icon"></i>告警信息
        </div>
        <div class="alarm_main">
            <div class="alarm_top">
                <!-- <input type="checkbox" v-model.lazy="checked">
                <span>显示历史告警信息</span> -->
                <span style="padding-left:15px;">
                    <span>告警级别:</span>
                    <el-select v-model.lazy="value" clearable size='small' style="width:110px;" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:15px;">
                    <span>设备类型:</span>
                    <el-select v-model.lazy="value2" clearable size='small' style="width:110px;" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:15px;">
                    <span>MAC:</span>
                    <el-input v-model.lazy="MAC" size='small' style="width:110px;" placeholder="请输入MAC"></el-input>
                </span>
                <span style="padding-left:15px;">
                    <span>设备型号:</span>
                    <el-input v-model.lazy="hardwareVersion" size='small' style="width:110px;" placeholder="请输入设备型号"></el-input>
                </span>
                <el-button @click="alertsearch" style="margin-left:10px;" type="primary" size='small'>搜索</el-button>
                <el-button v-if="partReadType" @click="partRead" style="margin-left:10px;" type="primary" size='small'>标为已读</el-button>
                <el-button v-if="wholeReadType" @click="wholeRead" style="margin-left:10px;" type="primary" size='small'>全部标为已读</el-button>
            </div>
            <div class="alarm_bottom">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    border
                    stripe
                    tooltip-effect="dark"
                    max-height='530'
                    style="width: 100%;margin-bottom:10px;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="MAC"
                    align='center'
                    label="设备MAC"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    align='center'
                    label="设备昵称"
                    width="180">
                        <template scope="scope">
                            <span v-if="scope.row.nickname==''">
                                {{scope.row.MAC}}
                            </span>
                            <span v-else>
                                {{scope.row.nickname}}
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    prop="content"
                    label="告警内容"
                    align='center'
                    width="260">
                    </el-table-column>
                    <el-table-column
                    label="告警级别"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.level=='1'" style='color:red;'>
                                紧急
                            </span>
                            <span v-else-if="scope.row.level=='2'" style='color:#FF0000;'>
                                严重
                            </span>
                            <span v-else-if="scope.row.level=='3'" style='color:#FF0000;'>
                                重要
                            </span>
                            <span v-else-if="scope.row.level=='4'" style='color:#FF0000;'>
                                次要
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    label="状态"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.status=='0'" style='color:red;'>
                                未读
                            </span>
                            <span v-else-if="scope.row.status=='1'" style='color:rgb(0, 204, 0);'>
                                已读
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    label="设备类型"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.type=='0'">
                                TSBG
                            </span>
                            <span v-else-if="scope.row.type=='1'">
                                TSBC
                            </span>
                            <span v-else-if="scope.row.type=='2'">
                                TSBA
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    prop="model"
                    label="设备型号"
                    align='center'
                    width='180'>
                    </el-table-column>
                    <el-table-column
                    prop="ts"
                    label="告警时间"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="90">
                        <template scope="scope">
                            <el-button @click="alarm(scope.row)" type="primary" size="small">查看详情</el-button>
                        </template>
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
            <!-- 查看详情模态框 -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:550px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">详情</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>设备名称</td>
                                        <td>
                                            <span v-if="detail.nickname==''||detail.nickname==undefined">
                                                {{detail.MAC}}
                                            </span>
                                            <span v-else>
                                                {{detail.nickname}}
                                            </span> 
                                        </td>
                                        <td>设备MAC</td>
                                        <td>{{detail.MAC}}</td>
                                    </tr>
                                    <tr>
                                        <td>告警级别</td>
                                        <td>
                                            <span v-if="detail.level=='1'">一级</span>
                                            <span v-if="detail.level=='2'">二级</span>
                                            <span v-if="detail.level=='3'">三级</span>
                                            <span v-if="detail.level=='4'">四级</span>
                                        </td>
                                        <td>TSBG MAC</td>
                                        <td>{{detail.senderMAC}}</td>
                                    </tr>
                                    <tr>
                                        <td>告警时间</td>
                                        <td>{{detail.ts}}</td>
                                        <td>设备型号</td>
                                        <td>{{detail.hardwareVersion}}</td>
                                    </tr>
                                    <tr>
                                        <td>IP地址</td>
                                        <td>{{detail.wanIP}}</td>
                                        <td>启动时间</td>
                                        <td>{{detail.startTime}}</td>
                                    </tr>
                                    <tr>
                                        <td>告警内容</td>
                                        <td colspan="3">{{detail.content}}</td>
                                    </tr>
                                </tbody>
                            </table>
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
        data () {
            return {
                partReadType:false,
                wholeReadType:false,
                serverurl:localStorage.serverurl,
                sites:[],
                // checked:false,
                value:'',
                options:[{value:'1',label:'紧急'},{value:'2',label:'严重'},{value:'3',label:'重要'},{value:'4',label:'次要'}],
                value2:'',
                options2:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                tableData3:[],
                pageSize:10,
                pageIndex:1,
                total:10,
                MAC:'',
                hardwareVersion:'',
                detail:{},
            }
        },
        mounted(){
            var that = this;
            setTimeout(function(){
                //请求用户操作权限
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'system/getUserPrivilege',
                    data:{
                        menuId:sessionStorage.menuId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            for(var i=0;i<data.result.length;i++){
                                if(data.result[i].code=='readAlarm'){
                                    that.partReadType = true
                                }
                                if(data.result[i].code=='readAllAlarm'){
                                    that.wholeReadType = true
                                }
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },200)
        },
        methods:{
            //选中行的change事件
            handleSelectionChange(val){
                this.sites = val
            },
            //选择条数事件
            handleSizeChange(val) {
                this.pageSize = val
                this.ready()
            },
            //选择页数事件
            handleCurrentChange(val) {
                this.pageIndex = val
                this.ready()
            },
            //查看详情点击事件
            alarm(val){
                $('#myModal').modal('show')
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'event/getAlarmInfo',
                    data:{
                        alarmId:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.detail = data.result
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //页面搜索
            alertsearch(){
                this.ready()
            },
            //页面渲染
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'event/getAlarmList',
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        level:that.value,
                        type:that.value2,
                        MAC:that.MAC,
                        model:that.hardwareVersion
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //标为已读
            partRead(){
                var that = this;
                if(this.sites.length==''){
                    that.$message({
                        message: '请选择数据进行操作!',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var array = [];
                for(var i=0;i<this.sites.length;i++){
                    array.push(this.sites[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'event/editAlarmStatus',
                    data:{
                        alarmIds:array.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '设置成功',
                                type: 'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //全部标为已读
            wholeRead(){
                var that = this;
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'event/editAllAlarmStatus',
                    data:{
                        level:that.value
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '设置成功',
                                type: 'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.alarm{width: 100%;height: 100%;padding: 15px;position: relative;}
.alarm_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.alarm_nav>i{font-size: 23px;}
.alarm_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.alarm_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.alarm_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
</style>
