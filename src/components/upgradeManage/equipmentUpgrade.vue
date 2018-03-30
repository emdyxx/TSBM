<template>
    <div class="equipmentUpgrade">
        <div class="equipmentUpgrade_nav">
            设备管理<i class="iconfont icon-icon"></i>设备升级包
        </div>
        <div class="equipmentUpgrade_main">
            <div class="equipmentUpgrade_top">
                <el-button v-if="uploading" type="primary" icon="upload2" size="small" @click="upload">升级包上传</el-button>
                <el-button v-if="revamp" type="primary" icon='edit' size="small" @click="upgradepatchamend">升级包分组修改</el-button>
                <el-button v-if="remove" type="primary" icon='delete2' size="small" @click="upgradepatchdelete">删除升级包</el-button>
            </div>
            <!--上传模态框-->
            <div class="modal fade" id="upgrademyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:600px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">上传升级包</h4>
                        </div>
                        <div class="modal-body">
                            <div class="upload_div" v-if="uploadtype==false">
                                <div v-if='selected'>
                                    <span>选择分组:</span>
                                    <el-cascader
                                        :options="optionsvalue"
                                        v-model.lazy="selectedOptions"
                                        size='small'
                                        style="width:150px;">
                                    </el-cascader>
                                </div> 
                                <div>
                                    <span>文件名称:</span>
                                    <input type="file" ref="imgs" name="file" id="file_name">
                                </div> 
                                <div v-if="percentageType" style="padding-left:30px">
                                    <span style="width: 40px;margin-top: -6px;">进度:</span>
                                    <el-progress :percentage='percentage'></el-progress>
                                </div>
                            </div>
                            <div class="upload_div" v-if="uploadtype">
                                <div>
                                    <span>文件名称:</span>
                                    <input type="text" v-model.lazy="fileName" disabled>
                                </div> 
                                <div>
                                    <span>软件版本号:</span>
                                    <input type="text" v-model.lazy="softwareVer" disabled>
                                </div> 
                                <div>
                                    <span>硬件版本号:</span>
                                    <input type="text" v-model.lazy="hardwareVer" disabled>
                                </div> 
                                <div>
                                    <span>MD5:</span>
                                    <input type="text" v-model.lazy="md5" disabled>
                                </div> 
                                <div>
                                    <span>升级包类型:</span>
                                    <input type="text" v-model.lazy="upgradeType" disabled>
                                </div> 
                                <div>
                                    <span>适用范围</span>
                                    <el-select size="small" style="width:150px;" v-model="typetwo" @change="uploadscope" placeholder="请选择">
                                        <el-option
                                        v-for="item in optionsthree"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div v-if="typedata=='0'" style="flex-direction: column;">
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData5"
                                        border
                                        style="width:450px;"
                                        @selection-change="handleSelectionChangeTwo">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickname"
                                        align='center'
                                        label="设备昵称"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC"
                                        align='center'
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="hardwareVersion"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block" style="width:100%;overflow:auto;">
                                        <el-pagination
                                        @size-change="handleSizeChangeTwo"
                                        @current-change="handleCurrentChangeTwo"
                                        :current-page="currentPage5"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="sizesTwo"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalTwo">
                                        </el-pagination>
                                    </div>
                                </div>
                                <div v-if="typedata=='1'">
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData6"
                                        border
                                        style="width:450px;"
                                        @selection-change="handleSelectionChangethree">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="groupName"
                                        align='center'
                                        label="分组名称"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div>
                                    <span>升级包状态:</span>
                                    <el-select size="small" v-model.lazy="value" style="width:150px;" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span>描述:</span>
                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入描述内容"
                                    v-model.lazy="textarea">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-if="uploadtype===false" @click="nextstep" type="button" class="btn btn-primary">下一步</button>
                            <button v-if="uploadtype" @click="uploadsave" type="button" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="equipmentUpgrade_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="equipmentUpgrade_bottom_top">
                    <div class="equipmentUpgrade_formtwo">
                        <span>文件名称:</span>
                        <input type="text" v-model.lazy="searchfilename" maxlength="40" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="equipmentUpgrade_formtwo">
                        <span>软件版本号:</span>
                        <input type="text" v-model.lazy="softwareversion" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="equipmentUpgrade_formtwo">
                        <span>硬件版本号:</span>
                        <input type="text" v-model.lazy="hardwareversion" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="equipmentUpgrade_formtwo">
                        <span>升级包状态:</span>
                        <el-select v-model.lazy="value4" size='small' clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" @click="search" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                </div>
                <div class="equipmentUpgrade_bottom_bottom">
                    <el-table
                        ref="multipleTable"
                        :data="tableData4"
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
                        prop="fileName"
                        align='center'
                        label="升级包名称"
                        width="230">
                        </el-table-column>
                        <el-table-column
                        prop="softwareVer"
                        label="软件版本号"
                        align='center'
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="md5"
                        label="MD5"
                        align='center'
                        width="320">
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="组织"
                        align='center'
                        width="140">
                        </el-table-column>
                        <el-table-column
                        prop="hardwareVer"
                        label="硬件版本号"
                        align='center'
                        width="140">
                        </el-table-column>
                        <el-table-column
                        label="适用范围"
                        align='center'
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.upgradeOrder=='0'">指定设备</span>
                                <span v-if="scope.row.upgradeOrder=='1'">指定设备分组</span>
                                <span v-if="scope.row.upgradeOrder=='2'">指定设备型号</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        align='center'
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.status==0" style="color:#20A0FF">已启用</span>
                                <span v-if="scope.row.status==1" style="color:#FF4949">已禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="summary"
                        label="描述"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        align='center'
                        width="90">
                            <template scope="scope">
                                <span v-if="scope.row.status==0">
                                    <el-button type="danger" @click="forbidden(scope.row)" size="small">禁用</el-button>
                                </span>
                                <span v-if="scope.row.status==1">
                                    <el-button type="primary" @click="startusing(scope.row)" size="small">启用</el-button>
                                </span>   
                            </template>
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
        name: 'equipmentUpgrade',
        data () {
            return {
                //按钮权限
                uploading:false,
                revamp:false,
                remove:false,
                operationtype:false,
                serverurl:localStorage.serverurl,
                loading:false,
                tableData4:[],
                sites:[],
                sizes:10,
                currentPage4:1,
                total:100,
                input:'',
                options:[{value:1,label:'禁用'},{value:0,label:'启用'}],
                value:0,
                optionstwo:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                valuetwo:'',
                optionsthree:[{value:0,label:'指定设备'},{value:1,label:'指定分组'},{value:2,label:'指定型号'}],
                tableData5:[],
                sitesTwo:[],
                pageSize:'',
                pageIndex:'',
                currentPage5:1,//
                sizesTwo:10,  //
                totalTwo:50, //
                selected:false, //上传升级包管理员选择分组
                optionsvalue:[],//分组数据
                selectedOptions:[],//选中分组数据
                type:'', //升级包类型
                typetwo:2, //升级包适用范围
                textarea:'', //描述
                typedata:'', //升级包适用范围是否显示
                percentageType:false, //进度条显示
                percentage:0, //进度条,
                uploadtype:false,  //上传成功跳转下一页
                fileName:'',  //文件名称
                softwareVer:'',  //软件版本号
                hardwareVer:'',  //硬件版本号
                md5:'',  //md5
                upgradeType:'',  //升级包类型
                filePath:'',  //文件存放路径
                fileUrl:'',  //文件下载url
                departmentId:'',
                searchfilename:'', //检索条件
                softwareversion:'',
                hardwareversion:'',
                value4:'',
                tableData6:[],
                sitesthr:[],
                opctions:'',
                upgradeFileId:'',
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
                                if(data.result[i].code=='uploadFirmware'){
                                    that.uploading = true
                                }
                                if(data.result[i].code=='editFirmware'){
                                    that.revamp = true
                                }
                                if(data.result[i].code=='delFirmware'){
                                    that.remove = true
                                }
                                if(data.result[i].code=='setFirmwareStatus'){
                                    that.operationtype = true
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
            //列表选中行的change事件
            handleSelectionChange(val){
                this.sites = val
            },
            //选择条数事件
            handleSizeChange(val){
                sessionStorage.pageSize = val
                this.sizes = val
                this.ready()
            },
            //选择页数事件
            handleCurrentChange(val){
                sessionStorage.pageIndex = val
                this.ready()
            },
            //分组升级列表选择数据
            handleSelectionChangethree(val){
                if(val.length>=2){
                    this.$message({
                        message:'只能选取一个分组',
                        type:'error'
                    })
                    return;
                }
                this.sitesthr = val
            },
            //升级包适用范围change事件
            uploadscope(val){
                var that = this;
                this.typetwo = val;
                this.typedata = '';
                var upgradeTypes = '';
                if(that.upgradeType == 'tsbg'){
                    upgradeTypes = 0
                }
                if(that.upgradeType == 'tsbc'){
                    upgradeTypes = 1
                }
                if(that.upgradeType == 'tsba'){
                    upgradeTypes = 2
                }
                if(val=='0'){
                    this.sitesthr = []
                    $.ajax({
                        type:'get',
                        async:true,
                        url:that.serverurl+'equipment/getEquipmentList',
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        data:{
                            pageIndex:1,
                            pageSize:10,
                            model:that.hardwareVer,
                            departmentId:that.departmentId,
                            type:upgradeTypes
                        },
                        success:function(data){
                            that.tableData5 = data.rows
                            that.totalTwo = data.total
                        }
                    })
                    this.typedata = '0';
                }  
                if(val=='1'){
                    that.sitesTwo = [];
                    $.ajax({
                        type:'get',
                        async:true,
                        url:that.serverurl+'equipment/getGroupList',
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        data:{
                            departmentId:that.departmentId,
                            model:that.hardwareVer
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.tableData6 = data.result
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                    this.typedata = '1';
                }
                if(val=='2'){
                    this.sitesthr = []
                    that.sitesTwo = []
                    this.typedata = '2';
                }
            },
            //模态框选中行的change事件
            handleSelectionChangeTwo(val){
                this.sitesTwo = val
            },
            //模态框选择条数事件
            handleSizeChangeTwo(val){
                var that = this;
                this.sizesTwo = val
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+'equipment/getEquipmentList',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.currentPage5,
                        pageSize:that.sizesTwo,
                        model:that.hardwareVer,
                        departmentId:that.departmentId,
                    },
                    success:function(data){
                        that.tableData5 = data.rows
                        that.totalTwo = data.total
                    }
                })
            },
            //模态框选择页数事件
            handleCurrentChangeTwo(val){
                var that = this;
                this.currentPage5 = val
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+'equipment/getEquipmentList',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.currentPage5,
                        pageSize:that.sizesTwo,
                        model:that.hardwareVer,
                        departmentId:that.departmentId,
                    },
                    success:function(data){
                        that.tableData5 = data.rows
                        that.totalTwo = data.total
                    }
                })
            },
            //点击升级包上传
            upload(){
                var that = this
                $('#upgrademyModal').modal('show')
                this.opctions = '0'
                that.uploadtype = false;
                if(sessionStorage.departmentId=='1'){
                    this.selected = true
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
                                that.optionsvalue = data.result[0].children
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }else{
                    this.selected = false
                }
            },
            //升级包上传点击下一步
            nextstep(){
                var that = this
                if(sessionStorage.departmentId=='1'){
                    if(this.selectedOptions.length<1){
                        that.$message({
                            type: 'error',
                            message: '管理员需要选择分组才能进行上传!'
                        });
                        return;
                    }
                }
                if(that.$refs.imgs.files[0]==''||that.$refs.imgs.files[0]==undefined){
                    that.$message({
                        type: 'error',
                        message: '升级文件包不能为空!'
                    });
                    return;
                }
                that.percentageType = true;
                setTimeout(function(){that.percentage=65},900)
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                fd.append("file", that.$refs.imgs.files[0]);
                if(sessionStorage.departmentId=='1'){
                    fd.append("departmentId", that.selectedOptions[0]);
                }
                $.ajax({
                    url: that.serverurl+'upgrade/uploadUpgradeFile',
                    type: 'POST',
                    cache: false,
                    data: fd,
                    dataType:'json',
                    processData: false,
                    xhrFields:{withCredentials:true},
                    contentType: false
                }).done(function(data) {
                    if(data.errorCode=='0'){
                        that.percentage = 100  //进度条
                        that.$message({
                            message: '上传成功',
                            type:'success',
                            showClose: true,
                        });
                        that.percentageType = false;
                        that.uploadtype = data.result;
                        that.departmentId = data.result.departmentId
                        that.uploadtype = true;
                        that.fileName = data.result.fileName;
                        that.softwareVer = data.result.softwareVer;
                        that.hardwareVer = data.result.hardwareVer;
                        that.md5 = data.result.md5;
                        that.filePath = data.result.filePath;
                        that.fileUrl = data.result.fileUrl;
                        if(data.result.upgradeType=='0'){
                            that.upgradeType = 'tsbg'
                        }
                        if(data.result.upgradeType=='1'){
                            that.upgradeType = 'tsbc'
                        }
                        if(data.result.upgradeType=='2'){
                            that.upgradeType = 'tsba'
                        }
                        that.percentage = 0  //进度条
                    }else{
                        that.percentageType = false;
                        that.percentage = 0  //进度条
                        that.errorCode(data.errorCode)
                    }
                }).fail(function(res) {

                });
            },
            //升级包上传点击保存
            uploadsave(){
                var that = this;
                var upgradeType='';
                var equipmentIds=[];
                var groupids = []
                if(that.upgradeType=='tsbg'){
                    upgradeType='0'
                }
                if(that.upgradeType=='tsbc'){
                    upgradeType='1'
                }
                if(that.upgradeType=='tsba'){
                    upgradeType='2'
                }
                for(var i=0;i<that.sitesTwo.length;i++){
                    equipmentIds.push(that.sitesTwo[i].id)
                }
                for(var i=0;i<that.sitesthr.length;i++){
                    groupids.push(that.sitesthr[i].id)
                }
                if(this.opctions=='0'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'upgrade/saveUpgradeFile',
                        data:{
                            departmentId:that.departmentId,
                            fileName:that.fileName,
                            filePath:that.filePath,
                            fileUrl:that.fileUrl,
                            upgradeType:upgradeType,
                            upgradeOrder:that.typetwo,
                            md5:that.md5,
                            softwareVer:that.softwareVer,
                            hardwareVer:that.hardwareVer,
                            status:that.value,
                            summary:that.textarea,
                            equipmentIds:equipmentIds.join(','),
                            groupids:groupids.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '保存成功',
                                    type:'success',
                                })
                                $('#upgrademyModal').modal('hide');
                                that.ready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                if(this.opctions=='1'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'upgrade/editUpgradeFileInfo',
                        data:{  
                            upgradeFileId:that.upgradeFileId,
                            upgradeOrder:that.typetwo,
                            equipmentIds:equipmentIds.join(','),
                            groupids:groupids.join(','),
                            summary:that.textarea,
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '保存成功',
                                    type:'success',
                                })
                                $('#upgrademyModal').modal('hide');
                                that.ready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
            },
            //点击升级包分组修改
            upgradepatchamend(){
                var that = this
                if(this.sites.length=='0'){
                    that.$message({
                        message: '请选择升级包进行修改',
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length>1){
                    that.$message({
                        message: '请选择单个升级包进行修改',
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length=='1'){
                    that.opctions = '1'
                    that.uploadtype = true;
                    that.fileName = that.sites[0].fileName
                    that.softwareVer = that.sites[0].softwareVer
                    that.hardwareVer = that.sites[0].hardwareVer
                    that.md5 = that.sites[0].md5
                    that.value = that.sites[0].status
                    that.textarea = that.sites[0].summary
                    if(that.sites[0].upgradeType=='0'){
                        that.upgradeType = 'tsbg'
                    }
                    if(that.sites[0].upgradeType=='1'){
                        that.upgradeType = 'tsbc'
                    }
                    if(that.sites[0].upgradeType=='2'){
                        that.upgradeType = 'tsba'
                    }
                    that.typetwo = that.sites[0].upgradeOrder
                    that.upgradeFileId = that.sites[0].id
                    $('#upgrademyModal').modal('show')
                }
            },
            //删除升级包
            upgradepatchdelete(){
                var that = this
                if(this.sites.length=='0'){
                    that.$message({
                        message: '请选择升级包进行删除',
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length>1){
                    that.$message({
                        message: '请选择单个升级包进行删除',
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length=='1'){
                    that.$confirm('此操作将删除升级包信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type:'post',
                            async:true,
                            dataType:'json',
                            xhrFields:{withCredentials:true},
                            url:that.serverurl+'upgrade/delUpgradeFile',
                            data:{
                                upgradeFileId:that.sites[0].id
                            },
                            success:function(data){
                                if(data.errorCode=='0'){
                                    that.$message({
                                        message:'删除成功',
                                        type:'success'
                                    })
                                    that.ready()
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
                    });
                    
                }
            },

            //列表状态操作
            startusing(val){
                var that = this
                if(that.operationtype==false){
                    that.$message({
                        message: '您暂无此权限',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                //启用
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/setUpgradeFileStatus',
                    data:{
                        upgradeFileId:val.id,
                        status:0
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '升级包启用成功',
                                type:'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            forbidden(val){
                var that = this
                if(that.operationtype==false){
                    that.$message({
                        message: '您暂无此权限',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                //禁用
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/setUpgradeFileStatus',
                    data:{
                        upgradeFileId:val.id,
                        status:1
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '升级包禁用成功',
                                type:'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //页面数据渲染
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/upgradeFileList',
                    data:{
                        pageIndex:sessionStorage.pageIndex,
                        pageSize:sessionStorage.pageSize,
                        fileName:that.searchfilename,
                        softwareVer:that.softwareversion,
                        hardwareVer:that.hardwareversion,
                        status:that.value4
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //页面数据搜索
            search(){
                this.ready()
            }
        },
        created(){
            var that = this;
            sessionStorage.pageIndex = 1
            sessionStorage.pageSize = 10
            this.ready();
        }
    }
</script>
<style scoped>
.equipmentUpgrade{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUpgrade_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentUpgrade_nav>i{font-size: 23px;}
.equipmentUpgrade_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentUpgrade_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.equipmentUpgrade_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;}
.equipmentUpgrade_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.equipmentUpgrade_bottom_top>div{display: flex;margin-top: 4px;}
.equipmentUpgrade_bottom_top>div>span{width: 40%;line-height: 30px;}
.equipmentUpgrade_bottom_top>div>input{height: 30px;width: 121px;}
.equipmentUpgrade_bottom_top>div>div{height: 30px;width: 140px;}
.equipmentUpgrade_bottom_bottom{position: absolute;top:40px;bottom: 0;width: 100%;padding: 10px;}
.upload_div{width: 450px;margin:0 auto;}
.upload_div>div{display: flex;margin-bottom: 5px;}
.upload_div>div>span{display:inline-block;line-height: 30px;width:35%;}
.upload_div>div>div{width: 75%;}
.upload_div>div>input{height: 26px;}
</style>          