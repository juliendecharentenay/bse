<template>
<CalculatorComponent
  @back="$emit('back')"
  @error="(e) => {$emit('error', e);}"
  :get_items="get_items"
  :calculate="calculate"
  unit="l/day"
  :uniclass="get_uniclass"
  >
  <template #title>Daily Hot Water Demand Calculator</template>
  <template #description>
    <div>
    This daily hot water demand calculator is based on CIPHE Hot and Cold Water Supplies, Table 6 - Hot water demand. "The buildings
    total daily hot water usage is relevant to the assessment of the peak demand."
    </div>
    <div class="mt-1">
    For a number of building type, CIPHE Hot and Cold Water Supplies provides guidances to estimate the quantity to be used 
    if the number of occupants are not accurately known. 
    </div>
  </template>
  <template #footer>Provided by JdC, version {{ version }}</template>
</CalculatorComponent>
</template>
<script>
import CalculatorComponent from "../components/calculatorcomponent.vue";
import { get_version, get_items, get_demand, 
       }                 from "./calculator.js";
import { uniclass_map }  from "./uniclass.js";

export default {
  name: "Ciphe002DailyHotWaterDemand",
  emits: [ 'back', 'error' ],
  components: {
    CalculatorComponent,
  },
  props: {
    get_items: { type: Function, default: get_items, },
    calculate: { type: Function, default: get_demand, },
    version:   { type: String, default: get_version(), },
  },
  methods: {
    get_uniclass: function(k) {
      try {
        return uniclass_map.filter(({key}) => key === k);
      } catch (e) {
        this.on_error("Error in get_uniclass", e);
      }
      return [];
    },
    on_error: function(msg, e) { this.$emit('error', {msg, e}); },
  },
};
</script>
