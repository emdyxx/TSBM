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
            <span><img src="../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBA</p>
                <p>6</p>
                <p>在线设备</p>
                <p>离线:0</p>
                <p>总计:6</p>
            </div>
            <span><img src="../assets/u91_seg0.png" alt=""></span>
            <div>
                <p>TSBG</p>
                <p>1</p>
                <p>在线设备</p>
                <p>离线:0</p>
                <p>总计:1</p>
            </div>
        </div>
        <div class="echarts_center">
            <div class="echarts_center_left">
                <p>虚拟链路使用频率分布</p>
                <div class="echarts_center_left_bottom" id="myChartone"></div>
            </div>
            <div class="echarts_center_right">
                <p>虚拟链路使用频率分布</p>
                <div class="echarts_center_left_bottom"></div>
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
    methods:{
        rendy(){
            var that = this
            // console.log(that.$refs.myChartone)
            // var myChart = this.$echarts.init(document.getElementById('myChartone'))
            // myChart.setOption({
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     legend: {
            //         data:['销量']
            //     },
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // })
        }
    },
    created(){
        
    }
}
</script>
<style scoped>
.echarts{width: 100%;height: 100%;}
.echarts_top{width: 100%;height: 160px;display: flex;justify-content: center;}
.echarts_top>div{display: inline-block;width: 160px;height: 160px;margin-top:10px;background-image: url('../assets/u43.png');background-repeat: no-repeat;}
.echarts_top>span{display: inline-block;height: 100%;line-height: 160px;}
.echarts_top>div>p{padding-right: 10px;color: black;margin-bottom: 0;}
.echarts_top>div>p:nth-of-type(1){margin-top:15px;}
.echarts_top>div>p:nth-of-type(2){margin-top:5px;font-size: 18px;}
.echarts_top>div>p:nth-of-type(4){margin-top:12px;}

.echarts_center{width: 100%;height: 250px;display: flex;margin-top:10px;}
.echarts_center>div{width: 45%;height: 100%;margin-left: 3%;}
.echarts_center>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.echarts_center_left_bottom{width: 100%;height:223px;}
</style>
