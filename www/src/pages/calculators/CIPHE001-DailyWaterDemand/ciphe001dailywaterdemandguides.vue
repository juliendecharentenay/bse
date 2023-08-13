<template>
  <ModalBackground>
    <div class="rounded-lg bg-white p-4 min-w-[50%] 2xl:min-w-[33%]">
      <div class="flex flex-col">
        <h3 class="text-sm font-medium text-gray-800">Daily Water Demand Guides</h3>
        <div class="mt-2 text-sm text-gray-700">
        The following guides can be used as estimates when the number of occupants is not known:
        </div>
        <div class="mt-2 text-sm text-gray-600 grid grid-cols-4 space-x-2 items-center">
          <div>Offices:</div>
          <div><InputMinimalComponent v-model="office_gfa" /></div>
          <div>m2 gross building floor area<br/>
          <div class="text-xs">@ 1 person per 14m2</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>{{ persons_office }}</div>
            <div class="cursor-pointer" @click="copy_clipboard(persons_office)"><ClipboardIcon class="w-4 h-4" /></div>
          </div>

          <div>Sports hall:</div>
          <div><InputMinimalComponent v-model="badmington_court_per_hour" /></div>
          <div>Badmington court area per hour open, maximum<br/>
          <div class="text-xs">@ 4 persons per court</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>{{ persons_sports_hall }}</div>
            <div class="cursor-pointer" @click="copy_clipboard(persons_sports_hall)"><ClipboardIcon class="w-4 h-4" /></div>
          </div>

          <div>Swimming pools:</div>
          <div><InputMinimalComponent v-model="cubical_per_hour" /></div>
          <div>Cubical per hour open<br/>
          <div class="text-xs">@ 1 person per cubical with 0.6 diversity</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>{{ persons_swimming_pools }}</div>
            <div class="cursor-pointer" @click="copy_clipboard(persons_swimming_pools)"><ClipboardIcon class="w-4 h-4" /></div>
          </div>

          <div>Field sports:</div>
          <div><InputMinimalComponent v-model="person_per_team_per_pitchs" /></div>
          <div>Cubical per hour open<br/>
          <div class="text-xs">@ 1 person per cubical with 0.6 diversity</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>{{ persons_swimming_pools }}</div>
            <div class="cursor-pointer" @click="copy_clipboard(persons_swimming_pools)"><ClipboardIcon class="w-4 h-4" /></div>
          </div>



        </div>
        <div class="flex flex-row justify-end mt-3">
          <ButtonSecondary @click="$emit('dismiss')" >
            dismiss
          </ButtonSecondary>
        </div>
      </div>
    </div>
  </ModalBackground>
</template>
<script>
import ModalBackground from "@/extras/extra-vue-ui/modal/modalbackground.vue";
import ButtonSecondary from "@/extras/extra-vue-ui/button/buttonsecondary.vue";
import InputMinimalComponent from "@/extras/extra-vue-ui/input/inputminimalcomponent.vue";

import { ClipboardIcon } from "@heroicons/vue/24/outline";

export default {
  name: "Ciphe001DailyWaterDemandGuides",
  emits: [ 'dismiss', 'error' ],
  components: {
    ModalBackground, ButtonSecondary,
    InputMinimalComponent,
    ClipboardIcon,
  },
  data: function() {
    return {
      office_gfa: null,
      badmington_court_per_hour: null,
      cubical_per_hour: null,
    };
  },
  computed: {
    persons_office: function() { 
      return this.evaluate(this.office_gfa, (v) => v/14.0);
    },
    persons_sports_hall: function() { 
      return this.evaluate(this.badmington_court_per_hour, (v) => 4.0*v);
    },
    persons_swimming_pools: function() { 
      return this.evaluate(this.cubical_per_hour, (v) => 1.0*v*0.6);
    },


  },
  methods: {
    evaluate: function(quantity, callback) {
      try {
        if (quantity === null || quantity === '') { return ""; }
        const v = Number(quantity);
        if (! Number.isNaN(v)) { return callback(v).toFixed(1); }
      } catch (e) {
        this.on_error("Error evaluating the number of persons", e);
      }
      return "n.a";
    },
    copy_clipboard: function(t) {
      try {
        navigator.clipboard.writeText(t)
        .catch((e) => {this.on_error("Error processing copy to clipboard request", e);});
      } catch (e) {
        this.on_error("Error during copy to clipboard", e);
      }
    },
    on_error: function(msg, e) { this.$emit({msg, e}); },
  },
};
</script>
