<template>
  <div id="login-wrap">
    <!-- 顶部 -->
    <main-header title="毛毛电影">
      <div slot="left" class="back" @click="$router.back()"></div>
    </main-header>
    <!-- 登陆方式选项卡 -->
    <div class="login-type-wrap">
      <div
        class="login-type"
        :class="{ loginActive: loginType }"
        @click="loginType = true"
      >
        美团账号登录
      </div>
      <div
        class="login-type"
        :class="{ loginActive: !loginType }"
        @click="loginType = false"
      >
        手机验证登录
      </div>
    </div>
    <!-- 滑动条 -->
    <div class="scroll-line" :class="{ isScroll: !loginType }"></div>
    <!-- 表单 -->
    <form class="login-form" action="#" method="post" @submit.prevent>
      <div class="input-wrap">
        <div class="input-item" v-show="loginType">
          <input
            id="username"
            class="input-weak"
            type="text"
            placeholder="账户名/手机号/Email"
            key="username"
            v-model="username"
          />
        </div>
        <div class="input-item" v-show="!loginType">
          <input
            id="phone"
            class="input-weak"
            type="'tel'"
            maxlength="11"
            placeholder="请输入手机号"
            key="phone"
            v-model="phone"
            @input="handleCheckPhone"
            ref="Phone"
          />
          <button
            class="btn-weak"
            @click="handleGetVcode"
            disabled="true"
            ref="VcodeBtn"
          >
            {{ btn_msg }}
          </button>
        </div>
        <div class="input-item" v-show="loginType">
          <input
            id="password"
            class="input-weak"
            type="password"
            placeholder="请输入您的密码"
            key="password"
            v-model="password"
          />
        </div>
        <div class="input-item" v-show="!loginType">
          <input
            id="vcode"
            class="input-weak"
            type="password"
            placeholder="请输入短信验证码"
            key="vcode"
            disabled="disabled"
            ref="Vcode"
            v-model="vcode"
          />
        </div>
      </div>
      <div class="login-btn-wrap">
        <button
          class="login-btn"
          @click="handleSubmit"
          :disabled="loginType ? false : true"
          ref="LoginBtn"
        >
          登录
        </button>
      </div>
    </form>
    <div class="subline">
      <div>立即注册</div>
      <div>找回密码</div>
    </div>
    <div class="copyright">
      <span class="copyright">
        © 毛毛电影 客服电话：<a href="tel:1112223333">111-222-3333</a>
      </span>
    </div>
  </div>
</template>

