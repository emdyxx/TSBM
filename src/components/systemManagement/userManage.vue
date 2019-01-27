<template>
    <div class="userManage">
        <!-- <div class="userManage_nav">
            {{$t('userManage.SystemManagement')}}<i class="iconfont icon-icon"></i>{{$t('userManage.UserManagement')}}
        </div> -->
        <div class="userManage_main">
            <div class="userManage_top">
                <el-button v-if='add' type="primary" icon="plus " size="small" @click="userManageAdd">{{$t('userManage.Addto')}}</el-button>
                <el-button v-if='remove' type="primary" icon="edit" size="small" @click="userManageRevamp">{{$t('userManage.Modify')}}</el-button>
                <el-button v-if='delate' type="primary" icon="delete" size="small" @click="userManageDelete">{{$t('userManage.Delete')}}</el-button>
                <div class="userManage_top_div">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="userSearch"
                        style="width:150px;">
                    </el-input>
                    <span style="display:inline-block;width:45px;margin-left:10px;">{{$t('userManage.organization')}}:</span>
                    <el-cascader
                        :options="optionssearch"
                        @change="searchChange"
                        :show-all-levels="false"
                        change-on-select
                        size='small'
                        clearable
                        style="height:30px;width:145px;">
                    </el-cascader>
                </div>
            </div>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="userManageAddRevamp" style="text-align: left;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 v-if="opinion=='1'" class="modal-title">{{$t('userManage.AddUsers')}}</h4>
                            <h4 v-if="opinion=='2'" class="modal-title">{{$t('userManage.ModifyTheUser')}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="userManage_form">
                                <span><i class="required">*</i>{{$t('userManage.UserName')}}:</span>
                                <input type="text" v-model.lazy="userManageUsername" id="userManageUsername" maxlength="30" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'').replace(.replace(/^[\u4E00-\u9FA5]{1,10}$/,''),'')" :placeholder="$t('userManage.EnterOneUserName')">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>{{$t('userManage.Password')}}:</span>
                                <input type="text" v-model.lazy="userManagePassword" id="userManagePasswordture" maxlength="20" minlength="3" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('userManage.PleaseInputAPassword')">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>{{$t('userManage.FullName')}}:</span>
                                <input type="text" v-model.lazy="userManageName" maxlength="20" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('userManage.PleaseInputYouName')">
                            </div>
                            <div class="userManage_form">
                                <span style="width:110px;"><i class="required">*</i>{{$t('userManage.Sex')}}:</span>
                                <el-radio-group v-model.lazy="radios">
                                    <el-radio class="radio" :label="0" style="width:30%;">{{$t('userManage.male')}}</el-radio>
                                    <el-radio class="radio" :label="1" style="margin-top:10px;width:30%;">{{$t('userManage.female')}}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>{{$t('userManage.Telephone')}}:</span>
                                <input type="text" v-model.lazy="userManagePhone" maxlength="25" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('userManage.PleaseInputTheTelephone')">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>{{$t('userManage.Mailbox')}}:</span>
                                <input type="text" v-model.lazy="userManageEmail" maxlength="150" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'')" :placeholder="$t('userManage.PleaseInputTheMailbox')">
                            </div>
                            <div class="userManage_form">
                                <span style="width:95px;"><i class="required">*</i>{{$t('userManage.organization')}}:</span>
                                <div>
                                    <el-cascader
                                        :options="options"
                                        @change="handleChange"
                                        change-on-select
                                        v-model.lazy="selectedOptions3"
                                        :disabled='disabledcascader'
                                        size='small'
                                        style="width:156px;margin-left:3px;">
                                    </el-cascader>
                                </div>
                            </div>
                            <div class="userManage_form">
                                <span style="width:75px;"><i class="required">*</i>{{$t('userManage.Permissions')}}</span>
                                <el-radio-group v-model.lazy="radio2" :disabled='disabledradio'>
                                    <el-radio class="radio" :label="0">{{$t('userManage.AllPermissions')}}</el-radio>
                                    <el-radio class="radio" :label="1">{{$t('userManage.readonlyAccess')}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('userManage.Close')}}</button>
                            <button type="button" class="btn btn-primary addbutton" @click="addRelaSubmit">{{$t('userManage.Submission')}}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="userManage_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="userManage_bottom_bottom">
                    <el-table
                        :data="tableData3"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @sort-change='sortChange'
                        ref="moviesTable"
                        @row-click="clickRow"
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
                        sortable='custom'
                        prop="username"
                        align='center'
                        :label="$t('userManage.UserName')"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="fullName"
                        :label="$t('userManage.FullName')"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="departmentName"
                        :label="$t('userManage.organization')"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="mobile"
                        :label="$t('userManage.Telephone')"
                        align='center'
                        width="200">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="email"
                        :label="$t('userManage.Mailbox')"
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
                keyword:'',
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
                optionssearch:[], //搜索框组织数据
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
                },
                disabledcascader:false,
                disabledradio:false,
                props:'',//排序字段
                orders:'',
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
                this.ready()
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
                        keyword:that.keyword,
                        departmentId:that.departmentId,
                        roleId:that.roleId,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                            that.currentPage4 = Number(sessionStorage.pageIndex)
                            that.loading = false;
                        }else{
                            that.errorCode(data)
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
                            if(sessionStorage.departmentId=='1'){
                                that.selectedOptions3.push('1')
                                    for(var i=0;i<that.options[0].children.length;i++){
                                    if(that.options[0].children[i].value==that.sites[0].departmentId){
                                        that.selectedOptions3.push(that.options[0].children[i].value)
                                    }
                                }
                            }else{
                                that.selectedOptions3.push(String(that.sites[0].departmentId))
                            }
                        }
                    }
                })
            },
            //添加
            userManageAdd(){
                var that= this;
                $('#userManageAddRevamp').modal('show');
                $('#userManagePasswordture').val()
                $('#userManageUsername').attr('disabled',false)
                $('#userManagePasswordture').attr('disabled',false)
                that.disabledcascader = false
                that.disabledradio = false
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
                var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[35784]\d{9}))$/;
                //邮箱验证
                var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                var departmentId = '';
                if(this.userManageUsername==''||this.userManagePassword==''||this.userManageName==''||this.userManagePhone==''||this.userManageEmail==''){
                    that.$message({
                        message: that.$t('userManage.RequiredFieldsCanNotBeEmpty'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(result.test(this.userManagePassword)){
                    that.$message({
                        message: that.$t('userManage.ThePasswordFieldCannotBeInChinese'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(this.userManagePassword.length<6){
                    that.$message({
                        message: '密码字段不得小于6位',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!phone.test(this.userManagePhone)){
                    that.$message({
                        message: that.$t('userManage.TelephoneFormatError'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!email.test(this.userManageEmail)){
                    that.$message({
                        message: that.$t('userManage.ErrorInMailboxFormat'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                
                if(that.selectedOptions3.length==0){
                    that.$message({
                        message: that.$t('userManage.PleaseSelectTheGrouping'),
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
                $('.addbutton').attr('disabled',true)
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
                            $('.addbutton').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message:that.$t('userManage.AddSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#userManageAddRevamp').modal('hide');
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data)
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
                            $('.addbutton').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('userManage.AmendTheSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#userManageAddRevamp').modal('hide');
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data)
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
                        message: that.$t('FalseHints.PleaseSelectADataToModify'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(sessionStorage.id==that.sites[0].id){
                    //自己改自己
                    that.disabledradio = true
                    that.disabledcascader = true
                }else{
                    if(sessionStorage.id=='1'){
                        //超级管理员上改下  全部放开
                        that.disabledradio = false
                        that.disabledcascader = false
                    }else if(sessionStorage.departmentId==that.sites[0].departmentId){
                        //管理员 普通用户 同改同 
                        that.$message({
                            message: that.$t('userManage.NoModify'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }else{
                        //管理员上改下 全部放开
                        that.disabledradio = false
                        that.disabledcascader = false
                    }
                }
                
                $('#userManageAddRevamp').modal('show');
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
            },
            //删除
            userManageDelete(){
                var that= this;
                if(that.sites.length==0){
                    that.$message({
                        message: that.$t('FalseHints.SelectAdataToDelete'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var userIds = [];
                for(var i=0;i<that.sites.length;i++){
                    userIds.push(that.sites[i].id)
                }
                that.$confirm(that.$t('userManage.ConfirmDeletion'), that.$t('userManage.Tips'), {
                    confirmButtonText: that.$t('userManage.Determine'),
                    cancelButtonText: that.$t('userManage.Cancel'),
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
                                    message: that.$t('userManage.DeleteSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: that.$t('userManage.Undelete')
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
            },
        },
        created(){
            var that = this
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'department/getDepartmentTree',
                data:{},
                success:function(data){
                    that.optionssearch = data.result
                }  
            })
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.userManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.userManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.userManage_nav>i{font-size: 23px;}
.userManage_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.userManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;display: flex;align-items: center;}
.userManage_top_div{height: 29px;margin-left: 20px;display: flex}
.userManage_top_div>span{line-height: 29px;font-size: 16px}

.userManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.userManage_form{display: flex;width: 250px;margin: 0 auto 10px;}
.userManage_form>span{width: 160px;line-height: 34px;font-size: 15px;text-align: left;}
.userManage_form>input{height: 31px;}

.userManage_bottom_bottom{height:95%;}
</style>