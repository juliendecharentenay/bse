<template>
<div>
  <a class="pt-1 px-2 text-gray-500 text-xs flex flex-row gap-x-1" href="#" @click="$emit('back');">
    <ChevronLeftIcon class="w-4 h-4" />
    <div>back</div>
  </a>
  <div class="pt-7 pb-2 mx-auto max-w-5xl">
    <h1 class="text-3xl font-bold leading-right tracking-tight text-gray-900">
      <slot name="title"></slot>
    </h1>
    <div class="text-gray-500 text-sm">
      <slot name="description"></slot>
    </div>
    <div class="mt-1 text-gray-500 text-xs">
    Disclaimer: Use this calculator at your own risk. No warranty.
    </div>
  </div>
  <div class="px-2 mx-auto max-w-7xl">
    <div class="mt-2 border-b border-gray-200"></div>
    <div class="px-10 my-2 py-2 flex flex-row justify-center gap-x-20">
      <div><InputCheckbox v-model="show_uniclass">Show uniclass</InputCheckbox></div>
      <div class="text-center text-gray-800">
      Total: {{ total }} {{ unit }}
      </div>
    </div>
    <div class="border-b border-gray-200"></div>
    <div class="px-10 py-4">
      <TableComponent>
        <template #thead>
          <tr>
            <TableColumnHeader>Type of building</TableColumnHeader>
            <TableColumnHeader v-if="show_uniclass">Uniclass</TableColumnHeader>
            <TableColumnHeader>Quantity</TableColumnHeader>
            <TableColumnHeader>Unit</TableColumnHeader>
            <TableColumnHeader>{{ unit }}</TableColumnHeader>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="item in c_items"
              :key="item.key">
            <TableEntry>{{ item.name }}</TableEntry>
            <TableEntry v-if="show_uniclass">
              <div v-for="i in uniclass(item.key)"
                   :key="i.code">
                   {{ i.code }}
              </div>
            </TableEntry>
            <TableEntry>
              <InputMinimalComponent :modelValue="inputs[item.key]" @update:modelValue="(v) => {inputs[item.key] = v;}" />
            </TableEntry>
            <TableEntry>{{ item.unit }}</TableEntry>
            <TableEntry>{{ m_calculate(item.key) }}</TableEntry>
          </tr>
        </template>
      </TableComponent>
    </div>
    <div class="border-b border-gray-200"></div>
    <div class="pt-1 text-xs flex flex-row-reverse pr-4 text-gray-500">
      <slot name="footer"></slot>
    </div>
  </div>
</div>
</template>
<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import TableComponent    from "@/extras/extra-vue-ui/tables/tablecomponent.vue";
import TableColumnHeader from "@/extras/extra-vue-ui/tables/tablecolumnheader.vue";
import TableEntry        from "@/extras/extra-vue-ui/tables/tableentry.vue";
import InputMinimalComponent from "@/extras/extra-vue-ui/input/inputminimalcomponent.vue";
import InputCheckbox from "@/extras/extra-vue-ui/input/inputcheckbox.vue";

export default {
  name: "CalculatorComponent",
  emits: [ 'back', 'error' ],
  components: {
    ChevronLeftIcon,
    TableComponent, TableColumnHeader, TableEntry,
    InputMinimalComponent, InputCheckbox,
  },
  props: {
    get_items: {
      type: Function,
      required: true,
    },
    calculate: {
      type: Function,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    uniclass: {
      type: Function,
      required: true,
    },
  },
  data: function() {
    return {
      inputs: {},
      show_uniclass: false,
    };
  },
  computed: {
    total: function() {
      try {
        return Object.keys(this.inputs)
          .reduce((r, k) => {
            let q = Number(this.inputs[k]);
            return r + (! Number.isNaN(q) ? this.calculate(k,q) : 0.0);
          }, 0.0);
      } catch (e) {
        this.on_error("Error calculating total", e);
      }
      return "n.a";
    },
    c_items: function() {
      try {
        return this.get_items();
      } catch (e) {
        this.on_error("Error retrieving items", e);
      };
      return [];
    },
  },
  methods: {
    m_calculate: function(k) {
      try {
        const q = Number(this.inputs[k]);
        return Number.isNaN(q) ? '' : this.calculate(k, q);
      } catch (e) {
        this.on_error(`Error calculating for key {k}`, e);
      }
      return "n.a";
    },
    on_error: function(msg, e) { this.$emit('error', {msg, e}); },
  },
};
</script>
