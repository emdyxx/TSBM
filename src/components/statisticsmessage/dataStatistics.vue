<template>
    <div class="dataStatistics">
        <div class="dataStatistics_nav">
            统计信息<i class="iconfont icon-icon"></i>统计数据
            <!-- 管理员登录显示部门 -->
            <el-select v-if="selected" v-model.lazy="value2" @change="detaparmentchange" placeholder="请选择">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="dataStatistics_main">
            <template>
                <el-tabs v-model.lazy="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane label="总览" name="0">
                        <div class="dataStatistics_top">
                            
                        </div>
                        <div class="dataStatistics_bottom">
                            <div class="dataStatistics_bottom_top">
                                <el-select v-model.lazy="value" @change="typechange" size='small' style="width:126px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <span>总数: {{totalSum}}</span>
                                <span>在线: {{onlineSum}}</span>
                                <span>离线: {{totalSum - onlineSum}}</span>
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
                                    prop="wifi2SendByte"
                                    label="2.4G发送字节"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="wifi2ReceiveByte"
                                    label="2.4G接收字节"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="wifi5SendByte"
                                    label="5.8G发送字节"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="wifi5ReceiveByte"
                                    label="5.8G接收字节"
                                    align='center'
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <!-- <el-table-column
                                    prop=""
                                    label="在线时间"
                                    align='center'
                                    show-overflow-tooltip>
                                    </el-table-column> -->
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
                                    <input v-model.lazy="MAC" type="text" maxlength="20" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入MAC">
                                </div>
                                <div class="inquire_formtwo">
                                    <span>型号:</span>
                                    <input v-model.lazy="type" type="text" maxlength="20" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入型号">
                                </div>
                                <div class="inquire_formtwo">
                                    <span>请选择时间范围:</span>
                                    <el-date-picker
                                        v-model.lazy="time"
                                        type="datetimerange"
                                        @change="times"
                                        size='small'
                                        placeholder="选择时间范围"
                                        range-separator='~'
                                        style="width:320px;">
                                    </el-date-picker>
                                </div>
                                <el-button @click="tableDataSG" type="primary" style="height:30px;margin-top:6px;margin-left:5px;" size="small">搜索</el-button>
                                <div class="inquire_top_type">
                                    <span @click='Active("0")' :class="isActive=='0' ? 'nativeone' : 'nativetwo'">列表显示</span>
                                    <span>/</span>
                                    <span @click="Active('1')" :class="isActive=='1' ? 'nativeone' : 'nativetwo'">图形展示</span>
                                </div>
                            </div>
                        </div>
                        <div class="inquire_bottom">
                            <div v-if="isActive=='0'" style="width: 100%;height:100%;">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    prop="equipmentMAC"
                                    align='center'
                                    label="设备MAC"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="model"
                                    label="设备型号"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="currentTnw"
                                    label="当前接口"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="originalTnw"
                                    label="原始接口"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="ts"
                                    label="切换时间"
                                    align='center'
                                    show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    @size-change="handleSizeChange2"
                                    @current-change="handleCurrentChange2"
                                    :current-page="pageIndex2"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="pageSize2"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total2">
                                    </el-pagination>
                                </div>
                            </div>
                            <!-- style="display:flex;justify-content: center;align-items: center;" -->
                            <div v-if="isActive=='1'">
                                <div id="query"></div>
                            </div>
                        </div>
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
                serverurl:localStorage.serverurl, 
                activeName2: '0',
                options2:[],
                value2:'',
                selected:false,
                //总览页面
                options:[{value:'1',label:'tsbc'},{value:'2',label:'tsba'}],
                value:'1',
                onlineSum:'',
                totalSum:'',
                dataStatisticsData:[],
                pageIndex:1,
                pageSize:10,
                total:10,
                
                //查询页面 参数
                MAC:'',
                type:'',
                time:'',
                startTime:'',
                endTime:"",
                isActive :'0',
                tableData:[],
                pageIndex2:1,
                pageSize2:10,
                total2:10,
            }
        },
        mounted(){
            
        },
        methods:{
            //判断选中标签页
            handleClick(tab){
                var that = this
                if(tab.name=='0'){this.ready()}
                if(tab.name=='1'){
                    that.readytwo()
                }
            },
            //部门change事件
            detaparmentchange(){
                if(this.activeName2=='0'){
                    $(".dataStatistics_top").children().remove();
                    this.ready()
                }
                if(this.activeName2=='1'){
                    this.readytwo()
                }
            },
            //下侧设备类型change事件
            typechange(){
                this.bottomData()
            },
            //下侧列表数据获取
            bottomData(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getEquipmentStatus',
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        type:that.value,
                        departmentId:that.value2
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataStatisticsData = data.rows
                            that.onlineSum = data.onlineSum
                            that.totalSum = data.total
                            that.total = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //总览页面数据渲染
            ready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getAllTsbgStatus',
                    data:{
                        departmentId:that.value2
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            for(var i=0;i<data.result.length;i++){
                                $('.dataStatistics_top').append('<div style="width: 33%;height: 180px;display: flex;justify-content: center;" id='+"EC"+i+'></div>')
                            }
                            for(var i=0;i<data.result.length;i++){
                                var one = data.result[i].cpuUsageRate;
                                var two = 100 - data.result[i].cpuUsageRate;
                                var ECdata = that.$echarts.init($('.dataStatistics_top>div').eq(i)[0])
                                ECdata.setOption({
                                    title : {
                                        text: data.result[i].MAC,
                                        subtext: '设备MAC',
                                        x:'left',
                                        textStyle: {fontSize:14,fontWeight:'bold'}
                                    },
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                                    },
                                    legend: {
                                        orient: 'vertical',
                                        x: 'left',
                                        y: 'bottom',
                                        data:['cpu使用率','cpu剩余率']
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
                                                {value:one, name:'cpu使用率'},
                                                {value:two, name:'cpu剩余率'}
                                            ]
                                        }
                                    ]
                                })
                            }
                            for(var i=0;i<data.result.length;i++){
                                $('#EC'+i).append('<div style="position:absolute;left:5px;top:42px;">'
                                +"<ul style='list-style:none;width:100%;text-align: left;font-size:14px;color: #B4B4B4;padding:0;'>"
                                +"<li>CPU:"+data.result[i].cpuUsageRate+"%</li>"+"<li>内存:"+data.result[i].memoryUsageRate+"%</li>"+
                                "<li>负载:"+data.result[i].load+"</li>"+"<li>用户:"+data.result[i].ueSum+"</li>"+"</ul>"+'</div>')
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                that.bottomData()
            },
            //选择条数事件
            handleSizeChange(val){
                this.pageSize = val
                this.bottomData()
            },
            //选择页数事件
            handleCurrentChange(val){
                this.pageIndex = val
                this.bottomData()
            },
            times(val){
                var type = val.split('~')
                this.startTime = type[0]
                this.endTime = type[1]
            },
            //改变现实类别
            Active(val){
                if(val=='0'){
                    this.isActive = val
                }
                if(val=='1'){
                    //必须指定时间段和MAC
                    if(this.MAC==''||this.startTime==''||this.endTime==''){
                        this.$message({
                            message: '图形展示必须指定MAC以及时间段!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    this.isActive = val
                    this.readytwo()
                }
            },
            //查询页面搜索
            tableDataSG(){
                this.readytwo()
            },
            handleSizeChange2(val){
                this.pageSize2 = val
                this.readytwo()
            },
            handleCurrentChange2(val){
                this.pageIndex2 = val
                this.readytwo()
            },
            readytwo(){
                var that = this;
                if(this.isActive=='0'){
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'statistics/getTnwList',
                        data:{
                            pageIndex:that.pageIndex2,
                            pageSize:that.pageSize2,
                            departmentId:that.value2,
                            MAC:that.MAC,
                            model:that.type,
                            startTime:that.startTime,
                            endTime:that.endTime
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.tableData = data.rows;
                                that.total2 = data.total
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                if(this.isActive=='1'){
                    //必须指定时间段和MAC
                    if(that.MAC==''||that.startTime==''||that.endTime==''){
                        this.$message({
                            message: '图形展示必须指定MAC以及时间段!',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    var width = $('.dataStatistics_main').width();
                    var height  = $('.dataStatistics_main').height ();
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'statistics/getAllTnwList',
                        data:{
                            departmentId:that.value2,
                            MAC:that.MAC,
                            model:that.type,
                            startTime:that.startTime,
                            endTime:that.endTime
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                var one = [];
                                var two = [];
                                var array = data.links.split(',')
                                console.log(array)
                                for(var i=0;i<data.result.length;i++){
                                    one.push(data.result[i].ts)
                                    for(var j=0;j<array.length;j++){
                                        if(data.result[i].originalTnw==array[j]){
                                            two.push(j)
                                        }
                                    }
                                }
                                $('#query').css('width',width).css('height',height);
                                var query = that.$echarts.init(document.getElementById('query'));
                                query.setOption(
                                    {
                                        title: {
                                            text: 'Step Line'
                                        },
                                        tooltip: {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['接口使用']
                                        },
                                        grid: {
                                            left: '3%',
                                            right: '4%',
                                            bottom: '3%',
                                            containLabel: true
                                        },
                                        toolbox: {
                                            feature: {
                                                saveAsImage: {}
                                            }
                                        },
                                        xAxis: {
                                            type: 'category',
                                            name:'时间',
                                            data: one //时间
                                        },
                                        axisLabel:{
                                            interval: 0,  
                                            formatter:function(value)  
                                            {  
                                                var ret = "";//拼接加\n返回的类目项  
                                                var maxLength = 10;//每项显示文字个数  
                                                var valLength = value.length;//X轴类目项的文字个数  
                                                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                                                if (rowN > 1)//如果类目项的文字大于3,  
                                                {  
                                                    for (var i = 0; i < rowN; i++) {  
                                                        var temp = "";//每次截取的字符串  
                                                        var start = i * maxLength;//开始截取的位置  
                                                        var end = start + maxLength;//结束截取的位置  
                                                        //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                                        temp = value.substring(start, end) + "\n";  
                                                        ret += temp; //凭借最终的字符串  
                                                    }  
                                                    return ret;  
                                                }  
                                                else {  
                                                    return value;  
                                                }  
                                            }  
                                        },
                                        yAxis : [
                                            {
                                                type : 'category',
                                                name:'接口',
                                                data: array
                                            }
                                        ],
                                        series: [
                                            {
                                                name:'接口使用',
                                                type:'line',
                                                step: 'start',
                                                data:two
                                            }
                                        ],
                                    },
                                )
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
            }
        },
        created(){
            //请求部门数据
            var that = this
            if(sessionStorage.departmentId=='1'){
                that.selected = 'true'
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/getTopDepartment',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.options2 = data.result[0].children
                            that.value2 = data.result[0].children[0].value
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            }else{
                that.value2 = sessionStorage.departmentId
                that.ready()
            }
        },
    }
</script>
<style scoped>
.dataStatistics{width: 100%;height: 100%;padding:5px;}
.dataStatistics_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;padding-left: 10px;}
.dataStatistics_nav>i{font-size: 23px;}
.dataStatistics_main{position:absolute;top:55px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;background-color: #FFFFFF;border: 1px solid #c4c4c4;border-radius: 0 0 4px 4px;}
.dataStatistics_top{width: 100%;height: 195px;display: flex;flex-wrap:wrap;margin-top: 5px;justify-content: center;overflow: auto;}
.dataStatistics_bottom{width: 100%;height: auto;position: absolute;top:195px;bottom: 0;}
.dataStatistics_bottom_top{margin-bottom:5px;text-align: left;padding-left:10px;}
.dataStatistics_bottom_top>span{display: inline-block;margin-left:20px; }
.dataStatistics_bottom_center{position:absolute;left:0;right:12px;height:1px;background: black;}
.dataStatistics_bottom_bottom{position: absolute;top:43px;left:0;right:12px;bottom:0;}
.inquire_top{width:100%;height:40px;overflow: hidden;}
.inquire_bottom{width:100%;height: auto;position: absolute;top:40px;bottom:3px;left:0;right:10px;overflow: auto;}
/* .inquire_bottom>div{width: 100%;height:100%;} */
.inquire_top_main{width: 100%;height: 40px;display: flex;justify-content: center;overflow: hidden;}
.inquire_formtwo{display: flex;margin-top: 6px;}
.inquire_formtwo>span{width: 30%;line-height: 30px;}
.inquire_formtwo>input{height: 30px;width: 130px;}
.inquire_formtwo>div{height: 30px;width: 140px;}
.inquire_top_type{margin-top:10px;margin-left:10px;cursor: pointer;font-size: 15px;}
.nativeone{color: #8391a5;}
.nativetwo{color: #555555;}
#query{width: 700px;height: 400px;}
</style>
