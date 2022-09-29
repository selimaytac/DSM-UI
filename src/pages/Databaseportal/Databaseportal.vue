<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card class="grey">
      <v-card-title>
        Database Servers
        <v-spacer></v-spacer>
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn id="downloadexcel" class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2"
              outlined @click="loader = 'loading2'">
              <v-icon color="primary" dark v-bind="attrs" v-on="on">
                mdi-microsoft-excel </v-icon>
            </v-btn>
          </template>
          <span>Export to Excel</span>
        </v-tooltip> -->
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterDbportals" @click:row="rowClick" :loading="loaderTable" :items-per-page="10"
        :footer-props="{
          'items-per-page-options': [20, 50, 100, 200]
        }" class="elevation-1 table-cursor" :search="search">
        <template v-for="(col, indexx) in filters" v-slot:[`header.${indexx}`]="{ header }">
          {{ header.text }}
          <v-menu :key="indexx" offset-y :close-on-content-click="false">
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
                      <template v-slot:selection="{ item, indexx }">
                        <v-chip small class="caption" v-if="indexx < 5">
                          <span>
                            {{ item }}
                          </span>
                        </v-chip>
                        <span v-if="indexx === 5" class="grey--text caption">
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
        <!-- <template v-slot:item.details="{ item }">
          <v-btn depressed rounded text color="teal" @click="showDetails(item)">
            <v-icon>mdi-eye</v-icon>Show Details
          </v-btn>
        </template> -->
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
                <v-tab>General</v-tab>
                <v-tab-item>
                  <v-container fluid>
                    <v-row justify="center" class="space">
                      <v-col cols="12" sm="6">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="600">
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Basic Details</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="primary" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Domain: </td>
                                  <td>{{detailsInTab.domain}}</td>
                                  <v-btn x-small fab class="mx-2 ma-4" @click="doCopy(detailsInTab.domain) , snackbar=true">
                                    <v-icon small>mdi-content-copy</v-icon>
                                  </v-btn>
                                  <v-snackbar v-model="snackbar">{{text}}<template
                                      v-slot:action="{ attrs }">
                                      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                      </v-btn>
                                    </template>
                                  </v-snackbar>
                                </tr>
                                <tr>
                                  <td>IP Address: </td>
                                  <td>{{detailsInTab.ipAddress}}</td>
                                  <v-btn x-small fab class="mx-2 ma-4" @click="doCopy(detailsInTab.ipAddress) , snackbar=true">
                                    <v-icon small>mdi-content-copy</v-icon>
                                  </v-btn>
                                  <v-snackbar v-model="snackbar" >{{text}}<template
                                      v-slot:action="{ attrs }">
                                      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                      </v-btn>
                                    </template>
                                  </v-snackbar>
                                </tr>
                                <tr>
                                  <td>Operating System: </td>
                                  <td>{{ detailsInTab.version }}</td>
                                </tr>
                                <tr>
                                  <td>Oracle Version: </td>
                                  <td>{{ detailsInTab.osversion }}</td>
                                </tr>
                                <tr>
                                  <td>Logical CPU Count: </td>
                                  <td>{{ detailsInTab.logicalCpuCount }}</td>
                                </tr>
                                <tr>
                                  <td>Physical CPU Count: </td>
                                  <td>{{ detailsInTab.physicalCpuCount }}</td>
                                </tr>
                                <tr>
                                  <td>Memory: </td>
                                  <td>{{ detailsInTab.memory }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="600">
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Basic Details</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="primary" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Port: </td>
                                  <td>{{ detailsInTab.port }}</td>
                                </tr>
                                <tr>
                                  <td>Machine Type: </td>
                                  <td>{{ detailsInTab.machineType }}</td>
                                </tr>
                                <tr>
                                  <td>Record Date: </td>
                                  <td>{{ detailsInTab.recordDate }}</td>
                                </tr>
                                <tr>
                                  <td>Delete Date: </td>
                                  <td>{{ detailsInTab.deleteDate }}</td>
                                </tr>
                              </tbody>

                            </template>
                          </v-simple-table>
                          <v-toolbar flat color="rgba(0,0,0,0)" dark>
                            <v-toolbar-title>Organization Details</v-toolbar-title>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                          <v-simple-table class="primary" dark>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Owned By: </td>
                                  <td>{{ detailsInTab.owner }}</td>
                                </tr>
                                <tr>
                                  <td>Environment: </td>
                                  <td>{{ detailsInTab.environment }}</td>
                                </tr>
                                <tr>
                                  <td>Service: </td>
                                  <td>{{ detailsInTab.domain }}</td>
                                </tr>
                                <tr>
                                  <td>Notes: </td>
                                  <td>{{ detailsInTab.description }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
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
export default {
  name: 'dbportal',
  dbportals: [],
  data() {
    return {
      filters: { serverName: [], owner: [], environment: [], ipAddress: [], version: [], osversion: [], description: [] },
      snackbar: false,
      multiLine: true,
      text: 'Copy Successful ! ',
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
      headers: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'serverName', width: "200px", fixed: true },
        { text: 'Owner', value: 'owner', width: "100px", fixed: true },
        { text: 'Environment', value: 'environment', width: "200px", fixed: true },
        { text: 'IP Adress', value: 'ipAddress', width: "200px", fixed: true },
        { text: 'Version', value: 'version', width: "200px", fixed: true },
        { text: 'Operating System', value: 'osversion', width: "200px", fixed: true },
        { text: 'Description', value: 'description', width: "200px", fixed: true },
        // { text: 'View Details', value: 'details' },
      ],
      dbportals: [],
      dialogdetail: false,
      detailsInTab: {
        serverName: "",
        owner: "",
        environment: "",
        ipAddress: "",
        port: "",
        description: "",
        logicalCpuCount: "",
        physicalCpuCount: "",
        memory: "",
        osversion: "",
        version: "",
        machineType: "",
        recordDate: "",
        deleteDate: "",
        domain: "",
      }
    }
  },
  computed: {
    ...mapGetters('databaseportal', ['getDatabaseList', 'getDatabaseDetails'])
  },
  methods: {
    ...mapActions('databaseportal', ['setDatabases', 'setDatabaseDetails']),
    async rowClick(item) {
      this.dialogdetail = true;
      this.detailsInTab = item;
      this.loading6 = true;
      await this.setDatabaseDetails(item.detailsId);
      this.loading6 = false;
    },
    columnValueList(val) {
      return this.dbportals.map((d) => d[val]);
    },
    async GetDbList() {
      let count = 1;
      this.loaderTable = true;
      let temp = []
      let response = await this.setDatabases(count);
      while (response.length > 0) {
        temp = temp.concat(response);
        count++;
        response = await this.setDatabases(count);
      }
      let number = 1
      this.dbportals = temp.map(a => ({ ...a, id: a+number++, detailsId: a.id }));
      this.loaderTable = false;
    },
    doCopy: function (text) {
      var copyText = document.createElement('input');
      copyText.setAttribute('value', text);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
    },
  },
  created() {
    this.GetDbList();
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    },
  },
  computed: {
    filterDbportals() {
      return this.dbportals.filter((d) => {
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