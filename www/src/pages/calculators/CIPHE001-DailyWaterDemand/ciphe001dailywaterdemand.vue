<template>
<div>
  <a class="pt-1 px-2 text-gray-500 text-xs flex flex-row gap-x-1" href="#" @click="$emit('back');">
    <ChevronLeftIcon class="w-4 h-4" />
    <div>back</div>
  </a>
  <div class="pt-7 pb-2 mx-auto max-w-5xl">
    <h1 class="text-3xl font-bold leading-right tracking-tight text-gray-900">
      Daily Water Demand Calculator
    </h1>
    <div class="text-gray-500 text-sm">
    This daily water demand calculator is based on CIPHE Hot and Cold Water Supplies, Table 2 - Daily water demand: "For guidance
    on the total water demand for typical types of buildings refer to Table 2 for daily water demand".
    </div>
    <div class="mt-1 text-gray-500 text-sm">
    For a number of building type, CIPHE Hot and Cold Water Supplies provides guidances to estimate the quantity to be used 
    if the number of occupants are not accurately known. 
    </div>
    <div class="mt-1 text-gray-500 text-xs">
    Disclaimer: Use this calculator at your own risk. No warranty.
    </div>
  </div>
  <div class="px-2 mx-auto max-w-7xl">
    <div class="mt-2 border-b border-gray-200"></div>
    <div class="my-2 py-2 text-center text-gray-800">
    Total water demand: {{ daily_water_demand }} l/day
    </div>
    <div class="border-b border-gray-200"></div>
    <div class="px-10 py-4">
      <TableComponent>
        <template #thead>
          <tr>
            <TableColumnHeader>Type of building</TableColumnHeader>
            <TableColumnHeader>Quantity</TableColumnHeader>
            <TableColumnHeader>Unit</TableColumnHeader>
            <TableColumnHeader>Water demand (l/day)</TableColumnHeader>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in items"
              :key="item.key">
            <TableEntry>{{ item.name }}</TableEntry>
            <TableEntry>
              <InputMinimalComponent :modelValue="inputs[item.key]" @update:modelValue="(v) => {inputs[item.key] = v;}" />
            </TableEntry>
            <TableEntry>{{ item.unit }}</TableEntry>
            <TableEntry>{{ demand(item.key) }}</TableEntry>
          </tr>
        </template>
      </TableComponent>
    </div>
    <div class="border-b border-gray-200"></div>
    <div class="pt-1 text-xs flex flex-row-reverse pr-4 text-gray-500">
      Provided by JdC, version {{ version }}
    </div>
  </div>
  <Ciphe001DailyWaterDemandGuides @dismiss="show_guides = false" v-if="show_guides" />
</div>
</template>
<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import TableComponent    from "@/extras/extra-vue-ui/tables/tablecomponent.vue";
import TableColumnHeader from "@/extras/extra-vue-ui/tables/tablecolumnheader.vue";
import TableEntry        from "@/extras/extra-vue-ui/tables/tableentry.vue";
import InputMinimalComponent from "@/extras/extra-vue-ui/input/inputminimalcomponent.vue";
import Ciphe001DailyWaterDemandGuides from "./ciphe001dailywaterdemandguides.vue";

import { get_version, get_items, 
         get_demand, get_total_demand,
       }                 from "./calculator.js";

export default {
  name: "Ciphe001DailyWaterDemand",
  emits: [ 'back', 'error' ],
  components: {
    ChevronLeftIcon,
    TableComponent, TableColumnHeader, TableEntry,
    InputMinimalComponent,
    Ciphe001DailyWaterDemandGuides,
  },
  props: {
    get_items: {
      type: Function,
      default: get_items,
    },
    get_demand: {
      type: Function,
      default: get_demand,
    },
    get_total_demand: {
      type: Function,
      default: get_total_demand,
    },
    version: {
      type: String,
      default: get_version(),
    },
  },
  data: function() {
    return {
      inputs: {},
      show_guides: false,
    };
  },
  computed: {
    daily_water_demand: function() {
      try {
        const quantities = Object.keys(this.inputs)
          .reduce((h, k) => {
            let v = Number(this.inputs[k]);
            if (! Number.isNaN(v)) { h[k] = v; }
            return h;
          }, {});
          console.log(quantities);
          let r = this.get_total_demand(quantities);
          console.log(r);
          return r;
      } catch (e) {
        this.on_error("Error calculating daily water demand", e);
      }
      return "n.a";
    },
    items: function() {
      try {
        return this.get_items();
      } catch (e) {
        this.on_error("Error retrieving items", e);
      };
      return [];
    },
  },
  methods: {
    demand: function(k) {
      try {
        const q = Number(this.inputs[k]);
        return Number.isNaN(q) ? '' : this.get_demand(k, q);
      } catch (e) {
        this.on_error(`Error calculating demand for key {k}`, e);
      }
      return "n.a";
    },
    on_error: function(msg, e) { this.$emit('error', {msg, e}); },
  },
};
</script>
