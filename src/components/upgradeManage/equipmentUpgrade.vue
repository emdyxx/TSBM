<template>
    <div class="equipmentUpgrade">
        <!-- <div class="equipmentUpgrade_nav">
            {{$t('equipmentUpgrade.DeviceManagement')}}<i class="iconfont icon-icon"></i>{{$t('equipmentUpgrade.EquipmentUpgradePackage')}}
        </div> -->
        <div class="equipmentUpgrade_main">
            <div class="equipmentUpgrade_top">
                <el-button v-if="uploading" type="primary" icon="upload2" size="small" @click="upload">{{$t('equipmentUpgrade.UpgradePackageUpload')}}</el-button>
                <el-button v-if="revamp" type="primary" icon='edit' size="small" @click="upgradepatchamend">{{$t('equipmentUpgrade.UpgradePackageGroupingModification')}}</el-button>
                <el-button v-if="remove" type="primary" icon='delete2' size="small" @click="upgradepatchdelete">{{$t('equipmentUpgrade.DeleteUpgradePackage')}}</el-button>
                <div class="equipmentUpgrade_top_div">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="search"
                        style="width:150px;">
                    </el-input>
                    <span style="display:inline-block;width:75px;margin-left:10px;">{{$t('equipmentUpgrade.UpgradePackageStatus')}}:</span>
                    <el-select @change="search" v-model.lazy="value4" style="width:96px;" size='small' clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!--上传模态框-->
            <div class="modal fade" id="upgrademyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:600px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 v-if="opctions=='0'" class="modal-title" id="myModalLabel" style="text-align:left;">{{$t('equipmentUpgrade.UpgradePackageUpload')}}</h4>
                            <h4 v-if="opctions=='1'" class="modal-title" id="myModalLabel" style="text-align:left;">{{$t('equipmentUpgrade.EditUpgradePackage')}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="upload_div" v-if="uploadtype==false">
                                <div v-if='selected'>
                                    <span>{{$t('equipmentUpgrade.SelectionGrouping')}}:</span>
                                    <el-cascader
                                        :options="optionsvalue"
                                        v-model.lazy="selectedOptions"
                                        size='small'
                                        style="width:150px;">
                                    </el-cascader>
                                </div> 
                                <div>
                                    <span>{{$t('equipmentUpgrade.Upgradepackagename')}}:</span>
                                    <input type="file" ref="imgs" name="file" id="file_name">
                                </div> 
                                <div v-if="percentageType" style="padding-left:30px">
                                    <span style="width: 40px;margin-top: -6px;">{{$t('equipmentUpgrade.SpeedOfProgress')}}:</span>
                                    <el-progress :percentage='percentage'></el-progress>
                                </div>
                            </div>
                            <div class="upload_div" v-if="uploadtype">
                                <div>
                                    <span>{{$t('equipmentUpgrade.Upgradepackagename')}}:</span>
                                    <input type="text" v-model.lazy="fileName" disabled>
                                </div> 
                                <div>
                                    <span>{{$t('equipmentUpgrade.SoftwareVersionNumber')}}:</span>
                                    <input type="text" v-model.lazy="softwareVer" disabled>
                                </div> 
                                <div>
                                    <span>{{$t('equipmentUpgrade.SoftwareModel')}}:</span>
                                    <input type="text" v-model.lazy="hardwareVer" disabled>
                                </div> 
                                <div>
                                    <span>MD5:</span>
                                    <input type="text" v-model.lazy="md5" disabled>
                                </div> 
                                <div>
                                    <span>{{$t('equipmentUpgrade.UpgradePackageType')}}:</span>
                                    <input type="text" v-model.lazy="upgradeType" disabled>
                                </div> 
                                <div>
                                    <span>{{$t('equipmentUpgrade.ScopeofApplication')}}:</span>
                                    <el-select size="small" style="width:150px;" v-model="typetwo" @change="uploadscope">
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
                                        @row-click="clickRow"
                                        ref="moviesTable"
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
                                        :label="$t('equipmentUpgrade.DeviceNickname')"
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
                                        :label="$t('equipmentUpgrade.HardwareVersion')"
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
                                        @row-click="clickRow2"
                                        ref="moviesTable2"
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
                                        :label="$t('equipmentUpgrade.GroupName')"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        :label="$t('equipmentUpgrade.HardwareVersion')"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div>
                                    <span>{{$t('equipmentUpgrade.UpgradePackageStatus')}}:</span>
                                    <el-select size="small" v-model.lazy="value" style="width:150px;">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span>{{$t('equipmentUpgrade.Describe')}}:</span>
                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    v-model.lazy="textarea">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button v-if="uploadtype===false" @click="nextstep" type="button" class="btn btn-primary nextsteps">{{$t('equipmentUpgrade.Nextstep')}}</button>
                            <button v-if="uploadtype" @click="uploadsave" type="button" class="btn btn-primary uploadsaves">{{$t('equipmentUpgrade.Save')}}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="equipmentUpgrade_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="equipmentUpgrade_bottom_bottom">
                    <el-table
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @sort-change='sortChange'
                        @row-click="clickRow3"
                        ref="moviesTable3"
                        :data="tableData4"
                        border
                        stripe
                        tooltip-effect="dark"
                        max-height='530'
                        style="width: 100%;"
                        highlight-current-row
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="index"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="fileName"
                        align='center'
                        :label="$t('equipmentUpgrade.Upgradepackagename')"
                        width="230">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="softwareVer"
                        :label="$t('equipmentUpgrade.SoftwareVersionNumber')"
                        align='center'
                        width="210">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="departmentName"
                        :label="$t('equipmentUpgrade.Organization')"
                        align='center'
                        width="140">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="upgradeOrder"
                        :label="$t('equipmentUpgrade.ScopeofApplication')"
                        align='center'
                        width="180">
                            <template scope="scope">
                                <span v-if="scope.row.upgradeOrder=='0'">{{$t('equipmentUpgrade.defineEquipment')}}</span>
                                <span v-if="scope.row.upgradeOrder=='1'">{{$t('equipmentUpgrade.DesignatedGrouping')}}</span>
                                <span v-if="scope.row.upgradeOrder=='2'">{{$t('equipmentUpgrade.SpecifiedModel')}}</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="status"
                        :label="$t('equipmentUpgrade.Status')"
                        align='center'
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.status==0" style="color:#20A0FF">{{$t('equipmentUpgrade.Enabled')}}</span>
                                <span v-if="scope.row.status==1" style="color:#FF4949">{{$t('equipmentUpgrade.disabled')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="summary"
                        :label="$t('equipmentUpgrade.Describe')"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        :label="$t('equipmentUpgrade.Operate')"
                        align='center'
                        width="190"
                        v-if="operationtype==true">
                            <template scope="scope">
                                <span v-if="scope.row.status==0">
                                    <el-button type="danger" @click="forbidden(scope.row)" size="small">{{$t('equipmentUpgrade.disabled')}}</el-button>
                                </span>
                                <span v-if="scope.row.status==1">
                                    <el-button type="primary" @click="startusing(scope.row)" size="small">{{$t('equipmentUpgrade.Enabled')}}</el-button>
                                </span>   
                                <span v-if="setUpgradeBatch">
                                    <el-button @click="LowerHair(scope.row)" type="primary" size='small'>{{$t('equipmentUpgrade.LowerHair')}}</el-button>
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
        <!-- 批量下发模态框1 -->
        <div class="modal fade" id="LowerHairModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">{{$t('equipmentUpgrade.UpgradeIssuedInBatches')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="BatchUpgrades">
                            <div>
                                <!-- 指定设备,指定型号 -->
                                <el-table
                                    @row-click="clickRow4"
                                    ref="moviesTable4"
                                    :data="BatchUpgradesData"
                                    border
                                    style="width:100%;"
                                    tooltip-effect="dark"
                                    @selection-change="handleSelectionChange1">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    :label="$t('equipmentUpgrade.DeviceNickname')"
                                    width="155">
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
                                    width="155">
                                    </el-table-column>
                                    <el-table-column
                                    prop="model"
                                    :label="$t('equipmentUpgrade.Model')"
                                    align='center'>
                                    </el-table-column>
                                </el-table>
                                <div>
                                    <el-pagination
                                    @size-change="BatchUpgradesSizeChange"
                                    @current-change="BatchUpgradesIndexChange"
                                    :current-page="BatchUpgradesIndex"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="BatchUpgradesSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="BatchUpgradesTotal">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('equipmentUpgrade.Close')}}</button>
                        <button @click="BatchUpgradesSubmit" type="button" class="btn btn-primary">{{$t('equipmentUpgrade.confirm')}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
        <!-- 批量下发模态框2 -->
        <div class="modal fade" id="LowerHairModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">{{$t('equipmentUpgrade.UpgradeIssuedInBatches')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="BatchUpgrades">
                            <div>
                                <el-table
                                    @row-click="clickRow5"
                                    ref="moviesTable5"
                                    :data="tableData2"
                                    border
                                    style="width:100%;"
                                    tooltip-effect="dark"
                                    @selection-change="handleSelectionChange2">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    align='center'
                                    :label="$t('equipmentUpgrade.DeviceNickname')"
                                    width="155">
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
                                    width="155">
                                    </el-table-column>
                                    <el-table-column
                                    prop="model"
                                    :label="$t('equipmentUpgrade.Model')"
                                    align='center'>
                                    </el-table-column>
                                </el-table>
                                <div>
                                    <el-pagination
                                    @size-change="BatchUpgradesSizeChange2"
                                    @current-change="BatchUpgradesIndexChange2"
                                    :current-page="BatchUpgradesIndex2"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="BatchUpgradesSize2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="BatchUpgradesTotal2">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('equipmentUpgrade.Close')}}</button>
                        <button @click="BatchUpgradesSubmit" type="button" class="btn btn-primary">{{$t('equipmentUpgrade.confirm')}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
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
                setUpgradeBatch:false,
                serverurl:localStorage.serverurl,
                loading:false,
                tableData4:[],
                sites:[],
                sizes:10,
                currentPage4:1,
                total:100,
                input:'',
                options:[],
                value:0,
                optionstwo:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                valuetwo:'',
                optionsthree:[],
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
                keyword:'',//检索条件
                value4:'',
                tableData6:[],
                sitesthr:[],
                opctions:'',
                upgradeFileId:'',
                //指定型号,指定设备
                BatchUpgradesData:[],
                BatchUpgradesIndex:1,
                BatchUpgradesSize:10,
                BatchUpgradesTotal:10,
                //指定分组
                tableData2:[],
                BatchUpgradesIndex2:1,
                BatchUpgradesSize2:10,
                BatchUpgradesTotal2:10,
                typeData:0,
                BatchUpgradesVal:'',
                dataSize1:[],
                dataSize2:[],
                props:'',//排序字段
                orders:'',
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
                                if(data.result[i].code=='setUpgradeBatch'){
                                    that.setUpgradeBatch = true
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
            clickRow2(row){
                this.$refs.moviesTable2.toggleRowSelection(row)
            },
            clickRow3(row){
                this.$refs.moviesTable3.toggleRowSelection(row)
            },
            clickRow4(row){
                this.$refs.moviesTable4.toggleRowSelection(row)
            },
            clickRow5(row){
                this.$refs.moviesTable5.toggleRowSelection(row)
            },
            //点击批量下发按钮
            LowerHair(val){
                var that = this;
                if(val.status=='1'){
                    that.$message({
                        message: that.$t('equipmentUpgrade.UpgradePackageForbiddenDtate'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                if(val.upgradeOrder=='0'||val.upgradeOrder=='2'){
                    this.typeData = val.upgradeOrder
                    $('#LowerHairModal').modal('show')
                }else if(val.upgradeOrder=='1'){
                    this.typeData = val.upgradeOrder
                    $('#LowerHairModal2').modal('show')
                }else{
                    that.$message({
                        message: that.$t('equipmentUpgrade.NoSpecifiedBatchUpgrade'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                that.BatchUpgradesVal = val
                that.BatchUpgradesReady(val)
            },
            //获取 设备列表
            BatchUpgradesReady(val){
                var that = this;
                var data={};
                data.id = val.id
                if(that.typeData=='0'||that.typeData=='2'){
                    data.pageIndex = that.BatchUpgradesIndex
                    data.pageSize = that.BatchUpgradesSize
                }
                if(that.typeData=='1'){
                    data.pageIndex = that.BatchUpgradesIndex2
                    data.pageSize = that.BatchUpgradesSize2
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/getEquipmentByUpgradeFile',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.typeData=='0'||that.typeData=='2'){
                                that.BatchUpgradesData = data.rows
                                that.BatchUpgradesTotal = data.total
                            }
                            if(that.typeData=='1'){
                                that.tableData2 = data.rows
                                that.BatchUpgradesTotal2 = data.total
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //批量升级  指定设备,指定型号
            handleSelectionChange1(val){
                this.dataSize1 = val
            },
            BatchUpgradesSizeChange(val){
                this.BatchUpgradesSize = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            BatchUpgradesIndexChange(val){
                this.BatchUpgradesIndex = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            //批量升级  指定分组
            handleSelectionChange2(val){
                this.dataSize2 = val
            },
            BatchUpgradesSizeChange2(val){
                this.BatchUpgradesSize2 = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            BatchUpgradesIndexChange2(val){
                this.BatchUpgradesIndex2 = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            //批量升级确定按钮
            BatchUpgradesSubmit(){
                var that = this;
                var data = {}
                var arr = []
                if(that.typeData=='0'||that.typeData=='2'){
                    if(that.dataSize1.length=='0'){
                        that.$message({
                            message: '请选择设备进行操作!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                }
                if(that.typeData=='1'){
                    if(that.dataSize2.length=='0'){
                        that.$message({
                            message: '请选择分组进行操作!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                }
                if(that.typeData=='0'||that.typeData=='2'){
                    for(var i = 0;i<that.dataSize1.length;i++){
                        arr.push(that.dataSize1[i].id)
                    }
                }
                if(that.typeData=='1'){
                    for(var i = 0;i<that.dataSize2.length;i++){
                        arr.push(that.dataSize2[i].id)
                    }
                }
                data.upgradeFileId = that.BatchUpgradesVal.id
                data.equipmentIds = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/setBatchUpgrade',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            $('#LowerHairModal').modal('hide')
                            $('#LowerHairModal2').modal('hide')
                            that.$message({
                                message: that.$t('equipmentUpgrade.Successes'),
                                type: 'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })  
            },
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
                        message:that.$t('equipmentUpgrade.OnlyCanBeSelected'),
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
                                that.errorCode(data)
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
                                that.optionsvalue = data.result
                            }else{
                                that.errorCode(data)
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
                $('.nextsteps').attr('disabled',true)
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
                    $('.nextsteps').attr('disabled',false)
                    if(data.errorCode=='0'){
                        that.percentage = 100  //进度条
                        that.$message({
                            message:that.$t('equipmentUpgrade.UploadSuccess'),
                            type:'success',
                            showClose: true,
                        });
                        that.percentageType = false;
                        that.uploadtype = data.result;
                        that.departmentId = data.result.departmentId
                        that.uploadtype = true;
                        that.fileName = data.result.fileName;
                        that.softwareVer = data.result.softwareVer;
                        that.hardwareVer = data.result.modelVer;
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
                        that.textarea = ''
                        that.percentage = 0  //进度条
                    }else{
                        that.percentageType = false;
                        that.percentage = 0  //进度条
                        that.errorCode(data)
                    }
                }).fail(function(res) {
                    $('.nextsteps').attr('disabled',false)
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
                $('.uploadsaves').attr('disabled',true)
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
                            modelVer:that.hardwareVer,
                            status:that.value,
                            summary:that.textarea,
                            equipmentIds:equipmentIds.join(','),
                            groupids:groupids.join(',')
                        },
                        success:function(data){
                            $('.uploadsaves').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('equipmentUpgrade.SaveSuccess'),
                                    type:'success',
                                })
                                $('#upgrademyModal').modal('hide');
                                that.ready()
                            }else{
                                that.errorCode(data)
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
                            $('.uploadsaves').attr('disabled',false)
                            if(data.errorCode=='0'){
                                that.$message({
                                    message:that.$t('equipmentUpgrade.SaveSuccess'),
                                    type:'success',
                                })
                                $('#upgrademyModal').modal('hide');
                                that.ready()
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
            },
            //点击升级包分组修改
            upgradepatchamend(){
                var that = this
                if(this.sites.length=='0'||this.sites.length>1){
                    that.$message({
                        message: that.$t('equipmentUpgrade.PleaseSelectModification'),
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length=='1'){
                    that.opctions = '1'
                    that.uploadtype = true;
                    that.fileName = that.sites[0].fileName
                    that.softwareVer = that.sites[0].softwareVer
                    that.hardwareVer = that.sites[0].modelVer
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
                if(this.sites.length=='0'||this.sites.length>1){
                    that.$message({
                        message: that.$t('equipmentUpgrade.PleaseToDelete'),
                        type:'error',
                    })
                    return;
                }
                if(this.sites.length=='1'){
                    that.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
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
                                        message:that.$t('FalseHints.DeleteSuccess'),
                                        type:'success'
                                    })
                                    that.ready()
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

            //列表状态操作
            startusing(val){
                var that = this
                if(that.operationtype==false){
                    that.$message({
                        message:that.$t('FalseHints.YouDoNotHaveThisAuthority'),
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
                                message: that.$t('FalseHints.UpgradeLaunched'),
                                type:'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            forbidden(val){
                var that = this
                if(that.operationtype==false){
                    that.$message({
                        message: that.$t('FalseHints.YouDoNotHaveThisAuthority'),
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
                                message:that.$t('FalseHints.UpgradePackageDisabled'),
                                type:'success',
                                showClose: true,
                            });
                            that.ready()
                        }else{
                            that.errorCode(data)
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
                        keyword:that.keyword,
                        status:that.value4,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data)
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
            if(localStorage.locale=='en'){
                this.optionsthree = [{value:0,label:'define equipment'},{value:1,label:'Designated grouping'},{value:2,label:'Specified model'}]
                this.options = [{value:1,label:'Disable'},{value:0,label:'Enabled'}]
            }else{
                this.optionsthree = [{value:0,label:'指定设备'},{value:1,label:'指定分组'},{value:2,label:'指定型号'}]
                this.options = [{value:1,label:'禁用'},{value:0,label:'启用'}]
            }
        }
    }
</script>
<style scoped>
.equipmentUpgrade{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUpgrade_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentUpgrade_nav>i{font-size: 23px;}
.equipmentUpgrade_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentUpgrade_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;display: flex;align-items: center;}
.equipmentUpgrade_top_div{height: 29px;margin-left: 20px;display: flex}
.equipmentUpgrade_top_div>span{line-height: 29px;font-size: 16px}


.equipmentUpgrade_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;}
.equipmentUpgrade_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.equipmentUpgrade_bottom_top>div{display: flex;margin-top: 4px;}
.equipmentUpgrade_bottom_top>div>span{width: 170px;line-height: 30px;}
.equipmentUpgrade_bottom_top>div>input{height: 30px;width: 161px;}
.equipmentUpgrade_bottom_top>div>div{height: 30px;width: 140px;}
.equipmentUpgrade_bottom_bottom{position: absolute;top:0;bottom: 0;width: 100%;padding: 5px;overflow: auto;}
.upload_div{width: 450px;margin:0 auto;}
.upload_div>div{display: flex;margin-bottom: 5px;}
.upload_div>div>span{display:inline-block;line-height: 30px;width:40%;text-align: right;}
.upload_div>div>div{width: 75%;}
.upload_div>div>input{height: 26px;}
.BatchUpgrades{width: 100%;height:auto;max-height:350px;position: relative;}
.BatchUpgrades>div{width: 100%;}
</style>          