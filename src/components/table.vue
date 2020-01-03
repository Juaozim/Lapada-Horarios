<template>
  <v-container fluid>
    <v-row class="loadingRow" v-if="loading" align="center" justify="center">
      <v-progress-circular
        :size="70"
        :width="5"
        color="#e77f3f"
        indeterminate
      ></v-progress-circular>
    </v-row>

    <v-row align="center" justify="center"
     v-if="(ifceTable || iracemaTable) && !loading">
      <v-col cols="12">
        <v-divider dark style="margin-bottom: 25px;"></v-divider>
      </v-col>

      <v-col cols="12">
        <v-row  align="center" justify="center" class="weekBtnsRow">
          <v-btn class="button" outlined color="white"
          @click="selectedDay = 'Segunda'"
          v-bind:class="{ selectedDayBtn: selectedDay.includes('Segunda') }">
            Segunda-Feira
          </v-btn>

          <v-btn class="button" outlined color="white"
          @click="selectedDay = 'Terça'"
          v-bind:class="{ selectedDayBtn: selectedDay.includes('Terça') }">
            Terça-Feira
          </v-btn>

          <v-btn class="button" outlined color="white"
          @click="selectedDay = 'Quarta'"
          v-bind:class="{ selectedDayBtn: selectedDay.includes('Quarta') }">
            Quarta-Feira
          </v-btn>

          <v-btn class="button" outlined color="white"
          @click="selectedDay = 'Quinta'"
          v-bind:class="{ selectedDayBtn: selectedDay.includes('Quinta') }">
            Quinta-Feira
          </v-btn>

          <v-btn class="button" outlined color="white"
          @click="selectedDay = 'Sexta'"
          v-bind:class="{ selectedDayBtn: selectedDay.includes('Sexta') }">
            Sexta-Feira
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col v-if="ifceTable && !loading" cols="11" class="hoursTable">
        <v-row  align="start" justify="center" id="ifceHoursRow">
          <div class="hourColumn"
            v-for="(hour, index) in ifceHours" :key="index">
            <div class="hourBox">
              {{hour}}
            </div>

            <div v-for="(bolsista, index) in ifceData" :key="index">
              <div v-if="bolsista[`Horários [${hour}]`] !== undefined
              && bolsista[`Horários [${hour}]`].includes(selectedDay)"
              class="bolsistaBox">
                {{bolsista.Nome}}
              </div>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col v-if="iracemaTable && !loading" cols="11" class="hoursTable">
        <v-row v-if="iracemaTable && !loading" align="start" justify="center" id="iracemaHoursRow">
          <div class="hourColumn"
            v-for="(hour, index) in iracemaHours" :key="index">
            <div class="hourBox">
              {{hour}}
            </div>

            <div v-for="(bolsista, index) in iracemaData" :key="index">
              <div v-if="bolsista[`Horários [${hour}]`] !== undefined
              && bolsista[`Horários [${hour}]`].includes(selectedDay)"
              class="bolsistaBox">
                {{bolsista.Nome}}
              </div>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import api from '../plugins/axios';

export default {
  props: {
    base: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      iracemaHours: [
        '08:00 - 08:30',
        '08:30 - 09:00',
        '09:30 - 10:00',
        '10:00 - 10:30',
        '10:30 - 11:00',
        '11:00 - 11:30',
        '11:30 - 12:00',
        '12:00 - 12:30',
        '12:30 - 13:00',
        '13:00 - 13:30',
        '13:30 - 14:00',
        '14:00 - 14:30',
        '14:30 - 15:00',
        '15:00 - 15:30',
        '15:30 - 16:00',
        '16:00 - 16:30',
        '16:30 - 17:00',
        '17:00 - 17:30',
        '17:30 - 18:00',
      ],
      ifceHours: [
        '08:00 - 08:30',
        '08:30 - 09:00',
        '09:30 - 10:00',
        '10:00 - 10:30',
        '10:30 - 11:00',
        '11:00 - 11:30',
        '11:30 - 12:00',
        '12:00 - 12:30',
        '12:30 - 13:00',
        '13:00 - 13:30',
        '13:30 - 14:00',
        '14:00 - 14:30',
        '14:30 - 15:00',
        '15:00 - 15:30',
        '15:30 - 16:00',
        '16:00 - 16:30',
        '16:30 - 17:00',
        '17:00 - 17:30',
        '17:30 - 18:00',
        '18:00 - 18:30',
        '18:30 - 19:00',
        '19:00 - 19:30',
        '19:30 - 20:00',
        '20:00 - 20:30',
        '20:30 - 21:00',

      ],
      loading: false,
      ifceTable: false,
      iracemaTable: false,
      ifceData: {},
      iracemaData: {},
      selectedDay: '',
    };
  },
  methods: {
    getIfceData() {
      this.loading = true;
      api.get()
        .then((res) => {
          if (res.status === 200) {
            this.loading = false;
            this.ifceData = res.data.filter((bolsista) => {
              if (bolsista['Base de Operação'].includes('IFCE')) {
                return bolsista;
              }
              return null;
            });
            if (this.iracemaTable) {
              this.iracemaTable = false;
            }
            this.selectedDay = 'Segunda';
            this.ifceTable = true;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getIracemaData() {
      this.loading = true;
      api.get()
        .then((res) => {
          if (res.status === 200) {
            this.loading = false;
            this.iracemaData = res.data.filter((bolsista) => {
              if (bolsista['Base de Operação'].includes('Iracema Coworking')) {
                return bolsista;
              }
              return null;
            });
            if (this.ifceTable) {
              this.ifceTable = false;
            }
            this.selectedDay = 'Segunda';
            this.iracemaTable = true;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    base() {
      if (this.base.includes('IFCE')) {
        this.getIfceData();
      }
      if (this.base.includes('IRACEMA')) {
        this.getIracemaData();
      }
    },
  },
};
</script>

<style scoped>
  .hoursTable {
    overflow-x: scroll;
  }
  #iracemaHoursRow {
    width: 3850px;
  }
  #ifceHoursRow {
    width: 5050px;
  }
  .hourColumn {
    display: flex;
    flex-direction: column;
    justify-content: start;
    color: #ffffff;
    /* border: 1px solid #ffffff; */
    margin: 0 5px;
    max-width: 192px;
  }
  .hourBox {
    background-color: #476f36;
    border-radius: 8px;
    padding: 20px 50px;
  }
  .bolsistaBox {
    text-align: center;
    padding: 20px;
    /* border: 1px solid #ffffff; */
    border-radius: 8px;
    margin-top: 10px;
    background: #6fa259;
    color: #fff;
  }
  .loadingRow {
    margin-top: 30px;
  }
  .weekBtnsRow {
    margin-bottom: 25px;
  }
  .button {
    width: 140px;
    margin: 5px 10px;
    transition: all .2s ease-in-out;
  }
  .button:hover {
    transform: scale(1.1);
  }
  .selectedDayBtn {
    background-color: #476f36 !important;
    border-color: #476f36 !important;
  }
</style>
