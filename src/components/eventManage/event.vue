<template>
    <div class="event">
        <div class="event_nav">
            事件管理<i class="iconfont icon-icon"></i>事件信息
        </div>
        <div class="event_main">
            <div class="event_top">
                <input type="checkbox" v-model="checked">
                <span>显示历史告警信息</span>
                <span style="padding-left:30px;">
                    <span>告警级别:</span>
                    <el-select v-model="value" size='small' style="width:110px;" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:30px;">
                    <span>设备类型:</span>
                    <el-select v-model="value2" size='small' style="width:110px;" placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
            </div>
            <div class="event_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
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
                    prop="username"
                    align='center'
                    label="设备名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="fullName"
                    label="告警内容"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="departmentName"
                    label="告警级别"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    label="设备类型"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    label="告警时间"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="90">
                        <template scope="scope">
                            <el-button @click="event(scope.row)" type="text" size="small">管理设备</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
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
</template>
<script>
    export default{
        name: 'index',
        data () {
            return {
                loading:false,
                sites:[],
                checked:false,
                value:'',
                options:[{value:'0',label:'全部'},{value:'1',label:'紧急'},{value:'2',label:'严重'},{value:'3',label:'重要'},{value:'4',label:'次要'}],
                value2:'',
                options2:[{value:'3',label:'全部'},{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                tableData3:[],
                pageSize:10,
                pageIndex:1,
                total:10,
            }
        },
        methods:{
            //选中行的change事件
            handleSelectionChange(val){
                this.sites = val
            },
            //选择条数事件
            handleSizeChange(val) {
                this.pageSize = val
                this.ready()
            },
            //选择页数事件
            handleCurrentChange(val) {
                this.pageIndex = val
                this.ready()
            },
            //操作点击事件
            event(val){
                console.log(val)
            },
            //页面渲染
            ready(){}
        },
        created(){}
    }
</script>
<style scoped>
.event{width: 100%;height: 100%;padding: 15px;position: relative;}
.event_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.event_nav>i{font-size: 23px;}
.event_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.event_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.event_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}



</style>
