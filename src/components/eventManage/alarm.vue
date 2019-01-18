<template>
    <div class="alarm">
        <!-- <div class="alarm_nav">
            {{$t('alarm.Eventmanagement')}}<i class="iconfont icon-icon"></i>{{$t('alarm.AlarmInformation')}}
        </div> -->
        <div class="alarm_main">
            <div class="alarm_top">
                <span style="padding-left:10px;">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="alertsearch"
                        style="width:150px;">
                    </el-input>
                </span>
                <span style="padding-left:10px;">
                    <span>{{$t('alarm.AlarmLevel')}}:</span>
                    <el-select v-model.lazy="value" @change="alertsearch" clearable size='small' style="width:90px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:10px;">
                    <span>{{$t('alarm.Devicetype')}}:</span>
                    <el-select v-model.lazy="value2" @change="alertsearch" clearable size='small' style="width:90px;">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:10px;">
                    <span>{{$t('alarm.AlarmType')}}:</span>
                    <el-select v-model.lazy="value3" @change="alertsearch" clearable size='small' style="width:210px;">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:10px;">
                    <span>{{$t('alarm.time')}}:</span>
                    <el-date-picker
                        v-model.lazy="timeT"
                        type="datetimerange"
                        @change="time"
                        size='small'
                        range-separator='~'
                        style="width:310px;">
                    </el-date-picker>
                </span>
                <span style="padding-left:10px;">
                    <span>{{$t('alarm.Status')}}:</span>
                    <el-select v-model.lazy="value4" @change="alertsearch" clearable size='small' style="width:90px;">
                        <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <el-button @click="alertsearch" style="margin-left:10px;" type="primary" size='small'>{{$t('alarm.Search')}}</el-button>
                <el-button v-if="partReadType" @click="partRead" style="margin-left:10px;" type="primary" size='small'>{{$t('alarm.Markedasread')}}</el-button>
                <el-button v-if="wholeReadType" @click="wholeRead" style="margin-left:10px;" type="primary" size='small'>{{$t('alarm.Allmarkedasread')}}</el-button>
                <el-button v-if="deleteReadType" @click="deleteRead" style="margin-left:10px;" type="primary" size='small'>{{$t('alarm.delete')}}</el-button>
            </div>
            <div class="alarm_bottom">
                <el-table
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    @sort-change='sortChange'
                    @row-click="clickRow"
                    ref="moviesTable"
                    :data="tableData3"
                    border
                    stripe
                    tooltip-effect="dark"
                    max-height='500'
                    style="width: 100%;margin-bottom:10px;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="MAC"
                    align='center'
                    :label="$t('alarm.EquipmentMAC')"
                    width="170">
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="nickname"
                    align='center'
                    :label="$t('alarm.DeviceNickname')"
                    width="170">
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
                    sortable='custom'
                    prop="alarmType"
                    align='center'
                    :label="$t('alarm.AlarmType')"
                    width="210">
                        <template scope="scope">
                            <span v-if="scope.row.alarmType=='1'">{{$t('alarm.CPUoverloadalarm')}}</span>
                            <span v-if="scope.row.alarmType=='2'">{{$t('alarm.Memoryoverloadalarm')}}</span>
                            <span v-if="scope.row.alarmType=='5'">{{$t('alarm.Equipmentoffline')}}</span>
                            <span v-if="scope.row.alarmType=='6'">{{$t('alarm.TSBGswitchtomastermode')}}</span>
                            <span v-if="scope.row.alarmType=='7'">{{$t('alarm.TSBGreverttostandbymode')}}</span>
                            <span v-if="scope.row.alarmType=='8'">{{$t('alarm.EquipmentCPUnormal')}}</span>
                            <span v-if="scope.row.alarmType=='9'">{{$t('alarm.Devicememorynormal')}}</span>
                            <span v-if="scope.row.alarmType=='10'">{{$t('alarm.Thenumberdevicesconnected')}}</span>
                            <span v-if="scope.row.alarmType=='11'">{{$t('alarm.Thenumberconnectedthreshold')}}</span>
                            <span v-if="scope.row.alarmType=='12'">{{$t('alarm.Userauthenticationfailed')}}</span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="content"
                    :label="$t('alarm.Alarmcontent')"
                    align='center'
                    width="260">
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="level"
                    :label="$t('alarm.Alarmlevel')"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.level=='1'" style='color:red;'>
                                {{$t('alarm.Urgent')}}
                            </span>
                            <span v-else-if="scope.row.level=='2'" style='color:#FF0000;'>
                                {{$t('alarm.Serious')}}
                            </span>
                            <span v-else-if="scope.row.level=='3'" style='color:#FF0000;'>
                                {{$t('alarm.Important')}}
                            </span>
                            <span v-else-if="scope.row.level=='4'" style='color:#FF0000;'>
                                {{$t('alarm.LessImportant')}}
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="status"
                    :label="$t('alarm.Status')"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.status=='0'" style='color:red;'>
                                {{$t('alarm.Unread')}}
                            </span>
                            <span v-else-if="scope.row.status=='1'" style='color:rgb(0, 204, 0);'>
                                {{$t('alarm.Read')}}
                            </span>
                        </template>  
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="type"
                    :label="$t('alarm.Devicetype')"
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
                    sortable='custom'
                    prop="ts"
                    :label="$t('alarm.Alarmtime')"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    :label="$t('alarm.Operate')"
                    align='center'>
                        <template scope="scope">
                            <el-button @click="alarm(scope.row)" type="primary" size="small">{{$t('alarm.Detailedinformation')}}</el-button>
                            <el-button @click="Authentication(scope.row)" v-if="scope.row.alarmType=='12'" type="primary" size="small">{{$t('alarm.AuthenticationUE')}}</el-button>
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
                            <h4 class="modal-title" id="myModalLabel" style="text-align: left;">{{$t('alarm.Detailedinformation')}}</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>{{$t('alarm.Devicename')}}</td>
                                        <td>
                                            <span v-if="detail.nickname==''||detail.nickname==undefined">
                                                {{detail.MAC}}
                                            </span>
                                            <span v-else>
                                                {{detail.nickname}}
                                            </span> 
                                        </td>
                                        <td>{{$t('alarm.EquipmentMAC')}}</td>
                                        <td>{{detail.MAC}}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('alarm.Alarmlevel')}}</td>
                                        <td>
                                            <span v-if="detail.level=='1'">{{$t('alarm.Urgent')}}</span>
                                            <span v-if="detail.level=='2'">{{$t('alarm.Serious')}}</span>
                                            <span v-if="detail.level=='3'">{{$t('alarm.Important')}}</span>
                                            <span v-if="detail.level=='4'">{{$t('alarm.LessImportant')}}</span>
                                        </td>
                                        <td>TSBG MAC</td>
                                        <td>{{detail.senderMAC}}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('alarm.Alarmtime')}}</td>
                                        <td>{{detail.ts}}</td>
                                        <td>{{$t('alarm.Unittype')}}</td>
                                        <td>{{detail.model}}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('alarm.IPaddress')}}</td>
                                        <td>{{detail.wanIP}}</td>
                                        <td>{{$t('alarm.Starttime')}}</td>
                                        <td>{{detail.startTime}}</td>
                                    </tr>
                                    <tr>
                                        <td>{{$t('alarm.Alarmcontent')}}</td>
                                        <td colspan="3">{{detail.content}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
        </div>
        <!--  -->
        <!-- 认证用户模态框 -->
        <div class="modal fade" id="approvemyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title myModalLabel" style="text-align:left">{{$t('equipmentUser.Newusers')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="equipmentUser_form">
                            <span><i class="required" >*</i>{{$t('equipmentUser.UEdeviceMAC')}}:</span>
                            <input v-model="add.ueMAC" id="ueMAC" type="text" maxlength="17" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'')" :placeholder="$t('equipmentUser.PleaseenteruedeviceMAC')" disabled="disabled">
                        </div>
                        <div class="equipmentUser_form">
                            <el-checkbox v-model="checked" @change='Autopassword' style="margin-left:110px;color: #555555;">{{$t('equipmentUser.Usingthedefaultpassword')}}</el-checkbox>
                        </div>
                        <div class="equipmentUser_form">
                            <span><i class="required">*</i>{{$t('equipmentUser.Authenticationpassword')}}:</span>
                            <input v-model="add.authPwd" id="authPwd" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentUser.Pleasepassword')">
                        </div>
                        <div class="equipmentUser_form">
                            <span>{{$t('equipmentUser.BindingtsbgMAC')}}:</span>
                            <el-select v-model="tsbgBindvalue" @change="tsbgBindChange" style="width:161px;" size='small'>
                                <el-option
                                v-for="item in tsbgBindoptions"
                                :key="item.MAC"
                                :label="item.nickname"
                                :value="item.MAC">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="equipmentUser_form">
                            <span>{{$t('equipmentUser.Tapewidth')}}:</span>
                            <input v-model="add.bandwidth" id="authPwd" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentUser.Thebandwidthisindicatingunlimited')">
                            <!-- <el-input-number v-model="add.bandwidth" :min="0" :max="10000" :title="$t('equipmentUser.Thebandwidthisindicatingunlimited')"></el-input-number> -->
                        </div>
                        <div class="equipmentUser_form">
                            <span>{{$t('equipmentUser.Activetime')}}:</span>
                            <el-date-picker
                            v-model="add.allowTime"
                            type="datetime"
                            size='small'
                            :placeholder="$t('equipmentUser.Timeisalwaysvalidempty')"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator='~'>
                            </el-date-picker>
                        </div>
                        <div class="equipmentUser_form">
                            <span>{{$t('equipmentUser.Devicename')}}:</span>
                            <input v-model="add.nickname" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentUser.Pleasedevicename')">
                        </div>
                        <div class="equipmentUser_form">
                            <el-checkbox v-model="checkedtwo" @change='AutoIP' style="margin-left:110px;color: #555555;">{{$t('equipmentUser.AutomaticcquisitionofIP')}}</el-checkbox>
                        </div>
                        <div class="equipmentUser_form">
                            <span><i class="required">*</i>{{$t('equipmentUser.IPAddress')}}:</span>
                            <input v-model="add.ueIP" id="ueIP" type="text" maxlength="30" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentUser.PleaseenterIP')">
                        </div>
                        <div class="equipmentUser_form">
                            <span>{{$t('equipmentUser.Remarkinformation')}}:</span>
                            <el-input
                            type="textarea"
                            style="height:75px;"
                            :placeholder="$t('equipmentUser.Pleaseinformation')"
                            v-model.lazy="add.remark">
                            </el-input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('equipmentUser.Close')}}</button>
                        <button type="button" @click="addUser" class="btn btn-primary addUsers">{{$t('equipmentUser.Save')}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
    export default{
        name: 'index',
        data () {
            return {
                keyword:'',
                partReadType:false,
                wholeReadType:false,
                deleteReadType:false,
                serverurl:localStorage.serverurl,
                sites:[],
                // checked:false,
                value:'',
                options:[],
                value2:'',
                options2:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'},{value:'3',label:'ue'}],
                value3:'',
                options3:[],
                value4:'',
                options4:[],
                timeT:'',
                startTime:'',
                endTime:'',
                tableData3:[],
                pageSize:10,
                pageIndex:1,
                total:10,
                detail:{},
                checked:false,
                tsbgBindvalue:'',
                tsbgBindoptions:[],
                add:{
                    ueMAC:'',
                    authPwd:'',
                    bandwidth:'',
                    allowTime:'',
                    nickname:'',
                    ueIP:'',
                    remark:'',
                    tsbgBind:'',
                },
                checkedtwo:false,
                props:'',//排序字段
                orders:'',
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
                                if(data.result[i].code=='deleteAlarm'){
                                    that.deleteReadType = true
                                }
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },200)
        },
        methods:{
            sortChange(column, prop, order){
                this.props = column.prop
                this.orders = column.order
                this.ready()
            },
            clickRow(row){
                this.$refs.moviesTable.toggleRowSelection(row)
            },
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
            time(val){
                var type = val.split('~')
                this.startTime = type[0]
                this.endTime = type[1]
            },
            //获取tsbg绑定MAC
            tsbgMac(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getTsbgbyDepartmentIds',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tsbgBindoptions = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
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
                            that.errorCode(data)
                        }
                    }
                })
            },
            //认证UE点击事件
            Authentication(val){
                var that = this
                $('#approvemyModal').modal('show')
                this.add.ueMAC = val.MAC
                this.add.departmentId = val.departmentId
                this.tsbgMac()
            },
            //是否使用默认密码
            Autopassword(){
                if(this.checked==true){
                    $('#authPwd').attr('disabled',true)
                }else{
                    $('#authPwd').attr('disabled',false)
                }
            },
            tsbgBindChange(val){
                 this.add.tsbgBind = val
            },
            //是否自动获取IP
            AutoIP(){
                if(this.checkedtwo==true){
                    $('#ueIP').attr('disabled',true)
                }else{
                    $('#ueIP').attr('disabled',false)
                }
            },
            //认证UE保存
            addUser(){
                var that = this;
                //中文验证
                var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                var reg_name=/[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/
                var data = {};
                if(that.add.ueMAC==''){
                    that.$message({
                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                        type: 'error',
                        showClose: true,
                    })
                    return;
                }
                if(that.add.ueMAC.length==12){

                }
                else if(!reg_name.test(that.add.ueMAC)){
                    this.$message({
                        message: that.$t('FalseHints.PleaseinputTheCorrectMACAddress'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(this.checked == false){
                    data.pwdType = '0'
                    if(that.add.authPwd==''){
                        that.$message({
                            message: that.$t('FalseHints.Authenticationbeempty'),
                            type: 'error',
                            showClose: true,
                        })
                        return;  
                    }
                }else{
                    data.pwdType = '1'
                }
                if(this.checkedtwo == false){
                    data.autoIP = '0'
                    if(that.add.ueIP==''){
                        that.$message({
                            message: that.$t('FalseHints.IPcannotbeempty'),
                            type: 'error',
                            showClose: true,
                        })
                        return;  
                    }
                }else{
                    data.autoIP = '1'
                }
                if(this.add.allowTime==''||this.add.allowTime==undefined||this.add.allowTime==null){
                    var dataTime=''
                }else{
                    var d = new Date(this.add.allowTime);  
                    var dataTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
                }
                data.departmentId=that.add.departmentId
                data.ueMAC=that.add.ueMAC
                data.authPwd=that.add.authPwd
                data.tsbgBind=that.add.tsbgBind
                data.nickname=that.add.nickname
                data.remark=that.add.remark
                data.ueIP=that.add.ueIP
                data.bandwidth=this.add.bandwidth
                data.allowTime=dataTime
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'terminal/addUe',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('FalseHints.SaveSuccess'),
                                type: 'success',
                                showClose: true,
                            })
                            $('#approvemyModal').modal('hide');
                        }else{
                            that.errorCode(data)
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
                        keyword:that.keyword,
                        level:that.value,
                        type:that.value2,
                        alarmType:that.value3,
                        startTime:that.startTime,
                        endTime:that.endTime,
                        status:that.value4,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //标为已读
            partRead(){
                var that = this;
                if(this.sites.length==''){
                    that.$message({
                        message: that.$t('FalseHints.Pleasetooperate'),
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
                                message: that.$t('FalseHints.Setupsuccess'),
                                type: 'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data)
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
                                message: that.$t('FalseHints.Setupsuccess'),
                                type: 'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //删除
            deleteRead(){
                var that = this;
                if(this.sites.length==''){
                    that.$message({
                        message: that.$t('FalseHints.Pleasetooperate'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var array = [];
                for(var i=0;i<this.sites.length;i++){
                    array.push(this.sites[i].id)
                }
                this.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'event/delAlarm',
                        data:{
                            alarmIds:array.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('FalseHints.DeleteSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                that.ready()
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: that.$t('FalseHints.Undelete')
                    });          
                });
            },
        },
        created(){
            if(localStorage.locale=='en'){
                this.options=[{value:'1',label:'Urgent'},{value:'2',label:'Serious'},{value:'3',label:'Important'},{value:'4',label:'Less Important'}]
                this.options3=[
                    {value:'1',label:'CPU overload alarm'},
                    {value:'2',label:'Memory overload alarm'},
                    {value:'5',label:'Equipment off-line'},
                    {value:'6',label:'TSBG switch to master mode'},
                    {value:'7',label:'TSBG revert to standby mode'},
                    {value:'8',label:'Equipment CPU usage returned to normal'},
                    {value:'9',label:'Device memory utilization returned to normal'},
                    {value:'10',label:'The number of devices connected to users reached 80%'},
                    {value:'11',label:'The number of devices connected to users reaches the threshold'},
                    {value:'12',label:'User authentication failed'},
                ]
                this.options4=[{value:'0',label:'Unread'},{value:'1',label:'Read'}]
            }else{
                this.options=[{value:'1',label:'紧急'},{value:'2',label:'严重'},{value:'3',label:'重要'},{value:'4',label:'次要'}]
                this.options3=[
                    {value:'1',label:'cpu过载告警'},
                    {value:'2',label:'内存过载告警'},
                    {value:'5',label:'设备离线'},
                    {value:'6',label:'TSBG切换到主模式'},
                    {value:'7',label:'TSBG恢复到备模式'},
                    {value:'8',label:'设备CPU使用率恢复到正常'},
                    {value:'9',label:'设备内存使用率恢复到正常'},
                    {value:'10',label:'设备连接用户数量达到80%'},
                    {value:'11',label:'设备连接用户数量达到阀值'},
                    {value:'12',label:'用户认证失败'},
                ]
                this.options4=[{value:'0',label:'未读'},{value:'1',label:'已读'}]
            }
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.alarm{width: 100%;height: 100%;padding: 15px;position: relative;}
.alarm_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.alarm_nav>i{font-size: 23px;}
.alarm_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.alarm_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.alarm_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}

.equipmentUser_form{display: flex;width: 340px;margin: 0 auto 10px;}
.equipmentUser_form>span{display:inline-block;width: 180px;line-height: 34px;font-size: 15px;text-align: right;}
.equipmentUser_form>input{height: 31px;width:160px;}
.equipmentUser_form>div{height: 31px;width:160px;}
</style>
