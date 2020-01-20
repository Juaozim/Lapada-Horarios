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

      <v-col cols="11" v-if="ifceTable && !loading">
        <v-autocomplete background-color="#ffffff" clearable
          @click:clear="clearSelectedBolsista()"
          label="Selecionar bolsista" filled
          :items="ifceBolsistas" v-model="selectedBolsista"
          hide-details
        ></v-autocomplete>
      </v-col>
    </v-row>

    <!-- IFCE TABLE -->
    <v-row align="center" justify="center">
      <v-col v-if="ifceTable && !loading && !selectedBolsistaData"
      cols="11" class="hoursTable">
        <div class="hoursDiv" v-for="(hour, index) in ifceHours" :key="index">
          <div class="hourVerticalBox">
            <div class="hourBox">
              {{hour}}
            </div>

            <div class="" v-for="(bolsista, index) in ifceData" :key="index">
              <div v-if="bolsista[`Horários [${hour}]`] !== undefined
              && bolsista[`Horários [${hour}]`].includes(selectedDay)"
              class="bolsistaVerticalBox">
                <span class="bolsistaName">{{splitName(bolsista.Nome)}}</span>
                <div class="bolsistaCardData">
                  {{bolsista[`Espaço Iracema`]}} <span v-if="bolsista[`Espaço Iracema`]">-</span>
                  {{bolsista[`Estação`]}} <span v-if="bolsista[`Espaço Iracema`]"><br></span>
                  {{bolsista[`Uso de PC`]}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <v-col v-if="ifceTable && selectedBolsistaData"
      cols="11" class="hoursTable">
        <div class="bolsistaDados">
          <h3>
            Dados do bolsista {{selectedBolsistaData[0].Nome}}
          </h3>
          <h4>
            Email: {{selectedBolsistaData[0][`Endereço de e-mail`]}}
          </h4>
          <h4>
            Projeto(s): {{selectedBolsistaData[0][`Projetos`]}}
          </h4>
          <h4>
            Uso de PC: {{selectedBolsistaData[0][`Uso de PC`]}}
          </h4>
          <h4>
            Total de horas semanais: {{calculateWeeklyHours()}}h
          </h4>
        </div>

        <div class="hoursDiv" v-for="(hour, index) in ifceHours" :key="index"
        v-show="selectedBolsistaData[0][`Horários [${hour}]`] !== undefined &&
        selectedBolsistaData[0][`Horários [${hour}]`].includes(selectedDay)">
          <div class="hourVerticalBox">
            <div class="hourBox">
              {{hour}}
            </div>

            <div v-if="selectedBolsistaData[0][`Horários [${hour}]`] !== undefined
            && selectedBolsistaData[0][`Horários [${hour}]`].includes(selectedDay)"
            class="bolsistaVerticalBox">
              {{splitName(selectedBolsistaData[0].Nome)}}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- IRACEMA TABLE -->
    <v-row align="center" justify="center">
      <v-col cols="11" v-if="iracemaTable && !loading">
        <v-autocomplete background-color="#ffffff" clearable
          @click:clear="clearSelectedBolsista()"
          label="Selecionar bolsista" filled
          :items="iracemaBolsistas" v-model="selectedBolsista"
          hide-details
        ></v-autocomplete>
      </v-col>

      <v-col v-if="iracemaTable && !loading && !selectedBolsistaData"
      cols="11" class="hoursTable">
        <div class="hoursDiv" v-for="(hour, index) in iracemaHours" :key="index">
          <div class="hourVerticalBox">
            <div class="hourBox">
              {{hour}}
            </div>

            <div class="" v-for="(bolsista, index) in iracemaData" :key="index">
              <div v-if="bolsista[`Horários [${hour}]`] !== undefined
              && bolsista[`Horários [${hour}]`].includes(selectedDay)"
              class="bolsistaVerticalBox">
                <span class="bolsistaName">{{splitName(bolsista.Nome)}}</span>
                <div class="bolsistaCardData">
                  {{bolsista[`Espaço Iracema`]}} <span v-if="bolsista[`Espaço Iracema`]">-</span>
                  {{bolsista[`Estação`]}} <span v-if="bolsista[`Espaço Iracema`]"><br></span>
                  {{bolsista[`Uso de PC`]}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <v-col v-if="iracemaTable && selectedBolsistaData"
      cols="11" class="hoursTable">
        <div class="bolsistaDados">
          <h3>
            Dados do bolsista {{selectedBolsistaData[0].Nome}}
          </h3>

          <h4>
            Email: {{selectedBolsistaData[0][`Endereço de e-mail`]}}
          </h4>

          <h4>
            Projeto(s): {{selectedBolsistaData[0][`Projetos`]}}
          </h4>

          <h4>
            Uso de PC: {{selectedBolsistaData[0][`Uso de PC`]}}
          </h4>

          <h4>
            {{selectedBolsistaData[0][`Espaço Iracema`]}} - {{selectedBolsistaData[0][`Estação`]}}
          </h4>

          <h4>
            Total de horas semanais: {{calculateWeeklyHours()}}h
          </h4>
        </div>

        <div class="hoursDiv" v-for="(hour, index) in iracemaHours" :key="index"
        v-show="selectedBolsistaData[0][`Horários [${hour}]`] !== undefined &&
        selectedBolsistaData[0][`Horários [${hour}]`].includes(selectedDay)">
          <div class="hourVerticalBox">
            <div class="hourBox">
              {{hour}}
            </div>

            <div>
              <div v-if="selectedBolsistaData[0][`Horários [${hour}]`] !== undefined
              && selectedBolsistaData[0][`Horários [${hour}]`].includes(selectedDay)"
              class="bolsistaVerticalBox">
                {{splitName(selectedBolsistaData[0].Nome)}}
              </div>
            </div>
          </div>
        </div>
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
      verticalView: this.verticalViewMode,
      ifceBolsistas: [],
      iracemaBolsistas: [],
      selectedBolsista: '',
      selectedBolsistaData: null,
      filterSelectedBolsista: true,
    };
  },
  methods: {
    clearSelectedBolsista() {
      this.selectedBolsista = null;
      this.selectedBolsistaData = null;
      this.filterSelectedBolsista = false;
    },
    calculateWeeklyHours() {
      let operationalBaseHours = null;
      let days = 0;
      let hours = 0;

      if (this.base.includes('IFCE')) {
        operationalBaseHours = this.ifceHours;
      } else {
        operationalBaseHours = this.iracemaHours;
      }

      operationalBaseHours.map((hour) => {
        let commas = 0;
        if (this.selectedBolsistaData[0][`Horários [${hour}]`]) {
          commas = (this.selectedBolsistaData[0][`Horários [${hour}]`].match(/,/g) || []).length;
        }

        if (commas !== 0) {
          days += commas + 1;
        }

        return days;
      });

      hours = days * 30;
      const weeklyHours = hours / 60;
      return weeklyHours;
    },
    getIfceData() {
      this.loading = true;
      api.get()
        .then((res) => {
          if (res.status === 200) {
            this.loading = false;
            this.ifceData = res.data.result.filter((bolsista) => {
              if (bolsista['Base de Operação'].includes('IFCE')) {
                return bolsista;
              }
              return null;
            });
            this.ifceBolsistas = this.ifceData.map(bolsista => bolsista.Nome);

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
            this.iracemaData = res.data.result.filter((bolsista) => {
              if (bolsista['Base de Operação'].includes('Iracema Coworking')) {
                return bolsista;
              }
              return null;
            });

            this.iracemaBolsistas = this.iracemaData.map(bolsista => bolsista.Nome);

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
    splitName(name) {
      const parts = name.split(' ');
      const retVal = `${parts[0]} ${parts[1]}`;
      return retVal;
    },
  },
  watch: {
    base() {
      if (this.base.includes('IFCE')) {
        this.getIfceData();
      } else {
        this.getIracemaData();
      }
      this.clearSelectedBolsista();
    },
    selectedBolsista() {
      if (this.base.includes('IFCE') && this.filterSelectedBolsista) {
        this.selectedBolsistaData = this.ifceData.filter((bolsista) => {
          if (bolsista.Nome.includes(this.selectedBolsista)) {
            return bolsista;
          }
          return null;
        });
      }
      if (this.base.includes('IRACEMA') && this.filterSelectedBolsista) {
        this.selectedBolsistaData = this.iracemaData.filter((bolsista) => {
          if (bolsista.Nome.includes(this.selectedBolsista)) {
            return bolsista;
          }
          return null;
        });
      }

      if (!this.filterSelectedBolsista) {
        this.filterSelectedBolsista = true;
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
    margin: 0 5px;
    max-width: 192px;
  }
  .hourBox {
    background-color: #476f36;
    border-radius: 8px;
    padding: 20px 50px;
  }
  .hoursDiv {
    display: flex;
    margin: 10px 10px;
  }
  .hoursDiv .hourBox {
    display: flex;
    align-items: center;
    width: 150px;
    padding: 20px 25px;
    color: #ffffff;
    margin-right: 5px;
  }
  .hourVerticalBox {
    margin-bottom: 5px;
    display: flex;
  }
  .bolsistaBox {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    margin-top: 10px;
    background: #6fa259;
    color: #fff;
  }
  .bolsistaVerticalBox {
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    min-height: 85px;
    background: #6fa259;
    color: #fff;
    width: 200px;
    margin: 0 5px;
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
  .bolsistaDados {
    margin-bottom: 40px;
  }
  .bolsistaDados h3, .bolsistaDados h4 {
    color: #ffffff;
    text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
    margin: 10px;
  }
  .bolsistaName {
    text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
    font-size: 13pt;
    font-weight: bold;
  }
  .bolsistaCardData {
    font-size: 10pt;
  }
</style>
