<template>
    <div class="templateManage" id="templateManage">
        <!-- <div class="templateManage_nav">
            {{$t('templateManage.DeviceManagement')}}<i class="iconfont icon-icon"></i>{{$t('templateManage.TemplateManagement')}}
        </div> -->
        <div class="templateManage_main">
            <div class="templateManage_top">
                <el-button v-if="addtemplate" @click="addtemplateT" type="primary" icon="plus " size="small">{{$t('templateManage.AddTemplate')}}</el-button>
                <div class="templateManage_top_div">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="templateseek"
                        style="width:150px;">
                    </el-input>
                    <span style="display:inline-block;width:75px;margin-left:10px;">{{$t('templateManage.TemplateCategory')}}:</span>
                    <el-select @change="templateseek" v-model.lazy="classesvalue" size='small' style="width:126px;" clearable>
                        <el-option
                        v-for="item in classes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span style="display:inline-block;width:75px;margin-left:10px;">{{$t('templateManage.ScopeOfApplication')}}:</span>
                    <el-select @change="templateseek" v-model.lazy="classesvaluetwo" size='small' style="width:126px;" clearable>
                        <el-option
                        v-for="item in classestwo"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- 添加修改模态框（Modal） -->
            <div class="modal fade" id="addmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:750px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 v-if="addrelative=='0'" class="modal-title myModalLabel" id="myModalLabel" style="text-align:left;">{{$t('templateManage.AddTemplate')}}</h4>
                            <h4 v-if="addrelative=='1'" class="modal-title myModalLabel" id="myModalLabel" style="text-align:left;">{{$t('templateManage.ModifyTheTemplate')}}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="template_top" v-if="showtype=='1'">
                                <div v-if="Administrator">
                                    <span>{{$t('templateManage.Grouping')}}:</span>
                                    <el-select v-model.lazy="value" style="width:180px;">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div v-if="addrelative=='0'" style="margin-left:10px;margin-top:15px;">
                                    <span>{{$t('templateManage.category')}}:</span>
                                    <el-radio-group @change="typestatus" v-model.lazy="radio2">
                                        <el-radio :label="0">tsbg</el-radio>
                                        <el-radio :label="1">tsbc</el-radio>
                                        <el-radio :label="2">tsba</el-radio>
                                    </el-radio-group>
                                </div>
                                <div v-if="addrelative=='0'">
                                    <span>{{$t('templateManage.Model')}}:</span>
                                    <el-select @change="modelstatus" v-model.lazy="valuetwo" style="width:180px;">
                                        <el-option
                                        v-for="item in optionstwo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span><i class="required">*</i>{{$t('templateManage.TemplateName')}}:</span>
                                    <input type="text" v-model.lazy="templateName" class="inputType form-control logManage_main_input" style="width:146px;display:inline-block;" :placeholder="$t('templateManage.PleaseEnterTheTemplateName')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>{{$t('templateManage.Remarks')}}:</span>
                                    <input type="text" v-model.lazy="summary" class="inputType form-control logManage_main_input" style="width:256px;display:inline-block;" :placeholder="$t('templateManage.PleaseInputRemarks')" minlength="1" maxlength="100" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                </div>
                            </div>
                            <div class="template_center" v-if="showtype=='1'">
                                <el-collapse v-model.lazy="activeNames" accordion>
                                    <el-collapse-item v-if="radio2=='0'&&lookoverlan==true" :title="$t('TSBManage.WANSettings')" name="2" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            {{$t('TSBManage.IPType')}}:
                                            <select v-model.lazy="tsbgcollcate.ipType" style="width:110px;height:29px;">
                                                <option value="STATIC">STATIC</option>
                                                <option value="DHCP">DHCP</option>
                                                <option value="PPPOE">PPPOE</option>
                                            </select>
                                            <!-- <span v-if="tsbgcollcate.ipType=='STATIC'" style="color:red;margin-left:30px;">STATIC模式下只能指定设备</span> -->
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbgcollcate.ipType=='STATIC'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.IPAddress')}}:</td>
                                                        <td>
                                                            <input type="text" v-model.lazy="tsbgcollcate.wanIP" :placeholder="$t('TSBManage.PleaseEnterTheIPAddress')" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.SubnetMask')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanSubnetmask" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheSubnetMask')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.Gateway')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanGateway" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheGateway')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanDNS1" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePrimaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanDNS2" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterAuxiliaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbgcollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.UserName')}}:</td>
                                                        <td>
                                                            <input type="text" v-model.lazy="tsbgcollcate.wanPPPoEUsername" :placeholder="$t('TSBManage.PleaseEnterThePPPOEUserName')" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')">
                                                        </td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Password')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePPPOEPassword')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEDNS1" :placeholder="$t('TSBManage.PleaseEnterThePrimaryDNS')" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.wanPPPoEDNS2" :placeholder="$t('TSBManage.PleaseEnterAuxiliaryDNS')" class="inputType form-control logManage_main_input"  minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='0'&&lookoverstatus.LAN!=''" :title="$t('TSBManage.LANConfiguration')" name="3" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.IPAddress')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanIp" :placeholder="$t('TSBManage.PleaseEnterTheIPAddress')" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.SubnetMask')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanSubnetmask" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheSubnetMask')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="basicstatus_top">
                                                {{$t('TSBManage.DHCPServices')}}
                                            </div>
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.StartAddress')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanStartAddress" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheStartingAddress')" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.EndAddress')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanEndAddress" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheEndAddress')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.GatewayAddress')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanGateway" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheGatewayAddress')" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.MasterDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanDNS1" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePrimaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanDNS2" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterAuxiliaryDNS')" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.DHCPServices')}}:</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbgcollcate.startDhcpServer">
                                                                <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                                <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'&&lookoverstatus.wifi2G!=''" :title="$t('TSBManage.Configuration2G')" name="5" style="text-align:left;">
                                        <!-- tsbc WIFI设置(2G) -->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model="tsbccollcate.wifi2Enable" @change="TSBCwifi2Enable2G">
                                                    <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                    <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                                </el-radio-group>
                                            </div>
                                            {{$t('TSBManage.WorkPattern')}}:
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApSSID" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApBandwidth" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Channel')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApChannel" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="0">auto</option>
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
                                                        <td><i class="required">*</i>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApLaunchPower" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower2G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2ApEncryptionMode" class="tsbc2GselectAP" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if='tsbccollcate.wifi2ApEncryptionMode=="1"' class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApKeyAuth" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.HiddenSSID')}}</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbccollcate.wifi2ApHideSSID" :disabled='tsbc2Gradio'>
                                                                <el-radio :label="1">{{$t('TSBManage.yes')}}</el-radio>
                                                                <el-radio :label="0">{{$t('TSBManage.no')}}</el-radio>
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaSSID" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2StaEncryptionMode" class="tsbc2GselectSta" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbccollcate.wifi2StaEncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaKeyAuth" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'&&lookoverstatus.wifi5G!=''" :title="$t('TSBManage.Configuration5G')" name="6" style="text-align:left;">
                                        <!-- tsbc WIFI设置(5G)-->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model="tsbccollcate.wifi5Enable" @change="TSBCwifi5Enable5G">
                                                    <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                    <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                                </el-radio-group>
                                            </div>
                                            {{$t('TSBManage.WorkPattern')}}:
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApSSID" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApBandwidth" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Channel')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApChannel" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="0">auto</option>
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
                                                        <td><i class="required">*</i>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApLaunchPower" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower5G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5ApEncryptionMode" class="tsbc5GselectAP" style="width:110px;height:29px;" name="" id="">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbccollcate.wifi5ApEncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApKeyAuth" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.HiddenSSID')}}</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbccollcate.wifi5ApHideSSID" :disabled="tsbc5Gradio">
                                                                <el-radio :label="1">{{$t('TSBManage.yes')}}</el-radio>
                                                                <el-radio :label="0">{{$t('TSBManage.no')}}</el-radio>
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaSSID" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5StaEncryptionMode" class="tsbc5GselectSta" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbccollcate.wifi5StaEncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaKeyAuth" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='1'&&lookoverlan==true||radio2=='2'&&lookoverlan==true" :title="$t('TSBManage.NetworkSettings')" name="7" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            {{$t('TSBManage.IPType')}}:
                                            <select v-model.lazy="tsbctsbacaollcate.ipType" style="width:110px;height:29px;" name="" id="">
                                                <option value="STATIC">STATIC</option>
                                                <option value="DHCP">DHCP</option>
                                                <option value="PPPOE">PPPOE</option>
                                            </select>
                                            <!-- <span v-if="tsbctsbacaollcate.ipType=='STATIC'" style="color:red;margin-left:30px;">STATIC模式下只能指定设备</span> -->
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div v-if="tsbctsbacaollcate.ipType=='STATIC'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.IPAddress')}}</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanIP" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheIPAddress')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.SubnetMask')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanSubnetmask" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheSubnetMask')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS1" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePrimaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS2" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterAuxiliaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.Gateway')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanGateway" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheGateway')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbctsbacaollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                       <td><i class="required">*</i>{{$t('TSBManage.UserName')}}:</td>
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEUsername" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePPPOEUserName')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td> 
                                                       <td><i class="required">*</i>{{$t('TSBManage.Password')}}:</td> 
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePPPOEPassword')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>  
                                                    </tr>
                                                    <tr>
                                                        <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS1" :placeholder="$t('TSBManage.PleaseEnterThePrimaryDNS')" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterAuxiliaryDNS')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.wifi2G!=''" :title="$t('TSBManage.Configuration2G')" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.wifi2Enable" @change="TSBAwifi2Enable2G">
                                                <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                            </el-radio-group>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2SSID" class="tsba2Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2Bandwidth" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Channel')}}</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2Channel" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="0">auto</option>
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
                                                        <td><i class="required">*</i>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2LaunchPower" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower2G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi2EncryptionMode" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbacaollcate.wifi2EncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2KeyAuth" class="tsba2Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.HiddenSSID')}}</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi2HideSSID" :disabled="tsba2Gradio">
                                                                <el-radio :label="1">{{$t('TSBManage.yes')}}</el-radio>
                                                                <el-radio :label="0">{{$t('TSBManage.no')}}</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.wifi5G!=''" :title="$t('TSBManage.Configuration5G')" name="9" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.wifi5Enable" @change="TSBAwifi5Enable5G">
                                                <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                            </el-radio-group>
                                        </div> 
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5SSID" class="tsba5Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" minlength="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                        <td>
                                                            <select v-model="tsbacaollcate.wifi5Bandwidth" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Channel')}}</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5Channel" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="0">auto</option>
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
                                                        <td><i class="required">*</i>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5LaunchPower" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="auto">auto</option>
                                                                <option v-for="item in maxPower5G" :key="item.id" :value="item.maxPower">{{item.maxPower}}dBm</option>
                                                            </select>
                                                        </td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5EncryptionMode" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td><i v-if="tsbacaollcate.wifi5EncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5KeyAuth" class="tsba5Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" minlength="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.HiddenSSID')}}</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi5HideSSID" :disabled="tsba5Gradio">
                                                                <el-radio :label="1">{{$t('TSBManage.yes')}}</el-radio>
                                                                <el-radio :label="0">{{$t('TSBManage.no')}}</el-radio>
                                                            </el-radio-group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.doubleWifi!=''" :title="$t('TSBManage.DualSSIDconfiguration')" name="11" style="text-align:left;">
                                        <div class="basicstatus_top" v-if="lookoverstatus.wifi2G=='1'">{{$t('TSBManage.Configuration2G')}}(<i style='color:red;'>{{$t('TSBManage.EnableDisabledRuleToFollowAboveConfiguration')}}</i>)</div>
                                        <div class="basicstatus_center" v-if="lookoverstatus.wifi2G=='1'"></div>
                                        <div class="basicstatus_bottom" v-if="lookoverstatus.wifi2G=='1'">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi2SSID" class="tsba2Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.doubleWifi2EncryptionMode" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbacaollcate.doubleWifi2EncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi2KeyAuth" class="tsba2Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="basicstatus_top" v-if="lookoverstatus.wifi5G=='1'">{{$t('TSBManage.Configuration5G')}}(<i style='color:red;'>{{$t('TSBManage.EnableDisabledRuleToFollowAboveConfiguration')}}</i>)</div>
                                        <div class="basicstatus_center" v-if="lookoverstatus.wifi5G=='1'"></div>
                                        <div class="basicstatus_bottom" v-if="lookoverstatus.wifi5G=='1'">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi5SSID" class="tsba5Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterSSID')" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.doubleWifi5EncryptionMode" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbacaollcate.doubleWifi5EncryptionMode=='1'" class="required">*</i>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi5KeyAuth" class="tsba5Ginput inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterTheAuthenticationSecretKey')" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2=='2'&&lookoverstatus.portal!=''" :title="$t('TSBManage.PortalAuthentication')" name='12' style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbacaollcate.portalEnable" @change="portalEnable">
                                                <el-radio :label="1">{{$t('TSBManage.StartUsing')}}</el-radio>
                                                <el-radio :label="0">{{$t('TSBManage.NotEnabled')}}</el-radio>
                                            </el-radio-group>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.CertifiedIP')}}:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalIP" class="portalIP inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterAuthenticationIP')" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Port1')}}:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalPortHttp" class="portalPortHttp inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePort')" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>{{$t('TSBManage.Port2')}}:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalPortHttps" class="portalPortHttps inputType form-control logManage_main_input" :placeholder="$t('TSBManage.PleaseEnterThePort')" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverstatus.blackWhiteList=='1'" :title="$t('TSBManage.BlackAndWhiteListSetting')" name="10" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <select v-model.lazy="panel">
                                                <option value="1">{{$t('TSBManage.Blacklist')}}</option>
                                                <option value="0">{{$t('TSBManage.WhiteList')}}</option>
                                            </select>
                                            <el-button @click="paaelMACS" type="primary" size='small' style="margin-left:15px;">{{$t('TSBManage.Add')}}</el-button>
                                            <div style="display:inline-block;" v-if="paaelMAC">
                                                <el-input v-model="panelinput" size='small' maxlength=17 style="width:156px;margin-left:15px;" :placeholder="$t('TSBManage.PleaseEnterMAC')"></el-input>
                                                <el-button @click="panelMACT" type="primary" size='small' style="margin-left:5px;">{{$t('TSBManage.confirm')}}</el-button>
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
                                                :label="$t('templateManage.Operate')"
                                                width="100">
                                                    <template scope="scope">
                                                        <el-button @click="deletepanel(scope.row)" type="primary" size="small">{{$t('templateManage.Delete')}}</el-button>
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
                                                :label="$t('templateManage.Operate')"
                                                width="100">
                                                    <template scope="scope">
                                                        <el-button @click="deletepanel(scope.row)" type="primary" size="small">{{$t('templateManage.Delete')}}</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                            <div class="template_two" v-if="showtype=='2'">
                                <div>
                                    <span>{{$t('templateManage.EquipmentType')}}:</span>
                                    <select @change="uploadscope" v-model.lazy='valuethree' style="width:126px;height:26px;">
                                        <option value="0">{{$t('templateManage.defineEquipment')}}</option>
                                        <template v-if="radio2=='0'">
                                            <option value="1" v-if="tsbgcollcate.ipType=='DHCP'||tsbctsbacaollcate.ipType=='PPPOE'">{{$t('templateManage.DesignatedGrouping')}}</option>
                                            <option value="2" v-if="tsbgcollcate.ipType=='DHCP'||tsbctsbacaollcate.ipType=='PPPOE'">{{$t('templateManage.SpecifiedModel')}}</option>
                                        </template>
                                        <template v-if="radio2=='1'||radio2=='2'">
                                            <option value="1" v-if="tsbctsbacaollcate.ipType=='DHCP'||tsbctsbacaollcate.ipType=='PPPOE'">{{$t('templateManage.DesignatedGrouping')}}</option>
                                            <option value="2" v-if="tsbctsbacaollcate.ipType=='DHCP'||tsbctsbacaollcate.ipType=='PPPOE'">{{$t('templateManage.SpecifiedModel')}}</option>
                                        </template>
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
                                        :label="$t('TSBManage.DeviceNickname')"
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
                                        :label="$t('TSBManage.SoftwareModel')"
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
                                        :label="$t('TSBManage.GroupName')"
                                        width="200">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        :label="$t('equipmentGroup.HardwareVersion')"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" v-if="showtype=='1'&&configType=='1'" @click="nextstep" class="btn btn-primary nextsteps">{{$t('templateManage.Nextstep')}}</button>
                            <button type="button" v-if="showtype=='2'||configType=='0'" @click="save" class="btn btn-primary savetemplate">{{$t('templateManage.save')}}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="templateManage_bottom">
                <div class="templateManage_bottom_bottom">
                    <el-table
                        :data="tableData3"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @sort-change='sortChange'
                        border
                        stripe
                        tooltip-effect="dark"
                        highlight-current-row
                        style="width: 100%;height:auto;maxlength-height:85%;overflow:auto;margin-bottom:10px;">
                        <el-table-column
                        fixed
                        sortable='custom'
                        prop="templateName"
                        align='center'
                        :label="$t('templateManage.TemplateName')"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="templateType"
                        align='center'
                        :label="$t('templateManage.TemplateType')"
                        width="135">
                            <template scope="scope">
                                <span v-if="scope.row.templateType=='0'">tsbg</span>
                                <span v-if="scope.row.templateType=='1'">tsbc</span>
                                <span v-if="scope.row.templateType=='2'">tsba</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="departmentName"
                        :label="$t('templateManage.Organization')"
                        align='center'
                        width="130">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="model"
                        :label="$t('templateManage.ApplicableType')"
                        align='center'
                        width="150">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="templateOrder"
                        :label="$t('templateManage.ScopeOfApplication')"
                        align='center'
                        width="180">
                            <template scope="scope">
                                <span v-if="scope.row.templateOrder=='0'">{{$t('templateManage.defineEquipment')}}</span>
                                <span v-if="scope.row.templateOrder=='1'">{{$t('templateManage.SpecifyDeviceGrouping')}}</span>
                                <span v-if="scope.row.templateOrder=='2'">{{$t('templateManage.SpecifiedDeviceType')}}</span>      
                            </template>  
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="configType"
                        :label="$t('templateManage.TemplateCategory')"
                        align='center'
                        width="200">
                            <template scope="scope">
                                <span v-if="scope.row.configType=='0'">{{$t('templateManage.EquipmentConfiguration')}}</span>
                                <span v-if="scope.row.configType=='1'">{{$t('templateManage.TemplateConfiguration')}}</span>    
                            </template>  
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="updateTime"
                        :label="$t('templateManage.RiseTime')"
                        align='center'
                        width="190">
                        </el-table-column>
                        <el-table-column
                        sortable='custom'
                        prop="summary"
                        :label="$t('templateManage.Describe')"
                        align='center'
                        min-width="150">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        :label="$t('templateManage.Operate')"
                        align='center'
                        min-width="310">
                            <template scope="scope">
                                <span v-if="scope.row.status==0&&scope.row.configType=='1'">
                                    <el-button type="danger" @click="forbidden(scope.row)" size="small">{{$t('templateManage.Forbidden')}}</el-button>
                                </span>
                                <span v-if="scope.row.status==1&&scope.row.configType=='1'">
                                    <el-button type="primary" @click="forbidden(scope.row)" size="small">{{$t('templateManage.StartUsing')}}</el-button>
                                </span>
                                <span v-if="removetemplate">
                                    <el-button @click="revamptemplate(scope.row)" type="primary" size="small">{{$t('templateManage.Revise')}}</el-button>
                                </span> 
                                <span v-if="delatetemplate">
                                    <el-button @click="removetemplateT(scope.row)" type="primary" size="small">{{$t('templateManage.Delete')}}</el-button>
                                </span>
                                <span v-if="delatetemplate">
                                    <el-button @click="details(scope.row)" type="primary" size="small">{{$t('templateManage.DetailedInformation')}}</el-button>
                                </span>  
                                <span v-if="setTemplateBatch&&scope.row.configType=='1'">
                                    <el-button @click="BatchUpgrades(scope.row)" type="primary" size="small">{{$t('templateManage.BatchDown')}}</el-button>
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
                            <h4 class="modal-title" id="myModalLabel" style="text-align:left;">{{$t('templateManage.Templatedetails')}}</h4>
                        </div>
                        <div class="modal-body datailsbody">
                            <!-- tsbg -->
                            <div v-if="datailstype=='0'">
                                <div class="datailsbody_top" v-if="lookoverstatus.WAN!=''">
                                    {{$t('TSBManage.WANSettings')}}
                                </div>
                                <div class="datailsbody_center" v-if="lookoverstatus.WAN!=''"></div>
                                <div class="datailsbody_bottom" v-if="lookoverstatus.WAN!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>{{$t('TSBManage.IPType')}}</td>
                                                <td>{{datailsdata.configInfo.ipType}}</td>
                                                <td v-if="datailsdata.configInfo.ipType=='STATIC'">{{$t('TSBManage.ProductModel')}}</td>
                                                <td v-if="datailsdata.configInfo.ipType=='STATIC'">{{datailsdata.model}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.IPAddress')}}</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>{{$t('TSBManage.SubnetMask')}}:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.Gateway')}}:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.UserName')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>{{$t('TSBManage.Password')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top" v-if="lookoverstatus.LAN!=''">
                                    {{$t('TSBManage.LANConfiguration')}}
                                </div>
                                <div class="datailsbody_center" v-if="lookoverstatus.LAN!=''"></div>
                                <div class="datailsbody_bottom" v-if="lookoverstatus.LAN!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>{{$t('TSBManage.IPAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.lanIp}}</td>
                                                <td>{{$t('TSBManage.SubnetMask')}}:</td>
                                                <td>{{datailsdata.configInfo.lanSubnetmask}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.StartAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.lanStartAddress}}</td>
                                                <td>{{$t('TSBManage.EndAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.lanEndAddress}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.GatewayAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.lanGateway}}</td>
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.lanDNS1}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.lanDNS2}}</td>
                                                <td>{{$t('TSBManage.DHCPServices')}}:</td>
                                                <td>{{datailsdata.configInfo.startDhcpServer}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsbc -->
                            <div v-if="datailstype=='1'">
                                <div class="datailsbody_top" v-if="lookoverstatus.wifi2G=='1'">
                                    {{$t('TSBManage.Configuration2G')}}
                                </div>
                                <div class="datailsbody_center" v-if="lookoverstatus.wifi2G=='1'"></div>
                                <div class="datailsbody_bottom" v-if="lookoverstatus.wifi2G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>{{$t('TSBManage.WorkPattern')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2WorkMode}}</td>
                                                <td>{{$t('TSBManage.ProductModel')}}:</td>
                                                <td>{{datailsdata.model}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApSSID}}</td>
                                                <td>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApBandwidth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>{{$t('TSBManage.Channel')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2ApChannel=='0'">auto</span>
                                                    <span v-else>{{datailsdata.configInfo.wifi2ApChannel}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApLaunchPower}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2ApEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2ApKeyAuth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='AP'">
                                                <td>{{$t('TSBManage.HiddenSSID')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2ApHideSSID=='0'">{{$t('TSBManage.no')}}</span>
                                                    <span v-else>{{$t('TSBManage.yes')}}</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='STA'">
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi2StaSSID}}</td>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2StaEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi2WorkMode=='STA'">
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2StaKeyAuth}}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top" v-if="lookoverstatus.wifi5G=='1'">
                                    {{$t('TSBManage.Configuration5G')}}
                                </div>
                                <div class="datailsbody_center" v-if="lookoverstatus.wifi5G=='1'"></div>
                                <div class="datailsbody_bottom" v-if="lookoverstatus.wifi5G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>{{$t('TSBManage.WorkPattern')}}:</td>
                                                <td style="width:75%">{{datailsdata.configInfo.wifi5WorkMode}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'"> 
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApSSID}}</td>
                                                <td>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApBandwidth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>{{$t('TSBManage.Channel')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5ApChannel=='0'">auto</span>
                                                    <span v-else>{{datailsdata.configInfo.wifi5ApChannel}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApLaunchPower}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5ApEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5ApKeyAuth}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='AP'">
                                                <td>{{$t('TSBManage.HiddenSSID')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5ApHideSSID=='0'">{{$t('TSBManage.no')}}</span>
                                                    <span v-else>{{$t('TSBManage.yes')}}</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='STA'">
                                                <td>SSID:</td>
                                                <td>{{datailsdata.configInfo.wifi5StaSSID}}</td>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5StaEncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.wifi5WorkMode=='STA'">
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5StaKeyAuth}}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    {{$t('TSBManage.NetworkSettings')}}
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>{{$t('TSBManage.IPType')}}:</td>
                                                <td style="width:75%">{{datailsdata.configInfo.ipType}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.IPAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>{{$t('TSBManage.SubnetMask')}}:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.Gateway')}}:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.UserName')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>{{$t('TSBManage.Password')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsba -->
                            <div v-if="datailstype=='2'">
                                <div class="datailsbody_top"  v-if="datailstype=='2'&&lookoverstatus.wifi2G!=''">
                                    {{$t('TSBManage.Configuration2G')}}
                                </div>
                                <div class="datailsbody_center"  v-if="datailstype=='2'&&lookoverstatus.wifi2G!=''"></div>
                                <div class="datailsbody_bottom"  v-if="datailstype=='2'&&lookoverstatus.wifi2G!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi2SSID}}</td>
                                                <td>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2Bandwidth}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.Channel')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2Channel=='0'">auto</span>
                                                    <span v-else>{{datailsdata.configInfo.wifi2Channel}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2EncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi2KeyAuth}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.HiddenSSID')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi2HideSSID=='0'">{{$t('TSBManage.no')}}</span>
                                                    <span v-else>{{$t('TSBManage.yes')}}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top" v-if="datailstype=='2'&&lookoverstatus.wifi5G!=''">
                                    {{$t('TSBManage.Configuration5G')}}
                                </div>
                                <div class="datailsbody_center" v-if="datailstype=='2'&&lookoverstatus.wifi5G!=''"></div>
                                <div class="datailsbody_bottom" v-if="datailstype=='2'&&lookoverstatus.wifi5G!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>SSID</td>
                                                <td>{{datailsdata.configInfo.wifi5SSID}}</td>
                                                <td>{{$t('TSBManage.ChannelBandwidth')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5Bandwidth}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.Channel')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5Channel=='0'">auto</span>
                                                    <span v-else>{{datailsdata.configInfo.wifi5Channel}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.TransmittingPower')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5EncryptionMode=='0'">NONE</span>
                                                    <span v-else>WPA/WPA2</span>
                                                </td>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.wifi5KeyAuth}}</td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.HiddenSSID')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.wifi5HideSSID=='0'">{{$t('TSBManage.no')}}</span>
                                                    <span v-else>{{$t('TSBManage.yes')}}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top">
                                    {{$t('TSBManage.NetworkSettings')}}
                                </div>
                                <div class="datailsbody_center"></div>
                                <div class="datailsbody_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>{{$t('TSBManage.IPType')}}:</td>
                                                <td style="width:75%">{{datailsdata.configInfo.ipType}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.IPAddress')}}:</td>
                                                <td>{{datailsdata.configInfo.wanIP}}</td>
                                                <td>{{$t('TSBManage.SubnetMask')}}:</td>
                                                <td>{{datailsdata.configInfo.wanSubnetmask}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS1}}</td>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanDNS2}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='STATIC'">
                                                <td>{{$t('TSBManage.Gateway')}}:</td>
                                                <td>{{datailsdata.configInfo.wanGateway}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.UserName')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEUsername}}</td>
                                                <td>{{$t('TSBManage.Password')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEPassword}}</td>
                                            </tr>
                                            <tr v-if="datailsdata.configInfo.ipType=='PPPOE'">
                                                <td>{{$t('TSBManage.MasterDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS1}}</td>
                                                <td>{{$t('TSBManage.AuxiliaryDNS')}}:</td>
                                                <td>{{datailsdata.configInfo.wanPPPoEDNS2}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top" v-if="datailstype=='2'&&lookoverstatus.doubleWifi!=''">{{$t('TSBManage.DualSSIDconfiguration')}}</div>
                                <div class="datailsbody_center" v-if="datailstype=='2'&&lookoverstatus.doubleWifi!=''"></div>
                                <div class="datailsbody_bottom" v-if="datailstype=='2'&&lookoverstatus.doubleWifi!=''">
                                    <span v-if="lookoverstatus.wifi2G!=''">2.4G</span>
                                    <table class="table table-bordered" v-if="lookoverstatus.wifi2G!=''">
                                        <tbody>
                                            <tr>
                                                <td>ssid:</td>
                                                <td>
                                                    <span>{{datailsdata.configInfo.doubleWifi2SSID}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}:</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.doubleWifi2EncryptionMode=='0'">NONE</span>
                                                    <span v-if="datailsdata.configInfo.doubleWifi2EncryptionMode=='1'">WPA2</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.doubleWifi2KeyAuth}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <span v-if="lookoverstatus.wifi5G!=''">5.8G</span>
                                    <table class="table table-bordered" v-if="lookoverstatus.wifi5G!=''">
                                        <tbody>
                                            <tr>
                                                <td>ssid:</td>
                                                <td>
                                                    <span>{{datailsdata.configInfo.doubleWifi5SSID}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.WayOfEncryption')}}</td>
                                                <td>
                                                    <span v-if="datailsdata.configInfo.doubleWifi5EncryptionMode=='0'">NONE</span>
                                                    <span v-if="datailsdata.configInfo.doubleWifi5EncryptionMode=='1'">WPA2</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.AuthenticationSecretKey')}}:</td>
                                                <td>{{datailsdata.configInfo.doubleWifi5KeyAuth}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datailsbody_top" v-if="datailstype=='2'&&lookoverstatus.portal!=''">{{$t('TSBManage.PortalAuthentication')}}</div>
                                <div class="datailsbody_center" v-if="datailstype=='2'&&lookoverstatus.portal!=''"></div>
                                <div class="datailsbody_bottom" v-if="datailstype=='2'&&lookoverstatus.portal!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>{{$t('TSBManage.CertifiedIP')}}:</td>
                                                <td>
                                                    <span>{{datailsdata.configInfo.portalIP}}</span>
                                                </td>
                                                <td>{{$t('TSBManage.Port1')}}</td>
                                                <td>
                                                    {{datailsdata.configInfo.portalPortHttp}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{{$t('TSBManage.Port2')}}:</td>
                                                <td>{{datailsdata.configInfo.portalPortHttps}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- 黑白名单 -->
                            <div v-if="datailstype=='1'||datailstype=='2'">
                                <div class="datailsbody_top">
                                    {{$t('TSBManage.BlackAndWhiteListSetting')}}-->><span v-if="dataillisttype=='0'">{{$t('TSBManage.WhiteList')}}</span>
                                    <span v-if="dataillisttype=='1'">{{$t('TSBManage.Blacklist')}}</span>
                                    <span v-if="dataillisttype==''"></span>
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
                                        :label="$t('TSBManage.MACAddress')"
                                        align='center'>
                                        </el-table-column>    
                                    </el-table>
                                </div>
                            </div>
                            <!-- 指定设备类型 -->
                            <div>
                                <div class="datailsbody_top">
                                    {{$t('templateManage.defineEquipment')}}-->><span v-if="datailsdata.templateOrder=='0'">{{$t('templateManage.defineEquipment')}}</span>
                                    <span v-if="datailsdata.templateOrder=='1'">{{$t('templateManage.DesignatedGrouping')}}</span>
                                    <span v-if="datailsdata.templateOrder=='2'">{{$t('templateManage.SpecifiedModel')}}({{datailsdata.model}})</span>
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
                                            :label="$t('TSBManage.DeviceNickname')"
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
                                            :label="$t('TSBManage.SoftwareModel')"
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
                                            :label="$t('equipmentGroup.GroupName')"
                                            width="100">
                                            </el-table-column>
                                            <el-table-column
                                            prop="model"
                                            :label="$t('TSBManage.SoftwareModel')"
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
            <!-- 批量升级模态框1 -->
            <div class="modal fade" id="BatchUpgradesModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:700px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">{{$t('templateManage.EquipmentBatchUpgrade')}}</h4>
                        </div>
                        <div class="modal-body" style="overflow;auto;">
                            <div class="BatchUpgrades">
                                <div class="BatchUpgrades_bottom1" style="width:100%">
                                    <!-- 指定设备,指定型号 -->
                                    <el-table
                                        ref="multipleTable"
                                        :data="BatchUpgradesData"
                                        border
                                        style="width:100%;"
                                        tooltip-effect="dark"
                                        @selection-change="handleSelectionChangeTwo">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        align='center'
                                        :label="$t('templateManage.DeviceNickname')"
                                        width="155">
                                            <template scope="scope">
                                                <span v-if="scope.row.nickname==''">
                                                    {{scope.row.MAC}}
                                                </span>
                                                <span v-else>
                                                    {{scope.row.nickname}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC"
                                        align='center'
                                        width="155">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        :label="$t('templateManage.Model')"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                    <div>
                                        <el-pagination
                                        @size-change="BatchUpgradesSizeChange"
                                        @current-change="BatchUpgradesIndexChange"
                                        :current-page="BatchUpgradesIndex"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="BatchUpgradesSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="BatchUpgradesTotal">
                                        </el-pagination>
                                    </div>
                                </div>
                                <!-- <div class="BatchUpgrades_bottom2" style="width:100%" v-else>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData2"
                                        border
                                        tooltip-effect="dark"
                                        style="width:100%;"
                                        @selection-change="handleSelectionChange2">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        prop="groupName"
                                        align='center'
                                        label="分组名称"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        label="硬件版本"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                    <div>
                                        <el-pagination
                                        @size-change="BatchUpgradesSizeChange2"
                                        @current-change="BatchUpgradesIndexChange2"
                                        :current-page="BatchUpgradesIndex2"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="BatchUpgradesSize2"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="BatchUpgradesTotal2">
                                        </el-pagination>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('templateManage.Close')}}</button>
                            <button @click="BatchUpgradesSubmit" type="button" class="btn btn-primary">{{$t('templateManage.confirm')}}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <!-- 批量升级模态框2 -->
            <div class="modal fade" id="BatchUpgradesModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:700px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">{{$t('templateManage.EquipmentBatchUpgrade')}}</h4>
                        </div>
                        <div class="modal-body" style="overflow;auto;">
                            <div class="BatchUpgrades">
                                <div class="BatchUpgrades_bottom2" style="width:100%" >
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData2"
                                        border
                                        tooltip-effect="dark"
                                        style="width:100%;"
                                        @selection-change="handleSelectionChange2">
                                        <el-table-column
                                        type="selection"
                                        align='center'
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        align='center'
                                        :label="$t('templateManage.DeviceNickname')"
                                        width="155">
                                            <template scope="scope">
                                                <span v-if="scope.row.nickname==''">
                                                    {{scope.row.MAC}}
                                                </span>
                                                <span v-else>
                                                    {{scope.row.nickname}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="MAC"
                                        label="MAC"
                                        align='center'
                                        width="155">
                                        </el-table-column>
                                        <el-table-column
                                        prop="model"
                                        :label="$t('templateManage.Model')"
                                        align='center'>
                                        </el-table-column>
                                    </el-table>
                                    <div>
                                        <el-pagination
                                        @size-change="BatchUpgradesSizeChange2"
                                        @current-change="BatchUpgradesIndexChange2"
                                        :current-page="BatchUpgradesIndex2"
                                        :page-sizes="[10, 20, 30, 50]"
                                        :page-size="BatchUpgradesSize2"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="BatchUpgradesTotal2">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('templateManage.Close')}}</button>
                            <button @click="BatchUpgradesSubmit" type="button" class="btn btn-primary">{{$t('templateManage.confirm')}}</button>
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
                keyword:'',
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
                setTemplateBatch:false,
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
                classestwo:[],
                classesvaluetwo:'',
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
                    wifi2ApChannel:'0',
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
                    wifi5ApChannel:'0',
                    wifi5ApLaunchPower:'1',
                    wifi5ApEncryptionMode:'1',
                    wifi5ApKeyAuth:'',
                    wifi5StaEncryptionMode:'0',
                    // wifi5StaPriority:'1',
                    wifi5StaKeyAuth:"",
                    wifi5StaSSID:'',
                },//tsbc配置数据
                tsbctsbacaollcate:{
                    ipType:'DHCP',
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
                    wifi2Channel:'0',
                    wifi2LaunchPower:'1',
                    wifi2EncryptionMode:'0',
                    wifi2KeyAuth:'',
                    wifi2HideSSID:1,

                    wifi5Enable:1,
                    wifi5SSID:"",
                    wifi5Bandwidth:'HT20',
                    wifi5Channel:'0',
                    wifi5LaunchPower:'1',
                    wifi5EncryptionMode:'0',
                    wifi5KeyAuth:'',
                    wifi5HideSSID:1,

                    doubleWifi2SSID:'',
                    doubleWifi2EncryptionMode:'0',
                    doubleWifi2KeyAuth:'',
                    doubleWifi5SSID:'',
                    doubleWifi5EncryptionMode:'0',
                    doubleWifi5KeyAuth:'',

                    portalEnable:'1',
                    portalIP:'',
                    portalPortHttp:'',
                    portalPortHttps:'',
                },//tsba配置数据
                // 查看详情
                datailstype:'',
                datailsdata:'',
                datailstabledata:[], //黑白名单数据
                dataillisttype:'', //黑白名单类型
                //升级包批量下发
                typeData:0,
                BatchUpgradesData:[],
                BatchUpgradesIndex:1,
                BatchUpgradesSize:10,
                BatchUpgradesTotal:10,
                BatchUpgradesVal:'',
                tableData2:[],
                BatchUpgradesIndex2:1,
                BatchUpgradesSize2:10,
                BatchUpgradesTotal2:10,
                dataSize1:[],
                dataSize2:[],
                props:'',//排序字段
                orders:'',
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
                                if(data.result[i].code=='setTemplateBatch'){
                                    that.setTemplateBatch = true
                                }
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },200)
        },
        methods:{
            sortChange(column, prop, order){
                this.props = column.prop
                this.orders = column.order
                this.ready()
            },
            // 查看详情按钮
            details(val){
                var that = this
                this.datailstype = val.templateType
                $('#detailsModal').modal('show')
                that.datailstabledata = [];
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        type:val.templateType,
                        model:val.model
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
                                if(WAN[i]=='1'||WAN[i]=='2'){
                                    that.lookoverlan = true
                                }else{
                                    that.lookoverlan = false
                                }
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
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
                            that.errorCode(data)
                        }
                    }
                })
            },
            //批量下发按钮
            BatchUpgrades(val){
                var that = this;
                if(val.status=='1'){
                    that.$message({
                        message: that.$t('templateManage.TemplateForbiddenState'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                that.typeData = val.templateOrder
                if(val.templateOrder=='0'||val.templateOrder=='2'){
                    that.typeData = val.templateOrder
                    $('#BatchUpgradesModal').modal('show')
                }else if(val.templateOrder=='1'){
                    that.typeData = val.templateOrder
                    $('#BatchUpgradesModal2').modal('show')
                }else{
                    that.$message({
                        message: that.$t('templateManage.DoBatches'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                that.BatchUpgradesVal = val
                that.BatchUpgradesReady(val)
            },
            //获取下发设备
            BatchUpgradesReady(val){
                var that = this;
                var data={};
                data.id = val.id
                if(that.typeData=='0'||that.typeData=='2'){
                    data.pageIndex = that.BatchUpgradesIndex
                    data.pageSize = that.BatchUpgradesSize
                }
                if(that.typeData=='1'){
                    data.pageIndex = that.BatchUpgradesIndex2
                    data.pageSize = that.BatchUpgradesSize2
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/getEquipmentByTemplate',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(that.typeData=='0'||that.typeData=='2'){
                                that.BatchUpgradesData = data.rows
                                that.BatchUpgradesTotal = data.total
                            }
                            if(that.typeData=='1'){
                                that.tableData2 = data.rows
                                that.BatchUpgradesTotal2 = data.total
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //批量下发 指定设备,指定型号
            handleSelectionChangeTwo(val){
                this.dataSize1 = val
            },
            BatchUpgradesSizeChange(val){
                this.BatchUpgradesSize = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            BatchUpgradesIndexChange(val){
                this.BatchUpgradesIndex = val
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            //批量下发 指定分组
            handleSelectionChange2(val){
                this.dataSize2 = val
            },
            BatchUpgradesSizeChange2(val){
                this.BatchUpgradesSize2 = val;
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            BatchUpgradesIndexChange2(val){
                this.BatchUpgradesIndex2 = val;
                this.BatchUpgradesReady(this.BatchUpgradesVal)
            },
            //批量下发数据保存
            BatchUpgradesSubmit(){
                var that = this;
                var data = {};
                var arr = [];
                if(that.typeData=='0'||that.typeData=='2'){
                    if(that.dataSize1.length=='0'){
                        that.$message({
                            message: that.$t('templateManage.PleaseSelectDeviceForOperation'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                }
                if(that.typeData=='1'){
                    if(that.dataSize2.length=='0'){
                        that.$message({
                            message: that.$t('templateManage.PleaseSelectGroupsForOperation'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                }
                if(that.typeData=='0'||that.typeData=='2'){
                    for(var i = 0;i<that.dataSize1.length;i++){
                        arr.push(that.dataSize1[i].id)
                    }
                }
                if(that.typeData=='1'){
                    for(var i = 0;i<that.dataSize2.length;i++){
                        arr.push(that.dataSize2[i].id)
                    }
                }
                data.templateId = that.BatchUpgradesVal.id
                data.equipmentIds = arr.join(',')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'template/setBatchConfigTemplate',
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            $('#BatchUpgradesModal').modal('hide')
                            $('#BatchUpgradesModal2').modal('hide')
                            that.$message({
                                message: that.$t('templateManage.Successes'),
                                type: 'success',
                                showClose: true,
                            });
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //TSBCwifi2Enable2G  启用不启用change事件
            TSBCwifi2Enable2G(){
                var that = this
                if(that.tsbccollcate.wifi2Enable=='0'){
                    setTimeout(function(){
                        if(that.tsbccollcate.wifi2WorkMode=='AP'){
                            for(var i=0;i<$('.tsbc2GinputAP').length;i++){
                                $('.tsbc2GinputAP').eq(i).attr("disabled","disabled");
                            }
                            for(var i=0;i<$('.tsbc2GselectAP').length;i++){
                                $('.tsbc2GselectAP').eq(i).attr("disabled","disabled");
                            }
                            that.tsbc2Gradio = true
                        }else{
                            for(var i=0;i<$('.tsbc2GinputSta').length;i++){
                                $('.tsbc2GinputSta').eq(i).attr("disabled","disabled");
                            }
                            for(var i=0;i<$('.tsbc2GselectSta').length;i++){
                                $('.tsbc2GselectSta').eq(i).attr("disabled","disabled");
                            }
                        }
                    },100)
                    
                }else{
                    setTimeout(function(){
                        if(that.tsbccollcate.wifi2WorkMode=='AP'){
                            for(var i=0;i<$('.tsbc2GinputAP').length;i++){
                                $('.tsbc2GinputAP').eq(i).removeAttr("disabled");
                            }
                            for(var i=0;i<$('.tsbc2GselectAP').length;i++){
                                $('.tsbc2GselectAP').eq(i).removeAttr("disabled");
                            }
                            that.tsbc2Gradio = false
                        }else{
                            for(var i=0;i<$('.tsbc2GinputSta').length;i++){
                                $('.tsbc2GinputSta').eq(i).removeAttr("disabled");
                            }
                            for(var i=0;i<$('.tsbc2GselectSta').length;i++){
                                $('.tsbc2GselectSta').eq(i).removeAttr("disabled");
                            }
                        }
                    },100)
                    
                }
            },
            //TSBCwifi5Enable5G  启用不启用change事件
            TSBCwifi5Enable5G(){
                var that = this
                if(that.tsbccollcate.wifi5Enable=='0'){
                    setTimeout(function(){
                        if(that.tsbccollcate.wifi5WorkMode=='AP'){
                            for(var i=0;i<$('.tsbc5GinputAP').length;i++){
                                $('.tsbc5GinputAP').eq(i).attr("disabled","disabled");
                            }
                            for(var i=0;i<$('.tsbc5GselectAP').length;i++){
                                $('.tsbc5GselectAP').eq(i).attr("disabled","disabled");
                            }
                            that.tsbc5Gradio = true
                        }else{
                            for(var i=0;i<$('.tsbc5GinputSta').length;i++){
                                $('.tsbc5GinputSta').eq(i).attr("disabled","disabled");
                            }
                            for(var i=0;i<$('.tsbc5GselectSta').length;i++){
                                $('.tsbc5GselectSta').eq(i).attr("disabled","disabled");
                            }
                        }
                    },100)
                }else{
                    setTimeout(function(){
                        if(that.tsbccollcate.wifi5WorkMode=='AP'){
                            for(var i=0;i<$('.tsbc5GinputAP').length;i++){
                                $('.tsbc5GinputAP').eq(i).removeAttr("disabled");
                            }
                            for(var i=0;i<$('.tsbc5GselectAP').length;i++){
                                $('.tsbc5GselectAP').eq(i).removeAttr("disabled");
                            }
                            that.tsbc5Gradio = false
                        }else{
                            for(var i=0;i<$('.tsbc5GinputSta').length;i++){
                                $('.tsbc5GinputSta').eq(i).removeAttr("disabled");
                            }
                            for(var i=0;i<$('.tsbc5GselectSta').length;i++){
                                $('.tsbc5GselectSta').eq(i).removeAttr("disabled");
                            }
                        }
                    },100)
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
                var that = this
                if(that.tsbacaollcate.wifi2Enable=='0'){
                    setTimeout(function(){
                        for(var i=0;i<$('.tsba2Ginput').length;i++){
                            $('.tsba2Ginput').eq(i).attr("disabled","disabled");
                        }
                        for(var i = 0;i<$('.tsba2Gselect').length;i++){
                            $('.tsba2Gselect').eq(i).attr("disabled","disabled");
                        }
                        that.tsba2Gradio = true
                    },100)
                }else{
                    setTimeout(function(){
                        for(var i=0;i<$('.tsba2Ginput').length;i++){
                            $('.tsba2Ginput').eq(i).removeAttr("disabled");
                        }
                        for(var i = 0;i<$('.tsba2Gselect').length;i++){
                            $('.tsba2Gselect').eq(i).removeAttr("disabled");
                        }
                        that.tsba2Gradio = false
                    },200)
                }
            },
            //TSBAwifi5Enable5G  启用不启用change事件
            TSBAwifi5Enable5G(){
                var that = this
                if(that.tsbacaollcate.wifi5Enable=='0'){
                    setTimeout(function(){
                        for(var i=0;i<$('.tsba5Ginput').length;i++){
                            $('.tsba5Ginput').eq(i).attr("disabled","disabled");
                        }
                        for(var i = 0;i<$('.tsba5Gselect').length;i++){
                            $('.tsba5Gselect').eq(i).attr("disabled","disabled");
                        }
                        that.tsba5Gradio = true
                    },100)
                }else{
                    setTimeout(function(){
                        for(var i=0;i<$('.tsba5Ginput').length;i++){
                            $('.tsba5Ginput').eq(i).removeAttr("disabled");
                        }
                        for(var i = 0;i<$('.tsba5Gselect').length;i++){
                            $('.tsba5Gselect').eq(i).removeAttr("disabled");
                        }
                        that.tsba5Gradio = false
                    },100)
                }
            },
            //portalEnable 启用不启用事件
            portalEnable(){
                if(this.tsbacaollcate.portalEnable=='0'||this.tsbacaollcate.portalEnable==0){
                    setTimeout(function(){
                        $('.portalIP').attr("disabled","disabled");
                        $('.portalPortHttp').attr("disabled","disabled");
                        $('.portalPortHttps').attr("disabled","disabled");
                    },100)
                }else{
                    setTimeout(function(){
                        $('.portalIP').removeAttr("disabled","disabled");
                        $('.portalPortHttp').removeAttr("disabled","disabled");
                        $('.portalPortHttps').removeAttr("disabled","disabled");
                    },100)
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
                that.tsbacaollcate.doubleWifi2SSID = ''
                that.tsbacaollcate.doubleWifi2KeyAuth = ''
                that.tsbacaollcate.doubleWifi5SSID = ''
                that.tsbacaollcate.doubleWifi5KeyAuth = ''
                that.tsbacaollcate.portalIP = ''
                that.tsbacaollcate.portalPortHttp = ''
                that.tsbacaollcate.portalPortHttps = ''

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
                // $('.myModalLabel').text('添加模板')
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
                                that.options = data.result
                                that.value = data.result[0].value
                            }else{
                                that.errorCode(data)
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
                // $('.myModalLabel').text('修改模板')
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
                                        if(WAN[i]=='1'||WAN[i]=='2'){
                                            that.lookoverlan = true
                                        }else{
                                            that.lookoverlan = false
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
                                if(data.result.configInfo.ipType==''||data.result.configInfo.ipType==undefined||data.result.configInfo.ipType==NaN){
                                    that.tsbgcollcate.ipType='DHCP'
                                }else{
                                    that.tsbgcollcate.ipType = data.result.configInfo.ipType
                                }
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
                                if(data.result.configInfo.startDhcpServer==''||data.result.configInfo.startDhcpServer==undefined||data.result.configInfo.startDhcpServer==NaN){
                                    that.tsbgcollcate.startDhcpServer = 0
                                }else{
                                    that.tsbgcollcate.startDhcpServer = Number(data.result.configInfo.startDhcpServer)
                                }
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

                                if(data.result.configInfo.ipType==''||data.result.configInfo.ipType==undefined||data.result.configInfo.ipType==NaN){
                                    that.tsbctsbacaollcate.ipType = 'DHCP'
                                }else{
                                    that.tsbctsbacaollcate.ipType = data.result.configInfo.ipType
                                }
                                that.tsbctsbacaollcate.wanIP = data.result.configInfo.wanIP
                                that.tsbctsbacaollcate.wanSubnetmask = data.result.configInfo.wanSubnetmask
                                that.tsbctsbacaollcate.wanDNS1 = data.result.configInfo.wanDNS1
                                that.tsbctsbacaollcate.wanDNS2 = data.result.configInfo.wanDNS2
                                that.tsbctsbacaollcate.wanGateway = data.result.configInfo.wanGateway
                                that.tsbctsbacaollcate.wanPPPoEUsername = data.result.configInfo.wanPPPoEUsername
                                that.tsbctsbacaollcate.wanPPPoEPassword = data.result.configInfo.wanPPPoEPassword
                                that.tsbctsbacaollcate.wanPPPoEDNS1 = data.result.configInfo.wanPPPoEDNS1
                                that.tsbctsbacaollcate.wanPPPoEDNS2 = data.result.configInfo.wanPPPoEDNS2
                                
                                if(data.result.configInfo.wifi2Enable==''||data.result.configInfo.wifi2Enable==undefined||data.result.configInfo.wifi2Enable==NaN){
                                    that.tsbccollcate.wifi2Enable = 1
                                }else{
                                    that.tsbccollcate.wifi2Enable = Number(data.result.configInfo.wifi2Enable)
                                }
                                if(data.result.configInfo.wifi2WorkMode==''||data.result.configInfo.wifi2WorkMode==undefined||data.result.configInfo.wifi2WorkMode==NaN){
                                    that.tsbccollcate.wifi2WorkMode = 'AP'
                                }else{
                                    that.tsbccollcate.wifi2WorkMode = data.result.configInfo.wifi2WorkMode
                                }
                                if(data.result.configInfo.wifi2ApHideSSID==''||data.result.configInfo.wifi2ApHideSSID==undefined||data.result.configInfo.wifi2ApHideSSID==NaN){
                                    that.tsbccollcate.wifi2ApHideSSID = 1
                                }else{
                                    that.tsbccollcate.wifi2ApHideSSID = Number(data.result.configInfo.wifi2ApHideSSID)
                                }
                                if(data.result.configInfo.wifi2ApBandwidth==''||data.result.configInfo.wifi2ApBandwidth==undefined||data.result.configInfo.wifi2ApBandwidth==NaN){
                                    that.tsbccollcate.wifi2ApBandwidth = 'HT20'
                                }else{
                                    that.tsbccollcate.wifi2ApBandwidth = data.result.configInfo.wifi2ApBandwidth
                                }
                                if(data.result.configInfo.wifi2ApChannel==''||data.result.configInfo.wifi2ApChannel==undefined||data.result.configInfo.wifi2ApChannel==NaN){
                                    that.tsbccollcate.wifi2ApChannel = '0'
                                }else{
                                    if(data.result.configInfo.wifi2ApChannel=='auto'){
                                        that.tsbccollcate.wifi2ApChannel = '0'
                                    }else{
                                        that.tsbccollcate.wifi2ApChannel = data.result.configInfo.wifi2ApChannel
                                    }
                                }
                                if(data.result.configInfo.wifi2ApLaunchPower==''||data.result.configInfo.wifi2ApLaunchPower==undefined||data.result.configInfo.wifi2ApLaunchPower==NaN){
                                    that.tsbccollcate.wifi2ApLaunchPower = '1'
                                }else{
                                    that.tsbccollcate.wifi2ApLaunchPower = data.result.configInfo.wifi2ApLaunchPower
                                }
                                if(data.result.configInfo.wifi2ApEncryptionMode==''||data.result.configInfo.wifi2ApEncryptionMode==undefined||data.result.configInfo.wifi2ApEncryptionMode==NaN){
                                    that.tsbccollcate.wifi2ApEncryptionMode = '0'
                                }else{
                                    that.tsbccollcate.wifi2ApEncryptionMode = data.result.configInfo.wifi2ApEncryptionMode
                                }
                                if(data.result.configInfo.wifi2StaEncryptionMode==''||data.result.configInfo.wifi2StaEncryptionMode==undefined||data.result.configInfo.wifi2StaEncryptionMode==NaN){
                                    that.tsbccollcate.wifi2StaEncryptionMode = '0'
                                }else{
                                    that.tsbccollcate.wifi2StaEncryptionMode = data.result.configInfo.wifi2StaEncryptionMode
                                }
                                that.tsbccollcate.wifi2ApSSID = data.result.configInfo.wifi2ApSSID
                                that.tsbccollcate.wifi2ApKeyAuth = data.result.configInfo.wifi2ApKeyAuth
                                that.tsbccollcate.wifi2StaKeyAuth = data.result.configInfo.wifi2StaKeyAuth
                                that.tsbccollcate.wifi2StaSSID = data.result.configInfo.wifi2StaSSID

                                if(data.result.configInfo.wifi5Enable==''||data.result.configInfo.wifi5Enable==undefined||data.result.configInfo.wifi5Enable==NaN){
                                    that.tsbccollcate.wifi5Enable = 0
                                }else{
                                    that.tsbccollcate.wifi5Enable = Number(data.result.configInfo.wifi5Enable)
                                }
                                if(data.result.configInfo.wifi5WorkMode==''||data.result.configInfo.wifi5WorkMode==undefined||data.result.configInfo.wifi5WorkMode==NaN){
                                    that.tsbccollcate.wifi5WorkMode = 'AP'
                                }else{
                                    that.tsbccollcate.wifi5WorkMode = data.result.configInfo.wifi5WorkMode
                                }
                                if(data.result.configInfo.wifi5ApHideSSID==''||data.result.configInfo.wifi5ApHideSSID==undefined||data.result.configInfo.wifi5ApHideSSID==NaN){
                                    that.tsbccollcate.wifi5ApHideSSID = 1
                                }else{
                                    that.tsbccollcate.wifi5ApHideSSID = Number(data.result.configInfo.wifi5ApHideSSID)
                                }
                                if(data.result.configInfo.wifi5ApBandwidth==''||data.result.configInfo.wifi5ApBandwidth==undefined||data.result.configInfo.wifi5ApBandwidth==NaN){
                                    that.tsbccollcate.wifi5ApBandwidth = 'HT20'
                                }else{
                                    that.tsbccollcate.wifi5ApBandwidth = data.result.configInfo.wifi5ApBandwidth
                                }
                                if(data.result.configInfo.wifi5ApChannel==''||data.result.configInfo.wifi5ApChannel==undefined||data.result.configInfo.wifi5ApChannel==NaN){
                                    that.tsbccollcate.wifi5ApChannel = '0'
                                }else{
                                    if(data.result.configInfo.wifi5ApChannel=='auto'){
                                        that.tsbccollcate.wifi5ApChannel = '0'
                                    }else{
                                        that.tsbccollcate.wifi5ApChannel = data.result.configInfo.wifi5ApChannel
                                    }
                                }
                                if(data.result.configInfo.wifi5ApLaunchPower==''||data.result.configInfo.wifi5ApLaunchPower==undefined||data.result.configInfo.wifi5ApLaunchPower==NaN){
                                    that.tsbccollcate.wifi2ApLaunchPower = '1'
                                }else{
                                    that.tsbccollcate.wifi5ApLaunchPower = data.result.configInfo.wifi5ApLaunchPower
                                }
                                if(data.result.configInfo.wifi5ApEncryptionMode==''||data.result.configInfo.wifi5ApEncryptionMode==undefined||data.result.configInfo.wifi5ApEncryptionMode==NaN){
                                    that.tsbccollcate.wifi5ApEncryptionMode = '0'
                                }else{
                                    that.tsbccollcate.wifi5ApEncryptionMode = data.result.configInfo.wifi5ApEncryptionMode
                                }
                                if(data.result.configInfo.wifi5StaEncryptionMode==''||data.result.configInfo.wifi5StaEncryptionMode==undefined||data.result.configInfo.wifi5StaEncryptionMode==NaN){
                                    that.tsbccollcate.wifi5StaEncryptionMode = '0'
                                }else{
                                    that.tsbccollcate.wifi5StaEncryptionMode = data.result.configInfo.wifi5StaEncryptionMode
                                }
                                that.tsbccollcate.wifi5ApSSID = data.result.configInfo.wifi5ApSSID
                                that.tsbccollcate.wifi5ApKeyAuth = data.result.configInfo.wifi5ApKeyAuth
                                that.tsbccollcate.wifi5StaKeyAuth = data.result.configInfo.wifi5StaKeyAuth
                                that.tsbccollcate.wifi5StaSSID = data.result.configInfo.wifi5StaSSID
                                that.TSBCwifi2Enable2G()
                                that.TSBCwifi5Enable5G()
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

                                if(data.result.configInfo.ipType==''||data.result.configInfo.ipType==undefined||data.result.configInfo.ipType==NaN){
                                    that.tsbctsbacaollcate.ipType = 'DHCP'
                                }else{
                                    that.tsbctsbacaollcate.ipType = data.result.configInfo.ipType
                                }
                                that.tsbctsbacaollcate.wanIP = data.result.configInfo.wanIP
                                that.tsbctsbacaollcate.wanSubnetmask = data.result.configInfo.wanSubnetmask
                                that.tsbctsbacaollcate.wanDNS1 = data.result.configInfo.wanDNS1
                                that.tsbctsbacaollcate.wanDNS2 = data.result.configInfo.wanDNS2
                                that.tsbctsbacaollcate.wanGateway = data.result.configInfo.wanGateway
                                that.tsbctsbacaollcate.wanPPPoEUsername = data.result.configInfo.wanPPPoEUsername
                                that.tsbctsbacaollcate.wanPPPoEPassword = data.result.configInfo.wanPPPoEPassword
                                that.tsbctsbacaollcate.wanPPPoEDNS1 = data.result.configInfo.wanPPPoEDNS1
                                that.tsbctsbacaollcate.wanPPPoEDNS2 = data.result.configInfo.wanPPPoEDNS2

                                if(data.result.configInfo.wifi2Enable==''||data.result.configInfo.wifi2Enable==undefined||data.result.configInfo.wifi2Enable==NaN){
                                    that.tsbacaollcate.wifi2Enable = 0
                                }else{
                                    that.tsbacaollcate.wifi2Enable = Number(data.result.configInfo.wifi2Enable)
                                }
                                if(data.result.configInfo.wifi2Bandwidth==''||data.result.configInfo.wifi2Bandwidth==undefined||data.result.configInfo.wifi2Bandwidth==NaN){
                                    that.tsbacaollcate.wifi2Bandwidth = 'HT20'
                                }else{
                                    that.tsbacaollcate.wifi2Bandwidth = data.result.configInfo.wifi2Bandwidth
                                }
                                if(data.result.configInfo.wifi2Channel==''||data.result.configInfo.wifi2Channel==undefined||data.result.configInfo.wifi2Channel==NaN){
                                    that.tsbacaollcate.wifi2Channel = '0'
                                }else{
                                    if(data.result.configInfo.wifi2Channel=='auto'){
                                        that.tsbacaollcate.wifi2Channel = '0'
                                    }else{
                                        that.tsbacaollcate.wifi2Channel = data.result.configInfo.wifi2Channel
                                    }
                                }
                                if(data.result.configInfo.wifi2LaunchPower==''||data.result.configInfo.wifi2LaunchPower==undefined||data.result.configInfo.wifi2LaunchPower==NaN){
                                    that.tsbacaollcate.wifi2LaunchPower = '1'
                                }else{
                                    that.tsbacaollcate.wifi2LaunchPower = data.result.configInfo.wifi2LaunchPower
                                }
                                if(data.result.configInfo.wifi2EncryptionMode==''||data.result.configInfo.wifi2EncryptionMode==undefined||data.result.configInfo.wifi2EncryptionMode==NaN){
                                    that.tsbacaollcate.wifi2EncryptionMode = '1'
                                }else{
                                    that.tsbacaollcate.wifi2EncryptionMode = data.result.configInfo.wifi2EncryptionMode
                                }
                                if(data.result.configInfo.wifi2HideSSID==''||data.result.configInfo.wifi2HideSSID==undefined||data.result.configInfo.wifi2HideSSID==NaN){
                                    that.tsbacaollcate.wifi2HideSSID = 1
                                }else{
                                    that.tsbacaollcate.wifi2HideSSID = Number(data.result.configInfo.wifi2HideSSID)
                                }
                                that.tsbacaollcate.wifi2SSID = data.result.configInfo.wifi2SSID
                                that.tsbacaollcate.wifi2KeyAuth = data.result.configInfo.wifi2KeyAuth
                                
                                if(data.result.configInfo.wifi5Enable==''||data.result.configInfo.wifi5Enable==undefined||data.result.configInfo.wifi5Enable==NaN){
                                    that.tsbacaollcate.wifi5Enable = 0
                                }else{
                                    that.tsbacaollcate.wifi5Enable = Number(data.result.configInfo.wifi5Enable)
                                }
                                if(data.result.configInfo.wifi5Bandwidth==''||data.result.configInfo.wifi5Bandwidth==undefined||data.result.configInfo.wifi5Bandwidth==NaN){
                                    that.tsbacaollcate.wifi5Bandwidth = 'HT20'
                                }else{
                                    that.tsbacaollcate.wifi5Bandwidth = data.result.configInfo.wifi5Bandwidth
                                }
                                if(data.result.configInfo.wifi5Channel==''||data.result.configInfo.wifi5Channel==undefined||data.result.configInfo.wifi5Channel==NaN){
                                    that.tsbacaollcate.wifi5Channel = '0'
                                }else{
                                    if(data.result.configInfo.wifi5Channel=='auto'){
                                        that.tsbacaollcate.wifi5Channel = '0'
                                    }else{
                                        that.tsbacaollcate.wifi5Channel = data.result.configInfo.wifi5Channel
                                    }
                                }
                                if(data.result.configInfo.wifi5LaunchPower==''||data.result.configInfo.wifi5LaunchPower==undefined||data.result.configInfo.wifi5LaunchPower==NaN){
                                    that.tsbacaollcate.wifi5LaunchPower = '1'
                                }else{
                                    that.tsbacaollcate.wifi5LaunchPower = data.result.configInfo.wifi5LaunchPower
                                }
                                if(data.result.configInfo.wifi5EncryptionMode==''||data.result.configInfo.wifi5EncryptionMode==undefined||data.result.configInfo.wifi5EncryptionMode==NaN){
                                    that.tsbacaollcate.wifi5EncryptionMode = '1'
                                }else{
                                    that.tsbacaollcate.wifi5EncryptionMode = data.result.configInfo.wifi5EncryptionMode
                                }
                                if(data.result.configInfo.wifi5HideSSID==''||data.result.configInfo.wifi5HideSSID==undefined||data.result.configInfo.wifi5HideSSID==NaN){
                                    that.tsbacaollcate.wifi5HideSSID = 1
                                }else{
                                    that.tsbacaollcate.wifi5HideSSID = Number(data.result.configInfo.wifi5HideSSID)
                                }
                                that.tsbacaollcate.wifi5SSID = data.result.configInfo.wifi5SSID
                                that.tsbacaollcate.wifi5KeyAuth = data.result.configInfo.wifi5KeyAuth
                                
                                
                                // if(val.model=='TSBA721-I'){
                                    that.tsbacaollcate.doubleWifi2SSID = data.result.configInfo.doubleWifi2SSID
                                    if(data.result.configInfo.doubleWifi2EncryptionMode==''||data.result.configInfo.doubleWifi2EncryptionMode==undefined||data.result.configInfo.doubleWifi2EncryptionMode==NaN){
                                        that.tsbacaollcate.doubleWifi2EncryptionMode='1'
                                    }else{
                                        that.tsbacaollcate.doubleWifi2EncryptionMode = data.result.configInfo.doubleWifi2EncryptionMode
                                    }
                                    that.tsbacaollcate.doubleWifi2KeyAuth = data.result.configInfo.doubleWifi2KeyAuth
                                    that.tsbacaollcate.doubleWifi5SSID = data.result.configInfo.doubleWifi5SSID
                                    if(data.result.configInfo.doubleWifi5EncryptionMode==''||data.result.configInfo.doubleWifi5EncryptionMode==undefined||data.result.configInfo.doubleWifi5EncryptionMode==NaN){
                                        that.tsbacaollcate.doubleWifi5EncryptionMode='1'
                                    }else{
                                        that.tsbacaollcate.doubleWifi5EncryptionMode = data.result.configInfo.doubleWifi5EncryptionMode
                                    }
                                    that.tsbacaollcate.doubleWifi5KeyAuth = data.result.configInfo.doubleWifi5KeyAuth
                                    if(data.result.configInfo.portalEnable==''||data.result.configInfo.portalEnable==undefined||data.result.configInfo.portalEnable==NaN){
                                        that.tsbacaollcate.portalEnable='0'
                                    }else{
                                        that.tsbacaollcate.portalEnable = Number(data.result.configInfo.portalEnable)
                                    }
                                    that.tsbacaollcate.portalIP = data.result.configInfo.portalIP
                                    that.tsbacaollcate.portalPortHttp = data.result.configInfo.portalPortHttp
                                    that.tsbacaollcate.portalPortHttps = data.result.configInfo.portalPortHttps
                                    that.TSBAwifi2Enable2G()
                                    that.TSBAwifi5Enable5G()
                                    that.portalEnable()
                                // }
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
                            that.errorCode(data)
                        }
                    }
                })
            },
            //点击删除模板按钮
            removetemplateT(val){
                var that = this;
                this.$confirm(that.$t('FalseHints.confirmDeletion'), that.$t('FalseHints.title'), {
                    confirmButtonText: that.$t('FalseHints.yes'),
                    cancelButtonText: that.$t('FalseHints.no'),
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
                                    message: that.$t('FalseHints.DeleteSuccess'),
                                    type: 'success',
                                    showClose: true,
                                });
                                that.ready();
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message:that.$t('FalseHints.Undelete'),
                    });          
                });
            },
            //点击启用禁用按钮
            forbidden(val){
                var that = this
                if(that.startusing==false){
                    that.$message({
                        message: that.$t('FalseHints.YouDoNotHaveThisAuthority'),
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

                                    message: that.$t('templateManage.DisableSuccess'),
                                    type:'success',
                                    showClose: true,
                                });
                            }
                            if(val.status=='1'){
                                that.$message({
                                    message: that.$t('templateManage.EnableSuccess'),
                                    type:'success',
                                    showClose: true,
                                });
                            }
                            that.ready()
                        }else{
                            that.errorCode(data)
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
                            that.errorCode(data)
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
                    this.portalEnable()
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
                                if(WAN[i]=='1'||WAN[i]=='2'){
                                    that.lookoverlan = true
                                }else{
                                    that.lookoverlan = false
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
                            that.errorCode(data)
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
                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.ipType=='STATIC'){
                        if(!IP.test(that.tsbgcollcate.wanIP)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbgcollcate.wanSubnetmask)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.wanGateway==''){}else{
                            if(!IP.test(that.tsbgcollcate.wanGateway)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanDNS1==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanDNS1)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanDNS2==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanDNS2)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.wanPPPoEDNS1==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS1)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbgcollcate.wanPPPoEDNS2==''){}else{
                            if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS2)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(!IP.test(that.tsbgcollcate.lanIp)){
                        that.$message({
                            message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!exp.test(that.tsbgcollcate.lanSubnetmask)){
                        that.$message({
                            message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanStartAddress==''){
                        this.$message({
                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbgcollcate.lanEndAddress==''){
                        this.$message({
                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!IP.test(that.tsbgcollcate.lanGateway)){
                        that.$message({
                            message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(!DNSS.test(that.tsbgcollcate.lanDNS1)||!DNSS.test(that.tsbgcollcate.lanDNS2)){
                        this.$message({
                            message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.lookoverstatus.wifi2G=='1'){
                        if(this.tsbccollcate.wifi2Enable=='1'){
                            if(that.tsbccollcate.wifi2WorkMode=='AP'){
                                if(that.tsbccollcate.wifi2ApBandwidth==''||that.tsbccollcate.wifi2ApChannel==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2ApSSID==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2ApEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi2ApKeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2ApKeyAuth.length<8){
                                    this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi2ApKeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
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
                                        message:that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi2StaEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi2StaKeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2StaKeyAuth.length<8){
                                    this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi2StaKeyAuth)){
                                        this.$message({
                                            message:that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    if(that.lookoverstatus.wifi5G=='1'){
                        if(this.tsbccollcate.wifi5Enable=='1'){
                            if(that.tsbccollcate.wifi5WorkMode=='AP'){
                                if(that.tsbccollcate.wifi5ApBandwidth==''||that.tsbccollcate.wifi5ApChannel==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5ApSSID==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5ApEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi5ApKeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApKeyAuth.length<8){
                                    this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi5ApKeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
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
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbccollcate.wifi5StaEncryptionMode=='0'){}else{
                                    if(that.tsbccollcate.wifi5StaKeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5StaKeyAuth.length<8){
                                    this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return; 
                                    }
                                    if(result.test(that.tsbccollcate.wifi5StaKeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    if(that.valuetwo!='TSBC721'){
                        if(that.tsbctsbacaollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                    that.$message({
                                        message:that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                    message:that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message:that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
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
                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.tsbctsbacaollcate.ipType=='STATIC'){
                        if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanGateway==''){}else{
                            if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                        if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                            if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(that.lookoverstatus.wifi2G=='1'){
                        if(this.tsbacaollcate.wifi2Enable=='1'){
                            if(that.tsbacaollcate.wifi2EncryptionMode=='0'){}else{
                                if(that.tsbacaollcate.wifi2KeyAuth==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.wifi2KeyAuth.length<8){
                                    this.$message({
                                        message: that.$t('FalseHints.AuthenticationSecretBits'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(result.test(that.tsbacaollcate.wifi2KeyAuth)){
                                    this.$message({
                                        message: that.$t('FalseHints.TheChineseCharacters'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbacaollcate.wifi2SSID==''){
                                this.$message({
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }
                    if(that.lookoverstatus.wifi5G=='1'){
                        if(this.tsbacaollcate.wifi5Enable=='1'){
                            if(that.tsbacaollcate.wifi5EncryptionMode=='0'){}else{
                                if(that.tsbacaollcate.wifi5KeyAuth==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.wifi5KeyAuth.length<8){
                                    this.$message({
                                        message: that.$t('FalseHints.AuthenticationSecretBits'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(result.test(that.tsbacaollcate.wifi5KeyAuth)){
                                    this.$message({
                                        message: that.$t('FalseHints.TheChineseCharacters'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbacaollcate.wifi5SSID==''){
                                this.$message({
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            } 
                        }  
                    } 
                    if(that.lookoverstatus.doubleWifi=='1'){
                        if(that.lookoverstatus.wifi2G=='1'){
                            if(this.tsbacaollcate.wifi2Enable=='1'){
                                if(that.tsbacaollcate.doubleWifi2SSID==''||that.tsbacaollcate.doubleWifi2EncryptionMode==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.doubleWifi2EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.doubleWifi2KeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi2KeyAuth.length<8){
                                        this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.doubleWifi2KeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                        if(that.lookoverstatus.wifi5G=='1'){
                            if(this.tsbacaollcate.wifi5Enable=='1'){
                                if(that.tsbacaollcate.doubleWifi5SSID==''||that.tsbacaollcate.doubleWifi5EncryptionMode==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.doubleWifi5EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.doubleWifi5KeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi5KeyAuth.length<8){
                                        this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.doubleWifi5KeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    if(that.lookoverstatus.portal=='1'){
                        if(that.tsbacaollcate.portalEnable=='0'){}else{
                            if(that.tsbacaollcate.portalIP==''||that.tsbacaollcate.portalPortHttp==''||that.tsbacaollcate.portalPortHttps==''){
                                this.$message({
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!IP.test(that.tsbacaollcate.portalIP)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                        }
                    }    
                    if(that.tsbctsbacaollcate.ipType=='DHCP'||that.tsbctsbacaollcate.ipType=='STATIC'){

                    }else if(that.tsbctsbacaollcate.ipType==''||that.tsbacaollcate.ipType==undefined||that.tsbacaollcate.ipType==NaN){
                        this.$message({
                            message:that.$t('FalseHints.TemplatePleaseReconfigure'),
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.lookoverstatus.wifi2G=='1'){
                        if(that.tsbacaollcate.wifi2Enable=='0'||that.tsbacaollcate.wifi2Enable=='1'){

                        }else if(that.tsbacaollcate.wifi2Enable==''||that.tsbacaollcate.wifi2Enable==undefined||that.tsbacaollcate.wifi2Enable==NaN){
                            this.$message({
                                message: that.$t('FalseHints.TemplatePleaseReconfigure'),
                                type: 'error',
                                showClose: true,
                            }); 
                            return;
                        }
                    }
                    if(that.lookoverstatus.wifi5G=='1'){
                        if(that.tsbacaollcate.wifi5Enable=="0"||that.tsbacaollcate.wifi5Enable=='1'){

                        }else if(that.tsbacaollcate.wifi5Enable==''||that.tsbacaollcate.wifi5Enable==undefined||that.tsbacaollcate.wifi5Enable==NaN){
                            this.$message({
                                message: that.$t('FalseHints.TemplatePleaseReconfigure'),
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
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbgcollcate.wanIP)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbgcollcate.wanSubnetmask)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbgcollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbgcollcate.wanGateway)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbgcollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbgcollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbgcollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(!IP.test(that.tsbgcollcate.lanIp)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!exp.test(that.tsbgcollcate.lanSubnetmask)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.lanStartAddress==''){
                            this.$message({
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbgcollcate.lanEndAddress==''){
                            this.$message({
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!IP.test(that.tsbgcollcate.lanGateway)){
                            that.$message({
                                message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(!DNSS.test(that.tsbgcollcate.lanDNS1)||!DNSS.test(that.tsbgcollcate.lanDNS2)){
                            this.$message({
                                message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.lookoverstatus.wifi2G=='1'){
                            if(this.tsbccollcate.wifi2Enable=='1'){
                                if(that.tsbccollcate.wifi2WorkMode=='AP'){
                                    if(that.tsbccollcate.wifi2ApBandwidth==''||that.tsbccollcate.wifi2ApChannel==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2ApSSID==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2ApEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi2ApKeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi2ApKeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi2ApKeyAuth)){
                                            this.$message({
                                                message: that.$t('FalseHints.TheChineseCharacters'),
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
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi2StaEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi2StaKeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi2StaKeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi2StaKeyAuth)){
                                            this.$message({
                                                message: that.$t('FalseHints.TheChineseCharacters'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                    }
                                } 
                            }
                        }
                        if(that.lookoverstatus.wifi5G=='1'){
                            if(this.tsbccollcate.wifi5Enable=='1'){
                                if(that.tsbccollcate.wifi5WorkMode=='AP'){
                                    if(that.tsbccollcate.wifi5ApBandwidth==''||that.tsbccollcate.wifi5ApChannel==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApSSID==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5ApEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi5ApKeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi5ApKeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi5ApKeyAuth)){
                                            this.$message({
                                                message: that.$t('FalseHints.TheChineseCharacters'),
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
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbccollcate.wifi5StaEncryptionMode=='0'){}else{
                                        if(that.tsbccollcate.wifi5StaKeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbccollcate.wifi5StaKeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbccollcate.wifi5StaKeyAuth)){
                                            this.$message({
                                                message:that.$t('FalseHints.TheChineseCharacters'),
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
                                    message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.tsbctsbacaollcate.ipType=='STATIC'){
                            if(!IP.test(that.tsbctsbacaollcate.wanIP)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!exp.test(that.tsbctsbacaollcate.wanSubnetmask)){
                                that.$message({
                                    message: that.$t('FalseHints.PleaseEnterTheCorrectSubnetMask'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanGateway==''){}else{
                                if(!IP.test(that.tsbctsbacaollcate.wanGateway)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectGatewayAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
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
                                    message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS1==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS1)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                            if(that.tsbctsbacaollcate.wanPPPoEDNS2==''){}else{
                                if(!DNSS.test(that.tsbctsbacaollcate.wanPPPoEDNS2)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectDNSAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.lookoverstatus.wifi2G=='1'){
                            if(this.tsbacaollcate.wifi2Enable=='1'){
                                if(that.tsbacaollcate.wifi2SSID==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.wifi2EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.wifi2KeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.WhenNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.wifi2KeyAuth.length<8){
                                        this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.wifi2KeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                        if(that.lookoverstatus.wifi5G=='1'){
                            if(this.tsbacaollcate.wifi5Enable=='1'){
                                if(that.tsbacaollcate.wifi5SSID==''){
                                    this.$message({
                                        message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }   
                                if(that.tsbacaollcate.wifi5EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.wifi5KeyAuth==''){
                                        this.$message({
                                            message: that.$t('FalseHints.WhenNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.wifi5KeyAuth.length<8){
                                        this.$message({
                                            message: that.$t('FalseHints.AuthenticationSecretBits'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.wifi5KeyAuth)){
                                        this.$message({
                                            message: that.$t('FalseHints.TheChineseCharacters'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                }
                            }  
                        }
                        if(that.lookoverstatus.doubleWifi=='1'){
                            if(that.lookoverstatus.wifi2G=='1'){
                                if(this.tsbacaollcate.wifi2Enable=='1'){
                                    if(that.tsbacaollcate.doubleWifi2SSID==''||that.tsbacaollcate.doubleWifi2EncryptionMode==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi2EncryptionMode=='0'){}else{
                                        if(that.tsbacaollcate.doubleWifi2KeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.WhenNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbacaollcate.doubleWifi2KeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbacaollcate.doubleWifi2KeyAuth)){
                                            this.$message({
                                                message: that.$t('FalseHints.TheChineseCharacters'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                    }
                                }
                            }
                            if(that.lookoverstatus.wifi5G=='1'){
                                if(this.tsbacaollcate.wifi5Enable=='1'){
                                    if(that.tsbacaollcate.doubleWifi5SSID==''||that.tsbacaollcate.doubleWifi5EncryptionMode==''){
                                        this.$message({
                                            message: that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi5EncryptionMode=='0'){}else{
                                        if(that.tsbacaollcate.doubleWifi5KeyAuth==''){
                                            this.$message({
                                                message: that.$t('FalseHints.WhenNotBeEmpty'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(that.tsbacaollcate.doubleWifi5KeyAuth.length<8){
                                            this.$message({
                                                message: that.$t('FalseHints.AuthenticationSecretBits'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                        if(result.test(that.tsbacaollcate.doubleWifi5KeyAuth)){
                                            this.$message({
                                                message: that.$t('FalseHints.TheChineseCharacters'),
                                                type: 'error',
                                                showClose: true,
                                            });
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        if(that.lookoverstatus.portal=='1'){
                            if(that.tsbacaollcate.portalEnable=='0'){}else{
                                if(that.tsbacaollcate.portalIP==''||that.tsbacaollcate.portalPortHttp==''||that.tsbacaollcate.portalPortHttps==''){
                                    this.$message({
                                        message:that.$t('FalseHints.RequiredFieldsCanNotBeEmpty'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(!IP.test(that.tsbacaollcate.portalIP)){
                                    that.$message({
                                        message: that.$t('FalseHints.PleaseInputTheCorrectIPAddress'),
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                            }
                        }
                        if(that.tsbctsbacaollcate.ipType=='DHCP'||that.tsbctsbacaollcate.ipType=='STATIC'){

                        }else if(that.tsbctsbacaollcate.ipType==''||that.tsbacaollcate.ipType==undefined||that.tsbacaollcate.ipType==NaN){
                            this.$message({
                                message: that.$t('FalseHints.TemplatePleaseReconfigure'),
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
                        if(that.lookoverstatus.wifi2G=='1'){
                            if(that.tsbacaollcate.wifi2Enable=='0'||that.tsbacaollcate.wifi2Enable=='1'){

                            }else if(that.tsbacaollcate.wifi2Enable==''||that.tsbacaollcate.wifi2Enable==undefined||that.tsbacaollcate.wifi2Enable==NaN){
                                this.$message({
                                    message: that.$t('FalseHints.TemplatePleaseReconfigure'),
                                    type: 'error',
                                    showClose: true,
                                }); 
                                return;
                            }
                        }
                        if(that.lookoverstatus.wifi5G=='1'){
                            if(that.tsbacaollcate.wifi5Enable=="0"||that.tsbacaollcate.wifi5Enable=='1'){

                            }else if(that.tsbacaollcate.wifi5Enable==''||that.tsbacaollcate.wifi5Enable==undefined||that.tsbacaollcate.wifi5Enable==NaN){
                                this.$message({
                                    message: that.$t('FalseHints.TemplatePleaseReconfigure'),
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
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
                    // if(that.sizesdata.length>1){
                    //     that.$message({
                    //         message: 'STATIC模式下只能选择一台设备!',
                    //         type: 'error',
                    //         showClose: true,
                    //     });
                    //     return;
                    // }else{
                        for(var i = 0;i<that.sizesdata.length;i++){
                            equipmentIds.push(that.sizesdata[i].id)
                        }
                        data.equipmentIds = equipmentIds.join(',')
                    // }
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
                $('.savetemplate').attr('disabled',true)
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        $('.savetemplate').attr('disabled',false)
                        if(data.errorCode=='0'){
                            if(that.addrelative=='0'){
                                that.$message({
                                    message: that.$t('templateManage.TemplateAddedSuccessfully'),
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            if(that.addrelative=='1'){
                                that.$message({
                                    message: that.$t('templateManage.TemplateModifiedSuccessfully'),
                                    type: 'success',
                                    showClose: true,
                                });
                            }
                            $('#addmyModal').modal('hide');
                            that.ready();
                        }else{
                            that.errorCode(data)
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
                        keyword:that.keyword,
                        templateType:that.classesvalue,
                        templateOrder:that.classesvaluetwo,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows;
                            that.total = data.total;
                        }else{
                            that.errorCode(data)
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
                            that.errorCode(data)
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
                        message: that.$t('FalseHints.PleaseinputTheCorrectMACAddress'),
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
            if(localStorage.locale=='en'){
                this.classestwo = [{value: '0',label: 'define equipment'},{value: '1',label: 'Specify device grouping'},{value: '2',label: 'Specified device type'}]
            }else{
                this.classestwo = [{value: '0',label: '指定设备'},{value: '1',label: '指定设备分组'},{value: '2',label: '指定设备型号'}]
            }
            this.ready()
        }
    }
</script>
<style scoped>
.required{color: red;}
.templateManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.templateManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.templateManage_nav>i{font-size: 23px;}
.templateManage_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.templateManage_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;display: flex;align-items: center;}
.templateManage_top_div{height: 29px;margin-left: 20px;display: flex}
.templateManage_top_div>span{line-height: 29px;font-size: 16px}

.templateManage_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.templateManage_bottom_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.templateManage_bottom_bottom{position: absolute;width: 100%;height: auto;top:0;bottom: 0;padding: 5px;}
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
/* 批量升级 */
.BatchUpgrades{width: 100%;height:auto;max-height:350px;position: relative;};
.BatchUpgrades>div{width: 100%;}
/* .BatchUpgrades_top{height: 50px;text-align: center;line-height: 50px;} */
/* .BatchUpgrades_bottom{width: 100%;} */
</style>
