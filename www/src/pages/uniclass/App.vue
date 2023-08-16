<template>
<div class="min-h-full">
  <NavbarComponent>
    <template #menu>
      <NavbarMenuItem :current="false" href="/index.html">Home</NavbarMenuItem>
      <NavbarMenuItem :current="true" href="/uniclass.html">Uniclass maps</NavbarMenuItem>
      <NavbarMenuItem :current="false" href="/calculators.html">Calculators</NavbarMenuItem>
    </template>

    <template #menu_mobile>
      <NavbarMobileMenuItem :current="false" href="/index.html">Home</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="true" href="/uniclass.html">Uniclass maps</NavbarMobileMenuItem>
      <NavbarMobileMenuItem :current="false" href="/calculators.html">Calculators</NavbarMobileMenuItem>
    </template>
  </NavbarComponent>

  <div class="py-10 mx-auto max-w-5xl text-gray-700">
    <header>
      <div class="px-4 sm:px-6 lg:px-8 flex flex-row justify-between content-center">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Uniclass
        </h1>
        <div class="flex flex-row items-center gap-x-1">
          <div>To:</div>
          <SelectComponent v-model="map">
            <option value="none"></option>
            <option value="dailywaterdemand_ciphe">Daily Water Demand [CIPHE]</option>
            <option value="dailyhotwaterdemand_ciphe">Daily Hot Water Demand [CIPHE]</option>
            <option value="storedhotwaterdemand_ciphe">Stored Hot Water Demand [CIPHE]</option>
          </SelectComponent>
        </div>
      </div>
    </header>
    <main class="px-2">
      <div class="py-2">
        <TreeNode v-for="r in root"
                  :key="r.code"
                  :current="r" 
                  :map="mapping"
                  />
      </div>
      <div class="py-2 flex flex-row-reverse border-t border-gray-100">
      <div class="pr-10 text-xs text-gray-400">Copyright (C) 2023, Dr Julien de Charentenay</div>
      </div>
    </main>
  </div>

  <ModalNotification v-if="notification !== null && error === null">{{ notification }}</ModalNotification>
  <ModalError v-if="error !== null" @dismiss="() => {console.log('dismiss'); error = null;}" >
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
import SelectComponent from "@/extras/extra-vue-ui/select/selectcomponent.vue";

import TreeNode from "./components/treenode.vue";

import { en } from "@/lib/uniclass/uniclass.js";

import { uniclass_map as uniclass_to_ciphe_dailywaterdemand } from "@/pages/calculators/CIPHE001-DailyWaterDemand/uniclass.js";
import * as ciphe_dailywaterdemand from "@/pages/calculators/CIPHE001-DailyWaterDemand/calculator.js";
import { uniclass_map as uniclass_to_ciphe_dailyhotwaterdemand } from "@/pages/calculators/CIPHE002-HotWaterDemandDaily/uniclass.js";
import * as ciphe_dailyhotwaterdemand from "@/pages/calculators/CIPHE002-HotWaterDemandDaily/calculator.js";
import { uniclass_map as uniclass_to_ciphe_storedhotwaterdemand } from "@/pages/calculators/CIPHE003-HotWaterDemandStored/uniclass.js";
import * as ciphe_storedhotwaterdemand from "@/pages/calculators/CIPHE003-HotWaterDemandStored/calculator.js";

import { Mapping } from "./js/mapping.js";

const mappings = {
  'none':                       new Mapping(),
  'dailywaterdemand_ciphe':     new Mapping(uniclass_to_ciphe_dailywaterdemand, ciphe_dailywaterdemand.get_items),
  'dailyhotwaterdemand_ciphe':  new Mapping(uniclass_to_ciphe_dailyhotwaterdemand, ciphe_dailyhotwaterdemand.get_items),
  'storedhotwaterdemand_ciphe': new Mapping(uniclass_to_ciphe_storedhotwaterdemand, ciphe_storedhotwaterdemand.get_items),
};

export default {
  name: "App",
  components: {
    NavbarComponent, NavbarMenuItem, NavbarMobileMenuItem, NavbarActionItem, NavbarMobileActionItem,
    ModalNotification, ModalError, SelectComponent,
    TreeNode,
  },
  props: {
    uniclass_en: {
      default: en,
    },
  },
  data: function() {
    return {
      notification: null,
      error: null,
      root: [],
      // map: 'none',
      map: 'dailywaterdemand_ciphe',
    };
  },
  computed: {
    mapping: function() {
      try {
        if (this.map in mappings) {
          const map = mappings[this.map];
          return (v) => { 
            try {
              return map.map(v.code);
            } catch (e) {
              this.on_error(`Error in mapping with key ${this.map}`, e);
            }
          };
        } else {
          throw new Error(`map ${this.map} is not supported`);
        }
      } catch (e) {
        this.on_error("Error in mapping", e);
      }
      return () => null;
    },
  },
  mounted: function() {
    try {
      const en_hash = en.reduce((h, e) => {h[e.code] = e; return h;}, {});

      this.root = [];
      const r = /^(?<code>[a-zA-Z]{2})_(?<group>[0-9]{2})(?:_(?<subgroup>[0-9]{2}))?(?:_(?<section>[0-9]{2}))?/;
      en.forEach((e) => {
        const {code, group, subgroup, section} = r.exec(e.code).groups;
        if (code === undefined || group === undefined) { throw new Error(`Invalid code ${e.code}`); }

        let key = `${code}_${group}`;
        let g = this.root.find((e) => e.code === key);
        if (g === undefined) {
          g = {...en_hash[key], children: []};
          this.root.push(g);
        }

        if (subgroup !== undefined) {
          key = `${key}_${subgroup}`;
          let sg = g.children.find((e) => e.code === key);
          if (sg === undefined) {
            sg = {...en_hash[key], children: []};
            g.children.push(sg);
          }

          if (section !== undefined) {
            key = `${key}_${section}`;
            let sc = sg.children.find((e) => e.code === key);
            if (sc === undefined) {
              sc = {...en_hash[key], children: []};
              sg.children.push(sc);
            }
          }
        }
      });
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
