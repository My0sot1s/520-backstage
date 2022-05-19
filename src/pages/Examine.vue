<template>
  <div id="examine">
    <el-table
        :data="tableData"
        style="width: 100%"
        :max-height="tableHeight"
        empty-text="暂无待审核的任务">
        <el-table-column
        fixed
        prop="name"
        label="申请人"
        min-width="100">
        </el-table-column>
        <el-table-column
        prop="task"
        label="任务名称"
        min-width="200"
        align="center">
        </el-table-column>
        <el-table-column
        prop="content"
        label="文案内容"
        min-width="200"
        align="center">
        </el-table-column>
        <el-table-column
        prop="date"
        label="申请时间"
        min-width="200"
        align="center">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        min-width="100"
        align="center">
        <template slot-scope="scope">
            <el-button
            @click.native.prevent="examine(scope.$index, tableData)"
            type="text"
            size="small">
            查看详情
            </el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog
        :title="this.dialogTitle"
        :visible.sync="dialogVisible1"
        style="font-weight:bold"
        width="30%"
        center>
        <div style="text-align:center; margin-bottom:5%;">{{dialogText}}</div>
        <el-image
            v-if="this.indexNow != 0"
            style="width: 100%; height: 100%"
            :src="this.tableData[this.indexNow].img"
            fit="fill"></el-image>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = true">驳 回</el-button>
            <el-button type="primary" @click="pass()">通 过</el-button>
        </span>
        <el-dialog
            width="30%"
            title="驳回理由"
            :visible.sync="dialogVisible2"
            append-to-body>
            <el-input
                type="textarea"
                :autosize="{ minRows: 12, maxRows: 15}"
                placeholder="请输入内容"
                v-model="reason">
            </el-input>
            <div id="btn">
                <el-button style="width:40%" type="info" round @click="reject()">驳回</el-button>
            </div>
        </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
    methods: {
      examine(index, rows) {
        this.dialogVisible1 = true;
        this.dialogTitle = this.tableData[index].name
        this.dialogText = this.tableData[index].content
        this.indexNow = index
        console.log(index, rows)
      },
      reject() {
        this.axios({
            method:'post',
            url:'/backend/submit/rejectReason',
            headers: {
                Token: localStorage.token
            },
            data: {
                reportReason: this.reason,
                taskIndex: this.tableData[this.indexNow].taskIndex,
                teamId: this.tableData[this.indexNow].id
            }
        })
        .then((response => {
            if(response.data.code == 200){
                this.dialogVisible2 = false
                this.dialogVisible1 = false  
                this.tableData.splice(this.indexNow, 1)
            }else{
                alert(response.data.message)
            }
        }))
        .catch((error) => {
            console.log(error)
        })
      },
      pass() {
        this.axios({
            method:'post',
            url:'/backend/submit/pass',
            headers: {
                Token: localStorage.token
            },
            data: {
                taskIndex: this.tableData[this.indexNow].taskIndex,
                teamId: this.tableData[this.indexNow].id
            }
        })
        .then((response => {
            if(response.data.code == 200){
                this.dialogVisible1 = false
                this.tableData.splice(this.indexNow, 1)
            }else{
                alert(response.data.message)
            }
        }))
        .catch((error) => {
            console.log(error)
        })
      }
    },
    data() {
      return {
        dialogVisible1: false,
        dialogVisible2: false,
        dialogTitle: '',
        dialogText: '',
        indexNow: 0,
        reason:'',
        tableData: [],
        tableHeight: 300,
        tasks: ["美食与你", "运动已开始", "鹊桥相遇", "为你保驾护航", "饮茶先啦", "花花世界迷人眼"]
      }
    },
    mounted() {
        if(!localStorage.token){
            this.$router.replace('/login')
        }
        this.tableHeight = window.innerHeight - 125;
        window.addEventListener("resize", () => {
            this.tableHeight = window.innerHeight - 125;
        })
        this.axios({
            method:'get',
            url:'/backend/info/work',
            headers: {
                Token: localStorage.token
            },
        })
        .then((response => {
            if(response.data.code == 200){
                console.log(response.data.data)
                for(let i = 0; i < response.data.data.length; i++){
                    let info = new Object()
                    info.id = response.data.data[i].teamId
                    info.taskIndex = response.data.data[i].taskIndex
                    info.task = this.tasks[info.taskIndex-1]
                    info.name = response.data.data[i].teamName
                    var now = new Date(response.data.data[i].finish_date)
                    var nian = now.getFullYear()
                    var yue = (now.getMonth() + 1).toString().padStart(2, '0')
                    var ri = now.getDate().toString().padStart(2, '0')
                    var shi = now.getHours().toString().padStart(2, '0')
                    var fen = now.getMinutes().toString().padStart(2, '0')
                    var miao = now.getSeconds().toString().padStart(2, '0')
                    info.date = `${nian}-${yue}-${ri} ${shi}:${fen}:${miao}`
                    info.content = response.data.data[i].myDescription
                    window.fetch(response.data.data[i].uploadLocation)
                    .then(response => response.text().then(r => info.img = r))
                    this.tableData.push(info)
                }
            }else{
                alert(response.data.message)
            }
        }))
        .catch((error) => {
            console.log(error)
        })
    }
  }
</script>

<style scoped>
    #examine {
        width: 100%;
        height: 100%;
    }
    #pic {
        width: 80%;
        height: 50%;
        background-image: url('http://git.sends.cc/uploads/-/system/appearance/favicon/1/favicon.ico');
    }
    #btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin-top: 5%;
    }
</style>