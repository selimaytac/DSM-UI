<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card class="grey">
      <v-card-title>
        Responsibles
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2" outlined
              @click="loader = 'loading2',ExportExcel()">
              <v-icon color="primary" dark v-bind="attrs" v-on="on">
                mdi-microsoft-excel </v-icon>
            </v-btn>
          </template>
          <span>Export to Excel</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterResponsibles"  :items-per-page="10" :footer-props="{
        'items-per-page-options': [20, 50, 100, 200]
      }" class="elevation-1 table-cursor" :search="search" :loading="loaderTable">
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
                        <v-chip small class="caption" v-if="index < 10">
                          <span>
                            {{ item }}
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption">
                          (+{{ filters[header.value].length - 10 }} others)
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </template>
        <template v-slot:item.details="{ item }">
          <v-btn depressed rounded text color="primary" @click="showDetails(item)">
            <v-icon>mdi-eye</v-icon>Show Details
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogdetail">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialogdetail = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
          </v-toolbar>
            <template>
              <v-tabs color="primary" vertical>
                <v-tab>Servers</v-tab>
                <v-tab>Sites</v-tab>
                <v-tab-item>
                  <v-card color="primary">
                    <v-card-title>
                      Servers Details
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                      </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="serverheaders" :items="filterServers" :search="search" :items-per-page="10"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 50]
                      }" class="elevation-1">
                      <template v-for="(col, index) in serverFilters" v-slot:[`header.${index}`]="{ header }">
                        {{ header.text }}
                        <v-menu :key="index" offset-y :close-on-content-click="false">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="teal">
                              <v-icon small :color="serverFilters[header.value].length ? 'red' : ''">
                                mdi-filter-variant
                              </v-icon>
                            </v-btn>
                          </template>
                          <div style="background-color: white; width: 280px">
                            <v-list>
                              <v-list-item>
                                <div v-if="serverFilters.hasOwnProperty(header.value)">
                                  <v-autocomplete multiple dense auto-select-first clearable chips small-chips
                                    color="teal" :items="columnValueList2(header.value)" append-icon="mdi-filter"
                                    v-model="serverFilters[header.value]"
                                    :label="serverFilters[header.value] ? `${header.text}` : ''" hide-details>
                                    <template v-slot:selection="{ item, index }">
                                      <v-chip small class="caption" v-if="index < 5">
                                        <span>
                                          {{ item }}
                                        </span>
                                      </v-chip>
                                      <span v-if="index === 5" class="grey--text caption">
                                        (+{{ serverFilters[header.value].length - 5 }} others)
                                      </span>
                                    </template>
                                  </v-autocomplete>
                                </div>
                              </v-list-item>
                            </v-list>
                          </div>
                        </v-menu>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="primary">
                    <v-card-title>
                      Site Details
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                      </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="siteheaders" :items="filterSites" :search="search" :items-per-page="10"
                      :footer-props="{
                        'items-per-page-options': [5, 10, 20, 50]
                      }" class="elevation-1">
                      <template v-for="(col, index) in siteFilters" v-slot:[`header.${index}`]="{ header }">
                        {{ header.text }}
                        <v-menu :key="index" offset-y :close-on-content-click="false">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" color="teal">
                              <v-icon small :color="siteFilters[header.value].length ? 'red' : ''">
                                mdi-filter-variant
                              </v-icon>
                            </v-btn>
                          </template>
                          <div style="background-color: white; width: 280px">
                            <v-list>
                              <v-list-item>
                                <div v-if="siteFilters.hasOwnProperty(header.value)">
                                  <v-autocomplete multiple dense auto-select-first clearable chips small-chips
                                    color="teal" :items="columnValueList3(header.value)" append-icon="mdi-filter"
                                    v-model="siteFilters[header.value]"
                                    :label="siteFilters[header.value] ? `${header.text}` : ''" hide-details>
                                    <template v-slot:selection="{ item, index }">
                                      <v-chip small class="caption" v-if="index < 5">
                                        <span>
                                          {{ item }}
                                        </span>
                                      </v-chip>
                                      <span v-if="index === 5" class="grey--text caption">
                                        (+{{ siteFilters[header.value].length - 5 }} others)
                                      </span>
                                    </template>
                                  </v-autocomplete>
                                </div>
                              </v-list-item>
                            </v-list>
                          </div>
                        </v-menu>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-tab-item>
              </v-tabs>
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
import { responsibleService } from '@/services/api/responsible.service';
export default {
  name: 'responsible',
  responsibles: [],
  respServers: [],
  respSites: [],
  data() {
    return {
      filters: { responsibleName: [], },
      serverFilters: { serverName: [],fullName: [], ipAddress: [], operatingSystem: [], environments: [], applicationType: [], owner: [], contact: [], lastBackupDate: []},
      siteFilters: { siteName: [], physicalPath: [], domains: [], state: [], serverName: [], dnsName: [], appType:[]},
      dialog: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      loaderTable: false,
      responsibles: [],
      respServers: [],
      respSites: [],
      headers: [
        { text: 'Responsible Name',  value: 'responsibleName' },
        { text: 'Count of Servers', align: 'start', sortable: false, value: 'countOfServers' },
        { text: 'Count of Sites', align: 'start', sortable: false, value: 'countOfSites' },
        { text: 'View Details',align: 'start', sortable: false, value: 'details' },
      ],
      serverheaders: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'serverName', width: "100px", fixed: true },
        { text: 'Full Name', value: 'fullName', width: "200px", fixed: true },
        { text: 'IP Adress', value: 'ipAddress', width: "150px", fixed: true },
        { text: 'Operating System', value: 'operatingSystem', width: "200px", fixed: true },
        { text: 'Environments', value: 'environments', width: "200px", fixed: true },
        { text: 'App. Type', value: 'applicationType', width: "150px", fixed: true },
        { text: 'Owner', value: 'owner', width: "150px", fixed: true },
        { text: 'Contact', value: 'contact', width: "200px", fixed: true },
        { text: 'Last Backup Date', value: 'lastBackupDate', width: "200px", fixed: true },
      ],
      siteheaders: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName', width: "200px", fixed: true },
        { text: 'Physical Path', value: 'physicalPath', width: "200px", fixed: true },
        { text: 'Domains', value: 'domains', width: "200px", fixed: true },
        { text: 'State', value: 'state', width: "200px", fixed: true },
        { text: 'Server Name',align: 'start', sortable: false, value: 'serverName' },
        { text: 'DNS',align: 'start', sortable: false, value: 'dnsName'},
        { text: 'App. Type',align: 'start', sortable: false, value: 'appType'}        
      ],
      responsibles: [],
      respServers: [],
      respSites: [],
      dialogdetail: false,
    }
  },
  computed: {
    ...mapGetters('responsible', ['getResponsibles', 'getResponsibleServers', 'getResponsibleSites']),
  },
  methods: {
    ...mapActions('responsible', ['setResponsibles', 'setResponsibleServers', 'setResponsibleSites']),
    async showDetails(item) {
      this.details = item
      console.log(item)

      this.respServers = await this.setResponsibleServers(item.responsibleName);

      this.respSites = await this.setResponsibleSites(item.responsibleName);
      this.dialogdetail = true
      console.log(this.respSites)
      console.log(this.respServers)
    },
    columnValueList(val) {
      return this.responsibles.map((d) => d[val])
    },
    columnValueList2(val) {
      return this.respServers.map((d) => d[val]);
    },
    columnValueList3(val) {
      return this.respSites.map((d) => d[val]);
    },
    async GetRespList(count) {
      this.loaderTable = true;
      let response = await this.setResponsibles(count);
      this.responsibles = this.responsibles.concat(response);
      this.loaderTable = false;

    },
    ExportExcel() {
      if (this.search.length > 0) {
        responsibleService.getExportSearchList(this.search);
      } else {
        responsibleService.getExportList();
      }
    }
  },
  created() {
    this.GetRespList();
  },
  computed: {
    filterResponsibles() {
      return this.responsibles.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
    filterServers() {
      return this.respServers.filter((d) => {
        return Object.keys(this.serverFilters).every((f) => {
          return this.serverFilters[f].length < 1 || this.serverFilters[f].includes(d[f]);
        });
      });
    },
    filterSites() {
      return this.respSites.filter((d) => {
        return Object.keys(this.siteFilters).every((f) => {
          return this.siteFilters[f].length < 1 || this.siteFilters[f].includes(d[f]);
        });
      });
    },
  },
  components: {
    SideBar,
    NavBar,
  },
}
</script>

<style>
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