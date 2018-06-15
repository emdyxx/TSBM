<template>
    <div class="equipmentArea">
        <div class="equipmentArea_nav">
            设备管理<i class="iconfont icon-icon"></i>区域管理
        </div>
        <div class='equipmentArea_main'>
            <div class="equipmentArea_top">
                <el-button @click="add(0)" type="primary" icon="plus " size="small">添加区域</el-button>
                <el-button @click="add(1)" type="primary" icon="edit" size="small">修改区域</el-button>
                <el-button @click="add(2)" type="primary" icon="delete" size="small">删除区域</el-button>
            </div>
            <div class="equipmentArea_bottom">
                <div class="equipmentArea_bottom_left">
                    <el-tree
                    :data="dataTree"
                    :props="defaultProps"
                    accordion
                    highlight-current
                    @node-click="handleNodeClick">
                    </el-tree>
                </div>
                <div class="equipmentArea_bottom_right">
                    <div class="equipmentArea_bottom_right_left">
                        <p style="margin: 0;">已划分区域设备</p>
                        <el-input v-model="leftMAC" :maxlength=MAClength size='mini' placeholder="请输入MAC" style='width:165px;'></el-input>
                        <el-button @click="leftSearch" size='mini' type="success">搜索</el-button>
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
                            label="产品型号"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="leftSizeChange"
                            @current-change="leftCurrentChange"
                            :current-page="LeftPageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="leftPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="leftTotal">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="equipmentArea_bottom_right_center">
                        <div style="margin-top:40px;"><el-button @click="theleft" type="primary" size='small' icon="arrow-left">加入组</el-button></div>
                        <div style="margin-top:20px;"><el-button @click="theright" type="primary" size='small'>移出组<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
                        <div style="margin-top:20px;"><el-button @click="savedata" type="primary" style='' size='small'>保存</el-button></div>
                    </div>
                    <div class="equipmentArea_bottom_right_right">
                        <p style="margin: 0;">未划分区域设备</p>
                        <el-input v-model="rightMAC" :maxlength=MAClength size='mini' placeholder="请输入MAC" style='width:165px;'></el-input>
                        <el-button @click="rightSearch" size='mini' type="success">搜索</el-button>
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
                            label="产品型号"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="rightSizeChange"
                            @current-change="rightCurrentChange"
                            :current-page="rightPageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="rightPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="rightTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加/修改区域模态框 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabels" style="text-align:left;">添加区域</h4>
                    </div>
                    <div class="modal-body">
                        <div class="equipmentArea_form">
                            <span><i class="required">*</i>区域名称:</span>
                            <input v-model="areaName" type="text" maxlength="15" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入区域名称">
                        </div>
                        <div class="equipmentArea_form">
                            <span>备注:</span>
                            <input type="text" v-model.lazy="remark" maxlength="50" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入备注">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">提交更改</button>
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
                dataTree:[],
                defaultProps:{
                    children: 'groups',
                    label: 'label'
                },
                leftTreeChange:[],
                areaName:'',
                remark:'',
                addType:'0',//判断是添加还是修改
                MAClength:17,

                dataleft:[],//左侧基本数据
                leftchangedata:[],//左侧选中数据
                LeftPageIndex:1,
                leftPageSize:10,
                leftTotal:10,
                leftMAC:'',

                dataright:[],//右侧基本数据
                rightchangedata:[],//右侧选中数据
                rightPageIndex:1,
                rightPageSize:10,
                rightTotal:10,
                rightMAC:'',
                leftdata:[],//往左侧移动数据id
                rightdata:[],//往右侧移动数据id
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
                    url:localStorage.serverurl+'system/getUserPrivilege',
                    data:{
                        menuId:sessionStorage.menuId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },200)
        },
        methods:{
            //初始化左侧树
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    url:localStorage.serverurl+'equipment/getAreaTree',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataTree = data.result[0].groups	
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            // 左侧树选中事件
            handleNodeClick(val){
                this.leftTreeChange = val
                this.rightReady()
            },
            //添加  修改  删除
            add(val){
                var that = this;
                if(that.leftTreeChange.length==0){
                    that.$message({
                        message: '请选择区域进行操作!',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(val=='0'){
                    //添加
                    if(that.leftTreeChange.level=='5'){
                        that.$message({
                            message: '最多添加五级区域!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    $('#myModal').modal('show')
                    $('#myModalLabels').text('添加区域')
                    that.addType = '0'
                    that.areaName = ''
                    that.remark = ''
                }
                if(val=='1'){
                    if(that.leftTreeChange.type=='0'){
                        that.$message({
                            message: '组织节点不可操作!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    //修改
                    $('#myModal').modal('show')
                    $('#myModalLabels').text('修改区域')
                    that.addType = '1'
                    that.areaName = that.leftTreeChange.areaName
                    that.remark = that.leftTreeChange.remark
                }
                if(val=='2'){
                    //删除
                    that.$confirm('删除区域将删除此区域下所有设备,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type:'post',
                            async:true,
                            url:localStorage.serverurl+'equipment/delArea',
                            dataType:'json',
                            xhrFields:{withCredentials:true},
                            data:{
                                areaId:that.leftTreeChange.areaId
                            },
                            success:function(data){
                                if(data.errorCode=='0'){
                                    that.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    });  
                                    that.ready();
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
            //添加/修改区域保存
            addSubmit(){
                var that = this;
                var url = '';
                var level = '';
                var parentId = '';
                if(that.areaName==''){
                    that.$message({
                        type: 'error',
                        message: '必填字段不能为空'
                    });  
                    return;
                }
                if(that.leftTreeChange.type=='0'){
                    level=0+1
                    parentId='0'
                }else{
                    level=that.leftTreeChange.level+1
                    parentId = that.leftTreeChange.areaId	
                }
                var data = {
                    departmentId:that.leftTreeChange.departmentId,
                    areaName:that.areaName,
                    remark:that.remark,
                    parentId:parentId,
                    level:level
                }
                if(that.addType=='0'){
                    url='/equipment/saveArea'
                }
                if(that.addType=='1'){
                    url='/equipment/editArea'
                    data.areaId = that.leftTreeChange.areaId
                }
                $.ajax({
                    type:'post',
                    async:true,
                    url:localStorage.serverurl+url,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.ready()
                            $('#myModal').modal('hide')
                            that.$message({
                                message: '操作成功!',
                                type: 'success',
                                showClose: true,
                            });
                            
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //获取右侧列表数据
            rightReady(){
                this.leftdatas();
                this.rightdatas();
            },
            // 左侧数据列表
            leftdatas(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    url:localStorage.serverurl+'equipment/getEquipmentByArea',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        areaId:that.leftTreeChange.areaId,
                        departmentId:that.leftTreeChange.departmentId,
                        MAC:that.leftMAC,
                        pageIndex:that.LeftPageIndex,
                        pageSize:that.leftPageSize
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataleft = data.rows;
                            that.leftTotal = data.total;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //右侧数据列表
            rightdatas(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    url:localStorage.serverurl+'equipment/getCanAreaedEquipment',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        areaId:that.leftTreeChange.areaId,
                        departmentId:that.leftTreeChange.departmentId,
                        MAC:that.rightMAC,
                        pageIndex:that.rightPageIndex,
                        pageSize:that.rightPageSize
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataright = data.rows
                            that.rightTotal = data.total;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //左侧数据变化
            SelectionChangeLeft(val){
                this.leftchangedata = val
            },
            leftSizeChange(val){
                this.leftPageSize = val
                this.leftdatas();
            },
            leftCurrentChange(val){
                this.LeftPageIndex = val
                this.leftdatas();
            },
            leftSearch(){
                this.leftdatas();
            },
            //右侧数据变化
            SelectionChangeRight(val){
                this.rightchangedata = val
            },
            rightSizeChange(val){
                this.rightPageSize = val
                this.rightdatas();
            },
            rightCurrentChange(val){
                this.rightPageIndex = val
                this.rightdatas();
            },
            rightSearch(){
                this.rightdatas();
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
            //保存
            savedata(){
                var that = this;
                console.log(this.leftdata.join(','),this.rightdata.join(','))
                $.ajax({
                    type:'post',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:localStorage.serverurl+'equipment/setEquipmentArea',
                    data:{
                        addEquipmentIds:that.leftdata.join(','),
                        removeEquipmentIds:that.rightdata.join(','),
                        areaId:this.leftTreeChange.areaId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type: 'success',
                                showClose: true,
                            });
                            that.rightReady()
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
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.equipmentArea{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentArea_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentArea_nav>i{font-size: 23px;}
.equipmentArea_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentArea_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.equipmentArea_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.equipmentArea_bottom_left{width: 200px;height: 100%;border-right: 1px solid #c4c4c4;}
.equipmentArea_bottom_left>div{border: none;text-align: left;}
.equipmentArea_bottom_right{position: absolute;left: 200px;right: 1px;height: 100%;width:auto;overflow: auto;}
.equipmentArea_bottom_right_left{position: absolute;left: 0;width: 45%;height: 100%;padding: 5px;}
.equipmentArea_bottom_right_center{position: absolute;left: 45%;width: 10%;height: 100%;}
.equipmentArea_bottom_right_right{position: absolute;left: 55%;width: 45%;height: 100%;padding: 5px;}

.required{color: red;}
.equipmentArea_form{display: flex;width: 280px;margin: 0 auto 10px;}
.equipmentArea_form>span{width: 85px;line-height: 34px;font-size: 15px;}
.equipmentArea_form>input{height: 36px;width: 71%;}
</style>
