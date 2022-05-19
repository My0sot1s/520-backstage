<template>
  <div id="announce">
      <div id="broad">
        <el-tag type="danger" id="title0">公告发布</el-tag>

        <el-input id="title"
          placeholder="请输入标题"
          v-model="title">
        </el-input>

        <el-input id="content"
          type="textarea"
          :autosize="{ minRows: 7, maxRows: 10}"
          placeholder="请输入内容"
          v-model="content">
        </el-input>

        <div class="block">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="center">
          </el-date-picker>
        </div>

        <el-button type="danger" round @click="announce()">发布公告</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        title:'',
        content:'',
        value: [new Date(), new Date()],
      }
    },
    methods: {
      announce(){
        console.log(this.value[0].getTime());
        this.axios({
            method:'post',
            url:'/backend/submit/postAnnouncement',
            headers: {
                Token: localStorage.token
            },
            data: {
                startTime: this.value[0].getTime(),
                endTime: this.value[1].getTime(),
                title: this.title,
                text: this.content,
            }
        })
        .then((response => {
            if(response.data.code == 200){
              alert("发布成功！")
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
  #announce {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #title0 {
    height: 5vh;
    line-height: 5vh;
    font-size: 1vw;
  }
  #broad {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 70%;
    padding: 5% 10%;
  }
  #broad * {
    margin: 0;
  }
</style>