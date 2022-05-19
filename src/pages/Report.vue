<template>
  <div id="report">
    <el-table
        :data="tableData"
        style="width: 100%"
        :max-height="tableHeight"
        empty-text="暂无待处理的举报">
        <el-table-column
        fixed
        prop="name"
        label="被举报者"
        min-width="100">
        </el-table-column>
        <el-table-column
        prop="senderName"
        label="举报者"
        min-width="200"
        align="center">
        </el-table-column>
        <el-table-column
        prop="reportReason"
        label="举报理由"
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
        :visible.sync="this.dialogVisible"
        style="font-weight:bold"
        width="30%"
        center>
        <div style="text-align:center; margin-bottom:5%;">{{dialogText}}</div>
        <el-image
            style="width: 100%; height: 100%"
            v-if="this.indexNow != 0"
            :src="this.tableData[this.indexNow].reportLocation"
            fit="fill"></el-image>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reject()">驳 回</el-button>
            <el-button type="primary" @click="pass()">封 禁</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
      return {
        dialogVisible: false,
        dialogTitle: '',
        dialogText: '',
        indexNow: 0,
        reason:'',
        tableData: [],
        tableHeight: 300,
      }
    },
    methods: {
        examine(index, rows) {
            this.dialogVisible = true;
            this.dialogTitle = this.tableData[index].name
            this.dialogText = "举报理由:\n" + this.tableData[index].reportReason
            this.indexNow = index
            console.log(index, rows)
        },
        reject() {
            this.axios({
                method:'post',
                url:'/backend/submit/report',
                headers: {
                    Token: localStorage.token
                },
                data: {
                    ban: 0,
                    reportUId: this.tableData[this.indexNow].id
                }
            })
            .then((response => {
                if(response.data.code == 200){
                    this.dialogVisible = false  
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
        if(this.tableData[this.indexNow].reportId == null){
            alert("封禁队伍请联系开发人员！")
            return;
        }
        this.axios({
            method:'post',
            url:'/backend/submit/report',
            headers: {
                Token: localStorage.token
            },
            data: {
                ban: 1,
                reportUId: this.tableData[this.indexNow].id
            }
        })
        .then((response => {
            if(response.data.code == 200){
                this.dialogVisible = false
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
            url:'/backend/info/report',
            headers: {
                Token: localStorage.token
            },
        })
        .then((response => {
            if(response.data.code == 200){
                console.log(response.data.data)
                for(let i = 0; i < response.data.data.length; i++){
                    let info = new Object()
                    info.id = response.data.data[i].id
                    info.uid = response.data.data[i].uid
                    info.reportId = response.data.data[i].reportId //被举报人的id
                    info.reportTeamId = response.data.data[i].reportTeamId //被举报队伍的id
                    info.senderName = response.data.data[i].senderName //举报人的名字
                    info.name = response.data.data[i].name //被举报“方”的名字
                    info.reportReason = response.data.data[i].reportReason 
                    window.fetch(response.data.data[i].reportLocation)
                    .then(response => response.text().then(r => info.reportLocation = r))
                    if(info.reportId == null){
                        info.name = "队伍:" + info.name
                    }
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

<style>
    #report {
        width: 100%;
        height: 100%;
    }
</style>