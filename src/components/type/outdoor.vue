<template>
    <div class="outdoor">
        <div class="outdoor_top">
            <div>
                <p>TSBC</p>
                <p>{{EquipmentCount.tsbcOnline}}</p>
                <p>在线设备</p>
                <p>离线:{{EquipmentCount.tsbcSum}}</p>
                <p>总计:{{EquipmentCount.tsbcOnline + EquipmentCount.tsbcSum}}</p>
            </div>
            <span><img src="../../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBA</p>
                <p>{{EquipmentCount.tsbaOnline}}</p>
                <p>在线设备</p>
                <p>离线:{{EquipmentCount.tsbaSum}}</p>
                <p>总计:{{EquipmentCount.tsbaOnline + EquipmentCount.tsbaSum}}</p>
            </div>
            <span><img src="../../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBG</p>
                <p>{{EquipmentCount.tsbgOnline}}</p>
                <p>在线设备</p>
                <p>离线:{{EquipmentCount.tsbgSum}}</p>
                <p>总计:{{EquipmentCount.tsbgOnline + EquipmentCount.tsbgSum}}</p>
            </div>
        </div>
        <div class="outdoor_center">
            <div>
                <p>2.4G频谱信道分布图</p>
                <div class="outdoor_center_left_bottom" id="myCharttwo"></div>
            </div>
            <div>
                <p>2.5G频谱信道分布图</p>
                <div class="outdoor_center_left_bottom" id="myChartfour"></div>
            </div>
        </div>
        <div class="outdoor_bottom">
            <div>
                <p>设备分布</p>
                <div class="outdoor_bottom_botom" id="myChartthree"></div>
            </div>
            <div>
                <p>虚拟链路使用频率分布</p>
                <div class="outdoor_bottom_botom" id="myChartone"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'outdoor',
    data () {
        return {
            serverurl:localStorage.serverurl,
            options: [],
            value: '1',
            EquipmentCount:{}, //设备统计信息
        }
    },
    mounted(){
        this.rendy()
    },
    methods:{
        rendy(){
            var that = this
            var data = {};
            if(sessionStorage.departmentId=='1'){
                data.departmentId = that.value
            }else{
                data.departmentId = ''
            }
            var myChartone = this.$echarts.init(document.getElementById('myChartone'))
            var myCharttwo = this.$echarts.init(document.getElementById('myCharttwo'))
            var myChartthree = this.$echarts.init(document.getElementById('myChartthree'))
            var myChartfour = this.$echarts.init(document.getElementById('myChartfour'))
            //获取设备统计信息
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'statistics/getEquipmentCount',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        that.EquipmentCount = data.result
                        var tsbc = data.result.tsbcOnline + data.result.tsbcSum
                        var tsba = data.result.tsbaOnline + data.result.tsbaSum
                        var tsbg = data.result.tsbgOnline + data.result.tsbgSum
                        myChartthree.setOption({
                            title : {
                                text: '',
                                subtext: '',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['tsbc','tsba','tsbg']
                            },
                            series : [
                                {
                                    name: '设备分布',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:tsbc, name:'tsbc'},
                                        {value:tsba, name:'tsba'},
                                        {value:tsbg, name:'tsbg'},
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
                        })
                    }
                }
            })
            //获取2.4G频谱信道分布图
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'statistics/getwifi2ChannelCount',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        var datas = [];
                        data.result.sort(function(a,b){
                            return Number(a.wifi2Channel) > Number(b.wifi2Channel)
                        })
                        for(var i=0;i<data.result.length;i++){
                            if(data.result[i].wifi2Channel==''){

                            }else{
                                datas.push(data.result[i].total)
                            } 
                        }
                        myCharttwo.setOption({
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '20%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13'],
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    name:'无线频率'
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name:'设备数量',
                                    max:10,
                                }
                            ],
                            series : [
                                {
                                    name:'使用数量',
                                    type:'bar',
                                    barWidth: '35%',
                                    data:datas
                                }
                            ]
                        })
                    }
                }
            })
            //获取2.5G频谱信道分布图
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'statistics/getwifi5ChannelCount',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        var datas = [];
                        data.result.sort(function(a,b){
                            return Number(a.wifi5Channel) > Number(b.wifi5Channel)
                        })
                        for(var i=0;i<data.result.length;i++){
                            if(data.result[i].wifi5Channel==''){

                            }else{
                                datas.push(data.result[i].total)
                            } 
                        }
                        myChartfour.setOption({
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '20%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['36', '40', '44', '48', '149', '153', '157', '161', '165'],
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    name:'无线频率'
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name:'设备数量',
                                    max:10,
                                }
                            ],
                            series : [
                                {
                                    name:'使用数量',
                                    type:'bar',
                                    barWidth: '35%',
                                    data:datas
                                }
                            ]
                        })
                    }
                }
            })
            //获取虚拟链路统计数据
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'statistics/getTsbcVirtuaLinkCount',
                data:data,
                success:function(data){
                    if(data.errorCode=='0'){
                        var one = '';var two = '';var three = '';
                        for(var i='0';i<data.result.length;i++){
                            if(data.result[i].useLink=='2G'){
                                if(data.result[i].sum==''){
                                    one = 0
                                }else{
                                    one = data.result[i].sum
                                }
                            }
                            if(data.result[i].useLink=='5G'){
                                if(data.result[i].sum==''){
                                    two = 0
                                }else{
                                    two = data.result[i].sum
                                }
                            }
                            if(data.result[i].useLink=='ETH'){
                                if(data.result[i].sum==''){
                                    three = 0
                                }else{
                                    three = data.result[i].sum
                                }
                            }
                        }
                        myChartone.setOption({
                            title : {
                                text: '',
                                subtext: '',
                                x:'center'
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['2G','5G','ETH']
                            },
                            series : [
                                {
                                    name: '使用数量',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    data:[
                                        {value:one, name:'2G'},
                                        {value:two, name:'5G'},
                                        {value:three, name:'ETH'}
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
                        })
                    }
                }
            })
        },
    },
    created(){}
}
</script>
<style scoped>
.outdoor{width: 100%;height: 100%;}
.outdoor_top{width: 100%;height: 160px;display: flex;justify-content: center;}
.outdoor_top>div{display: inline-block;width: 160px;height: 160px;margin-top:10px;background-image: url('../../assets/u43.png');background-repeat: no-repeat;}
.outdoor_top>span{display: inline-block;height: 100%;line-height: 160px;}
.outdoor_top>div>p{padding-right: 10px;color: black;margin-bottom: 0;}
.outdoor_top>div>p:nth-of-type(1){margin-top:15px;}
.outdoor_top>div>p:nth-of-type(2){margin-top:5px;font-size: 18px;}
.outdoor_top>div>p:nth-of-type(4){margin-top:12px;}

.outdoor_center{width: 100%;height: 260px;display: flex;margin-top:15px;}
.outdoor_center>div{width: 45%;height: 100%;margin-left: 3%;}
.outdoor_center>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.outdoor_center_left_bottom{width: 100%;height:233px;}

.outdoor_center{width: 100%;height: auto;display: flex;position: absolute;top:450px;bottom: 10px;}
.outdoor_center>div{width: 45%;height: 100%;margin-left: 3%;position: relative;}
.outdoor_center>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.outdoor_bottom_botom{width: 100%;height:auto;min-height:250px;position: absolute;top:25px;bottom: 0;}
</style>
