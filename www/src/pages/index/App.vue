<template>
<div class="min-h-full">
  <NavbarComponent>
    <template #menu>
      <NavbarMenuItem :current="true">Dashboard</NavbarMenuItem>
      <NavbarMenuItem :current="false">Team</NavbarMenuItem>
    </template>

    <template #menu_mobile>
      <NavbarMobileMenuItem :current="true">Dashboard</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="false">Team</NavbarMobileMenuItem>
    </template>

    <template #sign>
      <NavbarActionItem @click="toggle_sign">Sign-in/Sign-up</NavbarActionItem>
    </template>
    <template #sign_mobile>
      <NavbarMobileActionItem @click="toggle_sign">Sign-in/Sign-up</NavbarMobileActionItem>
    </template>
  </NavbarComponent>

  <div class="flex flex-row justify-end md:pr-4 mt-2" v-show="sign !== null">
    <SignInSignUp :sign="sign" 
                  @signin="({username, password})        => {signin(username, password);}"
                  @signup="({username, password, email}) => {signup(username, password, email);}"
                  @update:sign="(evt) => {sign = evt;}"
                  @error="({msg, e}) => {on_error(msg, e);}"
                  />
  </div>

  <div class="py-10">
    <header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Content</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- Your content -->
      </div>
    </main>
  </div>

  <SignUpConfirmCode v-if="sign_up_confirm_code" 
      :username="username"
      @dismiss="sign_up_confirm_code = false"
      @verify="({username, code}) => {verify(username, code);}"
      />
  <ModalNotification v-if="notification !== null && error === null">{{ notification }}</ModalNotification>
  <ModalError v-if="error !== null" 
      @dismiss="error = null" >
    <template #message>{{ error.msg }}</template>
    <template #error>{{ error.e }}</template>
  </ModalError>
</div>
</template>
<script>
import NavbarComponent from "@/extras/extra-vue-ui/navbar/navbarcomponent.vue";
import NavbarMenuItem from "@/extras/extra-vue-ui/navbar/navbarmenuitem.vue";
import NavbarMobileMenuItem from "@/extras/extra-vue-ui/navbar/navbarmobilemenuitem.vue";
import NavbarActionItem from "@/extras/extra-vue-ui/navbar/navbaractionitem.vue";
import NavbarMobileActionItem from "@/extras/extra-vue-ui/navbar/navbarmobileactionitem.vue";
import ModalNotification from "@/extras/extra-vue-ui/modal/modalnotification.vue";
import ModalError from "@/extras/extra-vue-ui/modal/modalerror.vue";
import SignInSignUp from "@/extras/extra-vue-ui/signin/signinsignup.vue";
import SignUpConfirmCode from "@/extras/extra-vue-ui/signin/signupconfirmcode.vue";

import { signUpCognitoUser, signInCognitoUser, getCurrentCognitoUser,
         confirmCognitoUser } from "@/extras/extra-js-cognito/cognito.js";

export default {
  name: "App",
  components: {
    NavbarComponent, NavbarMenuItem, NavbarMobileMenuItem, NavbarActionItem, NavbarMobileActionItem,
    ModalNotification, ModalError,
    SignInSignUp, SignUpConfirmCode,
  },
  data: function() {
    return {
      notification: null,
      error: null,
      sign: 'sign-up',
      sign_up_confirm_code: true,
      username: null,
    };
  },
  mounted: function() {
    try {
      const c = getCurrentCognitoUser();
      if (c !== null) { console.log("current user: ", c); }
    } catch (e) {
      this.on_error("Error in mounted", e);
    }
  },
  methods: {
    signin: function(username, password) {
      try {
        console.log("Sign in with", username, password);
        signInCognitoUser(username, password)
        .then((r) => {console.log("Sign in response: ", r);})
        .catch((e) => {this.on_error("Error handling sign-in", e);});
      } catch (e) {
        this.on_error("Error during sign-in", e);
      }
    },
    signup: function(username, password, email) {
      try {
        console.log("Sign up with", username, password, email);
        this.notification = "Handling sign-up";
        signUpCognitoUser(username, password, email)
        .then((r) => {
          console.log("Signup successfull with result", r);
          this.notification = null;
          this.sign_up_confirm_code = true;
        })
        .catch((e) => {this.on_error("Sign-up failed...", e);});
      } catch (e) {
        this.on_error("Error during sign-up", e);
      }
    },
    verify: function(username, code) {
      try {
        this.notification = "Verifying code";
        confirmCognitoUser(username, code)
        .then((r) => {
          console.log("Verification successfull...", r);
          this.notification = null;
          this.sign_up_confirm_code = false;
        })
        .catch((e) => {this.on_error("Error during verification", e);});
      } catch (e) {
        this.on_error("Error in verify", e);
      }
    },
    toggle_sign: function() {
      try {
        this.sign = this.sign === null ? "sign-in" : (this.sign === "sign-in" ? "sign-up" : null);
      } catch (e) {
        this.on_error("Error in toggle_sign", e);
      }
    },
    on_error: function(msg, e) {
      if (this.error === null) {
        console.error(msg, e);
        this.error = {msg, e};
      }
    }
  }
};
</script>
