<template>
    <div class="imgcoordinate_A">
        <div class="imgcoordinate_nav">
            {{$t('equipmentLocation.DeviceManagement')}}<i class="iconfont icon-icon"></i>{{$t('equipmentLocation.EquipmentPositioning')}}
        </div>
        <div class="imgcoordinate_main">
            <div class="imgcoordinate_A_top">
                <el-button @click="Goback" type="primary" size='small' icon="arrow-left">{{$t('equipmentLocation.ReturnToTheNextLevel')}}</el-button>
            </div>
            <div class="imgcoordinate_A_bottom">
                <div class="imgcoordinate">
                    <img :src=serverurl+imgUrl alt="" @mouseup="uplift" style="width: 100%;height: 100%;opacity: 0.6;">
                    <template v-for="item in imgdata">
                        <template v-if='item.equipmentType=="0"'>
                            <img v-if='item.online=="0"' :key="item.id" :title=item.MAC @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/offlineG.png'">
                            <img v-if='item.online=="1"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/greenG.png'">
                            <img v-if='item.online=="2"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'TSBM-Manager/img/mapimg/redG.png'">
                        </template>
                        <template v-if='item.equipmentType=="1"'>
                            <img v-if='item.online=="0"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/offlineC.png'">
                            <img v-if='item.online=="1"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/greenC.png'">
                            <img v-if='item.online=="2"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/redC.png'">
                        </template>
                        <template v-if='item.equipmentType=="2"'>
                            <img v-if='item.online=="0"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/offlineA.png'">
                            <img v-if='item.online=="1"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/greenA.png'">
                            <img v-if='item.online=="2"' :key="item.id" :title=item.MAC  @mouseup="uplifttwo" :id=item.MAC :style="`left:${item.x}px;top:${item.y}px;`" class="img-i" :src="serverurl+'img/mapimg/redA.png'">
                        </template>
                    </template>
                    <div class="contextmenu" :style="styleObject" v-if="opction">
                        <el-button @click="addWIFI" type="primary" size="small" icon="plus">{{$t('equipmentLocation.AddDevice')}}</el-button>
                        <el-button @click="cancel" type="primary" size="small" icon="circle-cross">{{$t('equipmentLocation.Cancel')}}</el-button>
                    </div>
                    <div class="contextmenu" :style="styleObjecttwo" v-if="opctiontwo">
                        <el-button @click="addWIFItwo" type="primary" size="small" icon="plus">{{$t('equipmentLocation.DeletingEquipment')}}</el-button>
                        <el-button @click="canceltwo" type="primary" size="small" icon="circle-cross">{{$t('equipmentLocation.Cancel')}}</el-button>
                    </div>
                    <!-- 模态框（Modal） -->
                    <div class="modal fade" id="myModalWIFI" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog" style="width:650px;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="myModalLabel">{{$t('equipmentLocation.AddDevice')}}</h4>
                                </div>
                                <div class="modal-body">
                                    <!-- <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#1986F2;margin-right:20px;">tsbc</i>
                                    <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#f4ea2a;margin-right:20px;">tsbg</i>
                                    <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#1afa29;">tsba</i> -->
                                    <div>
                                        <el-radio-group v-model.lazy="radio2" @change="selected">
                                            <el-radio :label="1">tsbc</el-radio>
                                            <el-radio :label="0">tsbg</el-radio>
                                            <el-radio :label="2">tsba</el-radio>
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
                                            :label="$t('equipmentLocation.DeviceName')"
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
                                            :label="$t('equipmentLocation.HardwareModel')"
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
                                    <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('equipmentLocation.Close')}}</button>
                                    <button type="button" @click="ZBsubmit" class="btn btn-primary">{{$t('equipmentLocation.Save')}}</button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div>
                    </div><!-- /.modal -->
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
                serverurl:localStorage.serverurl,
                imgIds:sessionStorage.imgIds,
                imgUrl:sessionStorage.imgUrl,
                opction:false,
                opctiontwo:false,
                styleObject: {
                    left: '',
                    top: ''
                },
                styleObjecttwo:{
                    left: '',
                    top: ''
                },
                radio2:0,
                opctionsdata:[],
                pagechange:1,
                sizes:10,
                total:10,
                pageSize:10,
                pageIndex:1,
                handleCurrent:[],
                imgdata:[],

                delectedId:'',
                delectedType:'',
            }
        },
        methods:{
            //背景鼠标右键事件
            uplift(ev){
                var that = this
                ev = ev || window.event;
                var btn = ev.button;
                if( btn == 2){
                    var x = ev.offsetX 
                    var y = ev.offsetY
                    var vx = $('.imgcoordinate').width() , vy = $('.imgcoordinate').height()
                    var mw =  120, mh =  110;
                    var lefts,tops;
                    if(x + mw>vx){
                        lefts = vx - mw
                    }else{
                        lefts = x
                    }
                    if(y + mh>vy){
                        tops = vy - mh
                    }else{
                        tops = y
                    }
                    that.styleObject = {
                        left: lefts+"px",
                        top: tops+"px"
                    }
                    sessionStorage.clientX = ev.offsetX - 13
                    sessionStorage.clientY = ev.offsetY - 30
                    that.opction = true 
                } 
            }, 
            //设备坐标右键事件 
            uplifttwo(ev){
                var that = this;
                var btn = ev.button;
                if(btn==2){
                    for(var i = 0;i<that.imgdata.length;i++){
                        if(ev.target.id==that.imgdata[i].MAC){
                            var x = '';var y = '';
                            x = Number(that.imgdata[i].x)+15;y=Number(that.imgdata[i].y)+15;
                            that.styleObjecttwo.left = x +"px",
                            that.styleObjecttwo.top = y +"px"
                            that.delectedId = that.imgdata[i].id
                            that.delectedType = that.imgdata[i].equipmentType
                        }
                    }
                    that.opctiontwo = true;
                }
            },
            //设备坐标删除
            addWIFItwo(){
                var that = this
                if(localStorage.Deleteequipments=='false'){
                    that.$message({
                        type: 'error',
                        message: that.$t('equipmentLocation.YouDoNotHaveThisAuthority')
                    });
                }else{
                    this.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
                    type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type:'post',
                            async:true,
                            dataType:'json',
                            xhrFields:{withCredentials:true},
                            url:that.serverurl+'location/removeLocatedEquitment',
                            data:{
                                equitmentId:that.delectedId,
                                equitmentType:that.delectedType
                            },
                            success:function(data){
                                if(data.errorCode=='0'){
                                    that.$message({
                                        type: 'success',
                                        message: that.$t('FalseHints.DeleteSuccess'),
                                    });
                                    that.opctiontwo = false;
                                    that.ready()
                                }else{
                                    that.errorCode(data)
                                }
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: that.$t('FalseHints.Undelete'),
                        });          
                    });
                }
            },
            //选中设备change事件
            handleCurrentChange(val){
                this.handleCurrent = val
            },
            //设备类型change事件
            selected(val){
                this.opctiondata()
            },
            //所有条数事件
            sizechange(val){
                this.pageSize = val
                this.opctiondata()
            },
            //所有页数事件
            currentchange(val){
                this.pageIndex = val
                this.opctiondata()
            },
            //获取弹窗数据
            opctiondata(){
                var that = this
                var url='equipment/getEquipmentList'
                $.ajax({
                    type:'GET',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        type:that.radio2,
                        departmentId:sessionStorage.departmentimgIds
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.opctionsdata = data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //添加wifi弹窗
            addWIFI(){
                var that = this
                if(localStorage.addequipments == 'false'){
                    that.$message({
                        type: 'error',
                        message: that.$t('equipmentLocation.YouDoNotHaveThisAuthority'),
                    });
                }else{
                    $('#myModalWIFI').modal('show')
                    this.opction = false
                    this.opctiondata()
                }
            },
            //添加WIFI提交
            ZBsubmit(){
                var that = this;
                if(this.handleCurrent.length>=2||this.handleCurrent.length==0){
                    that.$message({
                        message: that.$t('equipmentLocation.PleaseSelectADeviceToAave'),
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var that = this
                var coord=[sessionStorage.clientX,sessionStorage.clientY]
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'location/setEquitmentLocationByImg',
                    data:{
                        imgId:sessionStorage.imgIds,
                        equitmentId:that.handleCurrent[0].id,
                        coord:coord.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: that.$t('FalseHints.AddSuccess'),
                                type:'success',
                                showClose: true,
                            });
                            $('#myModalWIFI').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //取消按钮
            cancel(){
                this.opction = false
            },
            canceltwo(){
                this.opctiontwo = false;
            },
            //返回上一级
            Goback(){
                this.$router.push({'path':'/equipmentLocation'})
            },
            //获取平面图定位设备
            ready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'location/getLocatedEquitmentByImg',
                    data:{
                        imgId:sessionStorage.imgIds
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.imgdata = data.result
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
        },
        created(){
            var that = this
            document.oncontextmenu = function(){
                return false;
            }
            this.ready()
        }
    }
</script>
<style scoped>
.imgcoordinate_A{width: 100%;height: 100%;padding: 15px;position: relative;}
.imgcoordinate_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.imgcoordinate_nav>i{font-size: 23px;}
.imgcoordinate_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.imgcoordinate_A_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.imgcoordinate_A_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;overflow: auto;display: flex;justify-content: center;align-items: center;}

.imgcoordinate{width: 950px;height: 600px;position: relative;}
.contextmenu{width: 110px;background: #D3DCE6;box-shadow: 1px 1px 10px;border-radius:3px;position: absolute;}
.contextmenu>button{margin:0;margin-bottom: 5px;width: 100%;}
.img-i{position: absolute;width: 25px;height: 30px;}
</style>
