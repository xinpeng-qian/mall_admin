<template>
  <div class="adds">
    <card />
    <charts />
  </div>
</template>

<script>
import card from '@/components/card.vue';
import charts from '@/components/charts.vue';

export default {
  components: {
    card,
    charts,
  },
};
</script>
