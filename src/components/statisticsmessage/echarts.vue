<template>
  <div class="echarts">
        <div class="echarts_top">
            <div>
                <p>TSBC</p>
                <p>23</p>
                <p>在线设备</p>
                <p>离线:2</p>
                <p>总计:25</p>
            </div>
            <span><img src="../../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBA</p>
                <p>6</p>
                <p>在线设备</p>
                <p>离线:0</p>
                <p>总计:6</p>
            </div>
            <span><img src="../../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBG</p>
                <p>1</p>
                <p>在线设备</p>
                <p>离线:0</p>
                <p>总计:1</p>
            </div>
        </div>
        <div class="echarts_center">
            <div>
                <p>2.4G频谱信道分布图</p>
                <div class="echarts_center_left_bottom" id="myCharttwo"></div>
            </div>
            <div>
                <p>5.8G频谱信道分布图</p>
                <div class="echarts_center_left_bottom" id="myChartfour"></div>
            </div>
        </div>
        <div class="echarts_bottom">
            <div>
                <p>设备分布</p>
                <div class="echarts_bottom_botom" id="myChartthree"></div>
            </div>
            <div>
                <p>虚拟链路使用频率分布</p>
                <div class="echarts_bottom_botom" id="myChartone"></div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    name: 'echarts',
    data () {
        return {}
    },
    mounted(){
        this.rendy()
    },
    methods:{
        rendy(){
            var that = this
            var myChartone = this.$echarts.init(document.getElementById('myChartone'))
            var myCharttwo = this.$echarts.init(document.getElementById('myCharttwo'))
            var myChartthree = this.$echarts.init(document.getElementById('myChartthree'))
            var myChartfour = this.$echarts.init(document.getElementById('myChartfour'))
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
                    right: '10%',
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
                        name:'设备数量'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '35%',
                        data:[10, 20, 30, 40, 20, 10, 50, 80, 70, 15, 40, 50, 60]
                    }
                ]
            })
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
                    right: '10%',
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
                        name:'设备数量'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '35%',
                        data:[10, 20, 30, 40, 20, 10, 50, 80, 70]
                    }
                ]
            })
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
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
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
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
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
    },
    created(){
        
    }
}
</script>
<style scoped>
.echarts{width: 100%;height: 100%;}
.echarts_top{width: 100%;height: 160px;display: flex;justify-content: center;}
.echarts_top>div{display: inline-block;width: 160px;height: 160px;margin-top:10px;background-image: url('../../assets/u43.png');background-repeat: no-repeat;}
.echarts_top>span{display: inline-block;height: 100%;line-height: 160px;}
.echarts_top>div>p{padding-right: 10px;color: black;margin-bottom: 0;}
.echarts_top>div>p:nth-of-type(1){margin-top:15px;}
.echarts_top>div>p:nth-of-type(2){margin-top:5px;font-size: 18px;}
.echarts_top>div>p:nth-of-type(4){margin-top:12px;}

.echarts_center{width: 100%;height: 260px;display: flex;margin-top:15px;}
.echarts_center>div{width: 45%;height: 100%;margin-left: 3%;}
.echarts_center>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.echarts_center_left_bottom{width: 100%;height:233px;}

.echarts_bottom{width: 100%;height: auto;display: flex;position: absolute;top:450px;bottom: 10px;overflow: auto;}
.echarts_bottom>div{width: 45%;height: 100%;margin-left: 3%;position: relative;}
.echarts_bottom>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.echarts_bottom_botom{width: 100%;height:auto;min-height:250px;position: absolute;top:25px;bottom: 0;}
</style>
