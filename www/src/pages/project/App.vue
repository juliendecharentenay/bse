<template>
<div class="h-full">
  <div class="h-full inset-0 flex flex-row justify-stretch content-stretch">
    <!-- Sidebar -->
    <div class="flex-none flex flex-col content-center gap-y-5 overflow-y-auto px-4 pt-5 text-gray-500 border-r border-gray-300">
      <a href="/index.html"><HomeIcon class="h-6 w-6" /></a>
      <FolderIcon class="h-6 w-6" />
    </div>

    <div class="flex-auto ml-4">
      Content
    </div>
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
import ModalNotification from "@/extras/extra-vue-ui/modal/modalnotification.vue";
import ModalError from "@/extras/extra-vue-ui/modal/modalerror.vue";

import { HomeIcon, FolderIcon, } from "@heroicons/vue/24/outline";

export default {
  name: "App",
  components: {
    ModalNotification, ModalError,
    HomeIcon, FolderIcon,
  },
  data: function() {
    return {
      notification: null,
      error: null,
    };
  },
  mounted: function() {
    try {
    } catch (e) {
      this.on_error("Error in mounted", e);
    }
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
