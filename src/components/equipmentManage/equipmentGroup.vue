<template>
    <div class="equipmentGroup">
        <div class="equipmentGroup_nav">
            设备管理<i class="iconfont icon-icon"></i>分组管理
        </div>
        <div class='equipmentGroup_main'>
            <div class='equipmentGroup_top'>
                <el-button v-if="addgrouping" @click="addGroup" type="primary" icon="plus " size="small">添加分组</el-button>
                <el-button v-if="deletegrouping" @click="deleteGroup" type="primary" icon="edit" size="small">修改分组</el-button>
                <el-button v-if="removegrouping" @click="removeGroup" type="primary" icon="delete" size="small">删除分组</el-button>
            </div>
            <div class='equipmentGroup_bottom'>
                <div class="equipmentGroup_bottom_left">
                    <el-tree :data="regions" accordion :props="props" :highlight-current='highlight' @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="equipmentGroup_bottom_right">
                    <div class="equipmentGroup_bottom_right_left">
                        <p style="margin: 0;">已分组设备</p>
                        <el-table
                            :data="dataleft"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="SelectionChangeLeft">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="设备名称"
                            align='center'
                            width="160">
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
                            prop="MAC"
                            label="MAC"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="model"
                            align='center'
                            label="硬件版本"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="equipmentGroup_bottom_right_center">
                        <div style="margin-top:40px;"><el-button @click="theleft" type="primary" size='small' icon="arrow-left">加入组</el-button></div>
                        <div style="margin-top:20px;"><el-button @click="theright" type="primary" size='small'>移出组<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
                        <div v-if="savegrouping" style="margin-top:20px;"><el-button @click="savedata" type="primary" style='' size='small'>保存</el-button></div>
                    </div>
                    <div class="equipmentGroup_bottom_right_right">
                        <p style="margin: 0;">未分组设备</p>
                        <el-table
                            :data="dataright"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="SelectionChangeRight">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="设备名称"
                            align='center'
                            width="160">
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
                            prop="MAC"
                            label="MAC"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="model"
                            align='center'
                            label="硬件版本"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <!-- 添加修改分组模态框 -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:500px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align:left;">
                                <span v-if="typemodel=='1'">添加分组</span>
                                <span v-if="typemodel=='2'">修改分组</span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="userManage_form">
                                <span><i class="required">*</i>分组名称:</span>
                                <input type="text" v-model.lazy="groupName" maxlength="15" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入分组名称">
                            </div>
                            <div class="userManage_form">
                                <span><i class="required">*</i>硬件版本:</span>
                                <!-- <input type="text" v-model.lazy="model" maxlength="15" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入硬件版本"> -->
                                <el-select v-model.lazy="modelval" placeholder="请选择硬件版本">
                                    <el-option
                                    v-for="item in model"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="userManage_form">
                                <span>备注:</span>
                                <input type="text" v-model.lazy="remark" maxlength="50" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入备注">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" @click="saveGroup" class="btn btn-primary">提交更改</button>
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
                isCollapse:false,
                uniqueopened:true,
                addgrouping:false,
                deletegrouping:false,
                removegrouping:false,
                savegrouping:false,  
                regions:[],
                highlight:true,
                props:{
                    children:'groups',
                    label:'label',
                },
                departmentId:'',//选中树的id
                groupId:'', //选中树的id
                level:'', //选中树的level等级
                typemodel:'', //树的添加修改类型
                groupName:'', //分组名称
                // model:'', //硬件版本
                remark:'', //备注

                dataleft:[],//左侧基本数据
                leftchangedata:[],//左侧选中数据
                dataright:[],//右侧基本数据
                rightchangedata:[],//右侧选中数据
                leftdata:[],//往左侧移动数据id
                rightdata:[],//往右侧移动数据id

                model:[],//所有硬件版本号
                modelval:0, //选中的硬件版本号
                modellink:'',//左侧树选中的硬件版本
            }
        },
        mounted(){
            var that = this
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
                                if(data.result[i].code=='addGroup'){
                                    that.addgrouping = true
                                }
                                if(data.result[i].code=='editGroup'){
                                    that.deletegrouping = true
                                }
                                if(data.result[i].code=='delGroup'){
                                    that.removegrouping = true
                                }
                                if(data.result[i].code=='saveEquipmentGroup'){
                                    that.savegrouping = true
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
            //最左侧树行列表点击事件
            handleNodeClick(data){
                if(data.departmentId==''||data.departmentId==undefined){
                    this.groupId = data.groupId
                    this.ready(this.groupId)
                }
                if(data.groupId==''||data.groupId==undefined){
                    this.departmentId = data.departmentId
                }
                this.leftchangedata = []
                this.rightchangedata = []
                this.leftdata = [];
                this.rightdata = [];
                this.level = data.level
                this.groupName = data.groupName
                this.modellink = data.model
                this.remark = data.remark
                
            },
            //获取所有硬件版本号
            bodelTYpe(){
                var that = this
                this.model = [];
                $.ajax({
                    type:'get',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            var modeldata = {}
                            for(var i=0;i<data.result.length;i++){
                                modeldata = {}
                                modeldata.value = i
                                modeldata.label = data.result[i].modelName
                                that.model.push(modeldata)
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    } 
                })
            },
            //添加分组
            addGroup(){
                if(this.level==''||this.level==undefined||this.level=='1'){
                    this.$message({
                        message: '请选择组织添加分组',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                $('#myModal').modal('show');
                this.bodelTYpe()
                this.typemodel = '1'
            },
            //修改分组
            deleteGroup(){
                if(this.level=='1'||this.level=='2'){
                    this.$message({
                        message: '请选择分组进行修改',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                this.typemodel = '2'
                $('#myModal').modal('show');
                this.bodelTYpe()
                for(var i=0;i<this.model.length;i++){
                    if(this.modellink == this.model[i].label){
                        this.modelval = i
                    }
                }
            },
            //删除分组
            removeGroup(){
                var that = this;
                if(this.level=='1'||this.level=='2'){
                    this.$message({
                        message: '请选择分组进行删除',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                this.$confirm('此操作删除该分组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:false,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'equipment/delGroups',
                        data:{groupIds:that.groupId},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '删除成功',
                                    type: 'error',
                                    showClose: true,
                                });
                                that.treeready()
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //添加,修改分组保存
            saveGroup(){
                var that = this;
                var url = '';
                var data = {};
                if(this.groupName==''){
                    this.$message({
                        message: '必填字段不能为空',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                data.groupName = that.groupName
                for(var i=0;i<this.model.length;i++){
                    data.model = this.model[this.modelval].label
                }
                data.remark = that.remark
                data.departmentId = that.departmentId
                if(this.typemodel=='1'){
                    url='equipment/saveGroup'
                }
                if(this.typemodel=='2'){
                    url='equipment/editGroups'
                    data.groupId = that.groupId
                }
                $.ajax({
                    type:'post',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.typemodel=='1'){
                                that.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            if(that.typemodel=='2'){
                                that.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            $('#myModal').modal('hide');
                            that.treeready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },

            //左侧数据选中change事件
            SelectionChangeLeft(val){
                this.leftchangedata = val
                console.log(val)
            },
            //右侧数据选中change事件
            SelectionChangeRight(val){
                this.rightchangedata = val
                console.log(val)
            },
            //点击到左边
            theleft(){
                if(this.rightchangedata.length==0){
                    return;
                }
                for(var i=0;i<this.rightchangedata.length;i++){
                    this.dataleft.push(this.rightchangedata[i])
                    this.leftdata.push(this.rightchangedata[i].id)
                }
                for(var i=0;i<this.dataright.length;i++){
                    for(var j=0;j<this.rightchangedata.length;j++){
                        if(this.dataright[i].id==this.rightchangedata[j].id){
                            this.dataright.splice(i,1)
                        }
                    }
                }
                // this.dataright = this.rightchangedata
                for(var i=0;i<this.leftdata.length;i++){
                    for(var j=0;j<this.rightdata.length;j++){
                        if(this.leftdata[i]==this.rightdata[j]){
                            this.rightdata.splice(j,1)
                        }
                    }
                }
                this.rightchangedata = [];
            },
            //点击到右边
            theright(){
                if(this.leftchangedata.length==0){
                    return;
                }
                for(var i=0;i<this.leftchangedata.length;i++){
                    this.dataright.push(this.leftchangedata[i])
                    this.rightdata.push(this.leftchangedata[i].id)
                }
                for(var i=0;i<this.dataleft.length;i++){
                    for(var j=0;j<this.leftchangedata.length;j++){
                        if(this.dataleft[i].id==this.leftchangedata[j].id){
                            this.dataleft.splice(i,1)
                        }
                    }
                }
                for(var i=0;i<this.rightdata.length;i++){
                    for(var j=0;j<this.leftdata.length;j++){
                        if(this.rightdata[i]==this.leftdata[j]){
                            this.leftdata.splice(j,1)
                        }
                    }
                }
                this.leftchangedata = [];
            },
            //保存按钮
            savedata(){
                var that = this;
                console.log(this.leftdata.join(','),this.rightdata.join(','))
                $.ajax({
                    type:'post',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/setEquipmentGroup',
                    data:{
                        addEquipmentIds:that.leftdata.join(','),
                        removeEquipmentIds:that.rightdata.join(','),
                        groupId:that.groupId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type: 'success',
                                showClose: true,
                            });
                            that.ready(that.groupId)
                            that.leftchangedata = []
                            that.rightchangedata = []
                            that.leftdata = [];
                            that.rightdata = [];
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //请求右侧两个表格的数据
            ready(val){
                var that = this
                $.ajax({
                    type:'get',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentByGroup',
                    data:{groupId:val},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataleft = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                $.ajax({
                    type:'get',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getCanGroupedEquipment',
                    data:{groupId:val},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataright = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //左侧tree树的初始化
            treeready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getGroupTree',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(data.result[0].level=='1'){
                                that.regions = data.result[0].sonDepartments
                            }else{
                                that.regions = data.result
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }
        },
        created(){
            var that = this;
            this.regions = []
            setTimeout(function(){
                $.ajax({
                type:'get',
                async:false,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'equipment/getGroupTree',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        if(data.result[0].level=='1'){
                            that.regions = data.result[0].sonDepartments
                        }else{
                            that.regions = data.result
                        }
                    }else{
                        that.errorCode(data.errorCode)
                    }
                }
            })
            },200)
        }
    }
</script>
<style scoped>
.equipmentGroup{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentGroup_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentGroup_nav>i{font-size: 23px;}
.equipmentGroup_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentGroup_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.equipmentGroup_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.equipmentGroup_bottom_left{width: 200px;height: 100%;border-right: 1px solid #c4c4c4;}
.equipmentGroup_bottom_left>div{border: none;text-align: left;}
.equipmentGroup_bottom_right{position: absolute;left: 200px;right: 1px;height: 100%;width:auto;overflow: auto;}
.equipmentGroup_bottom_right_left{position: absolute;left: 0;width: 45%;height: 100%;padding: 5px;}
.equipmentGroup_bottom_right_center{position: absolute;left: 45%;width: 10%;height: 100%;}
.equipmentGroup_bottom_right_right{position: absolute;left: 55%;width: 45%;height: 100%;padding: 5px;}

.required{color: red;}
.userManage_form{display: flex;width: 280px;margin: 0 auto 10px;}
.userManage_form>span{width: 85px;line-height: 34px;font-size: 15px;}
.userManage_form>input{height: 36px;width: 71%;}
</style>
