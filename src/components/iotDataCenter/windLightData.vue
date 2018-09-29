<template>
    <div class="windLightData">
        <iframe :src=url width="100%" height="100%" frameborder="0"></iframe>
    </div>
</template>
<script>
    export default{
        name: 'windLightFileList',
        data () {
            return {
                serverurl:localStorage.serverurl,
                data:{
                    
                },
                url:""
            }
        },
        mounted(){
            
        },
        methods:{
            ready(){
                var that = this;
                $.ajax({
                    type:'get',
                    async:true,
                    xhrFields:{withCredentials:true},
                    url:that.serverurl+'windlight/getWindLightUrl',
                    dataType:'json',
                    data:{},
                    success:function(data){
                        that.url = data.result[0].menuUrl;
                    }
                })
            },
        },
        created(){
            this.ready()
        }
    }
</script>
<style scoped>
.windLightData{width: 100%;height: 100%;position: absolute;}
</style>