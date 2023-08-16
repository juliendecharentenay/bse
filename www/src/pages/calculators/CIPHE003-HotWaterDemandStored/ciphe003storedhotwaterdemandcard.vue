<template>
      <CardComponent>
        <template #header>Stored Hot Water Requirements</template>
        <template #description>
        <div>This calculator provides estimates of typical stored hot water requirements based on
        <a class="text-indigo-500" href="https://www.ciphe.org.uk/">CIPHE</a> Hot and Cold Water
        Supplies, Table 6 - Hot Water Demand.</div>
        <div class="pt-1 text-xs">Provided by JdC, 2023</div>
        </template>
      </CardComponent>
</template>
<script>
import CardComponent from "@/extras/extra-vue-ui/cards/cardcomponent.vue";

export default {
  name: "Ciphe003StoredHotWaterDemandCard",
  components: {
    CardComponent,
  },
};
</script>

