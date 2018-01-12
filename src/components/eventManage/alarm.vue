<template>
    <div class="alarm">
        <div class="alarm_nav">
            事件管理<i class="iconfont icon-icon"></i>告警信息
        </div>
        <div class="alarm_main">
            <div class="alarm_top">
                <!-- <input type="checkbox" v-model="checked">
                <span>显示历史告警信息</span> -->
                <span style="padding-left:15px;">
                    <span>告警级别:</span>
                    <el-select v-model="value" clearable size='small' style="width:110px;" placeholder="请选择">
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
                    <el-select v-model="value2" clearable size='small' style="width:110px;" placeholder="请选择">
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
                    <el-input v-model="MAC" size='small' style="width:110px;" placeholder="请输入MAC"></el-input>
                </span>
                <span style="padding-left:15px;">
                    <span>设备型号:</span>
                    <el-input v-model="hardwareVersion" size='small' style="width:110px;" placeholder="请输入设备型号"></el-input>
                </span>
                <el-button @click="alertsearch" style="margin-left:10px;" type="primary" size='small'>搜索</el-button>
            </div>
            <div class="alarm_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
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
                    prop="MAC"
                    align='center'
                    label="设备MAC"
                    width="180">
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
                                        <td>{{detail.nickname}}</td>
                                        <td>MAC地址</td>
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
                                        <td>设备类型</td>
                                        <td>{{detail.type}}</td>
                                    </tr>
                                    <tr>
                                        <td>告警时间</td>
                                        <td>{{detail.ts}}</td>
                                        <td>设备型号</td>
                                        <td>{{detail.hardwareVersion}}</td>
                                    </tr>
                                    <tr>
                                        <td>IP地址</td>
                                        <td>{{detail.lanIPX}}</td>
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
                serverurl:localStorage.serverurl,
                loading:false,
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
                that.loading = true
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
                        hardwareVersion:that.hardwareVersion
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data.errorCode)
                            that.loading = false
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
