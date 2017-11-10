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
                                    离线
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
                            width="220">
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
                        <el-button type="primary" @click="machinegrouping" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBG设备分组</el-button>
                    </div>
                    <!-- 设备列表 -->
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbgdata"
                            border
                            stripe
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
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
                                        离线
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
                            width="220">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
                        <el-button type="primary" @click="machinegrouping" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBC设备分组</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbcdata"
                            border
                            stripe
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
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
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="MAC"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="lanIPX"
                            label="ip地址"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="100">
                            <template scope="scope">
                                <span v-if="scope.row.online==='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online==='0'" style='color:#FF0000;'>
                                    离线
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            label="分组"
                            align='center'
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="220">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
                        <el-button type="primary" @click="machinegrouping" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBA设备分组</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="tsbadata"
                            border
                            stripe
                            tooltip-effect="dark"
                            @selection-change="handleSelectionChange"
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
                                    离线
                                </span>
                            </template>    
                            </el-table-column>
                            <el-table-column
                            prop="hardwareVersion"
                            label="硬件版本"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="142">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="在线时长"
                            align='center'
                            width="220">
                            </el-table-column>
                            <el-table-column
                            prop="startTime"
                            label="启动时间"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
            <!-- 设备分组模态框（Modal） -->
            <div class="modal fade" id="tsbgmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">设备分组</h4>
                        </div>
                        <div class="modal-body">
                            <el-button @click="dialogVisible = true" type="primary" size='small'>添加分组</el-button>
                            <div v-if="dialogVisible" class="grouping_div">
                                <div>
                                    <span>分组名称:</span>
                                    <input type="text" v-model="names" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>硬件版本:</span>
                                    <input type="text" v-model="hardwareVersion" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span>软件版本:</span>
                                    <input type="text" v-model="softwareVersion" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                </div>
                                <p>
                                    <span>简介</span>
                                    <el-input
                                    type="textarea"
                                    :rows="1"
                                    placeholder="请输入内容"
                                    v-model="groupingtextarea">
                                    </el-input>
                                </p>
                                <el-button type="primary" @click="groupingsave" size='small'>保存</el-button>
                                <el-button type="primary" @click="dialogVisible = false" size='small'>取消</el-button>
                            </div>    
                            <div style="width:100%;margin-top:10px;">
                                    <el-table
                                    ref="multipleTable"
                                    :data="groupingdata"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    @selection-change="groupingsaveChange"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">  
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    align='center'
                                    label="分组名称"
                                    width="110">
                                    </el-table-column>
                                    <el-table-column
                                    prop="hardwareVersion"
                                    align='center'
                                    label="硬件版本"
                                    width="100">
                                    </el-table-column>
                                    <el-table-column
                                    prop="softwareVersion"
                                    align='center'
                                    label="软件版本"
                                    width="90">
                                    </el-table-column>
                                    <el-table-column
                                    prop="remark"
                                    label="备注"
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    label="操作"
                                    align='center'>
                                        <template scope="scope">
                                            <!-- <el-button type="primary" size="small">修改</el-button> -->
                                            <el-button @click="groupingdelete(scope.row)" type="primary" size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button @click="groupingsavetwo" type="button" class="btn btn-primary">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            
            <!-- 查看 -->
            <div class="modal fade" id="LookoverModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:780px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">常规信息</h4>
                        </div>
                        <div class="modal-body">
                             <!-- tsbg常规信息 -->
                             <div v-if="lookoverType==='tsbg'" class="basicstatus" style="padding-bottom:1px">
                                <div class="state">
                                    <div>
                                        <!-- <template> -->
                                            <div v-if="lookdata.lan1State=='0'" style="background:#00FF00;"></div>
                                            <div v-else-if="lookdata.lan1State=='1'" style="background:#FFFFFF;"></div>
                                            <div v-else-if="lookdata.lan1State=='2'" style="background:#666666;"></div>
                                        <!-- /* </template> */ -->
                                        <div>LAN1</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan2State=='0'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan2State=='1'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan2State=='2'" style="background:#666666;"></div>
                                        <div>LAN2</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan3State=='0'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan3State=='1'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan3State=='2'" style="background:#666666;"></div>
                                        <div>LAN3</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan4State=='0'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan4State=='1'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan4State=='2'" style="background:#666666;"></div>
                                        <div>LAN4</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan5State=='0'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan5State=='1'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan5State=='2'" style="background:#666666;"></div>
                                        <div>LAN5</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan6State=='0'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan6State=='1'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan6State=='2'" style="background:#666666;"></div>
                                        <div>LAN6</div>
                                    </div>
                                </div>
                                <div class="state_two">
                                    <div>
                                        <span style="background:#00FF00;"></span>
                                        <span>已连接</span>
                                    </div>
                                    <div>
                                        <span style="background:#FFFFFF;"></span>
                                        <span>未连接</span>
                                    </div>
                                    <div>
                                        <span style="background:#666666;"></span>
                                        <span>禁用</span>
                                    </div>
                                </div>
                                <div class="basicstatus_top">
                                    基本信息
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>型号版本:</td>
                                                <td>{{lookdata.hardwareVersion}}</td>
                                                <td>软件版本</td>
                                                <td>{{lookdata.softwareVersion}}</td>
                                            </tr>
                                            <tr>
                                                <td>启动时间:</td>
                                                <td>{{lookdata.timeRun}}</td>
                                                <td>MAC地址:</td>
                                                <td>{{lookdata.MAC}}</td>
                                            </tr>
                                            <tr>
                                                <td>ip地址:</td>
                                                <td>{{lookdata.lanIPX}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    上联接口
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>ip地址:</td>
                                                <td>{{lookdata.wanIPX}}</td>
                                                <td>链接速率</td>
                                                <td>{{lookdata.linkSpeed}}</td>
                                            </tr>
                                            <tr>
                                                <td>下载 包数/字节:</td>
                                                <td>{{lookdata.downloadPackage}}/{{lookdata.downloadByte}}</td>
                                                <td>上传 包数/字节:</td>
                                                <td>{{lookdata.uploadPackage}}/{{lookdata.uploadByte}}</td>
                                            </tr>
                                            <tr>
                                                <td>上传速率:</td>
                                                <td>{{lookdata.uploadSpeed}}</td>
                                                <td>下载速率</td>
                                                <td>{{lookdata.downloadSpeed}}</td>
                                            </tr>
                                            <tr>
                                                <td>双工模式:</td>
                                                <td>
                                                    <span v-if="lookdata.uploadPackage=='0'">否</span>
                                                    <span v-if="lookdata.uploadPackage=='1'">是</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                            <!-- tsbc常规信息  -->
                            <div v-if="lookoverType==='tsbc'" class="basicstatus" style="padding-bottom:1px">
                                <div class="basicstatus_top">
                                    基本信息
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>型号版本:</td>
                                                <td>{{lookdata.hardwareVersion}}</td>
                                                <td>软件版本</td>
                                                <td>{{lookdata.softwareVersion}}</td>
                                            </tr>
                                            <tr>
                                                <td>启动时间:</td>
                                                <td>{{lookdata.timeRun}} </td>
                                                <td>MAC地址:</td>
                                                <td>{{lookdata.MAC}} </td>
                                            </tr>
                                            <tr>
                                                <td>ip地址:</td>
                                                <td>{{lookdata.lanIPX}} </td>
                                                <td>连接链路:</td>
                                                <td>{{lookdata.link}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    RAOIO(2G)
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>工作模式:</td>
                                                <td>{{lookdata.wifi2WorkMode}}</td>
                                                <td>信道</td>
                                                <td>{{lookdata.radio2Channel}}</td>
                                            </tr>
                                            <tr>
                                                <td>发射功率:</td>
                                                <td>{{lookdata.radio2LaunchPower}} </td>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.radio2ChannelBandwidth}} </td>
                                            </tr>
                                            <tr>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.radio2ESSID}} </td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.radio2IP}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.radio2SendPackage}}/{{lookdata.radio2SendByte}}</td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.radio2ReceiveByte}}/{{lookdata.radio2ReceiveByte}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    RAOIO(5G)
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>工作模式:</td>
                                                <td>{{lookdata.wifi5WorkMode}}</td>
                                                <td>信道</td>
                                                <td>{{lookdata.radio5Channel}}</td>
                                            </tr>
                                            <tr>
                                                <td>发射功率:</td>
                                                <td>{{lookdata.radio5LaunchPower}} </td>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.radio5ChannelBandwidth}} </td>
                                            </tr>
                                            <tr>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.radio5ESSID}} </td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.radio5IP}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.radio5SendPackage}}/{{lookdata.radio5SendByte}} </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.radio5ReceiveByte}}/{{lookdata.radio5ReceiveByte}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsba常规信息 -->
                            <div v-if="lookoverType=='tsba'" class="basicstatus">
                                <div class="basicstatus_top">
                                    基本信息
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>型号版本:</td>
                                                <td>{{lookdata.hardwareVersion}}</td>
                                                <td>软件版本</td>
                                                <td>{{lookdata.softwareVersion}} </td>
                                            </tr>
                                            <tr>
                                                <td>启动时间:</td>
                                                <td>{{lookdata.timeRun}} </td>
                                                <td>MAC地址:</td>
                                                <td>{{lookdata.MAC}} </td>
                                            </tr>
                                            <tr>
                                                <td>ip地址:</td>
                                                <td>{{lookdata.lanIPX}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    上联接口
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>链接速率:</td>
                                                <td>{{lookdata.linkSpeed}}</td>
                                                <td>双工模式</td>
                                                <td>
                                                    <span v-if="lookdata.duplexMode=='0'">否</span>
                                                    <span v-if="lookdata.duplexMode=='1'">是</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>下载 包数/字节:</td>
                                                <td>{{lookdata.downloadPackage}}/{{lookdata.downloadByte}} </td>
                                                <td>上传 包数/字节:</td>
                                                <td>{{lookdata.uploadPackage}}/{{lookdata.uploadByte}} </td>
                                            </tr>
                                            <tr>
                                                <td>实时速率:</td>
                                                <td>{{lookdata.MAC}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    RAOIO(2G)
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>信道:</td>
                                                <td>{{lookdata.radio2Channel}}</td>
                                                <td>发射功率</td>
                                                <td>{{lookdata.radio2LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.radio2ChannelBandwidth}} </td>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.radio2SSID}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.radio2SendPackage}}/{{lookdata.radio2SendByte}}  </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.radio2ReceivePackage}}/{{lookdata.radio2ReceiveByte}}  </td>
                                            </tr>
                                            <tr>
                                                <td>发送 重发/丢包:</td>
                                                <td>{{lookdata.radio2SendRepeat}}/{{lookdata.radio2SendPackageLoss}} </td>
                                                <td>接收 重发/丢包:</td>
                                                <td>{{lookdata.radio2ReceiveRepeat}}/{{lookdata.radio2ReceivePackageLoss}}  </td>
                                            </tr>
                                            <tr>
                                                <td>连接用户:</td>
                                                <td>{{lookdata.radio2connectUser}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top">
                                    RAOIO(5G)
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>信道:</td>
                                                <td>{{lookdata.radio5Channel}}</td>
                                                <td>发射功率</td>
                                                <td>{{lookdata.radio5LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.radio5ChannelBandwidth}} </td>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.radio5SSID}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.radio5SendPackage}}/{{lookdata.radio5SendByte}}  </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.radio5ReceivePackage}}/{{lookdata.radio5ReceiveByte}}  </td>
                                            </tr>
                                            <tr>
                                                <td>发送 重发/丢包:</td>
                                                <td>{{lookdata.radio5SendRepeat}}/{{lookdata.radio5SendPackageLoss}} </td>
                                                <td>接收 重发/丢包:</td>
                                                <td>{{lookdata.radio5ReceiveRepeat}}/{{lookdata.radio5ReceivePackageLoss}}  </td>
                                            </tr>
                                            <tr>
                                                <td>连接用户:</td>
                                                <td>{{lookdata.radio5connectUser}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div>
            <!-- 配置 -->
            <div class="modal fade" id="allocationModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:750px;">
                    <div class="modal-body">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">模板配置</h4>
                            </div>
                            <div class="modal-body">
                                <el-collapse v-model="activeNames" accordion>
                                    <el-collapse-item v-if="lookoverType=='tsbg'&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsbg'&&lookoverstatus.LAN!=''" title="LAN配置" name="3" style="text-align:left;">
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
                                                        <td><el-checkbox v-model="DHCPchecked">启用</el-checkbox></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverType=='tsbg'" title="终端配置" name="4" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsbc'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="5" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsbc'&&lookoverstatus.wifi5G!=''" title="5G配置" name="6" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsbc'||lookoverType=='tsba'&&lookoverlan==true" title="网络设置" name="7" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsba'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="8" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='tsba'&&lookoverstatus.wifi5G!=''" title="5G配置" name="9" style="text-align:left;">
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
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">保存并下发</button>
                                <button type="button" class="btn btn-primary">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 管理 -->
            <div class="modal fade" id="administerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:750px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">设备管理</h4>
                        </div>
                        <div class="modal-body">
                            <el-collapse v-model="activeNames" accordion>
                                <el-collapse-item title="设备信息" name="0" style="text-align:left;">
                                    <div>
                                        <span>设备昵称:</span>
                                        <input type="text">
                                    </div>
                                    <div>
                                        <span>备注信息:</span>
                                        <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="textarea">
                                        </el-input>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item title="固件管理" name="1" style="text-align:left;">
                                    <!-- tsbg软件升级 -->
                                    <div v-if="lookoverType=='tsbg'" class="basicstatus_bottom">
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
                                        </div>
                                    </div>
                                    <!-- tsbc软件升级 -->
                                    <div v-if="lookoverType=='tsbc'" class="basicstatus_bottom">
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
                                        </div>
                                    </div>
                                    <!-- tsba软件升级 -->
                                    <div v-if="lookoverType=='tsba'" class="basicstatus_bottom">
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
                                        </div>
                                    </div>
                                    <span>是否允许设备自动升级: </span>
                                    <el-radio-group v-model="radio3">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </el-collapse-item>
                                <el-collapse-item title="设备操作" name="2" style="text-align:left;">
                                    <!-- tsbg设备重启 -->
                                    <div v-if="lookoverType=='tsbg'">
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
                                    <!-- tsbc设备重启 -->
                                    <div v-if="lookoverType=='tsbc'">
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
                                    <!-- tsba设备重启 -->
                                    <div v-if="lookoverType=='tsba'">
                                        <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                            <p>&#x3000&#x3000“可按下下面按钮 强制设备重新启动</p>
                                        </div>
                                        <el-button type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item v-if="lookoverType=='tsbg'" title="模板管理" name="3" style="text-align:left;">
                                    <div class="basicstatus_bottom">
                                       <el-checkbox>允许设备自动匹配模板</el-checkbox>
                                    </div>
                                    <el-button type="primary">删除模板</el-button>
                                </el-collapse-item>
                                <el-collapse-item v-if="lookoverType=='tsba'" title="存为模板" name="5" style="text-align:left;">
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
                                </el-collapse-item> 
                            </el-collapse>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
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
                lookoverType:'',
                lookoverstatus:{},
                lookoverlan:true,
                activeNames: '2',
                textarea:'',
                //设备分组
                groupingdata:[],
                dialogVisible :false,
                names:'',
                hardwareVersion:'',
                softwareVersion:'',
                groupingtextarea:'',
                sites:[],
                sitestwo:[],

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
                checked:false,
                radio:'2',
                tsbginput:'',
                tsbgtableData:[],
                tsbgListcurrentPage:1,
                tsbgListsizes:10,
                tsbgListtotal:100,
                upgradeoptions:[{value:'0',label:'ht20'},{value:'1',label:'ht40'}],
                templatechecked:true,

                lookdata:{}, //弹框数据数组对象
            }
        },
        methods:{
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
                    url:that.serverurl+'equipment/getAllEquipmentList',
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
            //查看
            LookoverModal(val){
                var that = this;
                var url = '';
                if(val.type=='tsbg'){url='equipment/showTsbg'}
                if(val.type=='tsbc'){url='equipment/showTsbc'}
                if(val.type=='tsba'){url='equipment/showTsba'}
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:{id:val.id},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.lookdata = data.rows[0]
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                $('#LookoverModal').modal('show')
                this.lookoverType = val.type
            },
            //配置
            allocationModal(val){
                var that = this
                var type = '';
                var url = ''
                if(val.type=='tsbg'){type='0';url='equipment/showConfigTsbg'}
                if(val.type=='tsbc'){type='1';url=''}
                if(val.type=='tsba'){type='2';url=''}
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        model:val.hardwareVersion,
                        type:type
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
                            that.lookoverType = val.type
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                $('#allocationModal').modal('show')
                //配置基本数据请求
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{},
                    success:function(data){
                        if(data.errorCode=='0'){}else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //管理
            administerModal(val){
                $('#administerModal').modal('show')
                this.lookoverType = val.type
            },

            //页面数据选择
            handleSelectionChange(val){
                this.sites = [];
                this.sites = val
            },
            //弹框分组数据选择
            groupingsaveChange(val){
                this.sitestwo = [];
                if(val.length>=2){
                    this.$message({
                        message:'只能选取一个分组',
                        type:'error'
                    })
                    return;
                }
                this.sitestwo = val
            },
            //设备分组数据渲染
            machinegrouping(){
                var that = this
                if(this.sites.length==0){
                    that.$message({
                        message: '请选择数据进行分组',
                        type: 'error'
                    })
                    return;
                }
                var type = '';
                if(this.sites[0].type='tsbg'){
                    type = 't_tsbg_group';
                }
                if(this.sites[0].type='tsbc'){
                    type = 't_tsbc_group';
                }
                if(this.sites[0].type='tsba'){
                    type = 't_tsba_group';
                }
                $('#tsbgmyModal').modal('show')
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getDeviceGroup',
                    data:{
                        table:type
                    },
                    success:function(data){
                        that.groupingdata = data.rows
                    }
                })
            },
            //添加保存分组
            groupingsave(){
                var that = this;
                var type = '';
                if(this.sites[0].type='tsbg'){
                    type = 't_tsbg_group';
                }
                if(this.sites[0].type='tsbc'){
                    type = 't_tsbc_group';
                }
                if(this.sites[0].type='tsba'){
                    type = 't_tsba_group';
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/saveDeviceGroup',
                    data:{
                       table: type,
                       name: that.names,
                       hardwareVersion: that.hardwareVersion,
                       softwareVersion: that.softwareVersion,
                       remark: that.groupingtextarea
                    },
                    success:function(data){
                        console.log(data)
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                            that.dialogVisible = false;
                            that.machinegrouping()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //删除分组
            groupingdelete(val){
                var that = this
                var type = '';
                if(this.sites[0].type='tsbg'){
                    type = 't_tsbg_group';
                }
                if(this.sites[0].type='tsbc'){
                    type = 't_tsbc_group';
                }
                if(this.sites[0].type='tsba'){
                    type = 't_tsba_group';
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/deleteDeviceGroup',
                    data:{
                        table:type,
                        id:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            that.machinegrouping()
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //设备分组保存按钮
            groupingsavetwo(){
                var that = this
                var type = '';
                var id = [];
                var groupname = '';
                if(this.sites[0].type='tsbg'){
                    type = 't_tsbg';
                    groupname = 'tsbgGroupId'
                }
                if(this.sites[0].type='tsbc'){
                    type = 't_tsbc';
                    groupname = 'tsbcGroupId'
                }
                if(this.sites[0].type='tsba'){
                    type = 't_tsba';
                    groupname = 'tsbaGroupId'
                }
                for(var i=0;i<this.sites.length;i++){
                    id.push(this.sites[i].id)
                }
                if(this.sitestwo.length>=2){
                    this.$message({
                        message:'请选取分组进行保存',
                        type:'error'
                    })
                    return;
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/divideDeviceGroup',
                    data:{
                        table:type,
                        groupname:groupname,
                        groupId:that.sitestwo[0].id,
                        ids:id.join(',')
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '分组成功',
                                type: 'success'
                            })
                            $('#tsbgmyModal').modal('hide')
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
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
                    url:that.serverurl+'equipment/getTsbgList',
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
            //tsbg固件管理多选框change事件
            tsbgupgrad(val){
                console.log(val)
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
                    url:that.serverurl+'equipment/getTsbcList',
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
                    url:that.serverurl+'equipment/getTsbaList',
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
                    this.sites = []
                }
                if(tab.name=='3'){
                    this.tsbcready()
                    this.sites = []
                }
                if(tab.name=='4'){
                    this.tsbaready()
                    this.sites = []
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
/* .grouping_div{display: flex;} */
.grouping_div>div{display: flex;margin-top:5px;}
.grouping_div>div>span{line-height: 26px;}
.grouping_div>div>input{width: 127px;}
.state{width:70%;height: 60px;margin: 0 auto;background: #D7D7D7;border: 1px solid #797979;border-radius: 10px;display: flex;justify-content: space-around;}
.state>div{display: flex;flex-direction: column;}
.state>div>div:nth-of-type(1){width: 30px;height: 30px;border: 1px solid #797979;background: #FFFFFF;margin-top:5px;}
.state>div>div:nth-of-type(2){font-size:13px;}
.state_two{width: 70%;height: 40px;margin: 0 auto;padding-top:10px;display: flex;justify-content: space-around;}
.state_two>div{display: flex;}
.state_two>div>span:nth-of-type(1){width: 25px;height: 25px;border: 1px solid #797979;}
.state_two>div>span:nth-of-type(2){font-size: 13px;line-height: 25px;padding-left: 10px;}
</style>

