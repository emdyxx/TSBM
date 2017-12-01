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
                                <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
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
                                    <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                        在线
                                    </span>
                                    <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
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
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
                                </template>
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
                            width="160">
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
                                <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
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
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
                                </template>
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
                                <span v-if="scope.row.online=='1'" style='color:#00CC00;'>
                                    在线
                                </span>
                                <span v-else-if="scope.row.online=='0'" style='color:#FF0000;'>
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
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
                                </template>
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
                <div class="modal-dialog" style="width:780px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">设备分组</h4>
                        </div>
                        <div class="modal-body">
                            <div v-if="typegrouping">
                                <span>选择分组:</span>
                                <el-select v-model="selectedOptions" @change="groupingchange" size='small' style="width:126px;margin-bottom:10px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in groupingoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button @click="dialogVisible = true" type="primary" size='small'>添加分组</el-button>
                            <div v-if="dialogVisible" class="grouping_div">
                                <div>
                                    <span style='margin-left:45px;line-height:36px;'>分组名称:</span>
                                    <input type="text" v-model="names" class="form-control logManage_main_input" placeholder='请输入分组名称' onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span style='margin-left:45px;line-height:36px;'>硬件版本:</span>
                                    <input type="text" v-model="hardwareVersion" class="form-control logManage_main_input" placeholder='请输入硬件版本' onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
                                    <span style='margin-left:45px;line-height:36px;'>软件版本:</span>
                                    <input type="text" v-model="softwareVersion" class="form-control logManage_main_input" placeholder='请输入软件版本' onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')">
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
                                    prop="groupName"
                                    align='center'
                                    label="分组名称"
                                    width="130">
                                    </el-table-column>
                                    <el-table-column
                                    prop="model"
                                    align='center'
                                    label="适用型号"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="remark"
                                    label="备注"
                                    show-overflow-tooltip
                                    align='center'>
                                    </el-table-column>
                                    <el-table-column
                                    label="操作"
                                    align='center'
                                    width="90">
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
                             <div v-if="lookoverType==='0'" class="basicstatus" style="padding-bottom:1px">
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
                                                <td>{{lookdata.startTime}}</td>
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
                                                    <span v-if="lookdata.duplexMode=='0'">否</span>
                                                    <span v-if="lookdata.duplexMode=='1'">是</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                            <!-- tsbc常规信息  -->
                            <div v-if="lookoverType==='1'" class="basicstatus" style="padding-bottom:1px">
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
                                                <td>{{lookdata.startTime}} </td>
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
                                                <td>{{lookdata.wifi2ApChannel}}</td>
                                            </tr>
                                            <tr>
                                                <td>发射功率:</td>
                                                <td>{{lookdata.wifi2ApLaunchPower}} </td>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.wifi2ApBandwidth}} </td>
                                            </tr>
                                            <tr>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.wifi2ESSID}} </td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wifi2IP}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.wifi2SendPackage}}/{{lookdata.wifi2SendByte}}</td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.wifi2ReceivePackage}}/{{lookdata.wifi2ReceiveByte}} </td>
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
                                                <td>{{lookdata.wifi5ApChannel}}</td>
                                            </tr>
                                            <tr>
                                                <td>发射功率:</td>
                                                <td>{{lookdata.wifi5ApLaunchPower}} </td>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.wifi5ApBandwidth}} </td>
                                            </tr>
                                            <tr>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.wifi5ESSID}} </td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wifi5IP}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wifi5SendByte}} </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wifi5ReceiveByte}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- tsba常规信息 -->
                            <div v-if="lookoverType=='2'" class="basicstatus">
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
                                                <td>{{lookdata.startTime}} </td>
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
                                                <td>{{lookdata.realTimeRate}}</td>
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
                                                <td>{{lookdata.wifi2Channel}}</td>
                                                <td>发射功率</td>
                                                <td>{{lookdata.wifi2LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.wifi2Bandwidth}} </td>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.wifi2SSID}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.wifi2SendPackage}}/{{lookdata.wifi2SendByte}}  </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.wifi2ReceivePackage}}/{{lookdata.wifi2ReceiveByte}}  </td>
                                            </tr>
                                            <tr>
                                                <td>发送 重发/丢包:</td>
                                                <td>{{lookdata.wifi2SendRepeat}}/{{lookdata.wifi2SendPackageLoss}} </td>
                                                <td>接收 重发/丢包:</td>
                                                <td>{{lookdata.wifi2ReceiveRepeat}}/{{lookdata.wifi2ReceivePackageLoss}}  </td>
                                            </tr>
                                            <tr>
                                                <td>连接用户:</td>
                                                <td>{{lookdata.wifi2connectUser}}</td>
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
                                                <td>{{lookdata.wifi5Channel}}</td>
                                                <td>发射功率</td>
                                                <td>{{lookdata.wifi5LaunchPower}}</td>
                                            </tr>
                                            <tr>
                                                <td>信道带宽:</td>
                                                <td>{{lookdata.wifi5Bandwidth}} </td>
                                                <td>ESSID:</td>
                                                <td>{{lookdata.wifi5SSID}} </td>
                                            </tr>
                                            <tr>
                                                <td>发送 包数/字节:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wifi5SendByte}}  </td>
                                                <td>接收 包数/字节:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wifi5ReceiveByte}}  </td>
                                            </tr>
                                            <tr>
                                                <td>发送 重发/丢包:</td>
                                                <td>{{lookdata.wifi5SendRepeat}}/{{lookdata.wifi5SendPackageLoss}} </td>
                                                <td>接收 重发/丢包:</td>
                                                <td>{{lookdata.wifi5ReceiveRepeat}}/{{lookdata.wifi5ReceivePackageLoss}}  </td>
                                            </tr>
                                            <tr>
                                                <td>连接用户:</td>
                                                <td>{{lookdata.wifi5connectUser}}</td>
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
                                    <el-collapse-item v-if="lookoverType=='0'&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            IP类型:
                                            <select v-model="tsbgcollcate.ipType" style="width:168px;">
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
                                    <el-collapse-item v-if="lookoverType=='0'&&lookoverstatus.LAN!=''" title="LAN配置" name="3" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='1'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="5" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='1'&&lookoverstatus.wifi5G!=''" title="5G配置" name="6" style="text-align:left;">
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
                                                            <select v-model="tsbccollcate.wifi5ApHideSSID">
                                                                <option value="1">隐藏</option>
                                                                <option value="0">不隐藏</option>
                                                            </select>
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
                                                        <td><i class="required">*</i>加密方式:</td>
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
                                    <el-collapse-item v-if="lookoverType=='1'||lookoverType=='2'&&lookoverlan==true" title="网络设置" name="7" style="text-align:left;">
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
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.wifi2G!=''" title="2.4G配置" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbccollcate.wifi2Enable">
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
                                                            <select v-if="tsbacaollcate.wifi2Bandwidth" style="width:110px;height:29px;">
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
                                                            <select v-if="tsbacaollcate.wifi2LaunchPower" style="width:110px;height:29px;">
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
                                                            <select v-if="tsbacaollcate.wifi2EncryptionMode" style="width:110px;height:29px;">
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
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.wifi5G!=''" title="5G配置" name="9" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model="tsbccollcate.wifi5Enable">
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
                                                            <select v-if="tsbacaollcate.wifi5Channel" style="width:110px;height:29px;">
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
                                                            <select v-if="tsbacaollcate.wifi5LaunchPower" style="width:110px;height:29px;">
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
                                                            <select v-if="tsbacaollcate.wifi5EncryptionMode" style="width:110px;height:29px;">
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
                                    <el-collapse-item v-if="lookoverType=='1'||lookoverType=='2'" title="黑白名单设置" name="10" style="text-align:left;">
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
                            <div class="modal-footer">
                                <button @click="deploysave('1')" type="button" class="btn btn-default">保存并下发</button>
                                <button @click="deploysave('0')" type="button" class="btn btn-primary">保存</button>
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
                                        <input v-model="managedata.nickname" type="text" placeholder="请输入设备昵称" style="width:146px;display:inline-block;" class="form-control logManage_main_input">
                                    </div>
                                    <div>
                                        <span>备注信息:</span>
                                        <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="managedata.remark">
                                        </el-input>
                                    </div>
                                    <el-button @click="configurationsave(0)" type="primary" size='small' style="margin-top:5px;margin-left:10px;">保存</el-button>
                                </el-collapse-item>
                                <el-collapse-item title="固件管理" name="1" style="text-align:left;">
                                    <div class='basicstatus_top'>
                                        <span>选择升级包:</span>
                                        <el-select v-model="managevalue" size='small' clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in manageoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div> 
                                    <div>
                                        <el-button @click="configurationsave(1)" type="primary" size='small' style="margin-top:5px;margin-left:10px;">升级包下发</el-button>
                                    </div>
                                    <div class="basicstatus_center"></div>
                                    <span>是否允许设备自动升级: </span>
                                    <el-radio-group v-model="managedata.AutoUpgrade">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                   <div>
                                        <el-button @click="configurationsave(4)" type="primary" size='small' style="margin-top:5px;margin-left:10px;">保存</el-button>
                                   </div>
                                </el-collapse-item>
                                <el-collapse-item title="设备操作" name="2" style="text-align:left;">
                                    <!-- tsbg设备重启 -->
                                    <div>
                                        <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                            <p>&#x3000&#x3000“可按下下面按钮 强制设备重新启动</p>
                                        </div>
                                        <el-button @click="configurationsave(5)" size='small' type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                        <div class="basicstatus_top">
                                            重置
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                            <p>&#x3000&#x3000“可按下下面按钮 重置设备</p>
                                        </div>
                                        <el-button @click="configurationsave(6)" size='small' type="primary" style="margin:10px 0 15px 0;">重置</el-button>
                                        <div class="basicstatus_center"></div>
                                        <p style="text-align:left;">注意：在设备重启期间，请不要将设备断电</p>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item title="模板管理" name="3" style="text-align:left;">
                                    <div class="basicstatus_bottom">
                                       <el-checkbox v-model="managedata.upgrade">允许设备自动匹配模板</el-checkbox>
                                    </div>
                                    <el-button @click="configurationsave(8)" size='small' type="primary">保存</el-button>
                                    <el-button @click="configurationsave(9)" size='small' type="primary">删除模板</el-button>
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
                activeNames: '0',
                textarea:'',
                //设备分组
                typegrouping:false,
                selectedOptions:'', //选择分组绑定数据
                groupingoptions:[], //管理员登录选择分组
                groupingdata:[],
                dialogVisible :false,
                names:'',
                hardwareVersion:'',
                softwareVersion:'',
                groupingtextarea:'',
                sites:[],
                sitestwo:[],
                //管理升级包数据
                manageoptions:[],
                managevalue:'',

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
                radio:'2',
                tsbginput:'',
                tsbgtableData:[],
                tsbgListcurrentPage:1,
                tsbgListsizes:10,
                tsbgListtotal:100,
                upgradeoptions:[{value:'0',label:'ht20'},{value:'1',label:'ht40'}],
                templatechecked:true,

                //tsbc,tsba,黑白名单
                panelTable:[], //黑名单
                panelTabletwo:[], //白名单
                paaelMAC:false,
                panelinput:'',
                panel:"1",
    
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
                configuration:[],//配置选中的数据
                showconfigdata:{},//接口返回成功的数据
                managedata:{
                    nickname:'',
                    remark:'',
                    AutoUpgrade:'0',
                    upgrade:true,
                },
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
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
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
                if(val.type=='0'){url='equipment/showTsbg'}
                if(val.type=='1'){url='equipment/showTsbc'}
                if(val.type=='2'){url='equipment/showTsba'}
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
                var that = this;
                that.configuration = val
                var type = '';
                var url = '';
                if(val.type=='0'){type='0';url='equipment/showConfigTsbg'}
                if(val.type=='1'){type='1';url='equipment/showConfigTsbc'}
                if(val.type=='2'){type='2';url='equipment/showConfigTsba'}
                //权限接口
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
                //配置基本数据请求
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:{
                        id:val.id,
                        MAC:val.MAC
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val.type=='0'){
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
                            }
                            if(val.type=='1'){
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
                            }
                            if(val.type=='2'){
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
                            if(val.type=='1'||val.type=='2'){
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
                            that.showconfigdata = data.result;
                            delete that.showconfigdata.order;
                            delete that.showconfigdata.configInfo;
                            
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
                $('#allocationModal').modal('show')
            },
            //管理
            administerModal(val){
                var that = this;
                $('#administerModal').modal('show')
                this.lookoverType = val.type
                this.configuration = val
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/getEquipmentUpgradeFileList',
                    data:{
                        type:val.type,
                        equipmentId:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.manageoptions = data.result
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //配置(模板)保存
            deploysave(val){
                var that = this;
                var url = '';
                var data = {};
                if(that.lookoverType=='0'){
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
                }
                if(that.lookoverType=='1'){
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
                        }
                    }
                    if(that.tsbccollcate.wifi5WorkMode=='Station'){
                        // that.tsbccollcate.wifi5StaPriority==''||
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
                }
                if(that.lookoverType=='2'){
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
                    }else{
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }    
                    if(that.tsbacaollcate.wifi5EncryptionMode=='0'){
                    }else{
                        this.$message({
                            message: '必填字段不能为空',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }          
                }
                if(that.lookoverType=='0'){
                    url='equipment/saveConfigTsbg'
                    data = that.tsbgcollcate
                    $.extend(data,that.tsbgcollcate,that.showconfigdata)
                }
                if(that.lookoverType=='1'){
                    url='equipment/saveConfigTsbc'
                    $.extend(data,that.tsbccollcate,that.tsbctsbacaollcate,that.showconfigdata)
                    if(that.panel=='0'){
                        //白名单
                        data.listContent = that.panelTabletwo.join(',')
                    }
                    if(that.panel=='1'){
                        //黑名单
                        data.listContent = that.panelTable.join(',')
                    }
                }
                if(that.lookoverType=='2'){
                    url='equipment/saveConfigTsba'
                    $.extend(data,that.tsbacaollcate,that.tsbctsbacaollcate,that.showconfigdata)
                    if(that.panel=='0'){
                        //白名单
                        data.listContent = that.panelTabletwo.join(',')
                    }
                    if(that.panel=='1'){
                        //黑名单
                        data.listContent = that.panelTable.join(',')
                    }
                }
                data.flag = val;
                data.id = that.configuration.id;
                data.departmentId = that.configuration.departmentId;
                data.hardwareVersion = that.configuration.hardwareVersion;
                data.MAC = that.configuration.MAC;
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
                                message: '模板配置成功',
                                type: 'success'
                            })
                            $('#allocationModal').modal('hide')
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
            },
            //管理保存
            configurationsave(val){
                var that = this;
                var url = '';
                var data = {};
                if(that.configuration.type=='0'){url='equipment/saveManagerTsbg';}
                if(that.configuration.type=='1'){url='equipment/saveManagerTsbc';}
                if(that.configuration.type=='2'){url='equipment/saveManagerTsba';}
                if(val=='0'){
                    data.flag = 'SAVE';
                    data.nickname = that.managedata.nickname
                    data.remark = that.managedata.remark
                }
                if(val=='1'){
                    if(that.managevalue==''){
                        that.$message({
                            message: '请选择升级包',
                            type: 'error'
                        })
                        return;
                    }
                    for(var i=0;i<that.manageoptions.length;i++){
                        if(that.managevalue = that.manageoptions[i].value){
                            data.url = that.manageoptions[i].fileUrl
                        }
                    }
                    data.flag = 'UPGRADE';
                }//升级包下发按钮
                if(val=='4'){
                    data.flag = 'AUTOUPGRADE';
                    data.autoUpgrade = that.managedata.AutoUpgrade
                }
                if(val=='5'||val=='7'){
                    data.flag = 'REBOOT';
                }//重启
                if(val=='6'){
                    data.flag = 'RESET';
                }//重置
                if(val=='8'){
                    data.flag = 'AUTOCONFIG';
                    if(that.managedata.upgrade==true){
                        data.autoConfig = 1
                    }else{
                        data.autoConfig = 0
                    }
                    
                }//模板是否允许自动升级
                if(val=='9'){
                    data.flag = 'DELTEMPLATE';
                }//删除模板
                data.id = that.configuration.id;
                data.MAC = that.configuration.MAC;
                data.senderIP = that.configuration.senderIP;
                data.senderMAC = that.configuration.senderMAC;
                data.hardwareVersion = that.configuration.hardwareVersion;
                data.softwareVersion = that.configuration.softwareVersion;
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val=='0'||val=='4'){
                                that.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                            }
                            if(val=='1'){
                                that.$message({
                                    message: '升级包下发成功',
                                    type: 'success'
                                })
                            }
                            if(val=='5'||val=='7'){
                                that.$message({
                                    message: '重启成功',
                                    type: 'success'
                                })
                            }
                            if(val=='6'){
                                that.$message({
                                    message: '重置成功',
                                    type: 'success'
                                })
                            }
                            if(val=='8'){
                                that.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                            }
                            if(val=='9'){
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                })
                            }
                        }else{
                            that.errorCode(data.errorCode)
                        }
                    }
                })
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
                console.log(this.sites[0].type)
                if(this.sites[0].type=='0'){
                    type = '0';
                }
                if(this.sites[0].type=='1'){
                    type = '1';
                }
                if(this.sites[0].type=='2'){
                    type = '2';
                }
                $('#tsbgmyModal').modal('show')
                if(sessionStorage.departmentId=='1'){
                    that.typegrouping = true;
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'department/getTopDepartment',
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.groupingoptions = data.result[0].children
                                that.selectedOptions = data.result[0].children[0].value
                                setTimeout(function(){
                                    $.ajax({
                                        type:'get',
                                        async:true,
                                        dataType:'json',
                                        xhrFields:{withCredentials:true},
                                        url:that.serverurl+'equipment/getEquipmentGroupList',
                                        data:{
                                            type:type,
                                            departmentId:that.selectedOptions
                                        },
                                        success:function(data){
                                            that.groupingdata = data.result
                                        }
                                    })
                                },300)
                            }
                        }
                    })
                }else{
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'equipment/getEquipmentGroupList',
                        data:{
                            type:type
                        },
                        success:function(data){
                            that.groupingdata = data.result
                        }
                    })
                }
            },
            //管理员选择分组chang事件
            groupingchange(){
                var that = this
                var type = '';
                if(this.sites[0].type=='0'){
                    type = '0';
                }
                if(this.sites[0].type=='1'){
                    type = '1';
                }
                if(this.sites[0].type=='2'){
                    type = '2';
                }
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentGroupList',
                    data:{
                        type:type,
                        departmentId:that.selectedOptions
                    },
                    success:function(data){
                        that.groupingdata = data.result
                    }
                })
            },
            //添加保存分组
            groupingsave(){
                var that = this;
                var type = '';
                var data = {};
                if(this.sites[0].type=='0'){
                    type = '0';
                }
                if(this.sites[0].type=='1'){
                    type = '1';
                }
                if(this.sites[0].type=='2'){
                    type = '2';
                }
                data.type = type;
                data.groupName = that.names;
                data.model = that.hardwareVersion;
                data.softwareVersion = that.softwareVersion;
                data.remark = that.groupingtextarea;
                if(sessionStorage.departmentId=='1'){
                    data.departmentId = that.selectedOptions
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/saveEquipmentGroup',
                    data:data,
                    success:function(data){
                        console.log(data)
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                            that.dialogVisible = false;
                            $.ajax({
                                type:'get',
                                async:true,
                                dataType:'json',
                                xhrFields:{withCredentials:true},
                                url:that.serverurl+'equipment/getEquipmentGroupList',
                                data:{
                                    type:type,
                                    departmentId:that.selectedOptions
                                },
                                success:function(data){
                                    that.groupingdata = data.result
                                }
                            })
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
                if(this.sites[0].type=='0'){
                    type = '0';
                }
                if(this.sites[0].type=='1'){
                    type = '1';
                }
                if(this.sites[0].type=='2'){
                    type = '2';
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/delEquipmentGroup',
                    data:{
                        type:type,
                        groupIds:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            alert(type)
                            $.ajax({
                                type:'get',
                                async:true,
                                dataType:'json',
                                xhrFields:{withCredentials:true},
                                url:that.serverurl+'equipment/getEquipmentGroupList',
                                data:{
                                    type:type,
                                    departmentId:that.selectedOptions
                                },
                                success:function(data){
                                    that.groupingdata = data.result
                                }
                            })
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
                if(this.sites[0].type='0'){
                    type = '0';
                }
                if(this.sites[0].type='1'){
                    type = '1';
                }
                if(this.sites[0].type='2'){
                    type = '2';
                }
                for(var i=0;i<this.sites.length;i++){
                    id.push(this.sites[i].id)
                }
                if(this.sitestwo.length==0||this.sitestwo.length>=2){
                    this.$message({
                        message:'请选取一个分组进行保存',
                        type:'error'
                    })
                    return;
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/setEquipmentGroup',
                    data:{
                        type:type,
                        groupId:that.sitestwo[0].id,
                        equipmentIds:id.join(',')
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
            //判断标签页change事件
            handleClick(tab){
                var that = this
                var TSBManage1 = '';
                var TSBManage2= '';
                var TSBManage3 = '';
                var TSBManage4 = '';
                if(this.activeName=='1'){
                    this.ready()
                    // clearInterval(TSBManage2);
                    // clearInterval(TSBManage3);
                    // clearInterval(TSBManage4);
                    // TSBManage1 = setInterval(function(){
                    //     that.ready();
                    // },10000)
                }
                if(this.activeName=='2'){
                    this.tsbgready()
                    this.sites = []
                    // clearInterval(TSBManage1);
                    // clearInterval(TSBManage3);
                    // clearInterval(TSBManage4);
                    // TSBManage2 = setInterval(function(){
                    //     that.tsbgready();
                    // },10000)
                }
                if(this.activeName=='3'){
                    this.tsbcready()
                    this.sites = []
                    // clearInterval(TSBManage1);
                    // clearInterval(TSBManage2);
                    // clearInterval(TSBManage4);
                    // TSBManage3 = setInterval(function(){
                    //     that.tsbcready();
                    // },10000)
                }
                if(this.activeName=='4'){
                    this.tsbaready()
                    this.sites = []
                    // clearInterval(TSBManage1);
                    // clearInterval(TSBManage2);
                    // clearInterval(TSBManage3);
                    // TSBManage4 = setInterval(function(){
                    //     that.tsbaready();
                    // },10000)
                }
            }
        },
        created(){
            this.handleClick();
        }
    }
</script>
<style scoped>
.required{color: red;}
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

