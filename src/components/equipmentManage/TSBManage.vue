<template>
  <div class="TSBManage">
      <div class="TSBManage_nav">
          设备管理<i class="iconfont icon-icon"></i>TSB管理
      </div>
      <div class="TSBManage_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="所有" name='1' style="height:100%;">
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>设备名称:</span>
                            <input type="text" v-model="username" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>IP地址:</span>
                            <input type="text" v-model="userIP" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model="value" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="search" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="data"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            prop="nickname"
                            align='center'
                            label="设备名称"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="lanIPX"
                            label="ip地址"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="160">
                            <template scope="scope">
                                <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                    断开
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="sizechange"
                            @current-change="currentchange"
                            :current-page="pagechange"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="sizes"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TSBG" name='2'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>设备名称:</span>
                            <input type="text" v-model="usernameone" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>IP地址:</span>
                            <input type="text" v-model="userIPone" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model="valueone" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="searchone" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                        <el-button type="primary" data-toggle="modal" data-target="#tsbgmyModal" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBG设备分组</el-button>
                    </div>
                    <!-- tsbg模态框（Modal） -->
                    <div class="modal fade" id="tsbgmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="myModalLabel">TSBG设备分组</h4>
                                </div>
                                <div class="modal-body">
                                    动态分组数据
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="button" class="btn btn-primary">保存</button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div>
                    </div><!-- /.modal -->
                    <!-- 设备列表 -->
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbgdata"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            prop="nickname"
                            align='center'
                            label="设备名称"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="lanIPX"
                            label="ip地址"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="120">
                            <template scope="scope">
                                <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                    断开
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="90">
                                <template scope="scope">
                                    <el-button @click="tsbgmanage(scope.row)" type="text" size="small">管理设备</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="tsbgsizechange"
                            @current-change="tsbgcurrentchange"
                            :current-page="tsbgpagechange"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="tsbgsizes"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tsbgtotal">
                            </el-pagination>
                        </div>
                    </div>
                    <!-- tsbgs设备管理模态框 -->
                    <div class="modal fade" id="tsbgManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body" style="padding:0;width:600px;">
                                    <el-tabs type="border-card" style="padding:0;">
                                        <el-tab-pane label="运行状态" style="background:white;">
                                            <div class="basicstatus">
                                                <div class="basicstatus_top">
                                                    基本状态
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>硬件版本:</td>
                                                                <td>TSBA721</td>
                                                                <td>Bootrom版本</td>
                                                                <td>v1.1.1.0 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>软件版本:</td>
                                                                <td>V1.3.0b</td>
                                                                <td>链路数量:</td>
                                                                <td>1</td>
                                                            </tr>
                                                            <tr>
                                                                <td>运行时间:</td>
                                                                <td style="width: 75%;">2天20小时48分54秒06 </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="basicstatus">
                                                <div class="basicstatus_top">
                                                    wan网口
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>连接方式:</td>
                                                                <td>static</td>
                                                                <td>链路状态</td>
                                                                <td>up</td>
                                                            </tr>
                                                            <tr>
                                                                <td>MAC地址:</td>
                                                                <td>a4:fb:8d:02:0e:f4</td>
                                                                <td>IP地址</td>
                                                                <td>192.168.70.211 </td>
                                                            </tr>
                                                            <tr>
                                                                <td>子网掩码:</td>
                                                                <td>255.255.255.0</td>
                                                                <td>网关地址</td>
                                                                <td>192.168.70.1</td>
                                                            </tr>
                                                            <tr>
                                                                <td>主DNS服务器:</td>
                                                                <td>114.114.114.114 </td>
                                                                <td>辅DNS服务器</td>
                                                                <td>8.8.8.8</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="basicstatus">
                                                <div class="basicstatus_top">
                                                    WIFI接口状态(2,4G)
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>工作模式:</td>
                                                                <td>ap</td>
                                                                <td>ESSID</td>
                                                                <td>lpf_2g</td>
                                                            </tr>
                                                            <tr>
                                                                <td>功 率:</td>
                                                                <td>23</td>
                                                                <td>MAC</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>信 道:</td>
                                                                <td>1</td>
                                                                <td>流量统计:</td>
                                                                <td>/</td>
                                                            </tr>
                                                            <tr>
                                                                <td>频段带宽:</td>
                                                                <td>ht20</td>
                                                                <!-- <td>链路状态</td>
                                                                <td>up</td> -->
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    WIFI接口状态(5G)
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>工作模式:</td>
                                                                <td>ap</td>
                                                                <td>ESSID</td>
                                                                <td>lpf_5g</td>
                                                            </tr>
                                                            <tr>
                                                                <td>功 率:</td>
                                                                <td>23</td>
                                                                <td>MAC</td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>信 道:</td>
                                                                <td>161</td>
                                                                <td>流量统计:</td>
                                                                <td>/</td>
                                                            </tr>
                                                            <tr>
                                                                <td>频段带宽:</td>
                                                                <td>ht20</td>
                                                                <!-- <td>链路状态</td>
                                                                <td>up</td> -->
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="设备信息" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    设备信息
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>昵称:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                                <td>MAC:</td>
                                                                <td><input type="text" class="inputType"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>位置:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入位置" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                                <td>所属域:</td>
                                                                <td><input type="text" class="inputType"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>设备类型:</td>
                                                                <td>
                                                                    <select name="" id="">
                                                                        <option value="0">tsbc</option>
                                                                        <option value="1">tsba</option>
                                                                    </select>
                                                                </td>
                                                                <td>用户管理员:</td>
                                                                <td><input type="text" class="inputType"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>备注:</td>
                                                                <td style="width:75%;height:80px;"><textarea class="inputType" name="" id="" cols="30" rows="10"></textarea></td>
                                                                <!-- <td>链路状态</td>
                                                                <td>up</td> -->
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <el-button type="primary">保存</el-button>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="WIFI设置(2,4G)" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    基本信息
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>SSID:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                                <td>认证密码:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>信道设置:</td>
                                                                <td><el-input-number size='small' style="width:124px;" :min="1" :max="10"></el-input-number></td>
                                                                <td>频段带宽:</td>
                                                                <td><el-select v-model="value" size='small' placeholder="请选择">
                                                                    <el-option
                                                                        v-for="item in tsbgoptions"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>允许终端最大个数:</td>
                                                                <td>
                                                                   <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                                </td>
                                                                <td>最低的RSSI:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>功率设定:</td>
                                                                <td><el-input-number size='small' style="width:124px;" :min="1" :max="10"></el-input-number></td>
                                                                <td>加密方式</td>
                                                                <td>
                                                                    <el-select size='small' v-model="value" placeholder="请选择">
                                                                        <el-option
                                                                        v-for="item in tsbgoptionstwo"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <el-button type="primary">保存</el-button>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="WIFI设置(5G)" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    基本信息
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>SSID:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                                <td>认证密码:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>信道设置:</td>
                                                                <td><el-input-number size='small' style="width:124px;" :min="1" :max="10"></el-input-number></td>
                                                                <td>频段带宽:</td>
                                                                <td><el-select v-model="value" size='small' placeholder="请选择">
                                                                    <el-option
                                                                        v-for="item in tsbgoptions"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>允许终端最大个数:</td>
                                                                <td>
                                                                   <input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                                </td>
                                                                <td>最低的RSSI:</td>
                                                                <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>功率设定:</td>
                                                                <td><el-input-number size='small' style="width:124px;" :min="1" :max="10"></el-input-number></td>
                                                                <td>加密方式</td>
                                                                <td>
                                                                    <el-select size='small' v-model="value" placeholder="请选择">
                                                                        <el-option
                                                                        v-for="item in tsbgoptionstwo"
                                                                        :key="item.value"
                                                                        :label="item.label"
                                                                        :value="item.value">
                                                                        </el-option>
                                                                    </el-select>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <el-button type="primary">保存</el-button>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="黑白名单设置" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    基本信息
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <div class="tsbgchecked">
                                                        <el-checkbox v-model="checked" @change='tsbgchecked' style="color: #555555;">启用黑白名单限制</el-checkbox>
                                                    </div>
                                                    <div class="tsbgradio">
                                                        <el-radio-group v-model="radio" @change='tsbgradio'>
                                                            <el-radio :label="1" style="color: #555555;">仅允许MAC地址列表中的MAC访问网络（白名单）</el-radio>
                                                            <el-radio :label="2" style="margin-left:0;color: #555555;">仅禁止MAC地址列表中的MAC访问网络（黑名单）</el-radio>
                                                        </el-radio-group>
                                                    </div>
                                                    <el-button type="primary">保存</el-button>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="软件升级" style="background:white;">软件升级</el-tab-pane>
                                        <el-tab-pane label="存为模板" style="background:white;">存为模板</el-tab-pane>
                                        <el-tab-pane label="设备重启" style="background:white;">设备重启</el-tab-pane>
                                    </el-tabs> 
                                </div>
                            </div><!-- /.modal-content -->
                        </div>
                    </div><!-- /.modal -->
                </el-tab-pane>
                <el-tab-pane label="TSBC" name='3'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>设备名称:</span>
                            <input type="text" v-model="usernametwo" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>IP地址:</span>
                            <input type="text" v-model="userIPtwo" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model="valuetwo" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="searchtwo" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbcdata"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            prop="nickname"
                            align='center'
                            label="设备名称"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="lanIPX"
                            label="ip地址"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="120">
                            <template scope="scope">
                                <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                    断开
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            label="分组"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="90">
                                <template scope="scope">
                                    <el-button @click="tsbgmanage(scope.row)" type="text" size="small">管理设备</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="tsbcsizechange"
                            @current-change="tsbccurrentchange"
                            :current-page="tsbcpagechange"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="tsbcsizes"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tsbctotal">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TSBA" name='4'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>设备名称:</span>
                            <input type="text" v-model="usernamethree" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>IP地址:</span>
                            <input type="text" v-model="userIPthree" maxlength="10" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入用户名">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model="valuethree" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="searchthree" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbadata"
                            border
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            prop="nickname"
                            align='center'
                            label="设备名称"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="lanIPX"
                            label="ip地址"
                            align='center'
                            width="180">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="120">
                            <template scope="scope">
                                <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                    断开
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="90">
                                <template scope="scope">
                                    <el-button @click="tsbgmanage(scope.row)" type="text" size="small">管理设备</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination
                            @size-change="tsbasizechange"
                            @current-change="tsbacurrentchange"
                            :current-page="tsbapagechange"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="tsbasizes"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tsbatotal">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
      </div>
  </div>
