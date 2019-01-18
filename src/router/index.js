import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echartss from 'echarts'


import login from '@/components/login'  //登录页面
import index from '@/components/index'  //首页
import echarts from '@/components/statisticsmessage/equipmentStatistics'   //图表页面
import userManage from '@/components/systemManagement/userManage'  // 用户管理
import departmentManage from '@/components/systemManagement/departmentManage'  // 组织管理
import roleManage from '@/components/systemManagement/roleManage'  // 角色管理
import logManage from '@/components/systemManagement/logManage'  // 日志管理
import TSBManage from '@/components/equipmentManage/TSBManage'  //设备管理-->TSB管理
import equipmentGroup from '@/components/equipmentManage/equipmentGroup'  //设备管理-->分组管理
import equipmentLocation from '@/components/equipmentManage/equipmentLocation' //设备管理-->设备定位
import equipmentUser from '@/components/equipmentManage/equipmentUser' //终端管理-->终端用户
import terminalRegister from '@/components/equipmentManage/terminalRegister' //终端管理-->终端注册
import imgcoordinate from '@/components/equipmentManage/imgcoordinate'  //设备管理-->设备定位单张图片路由页面
import authManage from '@/components/equipmentManage/authManage'   //设备管理-->认证管理
import templateManage from '@/components/equipmentManage/templateManage'   //设备管理-->模板管理
import equipmentArea from '@/components/equipmentManage/equipmentArea'   //设备管理-->模板管理

import equipmentUpgrade from '@/components/upgradeManage/equipmentUpgrade'  //升级管理-->设备升级
import alarm from '@/components/eventManage/alarm'  //事件管理-->告警信息
import event from '@/components/eventManage/event'  //事件管理-->事件信息
import equipmentStatistics from '@/components/statisticsmessage/equipmentStatistics'  //统计信息-->设备概览
import factory from '@/components/type/factory'  //统计信息-->工厂
import onlineTime from '@/components/statisticsmessage/onlineTime'  //统计信息-->在线时长

import windLightFileList from '@/components/iotDataCenter/windLightFileList'  //物联网数据-->应用固件
import windLightData from '@/components/iotDataCenter/windLightData'  //物联网数据-->内嵌页面

