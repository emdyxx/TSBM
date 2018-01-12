<template>
    <div class="userManage">
        <div class="userManage_nav">
            系统管理<i class="iconfont icon-icon"></i>用户管理
        </div>
        <div class="userManage_main">
            <div class="userManage_top">
                <el-button v-if='add' type="primary" icon="plus " size="small" @click="userManageAdd">添加</el-button>
                <el-button v-if='remove' type="primary" icon="edit" size="small" @click="userManageRevamp">修改</el-button>
                <el-button v-if='delate' type="primary" icon="delete" size="small" @click="userManageDelete">删除</el-button>
            </div>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="userManageAddRevamp" style="text-align: left;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="userManagemyModalLabel">添加用户</h4>
                        </div>
                        <div class="modal-body">
                            <div class="userManage_form">
                                <span><i class="required">*</i>用户名:</span>
                                <input type="text" v-model="userManageUsername" id="userManageUsername" maxlength="10" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>密码:</span>
                                <input type="text" v-model="userManagePassword" id="userManagePasswordture" maxlength="10" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入密码">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>姓名:</span>
                                <input type="text" v-model="userManageName" maxlength="10" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入姓名">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>性别:</span>
                                <el-radio-group v-model="radios">
                                    <el-radio class="radio" :label="0" style="width:30%;">男</el-radio>
                                    <el-radio class="radio" :label="1" style="margin-top:10px;width:30%;">女</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>电话:</span>
                                <input type="text" v-model="userManagePhone" maxlength="20" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入电话">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>邮箱:</span>
                                <input type="text" v-model="userManageEmail" maxlength="25" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入邮箱">
                            </div>
                            <div class="userManage_form">
                                <span style="width:56px;"><i class="required">*</i>分组:</span>
                                <!-- v-model="userManageGrouping" -->
                                <div>
                                    <el-cascader
                                        :options="options"
                                        @change="handleChange"
                                        change-on-select
                                        v-model="selectedOptions3"
                                        size='small'>
                                    </el-cascader>
                                </div>
                            </div>
                            <div class="userManage_form">
                                <!-- <span style="width:56px;">角色</span>
                                <div>
                                    <el-cascader
                                        :options="optionstwo"
                                        :props = 'props'
                                        @change="handletwoChange"
                                        change-on-select
                                        v-model="selectedOptions4"
                                        size='small'>
                                    </el-cascader>
                                </div> -->
                                <span style="width:56px;"><i class="required">*</i>权限</span>
                                <el-radio-group v-model="radio2">
                                    <el-radio class="radio" :label="0">全部权限</el-radio>
                                    <el-radio class="radio" :label="1">只读权限</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="addRelaSubmit">提交更改</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="userManage_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="userManage_bottom_top">
                    <div class="userManage_formtwo">
                        <span>用户名:</span>
                        <input type="text" v-model="username"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="userManage_formtwo">
                        <span>姓名:</span>
                        <input type="text" v-model="fullName"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户姓名">
                    </div>
                    <div class="userManage_formtwo">
                        <span>部门:</span>
                        <el-cascader
                            :options="options"
                            @change="searchChange"
                            change-on-select
                            size='small'
                            clearable
                            style="height:30px;width:126px;">
                        </el-cascader>
                    </div>
                    <el-button type="primary" icon="search" @click="userSearch" style="height:30px;" size='small'>搜索</el-button>
                </div> 
                <div class="userManage_bottom_bottom">
                    <el-table
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
                username:'',
                fullName:'',
                departmentId:'',
                roleId:'',
                loading:false,
                total:300,
                sizes:10,
                currentPage4:1,
                tableData3: [],
                sites:[],
                serverurl:localStorage.serverurl,
                userManageUsername:'',
                userManagePassword:'',
                userManageName:'',
                radios: 0,
                userManagePhone:'',
                userManageEmail:'',
                options: [], //分组数据
                optionstwo:[], //角色数据
                selectedOptions3:[], //分组默认值
                radio2:0,//权限
                // selectedOptions4:[], //角色默认值
                opinion:'',
                add:false,
                remove:false,
                delate:false,
                props: {
                    value:'id',
                    label:'roleName'
                }
            }
        },
        mounted(){
            var that = this;
            setTimeout(function(){
                console.log(sessionStorage.menuId)
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
                                if(data.result[i].code=='addUser'){
                                    that.add = true
                                }
                                if(data.result[i].code=='editUser'){
                                    that.remove = true
                                }
                                if(data.result[i].code=='delUser'){
                                    that.delate = true
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
            //搜索
            userSearch(){
                this.ready()
            },
            //搜索部门change事件
            searchChange(val){
                if(val.length==0){
                    this.departmentId = ''
                }
                if(val.length==1){
                    this.departmentId = val[0]
                }
                if(val.length==2){
                    this.departmentId = val[1]
                }
                if(val.length==3){
                    this.departmentId = val[2]
                }
            },
            //选中行的change事件
            handleSelectionChange(val){
                this.sites = val
            },
            //选择条数事件
            handleSizeChange(val) {
                sessionStorage.pageSize = val
                this.sizes = val
                this.ready()
            },
            //选择页数事件
            handleCurrentChange(val) {
                sessionStorage.pageIndex = val
                this.ready()
            },
            //加载页面数据
            ready(){
                var that = this;
                that.loading = true;
                var pageSize='';
                var pageIndex='';
                if(sessionStorage.pageSize==''||sessionStorage.pageSize==undefined){
                    pageSize = '10'
                }else{
                    pageSize = sessionStorage.pageSize
                }
                if(sessionStorage.pageIndex==''||sessionStorage.pageIndex==undefined){
                    pageIndex = '1'
                }else{
                    pageIndex = sessionStorage.pageIndex
                }
                //请求列表数据
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'user/getUserList',
                    data:{
                        pageIndex:pageIndex,
                        pageSize:pageSize,
                        username:that.username,
                        fullName:that.fullName,
                        departmentId:that.departmentId,
                        roleId:that.roleId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                            that.currentPage4 = Number(sessionStorage.pageIndex)
                            that.loading = false;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //添加修改获取tree树请求
            tree(){
                var that= this;
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/getDepartmentTree',
                    data:{},
                    success:function(data){
                        that.options = data.result
                        if(that.opinion == '2'){
                            that.selectedOptions3=[];
                            that.selectedOptions3.push('1')
                            for(var i=0;i<that.options[0].children.length;i++){
                                if(that.options[0].children[i].value==that.sites[0].departmentId){
                                    that.selectedOptions3.push(that.options[0].children[i].value)
                                }
                            }
                        }
                    }
                })
            },
            //添加
            userManageAdd(){
                var that= this;
                $('#userManageAddRevamp').modal('show');
                $('#userManagemyModalLabel').text('添加用户');
                $('#userManagePasswordture').val()
                $('#userManageUsername').attr('disabled',false)
                $('#userManagePasswordture').attr('disabled',false)
                this.userManageUsername=''
                this.userManagePassword=''
                this.userManageName=''
                this.userManagePhone=''
                this.userManageEmail=''
                this.opinion = '1'
                this.selectedOptions3=[];
                this.tree()
            },
            //添加修改提交
            addRelaSubmit(){
                var that= this
                //中文验证
                var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                //手机号码验证
                var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
                //邮箱验证
                var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                var departmentId = '';
                if(this.userManageUsername==''||this.userManagePassword==''||this.userManageName==''||this.userManagePhone==''||this.userManageEmail==''){
                    that.$message({
                        message: '必填字段不能为空',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(result.test(this.userManagePassword)){
                    that.$message({
                        message: '密码字段不能为中文',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!phone.test(this.userManagePhone)){
                    that.$message({
                        message: '电话不符合格式',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!email.test(this.userManageEmail)){
                    that.$message({
                        message: '邮箱不符合格式',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                
                if(that.selectedOptions3.length==0){
                    that.$message({
                        message: '请选择分组',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(that.selectedOptions3.length==1){
                    departmentId = that.selectedOptions3[0]
                }
                if(that.selectedOptions3.length==2){
                    departmentId = that.selectedOptions3[1]
                }
                if(that.selectedOptions3.length==3){
                    departmentId = that.selectedOptions3[2]
                }
                //opinion位1则为添加,为2则为修改
                if(this.opinion=='1'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'user/addUser',
                        data:{
                            username:that.userManageUsername,
                            userPwd:that.userManagePassword,
                            fullName:that.userManageName,
                            sex:that.radio,
                            mobile:that.userManagePhone,
                            email:that.userManageEmail,
                            departmentId:departmentId,
                            // roleId:that.selectedOptions4[0]
                            privilegeType:that.radio2
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#userManageAddRevamp').modal('hide');
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data.errorCode)
                            }
                            
                        }
                    })
                }
                if(this.opinion=='2'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'user/editUser',
                        data:{
                            id:that.sites[0].id,
                            username:that.userManageUsername,
                            userPwd:'',
                            fullName:that.userManageName,
                            sex:that.radios,
                            mobile:that.userManagePhone,
                            email:that.userManageEmail,
                            departmentId:departmentId,
                            // roleId:that.selectedOptions4[0]
                            privilegeType:that.radio2
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#userManageAddRevamp').modal('hide');
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
            },
            //修改
            userManageRevamp(){
                var that= this;
                if(that.sites.length==0||that.sites.length>=2){
                    that.$message({
                        message: '请选择一条数据进行修改',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#userManageAddRevamp').modal('show');
                $('#userManagemyModalLabel').text('修改用户')
                this.opinion = '2'   
                this.userManageUsername=that.sites[0].username
                this.userManagePassword='******'
                $('#userManageUsername').attr('disabled',true)
                $('#userManagePasswordture').attr('disabled',true)
                this.userManageName=that.sites[0].fullName
                this.radios = that.sites[0].sex
                this.userManagePhone=that.sites[0].mobile
                this.userManageEmail=that.sites[0].email
                this.radio2 = that.sites[0].privilegeType
                this.tree()
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'role/getRoleByDepartmnet',
                    data:{
                        departmentId:that.sites[0].departmentId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.optionstwo = data.result
                            that.selectedOptions4 = []
                            that.selectedOptions4.push(that.sites[0].roleId)
                        }else{
                            that.errorCode(data.errorCode)
                        }
                        
                    }
                })
            },
            //删除
            userManageDelete(){
                var that= this;
                if(that.sites.length==0){
                    that.$message({
                        message: '请选择至少一条数据进行删除',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var userIds = [];
                for(var i=0;i<that.sites.length;i++){
                    userIds.push(that.sites[i].id)
                }
                that.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'user/delUser',
                        data:{
                            userIds:userIds.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                that.ready()
                                return;
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
            },
            //分组弹出层下拉框change事件
            handleChange(value) {
                var that = this
                this.selectedOptions3=value
                var data={}
                if(value.length=='1'){
                    data = {departmentId:value[0]};
                }
                if(value.length=='2'){
                    data = {departmentId:value[1]};
                }
                if(value.length=='3'){
                    data = {departmentId:value[2]};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    a = {departmentId:value[2]}
                }
                //角色请求
                // $.ajax({
                //     type:'get',
                //     async:true,
                //     dataType:'json',
                //     xhrFields:{withCredentials:true},
                //     url:that.serverurl+'role/getRoleByDepartmnet',
                //     data:data,
                //     success:function(data){
                //         if(data.errorCode=='0'){
                //             that.optionstwo = data.result
                //         }else{
                //             that.errorCode(data.errorCode)
                //         }
                //     }
                // })
            },
        },
        created(){
            this.tree()
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.userManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.userManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.userManage_nav>i{font-size: 23px;}
.userManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.userManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}

.userManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.userManage_form{display: flex;width: 250px;margin: 0 auto 10px;}
.userManage_form>span{width: 75px;line-height: 34px;font-size: 15px;}
.userManage_form>input{height: 31px;}

.userManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.userManage_bottom_bottom{height:80%;}
.userManage_formtwo{display: flex;margin:0 10px;}
.userManage_formtwo>span{line-height: 30px;font-size: 15px;}
.userManage_formtwo>input{width: 126px;height: 30px;}
</style>