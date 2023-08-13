<template>
<div class="h-full">
  <NavbarComponent>
    <template #menu>
      <NavbarMenuItem :current="false" href="/index.html">Home</NavbarMenuItem>
      <NavbarMenuItem :current="false" href="/uniclass.html">Uniclass maps</NavbarMenuItem>
      <NavbarMenuItem :current="true" href="/calculators.html">Calculators</NavbarMenuItem>
    </template>

    <template #menu_mobile>
      <NavbarMobileMenuItem :current="false" href="/index.html">Home</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="false" href="/uniclass.html">Uniclass maps</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="true" href="/calculators.html">Calculators</NavbarMobileMenuItem>
    </template>
  </NavbarComponent>

  <div v-if="view === '#ciphe001'"><Ciphe001DailyWaterDemand @back="view = '#';" @error="({msg, e}) => {on_error(msg, e);}" /></div>
  <div class="py-10 text-gray-700" v-else>
    <header>
      <div class="mx-auto max-w-5xl text-center">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Calculators
        </h1>
      </div>
    </header>
    <main class="mt-6 px-2 mx-auto max-w-7xl grid grid-cols-3 gap-4">
      <a href="#ciphe001" @click="view = '#ciphe001';"><Ciphe001DailyWaterDemandCard /></a>
    </main>
  </div>

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
// import CardComponent from "@/extras/extra-vue-ui/cards/cardcomponent.vue";
import Ciphe001DailyWaterDemandCard from "@/pages/calculators/CIPHE001-DailyWaterDemand/ciphe001dailywaterdemandcard.vue";
import Ciphe001DailyWaterDemand     from "@/pages/calculators/CIPHE001-DailyWaterDemand/ciphe001dailywaterdemand.vue";

import { HomeIcon, FolderIcon, } from "@heroicons/vue/24/outline";

export default {
  name: "App",
  components: {
    NavbarComponent, NavbarMenuItem, NavbarMobileMenuItem, NavbarActionItem, NavbarMobileActionItem,
    ModalNotification, ModalError,
    // CardComponent,
    HomeIcon, FolderIcon,
    Ciphe001DailyWaterDemandCard, Ciphe001DailyWaterDemand,
  },
  data: function() {
    return {
      notification: null,
      error: null,
      view: '',
    };
  },
  mounted: function() {
    try {
      this.view = new URL(window.location.href).hash;
    } catch (e) {
      this.on_error("Error in mounted", e);
    }
  },
  computed: {
  },
  methods: {
    on_error: function(msg, e) {
      if (this.error === null) {
        console.error(msg, e);
        this.error = {msg, e};
      }
    }
  }
};
</script>
