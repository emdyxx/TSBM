<template>
    <div class="roleManage">
         <div class="roleManage_nav">
            系统管理<i class="iconfont icon-icon"></i>角色管理
         </div>
         <div class="roleManage_main">
             <div class="roleManage_top">
                 <el-button type="primary" icon="plus " size="small" @click="roleManageAdd">添加</el-button>
                 <el-button type="primary" icon="edit" size="small" @click="roleManageRevamp">修改</el-button>
                 <el-button type="primary" icon="delete" size="small" @click="roleManageDelete">删除</el-button>
             </div>    
             <!-- 添加修改模态框 -->
             <div class="modal fade" id="roleManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:450px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title roleManageLabel" id="myModalLabel" style="text-align:left;">添加</h4>
                        </div>
                        <div class="modal-body">
                            <div class="roleManage_form">
                                <span>角色名称:</span>
                                <input type="text" v-model.lazy='roleManageName' class="form-control" maxlength="20" minlength="3" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入角色名称">
                            </div>
                            <div class="roleManage_form">
                                <span style="width:75px;">分组:</span>
                                <div>
                                    <el-cascader
                                        :options="options"
                                        @change="handleChange"
                                        change-on-select
                                        v-model.lazy="selectedOptions3"
                                        size='small'>
                                    </el-cascader>
                                </div>
                            </div>
                            <div class="roleManage_form">
                                <span style="width:112px;">备注说明:</span>
                                <textarea rows="3" cols="40" v-model.lazy='roleManageRemark' style="border: 1px solid #ccc;" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入描述"></textarea>
                            </div>
                            <div style="width:270px;margin:0 auto;text-align:left;">
                                权限分配
                            </div>
                            <hr style="width:270px;margin-top:5px;margin-bottom:10px;">
                            <div class="checkout"> 
                                <el-tree
                                :data="regions"
                                :props="props"  
                                node-key="id"
                                show-checkbox
                                accordion
                                ref="tree"
                                highlight-current
                                style="border:none;">
                                </el-tree>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="roleManageSubmit">提交更改</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="roleManage_bottom"
             v-loading.body='loading'
             element-loading-text="拼命加载中">
                <div class="roleManage_bottom_top">
                    <div class="roleManage_formtwo">
                        <span>角色名称:</span>
                        <input type="text" v-model.lazy="roleName"  maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入角色名成">
                    </div>
                    <div class="roleManage_formtwo">
                        <span>所属分组:</span>
                        <el-cascader
                            :options="options"
                            @change="roleManageChange"
                            change-on-select
                            size='small'
                            style="width:126px;">
                        </el-cascader>
                    </div>
                    <el-button type="primary" icon="search" @click="roleSearch" style="height:30px;" size='small'>搜索</el-button>
                </div> 
                <div class="roleManage_bottom_bottom">
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
                        <el-table-column
                        prop="privilegeId"
                        align='center'
                        label="排序ID"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="roleName"
                        label="角色名称"
                        align='center'
                        width="160">
                        </el-table-column>
                        <el-table-column
                        prop="privilege"
                        label="拥有权限"
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
       name: 'roleManage', 
       data (){
           return {
                roleName:'',
                departmentId:'',
                serverurl:localStorage.serverurl,
                sites:[],
                tableData4:[],
                currentPage4:1,
                total:100,
                sizes:10,
                loading:false,
                option:'',
                roleManageName:'',
                roleManageID:'',
                roleManageRemark:'',
                regions:[],
                props:{
                    children: 'children',
                    label: 'label'
                },
                menuIds:[],  //菜单Id
                operationIds:[],  //操作id
                options:[],
                selectedOptions3:[],  //默认值
           }
       },
       methods:{
           //页面分组change事件
           roleManageChange(val){
               if(val.length=='1'){
                   this.departmentId = val[0]
               }
               if(val.length=='2'){
                   this.departmentId = val[1]
               }
               if(val.length=='3'){
                   this.departmentId = val[2]
               }
           },
           //搜索
           roleSearch(){
               this.ready();
           },
           //添加
           roleManageAdd(){
               $('#roleManageModal').modal('show')
               $('.roleManageLabel').text('添加角色')
               this.option = '1'
               this.roleManageName='',
               this.roleManageID=''
               this.roleManageRemark=''
               this.department()
               this.tree()
               this.$refs.tree.setCheckedKeys([]);
               this.menuIds=[];
               this.operationIds=[];
               this.selectedOptions3 = [];
           },
           //修改
           roleManageRevamp(){
                var that= this;
                if(that.sites.length==0||that.sites.length>=2){
                    that.$message({
                        message: '请选择一条数据进行修改',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#roleManageModal').modal('show')
                $('.roleManageLabel').text('添加角色')
                this.option = '2'
                this.roleManageName=this.sites[0].roleName
                this.roleManageID = this.sites[0].departmentId
                this.roleManageRemark=this.sites[0].remark
                this.menuIds=[];
                this.operationIds=[];
                this.department()
                this.tree()
                var tolerant = this.sites[0].menuIds.split(",")
                var tolerantTwo = this.sites[0].operationIds.split(",")
                var tolerantThree = tolerant.concat(tolerantTwo)
                this.$refs.tree.setCheckedKeys(tolerantThree);
                this.selectedOptions3.push(String(this.sites[0].departmentId))
           },
           //添加修改提交
           roleManageSubmit(){
                var that = this;
                if(that.roleManageName==''||that.roleManageID==''||that.roleManageRemark==''){
                    that.$message({
                        message: '必填字段不能为空',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                that.menuIds=[];
                that.operationIds=[];
                var menuIdsT =[]
                var operationIdst = []
                var array = this.$refs.tree.getCheckedNodes(false);
                var array1 = [1,2,3,4,5,6,7,8,9,10,11,12] //系统管理
                for(var i=0;i<array.length;i++){
                    if(array[i].type=='0'){ //菜单
                        for(var j=0;j<this.menuIds.length;j++){
                            if(this.menuIds[j]==array[i].id){

                            }else{
                                this.menuIds.push(array[i].id)
                            }
                        }
                    }else{  //操作
                        this.operationIds.push(array[i].id)
                        if(array[i].id=='1'||array[i].id=='2'||array[i].id=='3'){
                            this.menuIds.push(2)
                            this.menuIds.push(21)
                        }
                        if(array[i].id=='4'||array[i].id=='5'||array[i].id=='6'){
                            this.menuIds.push(2)
                            this.menuIds.push(22)
                        }
                        if(array[i].id=='7'||array[i].id=='8'||array[i].id=='9'){
                            this.menuIds.push(2)
                            this.menuIds.push(23)
                        }
                        if(array[i].id=='10'||array[i].id=='11'||array[i].id=='12'){
                            this.menuIds.push(2)
                            this.menuIds.push(24)
                        }
                    }
                }
                for (var i = 0; i < that.menuIds.length; i++) {
                    if (menuIdsT.indexOf(that.menuIds[i]) == -1 ) {
                        menuIdsT.push(that.menuIds[i]);
                    }
                }
                for (var i = 0; i < that.operationIds.length; i++) {
                    if (operationIdst.indexOf(that.operationIds[i]) == -1 ) {
                        operationIdst.push(that.operationIds[i]);
                    }
                }
                if(this.option=='1'){
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'role/addRole',
                        data:{
                            roleName:that.roleManageName,
                            departmentId:that.roleManageID,
                            remark:that.roleManageRemark,
                            menuIds:menuIdsT.join(','),
                            operationIds:operationIdst.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#roleManageModal').modal('hide')
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }else{
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'role/editRole',
                        data:{
                            id:this.sites[0].id,
                            roleName:that.roleManageName,
                            departmentId:that.roleManageID,
                            remark:that.roleManageRemark,
                            menuIds:menuIdsT.join(','),
                            operationIds:operationIdst.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                $('#roleManageModal').modal('hide')
                                that.ready()
                                return;
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
           },
           //删除
           roleManageDelete(){
                var that= this;
                if(that.sites.length==0){
                    that.$message({
                        message: '请选择至少一条数据进行删除',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var Id = []; 
                for(var i=0;i<that.sites.length;i++){
                    Id.push(that.sites[i].id)
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
                        url:that.serverurl+'role/delRole',
                        data:{
                            userIds:Id.join(',')
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
                })
           },
           //获取tree树
           tree(){
               var that = this;
               var id;
               if(that.option=='1'){
                   id=''
               }
               if(that.option=='2'){
                   id=that.sites[0].id
               }
               $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'role/getPrivilege',
                    data:{roleId:id},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.regions = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
               })
           },
           //获取部门
           department(){
               var that = this
               $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/getDepartmentTree',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.options = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
               })
           },
           //添加修改部门选择事件
           handleChange(val){
               if(val.length==1){
                   this.roleManageID = val[0]
               }
               if(val.length==2){
                   this.roleManageID = val[1]
               }
           },
           //选中行数据
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
           //页面数据加载
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
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'role/getRoleList',
                    data:{
                        pageIndex:pageIndex,
                        pageSize:pageSize,
                        roleName:that.roleName,
                        departmentId:that.departmentId,
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
           }
       },
       created(){
           var that = this;
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
                        // for(var i=0;i<data.result.length;i++){
                        //     if(data.result[i].menuId==21){
                        //         this.add = true
                        //     }
                        //     if(data.result[i].menuId==22){
                        //         this.remove = true
                        //     }
                        //     if(data.result[i].menuId==23){
                        //         this.delate = true
                        //     }
                        // }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
            this.department()
            this.ready()
       },
    }
</script>
<style scoped>
.block{display: block;}
.margin{margin-left: 25px;}
.margin2x{margin-left: 50px;}
.roleManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.roleManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.roleManage_nav>i{font-size: 23px;}
.roleManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.roleManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.roleManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.roleManage_form{display: flex;width: 270px;margin: 0 auto 10px;}
.roleManage_form>span{width: 100px;line-height: 34px;font-size: 15px;}
.roleManage_form>input{height: 31px;}
.checkout{width: 270px;margin: 0 auto;text-align: left;}

.roleManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.roleManage_bottom_bottom{height:80%;}
.roleManage_formtwo{display: flex;margin:0 10px;}
.roleManage_formtwo>span{line-height: 30px;font-size: 15px;}
.roleManage_formtwo>input{width: 126px;height: 30px;}
</style>
