<template>
<div class="hello">
  <el-radio v-model="from.type" label="1">手机注册</el-radio>
  <el-radio v-model="from.type" label="2">邮件注册</el-radio>
  </br> </br> </br>
<el-input   v-model="from.carrier"               v-if="from.type==='1'"  style="width: 200px;" size="medium" placeholder="手机号" clearable/>

<el-input   v-model="from.carrier"               v-if="from.type==='2'"  style="width: 200px;" size="medium" placeholder="邮箱号" clearable/>
</br> </br> </br>
<el-input   v-model="from.code"    style="width: 200px;" size="medium" placeholder="验证码" clearable/>


 
  
 
     </br>
     </br>
     </br>
   
     <el-button
          v-if=""
         :disabled ="canGet"
          class="searchbtn"
          size="small"
          icon="el-icon-s-promotion"
          @click="send()"
        >
        <span  v-if="showtime===null">获取验证码</span>
        <span  v-else> {{showtime}}</span>
        </el-button>
      
  <el-button
          class="searchbtn"
          size="small"
          v-if="isShow"
          icon="el-icon-s-custom"
          @click="register()"
        >注册</el-button>
      </div>
  </div>
</template>




<script>
import { sendMsg,register } from "@/utils/api";

export default {
  data () {
    return {
  canGet:false, 
  showtime: null,
 timeCounter: null,
   from:{
     isShow:false,
     carrier:'',
     type:'1',
     code:'',
     sceneType: 'register'  
   }
    }
  },
    created() {
   
  },

  methods: {
// 倒计时显示处理
    countDownText(s) {
      this.showtime = `${s}s后重新获取`
    },
// 倒计时 60秒 不需要很精准
    countDown(times) {
      const self = this;
      // 时间间隔 1秒
      const interval = 1000;
      let count = 0;
      self.timeCounter = setTimeout(countDownStart, interval);
      function countDownStart() {
        if (self.timeCounter == null) {
          return false;
        }
        count++
        self.countDownText(times - count + 1);
        if (count > times) {
          clearTimeout(self.timeCounter)
          self.canGet=false;
          self.showtime = null;
        } else {
          self.timeCounter = setTimeout(countDownStart, interval)
        }
      }
    },


    //发送验证码
			send() {
				var that = this;
				sendMsg(this.from).then(function(isnot) {
					if (isnot.data.code == 200) {
						that.$message.info("发送成功,验证码将在三分钟后过期");
                        that.isShow=true;
                        that.canGet=true;
                        that.countDown(60);
					} else {
						that.$message.error(isnot.data.message);
					}
				});
			},
        

            register() {
				var that = this;
				register(this.from).then(function(isnot) {
					if (isnot.data.code == 200) {
                        console.log(isnot);
						that.$message.info("注册成功");
                        that.$router.push({
                        path: "/login"
                         });
					} else {
						that.$message.error(isnot.data.message);
					}
				});
			},
    }
}
</script>