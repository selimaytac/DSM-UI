<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card color="grey lighten-1">
      <v-card-title>
        Monthly Kpi Status
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterKpiStatus" :items-per-page="10" :footer-props="{
        'items-per-page-options': [20, 50, 100, 200]
      }" class="elevation-1 table-cursor" :search="search">
        <template v-for="(col, index) in filters" v-slot:[`header.${index}`]="{ header }">
          {{ header.text }}
          <v-menu :key="index" offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" color="teal">
                <v-icon small :color="filters[header.value].length ? 'red' : ''">
                  mdi-filter-variant
                </v-icon>
              </v-btn>
            </template>
            <div style="background-color: white; width: 280px">
              <v-list>
                <v-list-item>
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete multiple dense auto-select-first clearable chips small-chips color="teal"
                      :items="columnValueList(header.value)" append-icon="mdi-filter" v-model="filters[header.value]"
                      :label="filters[header.value] ? `${header.text}` : ''" hide-details>
                      <template v-slot:selection="{ item, index }">
                        <v-chip small class="caption" v-if="index < 5">
                          <span>
                            {{ item }}
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption">
                          (+{{ filters[header.value].length - 5 }} others)
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </template>
        <template v-slot:item.graph="{ item }">
          <v-btn depressed rounded text color="primary" @click="showGraph(item)">
            <v-icon>mdi-chart-line </v-icon>Show Graph
          </v-btn>
        </template>
        <template v-slot:item.table="{ item }">
          <v-btn depressed rounded text color="primary" @click="showTable(item)">
            <v-icon>mdi-view-sequential-outline </v-icon>Show Table
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="graphDetail">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="graphDetail = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="flex text-center text-h5">GRAPH</v-toolbar-title>
          </v-toolbar>
          <template>
            <v-container fluid>
              <div>
                <h3>{{ appTitle }}</h3>
                <v-divider class="my-5"></v-divider>
                <h6>Diğer Grafikler İçin Kaydırınız...</h6>
                <line-chart :data="chartData" :legend="true" xtitle="Months" height="500px" />
                <v-divider class="my-10 bold"></v-divider>
                <area-chart :data="chartData"></area-chart>
                <v-divider class="my-10 bold"></v-divider>
                <bar-chart :data="chartData" suffix="%" height="700px"></bar-chart>
                <v-divider class="my-10 bold"></v-divider>
                <column-chart :data="chartData"></column-chart>
              </div>
            </v-container>
          </template>
        </v-card>
      </v-dialog>
      <v-dialog v-model="tableDetail">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="tableDetail = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="flex text-center text-h5">TABLE</v-toolbar-title>
          </v-toolbar>
          <template>
            <v-container fluid>
              <div>
                <h3>{{ appTitle }}</h3>
                <v-divider class="my-5"></v-divider>
                <v-data-table :headers="tableHeaders" :items="tableData" :items-per-page="10" :footer-props="{
                  'items-per-page-options': [20, 50, 100, 200]
                }" class="elevation-1 table-cursor" :search="search">
                  
                </v-data-table>
              </div>
            </v-container>
          </template>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'

import { mapGetters, mapActions } from "vuex";

