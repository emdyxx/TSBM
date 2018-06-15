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

import dataStatistics from '@/components/statisticsmessage/dataStatistics'  //统计信息-->统计数据

Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$echarts = echartss
//请求错误码封装
Vue.prototype.errorCode = function(code){
    if(code=='1001'){
      this.$message({
          message: '未知错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1002'){
      this.$message({
          message: '会话超时,重新登录',
          type: 'error',
          showClose: true,
      });
      this.$router.push({'path':'/'})
    }
    if(code=='1003'){
      this.$message({
          message: '数据库错误',
          type: 'error',
          showClose: true,
      });
      this.loading = false
    }
    if(code=='1004'){
      this.$message({
          message: '未找到数据',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1005'){
      this.$message({
          message: '参数错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1006'){
      this.$message({
          message: '保存失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1007'){
      this.$message({
          message: '修改失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1008'){
      this.$message({
          message: '删除失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='1009'){
      this.$message({
          message: '无权限',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2001'){
      this.$message({
          message: '验证码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2002'){
      this.$message({
          message: '原始密码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2003'){
      this.$message({
          message: '用户名存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2004'){
      this.$message({
          message: '用户认证失败，用户名或密码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2005'){
      this.$message({
          message: '用户被禁用，无法登陆',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2006'){
      this.$message({
          message: '部门名称重复',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2007'){
      this.$message({
          message: '角色名称重复',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2008'){
      this.$message({
          message: '用户id为空',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2009'){
      this.$message({
          message: '发送信息为空',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2010'){
      this.$message({
          message: '信息发送失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2011'){
      this.$message({
          message: '文件型式错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2012'){
      this.$message({
          message: '文件类型为空',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2013'){
      this.$message({
          message: '没有找到相对应的文件',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2014'){
      this.$message({
          message: '图片存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2015'){
      this.$message({
          message: '升级文件错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2016'){
      this.$message({
          message: '升级文件MD5校验失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2017'){
      this.$message({
          message: '升级文件上传失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2018'){
      this.$message({
          message: '升级文件已经存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2019'){
      this.$message({
          message: '设置升级文件状态失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2020'){
      this.$message({
          message: '未查询到升级包信息',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2021'){
      this.$message({
          message: '升级包信息修改失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2022'){
      this.$message({
          message: '删除失败，升级包不存在或无权限',
          type: 'error',
          showClose: true,
      });
    }

    if(code=='2023'){
      this.$message({
          message: '未查询到模板信息',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2024'){
      this.$message({
          message: '设置模板状态失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2025'){
      this.$message({
          message: '保存模板配置信息失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2026'){
      this.$message({
          message: '生成模板失败',
          type: 'error',
          showClose: true,
      });
    }

    if(code=='2027'){
      this.$message({
          message: '设备不是同一型号',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2028'){
      this.$message({
          message: '设备型号与分组不一致',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2029'){
      this.$message({
          message: '未获取到设备组',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2030'){
      this.$message({
          message: '设备分组名称存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2031'){
      this.$message({
          message: '设备不存在自己的模板',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2032'){
      this.$message({
          message: 'ue（用户）不存在或无权限',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2033'){
      this.$message({
          message: 'ue（用户）存在',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2034'){
      this.$message({
          message: 'ue（用户）认证失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2035'){
      this.$message({
          message: '设备不存在或无权限',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2036'){
      this.$message({
          message: '移除设备分组失败',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2037'){
      this.$message({
          message: '设备不是同一部门（用户组）',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2038'){
      this.$message({
          message: '未查询到设备或升级包',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2039'){
      this.$message({
          message: '设备与平面图不在同一部门',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='2040'){
      this.$message({
          message: '密码错误',
          type: 'error',
          showClose: true,
      });
    }
    if(code=='3001'){
      this.$message({
          message: '发送配置失败',
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
        {//事件管理-->统计数据
          path: '/dataStatistics',
          name: 'dataStatistics',
          component: dataStatistics,
        }
      ]
    },
  ]
})