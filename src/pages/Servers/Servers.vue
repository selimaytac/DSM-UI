<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />

    <NavBar />

    <v-card class="grey">
      <v-card-title>
        Servers
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
            <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
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
                              <tr>
                                <td>Online Site Count: </td>
                                <td>Coming Soon...</td>
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
                                <td>{{ detailsInTab.ownedBy }}</td>
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
                  <v-data-table :headers="siteheaders" :items="serverSites" :items-per-page="10" :footer-props="{
                    'items-per-page-options': [5, 10, 20, 50]
                  }" class="elevation-1">
                  </v-data-table>
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
import { mapGetters, mapActions, mapState } from "vuex";
import { debounce } from 'debounce';
import { serverService } from '@/services/api/server.service';
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
      dialogdetail: false,
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
    ...mapGetters('server', ['getServerList', 'getServerDetails', 'getServerHeaders', 'getServerSites',])
  },
  methods: {
    ...mapActions('server', ['setServers', 'setServerSearch', 'setServerDetails', 'setServerHeader', 'setServerSites']),
    async rowClick(item) {
      this.detailsInTab = await this.setServerDetails(item.serverId)
      this.serverHeader = await this.setServerHeader(item.serverId)
      this.detailsInTab.ownedBy = this.serverHeader.companyName
      this.detailsInTab.companyId = this.serverHeader.companyId

      this.selectedServer = item
      this.serverSites = await this.setServerSites(item.serverId);
      this.dialogdetail = true
    },
    // async showDetails(item) {
    //   this.detailsInTab = await this.setServerDetails(item.serverId)
    //   this.serverHeader = await this.setServerHeader(item.serverId)
    //   this.detailsInTab.ownedBy = this.serverHeader.companyName
    //   this.detailsInTab.companyId = this.serverHeader.companyId

    //   this.selectedServerId = item.serverId
    //   this.serverSites= await this.setServerSites(item.serverId);
    //   this.dialogdetail = true
    // },
    columnValueList(val) {
      return this.servers.map((d) => d[val]);
    },
    // async GetServerList() {
    //   let count = 1;
    //   let response = await this.setServers(count);
    //   while (response.length > 0) {
    //     this.servers = this.servers.concat(response);
    //     count++;
    //     response = await this.setServers(count);
    //   }
    // },
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
      serverService.getRDPFile({ serverId: parseInt(this.selectedServer.serverId) , userName: store.state.auth.username });
    },
    doCopy: function (text) {
      var copyText = document.createElement('input');
      copyText.setAttribute('value', text);
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
    },
  },
  // created() {
  //   this.GetServerList();
  // },
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