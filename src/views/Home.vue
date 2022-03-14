<template>
  <Configurator />
</template>

<script lang="ts">
import Vue from 'vue';
import Configurator from '@/components/Configurator.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Configurator,
  },
});
</script>
