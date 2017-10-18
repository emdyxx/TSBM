<template>
    <div class="imgcoordinate" @mouseup="uplift" @mousedown="press">
        <img :src=imgUrl alt="">
        <template v-for="(item,key) in imgdata">
            <i v-if='item.equipmentType==="0"' :style="`left:${item.x}px;top:${item.y}px;color:#F4EA2A;`" @dblclick="upliftTwo(key)" class="iconfont icon-wodeweizhi img-i"></i>
            <i v-if='item.equipmentType==="1"' :style="`left:${item.x}px;top:${item.y}px;color:#1986F2;`" @dblclick="upliftTwo(key)" class="iconfont icon-wodeweizhi img-i"></i>
            <i v-if='item.equipmentType==="2"' :style="`left:${item.x}px;top:${item.y}px;color:#1AFA29;`" @dblclick="upliftTwo(key)" class="iconfont icon-wodeweizhi img-i"></i>
        </template>
        
        <div class="contextmenu" :style="styleObject" v-if="opction">
            <el-button @click="addWIFI" type="primary" size="small" icon="plus">添加WIFI</el-button>
            <el-button @click="Goback" type="primary" size="small" icon="arrow-left">返回上一页</el-button>
            <el-button @click="cancel" type="primary" size="small" icon="circle-cross">取消</el-button>
        </div>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModalWIFI" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:650px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">添加WIFI</h4>
                    </div>
                    <div class="modal-body">
                        <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#1986F2;margin-right:20px;">tsbc</i>
                        <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#f4ea2a;margin-right:20px;">tsbg</i>
                        <i class="iconfont icon-wodeweizhi" style="font-size:18px;color:#1afa29;">tsba</i>
                        <div style="margin-top:30px;">
                            <el-radio-group v-model="radio2" @change="selected">
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
                                prop="nickname"
                                align='center'
                                label="设备名称"
                                width="160">
                                </el-table-column>
                                <el-table-column
                                prop="lanIPX"
                                label="ip地址"
                                align='center'
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="hardwardVersion"
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
                        <button type="button" @click="ZBsubmit" class="btn btn-primary">保存</button>
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
                serverurl:localStorage.serverurl,
                imgIds:sessionStorage.imgIds,
                imgUrl:sessionStorage.imgUrl,
                opction:false,
                styleObject: {
                    left: '',
                    top: ''
                },
                radio2:1,
                opctionsdata:[],
                pagechange:1,
                sizes:10,
                total:100,
                pageSize:10,
                pageIndex:1,
                handleCurrent:[],
                imgdata:[],
                // dialogVisible:false,
                // delectedKey:'',
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
                    var mw =  110, mh =  100;
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
                        left: lefts+15 +"px",
                        top: tops+15 +"px"
                    }
                    sessionStorage.clientX = ev.offsetX
                    sessionStorage.clientY = ev.offsetY
                    that.opction = true 
                } 
            },  
            //小图片双击删除设备事件
            upliftTwo(key){
                var that = this
                this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'location/removeLocatedEquitment',
                        data:{
                            equitmentId:that.imgdata[key].id,
                            equitmentType:that.imgdata[key].equipmentType
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                that.ready()
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
            press(ev){
                // var that = this
                // that.opction = false
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
                var url=''
                if(this.radio2=='0'){
                    url = 'Equipment/getTsbgList'
                }
                if(this.radio2=='1'){
                    url = 'Equipment/getTsbcList'
                }
                if(this.radio2=='2'){
                    url = 'Equipment/getTsbaList'
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize
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
            //添加wifi弹窗
            addWIFI(){
                $('#myModalWIFI').modal('show')
                this.opction = false
                this.opctiondata()
            },
            //添加WIFI提交
            ZBsubmit(){
                if(this.handleCurrent.length>=2){
                    that.$message({
                        message: '只能选择一个设备,请勿多选',
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
                        equitmentType:that.radio2,
                        coord:coord.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '添加成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#myModalWIFI').modal('hide')
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //取消按钮
            cancel(){
                this.opction = false
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
                            // var coord=[];
                            // for(var i=0;i<data.result.length;i++){
                            //     coord = []
                            //     coord = data.result[i].coord.split(',')
                            //     if(data.result[i].equipmentType=='0'){
                            //         $('<i class="iconfont icon-wodeweizhi" style="position: absolute;font-size: 20px;color:#F4EA2A;left:'+coord[0]+"px"+';top:'+coord[1]+"px"+'" @click.native="upliftTwo('+i+')"></i>').appendTo('.imgcoordinate')
                            //     }
                            //     if(data.result[i].equipmentType=='1'){
                            //         $('<i class="iconfont icon-wodeweizhi" style="position: absolute;font-size: 20px;color:#1986F2;left:'+coord[0]+"px"+';top:'+coord[1]+"px"+'" @click.native="upliftTwo('+i+')"></i>').appendTo('.imgcoordinate')
                            //     }
                            //     if(data.result[i].equipmentType=='2'){
                            //         $('<i class="iconfont icon-wodeweizhi" style="position: absolute;font-size: 20px;color:#1AFA29;left:'+coord[0]+"px"+';top:'+coord[1]+"px"+'" @click.native="upliftTwo('+i+')"></i>').appendTo('.imgcoordinate')
                            //     }
                            // }
                        }else{
                            that.errorCode(data.errorCode)
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
.imgcoordinate{width: 100%;height: 100%;padding: 10px;position: relative;overflow: auto;}
.imgcoordinate>img{width: 1600px;height: 850px;opacity: 0.6;}
.contextmenu{width: 110px;background: #D3DCE6;box-shadow: 1px 1px 10px;border-radius:3px;position: absolute;}
.contextmenu>button{margin:0;margin-bottom: 5px;width: 100%;}
.img-i{position: absolute;font-size: 30px;}
</style>