export default {
  name: 'monthlykpi',
  data() {
    return {
      chartData: [
        // { name: '', data: { 'Ocak': 0, 'Şubat': 4, 'Mart': 90, 'Nisan': 10, 'Mayıs': 20, 'Haziran': 21, 'Temmuz': 16, 'Ağustos': 53, 'Eylül': 99, 'Ekim': 40, 'Kasım': 75, 'Aralık': 99.70 } },
        // { name: '2020', data: { 'Ocak': 0, 'Şubat': 4, 'Mart': 90, 'Nisan': 10, 'Mayıs': 20, 'Haziran': 32, 'Temmuz': 10, 'Ağustos': 50, 'Eylül': 99, 'Ekim': 100, 'Kasım': 100, 'Aralık': 100 } },
        // { name: '2021', data: { 'Ocak': 0, 'Şubat': 4, 'Mart': 90, 'Nisan': 10, 'Mayıs': 20, 'Haziran': 45, 'Temmuz': 8, 'Ağustos': 59, 'Eylül': 99, 'Ekim': 60, 'Kasım': 100, 'Aralık': 98 } },
        // { name: '2022', data: { 'Ocak': 51, 'Şubat': 54, 'Mart': 90, 'Nisan': 50, 'Mayıs': 50, 'Haziran': 51, 'Temmuz': 59, 'Ağustos': 72, 'Eylül': 99, 'Ekim': 90, 'Kasım': 95, 'Aralık': 93 } },
      ],
      tableData: [],
      filters: { application: [] },
      loading: false,
      selection: 1,
      graph: false,
      graphDetail: false,
      table: false,
      tableDetail: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      headers: [
        { text: 'Application Name', value: 'application' },
        { text: 'Graph', align: 'start', sortable: false, value: 'graph' },
        { text: 'Table', align: 'start', sortable: false, value: 'table' },
      ],
      tableHeaders: [
        { text: 'Application Name', value: 'application' },
        { text: 'Year', value: 'year' },
        { text: 'Ocak', value: 'ocak' },
        { text: 'Şubat', value: 'subat' },
        { text: 'Mart', value: 'mart' },
        { text: 'Nisan', value: 'nisan' },
        { text: 'Mayıs', value: 'mayis' },
        { text: 'Haziran', value: 'haziran' },
        { text: 'Temmuz', value: 'temmuz' },
        { text: 'Ağustos', value: 'agustos' },
        { text: 'Eylül', value: 'eylul' },
        { text: 'Ekim', value: 'ekim' },
        { text: 'Kasım', value: 'kasim' },
        { text: 'Aralık', value: 'aralik' },
      ],
      applicationNames: [],
      kpistatus: [],
      appTitle: '',
    }
  },
  computed: {
    ...mapGetters('monthlykpi', ['getKpiList']),
  },
  methods: {
    ...mapActions('monthlykpi', ['setMonthlyKpi']),
    async showGraph(item) {
      this.chartData = this.kpistatus.filter(x => x.application === item.application)
        .map(kpi => ({
          name: kpi.year, data:
            { 'Ocak': kpi.ocak, 'Şubat': kpi.subat, 'Mart': kpi.mart, 'Nisan': kpi.nisan, 'Mayıs': kpi.mayis, 'Haziran': kpi.haziran, 'Temmuz': kpi.temmuz, 'Ağustos': kpi.agustos, 'Eylül': kpi.eylul, 'Ekim': kpi.ekim, 'Kasım': kpi.kasim, 'Aralık': kpi.aralik }
        }))

      this.appTitle = item.application;
      this.graphDetail = true
    },
    async showTable(item) {
      this.tableData = this.kpistatus.filter(x => x.application === item.application)
        .map(kpi => ({
          'application': item.application, 'year':kpi.year, 'ocak': kpi.ocak, 'subat': kpi.subat, 'mart': kpi.mart, 'nisan': kpi.nisan, 'mayis': kpi.mayis, 'haziran': kpi.haziran, 'temmuz': kpi.temmuz, 'agustos': kpi.agustos, 'eylul': kpi.eylul, 'ekim': kpi.ekim, 'kasim': kpi.kasim, 'aralik': kpi.aralik
        }))
      this.appTitle = item.application;
      this.tableDetail = true
      console.log(this.tableData)
    },
    columnValueList(val) {
      return this.applicationNames.map((d) => d[val]);
    },
    async GetKpiList() {
      let count = 1;
      let temp = [];
      let response = await this.setMonthlyKpi(count);
      while (response.length > 0) {
        temp = temp.concat(response);
        count++;
        response = await this.setMonthlyKpi(count);
      }
      this.kpistatus = temp;

      this.applicationNames = [...new Set(temp.map(item => item.application))].map(application => ({ application: application }));
    },

  },
  created() {
    this.GetKpiList();
  },
  computed: {
    filterKpiStatus() {
      return this.applicationNames.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    }
  },
  components: {
    SideBar,
    NavBar,
  },
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.table-cursor tbody tr:hover {
  cursor: pointer;
}

.v-btn.withoutupercase {
  text-transform: none !important;
}

.v-btn:not(.v-btn--round).v-size--small {
  min-width: 30px !important;
  padding: 0 5px !important;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>