<template>
    <div class="equipmentArea">
        <!-- <div class="equipmentArea_nav">
            {{$t('equipmentArea.DeviceManagement')}}<i class="iconfont icon-icon"></i>{{$t('equipmentArea.DistrictManagement')}}
        </div> -->
        <div class='equipmentArea_main'>
            <div class="equipmentArea_top">
                <el-button v-if="saveArea" @click="add(0)" type="primary" icon="plus " size="small">{{$t('equipmentArea.AdditionRegion')}}</el-button>
                <el-button v-if="editArea" @click="add(1)" type="primary" icon="edit" size="small">{{$t('equipmentArea.ModifierArea')}}</el-button>
                <el-button v-if="deleteArea" @click="add(2)" type="primary" icon="delete" size="small">{{$t('equipmentArea.DeleteArea')}}</el-button>
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
                        <p style="margin: 0;">{{$t('equipmentArea.PartitionedAreaEquipment')}}</p>
                        <el-input
                            icon="search"
                            size='mini'
                            :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                            v-model="keyword"
                            @change="leftSearch"
                            style="width:150px;">
                        </el-input>
                        <el-table
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange2'
                            @row-click="clickRow"
                            ref="moviesTable"
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
                            sortable='custom'
                            :label="$t('equipmentArea.deviceName')"
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
                            sortable='custom'
                            prop="MAC"
                            label="MAC"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="model"
                            align='center'
                            :label="$t('equipmentArea.productModel')"
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
                        <div style="margin-top:40px;"><el-button @click="theleft" type="primary" size='small' icon="arrow-left">{{$t('equipmentArea.JoinGroup')}}</el-button></div>
                        <div style="margin-top:20px;"><el-button @click="theright" type="primary" size='small'>{{$t('equipmentArea.RemovalGroup')}}<i class="el-icon-arrow-right el-icon--right"></i></el-button></div>
                        <div v-if="setEquipmentArea" style="margin-top:20px;"><el-button @click="savedata" type="primary" style='' size='small'>{{$t('equipmentArea.Save')}}</el-button></div>
                    </div>
                    <div class="equipmentArea_bottom_right_right">
                        <p style="margin: 0;">{{$t('equipmentArea.UndividedAreaEquipment')}}</p>
                        <el-input
                            icon="search"
                            size='mini'
                            :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                            v-model="keyword2"
                            @change="rightSearch"
                            style="width:150px;">
                        </el-input>
                        <el-table
                            :default-sort = "{prop: 'date', order: 'descending'}"
                            @sort-change='sortChange'
                            @row-click="clickRow2"
                            ref="moviesTable2"
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
                            sortable='custom'
                            prop="nickname"
                            :label="$t('equipmentArea.deviceName')"
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
                            sortable='custom'
                            prop="MAC"
                            label="MAC"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            sortable='custom'
                            prop="model"
                            align='center'
                            :label="$t('equipmentArea.productModel')"
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
                        <h4 v-if="addType=='0'" class="modal-title" id="myModalLabels" style="text-align:left;">{{$t('equipmentArea.AdditionRegion')}}</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="myModalLabels" style="text-align:left;">{{$t('equipmentArea.ModifierArea')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="equipmentArea_form">
                            <span><i class="required">*</i>{{$t('equipmentArea.RegionName')}}:</span>
                            <input v-model.lazy="areaName" type="text" maxlength="15" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentArea.PleaseEnterTheRegionName')">
                        </div>
                        <div class="equipmentArea_form">
                            <span>{{$t('equipmentArea.Remarks')}}:</span>
                            <input type="text" v-model.lazy="remark" maxlength="50" minlength="2" class="form-control" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" :placeholder="$t('equipmentArea.PleaseEnterNotes')">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('equipmentArea.close')}}</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary">{{$t('equipmentArea.Save')}}</button>
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
                saveArea:false,
                editArea:false,
                deleteArea:false,
                setEquipmentArea:false,
                serverurl:localStorage.serverurl,
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
                keyword:'',

                dataright:[],//右侧基本数据
                rightchangedata:[],//右侧选中数据
                rightPageIndex:1,
                rightPageSize:10,
                rightTotal:10,
                keyword2:'',
                leftdata:[],//往左侧移动数据id
                rightdata:[],//往右侧移动数据id
                props:'',//排序字段
                orders:'',
                props2:'',//排序字段
                orders2:'',
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
                            // saveArea   editArea  deleteArea  setEquipmentArea
                            for(var i=0;i<data.result.length;i++){
                                if(data.result[i].code=='saveArea'){
                                    that.saveArea = true
                                }
                                if(data.result[i].code=='editArea'){
                                    that.editArea = true
                                }
                                if(data.result[i].code=='deleteArea'){
                                    that.deleteArea = true
                                }
                                if(data.result[i].code=='setEquipmentArea'){
                                    that.setEquipmentArea = true
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
                this.rightdatas()
            },
            sortChange2(column, prop, order){
                this.props2 = column.prop
                this.orders2 = column.order
                this.leftdatas()
            },
            clickRow(row){
                this.$refs.moviesTable.toggleRowSelection(row)
            },
            clickRow2(row){
                this.$refs.moviesTable2.toggleRowSelection(row)
            },
            //初始化左侧树
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    url:that.serverurl+'equipment/getAreaTree',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataTree = data.result
                        }else{
                            that.errorCode(data)
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
                        message: that.$t('equipmentArea.SelectAreaToOperate'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(val=='0'){
                    //添加
                    if(that.leftTreeChange.level=='5'){
                        that.$message({
                            message: that.$t('equipmentArea.AddfiveLevels'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    $('#myModal').modal('show')
                    // $('#myModalLabels').text('添加区域')
                    that.addType = '0'
                    that.areaName = ''
                    that.remark = ''
                }
                if(val=='1'){
                    if(that.leftTreeChange.type=='0'){
                        that.$message({
                            message: that.$t('equipmentArea.Theoperational'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    //修改
                    $('#myModal').modal('show')
                    // $('#myModalLabels').text('修改区域')
                    that.addType = '1'
                    that.areaName = that.leftTreeChange.areaName
                    that.remark = that.leftTreeChange.remark
                }
                if(val=='2'){
                    //删除
                    that.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
                    type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type:'post',
                            async:true,
                            url:that.serverurl+'equipment/delArea',
                            dataType:'json',
                            xhrFields:{withCredentials:true},
                            data:{
                                areaId:that.leftTreeChange.areaId
                            },
                            success:function(data){
                                if(data.errorCode=='0'){
                                    that.$message({
                                        type: 'success',
                                        message:that.$t('FalseHints.DeleteSuccess'),
                                    });  
                                    that.ready();
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
                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
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
                    url='equipment/saveArea'
                }
                if(that.addType=='1'){
                    url='equipment/editArea'
                    data.areaId = that.leftTreeChange.areaId
                }
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+url,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.ready()
                            $('#myModal').modal('hide')
                            that.$message({
                                message: that.$t('FalseHints.SaveSuccess'),
                                type: 'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
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
                    url:that.serverurl+'equipment/getEquipmentByArea',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        areaId:that.leftTreeChange.areaId,
                        departmentId:that.leftTreeChange.departmentId,
                        pageIndex:that.LeftPageIndex,
                        pageSize:that.leftPageSize,
                        keyword:that.keyword,
                        order:that.props2,
                        orderBy:that.orders2
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataleft = data.rows;
                            that.leftTotal = data.total;
                        }else{
                            that.errorCode(data)
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
                    url:that.serverurl+'equipment/getCanAreaedEquipment',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        areaId:that.leftTreeChange.areaId,
                        departmentId:that.leftTreeChange.departmentId,
                        pageIndex:that.rightPageIndex,
                        pageSize:that.rightPageSize,
                        keyword:that.keyword2,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataright = data.rows
                            that.rightTotal = data.total;
                        }else{
                            that.errorCode(data)
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
                $.ajax({
                    type:'post',
                    async:false,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/setEquipmentArea',
                    data:{
                        addEquipmentIds:that.leftdata.join(','),
                        removeEquipmentIds:that.rightdata.join(','),
                        areaId:this.leftTreeChange.areaId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('FalseHints.SaveSuccess'),
                                type: 'success',
                                showClose: true,
                            });
                            that.rightReady()
                            that.leftchangedata = []
                            that.rightchangedata = []
                            that.leftdata = [];
                            that.rightdata = [];
                        }else{
                            that.errorCode(data)
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
.equipmentArea_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
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
