<template>
    <div class="equipmentLocation">
        <div class="equipmentLocation_nav">
            设备管理<i class="iconfont icon-icon"></i>设备定位
            <el-select v-if='selected=="true"' v-model.lazy="selectedOptions" @change="handleChange" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button v-if="uploading" type="primary" style="position:absolute;right:15px;" @click="uploadingimg">上传厂区图片</el-button>
            <!-- 模态框（Modal） -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">上传厂区图片</h4>
                        </div>
                        <div class="modal-body images">
                            <label for="img1">
                                <img :src=imageUrl>
                                <input type="file" ref="img1" id="img1" @change="images">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" @click='imageSubmit' class="btn btn-primary imageSubmit">上传</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
        </div>
        <div class="equipmentLocation_main">
            <el-tabs v-model.lazy="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="厂区定位" name='1' style="height:100%;overflow: auto;">
                    <ul style="list-style: none;display: flex;display: -webkit-flex;flex-direction: row;flex-wrap: wrap;">
                        <li class="flex-item" v-for='(site,key) in sites' :key="site.id">
                            <img :src=site.imgUrl @click="imgrouter(key)">
                            <div class="img_bottom">
                                <span v-if="deletetype" @click="imgdelete(key)">删除</span>
                                <span v-if="revamp" @click="imgamend(key)">修改</span>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="地图定位" name='2' style="height:100%;">
                    <div id="allmap">

                    </div>
                </el-tab-pane>
                <!--地图定位添加定位模态框-->
                <div class="modal fade" id="myModalWIFIMap" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" style="width:650px;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">添加WIFI设备</h4>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <el-radio-group v-model.lazy="radio2" @change="selectedmap">
                                        <el-radio :label="0">
                                            tsbg
                                        </el-radio>
                                        <el-radio :label="1">
                                            tsbc
                                        </el-radio>
                                        <el-radio :label="2">
                                            tsba
                                        </el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="equipment">
                                    <el-table
                                        ref="multipleTable"
                                        :data="opctionsdata"
                                        border
                                        stripe
                                        tooltip-effect="dark"
                                        highlight-current-row
                                        @selection-change="handleCurrentChange"
                                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">  
                                        </el-table-column>
                                        <el-table-column
                                        align='center'
                                        label="设备名称"
                                        width="160">
                                            <template scope="scope">
                                                <span v-if="scope.row.nickname==''">{{scope.row.MAC}}</span>
                                                <span v-else>{{scope.row.nickname}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC"
                                        align='center'
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="硬件型号"
                                        align='center'
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block">
                                        <el-pagination
                                            @size-change="sizechange"
                                            @current-change="currentchange"
                                            :current-page="pagechange"
                                            :page-sizes="[10, 20, 30, 50]"
                                            :page-size="sizes"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                        </el-pagination>
                                    </div> 
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" @click="ZBsubmitMap" class="btn btn-primary">保存</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div>
                </div><!-- /.modal -->
            </el-tabs>            
        </div>
    </div>
</template>  
<script>
    export default{
        name: 'index',
        data () {
            return {
                //按钮权限
                uploading:false,
                deletetype:false,
                revamp:false,
                serverurl:localStorage.serverurl,       
                activeName:'1',
                imageUrl:'',
                dataUrl:'',
                sites:[],
                options:[],
                selectedOptions:'',
                selected:false,
                imgkeyid:'',
                type:'1',
                departmentId:'',
                tabname:'1', //所选择的标签页
                radio2:1,
                opctionsdata:[],
                pagechange:1,
                sizes:10,
                total:100,
                pageIndex:1,
                pageSize:10,
                handleCurrent:[], //选中设备
                mapcood:{},
                mapcoordinate:[],
                getZoom:11, //地图缩放级别
                getlng:120.203479,
                getlat:30.20003,
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
                                if(data.result[i].code=='uploadImg'){
                                    that.uploading = true
                                }
                                if(data.result[i].code=='delImg'){
                                    that.deletetype = true
                                }
                                if(data.result[i].code=='editImg'){
                                    that.revamp = true
                                }
                                if(data.result[i].code=='locEquipment'){
                                    localStorage.addequipments = true
                                }
                                if(data.result[i].code=='removeEquipment'){
                                    localStorage.Deleteequipments = true
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
            //标签页事件
            handleClick(tab){
                if(tab.name=='1'){
                    this.tabname = '1'
                    this.ready()
                }
                if(tab.name=='2'){
                    var that = this
                    this.tabname = '2'
                    this.readytwo()
                    if(sessionStorage.departmentId=='1'){
                        if(this.selectedOptions==''){
                            this.$message({
                                message: '温馨提示:管理员需要选择查看的厂区查看图片',
                                showClose: true,
                            });
                        }
                    }
                }
            }, 
            //管理员选择厂区change事件
            handleChange(val){
                var that = this;
                //厂区定位请求厂区图片
                if(that.tabname=='1'){
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'upload/getPlan',
                        data:{
                            departmentId:that.selectedOptions
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.sites = data.result
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                //百度地图定位请求定位数据以及坐标点
                if(that.tabname=='2'){
                    that.readytwo()
                }
            },
            // 图片转base64位
            imgPreview (file) {
                var that = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
        
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    var reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onloadend = function () {
                        that.imageUrl = this.result;
                    }
                }
            },
            //上传图片change事件
            images(){
                this.imgPreview(this.$refs.img1.files[0])
            },
            //上传图片接口
            imageSubmit(){
                var that = this;
                var formdate = new FormData();
                var number;
                var url='';
                $('.imageSubmit').attr('disabled',true)
                if(this.type=='1'){
                    number = this.sites.length
                    formdate.append("file", this.$refs.img1.files[0]);
                    formdate.append("sort", number+1);
                    url='upload/uploadPlan'
                }
                if(this.type=='2'){
                    formdate.append("file", this.$refs.img1.files[0]);
                    formdate.append("imgId", this.imgkeyid);
                    url='upload/editPlan'
                }
                if(sessionStorage.departmentId=='1'){
                    formdate.append("departmentId", this.selectedOptions);
                }
                $.ajax({
                    url: that.serverurl+url,
                    type: 'POST',
                    cache: false,
                    data: formdate,
                    dataType:'json',
                    processData: false,
                    xhrFields:{withCredentials:true},
                    contentType: false
                }).done(function(res) {
                    if(res.errorCode=='0'){
                        that.$message({
                            message: '上传成功',
                            type:'success',
                            showClose: true,
                        });
                        $('#myModal').modal('hide')
                        $('.imageSubmit').removeAttr('disabled')
                        that.ready()
                    }else{
                        that.errorCode(res.errorCode)
                        $('.imageSubmit').removeAttr('disabled')
                    }
                }).fail(function(res) {
                });
            },
            //页面渲染请求图片
            ready(){
                var that = this;
                if(sessionStorage.departmentId=='1'){
                    if(this.selectedOptions==''){
                        this.$message({
                            message: '温馨提示:管理员需要选择查看的厂区查看图片',
                            showClose: true,
                        });
                    }
                }
                // that.selected = true
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upload/getPlan',
                    data:{
                        departmentId:that.selectedOptions
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.sites = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //页面图片上传
            uploadingimg(){
                this.type='1'
                $('#myModal').modal('show')
            },
            //页面图片修改
            imgamend(key){
                this.imgkeyid = this.sites[key].id
                this.type='2'
                $('#myModal').modal('show')
            },
            //页面图片删除
            imgdelete(key){
                var that = this;
                this.imgkeyid = this.sites[key].id;
                that.$confirm('确认删除此张图片', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'upload/delPlan',
                        data:{
                            imgIds:that.imgkeyid
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
            //点击图片路由跳转
            imgrouter(key){
                sessionStorage.imgIds = this.sites[key].id
                sessionStorage.imgUrl = this.sites[key].imgUrl
                sessionStorage.departmentimgIds=this.selectedOptions
                this.$router.push({'path':'/imgcoordinate'})
            },
            //地图定位渲染
            readytwo(){
                var that = this
                if(sessionStorage.departmentId=='1'){
                    if(this.selectedOptions==''){
                        setTimeout(function(){
                            // 百度地图API功能
                            var map = new BMap.Map("allmap");    // 创建Map实例
                            map.centerAndZoom(new BMap.Point(120.203479,30.20003), that.getZoom);  // 初始化地图,设置中心点坐标和地图级别
                            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                            map.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
                            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                        },500)
                    }else{
                        $.ajax({
                            type:'get',
                            async:false,
                            dataType:'json',
                            xhrFields:{withCredentials:true},
                            url:that.serverurl+'location/getLocatedEquitmentByMap',
                            data:{
                                departmentId:that.selectedOptions
                            },
                            success:function(data){
                                that.mapcoordinate = data.result
                                setTimeout(function(){
                                        // 百度地图API功能  
                                        var map = new BMap.Map("allmap");    // 创建Map实例
                                        map.centerAndZoom(new BMap.Point(that.getlng,that.getlat), that.getZoom);  // 初始化地图,设置中心点坐标和地图级别
                                        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                                        map.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
                                        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                                        //添加鼠标右键事件
                                        var menu = new BMap.ContextMenu();
                                        var txtMenuItem = [
                                            {
                                                text:'添加设备',
                                                callback:function(e){
                                                    if(sessionStorage.departmentId=='1'){
                                                        if(this.selectedOptions==''){
                                                            this.$message({
                                                                message: '请选择厂区进行添加',
                                                                showClose: true,
                                                            });
                                                        }else{
                                                            that.mapcood = e
                                                            console.log()
                                                            if(localStorage.addequipments==false){
                                                                that.$message({
                                                                    message: '您无此权限',
                                                                    showClose: true,
                                                                });
                                                            }else{
                                                                $('#myModalWIFIMap').modal('show')
                                                                that.getZoom = map.getZoom()
                                                                that.getlng = that.mapcood.lng
                                                                that.getlat = that.mapcood.lat
                                                                that.selectedmap()
                                                            }
                                                        } 
                                                    }else{
                                                        that.mapcood = e
                                                        if(localStorage.addequipments==false){
                                                            that.$message({
                                                                message: '您无此权限',
                                                                showClose: true,
                                                            });
                                                        }else{
                                                            $('#myModalWIFIMap').modal('show')
                                                            that.selectedmap()
                                                        }
                                                    } 
                                                }
                                            }
                                        ];
                                        for(var i=0; i < txtMenuItem.length; i++){
                                            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
                                        }
                                        map.addContextMenu(menu);

                                        var greenA = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var greenC = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var greenG = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});

                                        var offlineA = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var offlineC = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var offlineG = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});

                                        var redA = new BMap.Icon(localStorage.serverurl+"img/mapimg/redA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var redC = new BMap.Icon(localStorage.serverurl+"img/mapimg/redC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var redG = new BMap.Icon(localStorage.serverurl+"img/mapimg/redG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                        var marker = new Array();
                                        for(var i=0;i<that.mapcoordinate.length;i++){
                                            var point = new BMap.Point(that.mapcoordinate[i].coord.split(",")[0],that.mapcoordinate[i].coord.split(",")[1]);
                                            if(that.mapcoordinate[i].equipmentType=='0'){ 
                                                if(that.mapcoordinate[i].online=='0'){
                                                    marker[i] = new BMap.Marker(point,{icon:offlineG});
                                                }
                                                if(that.mapcoordinate[i].online=='1'){
                                                    marker[i]  = new BMap.Marker(point,{icon:greenG});
                                                }
                                                if(that.mapcoordinate[i].online=='2'){
                                                    marker[i]  = new BMap.Marker(point,{icon:redG});
                                                }
                                            }
                                            if(that.mapcoordinate[i].equipmentType=='1'){
                                                if(that.mapcoordinate[i].online=='0'){
                                                    marker[i]  = new BMap.Marker(point,{icon:offlineC});
                                                }
                                                if(that.mapcoordinate[i].online=='1'){
                                                    marker[i]  = new BMap.Marker(point,{icon:greenC});
                                                }
                                                if(that.mapcoordinate[i].online=='2'){
                                                    marker[i]  = new BMap.Marker(point,{icon:redC});
                                                }
                                            }
                                            if(that.mapcoordinate[i].equipmentType=='2'){
                                                if(that.mapcoordinate[i].online=='0'){
                                                    marker[i] = new BMap.Marker(point,{icon:offlineA});
                                                }
                                                if(that.mapcoordinate[i].online=='1'){
                                                    marker[i] = new BMap.Marker(point,{icon:greenA});
                                                }
                                                if(that.mapcoordinate[i].online=='2'){
                                                    marker[i] = new BMap.Marker(point,{icon:redA});
                                                }
                                            }
                                            
                                            var label = new BMap.Label(that.mapcoordinate[i].equipmentType,{offset:new BMap.Size(25,5)});
                                            label.setStyle({display:"none"});//对label 样式隐藏
                                            marker[i].setLabel(label);  //把label设置到maker上  
                                            marker[i].setTitle(that.mapcoordinate[i].MAC); //这里设置maker的title 
                                            marker[i].id=that.mapcoordinate[i].id
                                            map.addOverlay(marker[i]); 
                                            that.Listener(marker[i]);
                                        }
                                },500)
                            }
                        })
                    }
                }else{
                    $.ajax({
                        type:'get',
                        async:false,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'location/getLocatedEquitmentByMap',
                        data:{
                            departmentId:that.selectedOptions
                        },
                        success:function(data){
                            that.mapcoordinate = data.result
                            setTimeout(function(){
                                    // 百度地图API功能
                                    var map = new BMap.Map("allmap");    // 创建Map实例
                                    map.centerAndZoom(new BMap.Point(that.getlng,that.getlat), that.getZoom);  // 初始化地图,设置中心点坐标和地图级别
                                    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                                    map.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
                                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                                    //添加鼠标右键事件
                                    var menu = new BMap.ContextMenu();
                                    var txtMenuItem = [
                                        {
                                            text:'添加设备',
                                            callback:function(e){
                                                if(sessionStorage.departmentId=='1'){
                                                    if(this.selectedOptions==''){
                                                        this.$message({
                                                            message: '请选择厂区进行添加',
                                                            showClose: true,
                                                        });
                                                    }else{
                                                        that.mapcood = e
                                                        if(localStorage.addequipments==false){
                                                            that.$message({
                                                                message: '您无此权限',
                                                                showClose: true,
                                                            });
                                                        }else{
                                                            $('#myModalWIFIMap').modal('show')
                                                            that.selectedmap()
                                                        }
                                                    } 
                                                }else{
                                                    that.mapcood = e
                                                    if(localStorage.addequipments==false){
                                                        that.$message({
                                                            message: '您无此权限',
                                                            showClose: true,
                                                        });
                                                    }else{
                                                        $('#myModalWIFIMap').modal('show')
                                                        that.getZoom = map.getZoom()
                                                        that.getlng = that.mapcood.lng
                                                        that.getlat = that.mapcood.lat
                                                        that.selectedmap()
                                                    }
                                                } 
                                            }
                                        }
                                    ];
                                    for(var i=0; i < txtMenuItem.length; i++){
                                        menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
                                    }
                                    map.addContextMenu(menu);

                                    var greenA = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var greenC = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var greenG = new BMap.Icon(localStorage.serverurl+"img/mapimg/greenG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});

                                    var offlineA = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var offlineC = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var offlineG = new BMap.Icon(localStorage.serverurl+"img/mapimg/offlineG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});

                                    var redA = new BMap.Icon(localStorage.serverurl+"img/mapimg/redA.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var redC = new BMap.Icon(localStorage.serverurl+"img/mapimg/redC.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var redG = new BMap.Icon(localStorage.serverurl+"img/mapimg/redG.png", new BMap.Size(25,30),{anchor: new BMap.Size(10, 30),imageOffset: new BMap.Size(0, 0)});
                                    var marker = new Array();
                                    for(var i=0;i<that.mapcoordinate.length;i++){
                                        var point = new BMap.Point(that.mapcoordinate[i].coord.split(",")[0],that.mapcoordinate[i].coord.split(",")[1]);
                                        if(that.mapcoordinate[i].equipmentType=='0'){ 
                                            if(that.mapcoordinate[i].online=='0'){
                                                 marker[i] = new BMap.Marker(point,{icon:offlineG});
                                            }
                                            if(that.mapcoordinate[i].online=='1'){
                                                 marker[i]  = new BMap.Marker(point,{icon:greenG});
                                            }
                                            if(that.mapcoordinate[i].online=='2'){
                                                 marker[i]  = new BMap.Marker(point,{icon:redG});
                                            }
                                        }
                                        if(that.mapcoordinate[i].equipmentType=='1'){
                                            if(that.mapcoordinate[i].online=='0'){
                                                 marker[i]  = new BMap.Marker(point,{icon:offlineC});
                                            }
                                            if(that.mapcoordinate[i].online=='1'){
                                                 marker[i]  = new BMap.Marker(point,{icon:greenC});
                                            }
                                            if(that.mapcoordinate[i].online=='2'){
                                                 marker[i]  = new BMap.Marker(point,{icon:redC});
                                            }
                                        }
                                        if(that.mapcoordinate[i].equipmentType=='2'){
                                            if(that.mapcoordinate[i].online=='0'){
                                                 marker[i] = new BMap.Marker(point,{icon:offlineA});
                                            }
                                            if(that.mapcoordinate[i].online=='1'){
                                                 marker[i] = new BMap.Marker(point,{icon:greenA});
                                            }
                                            if(that.mapcoordinate[i].online=='2'){
                                                 marker[i] = new BMap.Marker(point,{icon:redA});
                                            }
                                        }
                                        
                                        var label = new BMap.Label(that.mapcoordinate[i].equipmentType,{offset:new BMap.Size(25,5)});
                                        label.setStyle({display:"none"});//对label 样式隐藏
                                        marker[i].setLabel(label);  //把label设置到maker上  
                                        marker[i].setTitle(that.mapcoordinate[i].MAC); //这里设置maker的title 
                                        marker[i].id=that.mapcoordinate[i].id
                                        map.addOverlay(marker[i]); 
                                        that.Listener(marker[i]);
                                    }
                            },500)
                        }
                    })
                }
            },
            Listener(marker){
                var that = this
                marker.addEventListener("rightclick",function(e){
                    var id = e.target.id
                    var type = e.target.getLabel().content
                    var menuTwo = new BMap.ContextMenu();
                    menuTwo.addItem(new BMap.MenuItem('删除设备',function(e){
                        if(localStorage.Deleteequipments == false){
                            that.$message({
                                message: '您无此权限',
                                showClose: true,
                            });
                        }else{
                            that.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                that.remove(id,type)
                            }).catch(() => {
                                that.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });  
                            })
                        }
                    }));
                    marker.addContextMenu(menuTwo)
                });
            },
            remove(id,Type){
                var that = this
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'location/removeLocatedEquitment',
                    data:{
                        equitmentId:id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.readytwo()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //单选change事件
            selectedmap(val){
                var that = this
                var url='equipment/getEquipmentList'
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        type:that.radio2,
                        departmentId:that.selectedOptions
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.opctionsdata = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //选中设备change事件
            handleCurrentChange(val){
                this.handleCurrent = val
            },
            //所有条数事件
            sizechange(val){
                this.pageSize = val
                this.selectedmap()
            },
            //所有页数事件
            currentchange(val){
                this.pageIndex = val
                this.selectedmap()
            },
            //地图定位添加坐标保存提交
            ZBsubmitMap(){
                var that = this
                if(this.handleCurrent.length>=2||this.handleCurrent.length==0){
                    that.$message({
                        message: '请选择一个设备进行保存',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var coord=[that.mapcood.lng,that.mapcood.lat]
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'location/setEquitmentLocationByMap',
                    data:{
                        equitmentId:that.handleCurrent[0].id,
                        coord:coord.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '添加成功',
                                type:'success',
                                showClose: true,
                            });
                            that.readytwo()
                            $('#myModalWIFIMap').modal('hide')
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }
        },
        created(){
            var that = this
            //请求用户操作权限
            localStorage.addequipments = false;
            localStorage.Deleteequipments = false;
            if(sessionStorage.departmentId=='1'){
                that.selected = 'true'
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
                            // that.options = data.result
                            // that.selectedOptions = data.result[0].value
                            that.options = data.result[0].children
                            that.selectedOptions = data.result[0].children[0].value
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }else{
                that.selected = false
                this.ready()
            }
        }
        
    }
</script>
<style scoped>
.equipmentLocation{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentLocation_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentLocation_nav>i{font-size: 23px;}
.equipmentLocation_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.flex-item{ padding: 5px;width: 25%;height: 250px;position: relative;}
.flex-item>img{width: 100%;height: 100%;}
.images{text-align: center;}
.images>label{width: 300px;height: 200px;border: 1px dashed #d9d9d9;border-radius: 6px; cursor: pointer;text-align: center;line-height: 65px;position: relative;}
.images img{width: 100%;height: 100%;position: absolute;left: 0;}
.images>label:hover{border-color: #20a0ff;}
.images>label>input{margin-left: -9999px;}
.img_bottom{position: absolute;bottom: 5px;left:5px;right:5px;height: 30px;line-height:30px;display: flex;cursor: pointer;background: #C0CCDA;border-radius: 3px;}
.img_bottom>span{width: 50%;}
.img_bottom>span:hover{background:#99A9BF;}
#allmap{width: 100%;height: 100%;}
</style> 
