<template>
<div class="min-h-full">
  <NavbarComponent>
    <template #menu>
      <NavbarMenuItem :current="true" href="/index.html">Home</NavbarMenuItem>
      <NavbarMenuItem :current="false" href="/uniclass.html">Uniclass maps</NavbarMenuItem>
      <NavbarMenuItem :current="false" href="/calculators.html">Calculators</NavbarMenuItem>
    </template>

    <template #menu_mobile>
      <NavbarMobileMenuItem :current="true" href="/index.html">Home</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="false" href="/uniclass.html">Uniclass maps</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="false" href="/calculators.html">Calculators</NavbarMobileMenuItem>
    </template>

<!--
    <template #sign>
      <NavbarActionItem @click="toggle_sign">Sign-in/Sign-up</NavbarActionItem>
    </template>
    <template #sign_mobile>
      <NavbarMobileActionItem @click="toggle_sign">Sign-in/Sign-up</NavbarMobileActionItem>
    </template>
    -->
  </NavbarComponent>

  <div class="flex flex-row justify-end md:pr-4 mt-2" v-show="sign !== null">
    <SignInSignUp :sign="sign" 
                  @signin="({username, password})        => {signin(username, password);}"
                  @signup="({username, password, email}) => {signup(username, password, email);}"
                  @update:sign="(evt) => {sign = evt;}"
                  @error="({msg, e}) => {on_error(msg, e);}"
                  />
  </div>

  <div class="py-10 mx-auto max-w-5xl text-gray-700">
    <header>
      <div class="px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Building Physics Online
        </h1>
      </div>
    </header>
    <main class="px-2">
      <p class="py-2">
      Building Services are the set of services that allow buildings to function. Building services includes, but is not limited to,
      the disciplines
      of heating, ventilation and air-conditioning (aka HVAC or mechanical), electrical, and public health. In the UK, they are
      governed by <a class="text-indigo-700" href="https://www.cibse.org">CIBSE (Chartered Institution of Building Services Engineers)</a>
      as well as a number of other bodies. In the US, the relevant body for mechanical (HVAC) engineers is 
      <a class="text-indigo-700" href="https://www.ashrae.org">ASHRAE (The American Societry of Heating, Refrigerating and Air-Conditioning
      Engineers)</a>.
      </p>
      <p class="py-2">
      Building Physics uses building services principles and calculations to inform design by extracting relevant metrics such as energy
      efficiency, etc. The extraction of these metrics typically require the understanding of the building services design and its 
      methodology. So an understanding of and an appreciation for design calculations is a welcomed skill to posses.
      </p>
      <p class="py-2">
      This website is a collection of information and engineering calculation based on documentation from governing bodies. 
      It serves two purposes.  Firstly to add to the understanding of building services calculation and 
      secondly to investigate a digital first, structured data approach to engineering. 
      </p>
      <p class="py-2">
      The structured data approach is looking at a data driven take on building information modelling (BIM) and engineering.
      An early decision is to rely on the <a class="text-indigo-700" href="TODO">Uniclass categorisation system</a> which led
      to the (in-progress) development of mapping tables from Uniclass codes onto calculation codes. <a class="text-indigo-700"
      href="/uniclass.html">View mapping tables</a>.
      </p>
      <p class="py-2">
      This website is a work-in-progress. The information, calculations, etc are provided with no warranty, fitness for purposes 
      - use at your own risk. 
      </p>
      <p class="py-2">
      This website is open-source, including calculations. It has been developed by the author as an individual with no endorsement 
      (implied or otherwise) from the author former, current and future employers. Source code is available at 
      <a class="text-indigo-700" href="https://github.com/juliendecharentenay/bse">
      https://github.com/juliendecharentenay/bse</a>.
      </p>
      <div class="pt-10 pb-4 flex flex-row justify-center gap-x-4">
      <ButtonPrimary><a href="/uniclass.html">Uniclass maps</a></ButtonPrimary>
      <ButtonPrimary><a href="/calculators.html">Calculators</a></ButtonPrimary>
      </div>
      <div class="py-2 flex flex-row-reverse border-t border-gray-100">
      <div class="pr-10 text-xs text-gray-400">Copyright (C) 2023, Dr Julien de Charentenay</div>
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
import ButtonPrimary from "@/extras/extra-vue-ui/button/buttonprimary.vue";

/**
import { signUpCognitoUser, signInCognitoUser, getCurrentCognitoUser,
         confirmCognitoUser } from "@/extras/extra-js-cognito/cognito.js";
         */

export default {
  name: "App",
  components: {
    NavbarComponent, NavbarMenuItem, NavbarMobileMenuItem, NavbarActionItem, NavbarMobileActionItem,
    ModalNotification, ModalError,
    SignInSignUp, SignUpConfirmCode,
    ButtonPrimary,
  },
  data: function() {
    return {
      notification: null,
      error: null,
      sign: null,
      sign_up_confirm_code: false,
      username: null,
    };
  },
  mounted: function() {
    try {
    /*
      const c = getCurrentCognitoUser();
      if (c !== null) { console.log("current user: ", c); }
      */
    } catch (e) {
      this.on_error("Error in mounted", e);
    }
  },
  methods: {
  /*
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
    */
    on_error: function(msg, e) {
      if (this.error === null) {
        console.error(msg, e);
        this.error = {msg, e};
      }
    }
  }
};
</script>
