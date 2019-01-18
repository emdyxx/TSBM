<template>
    <div class="dataStatistics">
        <!-- <div class="dataStatistics_nav">
            {{$t('dataStatistics.Statisticalinformation')}}<i class="iconfont icon-icon"></i>{{$t('dataStatistics.Statisticaldata')}}
        </div> -->
        <div class="dataStatistics_main">
            <template>
                <el-tabs v-model.lazy="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane :label="$t('dataStatistics.Pandect')" name="0" style="height:100%;border: 1px solid #c4c4c4;border-top: none;">
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
                                <span>{{$t('dataStatistics.Total')}}: {{totalSum}}</span>
                                <span>{{$t('dataStatistics.Online')}}: {{onlineSum}}</span>
                                <span>{{$t('dataStatistics.Offline')}}: {{totalSum - onlineSum}}</span>
                            </div>
                            <div class="dataStatistics_bottom_center"></div>
                            <div class="dataStatistics_bottom_bottom">
                                <el-table
                                    :default-sort = "{prop: 'date', order: 'descending'}"
                                    @sort-change='sortChange'
                                    ref="multipleTable"
                                    :data="dataStatisticsData"
                                    border
                                    stripe
                                    slot="empty"
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                    <el-table-column
                                    sortable='custom'
                                    prop="MAC"
                                    align='center'
                                    label="MAC"
                                    width="180">
                                    </el-table-column>  
                                    <el-table-column
                                    sortable='custom'
                                    prop="wifi2SendByte"
                                    :label="$t('dataStatistics.sendingbytes2G')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="wifi2ReceiveByte"
                                    :label="$t('dataStatistics.receivingbytes2G')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="wifi5SendByte"
                                    :label="$t('dataStatistics.sendingbytes5G')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="wifi5ReceiveByte"
                                    :label="$t('dataStatistics.receivebytes5G')"
                                    align='center'
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="online"
                                    :label="$t('dataStatistics.status')"
                                    align='center'
                                    show-overflow-tooltip>
                                        <template scope="scope">
                                            <span v-if="scope.row.online=='0'">
                                                {{$t('dataStatistics.Offline')}}
                                            </span>
                                            <span v-else>
                                                {{$t('dataStatistics.Online')}}
                                            </span>
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
                    </el-tab-pane>
                    <el-tab-pane :label="$t('dataStatistics.Inquiry')" name="1" style="height:100%;border: 1px solid #c4c4c4;border-top: none;">
                        <div class="inquire_bottom">
                            <div v-if="isActive=='0'">
                                <el-table
                                    :default-sort = "{prop: 'date', order: 'descending'}"
                                    @sort-change='sortChange2'
                                    ref="multipleTable"
                                    :data="tableData"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    style="height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="equipmentMAC"
                                    align='center'
                                    :label="$t('dataStatistics.EquipmentMAC')"
                                    width="170">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="model"
                                    :label="$t('dataStatistics.UnitType')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="currentTnw"
                                    :label="$t('dataStatistics.Currentinterface')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="originalTnw"
                                    :label="$t('dataStatistics.Originalinterface')"
                                    align='center'
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    sortable='custom'
                                    prop="ts"
                                    :label="$t('dataStatistics.Switchingtime')"
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
                            <div v-if="isActive=='1'" style="width:100%;height:100%;">
                                <div v-if="isActive=='1'" id="query" style="width:100%;height:100%;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <div style="position:absolute;left:130px;top:6px;width:140px;">
                <el-select v-if="selected" v-model.lazy="value2" @change="detaparmentchange" size='small'>
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div v-if="activeName2=='1'" class="dataStatistics_main_div"> 
                <el-input
                    icon="search"
                    size='small'
                    :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                    v-model="keyword"
                    @change="tableDataSG"
                    style="width:165px;">
                </el-input>
                <span style="margin-left:10px;">{{$t('dataStatistics.timeframe')}}:</span>
                <el-date-picker
                    v-model.lazy="time"
                    type="datetimerange"
                    @change="times"
                    size='small'
                    range-separator='~'
                    style="width:320px;">
                </el-date-picker>
                <div class="inquire_top_type">
                    <span @click='Active("0")' :class="isActive=='0' ? 'nativeone' : 'nativetwo'">{{$t('dataStatistics.Listdisplay')}}</span>
                    <span>/</span>
                    <span @click="Active('1')" :class="isActive=='1' ? 'nativeone' : 'nativetwo'">{{$t('dataStatistics.Chartdisplay')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'echarts',
        data () {
            return {
                keyword:'',
                serverurl:localStorage.serverurl, 
                activeName2: '0',
                options2:[],
                value2:'1',
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
                time:'',
                startTime:'',
                endTime:"",
                isActive :'0',
                tableData:[],
                pageIndex2:1,
                pageSize2:10,
                total2:10,
                props:'',//排序字段
                orders:'',
                props2:'',//排序字段
                orders2:'',
            }
        },
        mounted(){
            
        },
        methods:{
            sortChange(column, prop, order){
                this.props = column.prop
                this.orders = column.order
                this.bottomData()
            },
            sortChange2(column, prop, order){
                this.props2 = column.prop
                this.orders2 = column.order
                this.readytwo()
            },
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
                        departmentId:that.value2,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.dataStatisticsData = data.rows
                            that.onlineSum = data.onlineSum
                            that.totalSum = data.total
                            that.total = data.total
                        }else{
                            that.errorCode(data)
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
                        departmentId:that.value2,
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            $(".dataStatistics_top").children().remove();
                            for(var i=0;i<data.result.length;i++){
                                $('.dataStatistics_top').append('<div style="width: 33%;height: 180px;display: flex;justify-content: center;" id='+"EC"+i+'></div>')
                            }
                            for(var i=0;i<data.result.length;i++){
                                var one = data.result[i].cpuUsageRate;
                                var two = 100 - data.result[i].cpuUsageRate;
                                var ECdata = that.$echarts.init($('.dataStatistics_top>div').eq(i)[0])
                                ECdata.setOption({
                                    title : {
                                        text: data.result[i].nickname,
                                        subtext: that.$t('dataStatistics.Devicenickname'),
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
                                        data:[that.$t('dataStatistics.Cpuusagerate'),that.$t('dataStatistics.Cpuresidualrate')]
                                    },
                                    series: [
                                        {
                                            name:that.$t('dataStatistics.Accesssource'),
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
                                                {value:one, name:that.$t('dataStatistics.Cpuusagerate')},
                                                {value:two, name:that.$t('dataStatistics.Cpuresidualrate')}
                                            ]
                                        }
                                    ]
                                })
                            }
                            for(var i=0;i<data.result.length;i++){
                                $('#EC'+i).append('<div style="position:absolute;left:5px;top:42px;">'
                                +"<ul style='list-style:none;width:100%;text-align: left;font-size:14px;color: #B4B4B4;padding:0;'>"
                                +"<li>"+that.$t('dataStatistics.EquipmentMAC')+":"+data.result[i].MAC+"</li>"+"<li>CPU:"+data.result[i].cpuUsageRate+"%</li>"
                                +"<li>"+that.$t('dataStatistics.Internalstorage')+":"+data.result[i].memoryUsageRate+"%</li>"+"<li>"+that.$t('dataStatistics.Load')+":"+data.result[i].load+"</li>"
                                +"<li>"+that.$t('dataStatistics.user')+":"+data.result[i].ueSum+"</li>"+"</ul>"+'</div>')
                            }
                        }else{
                            that.errorCode(data)
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
                this.readytwo()
            },
            //改变现实类别
            Active(val){
                if(val=='0'){
                    this.isActive = val
                    $('#query>div').css('display','none')
                }
                if(val=='1'){
                    this.isActive = val
                    //必须指定时间段和MAC
                    if(this.MAC==''||this.startTime==''||this.endTime==''){
                        this.$message({
                            message: that.$t('dataStatistics.Graphicsegment'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
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
                            keyword:that.keyword,
                            departmentId:that.value2,
                            startTime:that.startTime,
                            endTime:that.endTime,
                            order:that.props2,
                            orderBy:that.orders2
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.tableData = data.rows;
                                that.total2 = data.total
                            }else{
                                that.errorCode(data)
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
                    var width = $('.inquire_bottom').width();
                    var height  = $('.inquire_bottom').height ();
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'statistics/getAllTnwList',
                        data:{
                            departmentId:that.value2,
                            keyword:that.keyword,
                            startTime:that.startTime,
                            endTime:that.endTime
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                var one = [];
                                var two = [];
                                var array = data.links.split(',')
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
                                $('#query>div').css('display','')
                                query.setOption(
                                    {
                                        tooltip: {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:[that.$t('dataStatistics.Interfaceuse')]
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
                                            name:that.$t('dataStatistics.time'),
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
                                                name:that.$t('dataStatistics.Interface'),
                                                data: array
                                            }
                                        ],
                                        series: [
                                            {
                                                name:that.$t('dataStatistics.Interfaceuse'),
                                                type:'line',
                                                step: 'start',
                                                data:two
                                            }
                                        ],
                                    },
                                )
                            }else{
                                that.errorCode(data)
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
                            that.options2 = data.result
                            that.value2 = data.result[0].value
                            that.ready()
                        }else{
                            that.errorCode(data)
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
.dataStatistics_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border-radius: 0 0 4px 4px;}
.dataStatistics_main_div{position: absolute;top: 0;left: 270px;height: 42px;line-height: 42px;display: flex;}
.dataStatistics_main_div>div{margin-left: 10px;}

.dataStatistics_top{width: 100%;height: 195px;display: flex;flex-wrap:wrap;margin-top: 5px;justify-content: center;overflow: auto;}
.dataStatistics_bottom{width: 100%;height: auto;position: absolute;top:195px;bottom: 0;}
.dataStatistics_bottom_top{margin-bottom:5px;text-align: left;padding-left:10px;}
.dataStatistics_bottom_top>span{display: inline-block;margin-left:20px; }
.dataStatistics_bottom_center{position:absolute;left:0;right:12px;height:1px;background: black;}
.dataStatistics_bottom_bottom{position: absolute;top:43px;left:5px;right:5px;bottom:0;}
.inquire_top{width:100%;height:40px;overflow: hidden;}
.inquire_bottom{width:100%;height: auto;position: absolute;top:0;bottom:3px;left:0;right:0;overflow: auto;padding: 5px;}
/* .inquire_bottom>div{padding: 5px;} */
.inquire_top_main{width: 100%;height: 40px;display: flex;justify-content: center;overflow: hidden;}
.inquire_formtwo{display: flex;margin-top: 6px;}
.inquire_formtwo>span{width: 30%;line-height: 30px;}
.inquire_formtwo>input{height: 30px;width: 130px;}
.inquire_formtwo>div{height: 30px;width: 140px;}
.inquire_top_type{margin-left:10px;cursor: pointer;font-size: 15px;}
.nativeone{color: #8391a5;}
.nativetwo{color: #555555;}
#query{width: 100%;height: 100%;}
</style>
