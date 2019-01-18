<template>
    <div class="event">
        <!-- <div class="event_nav">
            {{$t('event.Eventmanagement')}}<i class="iconfont icon-icon"></i>{{$t('event.Eventinformation')}}
        </div> -->
        <div class="event_main">
            <div class="event_top">
                <span style="padding-left:15px;">
                    <el-input
                        icon="search"
                        size='small'
                        :placeholder="$t('FalseHints.Pleaseenterthesearchfield')"
                        v-model="keyword"
                        @change="eventsearch"
                        style="width:150px;">
                    </el-input>
                </span>
                <span style="padding-left:15px;">
                    <span>{{$t('event.EquipmentType')}}:</span>
                    <el-select v-model.lazy="value" @change="eventsearch" clearable size='small' style="width:110px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:15px;">
                    <span>{{$t('event.Eventtype')}}:</span>
                    <el-select v-model.lazy="value2" @change="eventsearch" clearable size='small' style="width:110px;">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span style="padding-left:15px;">
                    <span>{{$t('event.Time')}}:</span>
                    <el-date-picker
                        v-model.lazy="timeT"
                        type="datetimerange"
                        @change="time"
                        size='small'
                        range-separator='~'
                        style="width:320px;">
                    </el-date-picker>
                </span>
                <el-button @click="eventsearch" style="margin-left:10px;" type="primary" size='small'>{{$t('event.Search')}}</el-button>
                <el-button v-if="deleteReadType" @click="deleteRead" style="margin-left:10px;" type="primary" size='small'>{{$t('event.delete')}}</el-button>
            </div>
            <div class="event_bottom"
            v-loading.body='loading'
            element-loading-text="拼命加载中">
                <el-table
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    @sort-change='sortChange'
                    @row-click="clickRow"
                    ref="moviesTable"
                    :data="tableData3"
                    border
                    stripe
                    tooltip-effect="dark"
                    max-height='530'
                    style="width: 100%;margin-bottom:10px;"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    align='center'
                    width="55">
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="MAC"
                    align='center'
                    label="MAC"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="nickname"
                    align='center'
                    :label="$t('event.Devicenickname')"
                    width="220">
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
                    sortable='custom'
                    prop="type"
                    :label="$t('event.EquipmentType')"
                    align='center'
                    width="120">
                        <template scope="scope">
                            <span v-if="scope.row.type=='0'">tsbg</span>
                            <span v-if="scope.row.type=='1'">tsbc</span>
                            <span v-if="scope.row.type=='2'">tsba</span>
                            <span v-if="scope.row.type=='3'">ue</span>
                            <span v-if="scope.row.type=='4'">sta</span>
                        </template> 
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop="content"
                    :label="$t('event.Eventcontent')"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    sortable='custom'
                    prop='ts'
                    :label="$t('event.Time')"
                    align='center'
                    width="200">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
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
                deleteReadType:false,
                serverurl:localStorage.serverurl,
                loading:false,
                sites:[],
                tableData3:[],
                pageSize:10,
                pageIndex:1,
                total:10,
                value:'',
                options:[{value:'0',label:'tsbg'},{value:'1',label:'tsbc'},{value:'2',label:'tsba'},{value:'3',label:'ue'},{value:'4',label:'sta'}],
                keyword:'',
                value2:'',
                options2:[
                    {value:'4',label:'设备上线'},
                    {value:'13',label:'用户上线'},
                    {value:'14',label:'用户下线'},
                ],
                timeT:'',
                startTime:'',
                endTime:'',
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
                                if(data.result[i].code=='deleteEvent'){
                                    that.deleteReadType = true
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
            clickRow(row){
                this.$refs.moviesTable.toggleRowSelection(row)
            },
            //选中行的change事件
            handleSelectionChange(val){
                this.sites = val
            },
            //选择条数事件
            handleSizeChange(val) {
                this.pageSize = val
                this.ready()
            },
            // 
            handleCurrentChange(val) {
                this.pageIndex = val
                this.ready()
            },
            time(val){
                var type = val.split('~')
                this.startTime = type[0]
                this.endTime = type[1]
            },
            //搜索
            eventsearch(){
                this.ready()
            },
            //删除
            deleteRead(){
                var that = this
                if(this.sites.length==''){
                    that.$message({
                        message: that.$t('FalseHints.Pleasetooperate'),
                        type: 'error',
                        showClose: true,
                    });
                    return;
                }
                var array = [];
                for(var i=0;i<this.sites.length;i++){
                    array.push(this.sites[i].id)
                }
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
                        url:that.serverurl+'event/delEvent',
                        data:{
                            eventIds:array.join(',')
                        },
                        success:function(data){
                            if(data.errorCode=='0'){
                                that.$message({
                                    message: that.$t('FalseHints.DeleteSuccess'),
                                    type: 'success',
                                    showClose: true,
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
                        message: that.$t('FalseHints.Undelete')
                    });          
                });
            },
            //页面渲染
            ready(){
                var that = this;
                that.loading = true
                $.ajax({
                    type:'get',
                    async:true,
                    dataType:'json',
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'event/getEventList',
                    data:{
                        pageIndex:that.pageIndex,
                        pageSize:that.pageSize,
                        type:that.value,
                        keyword:that.keyword,
                        alarmType:that.value2,
                        startTime:that.startTime,
                        endTime:that.endTime,
                        order:that.props,
                        orderBy:that.orders
                    },
                    success:function(data){
                        if(data.errorCode=='0'){
                            that.tableData3 = data.rows
                            that.total = data.total
                            that.loading = false
                        }else{
                            that.errorCode(data)
                        }
                    }
                })
            }
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.event{width: 100%;height: 100%;padding: 15px;position: relative;}
.event_nav{width: 100%;height: 40px;line-height: 40px;font-size: 23px;text-align: left;}
.event_nav>i{font-size: 23px;}
.event_main{position:absolute;top:10px;bottom:15px;right: 15px;left: 15px;width: auto;height: auto;border: 1px solid #c4c4c4;border-radius: 4px;}
.event_top{padding: 5px 10px 5px;border-bottom: 1px solid #c4c4c4;min-height: 30px;text-align: left;}
.event_bottom{width:100%;height:auto;position:absolute;top:40px;bottom:0;padding: 10px;background-color: #FFFFFF;border-radius: 0 0 4px 4px;display: flex;flex-direction: column;}

</style>
