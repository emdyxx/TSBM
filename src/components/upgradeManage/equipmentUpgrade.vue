<template>
    <div class="equipmentUpgrade">
        <div class="equipmentUpgrade_nav">
            升级管理<i class="iconfont icon-icon"></i>设备升级
        </div>
        <div class="equipmentUpgrade_main">
            <div class="equipmentUpgrade_top">
                <el-button type="primary" icon="upload2" size="small" @click="upload">升级包上传</el-button>
                <el-button type="primary" icon='edit' size="small" >升级包分组修改</el-button>
                <el-button type="primary" icon='delete2' size="small" >删除升级包</el-button>
            </div>
            <!--上传模态框-->
            <div class="modal fade" id="upgrademyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:500px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">上传升级包</h4>
                        </div>
                        <div class="modal-body">
                            <div class="upload_div">
                                <div>
                                    <span>文件名称:</span>
                                    <input type="file">
                                </div>
                                <!-- <div>
                                    <span>MD5:</span>
                                    <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
                                </div> -->
                                <div>
                                    <span>升级包状态:</span>
                                    <el-select size="small" v-model="value" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <!-- 不可以修改  文本类型 -->
                                <!-- <div>
                                    <span>升级包类型:</span>
                                    <el-select size="small" v-model="valuetwo" @change="uploadmold" placeholder="请选择">
                                        <el-option
                                        v-for="item in optionstwo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div> -->
                                <div>
                                    <span>适用范围</span>
                                    <el-select size="small" v-model="valuethree" @change="uploadscope" placeholder="请选择">
                                        <el-option
                                        v-for="item in optionsthree"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div v-if="typedata" style="width:100%;height:200px;flex-direction: column;">
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData5"
                                        border
                                        stripe
                                        tooltip-effect="dark"
                                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                                        @selection-change="handleSelectionChangeTwo">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        align='center'
                                        label="设备MAC"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="设备组"
                                        align='center'
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="型号"
                                        align='center'
                                        show-overflow-tooltip>
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
                                <div>
                                    <span>描述:</span>
                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="equipmentUpgrade_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <div class="equipmentUpgrade_bottom_top">
                    检索条件
                </div>
                <div class="equipmentUpgrade_bottom_bottom">
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
                        prop="code"
                        align='center'
                        label="组织代号"
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="组织名称"
                        align='center'
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮箱"
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
        name: 'equipmentUpgrade',
        data () {
            return {
                serverurl:localStorage.serverurl,
                loading:false,
                tableData4:[],
                sites:[],
                sizes:10,
                currentPage4:1,
                total:100,
                input:'',
                options:[{value:0,label:'禁用'},{value:1,label:'启用'}],
                value:'',
                optionstwo:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                valuetwo:'',
                optionsthree:[{value:'0',label:'指定设备'},{value:'1',label:'指定分组'},{value:'2',label:'指定型号'}],
                valuethree:'',
                tableData5:[],
                sitesTwo:[],
                pageSize:'',
                pageIndex:'',
                currentPage5:1,
                sizesTwo:10,
                totalTwo:50,
                type:'', //升级包类型
                typetwo:'', //升级包适用范围
                textarea:'',
                typedata:false, 
            }
        },
        methods:{
            
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
            //升级包类型change事件
            uploadmold(val){
                this.type = val
                this.uploadscope()
            },
            //升级包适用范围change事件
            uploadscope(val){
                var that = this
                this.typetwo = val
                if(this.type=='0'||this.type=='1'||this.type=='2'){//tsbg
                    if(this.typetwo=='0'){
                        this.typedata = true
                    }
                }
                if(this.type!=''&&this.typetwo!=''){
                    // $.ajax({
                    //     type:'post',
                    //     async:true,
                    //     url:that.serverurl+'login',
                    //     dataType:'json',
                    //     xhrFields:{withCredentials:true},
                    //     data:{
                    //         type:that.type,
                    //         typetwo:that.typetwo,
                    //     },
                    //     success:function(data){
                    //         console.log(data)
                    //     }
                    // })
                } 
            },
            //模态框选中行的change事件
            handleSelectionChangeTwo(val){
                this.sitesTwo = val
            },
            //模态框选择条数事件
            handleSizeChangeTwo(val){
                this.pageSize = val
                this.sizesTwo = val
            },
            //模态框选择页数事件
            handleCurrentChangeTwo(val){
                this.pageIndex = val
            },
            
            //点击上传升级包
            upload(){
                $('#upgrademyModal').modal('show')
                this.input='';
                this.value = '';
                this.valuetwo = '';
                this.valuethree = '';
            },
            //页面数据渲染
            ready(){},
        },
        created(){}
    }
</script>
<style scoped>
.equipmentUpgrade{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentUpgrade_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentUpgrade_nav>i{font-size: 23px;}
.equipmentUpgrade_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentUpgrade_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.equipmentUpgrade_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;}
.equipmentUpgrade_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.equipmentUpgrade_bottom_bottom{position: absolute;top:40px;bottom: 0;width: 100%;padding: 10px;}
.upload_div{width: 350px;margin:0 auto;}
.upload_div>div{display: flex;margin-bottom: 5px;}
.upload_div>div>span{display:inline-block;line-height: 30px;width:35%;}
.upload_div>div>div{width: 75%;}
</style>          