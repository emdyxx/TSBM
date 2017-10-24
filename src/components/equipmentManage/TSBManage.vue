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
                            width="180">
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
                            width="180">
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
                    <!-- tsbg设备管理模态框 -->
                    <div class="modal fade" id="tsbgManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-body" style="padding:0;width:600px;">
                                <el-tabs type="border-card" style="padding:0;">
                                    <el-tab-pane label="常规信息" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
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
                                                            <td>软件版本</td>
                                                            <td>v1.1.1.0 </td>
                                                        </tr>
                                                        <tr>
                                                            <td>运行时间:</td>
                                                            <td style="width: 75%;">2天20小时48分54秒06 </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="basicstatus_top">
                                                WAN口	
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>链接方式:</td>
                                                            <td>TSBA721</td>
                                                            <td>链接状态:</td>
                                                            <td>已连接</td>
                                                        </tr>
                                                        <tr>
                                                            <td>MAC地址:</td>
                                                            <td>00:91:27:e0:11:78</td>
                                                            <td>IP地址:</td>
                                                            <td>192.168.70.182</td>
                                                        </tr>
                                                        <tr>
                                                            <td>子网掩码:</td>
                                                            <td>255.255.255.0</td>
                                                            <td>网关:</td>
                                                            <td>192.168.70.1</td>
                                                        </tr>
                                                        <tr>
                                                            <td>主DNS:</td>
                                                            <td>0.0.0.0</td>
                                                            <td>辅DNS</td>
                                                            <td>0.0.0.0</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="basicstatus_top">
                                                LAN口
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>IP地址:</td>
                                                            <td>192.168.30.1</td>
                                                            <td>子网掩码</td>
                                                            <td>255.255.255.0 </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="basicstatus_top">
                                                虚拟网络状态
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>网络1:</td>
                                                            <td style="width:75%;">192.168.20.1/255.255.255.0</td>
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
                                                            <td>ip:</td>
                                                            <td><input type="text" class="inputType"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>位置:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入位置" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            <td>设备类型:</td>
                                                            <td>
                                                                <select name="" id="">
                                                                    <option value="0">tsbc</option>
                                                                    <option value="1">tsba</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>SNMP用户名:</td>
                                                            <td><input type="text" class="inputType"></td>
                                                            <td>SNMP密码:</td>
                                                            <td><input type="text" class="inputType"></td>
                                                        </tr>
                                                        <tr style="height:49px;">
                                                            <td>用户管理员:</td>
                                                            <td><input type="text" class="inputType"></td>
                                                            <td>备注:</td>
                                                            <td><textarea class="inputType" name="" id="" cols="30" rows="10"></textarea></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <el-button type="primary">保存</el-button>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="网络设置" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                网口设置
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <el-radio-group v-model="radio2" @change="tsbgchange">
                                                    <el-radio :label="0">WAN设置</el-radio>
                                                    <el-radio :label="1">LAN设置</el-radio>
                                                </el-radio-group>
                                            </div>
                                            <div class="basicstatus_bottom" v-if="radio2===0">
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>连接方式:</td>
                                                            <td>
                                                                <select name="" id="" style="width:121px;height:30px;">
                                                                    <option value="">静态地址</option>
                                                                    <option value="">动态地址</option>
                                                                    <option value="">PPPOE</option>
                                                                </select>
                                                            </td>
                                                            <td>IP地址:</td>
                                                            <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>子网掩码:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入子网掩码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            <td>缺省网关:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入缺省网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>主DNS服务器:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入缺省网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            <td>辅DNS服务器:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入缺省网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <el-button type="primary">保存</el-button>
                                            </div>
                                            <div class="basicstatus_bottom" v-if="radio2===1">
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
                                                <el-button type="primary">保存</el-button>
                                                <div class="basicstatus_top">
                                                    DHCP服务
                                                </div>
                                                <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>DHCP服务器:</td>
                                                            <td><el-checkbox v-model="DHCPchecked">启用</el-checkbox></td>
                                                            <td>起始地址:</td>
                                                            <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>结束地址:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入结束地址" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            <td>网关地址:</td>
                                                            <td><input type="text" class="inputType" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                        <tr>
                                                             <td>主DNS服务器:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入主DNS服务器" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                            <td>辅DNS服务器:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入辅DNS服务器" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <el-button type="primary">保存</el-button>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="固件管理" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:5px">
                                            <div class="basicstatus_top">
                                                网口设置
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <p style="text-align:left;">&#x3000&#x3000TSBG支持配置TSBC的自动升级，TSBG的固件自动升级开关配置为打开"√",TSBC的自动升级开关打开时，会触发版本校验，满足条件后后台下载镜像文件并升级。</p>
                                            </div>
                                            <el-table
                                                ref="multipleTable"
                                                :data="tsbguploaddata"
                                                border
                                                stripe
                                                tooltip-effect="dark"
                                                style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                                <el-table-column
                                                prop="nickname"
                                                align='center'
                                                label="硬件版本"
                                                width="140">
                                                </el-table-column>
                                                <el-table-column
                                                prop="MAC"
                                                align='center'
                                                label="软件版本"
                                                width="140">
                                                </el-table-column>
                                                <el-table-column
                                                prop="lanIPX"
                                                label="固件名称"
                                                align='center'
                                                width="160">
                                                </el-table-column>
                                                <el-table-column
                                                label="自动升级">
                                                    <template scope="scope">
                                                        <el-checkbox @change="tsbgupgrad(scope.row)" size="small" v-model="checked"></el-checkbox>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                            <span>是否允许TSBC自动升级: </span>
                                            <el-radio-group v-model="radio3">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="0">否</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="模板管理" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                模板管理
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <p>&#x3000&#x3000TSBG支持终端设备的模板配置功能，模板配置生效时，终端设备会根据自身类型应用所配置的模板。</p>
                                                <el-table
                                                    ref="multipleTable"
                                                    :data="tsbguploaddata"
                                                    border
                                                    stripe
                                                    tooltip-effect="dark"
                                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                                    <el-table-column
                                                    prop="nickname"
                                                    align='center'
                                                    label="硬件版本"
                                                    width="140">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="MAC"
                                                    align='center'
                                                    label="模板名称"
                                                    width="140">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="lanIPX"
                                                    label="模板时间"
                                                    align='center'
                                                    width="160">
                                                    </el-table-column>
                                                    <el-table-column
                                                    label="应用模板">
                                                        <template scope="scope">
                                                            <el-checkbox @change="tsbgtemplate(scope.row)" size="small" v-model="templatechecked"></el-checkbox>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                    label="操作">
                                                        <template scope="scope">
                                                            <el-button @click="tsbgoperate(scope.row)" type="info">删除</el-button>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="软件升级" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                软件升级
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <div class="upgrade">
                                                    当前版本:V1.0052
                                                </div>
                                                <div class="upgrade">
                                                    选择固件:<el-select v-model="value" clearable size='small' placeholder="请选择">
                                                        <el-option
                                                        v-for="item in upgradeoptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div>
                                                    <el-button type="primary">升级</el-button>
                                                    <el-button type="success">刷新</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="设备重启" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                重新启动
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                <p>&#x3000&#x3000“可按下下面按钮 强制设备重新启动</p>
                                            </div>
                                            <el-button type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                            <div class="basicstatus_top">
                                                重置
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                <p>&#x3000&#x3000“可按下下面按钮 重置设备</p>
                                            </div>
                                            <el-button type="primary" style="margin:10px 0 15px 0;">重置</el-button>
                                            <div class="basicstatus_center"></div>
                                            <p style="text-align:left;">注意：在设备重启期间，请不要将设备断电</p>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="终端配置" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                重新启动
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                               <table class="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>UE地址池:</td>
                                                            <td style="width:75%;">
                                                                <input type="text" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">~~
                                                                <input type="text" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>虚拟接口:</td>
                                                            <td>
                                                                <select name="" id="" style="width:121px;height:30px;">
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
                                                <el-button type="primary" style="margin-bottom:10px;">保存</el-button>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs> 
                            </div>
                        </div>
                    </div>
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
                            width="180">
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
                                    <el-button @click="tsbcmanage(scope.row)" type="text" size="small">管理设备</el-button>
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
                    <!-- tsbc设备管理模态框 -->
                    <div class="modal fade" id="tsbcManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
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
                                                            <td>IP地址:</td>
                                                            <td>/</td>
                                                        </tr>
                                                        <tr>
                                                            <td>功 率:</td>
                                                            <td>23</td>
                                                            <td>ESSID</td>
                                                            <td>lpf_2g</td>
                                                        </tr>
                                                        <tr>
                                                            <td>信 道:</td>
                                                            <td>1</td>
                                                            <td>MAC</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>频段带宽:</td>
                                                            <td>ht20</td>
                                                            <td>流量统计:</td>
                                                            <td>/</td>
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
                                                            <td>IP地址:</td>
                                                            <td>/</td>
                                                        </tr>
                                                        <tr>
                                                            <td>功 率:</td>
                                                            <td>23</td>
                                                            <td>ESSID</td>
                                                            <td>lpf_2g</td>
                                                        </tr>
                                                        <tr>
                                                            <td>信 道:</td>
                                                            <td>1</td>
                                                            <td>MAC</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>频段带宽:</td>
                                                            <td>ht20</td>
                                                            <td>流量统计:</td>
                                                            <td>/</td>
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
                                                            <td>模式:</td>
                                                            <td>
                                                                <select style="width:124px;height:29px;" name="" id="">
                                                                    <option value="1">AP模式</option>
                                                                    <option value="2">STA模式</option>
                                                                </select>
                                                            </td>
                                                            <td>SSID:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                            <td>认证密码:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                            <td>模式:</td>
                                                            <td>
                                                                <select style="width:124px;height:29px;" name="" id="">
                                                                    <option value="1">AP模式</option>
                                                                    <option value="2">STA模式</option>
                                                                </select>
                                                            </td>
                                                            <td>SSID:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入昵称" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                            <td>认证密码:</td>
                                                            <td><input type="text" class="inputType" placeholder="请输入密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                                <el-button type="primary">保存</el-button>
                                            </div>    
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="软件升级" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                软件升级
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom">
                                                <div class="upgrade">
                                                    当前版本:V1.0052
                                                </div>
                                                <div class="upgrade">
                                                    选择固件:<el-select v-model="value" clearable size='small' placeholder="请选择">
                                                        <el-option
                                                        v-for="item in upgradeoptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div>
                                                    <el-button type="primary">升级</el-button>
                                                    <el-button type="success">刷新</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="设备重启" style="background:white;">
                                        <div class="basicstatus" style="padding-bottom:1px">
                                            <div class="basicstatus_top">
                                                重新启动
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                <p>&#x3000&#x3000“可按下下面按钮 强制设备重新启动</p>
                                            </div>
                                            <el-button type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                            <div class="basicstatus_top">
                                                重置
                                            </div>
                                            <div class="basicstatus_center"></div>
                                            <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                <p>&#x3000&#x3000“可按下下面按钮 重置设备</p>
                                            </div>
                                            <el-button type="primary" style="margin:10px 0 15px 0;">重置</el-button>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs> 
                            </div>
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
                            width="180">
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
                                    <el-button @click="tsbamanage(scope.row)" type="text" size="small">管理设备</el-button>
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
                    <!-- tsba设备管理模态框 -->
                    <div class="modal fade" id="tsbaManageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <div>
                                                        <span>按关键字过滤:</span>
                                                        <select name="" id="" style="width:126px;height:29px;">
                                                            <option value="1">MAC地址</option>
                                                            <option value="2">描述</option>
                                                        </select>
                                                        <span>关键字:</span>
                                                        <el-input v-model="tsbginput" style="width:126px;" size='small' placeholder="请输入内容"></el-input>
                                                        <el-button size='small' type="primary" style="margin-left:10px;">查询</el-button>
                                                        <el-button size='small'>显示全部</el-button>
                                                    </div>
                                                    <div style="margin-top:5px;">
                                                        <el-table
                                                            ref="multipleTable"
                                                            :data="tsbgtableData"
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
                                                            prop="code"
                                                            align='center'
                                                            label="MAC地址"
                                                            width="160">
                                                            </el-table-column>
                                                            <el-table-column
                                                            prop="departmentName"
                                                            label="描述"
                                                            align='center'
                                                            width="160">
                                                            </el-table-column>
                                                            <el-table-column
                                                            prop="email"
                                                            label="操作"
                                                            align='center'
                                                            show-overflow-tooltip>
                                                            </el-table-column>
                                                        </el-table>
                                                        <div class="block">
                                                            <el-pagination
                                                            @size-change="tsbgListSizeChange"
                                                            @current-change="tsbgListCurrentChange"
                                                            :current-page="tsbgListcurrentPage"
                                                            :page-sizes="[10, 20, 30, 50]"
                                                            :page-size="tsbgListsizes"
                                                            layout="total, sizes, prev, pager, next, jumper"
                                                            :total="tsbgListtotal">
                                                            </el-pagination>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <el-button type="primary">增加</el-button>
                                                        <el-button type="danger">全部删除</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="软件升级" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    软件升级
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom">
                                                    <div class="upgrade">
                                                        当前版本:V1.0052
                                                    </div>
                                                    <div class="upgrade">
                                                        选择固件:<el-select v-model="value" clearable size='small' placeholder="请选择">
                                                            <el-option
                                                            v-for="item in upgradeoptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </div>
                                                    <div>
                                                        <el-button type="primary">升级</el-button>
                                                        <el-button type="success">刷新</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="存为模板" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    模板开关
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                    <el-checkbox v-model="templatechecked" >应用模板</el-checkbox>
                                                    <p>&#x3000&#x3000“应用模板”开关打开后，当前终端设备会主动从控制网关应用配置模板；否则使用自身已有配置。</p>
                                                </div>
                                                <div class="basicstatus_top">
                                                    存为模板
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                    <p>&#x3000&#x3000“将当前设备的配置项存为模板，保存在控制网关，可根据需要应用于其它相同型终端设备上。</p>
                                                </div>
                                                <el-button type="primary" style="margin:10px 0 15px 0;">存为模板</el-button>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="设备重启" style="background:white;">
                                            <div class="basicstatus" style="padding-bottom:1px">
                                                <div class="basicstatus_top">
                                                    重新启动
                                                </div>
                                                <div class="basicstatus_center"></div>
                                                <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                                    <p>&#x3000&#x3000“可按下下面按钮 强制设备重新启动</p>
                                                </div>
                                                <el-button type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs> 
                                </div>
                            </div><!-- /.modal-content -->
                        </div>
                    </div><!-- /.modal -->
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
                radio2:0,
                DHCPchecked:true,
                tsbguploaddata:[],
                radio3:1,
                templatechecked:false,
                

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
                tsbgoptions:[{value:'0',label:'ht20'},{value:'1',label:'ht40'}],
                tsbgoptionstwo:[{value:'0',label:'NONE'},{value:'1',label:'WPA/WPA2'}],
                checked:false,
                radio:'2',
                tsbginput:'',
                tsbgtableData:[],
                tsbgListcurrentPage:1,
                tsbgListsizes:10,
                tsbgListtotal:100,
                upgradeoptions:[{value:'0',label:'ht20'},{value:'1',label:'ht40'}],
                templatechecked:true,
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
            //tsbg网络设置单选框变化
            tsbgchange(val){
                console.log(val,this.radio2)
            },
            //tsbg固件管理多选框change事件
            tsbgupgrad(val){
                console.log(val)
            },
            //tsbg模板管理--应用模板
            tsbgtemplate(val){
                console.log(val);
            },
            //tsbg模板管理操作--删除
            tsbgoperate(val){
                console.log(val);
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
            //tsbc管理设备点击事件
            tsbcmanage(value){
                console.log(value)
                $('#tsbcManageModal').modal('show');
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
            //tsbg管理设备点击事件
            tsbamanage(value){
                console.log(value)
                $('#tsbaManageModal').modal('show')
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
            //黑白名单列表选择条数事件
            tsbgListSizeChange(val){},
            //黑白名单列表选择页数事件
            tsbgListCurrentChange(val){},

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
.upgrade{text-align: left;padding-left: 30px;margin-bottom: 15px;}
</style>

