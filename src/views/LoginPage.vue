<script>
  import { reactive } from "vue";
  import request from "@/services/request";
  import store from "@/store";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const data = reactive({
        username: "",
        password: "",
      });
      const router = useRouter();
      const loginUser = async () => {
        const isLoggedIn = await request.post("users/login", {
          username: data?.username,
          password: data?.password,
          login_type: "dashboard",
        });
        console.log({ isLoggedIn });
        if (!isLoggedIn?.status) return;
        localStorage["hala_token"] = isLoggedIn?.data?.token;
        localStorage["hala_user"] = JSON.stringify(isLoggedIn?.data?.user);
        store.commit("setUser", isLoggedIn?.data?.user);
        console.log(store?.state?.users?.currentUser);
        if (isLoggedIn?.data?.user?.roles?.includes("warehouse_manager"))
          router.replace("/orders_page");
        else router.push("/categories_page");
      };
      return {
        data,
        loginUser,
      };
    },
  };
</script>

<template>
  <div id="wrapper">
    <div class="logo-container">
      <img src="/images/logo.png" alt="logo" />
    </div>
    <div class="input-container">
      <div id="login-form-wrap">
        <h2 class="login-heading">تسجيل الدخول</h2>
        <form id="login-form" @submit.prevent="loginUser">
          <p class="mb-4">
            <input
              v-model="data.username"
              type="text"
              id="username"
              name="username"
              placeholder="إسم المستخدم"
              required
              style="padding-inline: 1rem"
            /><i class="validation"><span></span><span></span></i>
          </p>
          <p class="mb-4">
            <input
              v-model="data.password"
              type="password"
              id="password"
              name="password"
              placeholder="كلمة المرور"
              required
              style="padding-inline: 1rem"
            /><i class="validation"><span></span><span></span></i>
          </p>
          <p class="mb-4">
            <input type="submit" id="login" value="تسجيل الدخول" />
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: rgb(7, 69, 66);
    background: linear-gradient(
      180deg,
      rgba(7, 69, 66, 1) 5%,
      rgba(19, 108, 102, 1) 65%,
      rgba(39, 195, 184, 1) 100%
    );
  }

  .logo-container {
    overflow: hidden;
    max-width: 50%;
    margin-inline: auto;
    margin-block: 2rem;
  }

  @media screen and (min-width: 350px) {
    .logo-container {
      max-width: 70%;
    }
  }

  @media screen and (min-width: 400px) {
    .logo-container {
      max-width: 180px;
    }
  }

  .logo-container img {
    width: 100%;
    height: auto;
  }

  .input-container {
    margin-bottom: 6rem;
    margin-inline: auto;
    max-width: 84%;
  }

  .submit-btn {
    display: block;
    border-radius: 1rem;
    background: #5cf3a1;
    color: #252525;
  }

  /* form styles */
  h2 {
    font-weight: 600;
    text-align: center;
  }
  p {
    position: relative;
  }
  a,
  a:link,
  a:visited,
  a:active {
    color: #3ca9e2;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  a:focus,
  a:hover,
  a:link:focus,
  a:link:hover,
  a:visited:focus,
  a:visited:hover,
  a:active:focus,
  a:active:hover {
    color: #329dd5;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  #login-form-wrap {
    background-color: #fff;
    width: 300px;
    text-align: center;
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 500px) {
    #login-form-wrap {
      width: 400px;
    }
  }
  .login-heading {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  #login-form {
    padding: 0;
  }
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
  }
  input[type="password"],
  input[type="text"] {
    width: 100%;
    padding: 0 0 0 10px;
    margin: 0;
    color: #8a8b8e;
    border: 1px solid #c2c0ca;
    font-style: normal;
    font-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: relative;
    display: inline-block;
    background: none;
  }
  input[type="password"]:focus,
  input[type="text"]:focus {
    border-color: #40dd87;
  }
  /* input[type="password"]:focus:invalid,
input[type="text"]:focus:invalid {
  color: #cc1e2b;
  border-color: #cc1e2b;
} */
  input[type="password"]:valid ~ .validation,
  input[type="text"]:valid ~ .validation {
    display: block;
    border-color: #0c0;
  }
  input[type="password"]:valid ~ .validation span,
  input[type="text"]:valid ~ .validation span {
    background: #0c0;
    position: absolute;
    border-radius: 6px;
  }
  input[type="password"]:valid ~ .validation span:first-child,
  input[type="text"]:valid ~ .validation span:first-child {
    top: 30px;
    left: -7px;
    width: 20px;
    height: 3px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  input[type="password"]:valid ~ .validation span:last-child,
  input[type="text"]:valid ~ .validation span:last-child {
    top: 35px;
    left: 8px;
    width: 11px;
    height: 3px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .validation {
    display: none;
    position: absolute;
    content: " ";
    height: 60px;
    width: 30px;
    left: 15px;
    top: 0px;
  }
  input[type="submit"] {
    border: none;
    display: block;
    background: #5cf3a1;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-size: 18px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-align: center;
  }
  input[type="submit"]:hover {
    background-color: #4cd087;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  #create-account-wrap {
    background-color: #eeedf1;
    color: #8a8b8e;
    font-size: 14px;
    width: 100%;
    padding: 10px 0;
    border-radius: 0 0 4px 4px;
  }
  .fail {
    background: #dbb5b2;
    color: red;
  }
  .success {
    background: #ddebdd;
    color: #4cd087;
  }
  .wrapper-fail {
    background: #d19591;
  }
  .wrapper-success {
    background: #eeedf1;
  }
</style>