import dataStatistics from '@/components/statisticsmessage/dataStatistics'  //统计信息-->统计数据

Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$echarts = echartss
//请求错误码封装
Vue.prototype.errorCode = function(data){
    if(data.errorCode=='1001'){
      this.$message({
          message: this.$t('Falsehints.unknownerror'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1002'){
      this.$message({
          message: this.$t('Falsehints.sessiontimeout'),
          type: 'error',
          showClose: true,
      });
      this.$router.push({'path':'/'})
    }
    if(data.errorCode=='1003'){
      this.$message({
          message: this.$t('Falsehints.databaseerror'),
          type: 'error',
          showClose: true,
      });
      this.loading = false
    }
    if(data.errorCode=='1004'){
      this.$message({
          message: this.$t('Falsehints.datanotfound'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1005'){
      this.$message({
          message: this.$t('Falsehints.parametererror'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1006'){
      this.$message({
          message: this.$t('Falsehints.datasavefailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1007'){
      this.$message({
          message: this.$t('Falsehints.dataeditfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1008'){
      this.$message({
          message: this.$t('Falsehints.DeleteFailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='1009'){
      this.$message({
          message: this.$t('Falsehints.permissiondenied'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2001'){
      this.$message({
          message: this.$t('Falsehints.verifycodefailed'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2002'){
      this.$message({
          message: this.$t('Falsehints.originalpasswordmistake'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2003'){
      this.$message({
          message:  this.$t('Falsehints.usernameexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2004'){
      this.$message({
          message: this.$t('Falsehints.userverifyfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2005'){
      this.$message({
          message: this.$t('Falsehints.userbedisabled'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2006'){
      this.$message({
          message: this.$t('Falsehints.departmentexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2007'){
      this.$message({
          message: this.$t('Falsehints.roleexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2008'){
      this.$message({
          message: this.$t('Falsehints.useridisempty'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2009'){
      this.$message({
          message: this.$t('Falsehints.sendmessageisempty'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2010'){
      this.$message({
          message: this.$t('Falsehints.messagesendfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2011'){
      this.$message({
          message: this.$t('Falsehints.filetypeerror'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2012'){
      this.$message({
          message: this.$t('Falsehints.filetypeisnull'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2013'){
      this.$message({
          message: this.$t('Falsehints.filenotfound'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2014'){
      this.$message({
          message: this.$t('Falsehints.imgexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2015'){
      this.$message({
          message: this.$t('Falsehints.upgradefileerror'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2016'){
      this.$message({
          message: this.$t('Falsehints.upgradefilemd5verifyfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2017'){
      this.$message({
          message: this.$t('Falsehints.errorfileuploadfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2018'){
      this.$message({
          message: this.$t('Falsehints.fileexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2019'){
      this.$message({
          message: this.$t('Falsehints.setupgradefilestatusfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2020'){
      this.$message({
          message: this.$t('Falsehints.notfoundupgradefileinfo'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2021'){
      this.$message({
          message: this.$t('Falsehints.upgradefileinfoeditfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2022'){
      this.$message({
          message: this.$t('Falsehints.upgradefiledeletedfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2023'){
      this.$message({
          message: this.$t('Falsehints.notfoundtemplateinfo'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2024'){
      this.$message({
          message: this.$t('Falsehints.settemplatestatusfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2025'){
      this.$message({
          message: this.$t('Falsehints.saveconfiginfofailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2026'){
      this.$message({
          message: this.$t('Falsehints.generatetemplatefailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2027'){
      this.$message({
          message: this.$t('Falsehints.Theequipmentisnotthesametype'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2028'){
      this.$message({
          message: this.$t('Falsehints.equipmentmodelisdifferentfromgroup'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2029'){
      this.$message({
          message: this.$t('Falsehints.notfoundequipmentgroup'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2030'){
      this.$message({
          message: this.$t('Falsehints.equipmentgroupnameexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2031'){
      this.$message({
          message: this.$t('Falsehints.owntemplatedoesnotexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2032'){
      this.$message({
          message: this.$t('Falsehints.uenotexistorpermissiondenied'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2033'){
      this.$message({
          message: this.$t('Falsehints.ueexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2034'){
      this.$message({
          message: this.$t('Falsehints.ueauthfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2035'){
      this.$message({
          message: this.$t('Falsehints.equipmentnotexistorpermissiondenied'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2036'){
      this.$message({
          message: this.$t('Falsehints.removegroupfromequipmentfailure'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2037'){
      this.$message({
          message: this.$t('Falsehints.Equipmentisnotthesamedepartment'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2038'){
      this.$message({
          message: this.$t('Falsehints.notfindequipmentupgradefile'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2039'){
      this.$message({
          message: this.$t('Falsehints.equipmentdepartmentisdifferentfromplan'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2040'){
      this.$message({
          message: this.$t('Falsehints.passwordauthfaild'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2041'){
      this.$message({
          message: this.$t('Falsehints.Differentorganizations'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='2042'){
      this.$message({
          message: this.$t('Falsehints.ueIPexist'),
          type: 'error',
          showClose: true,
      });
    }
    if(data.errorCode=='3001'){
      this.$message({
          message: this.$t('Falsehints.generatetemplatefailure'),
          type: 'error',
          showClose: true,
      });
    }
};
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {//图表页面
          path:'/',
          name:'echarts',
          component:echarts,
          children:[
            {//工厂数据
              path:'/',
              name:'factory',
              component:factory,
            },
            {//工厂数据
              path:'/factory',
              name:'factory',
              component:factory,
            },
          ]
        },
        { // 用户管理
          path: '/userManage',
          name: 'userManage',
          component: userManage
        },
        {// 组织管理
          path: '/departmentManage',
          name: 'departmentManage',
          component: departmentManage
        },
        {// 角色管理
          path: '/roleManage',
          name: 'roleManage',
          component: roleManage
        },
        {// 日志管理
          path: '/logManage',
          name: 'logManage',
          component: logManage
        },
        {// 设备管理-->TSB管理
          path: '/TSBManage',
          name: 'TSBManage',
          component: TSBManage
        },
        {// 设备管理-->分组管理
          path: '/equipmentGroup',
          name: 'equipmentGroup',
          component: equipmentGroup
        },
        {// 设备管理-->设备定位
          path: '/equipmentLocation',
          name: 'equipmentLocation',
          component: equipmentLocation,
        },
        {// 终端管理-->终端用户
          path: '/equipmentUser',
          name: 'equipmentUser',
          component: equipmentUser
        },
        {// 终端管理-->终端注册
          path: '/terminalRegister',
          name: 'terminalRegister',
          component: terminalRegister
        },
        {//设备管理-->设备定位单张图片路由页面
          path: '/imgcoordinate',
          name: 'imgcoordinate',
          component: imgcoordinate,
        },
        {// 设备管理-->认证管理
          path: '/authManage',
          name: 'authManage',
          component: authManage,
        },
        {// 设备管理-->模板管理
          path: '/templateManage',
          name: 'templateManage',
          component: templateManage,
        },
        {// 设备管理-->区域管理
          path: '/equipmentArea',
          name: 'equipmentArea',
          component: equipmentArea,
        },
        {//升级管理-->设备升级
          path: '/equipmentUpgrade',
          name: 'equipmentUpgrade',
          component: equipmentUpgrade,
        },
        {//事件管理-->告警信息
          path: '/alarm',
          name: 'alarm',
          component: alarm,
        },
        {//事件管理-->事件信息
          path: '/event',
          name: 'event',
          component: event,
        },
        {//统计信息-->统计数据
          path: '/dataStatistics',
          name: 'dataStatistics',
          component: dataStatistics,
        },
        {//统计信息-->在线时长
          path: '/onlineTime',
          name: 'onlineTime',
          component: onlineTime,
        },
        {//物联网数据-->应用固件
          path: '/windLightFileList',
          name: 'windLightFileList',
          component: windLightFileList,
        },
        {//物联网数据-->内嵌页面
          path: '/windLightData',
          name: 'windLightData',
          component: windLightData,
        }
      ]
    },
  ]
})