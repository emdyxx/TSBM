<template>
    <div class="dataStatistics">
        <div class="dataStatistics_main">
            <template>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="总览" name="0">
                        <div class="dataStatistics_top">
                            <div id="EC_left"></div>
                            <div id="EC_right"></div>
                        </div>
                        <div class="dataStatistics_bottom">
                            <div class="dataStatistics_bottom_top">
                                <el-select v-model="value" size='small' style="width:126px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <span>总数: 56</span>
                                <span>在线: 56</span>
                                <span>离线: 0</span>
                            </div>
                            <div class="dataStatistics_bottom_center"></div>
                            <div class="dataStatistics_bottom_bottom">
                                <el-table
                                    ref="multipleTable"
                                    :data="dataStatisticsData"
                                    border
                                    stripe
                                    slot="empty"
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                    <el-table-column
                                    prop="MAC"
                                    align='center'
                                    label="MAC"
                                    width="180">
                                    </el-table-column>  
                                    <el-table-column
                                    prop="operationTypeValue"
                                    label="流量统计"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="userName"
                                    label="丢包率"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="dataId"
                                    label="丢包数"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="ts"
                                    label="在线时间"
                                    align='center'
                                    show-overflow-tooltip>
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
                    </el-tab-pane>
                    <el-tab-pane label="查询" name="1">
                        <div class="inquire_top">
                            <div class="inquire_top_main">
                                <div class="inquire_formtwo">
                                    <span>MAC:</span>
                                    <input type="text" maxlength="20" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入MAC">
                                </div>
                                <div class="inquire_formtwo">
                                    <span>型号:</span>
                                    <el-select v-model="model" size='small' clearable placeholder="请选择">
                                        <el-option
                                        v-for="item in modeloptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inquire_formtwo">
                                    <span>请选择时间范围:</span>
                                    <el-date-picker
                                        v-model="time"
                                        type="datetimerange"
                                        @change="times"
                                        size='small'
                                        placeholder="选择时间范围"
                                        range-separator='~'
                                        style="width:320px;">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="inquire_bottom"></div>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'echarts',
        data () {
            return {
                activeName2: '0',
                //概览
                options:[{value:'0',label:'tsbc'},{value:'1',label:'tsba'}],
                value:'',
                dataStatisticsData:[],
                pageIndex:1,
                pageSize:10,
                total:100,
                //查询
                modeloptions:[],
                model:'',
                time:'',
            }
        },
        mounted(){
            this.ready()
        },
        methods:{
            //判断选中标签页
            handleClick(tab){
                var that = this
                if(tab.name=='0'){this.ready()}
                if(tab.name=='1'){}
                if(tab.name=='2'){}
            },
            //概览页面数据渲染
            ready(){
                var that = this
                var ECleft = this.$echarts.init(document.getElementById('EC_left'))
                var ECright = this.$echarts.init(document.getElementById('EC_right'))
                ECleft.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '67%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '18',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                })
                ECright.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '67%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '18',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                })
            },
            //选择条数事件
            handleSizeChange(val){},
            //选择页数事件
            handleCurrentChange(val){},

            times(val){
                var type = val.split('~')
                console.log(type)
            }
        },
        created(){},
    }
</script>
<style scoped>
.dataStatistics{width: 100%;height: 100%;padding:5px;}
.dataStatistics_main{width:100%;height:100%;background-color: #FFFFFF;border: 1px solid #c4c4c4;border-radius: 0 0 4px 4px;}
.dataStatistics_top{width: 100%;height: 180px;display: flex;margin-top: 10px;}
.dataStatistics_top>div{width: 50%;height: 100%;}
.dataStatistics_bottom{width: 100%;height: auto;position: absolute;top:180px;bottom: 0;}
.dataStatistics_bottom_top{margin-bottom:5px;text-align: left;padding-left:10px;}
.dataStatistics_bottom_top>span{display: inline-block;margin-left:20px; }
.dataStatistics_bottom_center{position:absolute;left:0;right:12px;height:1px;background: black;}
.dataStatistics_bottom_bottom{position: absolute;top:43px;left:0;right:12px;bottom:0;}
.inquire_top{width:100%;height:40px;}
.inquire_bottom{width:100%;height: auto;position: absolute;top:40px;bottom:3px;;background: black;}
.inquire_top_main{width: 100%;height: 40px;display: flex;justify-content: center;}
.inquire_formtwo{display: flex;margin-top: 6px;}
.inquire_formtwo>span{width: 30%;line-height: 30px;}
.inquire_formtwo>input{height: 30px;width: 130px;}
.inquire_formtwo>div{height: 30px;width: 140px;}
</style>
