<template>
    <div class="equipmentUser">
        <div class="equipmentUser_nav">
            设备管理<i class="iconfont icon-icon"></i>终端用户
        </div>
        <div class="equipmentUser_main">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width:100%;height:100%;position:absolute;">
                <el-tab-pane label="所有" name='1'>
                    <div class="equipmentUser_top">
                        <div class="equipmentUser_formtwo">
                            <span>连接设备MAC:</span>
                            <input v-model="search.equipmentMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入ue连接设备MAC">
                        </div>
                        <div class="equipmentUser_formtwo">
                            <span>设备MAC:</span>
                            <input v-model="search.terminalMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入ue设备MAC">
                        </div>
                        <div class="equipmentUser_formtwo">
                            <span>在线状态:</span>
                            <el-select v-model="onlinevalue" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in onlineoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <el-button @click="searchs" type="primary" size='small' style="height:30px;margin-top:3px;margin-left:5px;">搜索</el-button>
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
                            align='center'
                            label="设备名称"
                            width="160">
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
                            prop="terminalMAC"
                            label="设备MAC"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width='80'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            prop="terminalType"
                            label="终端类型"
                            align='center'
                            width="80">
                            </el-table-column>
                            <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="senderMAC"
                            label="TSBG设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="equipmentMAC"
                            label="链接设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
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
                <el-tab-pane label="认证用户" name='2'>
                    <div class="equipmentUser_top">
                        <div class="equipmentUser_formtwo">
                            <span>ue连接设备MAC:</span>
                            <input v-model="search.equipmentMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入ue连接设备MAC">
                        </div>
                        <div class="equipmentUser_formtwo">
                            <span>ue设备MAC:</span>
                            <input v-model="search.ueMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入ue设备MAC">
                        </div>
                        <div class="equipmentUser_formtwo">
                            <span>在线状态:</span>
                            <el-select v-model="onlinevalue" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in onlineoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <div class="equipmentUser_formtwo">
                            <span>认证状态:</span>
                            <el-select v-model="Authenticationvalue" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in Authenticationoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <el-button @click="searchs" type="primary" size='small' style="height:30px;margin-top:3px;margin-left:5px;">搜索</el-button>
                        <el-button v-if="addtype" @click="approve" type="primary" size='small' style="height:30px;margin-top:3px;">新增用户</el-button>
                        <el-button v-if="deletetype" @click="deleterove" type="primary" size='small' style="height:30px;margin-top:3px;">修改用户</el-button>
                        <el-button v-if="approvetype" @click="renzheng" type="primary" size='small' style="height:30px;margin-top:3px;">导入</el-button>
                    </div>
                    <div class="equipmentUser_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            border
                            stripe
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备名称"
                            width="160">
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
                            prop="ueIP"
                            label="ip地址"
                            align='center'
                            width="130">
                            </el-table-column>
                            <el-table-column
                            prop="ueMAC"
                            label="设备MAC"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="在线状态"
                            align='center'
                            width='100'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            label="认证状态"
                            align='center'
                            width='100'>
                                <template scope="scope">
                                    <span v-if="scope.row.authStatus=='1'" style='color:#00CC00;'>
                                        已认证
                                    </span>
                                    <span v-else-if="scope.row.authStatus=='0'" style='color:#FF0000;'>
                                        未认证
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="senderMAC"
                            label="TSBG设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="equipmentMAC"
                            label="链接设备"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align='center'>
                            <!-- show-overflow-tooltip -->
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="80">
                                <template scope="scope">
                                    <el-button @click="deleteUser(scope.row)" type="primary" size="small">删除</el-button>
                                </template>
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
                        <div class="equipmentUser_top">
                            <div class="equipmentUser_formtwo">
                                <span>连接设备MAC:</span>
                                <input v-model="search.equipmentMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入连接设备MAC">
                            </div>
                            <div class="equipmentUser_formtwo">
                                <span>设备MAC:</span>
                                <input v-model="search.staMAC" type="text" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入设备MAC">
                            </div>
                            <div class="equipmentUser_formtwo">
                                <span>在线状态:</span>
                                <el-select v-model="onlinevalue" size='small' clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in onlineoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>  
                            </div>
                            <el-button @click="searchs" type="primary" size='small' style="height:30px;margin-top:3px;margin-left:5px;">搜索</el-button>
                        </div>
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
                            prop="equipmentMAC"
                            label="设备MAC"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="在线状态"
                            align='center'
                            width='100'>
                                <template scope="scope">
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
                                        离线
                                    </span>
                                </template>  
                            </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="updateTime"
                            label="更新时间"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="senderMAC"
                            label="TSBG设备MAC"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="equipmentMAC"
                            label="链接设备MAC"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="80">
                                <template scope="scope">
                                    <el-button @click="deleteUser(scope.row)" type="primary" size="small">删除</el-button>
                                </template>
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
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title myModalLabel">新增用户</h4>
                        </div>
                        <div class="modal-body">
                            <div v-if="selected" class="equipmentUser_form">
                                <span><i class="required">*</i>归属部门:</span>
                                <el-select v-model="add.departmentId" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="equipmentUser_form">
                                <span><i class="required">*</i>ue设备MAC:</span>
                                <input v-model="add.ueMAC" id="ueMAC" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入ue设备MAC">
                            </div>
                            <div class="equipmentUser_form">
                                <el-checkbox v-model="checked" @change='Autopassword' style="margin-left:20px;color: #555555;">使用默认密码</el-checkbox>
                            </div>
                            <div class="equipmentUser_form">
                                <span><i class="required">*</i>认证密码:</span>
                                <input v-model="add.authPwd" id="authPwd" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入认证密码">
                            </div>
                            <div class="equipmentUser_form">
                                <span><i class="required">*</i>ue类型:</span>
                                <input v-model="add.ueType" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入ue类型">
                            </div>
                            <div class="equipmentUser_form">
                                <span><i class="required">*</i>ue昵称:</span>
                                <input v-model="add.nickname" type="text" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入ue昵称">
                            </div>
                            <div class="equipmentUser_form">
                                <el-checkbox v-model="checkedtwo" @change='AutoIP' style="margin-left:20px;color: #555555;">自动获取IP</el-checkbox>
                            </div>
                            <div class="equipmentUser_form">
                                <span>ueIP:</span>
                                <input v-model="add.ueIP" id="ueIP" type="text" maxlength="30" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入ueIP">
                            </div>
                            <div class="equipmentUser_form">
                                <span>备注信息:</span>
                                <el-input
                                type="textarea"
                                style="height:75px;"
                                placeholder="请输入备注信息"
                                v-model="add.remark">
                                </el-input>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" @click="addUser" class="btn btn-primary">保存</button>
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
                //按钮权限
                addtype:false,
                deletetype:true,
                delate:false,
                approvetype:false,
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
                onlineoptions:[{value: '1',label: '在线'},{value: '0',label: '离线'}], //在线状态
                onlinevalue:'',
                Authenticationoptions:[{value: '1',label: '已认证'},{value: '0',label: '未认证'}], //认证状态
                Authenticationvalue:'',
                search:{
                    equipmentMAC:'',
                    terminalMAC:'',
                    ueMAC:'',
                    staMAC:'',
                },

                checked:false,
                checkedtwo:false,

                //添加参数
                selected:false,
                options:[],
                add:{
                    ueMAC:'',
                    authPwd:'',
                    ueType:'',
                    nickname:'',
                    remark:'',
                    ueIP:'',
                    departmentId:'',
                },

                statustype:'0',
                SelectionChange:[], //认证用户选取的数据
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
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },200)
        },
        methods:{
            handleClick(val){
                if(val!='ST'){
                    this.onlinevalue = '';
                    this.search.equipmentMAC = '';
                    this.search.terminalMAC = '';
                    this.search.ueMAC = '';
                    this.search.staMAC = '';
                }
                var that = this;
                var authStatus = '';
                var pageIndex = '';
                var pageSize = '';
                var url = '';
                var data = {}
                if(that.activeName=='1'){
                    pageIndex=that.pageIndex;
                    pageSize=that.pageSize;
                    url='terminal/getAllTerminalList';
                    data.equipmentMAC=that.search.equipmentMAC
                    data.terminalMAC=that.search.terminalMAC
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
                    data.equipmentMAC=that.search.equipmentMAC
                    data.staMAC=that.search.staMAC
                }
                data.online = that.onlinevalue
                data.pageIndex = pageIndex
                data.pageSize = pageSize
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
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
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //所有页面条数页数选择
            SizeChange(){this.handleClick()},
            CurrentChange(){this.handleClick()},
            //认证用户页面条数页数选择
            SizeChange2(){this.handleClick()},
            CurrentChange2(){this.handleClick()},
            //注册页面条数页数事件
            SizeChange3(){this.handleClick()},
            CurrentChange3(){this.handleClick()},
            //认证用户点击添加按钮
            approve(){
                var that = this;
                $('#approvemyModal').modal('show')
                $('.myModalLabel').text('新增用户')
                this.statustype = '0'
                this.checked = false
                this.checkedtwo = false
                $('#authPwd').attr('disabled',false)
                $('#ueIP').attr('disabled',false)
                this.add.ueMAC = ''
                this.add.authPwd = ''
                this.add.ueType = ''
                this.add.nickname = ''
                this.add.remark = ''
                this.add.ueIP = ''
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
                                that.options = data.result[0].children
                                that.add.departmentId = data.result[0].children[0].value
                            }else{
                                that.errorCode(data.errorCode)
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
                $('.myModalLabel').text('修改用户')
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
                                that.options = data.result[0].children
                                for(var i=0;i<data.result[0].children.length;i++){
                                    if(that.SelectionChange[0].departmentId == data.result[0].children[i].value){
                                        that.add.departmentId = data.result[0].children[i].value
                                    }
                                }
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                this.add.ueMAC = this.SelectionChange[0].ueMAC
                this.add.authPwd = this.SelectionChange[0].authPwd
                this.add.ueType = this.SelectionChange[0].ueType
                this.add.nickname = this.SelectionChange[0].nickname
                this.add.remark = this.SelectionChange[0].remark
                this.add.ueIP = this.SelectionChange[0].ueIP
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
                var url = '';
                var data = {
                    departmentId:that.add.departmentId,
                    ueMAC:that.add.ueMAC,
                    authPwd:that.add.authPwd,
                    ueType:that.add.ueType,
                    nickname:that.add.nickname,
                    remark:that.add.remark,
                    ueIP:that.add.ueIP
                };
                if(that.add.ueMAC==''||that.add.ueType==''||that.add.nickname==''){
                    that.$message({
                        message: '温馨提示:必填数据不能为空',
                        type: 'error',
                        showClose: true,
                    })
                    return;
                }
                if(this.checked == false){
                    data.pwdType = '0'
                    if(that.add.authPwd==''){
                        that.$message({
                            message: '温馨提示:认证密码不能为空',
                            type: 'error',
                            showClose: true,
                        })
                        return;  
                    }
                }else{data.pwdType = '1'}
                if(this.checkedtwo == false){data.autoIP = '0'}else{data.autoIP = '1'}
                
                if(this.statustype == '0'){url = 'terminal/addUe'}
                if(this.statustype == '1'){
                    url = 'terminal/editUe';
                    data.id = that.SelectionChange[0].id
                }

                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.statustype = '0'){
                                that.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    showClose: true,
                                })
                            }
                            if(that.statustype = '1'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                })
                            }
                            $('#approvemyModal').modal('hide');
                            that.handleClick();
                        }else{
                            that.errorCode(data.errorCode)
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
                        message: '请选取数据进行认证',
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
                                message: '认证成功',
                                type: 'success',
                                showClose: true,
                            });
                            that.handleClick();
                        }else{
                            that.errorCode(data.errorCode)
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
            //所有页面搜索
            searchs(){
                var data = 'ST'
                this.handleClick(data)
            },
            //通用删除按钮
            deleteUser(val){
                var that = this;
                if(that.delate==false){
                    that.$message({
                        message: '您没有权限',
                        type: 'error',
                        showClose: true,
                    })
                    return;
                }
                that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'terminal/delUe',
                        data:{
                            ueIds:val.id,
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    showClose: true,
                                })
                                that.handleClick();
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
                })
                
            },
        },
        created(){
            var that = this;
            this.handleClick()
        }
    }
</script>
<style scoped>
.required{color: red;}
.equipmentUser{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUser_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
equipmentUser_nav>i{font-size: 23px;}
.equipmentUser_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentUser_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.equipmentUser_bottom{width: 100%;height:auto;position: absolute;top:39px;bottom:10px;}

.equipmentUser_form{display: flex;width: 270px;margin: 0 auto 10px;}
.equipmentUser_form>span{display:inline-block;width: 105px;line-height: 34px;font-size: 15px;}
.equipmentUser_form>input{height: 31px;width:69%;}
.equipmentUser_form>div{height: 31px;width:69%;}

.equipmentUser_formtwo{display: flex;margin-top: 4px;margin-left:5px;}
.equipmentUser_formtwo>span{line-height: 30px;}
.equipmentUser_formtwo>input{height: 30px;width: 150px;}
.equipmentUser_formtwo>div{height: 30px;width: 140px;}
</style>
