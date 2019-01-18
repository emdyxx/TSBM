<template>
    <div class="factory">
        <div class="echarts_type" v-if="select">
            <el-select v-model.lazy="value" @change="echartstype">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="echarts_top">
            <div class="echarts_top_div1" v-if="scenneType=='0'">
                <div class="echarts_top_div1_ue" @click="factorylink(1)" style="border:none;">
                    <p style="padding-top:5px;">在线:<span style="font-weight:600;">{{EquipmentCount.ueOnline}}</span></p>
                    <p>离线:{{EquipmentCount.ueSum-EquipmentCount.ueOnline}}</p>
                    <p class="iconfont icon-yonghu" style="font-size:32px;margin-top: -7px;padding:0;"></p>
                    <p>近一周在线率</p>
                    <p style="font-weight:600;">{{EquipmentCount.ueRate}}</p>
                </div>
                <span style="width:90px;margin-left:-20px;"></span>
                <div class="echarts_top_div1_tsbc" @click="factorylink(3)">
                    <p style="padding-top:5px;">TSBC</p>
                    <p style="font-weight:600;">{{EquipmentCount.tsbcOnline}}</p>
                    <p>在线</p>
                    <p style="padding-top:10px;">离线:{{EquipmentCount.tsbcSum-EquipmentCount.tsbcOnline}}</p>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <span></span>
                <div class="echarts_top_div1_tsba" @click="factorylink(4)">
                    <p style="padding-top:5px;">TSBA</p>
                    <p style="font-weight:600;">{{EquipmentCount.tsbaOnline}}</p>
                    <p>在线</p>
                    <p style="padding-top:10px;">离线:{{EquipmentCount.tsbaSum-EquipmentCount.tsbaOnline}}</p>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <span style="width:90px;"></span>
                <div class="echarts_top_div1_tsbg" @click="factorylink(2)" style="border:none;">
                    <p style="padding-top:5px;">在线:<span style="font-weight:600;">{{EquipmentCount.tsbgOnline}}</span></p>
                    <p style='padding-top:2px;'>离线:{{EquipmentCount.tsbgSum-EquipmentCount.tsbgOnline}}</p>
                    <p class="echarts_top_div1_tsbg_p">
                        <img src="../../assets/tsbg_image.png" alt="" style="width:110px;">
                        <!-- <a>
                            <span></span>
                            <span></span>
                        </a>
                        <a>TSBG</a>
                        <span style="margin-left: 8px;"></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>  -->
                    </p>
                    <p style='padding-top:5px;'>近一周在线率</p>
                    <p style="font-weight:600;">{{EquipmentCount.tsbgRate}}</p>
                </div>
            </div>
            <div class="echarts_top_div2" v-if="scenneType=='1'">
                <div class="echarts_top_div1_ue" @click="factorylink(1)" style="border:none;">
                    <p style="padding-top:5px;">在线:<span style="font-weight:600;">{{EquipmentCount.ueOnline}}</span></p>
                    <p>离线:{{EquipmentCount.ueSum-EquipmentCount.ueOnline}}</p>
                    <p class="iconfont icon-yonghu" style="font-size:32px;margin-top: -7px;padding:0;"></p>
                    <p>近一周在线率</p>
                    <p style="font-weight:600;">{{EquipmentCount.ueRate}}</p>
                </div>
                <span style="width:90px;margin-left:-20px;"></span>
                <div class="echarts_top_div2_tsbc" @click="factorylink(3)" style="margin-left:-22px;background:none;">
                    <img src="../../assets/tsbcOnline.png" alt="">
                    <div>
                        <p style="margin-top:35px;">TSBC</p>
                        <p style="font-weight:600;">{{EquipmentCount.tsbcOnline}}</p>
                        <p>在线</p>
                        <p style="margin-top:15px;padding:0;">离线</p>
                        <p>{{EquipmentCount.tsbcSum-EquipmentCount.tsbcOnline}}</p>
                    </div>
                </div>
                <span style="margin-left:-24px;"></span>
                <div class="echarts_top_div2_tsba" @click="factorylink(4)" style="background:none;">
                    <img src="../../assets/tsbaOnline.png" alt="">
                    <div>
                        <p style="margin-top:42px;">TSBA</p>
                        <p style="font-weight:600;">{{EquipmentCount.tsbaOnline}}</p>
                        <p>在线</p>
                        <p style="margin-top:33px;padding:0;">离线</p>
                        <p>{{EquipmentCount.tsbaSum-EquipmentCount.tsbaOnline}}</p>
                    </div>
                </div>
                <span style="width:90px;margin-left:-27px;"></span>
                <div class="echarts_top_div2_tsbg" @click="factorylink(2)" style="border:none">
                    <p style="padding-top:5px;">在线:<span style="font-weight:600;">{{EquipmentCount.tsbgOnline}}</span></p>
                    <p style='padding-top:2px;'>离线:{{EquipmentCount.tsbgSum-EquipmentCount.tsbgOnline}}</p>
                    <p class="echarts_top_div2_tsbg_p">
                        <img src="../../assets/tsbg_image.png" alt="" style="width:110px;">
                        <!-- <a>
                            <span></span>
                            <span></span>
                        </a>
                        <a>TSBG</a>
                        <span style="margin-left: 8px;"></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>  -->
                    </p>
                    <p style='padding-top:5px;'>近一周在线率</p>
                    <p style="font-weight:600;">{{EquipmentCount.tsbgRate}}</p>
                </div>
            </div>
        </div>
        <div class="echarts_center">
            <div>
                <p>{{$t('factory.spectrumchanneldistribution2G')}}</p>
                <div class="echarts_center_left_bottom" id="myCharttwo">
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[0]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">1</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[1]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">2</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[2]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">3</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[3]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">4</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[4]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">5</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[5]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">6</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[6]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">7</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[7]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">8</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[8]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">9</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[9]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">10</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[10]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">11</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[11]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">12</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site[12]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" style="border-right: 2px solid #cccccc;box-sizing: content-box;" alt="">13</div>
                    </div>
                </div>
            </div>
            <div>
                <p>{{$t('factory.spectrumchanneldistribution5G')}}</p>
                <div class="echarts_center_left_bottom" id="myChartfour">
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[0]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">36</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[1]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">40</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[2]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">44</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[3]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">48</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[4]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">149</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[5]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">153</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[6]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">157</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[7]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" alt="">161</div>
                    </div>
                    <div>
                        <div class="spot">
                            <div>
                                <template v-for='item in site2[8]'>
                                    <span @click='routerMAC(item.MAC)' :style="`width:9px;height:9px;position:absolute;left:${item.left}px;bottom:${item.bottom}px;background:${item.color};`" :key="item.MAC" :title=item.MAC></span>
                                </template>
                            </div>
                        </div>
                        <div><img src="../../assets/f.png" style="border-right: 2px solid #cccccc;box-sizing: content-box;" alt="">165</div>
                    </div>    
                </div>
            </div>
        </div>
        <div class="echarts_bottom">
            <div>
                <p>{{$t('factory.Equipmentdistribution')}}</p>
                <div class="echarts_bottom_botom" id="myChartthree"></div>
            </div>
            <div>
                <p>{{$t('factory.Virtuallinkusagedistribution')}}</p>
                <div class="echarts_bottom_botom" id="myChartone"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'factory',
    data () {
        return {
            serverurl:localStorage.serverurl,
            select: false ,
            options: [],
            value: '1',
            EquipmentCount:{}, //设备统计信息
            site:[],
            site2:[],
            scenneType:'',
        }
    },
    mounted(){
        this.rendy()
    },
    methods:{
        rendy(){
            var that = this;
            var data = {};
            if(sessionStorage.departmentId=='1'){
                data.departmentId = that.value
            }else{
                data.departmentId = ''
            }
            var myChartone = this.$echarts.init(document.getElementById('myChartone'))
            var myChartthree = this.$echarts.init(document.getElementById('myChartthree'))
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
                        if(that.EquipmentCount.tsbcSum == that.EquipmentCount.tsbcOnline){
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsbc').css('background-color','#46F143')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsbc>img').attr('src',that.serverurl+'img/factory/tsbcOnline.png')}
                        }else if(that.EquipmentCount.tsbcOnline=='0'){
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsbc').css('background-color','#F35353')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsbc>img').attr('src',that.serverurl+'img/factory/tsbcRed.png')}
                        }else{
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsbc').css('background-color','#F1EA3D')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsbc>img').attr('src',that.serverurl+'img/factory/tsbcYellow.png')}
                        }
                        if(that.EquipmentCount.tsbaSum == that.EquipmentCount.tsbaOnline){
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsba').css('background-color','#46F143')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsba>img').attr('src',that.serverurl+'img/factory/tsbaOnline.png')}
                        }else if(that.EquipmentCount.tsbaOnline=='0'){
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsba').css('background-color','#F35353')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsba>img').attr('src',that.serverurl+'img/factory/tsbaRed.png')}
                        }else{
                            if(that.scenneType=='0'){$('.echarts_top_div1_tsba').css('background-color','#F1EA3D')}
                            if(that.scenneType=='1'){$('.echarts_top_div2_tsba>img').attr('src',that.serverurl+'img/factory/tsbaYellow.png')}
                        }
                        // if(that.EquipmentCount.tsbgSum == that.EquipmentCount.tsbgOnline){
                        //     if(that.scenneType=='0'){$('.echarts_top_div1_tsbg_p').css('background-color','#46F143')}
                        //     if(that.scenneType=='1'){$('.echarts_top_div2_tsbg_p').css('background-color','#46F143')}
                        // }else if(that.EquipmentCount.tsbgOnline=='0'){
                        //     if(that.scenneType=='0'){$('.echarts_top_div1_tsbg_p').css('background-color','#F35353')}
                        //     if(that.scenneType=='1'){$('.echarts_top_div2_tsbg_p').css('background-color','#F35353')}
                        // }else{
                        //     if(that.scenneType=='0'){$('.echarts_top_div1_tsbg_p').css('background-color','#F1EA3D')}
                        //     if(that.scenneType=='1'){$('.echarts_top_div2_tsbg_p').css('background-color','#F1EA3D')}
                        // }
                        var tsbc = data.result.tsbcSum
                        var tsba = data.result.tsbaSum
                        var tsbg = data.result.tsbgSum
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
                                    name: that.$t('factory.Equipmentdistribution'),
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
            setTimeout(function(){
                //获取2.4G频谱信道分布图
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getWifi2ChannelCountNew',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.site = []
                            var x=0;var y=0;
                            var left=0;var bottom=0;var MAC='';var array = [];
                            for(var i = 0;i<data.result.length;i++){
                                x=0;y=0;array = [];
                                for(var j = 0;j<data.result[i].wifi2ChannelResult.length;j++){
                                    if(x==3){x=0;y++}
                                    left=x*16;bottom=y*15;MAC=data.result[i].wifi2ChannelResult[j].MAC
                                    var datas={
                                        left:left,
                                        bottom:bottom,
                                        MAC:MAC,
                                    }
                                    if(data.result[i].wifi2ChannelResult[j].online=='0'){datas.color='#C1C4C8;'}
                                    if(data.result[i].wifi2ChannelResult[j].online=='1'){datas.color='#33F730;'}
                                    array.push(datas)
                                    x++;
                                }
                                that.site.push(array)
                            }
                        }
                    }
                })
            },200)
            setTimeout(function(){
                //获取5.8G频谱信道分布图
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'statistics/getWifi5ChannelCountNew',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.site2 = [];
                            var x=0;var y=0;var left=0;var bottom=0;var MAC='';var array=[];
                            for(var i=0;i<data.result.length;i++){
                                x=0;y=0;array = [];
                                for(var j=0;j<data.result[i].wifi5ChannelResult.length;j++){
                                    if(x==3){x=0;y++}
                                    left=x*16;bottom=y*15;MAC=data.result[i].wifi5ChannelResult[j].MAC
                                    var datas={
                                        left:left,
                                        bottom:bottom,
                                        MAC:MAC,
                                    }
                                    if(data.result[i].wifi5ChannelResult[j].online=='0'){datas.color='#C1C4C8;'}
                                    if(data.result[i].wifi5ChannelResult[j].online=='1'){datas.color='#33F730;'}
                                    array.push(datas)
                                    x++;
                                }
                                that.site2.push(array)
                            }
                        }
                    }
                })  
            },400)
            setTimeout(function(){
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
                            var one = '0';var two = '0';var three = '0';var four = '0';
                            if(data.result.length==0){
                                one='0'
                                two='0'
                                three='0'
                                four=''
                            }else{
                                for(var i='0';i<data.result.length;i++){
                                    if(data.result[i].currentLink!=''){
                                        if(data.result[i].currentLink=='ath0'){
                                            if(data.result[i].sum==''){
                                                one = 0
                                            }else{
                                                one = data.result[i].sum
                                            }
                                        }
                                        if(data.result[i].currentLink=='ath1'){
                                            if(data.result[i].sum==''){
                                                two = 0
                                            }else{
                                                two = data.result[i].sum
                                            }
                                        }
                                        if(data.result[i].currentLink=='eth0.1'){
                                            if(data.result[i].sum==''){
                                                three = 0
                                            }else{
                                                three = data.result[i].sum
                                            }
                                        }
                                        if(data.result[i].currentLink=='eth0'){
                                            if(data.result[i].sum==''){
                                                four = 0
                                            }else{
                                                four = data.result[i].sum
                                            }
                                        }else{
                                            four = four+data.result[i].sum
                                        }
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
                                    data: ['2.4G','5.8G','ETH']
                                },
                                series : [
                                    {
                                        name: that.$t('factory.Amountofuse'),
                                        type: 'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        data:[
                                            {value:one, name:'2.4G'},
                                            {value:two, name:'5.8G'},
                                            {value:three+four, name:'ETH'}
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
            },600)
        },
        routerMAC(val){
            sessionStorage.menuId = 31
            this.$router.push({'path':'/TSBManage',query:{MAC:val}})
        },
        //部门change事件
        echartstype(val){
            for(var i=0;i<this.options.length;i++){
                if(this.value==this.options[i].value){
                    this.scenneType=this.options[i].scenne
                }
            }
            this.rendy()
        },
        //点击最上侧数据展示进行相应页面跳转     
        factorylink(val){
            if(val=='1'){
                sessionStorage.menuId = 41
                this.$router.push({path:'/equipmentUser',query:{locationNum:val}})
            }else{
                sessionStorage.menuId = 31
                this.$router.push({path:'/TSBManage',query:{locationNum:val}})
            }
        }
    },
    created(){
        var that = this;
        if(sessionStorage.departmentId=='1'){
            that.select = true
            $.ajax({
                type:'get',
                async:true,
                dataType:'json',
                xhrFields:{withCredentials:true},
                url:that.serverurl+'department/getTopDepartment',
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.options = data.result
                        that.value = data.result[0].value
                        that.scenneType = data.result[0].scenne
                    }else{
                        that.errorCode(data)
                    }
                }
            })
        }
    },
}
</script>
<style scoped>
.factory{width: 100%;height: 100%;}
.echarts_type{position: absolute;width:150px;height: 36px;top:20px;left: 10px;}
.echarts_top{width: 100%;height: 160px;display: flex;justify-content: center;align-items: center;}
.echarts_top>div{height: 100%;display: flex;align-items: center;}
.echarts_top_div1>span,.echarts_top_div2>span{display: inline-block;width: 70px;border-top: 1px solid #cccccc;}
.echarts_top_div1_tsbc,.echarts_top_div1_tsba,.echarts_top_div1_tsbg,.echarts_top_div1_ue,.echarts_top_div2_tsbg{width: 110px;height: 140px;border: 1px solid #cccccc;border-radius: 8px;cursor: pointer;}
.echarts_top_div1_tsbc>p,.echarts_top_div1_tsba>p,.echarts_top_div1_tsbg>p,.echarts_top_div1_ue>p,.echarts_top_div2_tsbg>p{margin: 0;font-size: 14px;padding: 0 0 5px 0;}
.echarts_top_div1_tsbc>div>span,.echarts_top_div1_tsba>div>span,.echarts_top_div1_tsbg>div>span,.echarts_top_div1_ue>div>span.echarts_top_div2_tsbg>div>span{display: inline-block;width: 8px;height: 8px;border: 1px solid #cccccc;margin: 0 3px 0 3px;}

/* .echarts_top_div1_tsbg_p,.echarts_top_div2_tsbg_p{border: 1px solid #cccccc;border-radius: 5px;height: 30px;line-height: 30px;margin-top: -2px;position: relative;}
.echarts_top_div1_tsbg_p>a:nth-of-type(1),.echarts_top_div2_tsbg_p>a:nth-of-type(1){display: inline-block;position: absolute;left: 5px;height: 100%;}
.echarts_top_div1_tsbg_p>a>span,.echarts_top_div2_tsbg_p>a>span{display: block;width: 10px;height: 6px;border: 1px solid #cccccc;margin-top: 5px;}
.echarts_top_div1_tsbg_p>span,.echarts_top_div2_tsbg_p>span{display: inline-block;width:9px;height: 9px;border: 1px solid #cccccc;margin-top: 13px;}
.echarts_top_div1_tsbg_p>a:nth-of-type(2),.echarts_top_div2_tsbg_p>a:nth-of-type(2){position: absolute;right: 0;top: 0;color:#555555;font-size: 8px;width: 33px;height: 15px;line-height: 15px;text-decoration: none;} */

.echarts_top_div2_tsbc,.echarts_top_div2_tsba{width: 110px;height: 140px;cursor: pointer;position: relative;}
.echarts_top_div2_tsbc>img{width: 90px;position: absolute;top: 20px;left: 10px;z-index: 1;}
.echarts_top_div2_tsbc>div,.echarts_top_div2_tsba>div{width: 100%;height: 100%;z-index: 99;position: absolute;}
.echarts_top_div2_tsbc>div>p{margin: 0;padding: 0 0 5px 0;}
.echarts_top_div2_tsba{margin-left: -27px;}
.echarts_top_div2_tsba>img{position: absolute;top: 25px;left: 5px;width: 100px;height: 103px;}
.echarts_top_div2_tsba>div>p{margin:0;height: 17px;}


.echarts_center{width: 100%;height: 260px;display: flex;margin-top:15px;}
.echarts_center>div{width: 45%;height: 100%;margin-left: 3%;}
.echarts_center>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.echarts_center_left_bottom{width: 100%;height:233px;display: flex;}
#myCharttwo>div{width: 7.6%;height: 100%;}
#myChartfour{display: flex;justify-content: center;}
#myChartfour>div{width:8% ;height: 100%;}
#myCharttwo>div>div:nth-of-type(1),#myChartfour>div>div:nth-of-type(1){width:100%;height: 200px;position: relative;display: flex;justify-content: center;margin-left:2px;z-index: 2;}
#myCharttwo>div>div:nth-of-type(2),#myChartfour>div>div:nth-of-type(2){width: 100%;height: 32px;position: relative;line-height:40px;font-size:16px;font-weight: 600;z-index: 1;}
#myCharttwo>div>div:nth-of-type(2)>img,#myChartfour>div>div:nth-of-type(2)>img{position: absolute;top: -7px;width: 100%;left: 0;}
.spot>div{width: 45px;position: absolute;bottom: 0;}

.echarts_bottom{width: 100%;height: auto;display: flex;position: absolute;top:450px;bottom: 10px;}
.echarts_bottom>div{width: 45%;height: 100%;margin-left: 3%;position: relative;}
.echarts_bottom>div>p{text-align: left;padding-left: 8px;border-bottom: 1px solid #CCCCCC;margin-bottom: 5px;}
.echarts_bottom_botom{width: 100%;height:auto;min-height:250px;position: absolute;top:25px;bottom: 0;}
</style>