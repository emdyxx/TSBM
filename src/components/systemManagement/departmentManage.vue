<template>
    <div class="departmentManage">
        <!-- <div class="departmentManage_nav">
            {{$t('departmentManage.SystemManagement')}}<i class="iconfont icon-icon"></i>{{$t('departmentManage.OrganizationAndManagement')}}
        </div> -->
        <div class="departmentManage_main">
            <div class="departmentManage_top">
                <el-button v-if="add" type="primary" icon="plus" size="small" @click="departmentManageAdd">{{$t('departmentManage.AddTo')}}</el-button>
                <el-button v-if="remove" type="primary" icon="edit" size="small" @click="departmentManageRevamp">{{$t('departmentManage.Modify')}}</el-button>
                <el-button v-if="delate" type="primary" icon="delete" size="small" @click="departmentManageDelete">{{$t('departmentManage.Delete')}}</el-button>
                <div class="departmentManage_top_div">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="tissueSearch"
                        style="width:150px;">
                    </el-input>
                </div>
            </div>
            <!-- 添加修改模态框 -->
            <div class="modal fade" id="departmentManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 v-if="option=='1'" class="modal-title" id="myModalLabel" style="text-align:left;">{{$t('departmentManage.AddOrganization')}}</h4>
                            <h4 v-if="option=='2'" class="modal-title" id="myModalLabel" style="text-align:left;">{{$t('departmentManage.AmendingOrganization')}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.OrganizationName')}}:</span>
                                <input type="text" v-model.lazy='departmentManageName' class="form-control" maxlength="20" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('departmentManage.PleaseEnterTheNameOfTheOrganization')">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.Address')}}:</span>
                                <input type="text" v-model.lazy='departmentManageAddress' class="form-control" maxlength="50" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('departmentManage.PleaseEnterTheAddress')">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.ContactNumber')}}:</span>
                                <input type="text" v-model.lazy='departmentManagePhone' class="form-control" maxlength="25" minlength="5" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('departmentManage.PleaseEnterTheContactNumber')">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.PersonInCharge')}}:</span>
                                <input type="text" v-model.lazy='departmentManagePrincipal' class="form-control" maxlength="30" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('departmentManage.PleaseEnterTheResponsiblePerson')">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.Mailbox')}}:</span>
                                <input type="text" v-model.lazy='departmentManageEmail' class="form-control" maxlength="150" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'')" :placeholder="$t('departmentManage.PleaseEnterTheMailbox')">
                            </div>
                            <div class="departmentManage_form">
                                <span><i class="required">*</i>{{$t('departmentManage.scene')}}:</span>
                                <el-select v-model="value" size='small' style="width:200px">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="departmentManage_form" style="justify-content: center;">
                                <el-checkbox v-model="checked">{{$t('departmentManage.WhetherOrNotToUseTheCloudPlatform')}}</el-checkbox>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('departmentManage.Close')}}</button>
                            <button type="button" class="btn btn-primary addbutton" @click="departmentManageSubmit">{{$t('departmentManage.Submission')}}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="departmentManage_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="departmentManage_bottom_bottom">
                    <el-table
                        @row-click="clickRow"
                        ref="multipleTable"
                        :data="tableData4"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @sort-change='sortChange'
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
                        prop="departmentName"
                        sortable='custom'
                        :label="$t('departmentManage.OrganizationName')"
                        align='center'
                        min-width="140">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        sortable='custom'
                        :label="$t('departmentManage.Address')"
                        align='center'
                        width="220">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        sortable='custom'
                        :label="$t('departmentManage.ContactNumber')"
                        align='center'
                        min-width="110">
                        </el-table-column>
                        <el-table-column
                        prop='isCloud'
                        sortable='custom'
                        :label="$t('departmentManage.WhetherOrNotToUseTheCloudPlatform')"
                        align='center'
                        min-width="100">
                            <template scope="scope">
                                <span v-if="scope.row.isCloud=='0'">{{$t('FalseHints.yes')}}</span>
                                <span v-if="scope.row.isCloud=='1'">{{$t('FalseHints.no')}}</span>    
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop='scenne'
                        sortable='custom'
                        :label="$t('departmentManage.scene')"
                        align='center'
                        min-width="100">
                            <template scope="scope">
                                <span v-if="scope.row.scenne=='0'">{{$t('departmentManage.outdoor')}}</span>
                                <span v-if="scope.row.scenne=='1'">{{$t('departmentManage.factory')}}</span>    
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        sortable='custom'
                        :label="$t('departmentManage.Mailbox')"
                        align='center'>
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
            <el-dialog :title="$t('departmentManage.DeleteOrganization')" :visible.sync="dialogFormVisible" style="width:700px;margin: 0 auto;text-align: left;">
                <el-form>
                    <el-form-item :label="$t('departmentManage.PleaseInputAPassword')" :label-width="formLabelWidth">
                        <el-input v-model="password" style="width:186px" type='password' auto-complete="off" :placeholder="$t('departmentManage.PleaseInputAPassword')"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t('departmentManage.Cancel')}}</el-button>
                    <el-button type="primary" @click="dialogFormVisibleSubmit">{{$t('departmentManage.Determine')}}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'departmentManage',
        data () {
            return {
                keyword:'',
                serverurl:localStorage.serverurl,
                dialogFormVisible:false,// 删除分组显示与否
                formLabelWidth: '100px',
                password:'',// 删除分组密码
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
                value:'0',
                selectedOptions3:[],
                departmentManageCode:'',
                departmentManageName:'',
                departmentManageAddress:'',
                departmentManagePhone:'',
                departmentManagePrincipal:'',
                departmentManageEmail:'',
                checked:false,
                props:'',//排序字段
                orders:'',
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
                this.$refs.multipleTable.toggleRowSelection(row)
            }, 
            //搜索
            tissueSearch(){
                this.ready()
            },
            //添加
            departmentManageAdd(){
                $('#departmentManageModal').modal('show')
                this.departmentManageCode=''
                this.departmentManageName=''
                this.departmentManageAddress=''
                this.departmentManagePhone=''
                this.departmentManagePrincipal=''
                this.departmentManageEmail=''
                this.checked = false
                this.option = '1'
                this.selectedOptions3=[];
            },
            //修改
            departmentManageRevamp(){
                var that = this
                if(that.sites.length==0||that.sites.length>=2){
                    that.$message({
                        message: that.$t('FalseHints.PleaseSelectADataToModify'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#departmentManageModal').modal('show')
                this.departmentManageCode=that.sites[0].code
                this.departmentManageName=that.sites[0].departmentName
                this.departmentManageAddress=that.sites[0].address
                this.departmentManagePhone=that.sites[0].phone
                this.departmentManagePrincipal=that.sites[0].principal
                this.departmentManageEmail=that.sites[0].email
                this.option = '2'
                this.value=String(that.sites[0].scenne)
                if(that.sites[0].isCloud=='0'){
                    this.checked = false
                }
                if(that.sites[0].isCloud=='1'){
                    this.checked = true
                }
            },
            //所属部门chang事件
            handleChange(value){
                this.selectedOptions3=value
            },
            //添加修改提交
            departmentManageSubmit(){
                var that = this
                //手机号码验证
                var phone = /^((0[0-9]{1,3}-\d{5,8})|(1[35784]\d{9}))$/;
                //邮箱验证
                var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(this.departmentManageName==''||this.departmentManageAddress==''||this.departmentManagePhone==''||this.departmentManagePrincipal==''||this.departmentManageEmail==''){
                    that.$message({
                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!phone.test(this.departmentManagePhone)){
                    that.$message({
                        message: that.$t('FalseHints.TelephoneFormatError'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(!email.test(this.departmentManageEmail)){
                    that.$message({
                        message: that.$t('FalseHints.ErrorInMailboxFormat'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var isCloud = ''
                if(that.checked==false){
                    isCloud = 0
                }
                if(that.checked==true){
                    isCloud = 1
                }
                $('.addbutton').attr('disabled',true)
                if(this.option=='1'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/addDepartment',
                        data:{
                            parentId:1,
                            departmentName:that.departmentManageName,
                            phone:that.departmentManagePhone,
                            email: that.departmentManageEmail,
                            address:that.departmentManageAddress,
                            principal:that.departmentManagePrincipal,
                            isCloud:isCloud,
                            scenne:that.value
                        },
                        success:function(data){
                            $('.addbutton').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('FalseHints.AddSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#departmentManageModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data)
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
                            parentId:1,
                            departmentName:that.departmentManageName,
                            phone:that.departmentManagePhone,
                            email: that.departmentManageEmail,
                            address:that.departmentManageAddress,
                            principal:that.departmentManagePrincipal,
                            isCloud:isCloud,
                            scenne:that.value
                        },
                        success:function(data){
                            $('.addbutton').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#departmentManageModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
            },
            //删除
            departmentManageDelete(){
                var that= this;
                if(that.sites.length==0||that.sites.length>=2){
                    that.$message({
                        message: that.$t('FalseHints.SelectAdataToDelete'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                that.dialogFormVisible = true;
            },
            dialogFormVisibleSubmit(){
                var that = this;
                var userIds = [];
                for(var i=0;i<that.sites.length;i++){
                    userIds.push(that.sites[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/delDepartment',
                    data:{
                        userPassword:that.password,
                        dpartmentId:userIds.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('FalseHints.DeleteSuccess'),
                                type: 'success',
                                showClose: true,
                            });
                            that.dialogFormVisible = false;
                            that.password = ''
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
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
                        keyword:that.keyword,
                        order:that.props,
                        orderBy:that.orders
                        // code:that.code,
                        // departmentName:that.departmentName,
                        // address:that.address,
                        // phone:that.phone
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.total = data.total
                            that.currentPage4 = Number(sessionStorage.pageIndex)
                            that.loading = false;
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
        },
        created(){
            if(localStorage.locale=='en'){
                this.options = [{value:'0',label:'outdoor'},{value:'1',label:'factory'}]
            }else{
                this.options = [{value:'0',label:'室外'},{value:'1',label:'工厂'}]
            }
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.departmentManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.departmentManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.departmentManage_nav>i{font-size: 23px;}

.departmentManage_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.departmentManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;display: flex;align-items: center;}
.departmentManage_top_div{height: 29px;margin-left: 20px;display: flex}
.departmentManage_top_div>span{line-height: 29px;font-size: 16px}
.departmentManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}

.departmentManage_form{display: flex;width: 340px;margin: 0 auto 10px;}
.departmentManage_form>span{width: 140px;line-height: 34px;font-size: 15px;text-align: right;}
.departmentManage_form>input{height: 31px;width:200px;}

.departmentManage_bottom_bottom{height:80%;}
</style>
