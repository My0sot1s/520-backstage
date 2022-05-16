<template>
  <div id="login">
      <div id="logo1">
           <el-avatar src='..\assets\pictures\sends.png'></el-avatar>
      </div>
      <div id="broad">
          <div id="welcome">欢迎进入小程序后台管理系统</div>
          <el-input size="large" v-model="username" placeholder="请输入账号"></el-input>
          <el-input size="large"  v-model="password" placeholder="请输入密码"></el-input>
          <el-button id="btn" size="large" type="danger" @click="login()">登录</el-button>
      </div>
      <div id="logo2"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        login() {
            this.axios({
                method:'post',
                url:'/authority/rfc59fre',
                data: {
                    password: this.password,
                    username: this.username
                }
            })
            .then((response => {
                if(response.data.code == 200){
                    localStorage.setItem("token", response.data.data);
                    console.log(response.data.data)
                    this.$router.replace('/examine')
                }else{
                    alert(response.data.message)
                }
            }))
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style>
    *{
        overflow: hidden;
    }
    #login {
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;

        display: flex;
        justify-content: space-between;
    }
    #logo1 {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #logo1 * {
        width: 40vw;
        height: 30vw;
    }

    #broad {
        flex-grow: 1;
        padding: 10% 5% 15% 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #broad * {
        font-weight: bold;
        width: 100%;
        margin-top: 5%;
        text-align: center;
    }
    #btn {
        margin-top: 10%;
    }
    #logo2 {
        width: 70%;
        height: 10%;
        position: absolute;
        right: 1%;
        bottom: 1%;
        background-image: url("..//assets//pictures//logo2.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right bottom;
    }
</style>