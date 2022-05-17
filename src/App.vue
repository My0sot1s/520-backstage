<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee; background-color: rgb(228,228,228)" >
      <el-aside width="200px" style="background-color: #FFFFFF">
        <el-menu router default-active = "examine">
          <el-avatar shape="square" :size="200" :fit="fit" :src="url" ></el-avatar>
          <el-menu-item index="">
            <template slot="title"><i class="el-icon-s-home"></i>首页</template>
          </el-menu-item>
          <el-menu-item index="examine">
            <template slot="title"><i class="el-icon-s-check"></i>审核</template>
          </el-menu-item>
          <el-menu-item index="admin">
            <template slot="title"><i class="el-icon-menu"></i>管理</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px; background-color: white">
          <div id="head">
            <el-avatar shape="circle" :size="50" :fit="fit" :src="url"></el-avatar>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;您好！管理员，欢迎来到后台管理系统</span>
          </div>
          <el-link :underline="false" @click="logout()">
            <i class="el-icon-right" style="margin-right: 15px"></i>
             <span>退出登录</span>
          </el-link>
        </el-header>
         <el-main>
           <router-view/>
         </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      fit:'cover',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: '..//assets//pictures//sends.png'
    }
  },
  methods: {
    logout(){
      this.$router.replace('/');
      localStorage.removeItem("token");
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  #head {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .el-aside {
    color: #333;
  }
</style>
