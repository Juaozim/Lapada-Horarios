<template>
  <v-container fluid class="homeContainer">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h1 class="homeTitle text-center">
          Horários - LAPADA
        </h1>
      </v-col>

      <v-btn class="button" outlined color="white"
      @click="selectedBase = 'IFCE'"
      v-bind:class="{ selectedBaseBtn: selectedBase.includes('IFCE') }">
        IFCE
      </v-btn>

      <v-btn class="button" outlined color="white"
      @click="selectedBase = 'IRACEMA'"
      v-bind:class="{ selectedBaseBtn: selectedBase.includes('IRACEMA') }">
        IRACEMA
      </v-btn>

      <weekTable :base="selectedBase"></weekTable>
    </v-row>
  </v-container>
</template>

<script>
import weekTable from '../components/table.vue';

export default {
  name: 'home',
  components: {
    weekTable,
  },
  data() {
    return {
      selectedBase: '',
    };
  },
};
</script>

<style scoped>
  .homeContainer {
    min-height: 100vh;
    background-image: radial-gradient( circle 848px at 10% 20%, #7697A0 0%, #94B0B7 90% );
  }
  .homeTitle {
    color: #fff;
    text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
    text-align: center;
  }
  .button {
    width: 130px;
    margin: 0 10px;
    transition: all .2s ease-in-out;
  }
  .button:hover {
    transform: scale(1.1);
  }
  .selectedBaseBtn {
    background-color: #e77f3f !important;
    border-color: #e77f3f !important;
  }
</style>
