<template>
    <div class="templateManage">
        <div class="templateManage_nav">
            设备管理<i class="iconfont icon-icon"></i>模板管理
        </div>
        <div class="templateManage_main">
            <div class="templateManage_top">
                <el-button v-if="addtemplate" @click="addtemplateT" type="primary" icon="plus " size="small">添加模板</el-button>
            </div>
            <!-- 添加修改模态框（Modal） -->
            <div class="modal fade" id="addmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title myModalLabel" id="myModalLabel" style="text-align:left;">添加模板</h4>
                        </div>
                        <div class="modal-body">
                            <div class="template_top" v-if="showtype=='1'">
                                <div v-if="Administrator">
                                    <span>分组:</span>
                                    <el-select v-model="value" placeholder="请选择分组" style="width:180px;">
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
                                    <el-radio-group @change="typestatus" v-model="radio2">
                                        <el-radio :label="0">tsbg</el-radio>
                                        <el-radio :label="1">tsbc</el-radio>
                                        <el-radio :label="2">tsba</el-radio>
                                    </el-radio-group>
                                </div>
                                <div v-if="addrelative=='0'">
                                    <span>型号:</span>
                                    <el-select @change="modelstatus" v-model="valuetwo" placeholder="请选择型号" style="width:180px;">
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
                                    <input type="text" v-model="templateName" class="inputType form-control logManage_main_input" style="width:146px;display:inline-block;" placeholder="请输入模板名称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>备注:</span>
                                    <input type="text" v-model="summary" class="inputType form-control logManage_main_input" style="width:256px;display:inline-block;" placeholder="请输入备注" min="1" max="100" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                </div>
                            </div>
                            <div class="template_center" v-if="showtype=='1'">
                                <el-collapse v-model="activeNames" accordion>
                                    <el-collapse-item v-if="radio2=='0'&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            IP类型:
                                            <select class="form-control logManage_main_input" v-model="tsbgcollcate.ipType" style="width:168px;">
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
                                                            <input type="text" v-model="tsbgcollcate.wanIP" placeholder="请输入IP地址" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>网关:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>主DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>辅DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                            <input type="text" v-model="tsbgcollcate.wanPPPoEUsername" placeholder="请输入PPPoE用户名" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td><i class="required">*</i>PPPoE密码:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPoE密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>DNS1:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEDNS1" placeholder="请输入DNS1" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DNS2:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入DNS2" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                        <td><input type="text" v-model="tsbgcollcate.lanIp" placeholder="请输入IP地址" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                        <td><input type="text" v-model="tsbgcollcate.lanStartAddress" class="inputType form-control logManage_main_input" placeholder="请输入起始地址" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>结束地址:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanEndAddress" class="inputType form-control logManage_main_input" placeholder="请输入结束地址" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>网关地址:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关地址" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DNS1:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS服务器" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>DNS2:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS服务器" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DHCP服务器:</td>
                                                        <td>
                                                            <el-radio-group v-model="tsbgcollcate.startDhcpServer">
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
                                                <el-radio-group v-model="tsbccollcate.wifi2Enable">
                                                    <el-radio :label="1">启用</el-radio>
                                                    <el-radio :label="0">不启用</el-radio>
                                                </el-radio-group>
                                            </div>
                                            工作模式:
                                            <select v-model="tsbccollcate.wifi2WorkMode">
                                                <option value="AP">AP</option>
                                                <option value="Station">Station</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbccollcate.wifi2WorkMode=='AP'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID:</td>
                                                        <td><input v-model="tsbccollcate.wifi2ApSSID" type="text" class="inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>信息带宽:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi2ApBandwidth" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi2ApChannel" style="width:110px;height:29px;">
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
                                                            <select v-model="tsbccollcate.wifi2ApLaunchPower" style="width:110px;height:29px;">
                                                                <option value="Auto">Auto</option>
                                                                <option value="27dBm">27 dBm</option>
                                                                <option value="24dBm">24 dBm</option>
                                                                <option value="20dBm">20 dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi2ApEncryptionMode" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥:</td>
                                                        <td><input v-model="tsbccollcate.wifi2ApKeyAuth" type="text" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model="tsbccollcate.wifi2ApHideSSID">
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbccollcate.wifi2WorkMode=='Station'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID</td>
                                                        <td><input v-model="tsbccollcate.wifi2StaSSID" type="text" class="inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi2StaEncryptionMode" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>认证秘钥</td>
                                                        <td><input v-model="tsbccollcate.wifi2StaKeyAuth" type="text" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <!-- <tr>
                                                        <td><i class="required">*</i>优先级</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi2StaPriority" style="width:110px;height:29px;">
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
                                    <el-collapse-item v-if="radio2=='1'&&lookoverstatus.wifi5G!=''" title="5G配置" name="6" style="text-align:left;">
                                        <!-- tsbc WIFI设置(5G)-->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model="tsbccollcate.wifi5Enable">
                                                    <el-radio :label="1">启用</el-radio>
                                                    <el-radio :label="0">不启用</el-radio>
                                                </el-radio-group>
                                            </div>
                                            工作模式:
                                            <select v-model="tsbccollcate.wifi5WorkMode">
                                                <option value="AP">AP</option>
                                                <option value="Station">Station</option>
                                            </select>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbccollcate.wifi5WorkMode=='AP'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID:</td>
                                                        <td><input v-model="tsbccollcate.wifi5ApSSID" type="text" class="inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>信息带宽:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi5ApBandwidth" style="width:110px;height:29px;" name="" id="">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi5ApChannel" style="width:110px;height:29px;" name="" id="">
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
                                                            <select v-model="tsbccollcate.wifi5ApLaunchPower" style="width:110px;height:29px;" name="" id="">
                                                                <option value="Auto">Auto</option>
                                                                <option value="27dBm">27 dBm</option>
                                                                <option value="24dBm">24 dBm</option>
                                                                <option value="20dBm">20 dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi5ApEncryptionMode" style="width:110px;height:29px;" name="" id="">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥:</td>
                                                        <td><input v-model="tsbccollcate.wifi5ApKeyAuth" type="text" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model="tsbccollcate.wifi5ApHideSSID">
                                                                <el-radio :label="1">隐藏</el-radio>
                                                                <el-radio :label="0">不隐藏</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>    
                                        <div v-if="tsbccollcate.wifi5WorkMode=='Station'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>SSID</td>
                                                        <td><input v-model="tsbccollcate.wifi5StaSSID" type="text" class="inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi5StaEncryptionMode" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>认证秘钥</td>
                                                        <td><input v-model="tsbccollcate.wifi5StaKeyAuth" type="text" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <!-- <tr>
                                                        <td><i class="required">*</i>优先级</td>
                                                        <td>
                                                            <select v-model="tsbccollcate.wifi5StaPriority" style="width:110px;height:29px;">
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
                                            <select v-model="tsbctsbacaollcate.ipType" style="width:110px;height:29px;" name="" id="">
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
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanIP" class="inputType form-control logManage_main_input" placeholder="请输入ip地址" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>首选DNS:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入首选DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>备选DNS:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入备选DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>网关:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbctsbacaollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                       <td><i class="required">*</i>PPPOE用户名:</td>
                                                       <td><input type="text" v-model="tsbctsbacaollcate.wanPPPoEUsername" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE用户名" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td> 
                                                       <td><i class="required">*</i>PPPOE密码:</td> 
                                                       <td><input type="text" v-model="tsbctsbacaollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>  
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>DNS1:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanPPPoEDNS1" placeholder="请输入DNS1" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>DNS2:</td>
                                                        <td><input type="text" v-model="tsbctsbacaollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入DNS2" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.wifi2Enable">
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
                                                        <td><input type="text" v-model="tsbacaollcate.wifi2SSID" class="inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>信息带宽:</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi2Bandwidth" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道</td>
                                                        <td>
                                                            <select v-if="tsbacaollcate.wifi2Channel" style="width:110px;height:29px;">
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
                                                            <select v-model="tsbacaollcate.wifi2LaunchPower" style="width:110px;height:29px;">
                                                                <option value="Auto">Auto</option>
                                                                <option value="27dBm">27 dBm</option>
                                                                <option value="24dBm">24 dBm</option>
                                                                <option value="20dBm">20 dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi2EncryptionMode" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.wifi2KeyAuth" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model="tsbacaollcate.wifi2HideSSID">
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
                                            <el-radio-group v-model="tsbacaollcate.wifi5Enable">
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
                                                        <td><input type="text" v-model="tsbacaollcate.wifi5SSID" class="inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>信息带宽:</td>
                                                        <td>
                                                            <select v-if="tsbacaollcate.wifi5Bandwidth" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi5Channel" style="width:110px;height:29px;">
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
                                                            <select v-model="tsbacaollcate.wifi5LaunchPower" style="width:110px;height:29px;">
                                                                <option value="Auto">Auto</option>
                                                                <option value="27dBm">27 dBm</option>
                                                                <option value="24dBm">24 dBm</option>
                                                                <option value="20dBm">20 dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi5EncryptionMode" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.wifi5KeyAuth" class="inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model="tsbacaollcate.wifi5HideSSID">
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
                                            <select v-model="panel">
                                                <option value="1">黑名单</option>
                                                <option value="0">白名单</option>
                                            </select>
                                            <el-button @click="paaelMACS" type="primary" size='small' style="margin-left:15px;">添加</el-button>
                                            <div style="display:inline-block;" v-if="paaelMAC">
                                                <el-input v-model="panelinput" size='small' style="width:156px;margin-left:15px;" placeholder="请输入MAC"></el-input>
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
                                    <select @change="uploadscope" v-model='valuethree' style="width:126px;height:26px;">
                                        <option value="0">指定设备</option>
                                        <option value="1">指定分组</option>
                                        <option value="2">指定型号</option>
                                    </select>
                                </div>
                                <div v-if="valuethree==0">
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData4"
                                        border
                                        stripe
                                        tooltip-effect="dark"
                                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                                        @selection-change="handleSelectionChangetwo">
                                        <el-table-column
                                        type="selection"
                                        align='center'
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
                                        prop="hardwareVersion"
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
                                        ref="multipleTable"
                                        :data="tableData4"
                                        border
                                        stripe
                                        tooltip-effect="dark"
                                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                                        @selection-change="handleSelectionChangetwo">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        align='center'
                                        label="分组名称"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="softwareVersion"
                                        label="软件版本"
                                        align='center'
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="hardwareVersion"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" v-if="showtype=='1'" @click="nextstep" class="btn btn-primary">下一步</button>
                            <button type="button" v-if="showtype=='2'" @click="save" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="templateManage_bottom">
                <div class="templateManage_bottom_top">
                    <div class="templateManage_formtwo">
                        <span>模板名称:</span>
                        <input type="text" v-model="templatename" maxlength="10" minlength="1" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="templateManage_formtwo">
                        <span>模板类别:</span>
                        <el-select v-model="classesvalue" size='small' style="width:126px;" clearable placeholder="请选择">
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
                        <el-select v-model="classesvaluetwo" size='small' style="width:126px;" clearable placeholder="请选择">
                            <el-option
                            v-for="item in classestwo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="templateManage_formtwo">
                        <span>模板所属部门ID:</span>
                        <input type="text" v-model="templateId" maxlength="10" minlength="1" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <el-button type="primary" @click="templateseek" icon="search" style="height:30px;margin-top:5px;" size='small'>搜索</el-button>
                </div>
                <div class="templateManage_bottom_bottom">
                    <el-table
                        :data="tableData3"
                        border
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
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
                        label="所属部门"
                        align='center'
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="model"
                        label="适用型号"
                        align='center'
                        width="120">
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
                        prop="summary"
                        label="描述"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        align='center'
                        width="180">
                            <template scope="scope">
                                <span v-if="scope.row.status==0">
                                    <el-button type="danger" @click="forbidden(scope.row)" size="small">禁用</el-button>
                                </span>
                                <span v-if="scope.row.status==1">
                                    <el-button type="primary" @click="forbidden(scope.row)" size="small">启用</el-button>
                                </span>
                                <span v-if="removetemplate">
                                    <el-button @click="revamptemplate(scope.row)" type="primary" size="small">修改</el-button>
                                </span> 
                                <span v-if="delatetemplate">
                                    <el-button @click="removetemplateT(scope.row)" type="primary" size="small">删除</el-button>
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
        </div>
    </div>
