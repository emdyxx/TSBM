<template>
    <div class="departmentManage">
        <div class="departmentManage_nav">
            系统管理<i class="iconfont icon-icon"></i>组织管理
        </div>
        <div class="departmentManage_main">
            <div class="departmentManage_top">
                <el-button v-if="add" type="primary" icon="plus" size="small" @click="departmentManageAdd">添加</el-button>
                <el-button v-if="remove" type="primary" icon="edit" size="small" @click="departmentManageRevamp">修改</el-button>
                <el-button v-if="delate" type="primary" icon="delete" size="small" @click="departmentManageDelete">删除</el-button>
            </div>
            <!-- 添加修改模态框 -->
            <div class="modal fade" id="departmentManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title departmentManageLabel" id="myModalLabel" style="text-align:left;">添加</h4>
                        </div>
                        <div class="modal-body">
                            <div class="departmentManage_form">
                                <span style="width:74px;"><i class="required">*</i>所属部门:</span>
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
                            <!-- <div class="departmentManage_form">
                                <span>组织代码:</span>
                                <input type="text" v-model='departmentManageCode' class="form-control" maxlength="20" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入组织代码">
                            </div> -->
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>组织名称:</span>
                                <input type="text" v-model='departmentManageName' class="form-control" maxlength="20" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入组织名称">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>地址:</span>
                                <input type="text" v-model='departmentManageAddress' class="form-control" maxlength="30" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入地址">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>电话:</span>
                                <input type="text" v-model='departmentManagePhone' class="form-control" maxlength="16" minlength="5" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入电话">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>负责人:</span>
                                <input type="text" v-model='departmentManagePrincipal' class="form-control" maxlength="15" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入负责人">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>邮箱:</span>
                                <input type="text" v-model='departmentManageEmail' class="form-control" maxlength="22" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入邮箱">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="departmentManageSubmit">提交更改</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="departmentManage_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="departmentManage_bottom_top">
                    <div class="departmentManage_formtwo">
                        <span>编号:</span>
                        <input type="text" v-model="code"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="departmentManage_formtwo">
                        <span>部门名称:</span>
                        <input type="text" v-model="departmentName"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="departmentManage_formtwo">
                        <span>地址:</span>
                        <input type="text" v-model="address"  maxlength="25" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="departmentManage_formtwo">
                        <span>联系电话:</span>
                        <input type="text" v-model="phone"  maxlength="20" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <el-button type="primary" icon="search" @click="tissueSearch" style="height:30px;" size='small'>搜索</el-button>
                </div>
                <div class="departmentManage_bottom_bottom">
                    <el-table
                        ref="multipleTable"
                        :data="tableData4"
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
                        <!-- <el-table-column
                        prop="code"
                        align='center'
                        label="组织代号"
                        width="100">
                        </el-table-column> -->
                        <el-table-column
                        prop="departmentName"
                        label="组织名称"
                        align='center'
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址"
                        align='center'
                        width="260">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="电话"
                        align='center'
                        width="130">
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
        name: 'departmentManage',
        data () {
            return {
                code:'',
                departmentName:'',
                address:'',
                phone:'',
                serverurl:localStorage.serverurl,
                //权限
                add:false,
                remove:false,
                delate:false,
                total:100,
                sizes:10,
                currentPage4:1,
                tableData4: [],
                sites:[],
                loading:false,
                option:'',
                options:[],
                selectedOptions3:[],
                departmentManageCode:'',
                departmentManageName:'',
                departmentManageAddress:'',
                departmentManagePhone:'',
                departmentManagePrincipal:'',
                departmentManageEmail:'',
            }
        },
        mounted(){
            var that = this
            //请求用户操作权限
            setTimeout(function(){
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
                                if(data.result[i].code=='addDepartment'){
                                    that.add = true
                                }
                                if(data.result[i].code=='editDepartment'){
                                    that.remove = true
                                }
                                if(data.result[i].code=='delDepartment'){
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
            tissueSearch(){
                this.ready()
            },
            //添加
            departmentManageAdd(){
                $('#departmentManageModal').modal('show')
                $('.departmentManageLabel').text('添加组织')
                this.departmentManageCode=''
                this.departmentManageName=''
                this.departmentManageAddress=''
                this.departmentManagePhone=''
                this.departmentManagePrincipal=''
                this.departmentManageEmail=''
                this.option = '1'
                this.selectedOptions3=[];
                this.branchTree()
            },
            //修改
            departmentManageRevamp(){
                var that = this
                if(that.sites.length==0||that.sites.length>=2){
                    that.$message({
                        message: '请选择一条数据进行修改',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#departmentManageModal').modal('show')
                $('.departmentManageLabel').text('修改组织')
                this.departmentManageCode=that.sites[0].code
                this.departmentManageName=that.sites[0].departmentName
                this.departmentManageAddress=that.sites[0].address
                this.departmentManagePhone=that.sites[0].phone
                this.departmentManagePrincipal=that.sites[0].principal
                this.departmentManageEmail=that.sites[0].email
                this.option = '2'
                this.branchTree()
            },
            //获取所属部门的tree树列表
            branchTree(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/getDepartmentTree',
                    data:{},
                    success:function(data){
                        delete data.result[0].children
                        that.options = data.result
                        if(that.option == '2'){
                            that.selectedOptions3=[];
                            that.selectedOptions3.push('1')
                            // for(var i=0;i<that.options[0].children.length;i++){
                            //     if(that.options[0].children[i].value==that.sites[0].parentId){
                            //         that.selectedOptions3.push(that.options[0].children[i].value)
                            //     }else{
                            //         for(var j=0;j<that.options[0].children[i].children.length;j++){
                            //             if(that.options[0].children[i].children[j].value==that.sites[0].parentId){
                            //                 that.selectedOptions3.push(that.options[0].children[i].value)
                            //                 that.selectedOptions3.push(that.options[0].children[i].children[j].value)
                            //             }
                            //         }
                            //     }
                            // }
                        }
                    }
                })
            },
            //所属部门chang事件
            handleChange(value){
                this.selectedOptions3=value
            },
            //添加修改提交
            departmentManageSubmit(){
                var that = this
                //手机号码验证
                var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[3584]\d{9}))$/;
                //邮箱验证
                var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(this.departmentManageName==''||this.departmentManageAddress==''||this.departmentManagePhone==''||this.departmentManagePrincipal==''||this.departmentManageEmail==''){
                    that.$message({
                        message: '字段不能为空',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(that.selectedOptions3.length>1){
                    that.$message({
                        message: '所属部门目前只能为系统管理',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!phone.test(this.departmentManagePhone)){
                    that.$message({
                        message: '电话不符合格式',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!email.test(this.departmentManageEmail)){
                    that.$message({
                        message: '邮箱不符合格式',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(this.option=='1'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/addDepartment',
                        data:{
                            parentId:that.selectedOptions3[0],
                            departmentName:that.departmentManageName,
                            code:that.departmentManageCode,
                            phone:that.departmentManagePhone,
                            email: that.departmentManageEmail,
                            address:that.departmentManageAddress,
                            principal:that.departmentManagePrincipal
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#departmentManageModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                if(this.option=='2'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/editDepartment',
                        data:{
                            id:that.sites[0].id,
                            parentId:that.selectedOptions3[0],
                            departmentName:that.departmentManageName,
                            code:that.departmentManageCode,
                            phone:that.departmentManagePhone,
                            email: that.departmentManageEmail,
                            address:that.departmentManageAddress,
                            principal:that.departmentManagePrincipal
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#departmentManageModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
            },
            //删除
            departmentManageDelete(){
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
                        url:that.serverurl+'department/delDepartment',
                        data:{
                            dpartmentIds:userIds.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    showClose: true,
                                });
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
            },
            //选中行的change事件
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
                    url:that.serverurl+'department/getDepartmentList',
                    data:{
                        pageIndex:pageIndex,
                        pageSize:pageSize,
                        code:that.code,
                        departmentName:that.departmentName,
                        address:that.address,
                        phone:that.phone
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.total = data.total
                            that.currentPage4 = Number(sessionStorage.pageIndex)
                            that.loading = false;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.departmentManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.departmentManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.departmentManage_nav>i{font-size: 23px;}

.departmentManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.departmentManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.departmentManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}

.departmentManage_form{display: flex;width: 270px;margin: 0 auto 10px;}
.departmentManage_form>span{width: 100px;line-height: 34px;font-size: 15px;}
.departmentManage_form>input{height: 31px;}
/* 1111 */
.departmentManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.departmentManage_bottom_bottom{height:80%;}
.departmentManage_formtwo{display: flex;margin:0 10px;}
.departmentManage_formtwo>span{line-height: 30px;font-size: 15px;}
.departmentManage_formtwo>input{width: 126px;height: 30px;}
</style>
