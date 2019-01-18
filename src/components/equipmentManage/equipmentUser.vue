<template>
    <div class="equipmentUser">
        <!-- <div class="equipmentUser_nav">
            {{$t('equipmentUser.TerminalManagement')}}<i class="iconfont icon-icon"></i>{{$t('equipmentUser.TerminalUser')}}
        </div> -->
        <div class="equipmentUser_main">
            <el-tabs type="border-card" v-model.lazy="activeName" @tab-click="handleClick" style="width:100%;height:100%;position:absolute;">
                <el-tab-pane :label="$t('equipmentUser.Own')" name='1' style="height:100%;border: 1px solid #c4c4c4;border-top: none;">
                    <div class="equipmentUser_bottom">
                        <el-table
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange'
                            @row-click="clickRow"
                            ref="moviesTable"
                            :data="tableData"
                            border
                            stripe
                            tooltip-effect="dark"
                            max-height='530'
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="nickname"
                            fixed
                            align='center'
                            :label="$t('equipmentUser.nickname')"
                            width="170">
                                <template scope="scope">
                                    <span v-if="scope.row.nickname==''">
                                        {{scope.row.terminalMAC}}
                                    </span>
                                    <span v-else>
                                        {{scope.row.nickname}}
                                    </span>
                                </template>  
                            </el-table-column>  
                            <el-table-column
                            sortable='custom'
                            prop="terminalMAC"
                            :label="$t('equipmentUser.EquipmentMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="online"
                            :label="$t('equipmentUser.Onlinestate')"
                            align='center'
                            width='130'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        {{$t('equipmentUser.OnLine')}}
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        {{$t('equipmentUser.OffLine')}}
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="terminalType"
                            :label="$t('equipmentUser.Terminaltype')"
                            align='center'
                            width="135">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="equipmentMAC"
                            :label="$t('equipmentUser.LinkdeviceMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="senderMAC"
                            :label="$t('equipmentUser.TSBGequipment')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="updateTime"
                            :label="$t('equipmentUser.Refreshtime')"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="departmentName"
                            align='center'
                            :label="$t('equipmentUser.Belongingorganization')"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            fixed="right"
                            prop="remark"
                            :label="$t('equipmentUser.Remarks')"
                            align='center'
                            show-overflow-tooltip>
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
                <el-tab-pane :label="$t('equipmentUser.AuthenticatedUser')" name='2' style="height:100%;border: 1px solid #c4c4c4;border-top: none;">
                    <div class="equipmentUser_bottom">
                        <el-table
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange'
                            @row-click="clickRow2"
                            ref="moviesTable2"
                            :data="tableData2"
                            border
                            stripe
                            tooltip-effect="dark"
                            max-height='530'
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="nickname"
                            fixed
                            align='center'
                            :label="$t('equipmentUser.nickname')"
                            width="170">
                                <template scope="scope">
                                    <span v-if="scope.row.nickname==''">
                                        {{scope.row.ueMAC}}
                                    </span>
                                    <span v-else>
                                        {{scope.row.nickname}}
                                    </span>
                                </template>  
                            </el-table-column>  
                            <el-table-column
                            sortable='custom'
                            prop="ueMAC"
                            :label="$t('equipmentUser.EquipmentMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="ueIP"
                            :label="$t('equipmentUser.IPAddress')"
                            align='center'
                            width="140">
                                <template scope="scope">
                                    <p style="margin:0">{{scope.row.ueIP}}</p>
                                    <p v-if="scope.row.currentUeIP!=''" style="margin:0">{{scope.row.currentUeIP}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="online"
                            :label="$t('equipmentUser.Onlinestate')"
                            align='center'
                            width='120'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        {{$t('equipmentUser.OnLine')}}
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        {{$t('equipmentUser.OffLine')}}
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="authStatus"
                            :label="$t('equipmentUser.Authenticationstatus')"
                            align='center'
                            width='185'>
                                <template scope="scope">
                                    <span v-if="scope.row.authStatus=='1'" style='color:#00CC00;'>
                                        {{$t('equipmentUser.Certified')}}
                                    </span>
                                    <span v-else-if="scope.row.authStatus=='0'" style='color:#FF0000;'>
                                        {{$t('equipmentUser.Uncertified')}}
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="equipmentMAC"
                            :label="$t('equipmentUser.LinkdeviceMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="senderMAC"
                            :label="$t('equipmentUser.TSBGequipment')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="tsbgBind"
                            :label="$t('equipmentUser.BindingtsbgMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="updateTime"
                            :label="$t('equipmentUser.Refreshtime')"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="allowTime"
                            :label="$t('equipmentUser.Activetime')"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="bandwidth"
                            :label="$t('equipmentUser.Tapewidth')"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="departmentName"
                            align='center'
                            :label="$t('equipmentUser.Belongingorganization')"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            fixed="right"
                            prop="remark"
                            :label="$t('equipmentUser.Remarks')"
                            width="110"
                            align='center'>
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
                <el-tab-pane :label="$t('equipmentUser.RegisteredUser')" name='3' style="height:100%;border: 1px solid #c4c4c4;border-top: none;">
                    <div class="equipmentUser_bottom">
                        <el-table
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange'
                            @row-click="clickRow3"
                            ref="moviesTable3"
                            :data="tableData3"
                            border
                            stripe
                            max-height='530'
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="staMAC"
                            :label="$t('equipmentUser.EquipmentMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="online"
                            :label="$t('equipmentUser.Onlinestate')"
                            align='center'
                            width='130'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        {{$t('equipmentUser.OnLine')}}
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        {{$t('equipmentUser.OffLine')}}
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="wifiType"
                            :label="$t('equipmentUser.WiFitype')"
                            align='center'
                            width="120">
                                <template scope="scope">
                                    <span v-if="scope.row.wifiType=='0'">
                                        2.4G
                                    </span>
                                    <span v-else-if="scope.row.wifiType=='1'">
                                        5G
                                    </span>
                                </template>  
                            </el-table-column>                            
                            <el-table-column
                            sortable='custom'
                            prop="senderMAC"
                            :label="$t('equipmentUser.BindingtsbgMAC')"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="equipmentMAC"
                            :label="$t('equipmentUser.LinkdeviceMAC')"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="updateTime"
                            :label="$t('equipmentUser.Refreshtime')"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="departmentName"
                            align='center'
                            :label="$t('equipmentUser.Belongingorganization')"
                            width="200">
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
            <div class="equipmentUser_main_div">
                <el-input
                    icon="search"
                    size='small'
                    :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                    v-model="keyword"
                    @change="searchs"
                    style="width:165px;">
                </el-input>
                <span style="display:inline-block;width:60px;margin-left:10px;">{{$t('equipmentUser.OnlineState')}}:</span>
                <el-select @change="searchs" v-model.lazy="onlinevalue" style="width:96px;" size='small' clearable>
                    <el-option
                    v-for="item in onlineoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div v-if="activeName=='2'">
                    <span>{{$t('equipmentUser.AuthenticationStatus')}}:</span>
                    <el-select @change="searchs" v-model.lazy="Authenticationvalue" style="width:96px;" size='small' clearable>
                        <el-option
                        v-for="item in Authenticationoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button v-if="addtype" @click="approve" type="primary" size='small' style="height:30px;margin-top:3px;">{{$t('equipmentUser.NewUsers')}}</el-button>
                    <el-button v-if="deletetype" @click="deleterove" type="primary" size='small' style="height:30px;margin-top:3px;">{{$t('equipmentUser.ModifyUser')}}</el-button>
                    <el-button v-if="approvetype" @click="renzheng" type="primary" size='small' style="height:30px;margin-top:3px;">{{$t('equipmentUser.TheImport')}}</el-button>
                    <el-button v-if="batchAuthUe" @click="cloudEnd" type="primary" size='small' style="height:30px;margin-top:3px;">{{$t('equipmentUser.CertifiedUE')}}</el-button>
                    <el-button @click="deleteUser" type="primary" size="small" style="height:30px;margin-top:3px;">{{$t('equipmentUser.delete')}}</el-button> 
                </div>
                <div v-if="activeName=='3'">
                    <el-button @click="deleteUser" type="primary" size="small" style="height:30px;margin-top:3px;margin-left:5px;">{{$t('equipmentUser.delete')}}</el-button>
                </div>
            </div>
            <!-- 认证用户模态框 -->
            <div class="modal fade" id="approvemyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 v-if="statustype=='0'" class="modal-title myModalLabel" style="text-align:left">{{$t('equipmentUser.Newusers')}}</h4>
                            <h4 v-if="statustype=='1'" class="modal-title myModalLabel" style="text-align:left">{{$t('equipmentUser.Modifytheuser')}}</h4>
                        </div>
                        <div class="modal-body">
                            <div v-if="selected" class="equipmentUser_form">
                                <span><i class="required">*</i>{{$t('equipmentUser.Attributiondepartment')}}:</span>
                                <el-select v-model.lazy="add.departmentId">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="equipmentUser_form">
                                <span><i class="required" >*</i>{{$t('equipmentUser.UEdeviceMAC')}}:</span>
                                <input v-model="add.ueMAC" id="ueMAC" type="text" maxlength="17" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'')" :placeholder="$t('equipmentUser.PleaseenteruedeviceMAC')">
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
                                <el-select v-model="tsbgBindvalue" @change="tsbgBindChange" size='small'>
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
            <!-- 认证用户模态框 -->
            <div class="modal fade" id="cloudEndModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title myModalLabel" style="text-align:left">网关操作</h4>
                        </div>
                        <div class="modal-body">
                            <div class="equipmentUser_form" style="justify-content: center;">
                                <el-checkbox v-model="cloudEndCheck">是否使用云端网关</el-checkbox>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" @click="addcloudEnd" class="btn btn-primary addUsers">保存</button>
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
                keyword:'',
                //按钮权限
                addtype:false,
                deletetype:false,
                delate:false,
                approvetype:false,
                batchAuthUe:false,
                serverurl:localStorage.serverurl,
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

                //搜索条件
                onlineoptions:[], //在线状态
                onlinevalue:'',
                Authenticationoptions:[{value: '1',label: '已认证'},{value: '0',label: '未认证'}], //认证状态
                Authenticationvalue:'',

                checked:false,
                checkedtwo:false,
                cloudEndCheck:false,
                //添加参数
                selected:false,
                options:[],
                add:{
                    ueMAC:'',
                    authPwd:'',
                    tsbgBind:'',
                    ueType:'',
                    nickname:'',
                    remark:'',
                    ueIP:'',
                    departmentId:'',
                    bandwidth:'',
                    allowTime:'',
                },

                tsbgBindoptions:[],
                tsbgBindvalue:'',
                statustype:'0',
                SelectionChange:[], //认证用户选取的数据
                loading:false,
                props:'',//排序字段
                orders:'',
            }
        },
        mounted(){
            var that = this
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
                                if(data.result[i].code=='addUe'){
                                    that.addtype = true
                                }
                                if(data.result[i].code=='delUe'){
                                    that.delate = true
                                }
                                if(data.result[i].code=='authUe'){
                                    that.approvetype = true
                                }
                                if(data.result[i].code=='editUe'){
                                    that.deletetype = true
                                }
                                if(data.result[i].code=='batchAuthUe'){
                                    that.batchAuthUe = true
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
                this.handleClick()
            },
            clickRow(row){
                this.$refs.moviesTable.toggleRowSelection(row)
            },
            clickRow2(row){
                this.$refs.moviesTable2.toggleRowSelection(row)
            },
            clickRow3(row){
                this.$refs.moviesTable3.toggleRowSelection(row)
            },
            handleClick(val){
                if(val!='ST'){
                    this.onlinevalue = '';
                }
                var that = this;
                var authStatus = '';
                var pageIndex = '';
                var pageSize = '';
                var url = '';
                this.SelectionChange= []
                var data = {}
                that.loading = true
                if(that.activeName=='1'){
                    pageIndex=that.pageIndex;
                    pageSize=that.pageSize;
                    url='terminal/getAllTerminalList';
                }
                if(that.activeName=='2'){
                    pageIndex=that.pageIndex2;
                    pageSize=that.pageSize2;
                    url='terminal/getUeList';
                    data.authStatus = that.Authenticationvalue
                }
                if(that.activeName=='3'){
                    pageIndex=that.pageIndex3;
                    pageSize=that.pageSize3;
                    url='terminal/getStaList'
                }
                data.online = that.onlinevalue
                data.pageIndex = pageIndex
                data.pageSize = pageSize
                data.keyword = that.keyword
                data.order = that.props
                data.orderBy = that.orders
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        that.loading = false
                        if(data.errorCode=='0'){
                            if(that.activeName=='1'){
                                that.tableData = data.rows;
                                that.total = data.total;
                            }
                            if(that.activeName=='2'){
                                that.tableData2 = data.rows;
                                that.total2 = data.total;
                            }
                            if(that.activeName=='3'){
                                that.tableData3 = data.rows;
                                that.total3 = data.total;
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //所有页面条数页数选择
            SizeChange(val){this.pageSize = val;this.handleClick()},
            CurrentChange(val){this.pageIndex = val;this.handleClick()},
            //认证用户页面条数页数选择
            SizeChange2(val){this.pageSize2 = val;this.handleClick()},
            CurrentChange2(val){this.pageIndex2 = val;this.handleClick()},
            //注册页面条数页数事件
            SizeChange3(val){this.pageSize3 = val;this.handleClick()},
            CurrentChange3(val){this.pageIndex3 = val;this.handleClick()},
            //获取tsbg绑定MAC
            tsbgMac(){
                var that = this;
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
                            that.errorCode(data)
                        }
                    }
                })
            },
            tsbgBindChange(val){
                this.add.tsbgBind = val
            },
            //认证用户点击添加按钮
            approve(){
                var that = this;
                $('#approvemyModal').modal('show')
                // $('.myModalLabel').text('新增用户')
                this.statustype = '0'
                this.checked = false
                this.checkedtwo = false
                $('#authPwd').attr('disabled',false)
                $('#ueIP').attr('disabled',false)
                this.add.ueMAC = ''
                this.add.authPwd = ''
                this.add.tsbgBind=''
                this.add.nickname = ''
                this.add.remark = ''
                this.add.ueIP = ''
                this.add.bandwidth = ''
                this.add.allowTime = ''
                this.tsbgBindvalue = ''
                this.tsbgMac()
                if(sessionStorage.departmentId=='1'){
                    that.selected = true
                    //管理员登录请求selected下拉框数据
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/getTopDepartment',
                        data:{},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.options = data.result
                                that.add.departmentId = data.result[0].value
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
                $('#ueMAC').attr('disabled',false)
            },
            //认证用户点击修改按钮
            deleterove(){
                var that = this;
                if(this.SelectionChange.length==0||this.SelectionChange.length>=2){
                    this.$message({
                        message: '请选择一条数据进行修改',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#approvemyModal').modal('show')
                this.statustype = '1'
                if(sessionStorage.departmentId=='1'){
                    that.selected = true
                    //管理员登录请求selected下拉框数据
                    $.ajax({
                        async:true,
                        type:'get',
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/getTopDepartment',
                        data:{},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.options = data.result
                                for(var i=0;i<data.result.length;i++){
                                    if(that.SelectionChange[0].departmentId == data.result[i].value){
                                        that.add.departmentId = data.result[i].value
                                    }
                                }
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
                this.add.ueMAC = this.SelectionChange[0].ueMAC
                this.add.authPwd = this.SelectionChange[0].authPwd
                this.add.tsbgBind = this.SelectionChange[0].tsbgBind
                this.add.nickname = this.SelectionChange[0].nickname
                this.add.remark = this.SelectionChange[0].remark
                this.add.ueIP = this.SelectionChange[0].ueIP
                this.add.bandwidth = Number(this.SelectionChange[0].bandwidth)
                this.add.allowTime = this.SelectionChange[0].allowTime
                this.tsbgMac()
                this.tsbgBindvalue = this.SelectionChange[0].tsbgBind
                if(this.SelectionChange[0].pwdType=='0'){
                    that.checked = false
                }else{
                    that.checked = true
                }
                if(this.SelectionChange[0].autoIP=='0'){
                    that.checkedtwo = false
                }else{
                    that.checkedtwo = true
                }
                
                that.Autopassword()
                that.AutoIP()
                if(this.SelectionChange[0].pwdType=='1'){
                    this.checked = true
                    $('#authPwd').attr('disabled',true)
                }
                if(this.SelectionChange[0].autoIP=='1'){
                    this.checked = true
                    $('#ueIP').attr('disabled',true)
                }
                $('#ueMAC').attr('disabled',true)
            },
            //认证用户保存
            addUser(){
                var that = this;
                //中文验证
                var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                var reg_name=/[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/
                var url = '';
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
                if(result.test(that.add.authPwd)){
                    this.$message({
                        message:  that.$t('FalseHints.TheChinesecharacters'),
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
                if(this.statustype == '0'){url = 'terminal/addUe'}
                if(this.statustype == '1'){
                    url = 'terminal/editUe';
                    data.id = that.SelectionChange[0].id
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
                $('.addUsers').attr('disabled',true)
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        $('.addUsers').attr('disabled',false)
                        if(data.errorCode=='0'){
                            if(that.statustype == '0'){
                                that.$message({
                                    message: that.$t('FalseHints.SaveSuccess'),
                                    type: 'success',
                                    showClose: true,
                                })
                            }
                            if(that.statustype == '1'){
                                that.$message({
                                    message: that.$t('FalseHints.AmendTheSuccess'),
                                    type: 'success',
                                    showClose: true,
                                })
                            }
                            $('#approvemyModal').modal('hide');
                            that.handleClick();
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //认证用户选取数据change事件
            handleSelectionChange(val){
                this.SelectionChange = val;
            },
            //认证用户导入
            renzheng(){
                var that = this
                var array = [];
                if(this.SelectionChange.length=='0'){
                    that.$message({
                        message: that.$t('equipmentUser.Pleaseselectauthenticate'),
                        type: 'error',
                        showClose: true,
                    })
                    return;
                }
                for(var i=0;i<that.SelectionChange.length;i++){
                    array.push(that.SelectionChange[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'terminal/setUeAuth',
                    data:{
                        ueIds:array.join(','),
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('equipmentUser.CertificationSuccess'),
                                type: 'success',
                                showClose: true,
                            });
                            that.handleClick();
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //自动获取密码事件
            Autopassword(){
                if(this.checked==true){
                    $('#authPwd').attr('disabled',true)
                }else{
                    $('#authPwd').attr('disabled',false)
                }
            },
            //自动获取IP事件
            AutoIP(){
                if(this.checkedtwo==true){
                    $('#ueIP').attr('disabled',true)
                }else{
                    $('#ueIP').attr('disabled',false)
                }
            },
            //认证UE
            cloudEnd(){
                var that = this;
                if(this.SelectionChange.length==0){
                    this.$message({
                        message:that.$t('equipmentUser.PleaseauthenticateUE'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#cloudEndModal').modal('show')
            },
            //认证UE确定
            addcloudEnd(){
                var that = this;
                var data = {};
                var arr = []
                if(this.cloudEndCheck==false){
                    data.isCloud = 0
                }
                if(this.cloudEndCheck==true){
                    data.isCloud = 1
                }
                for(var i=0;i<this.SelectionChange.length;i++){
                    arr.push(this.SelectionChange[i].id)
                }
                data.ids = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'terminal/editBatchUeAuth',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('FalseHints.SaveSuccess'),
                                type: 'success',
                                showClose: true,
                            })
                            $('#cloudEndModal').modal('hide')
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //所有页面搜索
            searchs(){
                var data = 'ST'
                this.handleClick(data)
            },
            //通用删除按钮
            deleteUser(){
                var that = this;
                var url = ''
                var data = {}
                if(that.delate==false){
                    that.$message({
                        message: '您没有权限',
                        type: 'error',
                        showClose: true,
                    })
                    return;
                }
                if(this.SelectionChange.length==0){
                    this.$message({
                        message: '请选择数据进行删除',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var array=[]
                for(var i=0;i<this.SelectionChange.length;i++){
                    array.push(this.SelectionChange[i].id)
                }
                if(that.activeName == '2'){url='terminal/delUe';data.ueIds = array.join(',')}
                if(that.activeName == '3'){url='terminal/delSta';data.staIds = array.join(',')}
                that.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+url,
                        data:data,
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('FalseHints.DeleteSuccess'),
                                    type: 'success',
                                    showClose: true,
                                })
                                that.handleClick();
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: that.$t('FalseHints.Undelete'),
                    });  
                })
                
            },
        },
        created(){
            var that = this;
            if(localStorage.locale=='en'){
                this.onlineoptions = [{value:'0',label:'Off-line'},{value:'1',label:'On-line'}]
                this.Authenticationoptions = [{value: '1',label: 'Certified'},{value: '0',label: 'Uncertified'}]
            }else{
                this.onlineoptions = [{value:'0',label:'离线'},{value:'1',label:'在线'}]
                this.Authenticationoptions = [{value: '1',label: '已认证'},{value: '0',label: '未认证'}]
            }
            this.handleClick()
        }
    }
</script>
<style scoped>
.required{color: red;}
.equipmentUser{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUser_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentUser_nav>i{font-size: 23px;}
.equipmentUser_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border-radius: 4px;}
.equipmentUser_main_div{position: absolute;top: 0;left: 245px;height: 42px;line-height: 42px;display: flex;}
.equipmentUser_main_div>div{margin-left: 10px;}


.equipmentUser_top{width: 100%;height: 40px;display: flex;justify-content: center;overflow: auto;}
.equipmentUser_bottom{width: 100%;height:auto;position: absolute;top:0;bottom:10px;padding: 5px;}

.equipmentUser_form{display: flex;width: 340px;margin: 0 auto 10px;}
.equipmentUser_form>span{display:inline-block;width: 180px;line-height: 34px;font-size: 15px;text-align: right;}
.equipmentUser_form>input{height: 31px;width:160px;}
.equipmentUser_form>div{height: 31px;width:160px;}

.equipmentUser_formtwo{display: flex;margin-left:5px;}
.equipmentUser_formtwo>span{line-height: 30px;width:95px;}
.equipmentUser_formtwo>input{height: 30px;width: 155px;}
.equipmentUser_formtwo>div{height: 30px;width: 140px;}
</style>
