<template>
  <div class="TSBManage">
        <div class="TSBManage_nav">
            设备管理<i class="iconfont icon-icon"></i>TSB管理
            <el-cascader
                :options="optionsAreaId"
                v-model="selectedOptionsArea"
                :props="propsArea"
                clearable	
                style="line-height:20px;"
                :show-all-levels="false"
                :change-on-select='changeonselect'
                @change="handleChange">
            </el-cascader>
        </div>
        <div class="TSBManage_main">
            <el-tabs v-model.lazy="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="所有" name='1' style="height:100%;">
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>产品型号:</span>
                            <input type="text" v-model.lazy="username" maxlength="20" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入产品型号">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>MAC:</span>
                            <input type="text" v-model.lazy="userIP" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入MAC">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model.lazy="value" size='small' clearable placeholder="请选择">
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
                            max-height='630'
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备图片"
                            width="160">
                                <template scope="scope">
                                    <span v-if="scope.row.imageUrl==''">
                                        <img src='data:image/jpeg;base64,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' alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                    <span v-else>
                                        <img :src=serverurl+scope.row.imageUrl alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备名称"
                            width="165">
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
                            align='center'
                            label="设备MAC"
                            width="165">
                            </el-table-column>
                            <el-table-column
                            prop="wanIP"
                            label="IP地址"
                            align='center'
                            width="150">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="80">
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
                            prop="areaName"
                            label="区域"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="productModel"
                            label="产品型号"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="190">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="运行时间"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="departmentName"
                            align='center'
                            label="归属组织"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="groupName"
                            align='center'
                            label="归属分组"
                            width="120">
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
                            @current-change="currentchange1"
                            :current-page="pageIndex1"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TSBG" name='2'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>产品型号:</span>
                            <input type="text" v-model.lazy="username" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入产品型号">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>MAC:</span>
                            <input type="text" v-model.lazy="userIP" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入MAC">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model.lazy="value" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="search" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                        <el-button v-if="groupingtype" type="primary" @click="machinegrouping" icon='document' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBG设备分组</el-button>
                        <el-button v-if="groupingtypeadd" @click="affiliation(2)" type="primary" size="mini" style="margin:4px 5px;height:29px;font-size:15px;">设备归属</el-button>
                        <el-button v-if="groupingtypedelete" @click="removeequipment" type='primary' size='small' style="margin:4px 5px;height:29px;font-size:15px;">删除设备</el-button>
                    </div>
                    <!-- 设备列表 -->
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="data"
                            border
                            stripe
                            tooltip-effect="dark"
                            max-height='630'
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备图片"
                            width="160">
                                <template scope="scope">
                                    <span v-if="scope.row.imageUrl==''">
                                        <img src='data:image/jpeg;base64,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' alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                    <span v-else>
                                        <img :src=serverurl+scope.row.imageUrl alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备名称"
                            width="160">
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
                            prop="areaName"
                            label="区域"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="设备MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="wanIP"
                            label="IP地址"
                            align='center'
                            width="150">
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            align='center'
                            width="80">
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
                            prop="productModel"
                            label="产品型号"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="175">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="运行时间"
                            align='center'
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="departmentName"
                            align='center'
                            label="归属组织"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="groupName"
                            align='center'
                            label="归属分组"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button v-if="configurationtype" @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button v-if="managetype" @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
                            @size-change="sizechange"
                            @current-change="currentchange2"
                            :current-page="pageIndex2"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TSBC" name='3'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>产品型号:</span>
                            <input type="text" v-model.lazy="username" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入产品型号">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>MAC:</span>
                            <input type="text" v-model.lazy="userIP" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入MAC">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model.lazy="value" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="search" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                        <el-button v-if="groupingtype" type="primary" @click="machinegrouping" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBC设备分组</el-button>
                        <el-button v-if="groupingtypeadd" @click="affiliation(3)" type="primary" size="mini" style="margin:4px 5px;height:29px;font-size:15px;">设备归属</el-button>
                        <el-button v-if="groupingtypedelete" @click="removeequipment" type='primary' size='small' style="margin:4px 5px;height:29px;font-size:15px;">删除设备</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="data"
                            border
                            stripe
                            tooltip-effect="dark"
                            max-height='630'
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备图片"
                            width="160">
                                <template scope="scope">
                                    <span v-if="scope.row.imageUrl==''">
                                        <img src='data:image/jpeg;base64,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' alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                    <span v-else>
                                        <img :src=serverurl+scope.row.imageUrl alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备名称"
                            width="160">
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
                            prop="areaName"
                            label="区域"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="tsbgMAC"
                            align='center'
                            label="TSBG设备MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="设备MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="wanIP"
                            label="IP地址"
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
                            prop="productModel"
                            label="产品型号"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="190">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="运行时间"
                            align='center'
                            width="220">
                            </el-table-column>
                            <el-table-column
                            prop="departmentName"
                            align='center'
                            label="归属组织"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="groupName"
                            align='center'
                            label="归属分组"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button v-if="configurationtype" @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button v-if="managetype" @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
                            @size-change="sizechange"
                            @current-change="currentchange3"
                            :current-page="pageIndex3"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TSBA" name='4'>
                    <div class="TSBManage_main_top">
                        <div class="TSBManage_formtwo">
                            <span>产品型号:</span>
                            <input type="text" v-model.lazy="username" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')" placeholder="请输入产品型号">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>MAC:</span>
                            <input type="text" v-model.lazy="userIP" maxlength="30" minlength="3" class="form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入MAC">
                        </div>
                        <div class="TSBManage_formtwo">
                            <span>状态:</span>
                            <el-select v-model.lazy="value" size='small' clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsone"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button type="primary" @click="search" icon='search' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">搜索</el-button>
                        <el-button v-if="groupingtype" type="primary" @click="machinegrouping" icon='document ' size="mini" style="margin:4px 5px;height:29px;font-size:15px;">TSBA设备分组</el-button>
                        <el-button v-if="groupingtypeadd" @click="affiliation(4)" type="primary" size="mini" style="margin:4px 5px;height:29px;font-size:15px;">设备归属</el-button>
                        <el-button v-if="groupingtypedelete" @click="removeequipment" type='primary' size='small' style="margin:4px 5px;height:29px;font-size:15px;">删除设备</el-button>
                    </div>
                    <div class="TSBManage_main_bottom">
                        <el-table
                            ref="multipleTable"
                            :data="data"
                            border
                            stripe
                            tooltip-effect="dark"
                            max-height='630'
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-bottom:10px;">
                            <el-table-column
                            type="selection"
                            align='center'
                            width="55">  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备图片"
                            width="160">
                                <template scope="scope">
                                    <span v-if="scope.row.imageUrl==''">
                                        <img src='data:image/jpeg;base64,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' alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                    <span v-else>
                                        <img :src=serverurl+scope.row.imageUrl alt="" style="max-width:80px;min-width:40px;max-height:40px;">
                                    </span>
                                </template>  
                            </el-table-column>
                            <el-table-column
                            align='center'
                            label="设备名称"
                            width="165">
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
                            prop="areaName"
                            label="区域"
                            align='center'
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="tsbgMAC"
                            align='center'
                            label="TSBG设备MAC"
                            width="160">
                            </el-table-column>
                            <el-table-column
                            prop="MAC"
                            align='center'
                            label="设备MAC"
                            width="165">
                            </el-table-column>
                            <el-table-column
                            prop="wanIP"
                            label="IP地址"
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
                            prop="productModel"
                            label="产品型号"
                            align='center'
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="softwareVersion"
                            label="软件版本"
                            align='center'
                            width="175">
                            </el-table-column>
                            <el-table-column
                            prop="timeRun"
                            label="运行时间"
                            align='center'
                            width="220">
                            </el-table-column>
                            <el-table-column
                            prop="departmentName"
                            align='center'
                            label="归属组织"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="groupName"
                            align='center'
                            label="归属分组"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            align='center'
                            width="210">
                                <template scope="scope">
                                    <el-button @click="LookoverModal(scope.row)" type="primary" size="small">查看</el-button>
                                    <el-button v-if="configurationtype" @click="allocationModal(scope.row)" type="primary" size="small">配置</el-button>
                                    <el-button v-if="managetype" @click="administerModal(scope.row)" type="primary" size="small">管理</el-button>
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
                            @size-change="sizechange"
                            @current-change="currentchange4"
                            :current-page="pageIndex4"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
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
                            <div style="width:100%;">
                                    <el-table
                                    ref="multipleTable"
                                    :data="groupingdata"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                                    @selection-change="groupingsaveChange">
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
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="remark"
                                    label="备注"
                                    align='center'>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button @click="groupingsavetwo" type="button" class="btn btn-primary tsbgmyModalPreservation">保存</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div><!-- /.modal -->
            <!-- 归属分组模态框 -->
            <div class="modal fade" id="affiliationgrouping" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:600px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">归属分组</h4>
                        </div>
                        <div class="modal-body">
                            <div style="width:100%;margin-top:10px;">
                                <el-table
                                    :data="affiliationdata"
                                    border
                                    stripe
                                    tooltip-effect="dark"
                                    style="width: 100%;height:auto;max-height:85%;overflow:auto;margin-bottom:10px;"
                                    @selection-change="affiliationChange">
                                    <el-table-column
                                    type="selection"
                                    align='center'
                                    width="55">  
                                    </el-table-column>
                                    <el-table-column
                                    prop="departmentName"
                                    align='center'
                                    label="设备分组名称"
                                    width="160">
                                    </el-table-column>
                                    <el-table-column
                                    prop="phone"
                                    label="电话"
                                    align='center'
                                    width="130">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align='center'>
                                    </el-table-column>
                                </el-table>
                                <div class="block">
                                    <el-pagination
                                    @size-change="affiliationsizechange"
                                    @current-change="affiliationcurrentchange"
                                    :current-page="affiliationpageIndex"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="affiliationpageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="affiliationtotal">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button @click="affiliationadd" type="button" class="btn btn-primary">保存</button>
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
                            <div v-if="lookoverType=='0'" class="basicstatus" style="padding-bottom:1px">
                                <div class="state">
                                    <div>
                                        <!-- <template> -->
                                            <div v-if="lookdata.lan1State=='1'" style="background:#00FF00;"></div>
                                            <div v-else-if="lookdata.lan1State=='0'" style="background:#FFFFFF;"></div>
                                            <div v-else-if="lookdata.lan1State=='2'" style="background:#666666;"></div>
                                        <!-- /* </template> */ -->
                                        <div>LAN1</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan2State=='1'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan2State=='0'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan2State=='2'" style="background:#666666;"></div>
                                        <div>LAN2</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan3State=='1'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan3State=='0'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan3State=='2'" style="background:#666666;"></div>
                                        <div>LAN3</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan4State=='1'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan4State=='0'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan4State=='2'" style="background:#666666;"></div>
                                        <div>LAN4</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan5State=='1'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan5State=='0'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan5State=='2'" style="background:#666666;"></div>
                                        <div>WAN1</div>
                                    </div>
                                    <div>
                                        <div v-if="lookdata.lan6State=='1'" style="background:#00FF00;"></div>
                                        <div v-else-if="lookdata.lan6State=='0'" style="background:#FFFFFF;"></div>
                                        <div v-else-if="lookdata.lan6State=='2'" style="background:#666666;"></div>
                                        <div>WAN2</div>
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
                                                <td>软件型号:</td>
                                                <td>{{lookdata.model}}</td>
                                                <td>软件版本</td>
                                                <td>{{lookdata.softwareVersion}}</td>
                                            </tr>
                                            <tr>
                                                <td>启动时间:</td>
                                                <td>{{lookdata.startTime}}</td>
                                                <td>MAC地址:</td>
                                                <td>{{lookdata.MAC}}</td>
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
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wanIP}}</td>
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
                            <div v-if="lookoverType=='1'" class="basicstatus" style="padding-bottom:1px">
                                <div class="basicstatus_top">
                                    基本信息
                                </div>
                                <div class="basicstatus_center"></div>
                                <div class="basicstatus_bottom">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>软件型号:</td>
                                                <td>{{lookdata.model}}</td>
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
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wanIP}} </td>
                                                <td>连接链路:</td>
                                                <td>{{lookdata.currentLink}} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top" v-if="lookoverstatus.wifi2G=='1'"> 
                                    RADIO(2G)
                                </div>
                                <div class="basicstatus_center" v-if="lookoverstatus.wifi2G=='1'"></div>
                                <div class="basicstatus_bottom" v-if="lookoverstatus.wifi2G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>工作模式:</td>
                                                <td>{{lookdata.wifi2WorkMode}}</td>
                                                <td>信道</td>
                                                <td>
                                                    <span v-if="lookdata.wifi2ApChannel=='0'">auto</span>
                                                    <span v-else>{{lookdata.wifi2ApChannel}}</span>
                                                </td>
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
                                <div class="basicstatus_top" v-if="lookoverstatus.wifi5G=='1'">
                                    RADIO(5G)
                                </div>
                                <div class="basicstatus_center" v-if="lookoverstatus.wifi5G=='1'"></div>
                                <div class="basicstatus_bottom" v-if="lookoverstatus.wifi5G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>工作模式:</td>
                                                <td>{{lookdata.wifi5WorkMode}}</td>
                                                <td>信道</td>
                                                <td>
                                                    <span v-if="lookdata.wifi5ApChannel=='0'">auto</span>
                                                    <span v-else>{{lookdata.wifi5ApChannel}}</span>
                                                </td>
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
                                <div class="basicstatus_top" v-if="lookoverType=='1'&&lookoverlan==true">
                                    网络设置
                                </div>
                                <div class="basicstatus_center" v-if="lookoverType=='1'&&lookoverlan==true"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='1'&&lookoverlan==true">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>IP类型:</td>
                                                <td>{{lookdata.ipType}}</td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wanIP}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='STATIC'">
                                                <td>子网掩码:</td>
                                                <td>{{lookdata.wanSubnetmask}} </td>
                                                <td>网关:</td>
                                                <td>{{lookdata.wanGateway}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='STATIC'">
                                                <td>首选DNS:</td>
                                                <td>{{lookdata.wanDNS1}} </td>
                                                <td>备选DNS:</td>
                                                <td>{{lookdata.wanDNS2}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='PPPOE'">
                                                <td>用户名:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wanPPPoEUsername}} </td>
                                                <td>密码:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wanPPPoEPassword}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='PPPOE'">
                                                <td>DNS1:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wanPPPoEDNS1}} </td>
                                                <td>DNS2:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wanPPPoEDNS2}} </td>
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
                                                <td>软件型号:</td>
                                                <td>{{lookdata.model}}</td>
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
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wanIP}} </td>
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
                                <div class="basicstatus_top" v-if="lookoverType=='2'&&lookoverstatus.wifi2G=='1'">
                                    RADIO(2.4G)
                                </div>
                                <div class="basicstatus_center" v-if="lookoverType=='2'&&lookoverstatus.wifi2G=='1'"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='2'&&lookoverstatus.wifi2G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>信道:</td>
                                                <td>
                                                    <span v-if="lookdata.wifi2Channel=='0'">auto</span>
                                                    <span v-else>{{lookdata.wifi2Channel}}</span>
                                                </td>
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
                                <div class="basicstatus_top" v-if="lookoverType=='2'&&lookoverstatus.wifi5G=='1'">
                                    RADIO(5.8G)
                                </div>
                                <div class="basicstatus_center" v-if="lookoverType=='2'&&lookoverstatus.wifi5G=='1'"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='2'&&lookoverstatus.wifi5G=='1'">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>信道:</td>
                                                <td>
                                                    <span v-if="lookdata.wifi5Channel=='0'">auto</span>
                                                    <span v-else>{{lookdata.wifi5Channel}}</span>
                                                </td>
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
                                <div class="basicstatus_top" v-if="lookoverType=='2'&&lookoverstatus.doubleWifi!=''">双SSID配置</div>
                                <div class="basicstatus_center" v-if="lookoverType=='2'&&lookoverstatus.doubleWifi!=''"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='2'&&lookoverstatus.doubleWifi!=''">
                                    <span v-if="lookoverstatus.wifi2G=='1'">2.4G</span>
                                    <table class="table table-bordered" v-if="lookoverstatus.wifi2G=='1'">
                                        <tbody>
                                            <tr>
                                                <td>ssid:</td>
                                                <td>
                                                    <span>{{lookdata.doubleWifi2SSID}}</span>
                                                </td>
                                                <td>加密方式</td>
                                                <td>
                                                    <span v-if="lookdata.doubleWifi2EncryptionMode=='0'">NONE</span>
                                                    <span v-if="lookdata.doubleWifi2EncryptionMode=='1'">WPA2</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>认证秘钥:</td>
                                                <td>{{lookdata.doubleWifi2KeyAuth}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <span v-if="lookoverstatus.wifi5G=='1'">5.8G</span>
                                    <table class="table table-bordered" v-if="lookoverstatus.wifi5G=='1'">
                                        <tbody>
                                            <tr>
                                                <td>ssid:</td>
                                                <td>
                                                    <span>{{lookdata.doubleWifi5SSID}}</span>
                                                </td>
                                                <td>加密方式</td>
                                                <td>
                                                    <span v-if="lookdata.doubleWifi5EncryptionMode=='0'">NONE</span>
                                                    <span v-if="lookdata.doubleWifi5EncryptionMode=='1'">WPA2</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>认证秘钥:</td>
                                                <td>{{lookdata.doubleWifi5KeyAuth}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top" v-if="lookoverType=='2'&&lookoverstatus.portal!=''">portal认证</div>
                                <div class="basicstatus_center" v-if="lookoverType=='2'&&lookoverstatus.portal!=''"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='2'&&lookoverstatus.portal!=''">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>认证IP:</td>
                                                <td>
                                                    <span>{{lookdata.portalIP}}</span>
                                                </td>
                                                <td>端口1</td>
                                                <td>
                                                    {{lookdata.portalPortHttp}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>端口2:</td>
                                                <td>{{lookdata.portalPortHttps}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="basicstatus_top" v-if="lookoverType=='2'&&lookoverlan==true">
                                    网络设置
                                </div>
                                <div class="basicstatus_center" v-if="lookoverType=='2'&&lookoverlan==true"></div>
                                <div class="basicstatus_bottom" v-if="lookoverType=='2'&&lookoverlan==true">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>IP类型:</td>
                                                <td>{{lookdata.ipType}}</td>
                                                <td>IP地址:</td>
                                                <td>{{lookdata.wanIP}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='STATIC'">
                                                <td>子网掩码:</td>
                                                <td>{{lookdata.wanSubnetmask}} </td>
                                                <td>网关:</td>
                                                <td>{{lookdata.wanGateway}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='STATIC'">
                                                <td>首选DNS:</td>
                                                <td>{{lookdata.wanDNS1}} </td>
                                                <td>备选DNS:</td>
                                                <td>{{lookdata.wanDNS2}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='PPPOE'">
                                                <td>用户名:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wanPPPoEUsername}} </td>
                                                <td>密码:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wanPPPoEPassword}} </td>
                                            </tr>
                                            <tr v-if="lookdata.ipType=='PPPOE'">
                                                <td>DNS1:</td>
                                                <td>{{lookdata.wifi5SendPackage}}/{{lookdata.wanPPPoEDNS1}} </td>
                                                <td>DNS2:</td>
                                                <td>{{lookdata.wifi5ReceivePackage}}/{{lookdata.wanPPPoEDNS2}} </td>
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
                                <h4 class="modal-title" id="myModalLabel">设备配置</h4>
                            </div>
                            <div class="modal-body">
                                <el-collapse v-model.lazy="activeNames" accordion>
                                    <el-collapse-item v-if="lookoverType=='0'&&lookoverlan==true" title="WAN配置" name="2" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            IP类型:
                                            <select v-model.lazy="tsbgcollcate.ipType" style="width:168px;">
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
                                                        <td><input type="text" v-model="tsbgcollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>网关:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>主DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>辅DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbgcollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>用户名:</td>
                                                        <td>
                                                            <input type="text" v-model="tsbgcollcate.wanPPPoEUsername" placeholder="请输入PPPoE用户名" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')">
                                                        </td>
                                                        <td><i class="required">*</i>密码:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPoE密码" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>DNS1:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEDNS1" placeholder="请输入DNS1" class="inputType form-control logManage_main_input" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>DNS2:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入DNS2" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverType=='0'&&lookoverstatus.LAN=='1'" title="LAN配置" name="3" style="text-align:left;">
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>IP地址:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanIp" placeholder="请输入IP地址" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                                        <td><input type="text" v-model.lazy="tsbgcollcate.lanEndAddress" class="inputType form-control logManage_main_input" placeholder="请输入结束地址" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>网关地址:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关地址" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>主DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>辅DNS:</td>
                                                        <td><input type="text" v-model="tsbgcollcate.lanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
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
                                    <el-collapse-item v-if="lookoverType=='1'&&lookoverstatus.wifi2G=='1'" title="2.4G配置" name="5" style="text-align:left;">
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApSSID" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                                        <td><i v-if="tsbccollcate.wifi2ApEncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi2ApKeyAuth" type="text" class="tsbc2GinputAP inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaSSID" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi2StaKeyAuth" type="text" class="tsbc2GinputSta inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <!-- <tr>
                                                        <td><i class="required">*</i>优先级</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi2StaPriority" style="width:110px;height:29px;">
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
                                    <el-collapse-item v-if="lookoverType=='1'&&lookoverstatus.wifi5G=='1'" title="5.8G配置" name="6" style="text-align:left;">
                                        <!-- tsbc WIFI设置(5G)-->
                                        <div class="basicstatus_top">
                                            <div>
                                                <el-radio-group v-model.lazy="tsbccollcate.wifi5Enable" @change="TSBCwifi5Enable5G">
                                                    <el-radio :label="1">启用</el-radio>
                                                    <el-radio :label="0">不启用</el-radio>
                                                </el-radio-group>
                                            </div>
                                            工作模式:
                                            <select v-model.lazy="tsbccollcate.wifi5WorkMode" @change="tsbcwifi2WorkMode5g">
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApSSID" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi5ApKeyAuth" type="text" class="tsbc5GinputAP inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>隐藏SSID</td>
                                                        <td>
                                                            <el-radio-group v-model.lazy="tsbccollcate.wifi5ApHideSSID">
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
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaSSID" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" placeholder="请输入SSID" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbccollcate.wifi5StaEncryptionMode" class="tsbc5GselectSta" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA/WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbccollcate.wifi5StaEncryptionMode=='1'" class="required">*</i>认证秘钥</td>
                                                        <td><input v-model.lazy="tsbccollcate.wifi5StaKeyAuth" type="text" class="tsbc5GinputSta inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" maxlength="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                    <el-collapse-item v-if="lookoverType=='1'&&lookoverlan==true||lookoverType=='2'&&lookoverlan==true" title="网络设置" name="7" style="text-align:left;">
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
                                                        <td><i class="required">*</i>IP地址</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanIP" class="inputType form-control logManage_main_input" placeholder="请输入ip地址" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td><i class="required">*</i>子网掩码:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanSubnetmask" class="inputType form-control logManage_main_input" placeholder="请输入子网掩码" min="1" maxlength="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>主DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS1" class="inputType form-control logManage_main_input" placeholder="请输入主DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>辅DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>网关:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanGateway" class="inputType form-control logManage_main_input" placeholder="请输入网关" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="tsbctsbacaollcate.ipType=='PPPOE'" class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                       <td><i class="required">*</i>用户名:</td>
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEUsername" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE用户名" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td> 
                                                       <td><i class="required">*</i>密码:</td> 
                                                       <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEPassword" class="inputType form-control logManage_main_input" placeholder="请输入PPPOE密码" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>  
                                                    </tr>
                                                    <tr>
                                                        <td>主DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS1" placeholder="请输入主DNS" class="inputType form-control logManage_main_input" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                        <td>辅DNS:</td>
                                                        <td><input type="text" v-model.lazy="tsbctsbacaollcate.wanPPPoEDNS2" class="inputType form-control logManage_main_input" placeholder="请输入辅DNS" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/[^\u4e00-\u9fa5\w\.\*\-]/g,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.wifi2G=='1'" title="2.4G配置" name="8" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi2Enable" @change="TSBAwifi2Enable2G">
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
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2SSID" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi2KeyAuth" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.wifi5G=='1'" title="5.8G配置" name="9" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model.lazy="tsbacaollcate.wifi5Enable" @change="TSBAwifi5Enable5G">
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
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5SSID" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>信道带宽:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.wifi5Bandwidth" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="HT20">HT20</option>
                                                                <option value="HT40">HT40</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>信道</td>
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
                                                        <td><input type="text" v-model.lazy="tsbacaollcate.wifi5KeyAuth" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
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
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.doubleWifi!=''" title="双SSID配置" name="11" style="text-align:left;">
                                        <div class="basicstatus_top" v-if="lookoverstatus.wifi2G=='1'">2.4G配置(<i style='color:red;'>此处启用禁用规则跟随上方配置</i>)</div>
                                        <div class="basicstatus_center" v-if="lookoverstatus.wifi2G=='1'"></div>
                                        <div class="basicstatus_bottom" v-if="lookoverstatus.wifi2G=='1'">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi2SSID" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.doubleWifi2EncryptionMode" class="tsba2Gselect" style="width:110px;height:29px;">
                                                                <option value="0" selected>NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbacaollcate.doubleWifi2EncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi2KeyAuth" class="tsba2Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="basicstatus_top" v-if="lookoverstatus.wifi5G=='1'">5.8G配置(<i style='color:red;'>此处启用禁用规则跟随上方配置</i>)</div>
                                        <div class="basicstatus_center" v-if="lookoverstatus.wifi5G=='1'"></div>
                                        <div class="basicstatus_bottom" v-if="lookoverstatus.wifi5G=='1'">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>ssid:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi5SSID" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入ssid" min="1" max="32" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>加密方式:</td>
                                                        <td>
                                                            <select v-model.lazy="tsbacaollcate.doubleWifi5EncryptionMode" class="tsba5Gselect" style="width:110px;height:29px;">
                                                                <option value="0">NONE</option>
                                                                <option value="1">WPA2</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><i v-if="tsbacaollcate.doubleWifi5EncryptionMode=='1'" class="required">*</i>认证秘钥:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.doubleWifi5KeyAuth" class="tsba5Ginput inputType form-control logManage_main_input" placeholder="请输入认证秘钥" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverType=='2'&&lookoverstatus.portal!=''" title="portal认证" name='12' style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <el-radio-group v-model.lazy="tsbacaollcate.portalEnable" @change="portalEnable">
                                                <el-radio :label="1">启用</el-radio>
                                                <el-radio :label="0">不启用</el-radio>
                                            </el-radio-group>
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <td><i class="required">*</i>认证IP:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalIP" class="portalIP inputType form-control logManage_main_input" placeholder="请输入认证IP" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                        <td><i class="required">*</i>端口1:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalPortHttp" class="portalPortHttp inputType form-control logManage_main_input" placeholder="请输入端口" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                    <tr>
                                                        <td><i class="required">*</i>端口2:</td>
                                                        <td><input type="text" v-model="tsbacaollcate.portalPortHttps" class="portalPortHttps inputType form-control logManage_main_input" placeholder="请输入端口" min="6" max="64" onkeyup="this.value=this.value.replace(/\s+/g,'').replace(/^[\u4E00-\u9FA5]{1,10}$/,'')"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item v-if="lookoverstatus.blackWhiteList=='1'" title="黑白名单设置" name="10" style="text-align:left;">
                                        <div class="basicstatus_top">
                                            <select v-model.lazy="panel">
                                                <option value="1">黑名单</option>
                                                <option value="0">白名单</option>
                                            </select>
                                            <el-button @click="paaelMACS" type="primary" size='small' style="margin-left:15px;">添加</el-button>
                                            <div style="display:inline-block;" v-if="paaelMAC">
                                                <el-input v-model.lazy="panelinput" size='small' maxlength=17 style="width:156px;margin-left:15px;" placeholder="请输入MAC"></el-input>
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
                                <button @click="deploysave('1')" type="button" class="btn btn-default allocationModalPreservation">保存并下发</button>
                                <button @click="deploysave('0')" type="button" class="btn btn-primary allocationModalPreservations">保存</button>
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
                            <el-collapse v-model.lazy="activeNames" accordion>
                                <el-collapse-item title="设备信息" name="0" style="text-align:left;">
                                    <div>
                                        <span>设备昵称:</span>
                                        <input v-model.lazy="managedata.nickname" type="text" placeholder="请输入设备昵称" style="width:146px;display:inline-block;" class="form-control logManage_main_input">
                                    </div>
                                    <div>
                                        <span>备注信息:</span>
                                        <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model.lazy="managedata.remark">
                                        </el-input>
                                    </div>
                                    <el-button @click="configurationsave(0)" :loading="Preservation0" type="primary" size='small' style="margin-top:5px;margin-left:10px;">保存</el-button>
                                </el-collapse-item>
                                <el-collapse-item title="固件管理" name="1" style="text-align:left;">
                                    <div class='basicstatus_top'>
                                        <span>选择升级包:</span>
                                        <el-select v-model.lazy="managevalue" size='small' clearable placeholder="请选择">
                                            <el-option
                                            v-for="item in manageoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div> 
                                    <div>
                                        <el-button @click="configurationsave(1)" :loading="Preservation1" type="primary" size='small' style="margin-top:5px;margin-left:10px;">升级包下发</el-button>
                                    </div>
                                    <div class="basicstatus_center"></div>
                                    <span>是否允许设备自动升级: </span>
                                    <el-radio-group v-model.lazy="managedata.AutoUpgrade">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                   <div>
                                        <el-button @click="configurationsave(4)" :loading="Preservation4" type="primary" size='small' style="margin-top:5px;margin-left:10px;">保存</el-button>
                                   </div>
                                </el-collapse-item>
                                <el-collapse-item title="设备操作" name="2" style="text-align:left;">
                                    <!-- tsbg设备重启 -->
                                    <div>
                                        <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                            <p>&#x3000&#x3000可按下下面按钮 强制设备重新启动</p>
                                        </div>
                                        <el-button @click="configurationsave(5)" size='small' type="primary" style="margin:10px 0 15px 0;">重启</el-button>
                                        <div class="basicstatus_top">
                                            重置
                                        </div>
                                        <div class="basicstatus_center"></div>
                                        <div class="basicstatus_bottom" style="text-align:left;padding-left:20px;">
                                            <p>&#x3000&#x3000可按下下面按钮 重置设备</p>
                                        </div>
                                        <el-button @click="configurationsave(6)" size='small' type="primary" style="margin:10px 0 15px 0;">重置</el-button>
                                        <div class="basicstatus_center"></div>
                                        <p style="text-align:left;">注意：在设备重启期间，请不要将设备断电</p>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item title="模板管理" name="3" style="text-align:left;">
                                    <div class="basicstatus_bottom">
                                       <el-checkbox v-model.lazy="managedata.upgrade">允许设备自动匹配模板</el-checkbox>
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
                //区域
                optionsAreaId:[],
                selectedOptionsArea:[],
                propsArea:{
                    value: 'areaDepartmentId',
                    children: 'groups',
                    label:'label',
                },
                changeonselect:true,
                tsbc2Gradio:false,
                tsbc5Gradio:false,
                tsba2Gradio:false,
                tsba5Gradio:false,
                maxPower2G:[], //2G发射功率
                maxPower5G:[],  //5G发射功率
                //按钮权限
                configurationtype:false, //设备配置
                managetype:false,  //设备管理
                groupingtype:false, //设备分组
                groupingtypeadd:false, //设备归属
                groupingtypedelete:false, //删除设备
                //归属分组数据
                affiliationgrouping:false,
                affiliationdata:[],
                affiliationupload:[],//归属分组选中的分组
                affiliationpageIndex:1,
                affiliationpageSize:10,
                affiliationtotal:10,
                serverurl:localStorage.serverurl,       
                activeName:'1',
                activeNamevalue:'',
                
                data:[],
                total:10,
                pageSize:10,
                pageIndex1:1,
                pageIndex2:1,
                pageIndex3:1,
                pageIndex4:1,
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

                optionsone:[{value:'0',label:'离线'},{value:'1',label:'在线'}],
                DHCPchecked:true,
                tsbguploaddata:[],
                templatechecked:false,
                            
                radio:'2',
                tsbginput:'',
                upgradeoptions:[{value:'0',label:'HT20'},{value:'1',label:'HT40'}],
                templatechecked:true,

                //tsbc,tsba,黑白名单
                panelTable:[], //白名单
                panelTabletwo:[], //黑名单
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
                    wifi2ApChannel:'0',
                    wifi2ApLaunchPower:'1',
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

                    portalEnable:1,
                    portalIP:'',
                    portalPortHttp:'',
                    portalPortHttps:'',
                },//tsba配置数据
                configuration:[],//配置选中的数据
                showconfigdata:{},//接口返回成功的数据
                managedata:{
                    nickname:'',
                    remark:'',
                    AutoUpgrade:'0',
                    upgrade:true,
                },
                // 上传设备图片
                imgCropperData:{
                    accept: 'image/gif, image/jpeg, image/png, image/bmp',
                    maxSize: 5242880,
                    file: null, //上传的文件
                    imgSrc: '', //读取的img文件base64数据流
                },
                Preservation0:false,
                Preservation1:false,
                Preservation4:false
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
                                if(data.result[i].code=='cofEquipment'){
                                    that.configurationtype = true
                                }
                                if(data.result[i].code=='setEquipment'){
                                    that.managetype = true
                                }
                                if(data.result[i].code=='setGroup'){
                                    that.groupingtype = true
                                }
                                if(data.result[i].code=='setDepartment'){
                                    if(sessionStorage.departmentId=='1'){
                                        that.groupingtypeadd = true
                                    }
                                }
                                if(data.result[i].code=='delEquipment'){
                                    that.groupingtypedelete = true
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
            //区域change事件
            handleChange(val){
                this.selectedOptionsArea = val;
                console.log(val)
                this.ready()
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
            //portalEnable 启用不启用事件
            portalEnable(){
                if(this.tsbacaollcate.portalEnable=='0'){
                    $('.portalIP').attr("disabled","disabled");
                    $('.portalPortHttp').attr("disabled","disabled");
                    $('.portalPortHttps').attr("disabled","disabled");
                }else{
                    $('.portalIP').removeAttr("disabled","disabled");
                    $('.portalPortHttp').removeAttr("disabled","disabled");
                    $('.portalPortHttps').removeAttr("disabled","disabled");
                }
            },
            //所有条数事件
            sizechange(val){
                this.pageSize = val
                this.ready()
            }, 
            //所有页数事件
            currentchange1(val){
                this.pageIndex1 = val
                this.ready()
            },
            currentchange2(val){
                this.pageIndex2 = val
                this.ready()
            },
            currentchange3(val){
                this.pageIndex3 = val
                this.ready()
            },
            currentchange4(val){
                this.pageIndex4 = val
                this.ready()
            },
            //页面数据渲染
            ready(){
                var that = this;
                var index = ''
                var length = that.selectedOptionsArea.length
                if(this.activeName=='1'){index=this.pageIndex1}
                if(this.activeName=='2'){index=this.pageIndex2}
                if(this.activeName=='3'){index=this.pageIndex3}
                if(this.activeName=='4'){index=this.pageIndex4}
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentList',
                    data:{
                        pageIndex:index,
                        pageSize:that.pageSize,
                        type:that.activeNamevalue,
                        model:that.username,
                        MAC:that.userIP,
                        online:that.value,
                        areaId:that.selectedOptionsArea[length-1]
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.data=data.rows
                            that.total = data.total
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //页面数据搜索
            search(){
                this.ready()
            },
            //页面数据删除
            removeequipment(){
                var that = this;
                var array = [];
                this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(that.sites.length=='0'){
                        this.$message({
                            type: 'error',
                            message: '请选取设备进行此操作!'
                        }); 
                        return;  
                    }
                    for(var i=0;i<that.sites.length;i++){
                        array.push(that.sites[i].id);
                    }
                    $.ajax({
                        type:'post',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'equipment/delEquipment',
                        data:{
                            equipmentIds:array.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功'
                                }); 
                                that.ready()
                            }else{
                                that.errorCode(data)
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
            //点击归属分组  
            affiliation(){
                var that = this
                if(that.sites.length==0){
                    that.$message({
                        message: '请选择数据进行归属分组!',
                        type: 'error'
                    })
                    return;
                }
                this.affiliationdatas()
            },
            //归属分组请求列表数据
            affiliationdatas(){
                var that = this
                var type='';
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'department/getDepartmentList',
                    data:{
                        pageIndex:that.affiliationpageIndex,
                        pageSize:that.affiliationpageSize
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.affiliationdata = data.rows
                            that.affiliationtotal = data.total
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                $('#affiliationgrouping').modal('show')
            },
            //归属分组条数事件
            affiliationsizechange(val){
                this.affiliationpageSize = val
                this.affiliationdatas()
            },
            //归属分组页数事件
            affiliationcurrentchange(val){
                this.affiliationpageIndex = val
                this.affiliationdatas()
            },
            //归属分组选中的分组事件
            affiliationChange(val){
                this.affiliationupload = val
            },
            //归属分组保存按钮
            affiliationadd(){
                var that = this;
                if(this.affiliationupload.length==0){
                    that.$message({
                        message: '请选择分组!',
                        type: 'error'
                    })
                    return;
                }
                if(this.affiliationupload.length>=2){
                    that.$message({
                        message: '请选择一个分组!',
                        type: 'error'
                    })
                    return;
                }
                var ids = [];
                for(var i=0;i<that.sites.length;i++){
                    ids.push(that.sites[i].id)
                }
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/setEquipmentDepartment',
                    data:{
                        type: that.sites[0].type,
                        equipmentIds: ids.join(','),
                        departmentId: that.affiliationupload[0].id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '归属分组成功!',
                                type: 'success'
                            })
                            $('#affiliationgrouping').modal('hide')
                            that.handleClick()
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //查看
            LookoverModal(val){
                var that = this;
                var url = '';
                this.lookoverType = val.type
                //权限接口
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        model:val.model,
                        type:val.type
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(data.result.length==0){
                                that.lookoverstatus = {}
                                that.lookoverlan = false
                                return false;
                            }else{
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
                    url:that.serverurl+'equipment/getEquipmentInfo',
                    data:{equipmentId:val.id},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.lookdata = data.result
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                $('#LookoverModal').modal('show')
            },
            //清空模板配置数据
            removedata(){
                var that = this;
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
            //配置
            allocationModal(val){
                var that = this;
                this.removedata()
                that.configuration = val
                var type = '';
                var url = '';
                that.showconfigdata = {};
                that.lookoverType = val.type
                //权限接口
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentModelInfo',
                    data:{
                        model:val.model,
                        type:val.type
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(data.result.length==0){
                                that.lookoverstatus = {}
                                that.lookoverlan = false
                                return false;
                            }else{
                                that.maxPower2G = []
                                that.maxPower5G = []
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
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                //配置基本数据请求
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentConfig',
                    data:{
                        id:val.id,
                        MAC:val.MAC
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            if(val.type=='0'){
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
                            }
                            if(val.type=='1'){
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
                                that.tsbccollcate.wifi2ApSSID = data.result.configInfo.wifi2ApSSID
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
                                    if(data.result.configInfo.wifi2ApLaunchPower>that.maxPower2G.length){
                                        that.tsbccollcate.wifi2ApLaunchPower = that.maxPower2G.length
                                    }else{
                                        that.tsbccollcate.wifi2ApLaunchPower = data.result.configInfo.wifi2ApLaunchPower
                                    }
                                }
                                if(data.result.configInfo.wifi2ApEncryptionMode=='0'||data.result.configInfo.wifi2ApEncryptionMode=='1'){
                                    that.tsbccollcate.wifi2ApEncryptionMode = data.result.configInfo.wifi2ApEncryptionMode
                                }else{
                                    that.tsbccollcate.wifi2ApEncryptionMode = '0'
                                }
                                if(data.result.configInfo.wifi2StaEncryptionMode==''||data.result.configInfo.wifi2StaEncryptionMode==undefined||data.result.configInfo.wifi2StaEncryptionMode==NaN){
                                    that.tsbccollcate.wifi2StaEncryptionMode = '0'
                                }else{
                                    that.tsbccollcate.wifi2StaEncryptionMode = data.result.configInfo.wifi2StaEncryptionMode
                                }
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
                                    that.tsbccollcate.wifi5ApLaunchPower = '1'
                                }else{
                                     if(data.result.configInfo.wifi5ApLaunchPower>that.maxPower5G.length){
                                        that.tsbccollcate.wifi5ApLaunchPower = that.maxPower5G.length
                                    }else{
                                        that.tsbccollcate.wifi5ApLaunchPower = data.result.configInfo.wifi5ApLaunchPower
                                    }
                                }
                                if(data.result.configInfo.wifi5ApEncryptionMode=='0'||data.result.configInfo.wifi5ApEncryptionMode=='1'){
                                    that.tsbccollcate.wifi5ApEncryptionMode = data.result.configInfo.wifi5ApEncryptionMode
                                }else{
                                    that.tsbccollcate.wifi5ApEncryptionMode = '0'
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
                            }
                            if(val.type=='2'){
                                that.radio2 = Number(data.result.templateType)
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
                                    if(data.result.configInfo.wifi2LaunchPower>that.maxPower2G.length){
                                        that.tsbacaollcate.wifi2LaunchPower = that.maxPower2G.length 
                                    }else{
                                        that.tsbacaollcate.wifi2LaunchPower = data.result.configInfo.wifi2LaunchPower
                                    }
                                }
                                if(data.result.configInfo.wifi2EncryptionMode=='0'||data.result.configInfo.wifi2EncryptionMode=='1'){
                                    that.tsbacaollcate.wifi2EncryptionMode = data.result.configInfo.wifi2EncryptionMode
                                }else{
                                    that.tsbacaollcate.wifi2EncryptionMode = '0'
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
                                    if(data.result.configInfo.wifi5LaunchPower>that.maxPower5G.length){
                                        that.tsbacaollcate.wifi5LaunchPower = that.maxPower5G.length 
                                    }else{
                                        that.tsbacaollcate.wifi5LaunchPower = data.result.configInfo.wifi5LaunchPower
                                    }
                                }
                                if(data.result.configInfo.wifi5EncryptionMode=='0'||data.result.configInfo.wifi5EncryptionMode=='1'){
                                    that.tsbacaollcate.wifi5EncryptionMode = data.result.configInfo.wifi5EncryptionMode
                                }else{
                                    that.tsbacaollcate.wifi5EncryptionMode = '0'
                                }
                                if(data.result.configInfo.wifi5HideSSID==''||data.result.configInfo.wifi5HideSSID==undefined||data.result.configInfo.wifi5HideSSID==NaN||data.result.configInfo.wifi5HideSSID=='80'){
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
                                        that.tsbacaollcate.portalEnable=0
                                    }else{
                                        that.tsbacaollcate.portalEnable = Number(data.result.configInfo.portalEnable)
                                    }
                                    that.tsbacaollcate.portalIP = data.result.configInfo.portalIP
                                    that.tsbacaollcate.portalPortHttp = data.result.configInfo.portalPortHttp
                                    that.tsbacaollcate.portalPortHttps = data.result.configInfo.portalPortHttps
                                // }
                            }
                            if(val.type=='1'||val.type=='2'){
                                that.panelTable = [];
                                that.panelTabletwo = [];
                                if(data.result.configInfo.listContent==''||data.result.configInfo.listContent==undefined||data.result.configInfo.listContent==NaN){
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
                            that.showconfigdata = data.result;
                            delete that.showconfigdata.order;
                            delete that.showconfigdata.configInfo;
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                if(val.type=='1'){
                    this.tsbccollcate.wifi2Enable = 1
                    this.tsbccollcate.wifi5Enable = 1
                    this.TSBCwifi2Enable2G()
                    this.TSBCwifi5Enable5G()
                }
                if(val.type=='2'){
                    this.tsbacaollcate.wifi2Enable = 1
                    this.tsbacaollcate.wifi5Enable = 1
                    this.TSBAwifi2Enable2G()
                    this.TSBAwifi5Enable5G()
                    this.portalEnable()
                }
                setTimeout(function(){
                    $('#allocationModal').modal('show')
                },200)
            },
            //管理
            administerModal(val){
                var that = this;
                $('#administerModal').modal('show');
                that.managevalue = '';
                this.lookoverType = val.type;
                this.configuration = val;
                var url = '';
                that.Preservation1 = false
                //固件管理升级报获取升级包
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'upgrade/getEquipmentUpgradeFileList',
                    data:{
                        equipmentId:val.id
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.manageoptions = data.result
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
                //获取基本数据
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/getEquipmentInfo',
                    data:{equipmentId:val.id},
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.managedata.nickname = data.result.nickname
                            that.managedata.remark = data.result.remark
                            that.managedata.AutoUpgrade = data.result.autoUpgrade
                            that.imgCropperData.imgSrc = data.result.imageBase64
                            if(data.result.autoConfig=='0'){
                                that.managedata.upgrade = false
                            }else{
                                that.managedata.upgrade = true
                            }
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //配置(模板)保存
            deploysave(val){
                var that = this;
                var url = '';
                var data = {};
                var array = [];
                var IP = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                //子网掩码
                var exp=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                //DNS
                var DNSS=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
                //中文验证
                var result = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                if(that.lookoverType=='0'){
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
                if(that.lookoverType=='1'){
                    if(that.lookoverstatus.wifi2G=='1'){
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
                    }
                    if(that.lookoverstatus.wifi5G=='1'){
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
                }
                if(that.lookoverType=='2'){
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
                    if(that.lookoverstatus.wifi2G=='1'){
                        if(this.tsbacaollcate.wifi2Enable=='1'){
                            if(that.tsbacaollcate.wifi2SSID==''||that.tsbacaollcate.wifi2LaunchPower==''||that.tsbacaollcate.wifi2EncryptionMode==''){
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
                    }
                    if(that.lookoverstatus.wifi5G=='1'){
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
                            if(that.tsbacaollcate.wifi5SSID==''||that.tsbacaollcate.wifi5LaunchPower==''||that.tsbacaollcate.wifi5EncryptionMode==''){
                                this.$message({
                                    message: '必填字段不能为空',
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
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.doubleWifi2EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.doubleWifi2KeyAuth==''){
                                        this.$message({
                                            message: '加密方式非NONE时,认证秘钥不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi2KeyAuth.length<8){
                                        this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.doubleWifi2KeyAuth)){
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
                        if(that.lookoverstatus.wifi5G=='1'){
                            if(this.tsbacaollcate.wifi5Enable=='1'){
                                if(that.tsbacaollcate.doubleWifi5SSID==''||that.tsbacaollcate.doubleWifi5EncryptionMode==''){
                                    this.$message({
                                        message: '必填字段不能为空',
                                        type: 'error',
                                        showClose: true,
                                    });
                                    return;
                                }
                                if(that.tsbacaollcate.doubleWifi5EncryptionMode=='0'){}else{
                                    if(that.tsbacaollcate.doubleWifi5KeyAuth==''){
                                        this.$message({
                                            message: '加密方式非NONE时,认证秘钥不能为空',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(that.tsbacaollcate.doubleWifi5KeyAuth.length<8){
                                        this.$message({
                                            message: '认证秘钥长度不能小于8位!',
                                            type: 'error',
                                            showClose: true,
                                        });
                                        return;
                                    }
                                    if(result.test(that.tsbacaollcate.doubleWifi5KeyAuth)){
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
                    if(that.lookoverstatus.portal=='1'){
                        if(that.tsbacaollcate.portalEnable=='0'){}else{
                            if(that.tsbacaollcate.portalIP==''||that.tsbacaollcate.portalPortHttp==''||that.tsbacaollcate.portalPortHttps==''){
                                this.$message({
                                    message: '必填字段不能为空',
                                    type: 'error',
                                    showClose: true,
                                });
                                return;
                            }
                            if(!IP.test(that.tsbacaollcate.portalIP)){
                                that.$message({
                                    message: '请输入正确的IP地址',
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
                            message: '模板配置错误,请重新配置',
                            type: 'error',
                            showClose: true,
                        });
                        return;
                    }
                    if(that.lookoverstatus.wifi2G=='1'){
                        if(that.tsbacaollcate.wifi2Enable=='0'||that.tsbacaollcate.wifi2Enable=='1'){

                        }else if(that.tsbacaollcate.wifi2Enable==''||that.tsbacaollcate.wifi2Enable==undefined||that.tsbacaollcate.wifi2Enable==NaN){
                            this.$message({
                                message: '模板配置错误,请重新配置',
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
                                message: '模板配置错误,请重新配置',
                                type: 'error',
                                showClose: true,
                            });
                            return;
                        }
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
                if(that.lookoverType=='2'){
                    url='equipment/saveConfigTsba'
                    $.extend(data,that.tsbacaollcate,that.tsbctsbacaollcate,that.showconfigdata)
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
                data.listType = that.panel;
                data.flag = val;
                data.id = that.configuration.id;
                data.departmentId = that.configuration.departmentId;
                data.model = that.configuration.model;
                data.MAC = that.configuration.MAC;
                $('.allocationModalPreservation').attr('disabled',true)
                $('.allocationModalPreservations').attr('disabled',true)
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+url,
                    data:data,
                    success:function(data){
                        $('.allocationModalPreservation').attr('disabled',false)
                        $('.allocationModalPreservations').attr('disabled',false)
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '模板配置成功',
                                type: 'success'
                            })
                            $('#allocationModal').modal('hide')
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },
            //管理保存
            configurationsave(val){
                var that = this;
                var url = '';
                var data = {};
                if(val=='0'){
                    data.flag = 'SAVE';
                    data.nickname = that.managedata.nickname
                    data.remark = that.managedata.remark
                    that.Preservation0 = true
                }
                if(val=='1'){
                    if(that.managevalue==''){
                        that.$message({
                            message: '请选择升级包',
                            type: 'error'
                        })
                        return;
                    }
                    data.upgradeFileId = that.managevalue
                    data.flag = 'UPGRADE';
                    that.Preservation1 = true
                }//升级包下发按钮
                if(val=='4'){
                    data.flag = 'AUTOUPGRADE';
                    data.autoUpgrade = that.managedata.AutoUpgrade
                    that.Preservation4 = true
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
                data.equipmentId = that.configuration.id;
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
                    url:that.serverurl+'equipment/equipmentOptions',
                    data:data,
                    success:function(data){
                        setTimeout(function(){
                            that.Preservation1 = false
                        },60000)
                        that.Preservation0 = false
                        that.Preservation4 = false
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
                            that.errorCode(data)
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
                $('#tsbgmyModal').modal('show')
                var array = [];
                for(var i=0;i<this.sites.length;i++){
                    array.push(this.sites[i].id)
                }
                setTimeout(function(){
                    $.ajax({
                        type:'get',
                        async:true,
                        dataType:'json',
                        xhrFields:{withCredentials:true},
                        url:that.serverurl+'equipment/getGroupByEquipment',
                        data:{
                            equipmentIds:array.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.groupingdata=data.result
                            }else{
                                that.errorCode(data)
                            }
                        }
                    })
                },200)
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
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                            that.dialogVisible = false;
                            that.ready()
                        }else{
                            that.errorCode(data)
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
                                    if(data.errorCode=='0'){
                                        that.groupingdata = data.result
                                    }else{
                                        that.errorCode(data)
                                    }
                                }
                            })
                        }else{
                            that.errorCode(data)
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
                $('.tsbgmyModalPreservation').attr('disabled',true)
                $.ajax({
                    type:'post',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'equipment/setEquipmentGroup',
                    data:{
                        groupId:that.sitestwo[0].id,
                        addEquipmentIds:id.join(',')
                    },
                    success:function(data){
                        $('.tsbgmyModalPreservation').attr('disabled',false)
                        if(data.errorCode=='0'){
                            that.$message({
                                message: '分组成功',
                                type: 'success'
                            })
                            $('#tsbgmyModal').modal('hide')
                            that.handleClick();
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            },

            //黑白名单
            paaelMACS(){
                this.paaelMAC = true;
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
            //判断标签页change事件
            handleClick(tab){
                var that = this
                this.pageSize = 10;
                this.pageIndex1 = 1;
                this.pageIndex2 = 1;
                this.pageIndex3 = 1;
                this.pageIndex4 = 1;
                that.username = '';
                that.userIP = '';
                that.value = '';
                that.sites = [];
                if(this.activeName=='1'){
                    that.activeNamevalue = ''
                    this.ready()
                    clearInterval(window.TSBManage1);
                    clearInterval(window.TSBManage2);
                    clearInterval(window.TSBManage3);
                    clearInterval(window.TSBManage4);
                    window.TSBManage1 = setInterval(function(){
                        that.ready();
                    },60000)
                }
                if(this.activeName=='2'){
                    that.activeNamevalue = '0'
                    this.ready()
                    this.sites = []
                    clearInterval(window.TSBManage1);
                    clearInterval(window.TSBManage2);
                    clearInterval(window.TSBManage3);
                    clearInterval(window.TSBManage4);
                    window.TSBManage2 = setInterval(function(){
                        that.ready(0);
                    },60000)
                }
                if(this.activeName=='3'){
                    that.activeNamevalue = '1'
                    that.ready();
                    this.sites = []
                    clearInterval(window.TSBManage1);
                    clearInterval(window.TSBManage2);
                    clearInterval(window.TSBManage3);
                    clearInterval(window.TSBManage4);
                    window.TSBManage3 = setInterval(function(){
                        that.ready(1);
                    },60000)
                }
                if(this.activeName=='4'){
                    that.activeNamevalue = '2'
                    that.ready();
                    this.sites = []
                    clearInterval(window.TSBManage1);
                    clearInterval(window.TSBManage2);
                    clearInterval(window.TSBManage3);
                    clearInterval(window.TSBManage4);
                    window.TSBManage4 = setInterval(function(){
                        that.ready(2);
                    },60000)
                }
            }
        },
        created(){
            var that = this
            var url=location.href; 
            if(url.indexOf("?")!=-1) {
                var vars = url.split("?");
                var locationNum = vars[1].split("=");
                if(locationNum[1]=='1'||locationNum[1]=='2'||locationNum[1]=='3'||locationNum[1]=='4'){
                    this.activeName = locationNum[1]
                }   
            }
            $.ajax({
                type:'get',
                async:true,
                url:localStorage.serverurl+'equipment/getAreaTree',
                dataType:'json',
                xhrFields:{withCredentials:true},
                data:{},
                success:function(data){
                    if(data.errorCode=='0'){
                        that.optionsAreaId = data.result
                    }else{
                        that.errorCode(data)
                    }
                }
            })
            this.handleClick();
        },
        beforeDestroy(){
            clearInterval(window.TSBManage1);
            clearInterval(window.TSBManage2);
            clearInterval(window.TSBManage3);
            clearInterval(window.TSBManage4);
        }
    }
</script>
<style scoped>
/* 管理--设备图片裁切 */
.container{width: 100%;}
#myCropper-input{position: absolute;left: -9999px;}
.container>label{width: 200px;height: 130px;border: 1px dashed #d9d9d9;border-radius: 6px; cursor: pointer;text-align: center;line-height: 65px;position: relative;}
.container img{width: 100%;height: 100%;position: absolute;left: 0;}
.container>label:hover{border-color: #20a0ff;}
.container i{font-size: 23px;margin-top: 50px;}
/*  */
.required{color: red;}
.TSBManage{width: 100%;height: 100%;padding: 15px;position: relative;}
.TSBManage_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.TSBManage_nav>i{font-size: 23px;}
.TSBManage_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.TSBManage_main_top{width: 100%;height: 40px;display: flex;justify-content: center;}
.TSBManage_main_bottom{width: 100%;height:auto;position: absolute;top:39px;bottom:10px;}

.TSBManage_main_top>div{display: flex;margin-top: 4px;}
.TSBManage_main_top>div>span{width: 37%;line-height: 30px;}
.TSBManage_main_top>div>input{height: 30px;width: 110px;}
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
.state>div>div:nth-of-type(1){padding-top:5px;width: 30px;height: 30px;font-size:11px;border: 1px solid #797979;background: #FFFFFF;margin-top:5px;}
.state>div>div:nth-of-type(2){font-size:11px;padding-top:5px;}
.state_two{width: 70%;height: 40px;margin: 0 auto;padding-top:10px;display: flex;justify-content: space-around;}
.state_two>div{display: flex;}
.state_two>div>span:nth-of-type(1){width: 25px;height: 25px;border: 1px solid #797979;}
.state_two>div>span:nth-of-type(2){font-size: 13px;line-height: 25px;padding-left: 10px;}
</style>

