<template>
  <div class="echarts">
        <div style="width:100%;height:100%;">
            <router-view></router-view>
        </div>
  </div>
</template>
<script>
export default {
    name: 'echarts',
    data () {
        return {
            serverurl:localStorage.serverurl,
        }
    },
    mounted(){
        var that = this;
        // setTimeout(function(){
            //  that.$router.push({'path':'/factory'})
        //  },200)
        // if(sessionStorage.departmentId=='1'){
            // this.$router.push({'path':'/factory'})
        // }else{
            // that.$router.push({'path':'/factory'})
            // $.ajax({
            //     type:'get',
            //     async:true,
            //     dataType:'json',
            //     xhrFields:{withCredentials:true},
            //     url:that.serverurl+'',
            //     data:{},
            //     success:function(data){
            //         if(data.errorCode=='0'){
            //             if(data.result.type=='1'){
            //                 that.$router.push({'path':'/factory'})
            //             }
            //             if(data.result.type=='2'){
            //                 that.$router.push({'path':'/factory'})
            //             }
            //             if(data.result.type=='3'){
            //                 that.$router.push({'path':'/factory'})
            //             }
            //             if(data.result.type=='4'){
            //                 that.$router.push({'path':'/factory'})
            //             }
            //         }else{
            //             that.errorCode(data.errorCode)
            //         }
            //     }
            // })
        // }
    },
    methods:{  
    },
    created(){
         
    }
}
</script>
<style scoped>
.echarts{width: 100%;height: 100%;}

</style>