</template>
<script>
    export default{
        name: 'index',
        data () {
            return {
                //按钮权限
                addtemplate:false,
                removetemplate:false,
                delatetemplate:false,
                startusing:false,
                serverurl:localStorage.serverurl,
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
                panelTable:[], //黑名单
                panelTabletwo:[], //白名单
                paaelMAC:false,
                panelinput:'',
                panel:"1",

                //弹框列列表参数
                tableData4:[],
                PageIndextwo:1,
                Pagesizetwo:10,
                totaltwo:20,
                valuethree:0,
                multipleTable:[],

                templateName:'',  
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
                    wifi2ApBandwidth:"HT20",
                    wifi2ApChannel:'5',
                    wifi2ApLaunchPower:'27dBm',
                    wifi2ApEncryptionMode:'1',
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
                    wifi5ApLaunchPower:'20dBm',
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
                    wifi2LaunchPower:'24dBm',
                    wifi2EncryptionMode:'0',
                    wifi2KeyAuth:'',
                    wifi2HideSSID:1,

                    wifi5Enable:1,
                    wifi5SSID:"",
                    wifi5Bandwidth:'HT20',
                    wifi5Channel:'153',
                    wifi5LaunchPower:'24dBm',
                    wifi5EncryptionMode:'0',
                    wifi5KeyAuth:'',
                    wifi5HideSSID:1,
                },//tsba配置数据
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
            //点击添加模板按钮
            addtemplateT(){
                var that = this;
                this.panelTable = [];
                this.panelTabletwo = [];
                that.radio2 = 0;
                $('.myModalLabel').text('添加模板')
                $('#addmyModal').modal('show');
                that.addrelative = '0'
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
            },
            //点击修改模板按钮
            revamptemplate(val){
                var that = this;
                this.panelTable = [];
                this.panelTabletwo = [];
                $('.myModalLabel').text('修改模板')
                $('#addmyModal').modal('show');
                that.addrelative = '1'
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
                                that.multipleTable = data.result.order
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
                                // for(var i=0;i<data.){}
                                // if(data.result.configInfo.listType=='0'){

                                // }
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
                            }
                            if(val.templateType=='1'||val.templateType=='2'){
                                that.panel = data.result.configInfo.listType;
                                var array = [];
                                array = data.result.configInfo.listContent.split(",");
                                var arr = {};
                                for(var i=0;i<array.length;i++){
                                    arr.MAC = array[i]
                                    if(data.result.configInfo.listType=='0'){
                                        that.panelTable.push(arr)
                                    }
                                    if(data.result.configInfo.listType=='1'){
                                        that.panelTabletwo.push(arr)
                                    }
                                }
                            }
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
                var that = this;
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
                        if(that.tsbgcollcate.wanIP==''||that.tsbgcollcate.wanSubnetmask==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.wanGateway==''||that.tsbgcollcate.wanDNS1==''||that.tsbgcollcate.wanDNS1==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
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
                        if(that.tsbgcollcate.wanPPPoEDNS1==''||that.tsbgcollcate.wanPPPoEDNS2==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                    }
                    if(that.tsbgcollcate.lanIp==''||that.tsbgcollcate.lanSubnetmask==''||that.tsbgcollcate.lanStartAddress==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanEndAddress==''||that.tsbgcollcate.lanGateway==''||that.tsbgcollcate.lanDNS1==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanDNS2==''){
                        this.$message({
                            message: '必填字段不能为空',
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
                    if(that.tsbccollcate.wifi2WorkMode=='AP'){
                        if(that.tsbccollcate.wifi2ApBandwidth==''||that.tsbccollcate.wifi2ApChannel==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbccollcate.wifi2ApLaunchPower==''||that.tsbccollcate.wifi2ApSSID==''){
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
                    if(that.tsbccollcate.wifi2WorkMode=='Station'){
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
                    if(that.tsbccollcate.wifi5WorkMode=='AP'){
                        if(that.tsbccollcate.wifi5ApBandwidth==''||that.tsbccollcate.wifi5ApChannel==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbccollcate.wifi5ApLaunchPower==''||that.tsbccollcate.wifi5ApSSID==''){
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
                    if(that.tsbccollcate.wifi5WorkMode=='Station'){
                        // that.tsbccollcate.wifi5StaPriority==''||
                        if(that.tsbccollcate.wifi5StaKeyAuth==''||that.tsbccollcate.wifi5StaSSID==''){
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
                    if(that.tsbctsbacaollcate.ipType=='STATIC'){
                        if(that.tsbctsbacaollcate.wanIP==''||that.tsbctsbacaollcate.wanSubnetmask==''||that.tsbctsbacaollcate.wanDNS1==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanDNS2==''||that.tsbctsbacaollcate.wanGateway==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
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
                        if(that.tsbctsbacaollcate.wanPPPoEDNS1==''||that.tsbctsbacaollcate.wanPPPoEDNS2==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
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
                        if(that.tsbctsbacaollcate.wanIP==''||that.tsbctsbacaollcate.wanSubnetmask==''||that.tsbctsbacaollcate.wanDNS1==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanDNS2==''||that.tsbctsbacaollcate.wanGateway==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
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
                        if(that.tsbctsbacaollcate.wanPPPoEDNS1==''||that.tsbctsbacaollcate.wanPPPoEDNS2==''){
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                    }
                    if(that.tsbacaollcate.wifi2SSID==''||that.tsbacaollcate.wifi2Bandwidth==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbacaollcate.wifi2Channel==''||that.tsbacaollcate.wifi2LaunchPower==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbacaollcate.wifi5SSID==''||that.tsbacaollcate.wifi5Bandwidth==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbacaollcate.wifi5Channel==''||that.tsbacaollcate.wifi5LaunchPower==''){
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbacaollcate.wifi2EncryptionMode=='0'){
                        if(that.tsbacaollcate.wifi2KeyAuth==''){}else{
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                    }    
                    if(that.tsbacaollcate.wifi5EncryptionMode=='0'){
                        if(that.tsbacaollcate.wifi5KeyAuth==''){}else{
                            this.$message({
                                message: '必填字段不能为空',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
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
                if(that.radio2=='0'){
                    if(that.addrelative == '0'){url='template/addTsbgTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbgTemplate'}
                    data = that.tsbgcollcate
                    data.templateOrder = that.valuethree
                }
                if(that.radio2=='1'){
                    if(that.addrelative == '0'){url='template/addTsbcTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbcTemplate'}
                    $.extend(data,that.tsbccollcate,that.tsbctsbacaollcate)
                    data.templateOrder = that.valuethree
                    data.listType = that.panel
                    if(that.panel=='0'){
                        //白名单
                        data.listContent = that.panelTabletwo.join(',')
                    }
                    if(that.panel=='1'){
                        //黑名单
                        data.listContent = that.panelTable.join(',')
                    }
                }
                if(that.radio2=='2'){
                    if(that.addrelative == '0'){url='template/addTsbaTemplate'}
                    if(that.addrelative == '1'){url='template/editTsbaTemplate'}
                    $.extend(data,that.tsbacaollcate,that.tsbctsbacaollcate)
                    data.templateOrder = that.valuethree
                    data.listType = that.panel
                    if(that.panel=='0'){
                        //白名单
                        data.listContent = that.panelTabletwo.join(',')
                    }
                    if(that.panel=='1'){
                        //黑名单
                        data.listContent = that.panelTable.join(',')
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
                data.templateName = that.templateName
                data.model = that.valuetwo
                data.summary = that.summary
                data.templateType = that.radio2
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '模板添加成功',
                                type: 'success',
                                showClose: true,
                            });
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
            },
            //选择页数事件
            handleCurrentChange(val) {
                this.PageIndex = val
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
                        departmentId:that.templateId,
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
                    if(that.radio2=='0'){
                        url = 'equipment/getTsbgList';
                        hardwareVersion = that.valuetwo
                    }
                    if(that.radio2=='1'){
                        url = 'equipment/getTsbcList';
                        hardwareVersion = that.valuetwo
                    }
                    if(that.radio2=='2'){
                        url = 'equipment/getTsbaList';
                        hardwareVersion = that.valuetwo
                    }
                }
                //分组接口
                if(that.valuethree==1){url='equipment/getEquipmentGroupList'}
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+url,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.PageIndextwo,
                        pageSize:that.Pagesizetwo,
                        hardwareVersion:hardwareVersion
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.totaltwo = data.total
                            // that.$refs.multipleTable.toggleRowSelection(that.multipleTable);
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
            },
            //添加黑白名单
            panelMACT(){
                var data = {}
                if(this.panelinput==''){
                    this.$message({
                        message: 'MAC不能为空',
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
</style>
