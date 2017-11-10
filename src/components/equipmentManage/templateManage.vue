<template>
    <div class="templateManage">
        <div class="templateManage_nav">
            设备管理<i class="iconfont icon-icon"></i>模板管理
        </div>
        <div class="templateManage_main">
            <div class="templateManage_top">
                <el-button @click="addtemplate" type="primary" icon="plus " size="small">添加模板</el-button>
                <el-button type="primary" icon="edit" size="small">修改模板</el-button>
                <el-button type="primary" icon="delete" size="small">删除模板</el-button>
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
                                <div>
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
                                <div style="margin-left:10px;margin-top:15px;">
                                    <span>类别:</span>
                                    <el-radio-group @change="typestatus" v-model="radio2">
                                        <el-radio :label="0">tsbg</el-radio>
                                        <el-radio :label="1">tsbc</el-radio>
                                        <el-radio :label="2">tsba</el-radio>
                                    </el-radio-group>
                                </div>
                                <div>
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
                                    <span>模板名称:</span>
                                    <input type="text" class="inputType" style="width:146px;" placeholder="请输入模板名称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>备注:</span>
                                    <input type="text" class="inputType" style="width:256px;" placeholder="请输入模板名称" min="1" max="100" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                </div>
                            </div>
                            <div class="template_center" v-if="showtype=='1'">
                                <el-collapse v-model="activeNames" style="margin-top:10px;" accordion>
                                    <el-collapse-item v-if="radio2==0&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>配置IP:</td>
                                                        <td>
                                                            <select name="" id="" style="width:121px;height:30px;">
                                                                <option value="">静态IP</option>
                                                                <option value="">DHCP</option>
                                                                <option value="">PPPOE</option>
                                                            </select>
                                                        </td>
                                                        <td>IP地址:</td>
                                                        <td><input type="text" placeholder="请输入IP地址" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>子网掩码:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>网关:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>主DNS:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入主DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>辅DNS:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入辅DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==0&&lookoverstatus.LAN!=''" title="LAN配置" name="3" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>IP地址:</td>
                                                        <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>子网掩码:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="basicstatus_top">
                                                DHCP服务
                                            </div>
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>起始地址:</td>
                                                        <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>结束地址:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入结束地址" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>网关地址:</td>
                                                        <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>DNS1:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入主DNS服务器" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>DNS2:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入辅DNS服务器" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>DHCP服务器:</td>
                                                        <td><el-checkbox>启用</el-checkbox></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==0" title="终端配置" name="4" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>UE地址池:</td>
                                                        <td colspan="3">
                                                            <input type="text" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">~~
                                                            <input type="text" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>虚拟接口:</td>
                                                        <td>
                                                            <select name="" id="" style="width:108px;height:30px;">
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
                                                        <td>IP地址:</td>
                                                        <td>
                                                                <input type="text" class="inputType" placeholder="请输入IP地址" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>子网掩码:</td>
                                                        <td>
                                                            <input type="text" class="inputType" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <!-- <td>SNMP密码:</td>
                                                        <td><input type="text" class="inputType"></td> -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==1&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="5" style="text-align:left;">
                                        <!-- tsbc WIFI设置(2G) -->
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>工作模式:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" disabled name="" id="">
                                                                <option value="1">AP模式</option>
                                                                <option value="2">Station模式</option>
                                                            </select>
                                                        </td>
                                                        <td>优先级(SSID):</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">kuaiyue-2g</option>
                                                                <option value="2">kuaiyue-1</option>
                                                                <option value="3">ky-33</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>认证秘钥:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入认证秘钥" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>连接状态:</td>
                                                        <td>已连接</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==1&&lookoverstatus.wifi5G!=''" title="5G配置" name="6" style="text-align:left;">
                                        <!-- tsbc WIFI设置(5G)-->
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>工作模式:</td>
                                                        <td>
                                                            <select disabled style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">AP模式</option>
                                                                <option value="2">STA模式</option>
                                                            </select>
                                                        </td>
                                                        <td>信息带宽:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">HT20</option>
                                                                <option value="2">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>信道:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">149</option>
                                                                <option value="2">153</option>
                                                                <option value="3">157</option>
                                                                <option value="4">161</option>
                                                                <option value="5">165</option>
                                                            </select>
                                                        </td>
                                                        <td>发射功率:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">Auto</option>
                                                                <option value="2">27 dBm</option>
                                                                <option value="3">24 dBm</option>
                                                                <option value="4">20 dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>加密方式:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">NONE</option>
                                                                <option value="2">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥:</td>
                                                        <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>    
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==1||radio2==2&&lookoverlan==true" title="网络设置" name="7" style="text-align:left;">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>配置ip:</td>
                                                    <td>
                                                        <select style="width:110px;height:29px;" name="" id="">
                                                            <option value="1">使用静态IP</option>
                                                            <option value="2">使用DHCP</option>
                                                        </select>
                                                    </td>
                                                    <td>ip地址</td>
                                                    <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                </tr>
                                                <tr>
                                                    <td>首选DNS:</td>
                                                    <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    <td>备选DNS:</td>
                                                    <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                </tr>
                                                <tr>
                                                    <td>子网掩码:</td>
                                                    <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    <td>网关:</td>
                                                    <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==2&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            RADIO 2G
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>信息带宽:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">HT20</option>
                                                                <option value="2">HT40</option>
                                                            </select>
                                                        </td>
                                                        <td>信道</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
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
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>发射功率:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">Auto</option>
                                                                <option value="2">27 dBm</option>
                                                                <option value="1">24 dBm</option>
                                                                <option value="2">20 dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="basicstatus_top">
                                            RADIO 5G
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>信息带宽:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">HT20</option>
                                                                <option value="2">HT40</option>
                                                            </select>
                                                        </td>
                                                        <td>信道</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
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
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>发射功率:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">Auto</option>
                                                                <option value="2">27 dBm</option>
                                                                <option value="1">24 dBm</option>
                                                                <option value="2">20 dBm</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="radio2==2&&lookoverstatus.wifi5G!=''" title="5G配置" name="9" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            RADIO 2G
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>名称/ssid:</td>
                                                        <td>
                                                            <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td>是否启用</td>
                                                        <td>
                                                            <el-checkbox>启用无线网络</el-checkbox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>加密方式:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">NONE</option>
                                                                <option value="2">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥</td>
                                                        <td>
                                                            <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="basicstatus_top">
                                            RADIO 5G
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td>名称/ssid:</td>
                                                        <td>
                                                            <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                        <td>是否启用</td>
                                                        <td>
                                                            <el-checkbox>启用无线网络</el-checkbox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>加密方式:</td>
                                                        <td>
                                                            <select style="width:110px;height:29px;" name="" id="">
                                                                <option value="1">NONE</option>
                                                                <option value="2">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                        <td>认证秘钥</td>
                                                        <td>
                                                            <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                                        width="100">
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
                            <button type="button" v-if="showtype=='2'" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <div class="templateManage_bottom">
                <div class="templateManage_bottom_top">
                    <div class="templateManage_formtwo">
                        <span>用户名:</span>
                        <input type="text" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="templateManage_formtwo">
                        <span>用户名:</span>
                        <input type="text" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <div class="templateManage_formtwo">
                        <span>用户名:</span>
                        <input type="text" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                    </div>
                    <el-button type="primary" icon="search" style="height:30px;margin-top:5px;" size='small'>搜索</el-button>
                </div>
                <div class="templateManage_bottom_bottom">
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        border
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        align='center'
                        label="用户名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="fullName"
                        label="姓名"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="departmentName"
                        label="分组"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="mobile"
                        label="电话"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮箱"
                        align='center'
                        show-overflow-tooltip>
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
                serverurl:localStorage.serverurl,
                tableData3:[],
                Pagesize:10,
                PageIndex:1,
                total:20,
                showtype:'1',
                options:[],
                value:'',
                optionstwo:[],
                valuetwo:'',
                radio2:0,
                lookoverstatus:{},
                lookoverlan:true,
                activeNames:'1',

                //弹框列列表参数
                tableData4:[],
                PageIndextwo:1,
                Pagesizetwo:10,
                totaltwo:20,
                valuethree:0,
            }
        },
        methods:{
            //点击添加模板按钮
            addtemplate(){
                var that = this;
                that.radio2 = 0;
                $('.myModalLabel').text('添加模板')
                $('#addmyModal').modal('show');
                if(sessionStorage.departmentId=='1'){
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
                        if(data.errorCode=='0'){
                            var type = {};
                            for(var i=0;i<data.result.length;i++){
                                type = {}
                                type.label = data.result[i].modelName
                                type.value = data.result[i].modelName
                                that.optionstwo.push(type)
                            }
                            console.log(that.optionstwo)
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
                var that = this;
                that.showtype = '2'
            },
            //列表选中行数据
            handleSelectionChange(val){},
            //选择条数事件
            handleSizeChange(val) {
                this.Pagesize = val
            },
            //选择页数事件
            handleCurrentChange(val) {
                this.PageIndex = val
            },
            //页面数据渲染
            ready(){},
            //指定设备change事件
            uploadscope(val){
                var that = this
                var url = ''
                that.PageIndextwo = 1
                that.Pagesizetwo = 10
                //指定设备接口
                if(that.valuethree==0){url='equipment/getAllEquipmentList'}
                //分组接口
                if(that.valuethree==1){url='Equipment/getDeviceGroup'}
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+url,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.PageIndextwo,
                        pageSize:that.Pagesizetwo
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.totalTwo = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //弹框列表选择数据
            handleSelectionChangetwo(val){},
            //弹框列表选择条数事件
            handleSizeChangetwo(val){
                that.Pagesizetwo = val
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+'equipment/getAllEquipmentList',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.PageIndextwo,
                        pageSize:that.Pagesizetwo
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.totalTwo = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //弹框列表选择页数事件
            handleCurrentChangetwo(val){
                that.PageIndextwo = val
                $.ajax({
                    type:'post',
                    async:true,
                    url:that.serverurl+'equipment/getAllEquipmentList',
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    data:{
                        pageIndex:that.PageIndextwo,
                        pageSize:that.Pagesizetwo
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData4 = data.rows
                            that.totalTwo = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
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
</style>
