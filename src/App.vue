<template>
  <v-app>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './views/Horarios.vue';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
