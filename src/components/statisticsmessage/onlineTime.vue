<template>
    <div class="onlineTime">
        <!-- <div class="onlineTime_nav">
            {{$t('onlineTime.Statisticalinformation')}}<i class="iconfont icon-icon"></i>{{$t('onlineTime.Onlinetimelength')}}
        </div> -->
        <div class="onlineTime_main">
            <div class="onlineTime_top">
                <div class="text_form">
                    <span>{{$t('onlineTime.Equipmenttype')}}:</span>
                    <el-select v-model="equipmentType" @change="equipmentChange" clearable size='small'>
                        <el-option
                        v-for="item in equipmentOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="text_form">
                    <span>MAC:</span>
                    <el-select v-model="MACData" clearable size='small'>
                        <el-option
                        v-for="item in MACoptions"
                        :key="item.MAC"
                        :label="item.MAC"
                        :value="item.MAC">
                        </el-option>
                    </el-select>
                </div>
                <div class="text_form">
                    <span>{{$t('onlineTime.Timeslot')}}:</span>
                    <el-date-picker
                        style="width:316px"
                        v-model="dataTime"
                        @change="times"
                        clearable 
                        size='small'
                        type="datetimerange"
                        range-separator="~">
                    </el-date-picker>
                </div>
                <el-button @click="search" type="primary" icon="search" style="height:30px;" size='small'>{{$t('onlineTime.search')}}</el-button>
            </div>  
            <div class="onlineTime_bottom">
                <div class="onlineTime_bottom_left">
                    <div id="Chart_left"></div>
                </div>
                <div class="onlineTime_bottom_right">
                    <div id="Chart_right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'index',
    data (){
        return {
            serverurl:localStorage.serverurl,
            equipmentOptions: [{
                value: '0',
                label: 'tsbg'
                }, {
                value: '1',
                label: 'tsbc'
                }, {
                value: '2',
                label: 'tsba'
                }, {
                value: '3',
                label: 'ue'
            }, {
                value: '4',
                label: 'sta'
            }],
            equipmentType:'0',
            MACoptions: [],
            MACData: '',
            dataTime:'',
            startTime:'',
            endTime:'',
        }
    },
    mounted(){},
    methods:{
        //设备类型change事件
        equipmentChange(){
            this.MACdata(this.equipmentType)
        },
        //根据设备类型change获取MAC
        MACdata(val){
            var that = this
            if(val==''){

            }else{
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getEquipmentList',
                    data:{
                        type:val
                    },
                    success:function(data){
                        that.MACoptions = data.result
                        that.MACData = data.result[0].MAC
                    }
                })
            }
        },
        //在线时长解析
        times(val){
            var type = val.split('~')
            this.startTime = type[0]
            this.endTime = type[1]
        },
        //搜索
        search(){
            console.log(this.dataTime)
            var that = this
            if(this.equipmentType==''||this.MACData==''||this.startTime==''||this.endTime==''){
                this.$message({
                    message: that.$t('onlineTime.Searchfieldcannotbeempty'),
                    type: 'error',
                    showClose: true,
                });
                return;
            }
            this.ready()
        },
        //加载下侧两个图标数据
        ready(){
            var that = this;
            var width = $('#Chart_left').width();
            var height  = $('#Chart_left').height ();
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'statistics/getEquipmentOnlineTime',
                data:{
                    MAC:that.MACData,
                    startTime:that.startTime,
                    endTime:that.endTime
                },
                success:function(data){
                    if(data.errorCode=='0'){
                        var type = [];
                        var datatime = [];
                        for(var i=0;i<data.result.length;i++){
                            type.push(data.result[i].state)
                            datatime.push(data.result[i].editTime)
                        }
                        if(data.result.length==0){
                            datatime.push(that.startTime)
                            datatime.push(that.endTime)
                        }
                        $('#Chart_left').css('width',width).css('height',height);
                        var ChartLeft = that.$echarts.init(document.getElementById('Chart_left'));
                        ChartLeft.setOption(
                            {
                                title : {
                                    text: that.$t('onlineTime.Timeperiodbrokenlinediagram'),
                                    subtext: '',
                                    x:'center'
                                },
                                tooltip: {
                                    trigger: 'axis'
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
                                    data: datatime, //时间
                                    position:'bottom',
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
                                yAxis : {
                                    type:'value',
                                    min:-1,
                                    max:2,
                                    maxInterval:4,
                                    axisLabel:{
                                         formatter: function (value) {
                                            var texts = []
                                            if(value=='-1'){

                                            }else if(value=='0'){
                                                texts.push('离线');
                                            }else if(value=='1'){
                                                texts.push('在线');
                                            }else if(value=='2'){
                                                
                                            }
                                            return texts;
                                         }
                                    }
                                },
                                series: [
                                    {
                                        name:that.$t('onlineTime.state'),
                                        type:'line',
                                        step: 'end',
                                        data:type
                                    }
                                ],
                            },
                        )
                    }else{
                        that.errorCode(data.errorCode)
                    }
                } 
            })
            setTimeout(function(){
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getEquipmentOnlineTimeChart',
                    data:{
                        MAC:that.MACData,
                        startTime:that.startTime,
                        endTime:that.endTime
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            $('#Chart_right').css('width',width).css('height',height);
                            var ChartRight = that.$echarts.init(document.getElementById('Chart_right'));
                            var onlineTime = (data.result[0].onlineTime/1000).toFixed(2)
                            var offlineTime = (data.result[0].offlineTime/1000).toFixed(2)
                            if(data.result.length==0){
                                var onlineTime = 0
                                var offlineTime = 0
                            }
                            ChartRight.setOption(
                                {
                                    title : {
                                        text: that.$t('onlineTime.Totaltimeonlineofflineratio'),
                                        subtext: '',
                                        x:'center'
                                    },
                                    tooltip : {
                                        trigger: 'item',
                                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                                    },
                                    color:['#67C23A','#909399'],
                                    legend: {
                                        orient: 'vertical',
                                        left: 'left',
                                        data: [that.$t('onlineTime.Onlinetimelength'),that.$t('onlineTime.Offlinelong')]
                                    },
                                    series : [
                                        {
                                            name: '',
                                            type: 'pie',
                                            radius : '55%',
                                            center: ['50%', '60%'],
                                            data:[
                                                {value:onlineTime, name:that.$t('onlineTime.Onlinetimelength')},
                                                {value:offlineTime, name:that.$t('onlineTime.Offlinelong')},
                                            ],
                                            itemStyle: {
                                                emphasis: {
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 0,
                                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                                }
                                            }
                                        }
                                    ]
                                }
                            )
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    } 
                })
            },200)
        },
    },
    created(){
        var that = this
        this.MACdata(this.equipmentType)
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var year2 = '';
        var month2 = '';
        var strDate2 = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
            strDate2 = "0" + date.getDate();
        }
        if(date.getMonth()>=2 && date.getMonth() <= 9){
            year2 = year
            month2 = "0" + date.getMonth();
        }else{
            year2 = year
            month2 = date.getMonth(); 
        }
        if(month==1){
            year2 = year-1
            month2 = 12
        }
        this.endTime = year + seperator1 + month + seperator1 + strDate +' '+'10'+seperator2+'10'+seperator2+'00';
        this.startTime = year2 + seperator1 + month2 + seperator1 + strDate2+' '+'10'+seperator2+'10'+seperator2+'00';
        that.dataTime = [new Date(year2, date.getMonth()-1, strDate2, 10, 10), new Date(year, date.getMonth(), strDate, 10, 10)]
        setTimeout(function(data){
            that.ready()
        },500)
    },
}
</script>
<style scoped>
.onlineTime{width: 100%;height: 100%;padding: 15px;position: relative;}
.onlineTime_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.onlineTime_nav>i{font-size: 23px;}
.onlineTime_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.onlineTime_top{width: 100%;height: 40px;display: flex;justify-content: center;align-items: center;border-bottom: 1px solid #c4c4c4;}
.text_form{display: flex;margin:0 10px;}
.text_form>span{font-size: 15px;margin-top: 7px;}
.text_form>input,.text_form>div{width: 166px;}
.onlineTime_bottom{width: 100%;position: absolute;top: 40px;bottom: 0;display: flex;justify-content: center;align-items: center}
.onlineTime_bottom>div{width: 47%;height:100%;display: flex;justify-content: center;align-items: center;}
.onlineTime_bottom>div>div{width: 80%;height: 80%;}
</style>