</template>
<script>
    export default{
        name: 'index',
        data () {
            return {
                serverurl:localStorage.serverurl,       
                activeName:'1',
                data:[],
                pagechange:1,
                sizes:10,
                total:100,
                pageSize:10,
                pageIndex:1,
                username:'',
                userIP:'',
                value:'',

                tsbgdata:[],
                tsbgpagechange:1,
                tsbgsizes:10,
                tsbgtotal:100,
                tsbgpageSize:10,
                tsbgpageIndex:1,
                usernameone:'',
                userIPone:'',
                valueone:'',
                optionsone:[{value:'0',label:'离线'},{value:'1',label:'在线'}],
                tsbgoptions:[{value:'0',label:'ht20'},{value:'1',label:'ht40'}],
                tsbgoptionstwo:[{value:'0',label:'NONE'},{value:'1',label:'WPA/WPA2'}],
                checked:false,
                radio:'2',

                tsbcdata:[],
                tsbcpagechange:1,
                tsbcsizes:10,
                tsbctotal:100,
                tsbcpageSize:10,
                tsbcpageIndex:1,
                usernametwo:'',
                userIPtwo:'',
                valuetwo:'',
                optionstwo:[{value:'0',label:'离线'},{value:'1',label:'在线'}],

                tsbadata:[],
                tsbapagechange:1,
                tsbasizes:10,
                tsbatotal:100,
                tsbapageSize:10,
                tsbapageIndex:1,
                usernamethree:'',
                userIPthree:'',
                valuethree:'',
                optionsthree:[{value:'0',label:'离线'},{value:'1',label:'在线'}],
            }
        },
        methods:{
            handleChange(value, direction, movedKeys){
                console.log(value, direction, movedKeys)
            },
            //所有条数事件
            sizechange(val){
                this.pageSize = val
                this.ready()
            },
            //所有页数事件
            currentchange(val){
                this.pageIndex = val
                this.ready()
            },
            //所有页面数据渲染
            ready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'Equipment/getAllEquipmentList',
                    data:{
                        pageIndex:that.tsbgpageIndex,
                        pageSize:that.tsbgpageSize,
                        MAC:that.username,
                        lanIPX:that.userIP,
                        online:that.value
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.data=data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //所有页面数据搜索
            search(){
                this.ready()
            },
            /********tsbg设备**********/ 
            //tsbg条数事件
            tsbgsizechange(val){
                this.tsbgpageSize = val
                this.tsbgready()
            },
            //tsbg页数事件
            tsbgcurrentchange(val){
                this.tsbgpageIndex = val
                this.tsbgready()
            },
            //tsbg页面数据渲染
            tsbgready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'Equipment/getTsbgList',
                    data:{
                        pageIndex:that.tsbgpageIndex,
                        pageSize:that.tsbgpageSize,
                        MAC:that.usernameone,
                        lanIPX:that.userIPone,
                        online:that.valueone
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tsbgdata=data.rows
                            that.tsbgtotal = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //tsbg搜索
            searchone(){
                this.tsbgready()
            },
            //tsbg管理设备点击事件
            tsbgmanage(value){
                console.log(value)
                $('#tsbgManageModal').modal('show');
            },
            //黑白名单多选按钮事件 
            tsbgchecked(e){
                if(e.target.checked==true){
                    console.log(11111)
                    this.radio = 1 
                }else{
                    this.radio = ''                
                }
            },
            //黑白名单单选按钮变化事件
            tsbgradio(val){
                if(val!=''){
                    this.checked = true
                }
            },

            //tsbc条数事件
            tsbcsizechange(val){
                this.tsbcpageSize = val
                this.tsbcready()
            },
            //tsbc页数事件
            tsbccurrentchange(val){
                this.tsbcpageIndex = val
                this.tsbcready()
            },
            //tsbc页面数据渲染
            tsbcready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'Equipment/getTsbcList',
                    data:{
                        pageIndex:that.tsbgpageIndex,
                        pageSize:that.tsbgpageSize,
                        MAC:that.usernametwo,
                        lanIPX:that.userIPtwo,
                        online:that.valuetwo
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tsbcdata=data.rows
                            that.tsbctotal = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //tsbc搜索
            searchtwo(){
                this.tsbcready()
            },

            //tsba条数事件
            tsbasizechange(val){
                this.tsbapageSize = val
                this.tsbaready()
            },
            //tsba页数事件
            tsbacurrentchange(val){
                this.tsbapageIndex = val
                this.tsbaready()
            },
            //tsba页面数据渲染
            tsbaready(){
                var that = this
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'Equipment/getTsbaList',
                    data:{
                        pageIndex:that.tsbgpageIndex,
                        pageSize:that.tsbgpageSize,
                        MAC:that.usernamethree,
                        lanIPX:that.userIPthree,
                        online:that.valuethree
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tsbadata=data.rows
                            that.tsbatotal = data.total
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //tsbg搜索
            searchthree(){
                this.tsbaready()
            },

            //判断标签页change事件
            handleClick(tab){
                var that = this
                if(tab.name=='1'){
                    this.ready()
                }
                if(tab.name=='2'){
                    this.tsbgready()
                }
                if(tab.name=='3'){
                    this.tsbcready()
                }
                if(tab.name=='4'){
                    this.tsbaready()
                }
            }
        },
        created(){
            this.ready();
        }
    }
</script>
<style scoped>
.TSBManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.TSBManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.TSBManage_nav>i{font-size: 23px;}
.TSBManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.TSBManage_main_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.TSBManage_main_bottom{width: 100%;height:auto;position: absolute;top:39px;bottom:10px;}
.TSBManage_main_top>div{display: flex;margin-top: 4px;}
.TSBManage_main_top>div>span{width: 30%;line-height: 30px;}
.TSBManage_main_top>div>input{height: 30px;width: 130px;}
.TSBManage_main_top>div>div{height: 30px;width: 140px;}
.basicstatus{padding: 0px 20px 0px 20px;}
.basicstatus:nth-of-type(1){padding-top:15px;}
.basicstatus_top{text-align: left;font-size: 15px;font-weight: bold;}
.basicstatus_center{width: 100%;background: #C1D9F3;height: 2px;margin-top: 8px;margin-bottom: 5px;}
.basicstatus_bottom{margin-bottom: 10px;}
.basicstatus_bottom>table{width:100%;}
.basicstatus_bottom>table tr{display: flex;}
.basicstatus_bottom>table tr>td{width: 25%;text-align: center;line-height: 25px !important;}
.inputType{width: 100%;height: 100%;}
.tsbgchecked{text-align: left;padding-left: 20px;}
.tsbgradio{text-align: left;padding-left: 40px;}
</style>

