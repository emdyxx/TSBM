<template>
    <div class="equipmentGroup">
        <div class="equipmentGroup_nav">
            系统管理<i class="iconfont icon-icon"></i>分组管理
        </div>
        <div class='equipmentGroup_main'>
            <div class='equipmentGroup_top'>
                <el-button type="primary" icon="plus " size="small">添加分组</el-button>
                <el-button type="primary" icon="edit" size="small">修改分组</el-button>
                <el-button type="primary" icon="delete" size="small">删除分组</el-button>
            </div>
            <div class='equipmentGroup_bottom'>
                <div class="equipmentGroup_bottom_left">
                    <el-tree
                    :data="regions"
                    :props="props"
                    lazy
                    node-key="id"
                    show-checkbox
                    check-strictly>
                    </el-tree>
                </div>
                <div class="equipmentGroup_bottom_right">
                    <el-transfer v-model="value1" :data="data"></el-transfer>
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
                regions:[{name:'region1',id:'1',children:[{id:'2',name:'region1_1'}]},
                {id:'3',name:'region2',children:[{id:'4',name:'region2_1'}]}],
                props:{children:'children',label:'name'},

                value1:[],
                data:'',
            }
        },
        methods:{
            
        },
        created(){}
    }
</script>
<style scoped>
.equipmentGroup{width: 100%;height: 100%;padding: 15px;position: relative;}
.equipmentGroup_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.equipmentGroup_nav>i{font-size: 23px;}
.equipmentGroup_main{position:absolute;top:65px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.equipmentGroup_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.equipmentGroup_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}
.equipmentGroup_bottom_left{width: 200px;height: 100%;border-right: 1px solid #c4c4c4;}
.equipmentGroup_bottom_right{position: absolute;left: 200px;right: 0;height: 100%;}
</style>
