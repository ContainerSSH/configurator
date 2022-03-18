<template>
  <v-app>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script type="ts">
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({}),
};
</script>
