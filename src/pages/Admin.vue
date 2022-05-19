<template>
  <div id="admin">
      <el-button type="warning"  class="btns" round @click="handleAnnounce()">
          <i class="el-icon-s-promotion"></i>
          <div>公告发布</div>
      </el-button>
      <el-button type="danger"  class="btns" round @click="handleReport()">
          <i class="el-icon-warning"></i>
          <div>举报处理</div>
      </el-button>
  </div>
</template>

<script>
export default {
    methods: {
        handleReport() {
            this.$router.replace('/report')
        },
        handleAnnounce() {
            this.$router.replace('/announce')
        }
    },
    mounted() {
        if(!localStorage.token){
            this.$router.replace('/login')
        }
    }
}
</script>

<style>
    #admin {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 5%;
        background-color: white;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .btns {
        width: 10vw;
        height: 13vw;
        margin-right: 3vw !important;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .btns i {
        font-size: 6.5vw;
        text-align: center;
    }
    .btns div {
        margin-top: 2vw;
        font-size: 1vw;
    }
</style>