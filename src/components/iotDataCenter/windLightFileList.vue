<template>
    <div class="windLightFileList">
        <!-- <div class="windLightFileList_nav">
            {{$t('windLightFileList.Internetofthingsdata')}}<i class="iconfont icon-icon"></i>{{$t('windLightFileList.Applicationfirmware')}}
        </div> -->
        <div class="windLightFileList_main">
            <div class="windLightFileList_top">
                <el-button v-if="uploadWindLightfile" @click="addwindLightFileList(0)" type="primary" icon="plus " size="small">{{$t('windLightFileList.Addto')}}</el-button>
                <el-button v-if="editWindLightfileInfo" @click="addwindLightFileList(1)" type="primary" icon="edit" size="small">{{$t('windLightFileList.modify')}}</el-button>
                <el-button v-if="delWindLightfile" @click="removewindLightFileList" type="primary" icon="delete" size="small">{{$t('windLightFileList.delete')}}</el-button>
                <div class="windLightFileList_top_div">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="search"
                        style="width:150px;">
                    </el-input>
                </div>
            </div>
            <div class="windLightFileList_bottom">
                <div class="windLightFileList_bottom_bottom">
                    <el-table
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @sort-change='sortChange'
                        @row-click="clickRow"
                        ref="moviesTable"
                        :data="tableData"
                        border
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                        @selection-change="SelectionChange">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="fileName"
                        align='center'
                        :label="$t('windLightFileList.applyname')"
                        width="220">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="md5"
                        align='center'
                        label="md5"
                        width="280">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="version"
                        align='center'
                        :label="$t('windLightFileList.versionnumber')"
                        width="220">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="updateTime"
                        align='center'
                        :label="$t('windLightFileList.Updatetime')"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="summary"
                        :label="$t('windLightFileList.Remarks')"
                        align='center'
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="SizeChange"
                        @current-change="CurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="windLightFileListModal" style="text-align: left;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:450px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 v-if="addType=='0'" class="modal-title" id="userManagemyModalLabel">{{$t('windLightFileList.Addingfirmware')}}</h4>
                        <h4 v-if="addType=='1'" class="modal-title" id="userManagemyModalLabel">{{$t('windLightFileList.Modifiedfirmware')}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="userManage_form" v-if="addType=='0'">
                            <span><i class="required">*</i>{{$t('windLightFileList.Applicationfile')}}:</span>
                            <input type="file" ref="img1" id="img1" @change="fileChange">
                        </div>
                        <div class="userManage_form" v-if="addType=='0'">
                            <span><i class="required">*</i>{{$t('windLightFileList.MD5file')}}:</span>
                            <input type="file" ref="img2" id="img2">
                        </div>
                        <div class="userManage_form">
                            <span>{{$t('windLightFileList.Noteinformation')}}:</span>
                            <el-input
                            type="textarea"
                            style="height:75px;"
                            v-model.lazy="remark">
                            </el-input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('windLightFileList.Close')}}</button>
                        <button type="button" @click="addSubmit" class="btn btn-primary addbutton">{{$t('windLightFileList.Preservation')}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal -->
    </div>
</template>
<script>
    export default{
        name: 'windLightFileList',
        data () {
            return {
                uploadWindLightfile:false,
                editWindLightfileInfo:false,
                delWindLightfile:false,
                serverurl:localStorage.serverurl,
                tableData:[],
                site:[],
                pageIndex:1,
                pageSize:10,
                total:10,
                keyword:'',
                remark:'',
                addType:'0',
                props:'',//排序字段
                orders:'',
            }
        },
        mounted(){
            var that = this;
            setTimeout(function(){
                console.log(sessionStorage.menuId)
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
                                if(data.result[i].code=='uploadWindLightfile'){
                                    that.uploadWindLightfile = true
                                }
                                if(data.result[i].code=='editWindLightfileInfo'){
                                    that.editWindLightfileInfo = true
                                }
                                if(data.result[i].code=='delWindLightfile'){
                                    that.delWindLightfile = true
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
            SelectionChange(val){this.site = val;},
            SizeChange(val){this.pageIndex=val;this.ready();},
            CurrentChange(val){this.pageSize=val;this.ready();},
            //点击添加编辑按钮0为添加/1为删除
            addwindLightFileList(val){
                if(val=='0'){
                    this.remark = ''
                    this.addType = val;
                    $('#windLightFileListModal').modal('show')
                }
                if(val=='1'){
                    if(this.site.length=='0'||this.site.length>=2){
                        this.$message({
                            message: that.$t('windLightFileList.Pleaseselectdataformodification'),
                            type: 'error',
                            showClose: true,
                        })
                        return;
                    }
                    this.addType = val;
                    this.remark = this.site[0].summary
                    $('#windLightFileListModal').modal('show')
                }
            },
            //应用文件change事件
            fileChange(){
                console.log(this.$refs.img1.files)
                
            },
            //添加/编辑提交
            addSubmit(){
                var that = this
                var url = ''
                var formdate = new FormData();
                if(this.addType=='0'){
                    url='windlight/uploadWindLightfile';
                    formdate.append("file", this.$refs.img1.files[0])
                    formdate.append("fileMd5", this.$refs.img2.files[0])
                    formdate.append("summary", this.remark)
                    formdate.append("departmentId", 1)
                    $.ajax({
                        url: that.serverurl+url,
                        type: 'POST',
                        cache: false,
                        data: formdate,
                        dataType:'json',
                        processData: false,
                        contentType: false
                    }).done(function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type:'success',
                                showClose: true,
                            });
                            $('#windLightFileListModal').modal('hide')
                            that.ready()
                        }else{
                            if(data.errorCode=='2018'){
                                formdate.append("flag", 1)
                                that.$confirm(that.$t('windLightFileList.Duplicatefilesdotheycover'), that.$t('FalseHints.title'), {
                                    confirmButtonText: that.$t('FalseHints.yes'),
                                    cancelButtonText: that.$t('FalseHints.no'),
                                    type: 'warning'
                                }).then(() => {
                                    $.ajax({
                                        url: that.serverurl+url,
                                        type: 'POST',
                                        cache: false,
                                        data: formdate,
                                        dataType:'json',
                                        processData: false,
                                        contentType: false
                                    }).done(function(data){
                                        if(data.errorCode=='0'){
                                            that.$message({
                                                message: that.$t('FalseHints.SaveSuccess'),
                                                type:'success',
                                                showClose: true,
                                            });
                                            $('#windLightFileListModal').modal('hide')
                                            that.ready()
                                        }else{
                                            that.errorCode(data)
                                        }
                                    })
                                }).catch(() => {
                                    that.$message({
                                        type: 'info',
                                        message: that.$t('windLightFileList.Havebeencancelled')
                                    });          
                                });
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
                if(this.addType=='1'){
                    url='windlight/editWindLightfileInfo';
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+url,
                        data:{
                            id:that.site[0].id,
                            summary:that.remark
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '修改成功',
                                    type:'success',
                                    showClose: true,
                                });
                                $('#windLightFileListModal').modal('hide')
                                that.ready()
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }
                
                
            },
            //点击删除按钮
            removewindLightFileList(){
                var that = this;
                if(this.site.length==0){
                    that.$message({
                        message: '请选择数据进行删除',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var arr = [];
                for(var i=0;i<this.site.length;i++){
                    arr.push(this.site[i].id)
                }
                that.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'windlight/delWindLightfile',
                        data:{
                            ids:arr.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('FalseHints.DeleteSuccess'),
                                    type:'success',
                                    showClose: true,
                                });
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
            },
            search(){
                this.ready()
            },
            ready(){
                var that = this;
                //请求列表数据
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'windlight/windLightFileList',
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        keyword:that.keyword,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData = data.rows
                            that.total = data.total
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
.required{color: red;}
.windLightFileList{width: 100%;height: 100%;padding: 15px;position: relative;}
.windLightFileList_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.windLightFileList_nav>i{font-size: 23px;}
.windLightFileList_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.windLightFileList_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;display: flex;align-items: center;}
.windLightFileList_top_div{height: 29px;margin-left: 20px;display: flex}
.windLightFileList_top_div>span{line-height: 29px;font-size: 16px}
.windLightFileList_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.windLightFileList_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.windLightFileList_bottom_bottom{height:95%;}

.userManage_form{display: flex;margin: 0 auto 5px;}
.userManage_form>span{width: 90px;line-height: 34px;font-size: 15px;}
.userManage_form>input{height: 31px;}

.userManage_formtwo{display: flex;margin:0 10px;}
.userManage_formtwo>span{line-height: 30px;font-size: 15px;}
.userManage_formtwo>input{width: 136px;height: 30px;}
</style>
