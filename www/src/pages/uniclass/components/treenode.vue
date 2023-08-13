<template>
  <div class="flex flex-col">
    <div class="border-b border-gray-200 flex flex-row justify-between content-center hover:bg-gray-100">
      <div class="flex flex-row justify-left gap-x-1" @click="expanded = !expanded"
          :class="{'cursor-pointer' : current.children.length > 0}"
        >
        <div class="w-4 flex flex-col justify-center">
          <ChevronRightIcon  class="w-4 h-4" v-if="current.children.length > 0 && expanded === false" />
          <ChevronDownIcon class="w-4 h-4"   v-if="current.children.length > 0 && expanded === true" />
        </div>
        <div> {{ current.code }} </div>
        <div> {{ current.title }} </div>
      </div>
      <div class="italic flex flex-col justify-right text-right">
        <div v-for="(item, i) in mapped"
             :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    <div v-for="child in children"
         :key="child.code"
         class="pl-2">
      <TreeNode :current="child" :map="map" />
    </div>
  </div>
</template>
<script>
import { PlusIcon, MinusIcon,
         ChevronRightIcon, ChevronDownIcon,
       } from "@heroicons/vue/24/outline";

export default {
  name: "TreeNode",
  emits: [ 'error' ],
  components: {
    PlusIcon, MinusIcon,
    ChevronRightIcon, ChevronDownIcon,
  },
  props: {
    current: {
      type: Object,
      required: true,
    },
    map: {
      type: Function,
      default: () => null,
    },
  },
  computed: {
    children: function() {
      try {
        if (this.expanded) { return this.current.children; }
      } catch (e) {
        this.on_error("Error in children", e);
      }
      return [];
    },
    mapped: function() {
      try {
        const items = this.map(this.current);
        if (items !== null) { 
          if (this.current.children.length > 0) {
            const r = items.slice(0, 3).map((s) => s.length > 10 ? s.substring(0, 10)+"..." : s).join("; ")
                    + (items.length > 3 ? `and ${items.length - 3} more` : '');
            return [r];
          } else {
            return items;
          }
        }
      } catch (e) {
        this.on_error("Error in mapped", e);
      }
      return [];
    },
  },
  data: function() {
    return {
      expanded: false,
    };
  },
  methods: {
    on_error: function(msg, e) { this.$emit('error', {msg, e}); },
  },
};
</script>
