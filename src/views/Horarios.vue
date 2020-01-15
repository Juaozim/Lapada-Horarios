<template>
  <v-container fluid class="homeContainer">
    <v-row justify="center" align="center">
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <h1 class="homeTitle">
          Horários dos bolsistas - LAPADA
        </h1>
      </v-col>
      <v-col cols="2">
        <div>
          <div class="text-center" style="color: #fff">
            Visualização Vertical
          </div>

          <div v-if="verticalView" class="eyeIcon"
           @click="verticalView = false">
            <v-icon>
              mdi-eye-outline
            </v-icon>
          </div>

          <div class="eyeIcon" v-else @click="verticalView = true">
            <v-icon>
              mdi-eye-off-outline
            </v-icon>
          </div>
        </div>
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

      <weekTable :base="selectedBase" :verticalViewMode="verticalView"></weekTable>
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
      verticalView: true,
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
  .eyeIcon {
    display: flex;
    justify-content: center;
  }
  .eyeIcon i {
    color: #fff;
  }
</style>
