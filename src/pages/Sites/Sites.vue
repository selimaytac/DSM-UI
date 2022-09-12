<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card color="grey">
      <v-card-title>
        Sites
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2"
              outlined @click="loader = 'loading2',ExportExcel()">
              <v-icon color="primary" dark v-bind="attrs" v-on="on">
                mdi-microsoft-excel </v-icon>
            </v-btn>
          </template>
          <span>Export to Excel</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" @input="debounceInput" append-icon="mdi-magnify" label="Search" single-line
          hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterSites" @click:row="rowClick" :options.sync="options"
        :items-per-page="10" :footer-props="{
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
        <template #item.physicalPath="{ value }">
          <div class="text-truncate" style="max-width: 130px">{{ value }}</div>
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
              <v-tab>General</v-tab>
              <v-tab>Bindings</v-tab>
              <v-tab>Backend Services</v-tab>
              <v-tab>Packages</v-tab>
              <v-tab>Event Tracking</v-tab>
              <v-tab>Statics</v-tab>
              <v-tab-item>
                <v-container fluid>
                  <v-row justify="center" class="space">
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Site</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Machine Name: </td>
                                <td>{{detailsInTab.machineName}}</td>
                                <v-btn x-small fab class="mx-2" @click="copyText() , snackbar=true">
                                    <v-icon small>mdi-content-copy</v-icon>
                                  </v-btn>
                                  <v-snackbar v-model="snackbar" :multi-line="multiline">{{text}}<template
                                      v-slot:action="{ attrs }">
                                      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                      </v-btn>
                                    </template>
                                  </v-snackbar>
                              </tr>
                              <tr>
                                <td>Name: </td>
                                <td>{{detailsInTab.name}}</td>
                                <v-btn x-small fab class="mx-2" @click="copyTextt() , snackbar=true">
                                    <v-icon small>mdi-content-copy</v-icon>
                                  </v-btn>
                                  <v-snackbar v-model="snackbar" :multi-line="multiline">{{text}}<template
                                      v-slot:action="{ attrs }">
                                      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                      </v-btn>
                                    </template>
                                  </v-snackbar>
                              </tr>
                              <tr>
                                <td>Application Pool Name: </td>
                                <td>{{ detailsInTab.applicationPoolName }}</td>
                              </tr>
                              <tr>
                                <td>Physical Path: </td>
                                <td>{{detailsInTab.physicalPath}}</td>
                                <v-btn x-small fab class="mx-2" @click="copyTexttt() , snackbar=true">
                                    <v-icon small>mdi-content-copy</v-icon>
                                  </v-btn>
                                  <v-snackbar v-model="snackbar" :multi-line="multiline">{{text}}<template
                                      v-slot:action="{ attrs }">
                                      <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                        Close
                                      </v-btn>
                                    </template>
                                  </v-snackbar>
                              </tr>
                              <tr>
                                <td>Enabled Protocols: </td>
                                <td>{{ detailsInTab.enabledProtocols }}</td>
                              </tr>
                              <tr>
                                <td>Max Band With: </td>
                                <td>{{ detailsInTab.maxBandwidth }}</td>
                              </tr>
                              <tr>
                                <td>Max Connections: </td>
                                <td>{{ detailsInTab.maxConnections }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Web Config</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Web Config Last Backup Date: </td>
                                <td>{{ detailsInTab.webConfigLastBackupDate }}</td>
                              </tr>
                              <tr>
                                <td>Web Config Backup Directory: </td>
                                <td>{{ detailsInTab.webcConfigBackupDirectory }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Other</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Net Framework Version: </td>
                                <td>{{ detailsInTab.netFrameworkVersion }}</td>
                              </tr>
                              <tr>
                                <td>Send Alert Mail When Unavailable: </td>
                                <td>{{ detailsInTab.sendAlertMAilWhenUnavailable }}</td>
                              </tr>
                              <tr>
                                <td>App Type: </td>
                                <td>{{ detailsInTab.appType }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Log</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Log File Enabled: </td>
                                <td>{{ detailsInTab.logFileEnabled }}</td>
                              </tr>
                              <tr>
                                <td>Log File Directory: </td>
                                <td>{{ detailsInTab.logFileDirectory }}</td>
                              </tr>
                              <tr>
                                <td>Log Format: </td>
                                <td>{{ detailsInTab.logFormat }}</td>
                              </tr>
                              <tr>
                                <td>Log Period: </td>
                                <td>{{ detailsInTab.logPeriod }}</td>
                              </tr>
                              <tr>
                                <td>Server Auto Start: </td>
                                <td>{{ detailsInTab.serverAutoStart }}</td>
                              </tr>
                              <tr>
                                <td>Trace Failed Requests Logging Enabled: </td>
                                <td>{{ detailsInTab.traceFailedRequestsLoggingEnabled }}</td>
                              </tr>
                              <tr>
                                <td>Last Updated: </td>
                                <td>{{ detailsInTab.lastUpdated }}</td>
                              </tr>
                              <tr>
                                <td>Date Deleted: </td>
                                <td>{{ detailsInTab.dateDeleted }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Bindings
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="bindheaders" :items="siteBindings" :items-per-page="10" :footer-props="{
                    'items-per-page-options': [5, 10, 20, 50]
                  }" class="elevation-1"></v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Endpoints
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="endpointheaders" :items="siteEndpoints" :items-per-page="10" :footer-props="{
                    'items-per-page-options': [5, 10, 20, 50]
                  }" class="elevation-1"></v-data-table>
                  <v-card-title>
                    Direct DB Connection
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="directdbheaders" :items="directdbitem"></v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Packages
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="packageheaders" :items="sitePackages" :items-per-page="10" :footer-props="{
                    'items-per-page-options': [5, 10, 20, 50]
                  }" class="elevation-1"></v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Event Tracking
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="eventheaders" :items="eventitem"></v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Statics
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="staticheaders" :items="staticitem"></v-data-table>
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
import { debounce } from 'debounce';
import { siteService } from '@/services/api/site.service';
export default {
  name: 'sites',
  sites: [],
  siteBindings: [],
  sitePackages: [],
  siteEndpoints: [],
  data() {
    return {
      filters: { siteName: [], ipAddress: [], port: [], hostName: [], appType: [], machinename: [], appPoolName: [], physicalPath: [] },
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
      options: {},
      siteFetchCount: 1,
      searchedSites: [],
      headers: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName', width: 100 },
        { text: 'IP Adress', value: 'ipAddress', width: 150 },
        { text: 'Ports', value: 'port', width: 150 },
        { text: 'Host', value: 'hostName', width: 150 },
        { text: 'App Type', value: 'appType', width: 150 },
        { text: 'Machine', value: 'machinename', width: 150 },
        { text: 'Pool Name', value: 'appPoolName', width: 150 },
        { text: 'Physical Path', value: 'physicalPath', width: 130 },
      ],
      bindheaders: [
        { text: 'IP Adress', value: 'ipAddress' },
        { text: 'IP Adress Family', value: 'ipAddressFamily', },
        { text: 'Ports', value: 'ports' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocols' },
      ],
      endpointheaders: [
        { text: 'Endpoint Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Port', value: 'port', },
        { text: 'Endpoint URL', value: 'endpointurl' },
        { text: 'Is Available', value: 'available' },
        { text: 'Last Check Date', value: 'lastdate' },
      ],
      directdbheaders: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Database Name', value: 'dbname' },
        { text: 'Port', value: 'port', },
        { text: 'User Name', value: 'username' },
        { text: 'Raw Connection String', value: 'connectstring' },
      ],
      packageheaders: [
        { text: 'Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Version', value: 'version' },
      ],
      eventheaders: [
        { text: 'IP Adress', value: 'ipadress' },
        { text: 'IP Adress Family', value: 'ipfam', },
        { text: 'Ports', value: 'port' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocol' },
      ],
      staticheaders: [
        { text: 'IP Adress', value: 'ipadress' },
        { text: 'IP Adress Family', value: 'ipfam', },
        { text: 'Ports', value: 'port' },
        { text: 'Host', value: 'host' },
        { text: 'Protocol', value: 'protocol' },
      ],
      sites: [],
      oldSites: [],
      siteBindings: [],
      siteEndpoints: [],
      directdbitem: [
      ],
      sitePackages: [],
      eventitem: [

      ],
      staticitem: [

      ],
      dialogdetail: false,
      detailsInTab: {
        machineName: "",
        name: "",
        applicationPoolName: "",
        physicalPath: "",
        enabledProtocols: "",
        maxBandwidth: "",
        maxConnections: "",
        logFileEnabled: "",
        logFileDirectory: "",
        logFormat: "",
        logPeriod: "",
        serverAutoStart: "",
        traceFailedRequestsLoggingEnabled: "",
        lastUpdated: "",
        dateDeleted: "",
        webConfigLastBackupDate: "",
        webcConfigBackupDirectory: "",
        netFrameworkVersion: "",
        sendAlertMAilWhenUnavailable: "",
        appType: "",
      },
      selectedBindings: [],
      selectedPackages: [],
      selectedEndpoints: [],
    }
  },
  computed: {
    ...mapGetters('site', ['getSiteList', 'getSiteDetails', 'getSiteHeaders', 'getSiteBindings', 'getSitePackages', 'getSiteEndpoints']),
  },
  methods: {
    ...mapActions('site', ['setSites', 'setSiteSearch', 'setSiteDetails', 'setSiteHeader', 'setSiteBindings', 'setSitePackages', 'setSiteEndpoints']),
    async rowClick(item) {
      this.detailsInTab = await this.setSiteDetails(item.siteId)
      this.siteHeader = await this.setSiteHeader(item.siteId)

      this.selectedBindings = item.siteId
      this.siteBindings = await this.setSiteBindings(item.siteId);

      this.selectedPackages = item.siteId
      this.sitePackages = await this.setSitePackages(item.siteId);

      this.selectedEndpoints = item.siteId
      this.siteEndpoints = await this.setSiteEndpoints(item.siteId);
      this.dialogdetail = true
    },
    // async showDetails(item) {
    //   this.detailsInTab = await this.setSiteDetails(item.siteId)
    //   this.siteHeader = await this.setSiteHeader(item.siteId)

    //   this.selectedBindings = item.siteId
    //   this.siteBindings = await this.setSiteBindings(item.siteId);

    //   this.selectedPackages = item.siteId
    //   this.sitePackages = await this.setSitePackages(item.siteId);

    //   this.selectedEndpoints = item.siteId
    //   this.siteEndpoints = await this.setSiteEndpoints(item.siteId);
    //   this.dialogdetail = true
    // },
    columnValueList(val) {
      return this.sites.map((d) => d[val]);
    },
    // async GetSiteList() {
    //   let count = 1;
    //   let response = await this.setSites(count);
    //   while (response.length > 0) {
    //     this.sites = this.sites.concat(response);
    //     count++;
    //     response = await this.setSites(count);
    //   }
    // },
    async GetSiteList(count) {
      let response = await this.setSites(count);
      this.sites = this.sites.concat(response);
      this.oldSites = this.sites;
    },
    async GetSiteBindings(siteId) {
      this.siteBindings = await this.setSiteBindings(siteId);
    },
    async GetSitePackages(siteId) {
      this.sitePackages = await this.setSitePackages(siteId);
    },
    async GetSiteEndpoints(siteId) {
      this.siteEndpoints = await this.setSiteEndpoints(siteId);
    },
    debounceInput: debounce(async function (e) {
      this.loaderTable = true;
      this.sites = [];
      if (e.length > 0) {
        this.sites = await this.setSiteSearch(e);
      } else {
        this.sites = this.oldSites;
      }
      this.loaderTable = false;
    }, 1000),
    ExportExcel(){
      if(this.search.length > 0){
        siteService.getExportSearchList(this.search);
    }else{
        siteService.getExportList();
    }
    },
    copyText() {
      navigator.clipboard.writeText(this.detailsInTab.machineName);
    },
    copyTextt(){
      navigator.clipboard.writeText(this.detailsInTab.name);
    },
    copyTexttt(){
      navigator.clipboard.writeText(this.detailsInTab.physicalPath);
    },
  },
  // created() {
  //   this.GetSiteList();
  // },
  watch: {
    options: {
      handler() {
        if (this.search.length == 0) {
          this.GetSiteList(this.siteFetchCount)
          this.siteFetchCount++;
        }
      },
      deep: true,
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    },
  },
  computed: {
    filterSites() {
      return this.sites.filter((d) => {
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