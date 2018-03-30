<template>
    <div class="templateManage" id="templateManage">
        <div class="templateManage_nav">
            设备管理<i class="iconfont icon-icon"></i>模板管理
        </div>
        <div class="templateManage_main">
            <div class="templateManage_top">
                <el-button v-if="addtemplate" @click="addtemplateT" type="primary" icon="plus " size="small">添加模板</el-button>
            </div>
            <!-- 添加修改模态框（Modal） -->
            <div class="modal fade" id="addmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:750px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title myModalLabel" id="myModalLabel" style="text-align:left;">添加模板</h4>
                        </div>
                        <div class="modal-body">
                            <div class="template_top" v-if="showtype=='1'">
                                <div v-if="Administrator">
                                    <span>分组:</span>
                                    <el-select v-model.lazy="value" placeholder="请选择分组" style="width:180px;">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div v-if="addrelative=='0'" style="margin-left:10px;margin-top:15px;">
                                    <span>类别:</span>
                                    <el-radio-group @change="typestatus" v-model.lazy="radio2">
                                        <el-radio :label="0">tsbg</el-radio>
                                        <el-radio :label="1">tsbc</el-radio>
                                        <el-radio :label="2">tsba</el-radio>
                                    </el-radio-group>
                                </div>
                                <div v-if="addrelative=='0'">
                                    <span>型号:</span>
                                    <el-select @change="modelstatus" v-model.lazy="valuetwo" placeholder="请选择型号" style="width:180px;">
                                        <el-option
                                        v-for="item in optionstwo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span><i class="required">*</i>模板名称:</span>
                                    <input type="text" v-model.lazy="templateName" class="inputType form-control logManage_main_input" style="width:146px;display:inline-block;" placeholder="请输入模板名称" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>备注:</span>
                                    <input type="text" v-model.lazy="summary" class="inputType form-control logManage_main_input" style="width:256px;display:inline-block;" placeholder="请输入备注" minlength="1" maxlength="100" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                </div>
                            </div>
                            <div class="template_center" v-if="showtype=='1'">
                                <el-collapse v-model.lazy="activeNames" accordion>
                                    <el-collapse-item v-if="radio2=='0'&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            IP类型:
                                            <select class="form-control logManage_main_input" v-model.lazy="tsbgcollcate.ipType" style="width:168px;">
                                                <option value="STATIC">STATIC</option>
                                                <option value="DHCP">DHCP</option>
                                                <option value="PPPOE">PPPOE</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbgcollcate.ipType=='STATIC'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>IP地址:</td>
                                                        <td>
                                                            <input type="text" v-model.lazy="tsbgcollcate.wanIP" placeholder="请输入IP地址" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>网关:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>主DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>辅DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbgcollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>PPPoE用户名:</td>
                                                        <td>
                                                            <input type="text" v-model.lazy="tsbgcollcate.wanPPPoEUsername" placeholder="请输入PPPoE用户名" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')">
                                                        </td>
                                                        <td><i class="required">*</i>PPPoE密码:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPoE密码" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>DNS1:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEDNS1" placeholder="请输入DNS1" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>DNS2:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入DNS2" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='0'&&lookoverstatus.LAN!=''" title="LAN配置" name="3" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>IP地址:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanIp" placeholder="请输入IP地址" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="basicstatus_top">
                                                DHCP服务
                                            </div>
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>起始地址:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanStartAddress" class="inputType form-control logManage_main_input" placeholder="请输入起始地址" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>结束地址:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanEndAddress" class="inputType form-control logManage_main_input" placeholder="请输入结束地址" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>网关地址:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关地址" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DNS1:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS服务器" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>DNS2:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS服务器" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DHCP服务器:</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbgcollcate.startDhcpServer">
                                                                <el-radio :label="1">启用</el-radio>
                                                                <el-radio :label="0">不启用</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="5" style="text-align:left;">
                                        <!-- tsbc WIFI设置(2G) -->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model="tsbccollcate.wifi2Enable" @change="TSBCwifi2Enable2G">
                                                    <el-radio :label="1">启用</el-radio>
                                                    <el-radio :label="0">不启用</el-radio>
                                                </el-radio-group>
                                            </div>
                                            工作模式:
                                            <select v-model="tsbccollcate.wifi2WorkMode" @change="tsbcwifi2WorkMode2g">
                                                <option value="AP">AP</option>
                                                <option value="STA">STA</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbccollcate.wifi2WorkMode=='AP'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApSSID" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" placeholder="请输入SSID" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>信道带宽:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApBandwidth" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApChannel" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                            </select>
                                                        </td>
                                                        <td><i class="required">*</i>发射功率:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApLaunchPower" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower2G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApEncryptionMode" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if='tsbccollcate.wifi2ApEncryptionMode=="1"' class="required">*</i>认证秘钥:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApKeyAuth" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbccollcate.wifi2ApHideSSID" :disabled='tsbc2Gradio'>
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbccollcate.wifi2WorkMode=='STA'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaSSID" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" placeholder="请输入SSID" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2StaEncryptionMode" class="tsbc2GselectSta" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbccollcate.wifi2StaEncryptionMode=='1'" class="required">*</i>认证秘钥</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaKeyAuth" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'&&lookoverstatus.wifi5G!=''" title="5G配置" name="6" style="text-align:left;">
                                        <!-- tsbc WIFI设置(5G)-->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model="tsbccollcate.wifi5Enable" @change="TSBCwifi5Enable5G">
                                                    <el-radio :label="1">启用</el-radio>
                                                    <el-radio :label="0">不启用</el-radio>
                                                </el-radio-group>
                                            </div>
                                            工作模式:
                                            <select v-model="tsbccollcate.wifi5WorkMode" @change="tsbcwifi2WorkMode5g">
                                                <option value="AP">AP</option>
                                                <option value="STA">STA</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbccollcate.wifi5WorkMode=='AP'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApSSID" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" placeholder="请输入SSID" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>信道带宽:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApBandwidth" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApChannel" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="36">36</option>
                                                                <option value="40">40</option>
                                                                <option value="44">44</option>
                                                                <option value="48">48</option>
                                                                <option value="149">149</option>
                                                                <option value="153">153</option>
                                                                <option value="157">157</option>
                                                                <option value="161">161</option>
                                                                <option value="165">165</option>
                                                            </select>
                                                        </td>
                                                        <td><i class="required">*</i>发射功率:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApLaunchPower" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower5G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApEncryptionMode" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbccollcate.wifi5ApEncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApKeyAuth" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbccollcate.wifi5ApHideSSID" :disabled="tsbc5Gradio">
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>    
                                        <div v-if="tsbccollcate.wifi5WorkMode=='STA'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaSSID" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" placeholder="请输入SSID" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>加密方式</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5StaEncryptionMode" class="tsbc5GselectSta" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbccollcate.wifi5StaEncryptionMode=='1'" class="required">*</i>认证秘钥</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaKeyAuth" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <!-- <tr>
                                                        <td><i class="required">*</i>优先级</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5StaPriority" style="width:110px;height:29px;">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                            </select>
                                                        </td>
                                                    </tr> -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'||radio2=='2'&&lookoverlan==true" title="网络设置" name="7" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            IP类型:
                                            <select v-model.lazy="tsbctsbacaollcate.ipType" style="width:110px;height:29px;" name="" id="">
                                                <option value="STATIC">STATIC</option>
                                                <option value="DHCP">DHCP</option>
                                                <option value="PPPOE">PPPOE</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbctsbacaollcate.ipType=='STATIC'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ip地址</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanIP" class="inputType form-control logManage_main_input" placeholder="请输入ip地址" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>首选DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入首选DNS" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>备选DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入备选DNS" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>网关:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbctsbacaollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                       <td><i class="required">*</i>PPPOE用户名:</td>
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEUsername" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE用户名" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td> 
                                                       <td><i class="required">*</i>PPPOE密码:</td> 
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE密码" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>  
                                                    </tr>
                                                    <tr>
                                                        <td>DNS1:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS1" placeholder="请输入DNS1" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>DNS2:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入DNS2" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.wifi2Enable" @change="TSBAwifi2Enable2G">
                                                <el-radio :label="1">启用</el-radio>
                                                <el-radio :label="0">不启用</el-radio>
                                            </el-radio-group>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2SSID" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>信道带宽:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2Bandwidth" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2Channel" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                            </select>
                                                        </td>
                                                        <td><i class="required">*</i>发射功率:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2LaunchPower" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower2G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2EncryptionMode" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbacaollcate.wifi2EncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2KeyAuth" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi2HideSSID" :disabled="tsba2Gradio">
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.wifi5G!=''" title="5G配置" name="9" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.wifi5Enable" @change="TSBAwifi5Enable5G">
                                                <el-radio :label="1">启用</el-radio>
                                                <el-radio :label="0">不启用</el-radio>
                                            </el-radio-group>
                                        </div> 
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5SSID" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>信道带宽:</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi5Bandwidth" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5Channel" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="36">36</option>
                                                                <option value="40">40</option>
                                                                <option value="44">44</option>
                                                                <option value="48">48</option>
                                                                <option value="149">149</option>
                                                                <option value="153">153</option>
                                                                <option value="157">157</option>
                                                                <option value="161">161</option>
                                                                <option value="165">165</option>
                                                            </select>
                                                        </td>
                                                        <td><i class="required">*</i>发射功率:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5LaunchPower" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower5G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5EncryptionMode" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbacaollcate.wifi5EncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5KeyAuth" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi5HideSSID" :disabled="tsba5Gradio">
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'||radio2=='2'" title="黑白名单设置" name="10" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <select v-model.lazy="panel">
                                                <option value="1">黑名单</option>
                                                <option value="0">白名单</option>
                                            </select>
                                            <el-button @click="paaelMACS" type="primary" size='small' style="margin-left:15px;">添加</el-button>
                                            <div style="display:inline-block;" v-if="paaelMAC">
                                                <el-input v-model="panelinput" size='small'  style="width:156px;margin-left:15px;" placeholder="请输入MAC"></el-input>
                                                <el-button @click="panelMACT" type="primary" size='small' style="margin-left:5px;">确认</el-button>
                                            </div>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="panel=='0'" class="basicstatus_bottom">
                                            <el-table
                                                :data="panelTable"
                                                border
                                                stripe
                                                tooltip-effect="dark"
                                                style="width: 100%;margin-bottom:10px;">
                                                <el-table-column
                                                prop="MAC"
                                                align='center'
                                                label="MAC">
                                                </el-table-column>
                                                <el-table-column
                                                label="操作"
                                                width="100">
                                                    <template scope="scope">
                                                        <el-button @click="deletepanel(scope.row)" type="primary" size="small">删除</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                        <div v-if="panel=='1'" class="basicstatus_bottom">
                                            <el-table
                                                :data="panelTabletwo"
                                                border
                                                stripe
                                                tooltip-effect="dark"
                                                style="width: 100%;margin-bottom:10px;">
                                                <el-table-column
                                                prop="MAC"
                                                align='center'
                                                label="MAC">
                                                </el-table-column>
                                                <el-table-column
                                                label="操作"
                                                width="100">
                                                    <template scope="scope">
                                                        <el-button @click="deletepanel(scope.row)" type="primary" size="small">删除</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                            <div class="template_two" v-if="showtype=='2'">
                                <div>
                                    <span>指定设备类型:</span>
                                    <select @change="uploadscope" v-model.lazy='valuethree' style="width:126px;height:26px;">
                                        <option value="0">指定设备</option>
                                        <option value="1">指定分组</option>
                                        <option value="2">指定型号</option>
                                    </select>
                                </div>
                                <div v-if="valuethree==0" style="flex-direction: column;">
                                    <el-table
                                        ref="references"
                                        :data="tableData4"
                                        border
                                        tooltip-effect="dark"
                                        style="width: 598px;"
                                        @selection-change="handleSelectionChangetwo">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="nickname"
                                        align='center'
                                        label="设备昵称"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC"
                                        align='center'
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block">
                                        <el-pagination
                                        @size-change="handleSizeChangetwo"
                                        @current-change="handleCurrentChangetwo"
                                        :current-page="PageIndextwo"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="Pagesizetwo"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totaltwo">
                                        </el-pagination>
                                    </div>
                                </div>
                                <div v-if="valuethree==1">
                                    <el-table
                                        ref="references"
                                        :data="tableData4"
                                        border
                                        tooltip-effect="dark"
                                        style="width: 598px;"
                                        @selection-change="handleSelectionChangetwo">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="groupName"
                                        align='center'
                                        label="分组名称"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" v-if="showtype=='1'&&configType=='1'" @click="nextstep" class="btn btn-primary">下一步</button>
                            <button type="button" v-if="showtype=='2'||configType=='0'" @click="save" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="templateManage_bottom">
                <div class="templateManage_bottom_top">
                    <div class="templateManage_formtwo">
                        <span>模板名称:</span>
                        <input type="text" v-model.lazy="templatename" maxlength="40" minlength="1" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入模板名称">
                    </div>
                    <div class="templateManage_formtwo">
                        <span>模板类别:</span>
                        <el-select v-model.lazy="classesvalue" size='small' style="width:126px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in classes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="templateManage_formtwo">
                        <span>适用范围:</span>
                        <el-select v-model.lazy="classesvaluetwo" size='small' style="width:126px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in classestwo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" @click="templateseek" icon="search" style="height:30px;margin-top:5px;" size='small'>搜索</el-button>
                </div>
                <div class="templateManage_bottom_bottom">
                    <el-table
                        :data="tableData3"
                        border
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%;height:auto;maxlength-height:85%;overflow:auto;margin-bottom:10px;">
                        <el-table-column
                        prop="templateName"
                        align='center'
                        label="模板名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        align='center'
                        label="模板类型"
                        width="100">
                            <template scope="scope">
                                <span v-if="scope.row.templateType=='0'">tsbg</span>
                                <span v-if="scope.row.templateType=='1'">tsbc</span>
                                <span v-if="scope.row.templateType=='2'">tsba</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="所属组织"
                        align='center'
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="model"
                        label="适用型号"
                        align='center'
                        width="140">
                        </el-table-column>
                        <el-table-column
                        label="适用范围"
                        align='center'
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.templateOrder=='0'">指定设备</span>
                                <span v-if="scope.row.templateOrder=='1'">指定设备分组</span>
                                <span v-if="scope.row.templateOrder=='2'">指定设备型号</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        label="模板类别"
                        align='center'
                        width="120">
                            <template scope="scope">
                                <span v-if="scope.row.configType=='0'">设备配置</span>
                                <span v-if="scope.row.configType=='1'">模板配置</span>    
                            </template>  
                        </el-table-column>
                        <el-table-column
                        prop="updateTime"
                        label="生成时间"
                        align='center'
                        width="190">
                        </el-table-column>
                        <el-table-column
                        prop="summary"
                        label="描述"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        align='center'
                        width="230">
                            <template scope="scope">
                                <span v-if="scope.row.status==0&&scope.row.configType=='1'">
                                    <el-button type="danger" @click="forbidden(scope.row)" size="small">禁用</el-button>
                                </span>
                                <span v-if="scope.row.status==1&&scope.row.configType=='1'">
                                    <el-button type="primary" @click="forbidden(scope.row)" size="small">启用</el-button>
                                </span>
                                <span v-if="removetemplate">
                                    <el-button @click="revamptemplate(scope.row)" type="primary" size="small">修改</el-button>
                                </span> 
                                <span v-if="delatetemplate">
                                    <el-button @click="removetemplateT(scope.row)" type="primary" size="small">删除</el-button>
                                </span>
                                <span v-if="delatetemplate">
                                    <el-button @click="details(scope.row)" type="primary" size="small">详情</el-button>
                                </span>    
                            </template>  
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="PageIndex"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="Pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <!-- 查看详情模态框 -->
            <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:780px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align:left;">模板详情</h4>
                        </div>
                        <div class="modal-body datailsbody">
                            <!-- tsbg -->
                            <div v-if="datailstype=='0'">
                                <div class="datailsbody_top">
                                    WAN配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>IP类型</td>
                                                <td>{{datailsdata.configInfo.ipType}}</td>
                                                <td>设备型号</td>
                                                <td>{{datailsdata.model}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>IP地址</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>子网掩码:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>网关:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                                <td>主DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>辅DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>用户名:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>密码:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>DNS1:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>DNS2:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    LAN配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>IP地址</td>
                                                <td>{{datailsdata.configInfo.lanIp}}</td>
                                                <td>子网掩码</td>
                                                <td>{{datailsdata.configInfo.lanSubnetmask}}</td>
                                            </tr>
                                            <tr>
                                                <td>起始地址</td>
                                                <td>{{datailsdata.configInfo.lanStartAddress}}</td>
                                                <td>结束地址:</td>
                                                <td>{{datailsdata.configInfo.lanEndAddress}}</td>
                                            </tr>
                                            <tr>
                                                <td>网关地址:</td>
                                                <td>{{datailsdata.configInfo.lanGateway}}</td>
                                                <td>DNS1:</td>
                                                <td>{{datailsdata.configInfo.lanDNS1}}</td>
                                            </tr>
                                            <tr>
                                                <td>DNS2:</td>
                                                <td>{{datailsdata.configInfo.lanDNS2}}</td>
                                                <td>DHCP服务器:</td>
                                                <td>{{datailsdata.configInfo.startDhcpServer}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsbc -->
                            <div v-if="datailstype=='1'">
                                <div class="datailsbody_top">
                                    2.4G配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>工作模式</td>
                                                <td>{{datailsdata.configInfo.wifi2WorkMode}}</td>
                                                <td>设备型号</td>
                                                <td>{{datailsdata.model}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi2ApSSID}}</td>
                                                <td>信道带宽:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApBandwidth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>信道:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApChannel}}</td>
                                                <td>发射功率:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApLaunchPower}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2ApEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApKeyAuth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>隐藏SSID:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2ApHideSSID=='0'">不隐藏</span>
                                                    <span v-else>隐藏</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='STA'">
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi2StaSSID}}</td>
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2StaEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='STA'">
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi2StaKeyAuth}}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    5G配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>工作模式</td>
                                                <td style="width:75%">{{datailsdata.configInfo.wifi5WorkMode}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'"> 
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi5ApSSID}}</td>
                                                <td>信道带宽:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApBandwidth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>信道:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApChannel}}</td>
                                                <td>发射功率:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApLaunchPower}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5ApEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApKeyAuth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>隐藏SSID:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5ApHideSSID=='0'">不隐藏</span>
                                                    <span v-else>隐藏</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='STA'">
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi5StaSSID}}</td>
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5StaEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='STA'">
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi5StaKeyAuth}}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    网络设置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>IP类型</td>
                                                <td style="width:75%">{{datailsdata.configInfo.ipType}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>ip地址</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>子网掩码:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>首选DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                                <td>备选DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>网关:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>用户名:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>密码:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>DNS1:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>DNS2:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsba -->
                            <div v-if="datailstype=='2'">
                                <div class="datailsbody_top">
                                    2.4G配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi2SSID}}</td>
                                                <td>信道带宽:</td>
                                                <td>{{datailsdata.configInfo.wifi2Bandwidth}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道:</td>
                                                <td>{{datailsdata.configInfo.wifi2Channel}}</td>
                                                <td>发射功率:</td>
                                                <td>{{datailsdata.configInfo.wifi2LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2EncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi2KeyAuth}}</td>
                                            </tr>
                                            <tr>
                                                <td>隐藏SSID:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2HideSSID=='0'">不隐藏</span>
                                                    <span v-else>隐藏</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    5G配置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi5SSID}}</td>
                                                <td>信道带宽:</td>
                                                <td>{{datailsdata.configInfo.wifi5Bandwidth}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道:</td>
                                                <td>{{datailsdata.configInfo.wifi5Channel}}</td>
                                                <td>发射功率:</td>
                                                <td>{{datailsdata.configInfo.wifi5LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>加密方式:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5EncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>认证秘钥:</td>
                                                <td>{{datailsdata.configInfo.wifi5KeyAuth}}</td>
                                            </tr>
                                            <tr>
                                                <td>隐藏SSID:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5HideSSID=='0'">不隐藏</span>
                                                    <span v-else>隐藏</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    网络设置
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>IP类型</td>
                                                <td style="width:75%">{{datailsdata.configInfo.ipType}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>ip地址</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>子网掩码:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>首选DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                                <td>备选DNS:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>网关:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>用户名:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>密码:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>DNS1:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>DNS2:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- 黑白名单 -->
                            <div>
                                <div class="datailsbody_top">
                                    黑白名单--当前模式>><span v-if="dataillisttype=='0'">白名单</span>
                                    <span v-if="dataillisttype=='1'">黑名单</span>
                                    <span v-if="dataillisttype==''">暂无</span>
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <el-table
                                    :data="datailstabledata"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;maxlength-height:85%;overflow:auto;margin-bottom:10px;">
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC地址"
                                        align='center'>
                                        </el-table-column>    
                                    </el-table>
                                </div>
                            </div>
                            <!-- 指定设备类型 -->
                            <div>
                                <div class="datailsbody_top">
                                    指定设备类型--当前模式>><span v-if="datailsdata.templateOrder=='0'">指定设备</span>
                                    <span v-if="datailsdata.templateOrder=='1'">指定设备分组</span>
                                    <span v-if="datailsdata.templateOrder=='2'">指定设备型号({{datailsdata.model}})</span>
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <div v-if="datailsdata.templateOrder==0" style="flex-direction: column;">
                                        <el-table
                                            ref="references"
                                            :data="datailsdata.order"
                                            border
                                            tooltip-effect="dark">
                                            <el-table-column
                                            prop="nickname"
                                            align='center'
                                            label="设备昵称"
                                            width="100">
                                            </el-table-column>
                                            <el-table-column
                                            prop="MAC"
                                            label="MAC"
                                            align='center'
                                            width="180">
                                            </el-table-column>
                                            <el-table-column
                                            prop="model"
                                            label="硬件版本"
                                            align='center'>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div v-if="datailsdata.templateOrder==1">
                                        <el-table
                                            ref="references"
                                            :data="datailsdata.order"
                                            border
                                            tooltip-effect="dark">
                                            <el-table-column
                                            prop="groupName"
                                            align='center'
                                            label="分组名称"
                                            width="100">
                                            </el-table-column>
                                            <el-table-column
                                            prop="model"
                                            label="硬件版本"
                                            align='center'>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<script>
    export default{
        name: 'templateManage',
        data () {
            return {
                tsbc2Gradio:false,
                tsbc5Gradio:false,
                tsba2Gradio:false,
                tsba5Gradio:false,
                maxPower2G:[], //2G发射功率
                maxPower5G:[],  //5G发射功率
                //按钮权限
                addtemplate:false,
                removetemplate:false,
                delatetemplate:false,
                startusing:false,
                serverurl:localStorage.serverurl,
                configType:'', //点击修改数据的模板类别                
                addrelative:'0',  //判断添加修改
                Administrator:false,
                tableData3:[],
                sizesdata:[], //弹框列表选择数据
                Pagesize:10,
                PageIndex:1,
                total:20,
                showtype:'1',
                value:'',
                optionstwo:[],
                valuetwo:'',
                radio2:0,
                lookoverstatus:{},
                lookoverlan:true,
                activeNames:'1', 
                classes:[{value: '0',label: 'tsbg'},{value: '1',label: 'tsbc'},{value: '2',label: 'tsba'}],
                classesvalue:'',
                classestwo:[{value: '0',label: '指定设备'},{value: '1',label: '指定设备分组'},{value: '2',label: '指定设备型号'}],
                classesvaluetwo:'',
                templatename:'',
                templateId:'',
                //tsbc,tsba,黑白名单
                panelTable:[], //白名单
                panelTabletwo:[], //黑名单
                paaelMAC:false,
                panelinput:'',
                panel:"1",
                multipleTable:[],

                //弹框列列表参数
                tableData4:[],
                PageIndextwo:1,
                Pagesizetwo:10,
                totaltwo:20,
                valuethree:0,

                templateName:'',  
                templateId:'',
                realname:'',
                summary:"",
                options:[{value:'STATIC',label:'STATIC'},{value:'DHCP',label:'DHCP'},{value:'PPPOE',label:'PPPOE'}],
                lookdata:{}, //弹框数据数组对象
                tsbgcollcate:{
                    status:1,
                    ipType:'STATIC',
                    wanIP:'',
                    wanSubnetmask:'',
                    wanGateway:'',
                    wanDNS1:'',
                    wanDNS2:'',
                    lanIp:'',
                    lanSubnetmask:'',
                    lanStartAddress:'',
                    lanEndAddress:'',
                    lanGateway:'',
                    lanDNS1:'',
                    lanDNS2:'',
                    startDhcpServer:1,
                    wanPPPoEUsername:'',   
                    wanPPPoEPassword:'',
                    wanPPPoEDNS1:'',
                    wanPPPoEDNS2:'',
                }, //tsbg配置数据
                tsbccollcate:{
                    status:1,
                    wifi2ApSSID:'',
                    wifi2Enable:1,
                    wifi2WorkMode:'AP',
                    wifi2ApHideSSID:1,
                    wifi2ApBandwidth:'HT20',
                    wifi2ApChannel:'5',
                    wifi2ApLaunchPower:'1',
                    wifi2ApEncryptionMode:'0',
                    wifi2ApKeyAuth:'',
                    wifi2StaEncryptionMode:'0',
                    // wifi2StaPriority:'1',
                    wifi2StaKeyAuth:"",
                    wifi2StaSSID:'',

                    wifi5Enable:1,
                    wifi5ApSSID:'',
                    wifi5WorkMode:'AP',
                    wifi5ApHideSSID:1,
                    wifi5ApBandwidth:'HT20',
                    wifi5ApChannel:'161',
                    wifi5ApLaunchPower:'1',
                    wifi5ApEncryptionMode:'1',
                    wifi5ApKeyAuth:'',
                    wifi5StaEncryptionMode:'0',
                    // wifi5StaPriority:'1',
                    wifi5StaKeyAuth:"",
                    wifi5StaSSID:'',
                },//tsbc配置数据
                tsbctsbacaollcate:{
                    ipType:'STATIC',
                    wanIP:'',
                    wanSubnetmask:'',
                    wanDNS1:'',
                    wanDNS2:'',
                    wanGateway:'',
                    wanPPPoEUsername:'',
                    wanPPPoEPassword:'',
                    wanPPPoEDNS1:'',
                    wanPPPoEDNS2:'',
                }, //tsbc,tsba公用配置数据
                tsbacaollcate:{
                    status:1,
                    wifi2Enable:1,
                    wifi2SSID:"",
                    wifi2Bandwidth:'HT20',
                    wifi2Channel:'1',
                    wifi2LaunchPower:'1',
                    wifi2EncryptionMode:'0',
                    wifi2KeyAuth:'',
                    wifi2HideSSID:1,

                    wifi5Enable:1,
                    wifi5SSID:"",
                    wifi5Bandwidth:'HT20',
                    wifi5Channel:'153',
                    wifi5LaunchPower:'1',
                    wifi5EncryptionMode:'0',
                    wifi5KeyAuth:'',
                    wifi5HideSSID:1,
                },//tsba配置数据
                // 查看详情
                datailstype:'',
                datailsdata:'',
                datailstabledata:[], //黑白名单数据
                dataillisttype:'', //黑白名单类型
            }
        },
        mounted(){
            var that = this;
            setTimeout(function(){
                //请求用户操作权限
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'system/getUserPrivilege',
                    data:{
                        menuId:sessionStorage.menuId
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            for(var i=0;i<data.result.length;i++){
                                if(data.result[i].code=='addTemplate'){
                                    that.addtemplate = true
                                }
                                if(data.result[i].code=='editTemplate'){
                                    that.removetemplate = true
                                }
                                if(data.result[i].code=='delTemplate'){
                                    that.delatetemplate = true
                                }
                                if(data.result[i].code=='setTemplateStatus'){
                                    that.startusing = true
                                }
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },200)
        },
        methods:{
            // 查看详情按钮
            details(val){
                var that = this
                this.datailstype = val.templateType
                $('#detailsModal').modal('show')
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/getTemplateInfo',
                    data:{
                        templateId:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.datailsdata = data.result
                            if(data.result.configInfo.listContent==''){
                                that.datailstabledata = [];
                            }else{
                                var array = [];
                                array = data.result.configInfo.listContent.split(",");
                                var arr = {};
                                for(var i=0;i<array.length;i++){
                                    arr = {}
                                    arr.MAC = array[i]
                                    that.datailstabledata.push(arr)
                                }
                                that.dataillisttype = data.result.configInfo.listType
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //TSBCwifi2Enable2G  启用不启用change事件
            TSBCwifi2Enable2G(){
                if(this.tsbccollcate.wifi2Enable=='0'){
                    if(this.tsbccollcate.wifi2WorkMode=='AP'){
                        for(var i=0;i<$('.tsbc2GinputAP').length;i++){
                            $('.tsbc2GinputAP').eq(i).attr("disabled","disabled");
                        }
                        for(var i=0;i<$('.tsbc2GselectAP').length;i++){
                            $('.tsbc2GselectAP').eq(i).attr("disabled","disabled");
                        }
                        this.tsbc2Gradio = true
                    }else{
                        for(var i=0;i<$('.tsbc2GinputSta').length;i++){
                            $('.tsbc2GinputSta').eq(i).attr("disabled","disabled");
                        }
                        for(var i=0;i<$('.tsbc2GselectSta').length;i++){
                            $('.tsbc2GselectSta').eq(i).attr("disabled","disabled");
                        }
                    }
                }else{
                    if(this.tsbccollcate.wifi2WorkMode=='AP'){
                        for(var i=0;i<$('.tsbc2GinputAP').length;i++){
                            $('.tsbc2GinputAP').eq(i).removeAttr("disabled");
                        }
                        for(var i=0;i<$('.tsbc2GselectAP').length;i++){
                            $('.tsbc2GselectAP').eq(i).removeAttr("disabled");
                        }
                        this.tsbc2Gradio = false
                    }else{
                        for(var i=0;i<$('.tsbc2GinputSta').length;i++){
                            $('.tsbc2GinputSta').eq(i).removeAttr("disabled");
                        }
                        for(var i=0;i<$('.tsbc2GselectSta').length;i++){
                            $('.tsbc2GselectSta').eq(i).removeAttr("disabled");
                        }
                    }
                }
            },
            //TSBCwifi5Enable5G  启用不启用change事件
            TSBCwifi5Enable5G(){
                if(this.tsbccollcate.wifi5Enable=='0'){
                    if(this.tsbccollcate.wifi5WorkMode=='AP'){
                        for(var i=0;i<$('.tsbc5GinputAP').length;i++){
                            $('.tsbc5GinputAP').eq(i).attr("disabled","disabled");
                        }
                        for(var i=0;i<$('.tsbc5GselectAP').length;i++){
                            $('.tsbc5GselectAP').eq(i).attr("disabled","disabled");
                        }
                        this.tsbc5Gradio = true
                    }else{
                        for(var i=0;i<$('.tsbc5GinputSta').length;i++){
                            $('.tsbc5GinputSta').eq(i).attr("disabled","disabled");
                        }
                        for(var i=0;i<$('.tsbc5GselectSta').length;i++){
                            $('.tsbc5GselectSta').eq(i).attr("disabled","disabled");
                        }
                    }
                }else{
                    if(this.tsbccollcate.wifi5WorkMode=='AP'){
                        for(var i=0;i<$('.tsbc5GinputAP').length;i++){
                            $('.tsbc5GinputAP').eq(i).removeAttr("disabled");
                        }
                        for(var i=0;i<$('.tsbc5GselectAP').length;i++){
                            $('.tsbc5GselectAP').eq(i).removeAttr("disabled");
                        }
                        this.tsbc5Gradio = false
                    }else{
                        for(var i=0;i<$('.tsbc5GinputSta').length;i++){
                            $('.tsbc5GinputSta').eq(i).removeAttr("disabled");
                        }
                        for(var i=0;i<$('.tsbc5GselectSta').length;i++){
                            $('.tsbc5GselectSta').eq(i).removeAttr("disabled");
                        }
                    }
                }
            },
            //tsbc2G AP Sta  chage事件
            tsbcwifi2WorkMode2g(){
                this.TSBCwifi2Enable2G()
            },
            //tsbc5G AP Sta  chage事件
            tsbcwifi2WorkMode5g(){
                this.TSBCwifi5Enable5G()
            },
            //TSBAwifi2Enable2G  启用不启用change事件
            TSBAwifi2Enable2G(){
                if(this.tsbacaollcate.wifi2Enable=='0'){
                    for(var i=0;i<$('.tsba2Ginput').length;i++){
                        $('.tsba2Ginput').eq(i).attr("disabled","disabled");
                    }
                    for(var i = 0;i<$('.tsba2Gselect').length;i++){
                        $('.tsba2Gselect').eq(i).attr("disabled","disabled");
                    }
                    this.tsba2Gradio = true
                }else{
                    for(var i=0;i<$('.tsba2Ginput').length;i++){
                        $('.tsba2Ginput').eq(i).removeAttr("disabled");
                    }
                    for(var i = 0;i<$('.tsba2Gselect').length;i++){
                        $('.tsba2Gselect').eq(i).removeAttr("disabled");
                    }
                    this.tsba2Gradio = false
                }
            },
            //TSBAwifi5Enable5G  启用不启用change事件
            TSBAwifi5Enable5G(){
                if(this.tsbacaollcate.wifi5Enable=='0'){
                    for(var i=0;i<$('.tsba5Ginput').length;i++){
                        $('.tsba5Ginput').eq(i).attr("disabled","disabled");
                    }
                    for(var i = 0;i<$('.tsba5Gselect').length;i++){
                        $('.tsba5Gselect').eq(i).attr("disabled","disabled");
                    }
                    this.tsba5Gradio = true
                }else{
                    for(var i=0;i<$('.tsba5Ginput').length;i++){
                        $('.tsba5Ginput').eq(i).removeAttr("disabled");
                    }
                    for(var i = 0;i<$('.tsba5Gselect').length;i++){
                        $('.tsba5Gselect').eq(i).removeAttr("disabled");
                    }
                    this.tsba5Gradio = false
                }
            },
            //清空模板配置数据
            removedata(){
                var that = this;
                that.valuetwo = ''
                that.templateName = ''
                that.summary = ''
                that.tsbgcollcate.wanIP = ''
                that.tsbgcollcate.wanSubnetmask = ''
                that.tsbgcollcate.wanGateway = ''
                that.tsbgcollcate.wanDNS1 = ''
                that.tsbgcollcate.wanDNS2 = ''
                that.tsbgcollcate.lanIp = ''
                that.tsbgcollcate.lanSubnetmask = ''
                that.tsbgcollcate.lanStartAddress = ''
                that.tsbgcollcate.lanEndAddress = ''
                that.tsbgcollcate.lanGateway = ''
                that.tsbgcollcate.lanDNS1 = ''
                that.tsbgcollcate.lanDNS2 = ''
                that.tsbgcollcate.wanPPPoEUsername = ''
                that.tsbgcollcate.wanPPPoEPassword = ''
                that.tsbgcollcate.wanPPPoEDNS1 = ''
                that.tsbgcollcate.wanPPPoEDNS2 = ''

                that.tsbccollcate.wifi2ApSSID = ''
                that.tsbccollcate.wifi2ApKeyAuth = ''
                that.tsbccollcate.wifi2StaEncryptionMode = ''
                that.tsbccollcate.wifi2StaKeyAuth = ''
                that.tsbccollcate.wifi2StaSSID = ''
                that.tsbccollcate.wifi5ApSSID = ''
                that.tsbccollcate.wifi5ApKeyAuth = ''
                that.tsbccollcate.wifi5StaKeyAuth = ''
                that.tsbccollcate.wifi5StaSSID = ''

                that.tsbacaollcate.wifi2SSID = ''
                that.tsbacaollcate.wifi2KeyAuth = ''
                that.tsbacaollcate.wifi5SSID = ''
                that.tsbacaollcate.wifi5KeyAuth = ''

                that.tsbctsbacaollcate.wanIP = ''
                that.tsbctsbacaollcate.wanSubnetmask = ''
                that.tsbctsbacaollcate.wanDNS1 = ''
                that.tsbctsbacaollcate.wanDNS2 = ''
                that.tsbctsbacaollcate.wanGateway =''
                that.tsbctsbacaollcate.wanPPPoEUsername = ''
                that.tsbctsbacaollcate.wanPPPoEPassword = ''
                that.tsbctsbacaollcate.wanPPPoEDNS1 = ''
                that.tsbctsbacaollcate.wanPPPoEDNS2 = ''
            },
            //点击添加模板按钮
            addtemplateT(){
                var that = this;
                this.removedata(); //清空模板配置数据
                this.panelTable = [];  //黑白名单清空
                this.panelTabletwo = [];//黑白名单清空
                this.sizesdata = [];
                this.paaelMAC = false;
                this.panelinput = ''
                that.radio2 = 0;
                $('.myModalLabel').text('添加模板')
                $('#addmyModal').modal('show');
                that.addrelative = '0'
                that.configType = '1'
                that.showtype = '1'
                if(sessionStorage.departmentId=='1'){
                    that.Administrator = true;
                    //管理员登录请求分组下拉框数据
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/getTopDepartment',
                        data:{},
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.options = data.result[0].children
                                that.value = data.result[0].children[0].value
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }
                that.typestatus()
                that.multipleTable = [];
            },
            //点击修改模板按钮
            revamptemplate(val){
                var that = this;
                that.multipleTable = [];
                this.paaelMAC = false;
                this.panelinput = ''
                this.sizesdata = [];
                $('.myModalLabel').text('修改模板')
                that.Administrator = false;
                $('#addmyModal').modal('show');
                that.configType = val.configType
                that.addrelative = '1'
                that.showtype = '1'
                that.typestatus()
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/getTemplateInfo',
                    data:{
                        templateId:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            $.ajax({
                                type:'get',
                                async:true,
                                dataType:'json',
                                xhrFields:{withCredentials:true},
                                url:that.serverurl+'equipment/getEquipmentModelInfo',
                                data:{
                                    type:data.result.templateType,
                                    model:data.result.model
                                }, 
                                success:function(data){
                                    that.maxPower2G = []
                                    that.maxPower5G = []
                                    var maxPower2G = {};
                                    var maxPower5G = {};
                                    for(var i=1;i<Number(data.result[0].maxPower2G)+1;i++){
                                        maxPower2G = {}
                                        maxPower2G.maxPower = i
                                        that.maxPower2G.push(maxPower2G)
                                    }
                                    for(var i=1;i<Number(data.result[0].maxPower5G)+1;i++){
                                        maxPower5G = {}
                                        maxPower5G.maxPower = i
                                        that.maxPower5G.push(maxPower5G)
                                    }
                                    that.lookoverstatus = data.result[0]
                                    var WAN = []
                                    if(that.lookoverstatus!=''){
                                        WAN = data.result[0].WAN.split(',');
                                    }else{
                                        that.lookoverlan = false
                                    }
                                    for(var i=0;i<WAN.length;i++){
                                        if(WAN[i]=='1'){
                                            that.lookoverlan = true
                                        }
                                    }
                                }
                            })
                            if(val.templateType=='0'){
                                that.value = data.result.departmentId
                                that.radio2 = Number(data.result.templateType)
                                that.valuetwo = data.result.model
                                that.templateName = data.result.templateName
                                that.summary = data.result.summary
                                that.tsbgcollcate.ipType = data.result.configInfo.ipType
                                that.tsbgcollcate.wanIP = data.result.configInfo.wanIP
                                that.tsbgcollcate.wanSubnetmask = data.result.configInfo.wanSubnetmask
                                that.tsbgcollcate.wanGateway = data.result.configInfo.wanGateway
                                that.tsbgcollcate.wanDNS1 = data.result.configInfo.wanDNS1
                                that.tsbgcollcate.wanDNS2 = data.result.configInfo.wanDNS2
                                that.tsbgcollcate.lanIp = data.result.configInfo.lanIp
                                that.tsbgcollcate.lanSubnetmask = data.result.configInfo.lanSubnetmask
                                that.tsbgcollcate.lanStartAddress = data.result.configInfo.lanStartAddress
                                that.tsbgcollcate.lanEndAddress = data.result.configInfo.lanEndAddress
                                that.tsbgcollcate.lanGateway = data.result.configInfo.lanGateway
                                that.tsbgcollcate.lanDNS1 = data.result.configInfo.lanDNS1
                                that.tsbgcollcate.lanDNS2 = data.result.configInfo.lanDNS2
                                that.tsbgcollcate.startDhcpServer = Number(data.result.configInfo.startDhcpServer)
                                that.tsbgcollcate.wanPPPoEUsername = data.result.configInfo.wanPPPoEUsername
                                that.tsbgcollcate.wanPPPoEPassword = data.result.configInfo.wanPPPoEPassword
                                that.tsbgcollcate.wanPPPoEDNS1 = data.result.configInfo.wanPPPoEDNS1
                                that.tsbgcollcate.wanPPPoEDNS2 = data.result.configInfo.wanPPPoEDNS2
                                that.valuethree = Number(data.result.templateOrder)
                                // that.multipleTable=data.result.order
                            }
                            if(val.templateType=='1'){
                                that.value = data.result.departmentId
                                that.radio2 = Number(data.result.templateType)
                                that.valuetwo = data.result.model
                                that.templateName = data.result.templateName
                                that.summary = data.result.summary

                                that.tsbctsbacaollcate.ipType = data.result.configInfo.ipType
                                that.tsbctsbacaollcate.wanIP = data.result.configInfo.wanIP
                                that.tsbctsbacaollcate.wanSubnetmask = data.result.configInfo.wanSubnetmask
                                that.tsbctsbacaollcate.wanDNS1 = data.result.configInfo.wanDNS1
                                that.tsbctsbacaollcate.wanDNS2 = data.result.configInfo.wanDNS2
                                that.tsbctsbacaollcate.wanGateway = data.result.configInfo.wanGateway
                                that.tsbctsbacaollcate.wanPPPoEUsername = data.result.configInfo.wanPPPoEUsername
                                that.tsbctsbacaollcate.wanPPPoEPassword = data.result.configInfo.wanPPPoEPassword
                                that.tsbctsbacaollcate.wanPPPoEDNS1 = data.result.configInfo.wanPPPoEDNS1
                                that.tsbctsbacaollcate.wanPPPoEDNS2 = data.result.configInfo.wanPPPoEDNS2

                                that.tsbccollcate.wifi2ApSSID = data.result.configInfo.wifi2ApSSID
                                that.tsbccollcate.wifi2Enable = Number(data.result.configInfo.wifi2Enable)
                                that.tsbccollcate.wifi2WorkMode = data.result.configInfo.wifi2WorkMode
                                that.tsbccollcate.wifi2ApHideSSID = Number(data.result.configInfo.wifi2ApHideSSID)
                                that.tsbccollcate.wifi2ApBandwidth = data.result.configInfo.wifi2ApBandwidth
                                that.tsbccollcate.wifi2ApChannel = data.result.configInfo.wifi2ApChannel
                                that.tsbccollcate.wifi2ApLaunchPower = data.result.configInfo.wifi2ApLaunchPower
                                that.tsbccollcate.wifi2ApEncryptionMode = data.result.configInfo.wifi2ApEncryptionMode
                                that.tsbccollcate.wifi2ApKeyAuth = data.result.configInfo.wifi2ApKeyAuth
                                that.tsbccollcate.wifi2StaEncryptionMode = data.result.configInfo.wifi2StaEncryptionMode
                                // that.tsbccollcate.wifi2StaPriority = data.result.configInfo.wifi2StaPriority
                                that.tsbccollcate.wifi2StaKeyAuth = data.result.configInfo.wifi2StaKeyAuth
                                that.tsbccollcate.wifi2StaSSID = data.result.configInfo.wifi2StaSSID

                                that.tsbccollcate.wifi5ApSSID = data.result.configInfo.wifi5ApSSID
                                that.tsbccollcate.wifi5Enable = Number(data.result.configInfo.wifi5Enable)
                                that.tsbccollcate.wifi5WorkMode = data.result.configInfo.wifi5WorkMode
                                that.tsbccollcate.wifi5ApHideSSID = Number(data.result.configInfo.wifi5ApHideSSID)
                                that.tsbccollcate.wifi5ApBandwidth = data.result.configInfo.wifi5ApBandwidth
                                that.tsbccollcate.wifi5ApChannel = data.result.configInfo.wifi5ApChannel
                                that.tsbccollcate.wifi5ApLaunchPower = data.result.configInfo.wifi5ApLaunchPower
                                that.tsbccollcate.wifi5ApEncryptionMode = data.result.configInfo.wifi5ApEncryptionMode
                                that.tsbccollcate.wifi5ApKeyAuth = data.result.configInfo.wifi5ApKeyAuth
                                that.tsbccollcate.wifi5StaEncryptionMode = data.result.configInfo.wifi5StaEncryptionMode
                                // that.tsbccollcate.wifi5StaPriority = data.result.configInfo.wifi5StaPriority
                                that.tsbccollcate.wifi5StaKeyAuth = data.result.configInfo.wifi5StaKeyAuth
                                that.tsbccollcate.wifi5StaSSID = data.result.configInfo.wifi5StaSSID
                                //黑白名单
                                var array = [];
                                array = data.result.configInfo.listContent.split(',')
                                // that.multipleTable=data.result.order
                            }
                            if(val.templateType=='2'){
                                that.value = data.result.departmentId
                                that.radio2 = Number(data.result.templateType)
                                that.valuetwo = data.result.model
                                that.templateName = data.result.templateName
                                that.summary = data.result.summary

                                that.tsbctsbacaollcate.ipType = data.result.configInfo.ipType
                                that.tsbctsbacaollcate.wanIP = data.result.configInfo.wanIP
                                that.tsbctsbacaollcate.wanSubnetmask = data.result.configInfo.wanSubnetmask
                                that.tsbctsbacaollcate.wanDNS1 = data.result.configInfo.wanDNS1
                                that.tsbctsbacaollcate.wanDNS2 = data.result.configInfo.wanDNS2
                                that.tsbctsbacaollcate.wanGateway = data.result.configInfo.wanGateway
                                that.tsbctsbacaollcate.wanPPPoEUsername = data.result.configInfo.wanPPPoEUsername
                                that.tsbctsbacaollcate.wanPPPoEPassword = data.result.configInfo.wanPPPoEPassword
                                that.tsbctsbacaollcate.wanPPPoEDNS1 = data.result.configInfo.wanPPPoEDNS1
                                that.tsbctsbacaollcate.wanPPPoEDNS2 = data.result.configInfo.wanPPPoEDNS2

                                that.tsbacaollcate.wifi2Enable = Number(data.result.configInfo.wifi2Enable)
                                that.tsbacaollcate.wifi2SSID = data.result.configInfo.wifi2SSID
                                that.tsbacaollcate.wifi2Bandwidth = data.result.configInfo.wifi2Bandwidth
                                that.tsbacaollcate.wifi2Channel = data.result.configInfo.wifi2Channel
                                that.tsbacaollcate.wifi2LaunchPower = data.result.configInfo.wifi2LaunchPower
                                that.tsbacaollcate.wifi2EncryptionMode = data.result.configInfo.wifi2EncryptionMode
                                that.tsbacaollcate.wifi2KeyAuth = data.result.configInfo.wifi2KeyAuth
                                that.tsbacaollcate.wifi2HideSSID = Number(data.result.configInfo.wifi2HideSSID)

                                that.tsbacaollcate.wifi5Enable = Number(data.result.configInfo.wifi5Enable)
                                that.tsbacaollcate.wifi5SSID = data.result.configInfo.wifi5SSID
                                that.tsbacaollcate.wifi5Bandwidth = data.result.configInfo.wifi5Bandwidth
                                that.tsbacaollcate.wifi5Channel = data.result.configInfo.wifi5Channel
                                that.tsbacaollcate.wifi5LaunchPower = data.result.configInfo.wifi5LaunchPower
                                that.tsbacaollcate.wifi5EncryptionMode = data.result.configInfo.wifi5EncryptionMode
                                that.tsbacaollcate.wifi5KeyAuth = data.result.configInfo.wifi5KeyAuth
                                that.tsbacaollcate.wifi5HideSSID = Number(data.result.configInfo.wifi5HideSSID)
                                // that.multipleTable=data.result.order
                            }
                            if(val.templateType=='1'||val.templateType=='2'){
                                that.panelTable = [];
                                that.panelTabletwo = [];
                                if(data.result.configInfo.listContent==''){
                                    setTimeout(function(){
                                        that.panelTable = [];
                                        that.panelTabletwo = [];
                                    },500)
                                }else{
                                    that.panel = data.result.configInfo.listType;
                                    var array = [];
                                    array = data.result.configInfo.listContent.split(",");
                                    var arr = {};
                                    for(var i=0;i<array.length;i++){
                                        arr = {}
                                        arr.MAC = array[i]
                                        if(data.result.configInfo.listType=='0'){
                                            that.panelTable.push(arr)
                                        }
                                        if(data.result.configInfo.listType=='1'){
                                            that.panelTabletwo.push(arr)
                                        }
                                    }
                                }
                            }
                            for(var i=0;i<data.result.order.length;i++){
                                that.multipleTable.push(data.result.order[i].id)
                            }
                            that.templateId = data.result.templateId;
                            that.realname = data.result.realname;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //点击删除模板按钮
            removetemplateT(val){
                var that = this;
                this.$confirm('确认删除该模板, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'template/delTemplate',
                        data:{
                            templateId:val.id
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: '模板删除成功',
                                    type: 'success',
                                    showClose: true,
                                });
                                that.ready();
                            }else{
                                that.errorCode(data.errorCode)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //点击启用禁用按钮
            forbidden(val){
                var that = this
                if(that.startusing==false){
                    that.$message({
                        message: '您无此权限',
                        type:'error',
                        showClose: true,
                    });
                    return;
                }
                var status = '';
                if(val.status=='0'){
                    status = '1'
                }
                if(val.status=='1'){
                    status = '0'
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/setTemplateStatus',
                    data:{
                        templateId:val.id,
                        status:status
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val.status=='0'){
                                that.$message({
                                    message: '模板禁用成功',
                                    type:'success',
                                    showClose: true,
                                });
                            }
                            if(val.status=='1'){
                                that.$message({
                                    message: '模板启用成功',
                                    type:'success',
                                    showClose: true,
                                });
                            }
                            that.ready()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //类型change事件,请求型号数据
            typestatus(val){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        type:that.radio2
                    },
                    success:function(data){
                        that.optionstwo = [];
                        that.valuetwo=''
                        if(data.errorCode=='0'){
                            var type = {};
                            for(var i=0;i<data.result.length;i++){
                                type = {}
                                type.label = data.result[i].modelName
                                type.value = data.result[i].modelName
                                that.optionstwo.push(type)
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                if(this.radio2=='1'){
                    this.tsbccollcate.wifi2Enable = 1
                    this.tsbccollcate.wifi5Enable = 1
                    this.TSBCwifi2Enable2G()
                    this.TSBCwifi5Enable5G()
                }
                if(this.radio2=='2'){
                    this.tsbacaollcate.wifi2Enable = 1
                    this.tsbacaollcate.wifi5Enable = 1
                    this.TSBAwifi2Enable2G()
                    this.TSBAwifi5Enable5G()
                }
            },
            //型号change事件,请求权限显示类别
            modelstatus(val){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        type:that.radio2,
                        model:that.valuetwo
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.maxPower2G = []
                            that.maxPower5G = []
                            that.lookoverstatus = data.result[0]
                            var WAN = []
                            if(data.result[0].WAN!=''){
                                WAN = data.result[0].WAN.split(',');
                            }else{
                                that.lookoverlan = false
                            }
                            for(var i=0;i<WAN.length;i++){
                                if(WAN[i]=='1'){
                                    that.lookoverlan = true
                                }
                            }
                            var maxPower2G = {};
                            var maxPower5G = {};
                            for(var i=1;i<Number(data.result[0].maxPower2G)+1;i++){
                                maxPower2G = {}
                                maxPower2G.maxPower = i
                                that.maxPower2G.push(maxPower2G)
                            }
                            for(var i=1;i<Number(data.result[0].maxPower5G)+1;i++){
                                maxPower5G = {}
                                maxPower5G.maxPower = i
                                that.maxPower5G.push(maxPower5G)
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //下一步按钮
            nextstep(){
                //中文验证
                var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                //IP
                var IP = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
                //子网掩码
                var exp=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                //DNS
                var DNSS=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                var that = this;
                // that.uploadscope()
                //tsbg
                if(this.radio2=='0'){
                    if(that.templateName==''||that.valuetwo==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.ipType=='STATIC'){
                        if(!IP.test(that.tsbgcollcate.wanIP)){
                            that.$message({
                                message: '请输入正确的IP地址',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbgcollcate.wanSubnetmask)){
                            that.$message({
                                message: '请输入正确的子网掩码',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.wanGateway==''){}else{
                            if(!IP.test(that.tsbgcollcate.wanGateway)){
                                that.$message({
                                    message: '请输入正确的网关地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanDNS1==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanDNS2==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(that.tsbgcollcate.ipType=='PPPOE'){
                        if(that.tsbgcollcate.wanPPPoEUsername==''||that.tsbgcollcate.wanPPPoEPassword==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.wanPPPoEDNS1==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanPPPoEDNS2==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(!IP.test(that.tsbgcollcate.lanIp)){
                        that.$message({
                            message: '请输入正确的IP地址',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!exp.test(that.tsbgcollcate.lanSubnetmask)){
                        that.$message({
                            message: '请输入正确的子网掩码',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanStartAddress==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanEndAddress==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!IP.test(that.tsbgcollcate.lanGateway)){
                        that.$message({
                            message: '请输入正确的网关地址',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!DNSS.test(that.tsbgcollcate.lanDNS1)||!DNSS.test(that.tsbgcollcate.lanDNS2)){
                        this.$message({
                            message: '请输入正确的DNS',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    that.showtype = '2'
                    that.uploadscope()
                }
                //tsbc
                if(this.radio2=='1'){
                    if(that.templateName==''||that.valuetwo==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(this.tsbccollcate.wifi2Enable=='1'){
                        if(that.tsbccollcate.wifi2WorkMode=='AP'){
                            if(that.tsbccollcate.wifi2ApBandwidth==''||that.tsbccollcate.wifi2ApChannel==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbccollcate.wifi2ApSSID==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbccollcate.wifi2ApEncryptionMode=='0'){}else{
                                if(that.tsbccollcate.wifi2ApKeyAuth==''){
                                    this.$message({
                                        message: '加密方式非NONE时,认证秘钥不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2ApKeyAuth.length<8){
                                   this.$message({
                                        message: '认证秘钥长度不能小于8位!',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return; 
                                }
                                if(result.test(that.tsbccollcate.wifi2ApKeyAuth)){
                                    this.$message({
                                        message: '认证秘钥不能有中文字符',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.tsbccollcate.wifi2WorkMode=='STA'){
                            if(that.tsbccollcate.wifi2StaSSID==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbccollcate.wifi2StaEncryptionMode=='0'){}else{
                                if(that.tsbccollcate.wifi2StaKeyAuth==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2StaKeyAuth.length<8){
                                   this.$message({
                                        message: '认证秘钥长度不能小于8位!',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return; 
                                }
                                if(result.test(that.tsbccollcate.wifi2StaKeyAuth)){
                                    this.$message({
                                        message: '认证秘钥不能有中文字符',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                    }
                    if(that.valuetwo=='TSBC22M141'){}else{
                        if(this.tsbccollcate.wifi5Enable=='1'){
                            if(that.tsbccollcate.wifi5WorkMode=='AP'){
                                if(that.tsbccollcate.wifi5ApBandwidth==''||that.tsbccollcate.wifi5ApChannel==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5ApSSID==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5ApEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi5ApKeyAuth==''){
                                        this.$message({
                                            message: '加密方式非NONE时,认证秘钥不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApKeyAuth.length<8){
                                    this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi5ApKeyAuth)){
                                        this.$message({
                                            message: '认证秘钥不能有中文字符',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                            if(that.tsbccollcate.wifi5WorkMode=='STA'){
                                if(that.tsbccollcate.wifi5StaSSID==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5StaEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi5StaKeyAuth==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5StaKeyAuth.length<8){
                                    this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi5StaKeyAuth)){
                                        this.$message({
                                            message: '认证秘钥不能有中文字符',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    if(that.tsbctsbacaollcate.ipType=='STATIC'){
                        if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                            that.$message({
                                message: '请输入正确的IP地址',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                            that.$message({
                                message: '请输入正确的子网掩码',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanGateway==''){}else{
                            if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                that.$message({
                                    message: '请输入正确的网关地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(that.tsbctsbacaollcate.ipType=='PPPOE'){
                        if(that.tsbctsbacaollcate.wanPPPoEUsername==''||that.tsbctsbacaollcate.wanPPPoEPassword==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    that.showtype = '2'
                    that.uploadscope()
                }
                //tsba
                if(this.radio2=='2'){
                    if(that.templateName==''||that.valuetwo==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbctsbacaollcate.ipType=='STATIC'){
                        if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                            that.$message({
                                message: '请输入正确的IP地址',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                            that.$message({
                                message: '请输入正确的子网掩码',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanGateway==''){}else{
                            if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                that.$message({
                                    message: '请输入正确的网关地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(that.tsbctsbacaollcate.ipType=='PPPOE'){
                        if(that.tsbctsbacaollcate.wanPPPoEUsername==''||that.tsbctsbacaollcate.wanPPPoEPassword==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                that.$message({
                                    message: '请输入正确的DNS地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(this.tsbacaollcate.wifi2Enable=='1'){
                        if(that.tsbacaollcate.wifi2EncryptionMode=='0'){}else{
                            if(that.tsbacaollcate.wifi2KeyAuth==''){
                                this.$message({
                                    message: '加密方式非NONE时,认证秘钥不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbacaollcate.wifi2KeyAuth.length<8){
                                this.$message({
                                    message: '认证秘钥长度不能小于8位!',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(result.test(that.tsbacaollcate.wifi2KeyAuth)){
                                this.$message({
                                    message: '认证秘钥不能有中文字符',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbacaollcate.wifi2SSID==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                    }
                    if(that.valuetwo=='TSBA221'){}else{
                        if(this.tsbacaollcate.wifi5Enable=='1'){
                            if(that.tsbacaollcate.wifi5EncryptionMode=='0'){}else{
                                if(that.tsbacaollcate.wifi5KeyAuth==''){
                                    this.$message({
                                        message: '加密方式非NONE时,认证秘钥不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.wifi5KeyAuth.length<8){
                                    this.$message({
                                        message: '认证秘钥长度不能小于8位!',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(result.test(that.tsbacaollcate.wifi5KeyAuth)){
                                    this.$message({
                                        message: '认证秘钥不能有中文字符',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbacaollcate.wifi5SSID==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            } 
                        }  
                    }       
                    if(that.tsbctsbacaollcate.ipType==''||that.tsbacaollcate.ipType==undefined||that.tsbacaollcate.ipType==NaN){
                        this.$message({
                            message: '模板配置错误,请重新配置',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbacaollcate.wifi2Enable==''||that.tsbacaollcate.wifi2Enable==undefined||that.tsbacaollcate.wifi2Enable==NaN){
                        this.$message({
                            message: '模板配置错误,请重新配置',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    } 
                    if(that.tsbacaollcate.wifi5Enable==''||that.tsbacaollcate.wifi5Enable==undefined||that.tsbacaollcate.wifi5Enable==NaN){
                        this.$message({
                            message: '模板配置错误,请重新配置',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }          
                    that.showtype = '2'
                    that.uploadscope()
                }
            },
            //保存按钮
            save(){
                var that = this;
                var data = {};
                var equipmentIds = []; //设备ID
                var groupids = []; //设备组ID
                var url = '';
                var array = [];
                if(this.configType=='0'){
                    //中文验证
                    var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                    //IP
                    var IP = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
                    //子网掩码
                    var exp=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                    //DNS
                    var DNSS=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                    var that = this;
                    // that.uploadscope()
                    //tsbg
                    if(this.radio2=='0'){
                        if(that.templateName==''||that.valuetwo==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbgcollcate.wanIP)){
                                that.$message({
                                    message: '请输入正确的IP地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbgcollcate.wanSubnetmask)){
                                that.$message({
                                    message: '请输入正确的子网掩码',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbgcollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbgcollcate.wanGateway)){
                                    that.$message({
                                        message: '请输入正确的网关地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.tsbgcollcate.ipType=='PPPOE'){
                            if(that.tsbgcollcate.wanPPPoEUsername==''||that.tsbgcollcate.wanPPPoEPassword==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbgcollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(!IP.test(that.tsbgcollcate.lanIp)){
                            that.$message({
                                message: '请输入正确的IP地址',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbgcollcate.lanSubnetmask)){
                            that.$message({
                                message: '请输入正确的子网掩码',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.lanStartAddress==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.lanEndAddress==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!IP.test(that.tsbgcollcate.lanGateway)){
                            that.$message({
                                message: '请输入正确的网关地址',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!DNSS.test(that.tsbgcollcate.lanDNS1)||!DNSS.test(that.tsbgcollcate.lanDNS2)){
                            this.$message({
                                message: '请输入正确的DNS',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                    }
                    //tsbc
                    if(this.radio2=='1'){
                        if(that.templateName==''||that.valuetwo==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(this.tsbccollcate.wifi2Enable=='1'){
                            if(that.tsbccollcate.wifi2WorkMode=='AP'){
                                if(that.tsbccollcate.wifi2ApBandwidth==''||that.tsbccollcate.wifi2ApChannel==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2ApSSID==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2ApEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi2ApKeyAuth==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2ApKeyAuth.length<8){
                                        this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbccollcate.wifi2ApKeyAuth)){
                                        this.$message({
                                            message: '认证秘钥不能有中文字符',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                            if(that.tsbccollcate.wifi2WorkMode=='STA'){
                                // that.tsbccollcate.wifi2StaPriority==''||
                                if(that.tsbccollcate.wifi2StaSSID==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2StaEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi2StaKeyAuth==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2StaKeyAuth.length<8){
                                        this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbccollcate.wifi2StaKeyAuth)){
                                        this.$message({
                                            message: '认证秘钥不能有中文字符',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            } 
                        }
                        if(that.valuetwo=='TSBC22M141'){}else{
                            if(this.tsbccollcate.wifi5Enable=='1'){
                                if(that.tsbccollcate.wifi5WorkMode=='AP'){
                                    if(that.tsbccollcate.wifi5ApBandwidth==''||that.tsbccollcate.wifi5ApChannel==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApSSID==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi5ApKeyAuth==''){
                                            this.$message({
                                                message: '必填字段不能为空',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi5ApKeyAuth.length<8){
                                            this.$message({
                                                message: '认证秘钥长度不能小于8位!',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi5ApKeyAuth)){
                                            this.$message({
                                                message: '认证秘钥不能有中文字符',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                    }
                                }
                                if(that.tsbccollcate.wifi5WorkMode=='STA'){
                                    if(that.tsbccollcate.wifi5StaSSID==''){
                                        this.$message({
                                            message: '必填字段不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5StaEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi5StaKeyAuth==''){
                                            this.$message({
                                                message: '必填字段不能为空',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi5StaKeyAuth.length<8){
                                            this.$message({
                                                message: '认证秘钥长度不能小于8位!',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi5StaKeyAuth)){
                                            this.$message({
                                                message: '认证秘钥不能有中文字符',
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        if(that.tsbctsbacaollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                                that.$message({
                                    message: '请输入正确的IP地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                                that.$message({
                                    message: '请输入正确的子网掩码',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                    that.$message({
                                        message: '请输入正确的网关地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.tsbctsbacaollcate.ipType=='PPPOE'){
                            if(that.tsbctsbacaollcate.wanPPPoEUsername==''||that.tsbctsbacaollcate.wanPPPoEPassword==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        that.showtype = '2'
                        that.uploadscope()
                    }
                    //tsba
                    if(this.radio2=='2'){
                        if(that.templateName==''||that.valuetwo==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                                that.$message({
                                    message: '请输入正确的IP地址',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                                that.$message({
                                    message: '请输入正确的子网掩码',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                    that.$message({
                                        message: '请输入正确的网关地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.tsbctsbacaollcate.ipType=='PPPOE'){
                            if(that.tsbctsbacaollcate.wanPPPoEUsername==''||that.tsbctsbacaollcate.wanPPPoEPassword==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: '请输入正确的DNS地址',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(this.tsbacaollcate.wifi2Enable=='1'){
                            if(that.tsbacaollcate.wifi2SSID==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbacaollcate.wifi2EncryptionMode=='0'){}else{
                                if(that.tsbacaollcate.wifi2KeyAuth==''){
                                    this.$message({
                                        message: '加密方式非NONE时,认证秘钥不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.wifi2KeyAuth.length<8){
                                    this.$message({
                                        message: '认证秘钥长度不能小于8位!',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(result.test(that.tsbacaollcate.wifi2KeyAuth)){
                                    this.$message({
                                        message: '认证秘钥不能有中文字符',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.valuetwo=='TSBA221'){}else{
                            if(this.tsbacaollcate.wifi5Enable=='1'){
                                if(that.tsbacaollcate.wifi5SSID==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }   
                                if(that.tsbacaollcate.wifi5EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.wifi5KeyAuth==''){
                                        this.$message({
                                            message: '加密方式非NONE时,认证秘钥不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.wifi5KeyAuth.length<8){
                                        this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.wifi5KeyAuth)){
                                        this.$message({
                                            message: '认证秘钥不能有中文字符',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }  
                        }   
                        if(that.tsbctsbacaollcate.ipType==''||that.tsbacaollcate.ipType==undefined||that.tsbacaollcate.ipType==NaN){
                            this.$message({
                                message: '模板配置错误,请重新配置',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbacaollcate.wifi2Enable==''||that.tsbacaollcate.wifi2Enable==undefined||that.tsbacaollcate.wifi2Enable==NaN){
                            this.$message({
                                message: '模板配置错误,请重新配置',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        } 
                        if(that.tsbacaollcate.wifi5Enable==''||that.tsbacaollcate.wifi5Enable==undefined||that.tsbacaollcate.wifi5Enable==NaN){
                            this.$message({
                                message: '模板配置错误,请重新配置',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                    }         
                        that.showtype = '2'
                        that.uploadscope()
                    }
                }
                if(that.radio2=='0'){
                    if(that.addrelative == '0'){url='template/addTsbgTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbgTemplate'}
                    data = that.tsbgcollcate
                }
                if(that.radio2=='1'){
                    if(that.addrelative == '0'){url='template/addTsbcTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbcTemplate'}
                    $.extend(data,that.tsbccollcate,that.tsbctsbacaollcate)
                    data.listType = that.panel
                    if(that.panel=='0'){
                        for(var i=0;i<that.panelTable.length;i++){
                            array.push(that.panelTable[i].MAC)
                        }
                        //白名单
                        data.listContent = array.join(',')
                    }
                    if(that.panel=='1'){
                        for(var i=0;i<that.panelTabletwo.length;i++){
                            array.push(that.panelTabletwo[i].MAC)
                        }
                        //黑名单
                        data.listContent = array.join(',')
                    }
                }
                if(that.radio2=='2'){
                    if(that.addrelative == '0'){url='template/addTsbaTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbaTemplate'}
                    $.extend(data,that.tsbacaollcate,that.tsbctsbacaollcate)
                    data.listType = that.panel
                    if(that.panel=='0'){
                        for(var i=0;i<that.panelTable.length;i++){
                            array.push(that.panelTable[i].MAC)
                        }
                        //白名单
                        data.listContent = array.join(',')
                    }
                    if(that.panel=='1'){
                        for(var i=0;i<that.panelTabletwo.length;i++){
                            array.push(that.panelTabletwo[i].MAC)
                        }
                        //黑名单
                        data.listContent = array.join(',')
                    }
                }
                if(that.valuethree=='0'){
                    //指定设备
                    for(var i = 0;i<that.sizesdata.length;i++){
                        equipmentIds.push(that.sizesdata[i].id)
                    }
                    data.equipmentIds = equipmentIds.join(',')
                }
                if(that.valuethree=='1'){
                    //指定分组
                    for(var i = 0;i<that.sizesdata.length;i++){
                        groupids.push(that.sizesdata[i].id)
                    }
                    data.groupids = groupids.join(',')
                }
                if(sessionStorage.departmentId=='1'){
                    data.departmentId = that.value
                }
                if(that.addrelative == '1'){
                    data.templateId = that.templateId
                    data.realname = that.realname
                }
                data.templateName = that.templateName
                data.model = that.valuetwo
                data.summary = that.summary
                data.templateType = that.radio2
                data.templateOrder = that.valuethree
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.addrelative=='0'){
                                that.$message({
                                    message: '模板添加成功',
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            if(that.addrelative=='1'){
                                that.$message({
                                    message: '模板修改成功',
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            $('#addmyModal').modal('hide');
                            that.ready();
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //选择条数事件
            handleSizeChange(val) {
                this.Pagesize = val
                this.ready()
            },
            //选择页数事件
            handleCurrentChange(val) {
                this.PageIndex = val
                this.ready()
            },
            //页面数据搜索
            templateseek(){
                this.ready();
            },
            //页面数据渲染
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/getTemplateList',
                    data:{
                        pageIndex:that.PageIndex,
                        pageSize:that.Pagesize,
                        templateName:that.templatename,
                        templateType:that.classesvalue,
                        templateOrder:that.classesvaluetwo,
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows;
                            that.total = data.total;
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //公用接口
            uploadGY(){
                var that = this
                var url = ''
                var hardwareVersion = ''
                //指定设备接口
                if(that.valuethree==0){
                    url = 'equipment/getEquipmentList'
                }
                //分组接口
                if(that.valuethree==1){
                    url='equipment/getGroupList'
                }
                hardwareVersion = that.valuetwo
                $.ajax({
                    type:'get',
                    async:true,
                    url:that.serverurl+url,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        type:that.radio2,
                        pageIndex:that.PageIndextwo,
                        pageSize:that.Pagesizetwo,
                        model:hardwareVersion,
                        departmentId:that.value
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.valuethree==0){
                                that.tableData4 = data.rows
                                that.totaltwo = data.total
                            }
                            if(that.valuethree==1){
                                that.tableData4 = data.result
                            }
                            if(that.addrelative=='1'){
                                var array = [];
                                for(var i=0;i<that.multipleTable.length;i++){
                                    for(var j=0;j<data.rows.length;j++){
                                        if(that.multipleTable[i]==data.rows[j].id){
                                            array.push(data.rows[j])
                                            that.sizesdatapush(data.rows[j])
                                        }
                                    }
                                }
                                setTimeout(function(){
                                    array.forEach(row => {
                                        that.$refs.references.toggleRowSelection(that.tableData4[0])
                                    })
                                },200)
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //指定设备change事件
            uploadscope(val){
                var that = this;
                that.PageIndextwo = 1
                that.Pagesizetwo = 10
                this.uploadGY()
            },
            //弹框列表选择数据
            handleSelectionChangetwo(val){
                this.sizesdata = val
            },
            //弹框列表选择条数事件
            handleSizeChangetwo(val){
                var that = this
                that.Pagesizetwo = val
                this.uploadGY()
            },
            //弹框列表选择页数事件
            handleCurrentChangetwo(val){
                var that = this
                that.PageIndextwo = val
                this.uploadGY()
            },
            //黑白名单
            paaelMACS(){
                this.paaelMAC = true;
                this.panelinput = ''
            },
            //添加黑白名单
            panelMACT(){
                var data = {}
                var reg_name=/[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/
                if(!reg_name.test(this.panelinput)){
                    this.$message({
                        message: '请输入正确的MAC地址',
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                data.MAC = this.panelinput
                if(this.panel=='0'){
                    this.panelTable.push(data)
                }
                if(this.panel=='1'){
                    this.panelTabletwo.push(data)
                }
            },
            //删除黑白名单
            deletepanel(val){
                var MAC = val.MAC
                if(this.panel=='0'){
                    for(var i=0;i<this.panelTable.length;i++){
                        if(MAC == this.panelTable[i].MAC){
                            this.panelTable.splice(i,1)
                        }
                    }
                }
                if(this.panel=='1'){
                    for(var i=0;i<this.panelTabletwo.length;i++){
                        if(MAC == this.panelTabletwo[i].MAC){
                            this.panelTabletwo.splice(i,1)
                        }
                    }
                }
            },
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.templateManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.templateManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.templateManage_nav>i{font-size: 23px;}
.templateManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.templateManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.templateManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.templateManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.templateManage_bottom_bottom{position: absolute;width: 100%;height: auto;top:40px;bottom: 0;}
.templateManage_formtwo{display: flex;margin-top:5px;margin-right:10px;}
.templateManage_formtwo>span{line-height: 30px;font-size: 15px;}
.templateManage_formtwo>input{width: 126px;height: 30px;}
.template_top{width: 100%;}
.template_top>div{margin-top:10px;}
.template_center{width: 100%;}
.template_two{width: 100%;}
.basicstatus_center{width: 100%;background: #C1D9F3;height: 2px;margin-top: 8px;margin-bottom: 5px;}

.basicstatus_bottom{margin-bottom: 10px;}
.basicstatus_bottom>table{width:100%;}
.basicstatus_bottom>table tr{display: flex;}
.basicstatus_bottom>table tr>td{width: 25%;text-align: center;line-height: 25px !important;}
/* 详情 */
.datailsbody>div{width: 100%;padding: 10px;}
.datailsbody_top{text-align: left;font-size: 15px;font-weight: bold;}
.datailsbody_center{width: 100%;background: #C1D9F3;height: 2px;margin-top: 8px;margin-bottom: 5px;}
.datailsbody_bottom{margin-bottom: 10px;}
.datailsbody_bottom>table{width:100%;}
.datailsbody_bottom>table tr{display: flex;}
.datailsbody_bottom>table tr>td{width: 25%;text-align: center;line-height: 25px !important;}
</style>
