<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card class="grey">
      <v-card-title>
        Servers
        <v-spacer></v-spacer>
        <h6 class="font-weight-bold">Last Check: {{this.lastCheck}} </h6>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-1 white--text" color="primary" :loading="loading2" :disabled="loading2" outlined
              @click="loader = 'loading2', ExportExcel()">
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
      <v-data-table :headers="headers" :items="filterServers" @click:row="rowClick" :options.sync="options"
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
      </v-data-table>
      <v-dialog v-model="dialogdetail">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialogdetail = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="flex text-center text-h5">{{selectedServer.machineName}} Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer class="font-weight-bold" v-if="available === '1'"><v-icon aria-hidden="true" color="green" x-large>mdi-check</v-icon>  Available</v-spacer>
            <v-spacer class="font-weight-bold" v-else="available === '0'"><v-icon aria-hidden="true" color="red" x-large>mdi-close</v-icon> Not Available</v-spacer>

            <v-btn id="connectRdp" class="ma-1 white--text" color="black" outlined small @click="downloadRdp()">Connect
              with RDP</v-btn>
          </v-toolbar>
          <template>
            <v-tabs color="primary" vertical>
              <v-tab>General</v-tab>
              <v-tab>Sites</v-tab>
              <v-tab>Statics</v-tab>
              <v-tab-item>
                <v-container fluid>
                  <v-row justify="center" class="space">
                    <v-col cols="12" sm="4">
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
                                <v-btn x-small fab class="mx-2 ma-4"
                                  @click="doCopy(detailsInTab.domain) , snackbar=true">
                                  <v-icon small>mdi-content-copy</v-icon>
                                </v-btn>
                                <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                      Close
                                    </v-btn>
                                  </template>
                                </v-snackbar>
                              </tr>
                              <tr>
                                <td>IP Address: </td>
                                <td>{{detailsInTab.ipAddress}}</td>
                                <v-btn x-small fab class="mx-2 ma-4"
                                  @click="doCopy(detailsInTab.ipAddress) , snackbar=true">
                                  <v-icon small>mdi-content-copy</v-icon>
                                </v-btn>
                                <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                      Close
                                    </v-btn>
                                  </template>
                                </v-snackbar>
                              </tr>
                              <tr>
                                <td>Custom Ip: </td>
                                <td>{{ detailsInTab.customIp }}</td>
                                <v-btn x-small fab class="mx-2 ma-4"
                                  @click="doCopy(detailsInTab.customIp) , snackbar=true">
                                  <v-icon small>mdi-content-copy</v-icon>
                                </v-btn>
                                <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                    <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                      Close
                                    </v-btn>
                                  </template>
                                </v-snackbar>
                              </tr>
                              <tr>
                                <td>Operating System: </td>
                                <td>{{ detailsInTab.operatingSystem }}</td>
                              </tr>
                              <tr>
                                <td>CPU: </td>
                                <td>{{ detailsInTab.cpu }}</td>
                              </tr>
                              <tr>
                                <td>Memory: </td>
                                <td>{{ detailsInTab.memory }}</td>
                              </tr>
                              <tr>
                                <td>Last Backup: </td>
                                <td>{{ detailsInTab.lastBackup }}</td>
                              </tr>
                              <tr>
                                <td>Site Count: </td>
                                <td>{{ detailsInTab.siteCount }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="600">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Disk Details</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Volumes: </td>
                                <td>{{ detailsInTab.volumes }}</td>
                              </tr>
                              <tr>
                                <td>Total Capacity: </td>
                                <td>{{ detailsInTab.totalCapacity }}</td>
                              </tr>
                              <tr>
                                <td>Percent Free: </td>
                                <td>{{ detailsInTab.percentFree }}</td>
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
                                <td>{{ serverHeader.companyName }} {{serverHeader.availability}}</td>
                              </tr>
                              <tr>
                                <td>Managing By: </td>
                                <td>{{ detailsInTab.responsible }}</td>
                              </tr>
                              <tr>
                                <td>Environment: </td>
                                <td>{{ detailsInTab.serverType }}</td>
                              </tr>
                              <tr>
                                <td>ODM Replication: </td>
                                <td>{{ detailsInTab.odmReplication }}</td>
                              </tr>
                              <tr>
                                <td>Service: </td>
                                <td>{{ detailsInTab.serviceName }}</td>
                              </tr>
                              <tr>
                                <td>Notes: </td>
                                <td>{{ detailsInTab.notes }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="300">
                        <v-toolbar flat color="rgba(0,0,0,0)" dark>
                          <v-toolbar-title>Volume Details</v-toolbar-title>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-simple-table class="primary" dark>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">
                                  Volume Name
                                </th>
                                <th class="text-left">
                                  Free Space
                                </th>
                                <th class="text-left">
                                  Used Space
                                </th>
                                <th class="text-left">
                                  Total Capacity
                                </th>
                                <th class="text-left">
                                  Free Percent
                                </th>
                              </tr>
                            </thead>
                            <tbody v-for="volume in detailsInTab.volumeDetails">
                              <tr>
                                <td>{{ volume.volumeName }}</td>
                                <td>{{ volume.freeSpace }}</td>
                                <td>{{ volume.usedSpace }}</td>
                                <td>{{ volume.totalCapacity }}</td>
                                <td>{{ volume.freePercent }}</td>
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
                    Sites Details
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table :headers="siteheaders" :items="serverSites" @click:row="goToSite" :items-per-page="10"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 20, 50]
                    }" class="elevation-1 table-cursor">
                  </v-data-table>
                  <v-dialog v-model="dialogdetail2" max-width="1400px">
                    <v-card>
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialogdetail2 = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="flex text-center text-h5">SITE</v-toolbar-title>
                      </v-toolbar>
                      <v-container>
                        <v-row justify="center" class="space">
                          <v-col cols="12" sm="4">
                            <v-card class=" mx-2 rounded-xl" elevation="8" color="primary" height="450">
                              <v-toolbar flat color="rgba(0,0,0,0)" dark>
                                <v-toolbar-title>Site Details</v-toolbar-title>
                                <v-spacer></v-spacer>
                              </v-toolbar>
                              <v-simple-table class="primary" dark>
                                <template v-slot:default>
                                  <tbody>
                                    <tr>
                                      <td>Machine Name: </td>
                                      <td>{{siteDetails.machineName}}</td>
                                      <v-btn x-small fab class="mx-2 ma-4"
                                        @click="doCopy(siteDetails.machineName) , snackbar=true">
                                        <v-icon small>mdi-content-copy</v-icon>
                                      </v-btn>
                                      <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                            Close
                                          </v-btn>
                                        </template>
                                      </v-snackbar>
                                    </tr>
                                    <tr>
                                      <td>Name: </td>
                                      <td>{{siteDetails.name}}</td>
                                      <v-btn x-small fab class="mx-2 ma-4"
                                        @click="doCopy(siteDetails.name) , snackbar=true">
                                        <v-icon small>mdi-content-copy</v-icon>
                                      </v-btn>
                                      <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                            Close
                                          </v-btn>
                                        </template>
                                      </v-snackbar>
                                    </tr>
                                    <tr>
                                      <td>Application Pool Name: </td>
                                      <td>{{ siteDetails.applicationPoolName }}</td>
                                    </tr>
                                    <tr>
                                      <td>Physical Path: </td>
                                      <td>{{siteDetails.physicalPath}}</td>
                                      <v-btn x-small fab class="mx-2 ma-4"
                                        @click="doCopy(siteDetails.physicalPath) , snackbar=true">
                                        <v-icon small>mdi-content-copy</v-icon>
                                      </v-btn>
                                      <v-snackbar v-model="snackbar">{{text}}<template v-slot:action="{ attrs }">
                                          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                                            Close
                                          </v-btn>
                                        </template>
                                      </v-snackbar>
                                    </tr>
                                    <tr>
                                      <td>Enabled Protocols: </td>
                                      <td>{{ siteDetails.enabledProtocols }}</td>
                                    </tr>
                                    <tr>
                                      <td>Max Band With: </td>
                                      <td>{{ siteDetails.maxBandwidth }}</td>
                                    </tr>
                                    <tr>
                                      <td>Max Connections: </td>
                                      <td>{{ siteDetails.maxConnections }}</td>
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
                                      <td>{{ siteDetails.webConfigLastBackupDate }}</td>
                                    </tr>
                                    <tr>
                                      <td>Web Config Backup Directory: </td>
                                      <td>{{ siteDetails.webcConfigBackupDirectory }}</td>
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
                                      <td>{{ siteDetails.netFrameworkVersion }}</td>
                                    </tr>
                                    <tr>
                                      <td>Send Alert Mail When Unavailable: </td>
                                      <td>{{ siteDetails.sendAlertMAilWhenUnavailable }}</td>
                                    </tr>
                                    <tr>
                                      <td>App Type: </td>
                                      <td>{{ siteDetails.appType }}</td>
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
                                      <td>{{ siteDetails.logFileEnabled }}</td>
                                    </tr>
                                    <tr>
                                      <td>Log File Directory: </td>
                                      <td>{{ siteDetails.logFileDirectory }}</td>
                                    </tr>
                                    <tr>
                                      <td>Log Format: </td>
                                      <td>{{ siteDetails.logFormat }}</td>
                                    </tr>
                                    <tr>
                                      <td>Log Period: </td>
                                      <td>{{ siteDetails.logPeriod }}</td>
                                    </tr>
                                    <tr>
                                      <td>Server Auto Start: </td>
                                      <td>{{ siteDetails.serverAutoStart }}</td>
                                    </tr>
                                    <tr>
                                      <td>Trace Failed Requests Logging Enabled: </td>
                                      <td>{{ siteDetails.traceFailedRequestsLoggingEnabled }}</td>
                                    </tr>
                                    <tr>
                                      <td>Last Updated: </td>
                                      <td>{{ siteDetails.lastUpdated }}</td>
                                    </tr>
                                    <tr>
                                      <td>Date Deleted: </td>
                                      <td>{{ siteDetails.dateDeleted }}</td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>

                    </v-card>
                  </v-dialog>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="primary">
                  <v-card-title>
                    Statics Details
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-data-table></v-data-table>
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
import { serverService } from '@/services/api/server.service';
import { siteService } from '@/services/api/site.service';
import store from '@/store';
export default {
  name: 'servers',
  servers: [],
  serverSites: [],
  data() {
    return {
      filters: { machineName: [], ipAddress: [], dnsName: [], serviceName: [], operatingSystem: [], responsible: [] },
      snackbar: false,
      multiLine: true,
      available: null,
      lastCheck: null,
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
      serverFetchCount: 1,
      searchedServers: [],
      headers: [
        { text: 'Server', align: 'start', sortable: false, value: 'machineName', width: "200px", fixed: true },
        { text: 'IP Adress', value: 'ipAddress', width: "200px", fixed: true },
        { text: 'DNS Name', value: 'dnsName', width: "200px", fixed: true },
        { text: 'Service', value: 'serviceName', width: "200px", fixed: true },
        { text: 'Operating Sys.', value: 'operatingSystem', width: "200px", fixed: true },
        { text: 'Responsible', value: 'responsible' },
      ],
      siteheaders: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName' },
        { text: 'Physical Path', value: 'physicalPath', },
        { text: 'Domains', value: 'domains' },
        { text: 'State', value: 'state' },
        { text: 'App Type', value: 'appType' },
      ],
      servers: [],
      oldServers: [],
      serverSites: [],
      siteDetails: [],
      dialogdetail: false,
      dialogdetail2: false,
      detailsInTab: {
        domain: "",
        ipAddress: "",
        customIp: "",
        physicalLocation: "",
        responsible: "",
        serverType: "",
        lastBackup: "",
        operatingSystem: "",
        boottime: "",
        cpu: "",
        memory: "",
        memoryUsage: "",
        toolsRunningStatus: "",
        serviceName: "",
        odmReplication: "",
        notes: "",
        siteCount: "",
        onlineSiteCount: "",
        volumes: "",
        totalCapacity: "",
        percentFree: "",
        lastCheckDate: "",
        volumeDetails: [],
        ownedBy: "",
        companyId: "",
      },
      selectedServer: {},
    }
  },
  computed: {
    ...mapGetters({
      userName: 'auth/getUsername',
      profilePhoto: 'auth/getProfilePhoto',
      fullName: 'auth/getFullName',
      department: 'auth/getDepartment',
      getDomain: 'auth/getStateDomain',
    }),
    ...mapGetters('server', ['getServerList', 'getServerDetails', 'getServerHeaders', 'getServerSites','getServerCheckDate']),
  },
  methods: {
    ...mapActions('server', ['setServers', 'setServerSearch', 'setServerDetails', 'setServerHeader', 'setServerSites', 'setServerCheckDate']),
    async rowClick(item) {
      this.detailsInTab = await this.setServerDetails(item.serverId)
      this.serverHeader = await this.setServerHeader(item.serverId)
      this.detailsInTab.ownedBy = this.serverHeader.companyName
      this.detailsInTab.companyId = this.serverHeader.companyId
      this.available = this.serverHeader.availability



      this.selectedServer = item
      this.serverSites = await this.setServerSites(item.serverId);
      this.dialogdetail = true
    },
    async goToSite(item) {
      this.siteDetails = await siteService.getSiteDetails(item.siteId)
      this.dialogdetail2 = true
    },

    columnValueList(val) {
      return this.servers.map((d) => d[val]);
    },

    async GetServerList(count) {
      let response = await this.setServers(count);
      this.servers = this.servers.concat(response);
      this.oldServers = this.servers;
    },
    async GetServerSites(serverId) {
      this.serverSites = await this.setServerSites(serverId);
    },
    debounceInput: debounce(async function (e) {
      this.loaderTable = true;
      this.servers = [];
      if (e.length > 0) {
        this.servers = await this.setServerSearch(e);
      } else {
        this.servers = this.oldServers;
      }
      this.loaderTable = false;
    }, 1000),
    ExportExcel() {
      if (this.search.length > 0) {
        serverService.getExportSearchList(this.search);
      } else {
        serverService.getExportList();
      }
    },
    downloadRdp() {
      serverService.getRDPFile({ serverId: parseInt(this.selectedServer.serverId), userName: store.state.auth.username });
    },
    doCopy: function (text) {
      var copyText = document.createElement('input');
      copyText.setAttribute('value', text);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
    },
  },
  async created() {
    this.lastCheck = await serverService.getServerCheckDate();    
  },
  watch: {
    options: {
      handler() {
        if (this.search.length == 0) {
          this.GetServerList(this.serverFetchCount)
          this.serverFetchCount++;
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
    filterServers() {
      return this.servers.filter((d) => {
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