<script>
import mainHeader from "@/components/common/main-header";
export default {
  name: "Login",
  data() {
    return {
      loginType: true, // true代表(或滚动条滑动到)美团账号登录 / false代表(或滚动条滑动到)手机验证登录
      username: "", // 美团账号
      password: "", // 美团账号密码
      phone: "", // 手机号码
      vcode: "", // 短信验证码
      btn_msg: "获取验证码" // 验证码按钮提示信息
    };
  },
  components: {
    mainHeader
  },
  methods: {
    /**
     *  简单模拟账号密码登录
     */
    handleSubmit() {
      const { username, password, $router, $store } = this;
      if (!username || !password) {
        alert("用户名或密码不能为空!");
        return;
      }

      if (username === "admin") {
        if (password === "admin") {
          // 模拟登录成功的情况
          $store.commit("SET_USERNAME", "admin");
          $router.replace("/mine");
        } else {
          // 密码错误
          alert("用户名密码错误!");
        }
      } else {
        // 用户名不存在
        alert("用户名不存在!");
      }
    },
    /**
     *  检查输入的手机号码是否合法
     */
    handleCheckPhone() {
      const { phone, $refs } = this;
      // 输入手机号码不合法
      if (!/^1[34578]\d{9}$/.test(phone)) {
        $refs.VcodeBtn.setAttribute("disabled", true);
        this.btn_msg = "获取验证码";
        return;
      }
      // 合法的情况
      $refs.VcodeBtn.removeAttribute("disabled");
      this.btn_msg = "发送验证码";
    },
    /**
     *  2019-02-16获取验证码
     */
    handleGetVcode() {
      // 1.发送ajax请求
      // 2.根据响应的状态码判断响应结果
      // 简单模拟 - 假设所有发送都是成功的
      console.log("success");
      this.$refs.Vcode.removeAttribute("disabled"); // 启用短信验证码输入框
      this.$refs.LoginBtn.removeAttribute("disabled"); // 启用登录按钮
      this.$refs.VcodeBtn.setAttribute("disabled", true); // 禁用按钮
      this.$refs.Phone.setAttribute("disabled", true); // 进入手机号码输入框，防止用户再次退格输入，会存在bug
      let time = 5;
      // 3.启用定时器
      this.interval = setInterval(() => {
        this.btn_msg = time-- + "秒";
        if (time < 0) {
          this.btn_msg = "再次发送验证码";
          this.$refs.VcodeBtn.removeAttribute("disabled"); // 计时结束后启用按钮
          this.$refs.Phone.removeAttribute("disabled"); // 启用手机号码输入框
          // 4.清除定时器
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
#login-wrap {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;
  .login-type-wrap {
    padding: 0 px2rem(20);
    margin-bottom: px2rem(8);
    display: flex;
    justify-content: space-around;
    font-size: px2rem(28);
    color: #333;
    background-color: #fff;
    .login-type {
      flex: 1;
      line-height: 1;
      padding: px2rem(28) 0 px2rem(20);
      text-align: center;
      &.loginActive {
        color: #df2d2d;
      }
      &:active {
        background-color: #f5f5f5;
      }
    }
  }
  .scroll-line {
    position: absolute;
    top: px2rem(177);
    left: 0;
    margin-left: px2rem(20);
    width: px2rem(355);
    border-bottom: px2rem(8) solid #df2d2d;
    transform: translateX(0);
    transition: transform 0.2s ease-in;
    &.isScroll {
      transform: translateX(100%);
      transition: transform 0.2s ease-in;
    }
  }
  .login-form {
    height: px2rem(295);
    font-size: px2rem(30);
    margin-bottom: px2rem(30);
    .input-wrap {
      border-bottom: px2rem(1) solid #d6d6d6;
      background-color: #fff;
      .input-item {
        display: flex;
        line-height: 1;
        padding: px2rem(13.5) px2rem(20) px2rem(13.5) 0;
        margin-left: px2rem(20);
        border-bottom: px2rem(1) solid #d6d6d6;
        &:nth-child(2) {
          border-bottom: 0 none;
        }
        .input-weak {
          flex: 1;
          height: px2rem(60);
          font-size: px2rem(30);
          border: 0 none;
          outline: none;
          text-indent: px2rem(10);
          &:focus {
            border-radius: px2rem(6);
            background-color: #f5f5f5;
          }
          &:disabled {
            border-radius: px2rem(6);
          }
        }
        .btn-weak {
          flex-shrink: 0;
          margin-left: px2rem(15);
          height: px2rem(60);
          line-height: px2rem(60);
          padding: 0 px2rem(30);
          font-size: px2rem(28);
          background-color: #df2d2d;
          border-radius: px2rem(6);
          border: 1px solid transparent;
          outline: none;
          color: #fff;
          &:disabled {
            background-color: #dcdcdc;
            color: #999;
            border: 0;
          }
        }
      }
    }
    .login-btn-wrap {
      display: flex;
      .login-btn {
        flex: 1;
        margin: px2rem(28) px2rem(20);
        height: px2rem(94);
        color: #fff;
        background-color: #df2d2d;
        font-size: px2rem(40);
        text-align: center;
        line-height: px2rem(94);
        border-radius: px2rem(6);
        border: 1px solid transparent;
        outline: none;
        &:disabled {
          background-color: #dcdcdc;
          color: #999;
          border: 0;
        }
      }
    }
  }
  .subline {
    display: flex;
    justify-content: space-between;
    margin: 0 px2rem(20);
    font-size: px2rem(28);
    color: #df2d2d;
    line-height: 1;
  }
  .copyright {
    color: #333;
    line-height: 1;
    margin-top: px2rem(30);
    font-size: px2rem(28);
    text-align: center;
    a {
      color: #df2d2d;
    }
  }
}
</style>
