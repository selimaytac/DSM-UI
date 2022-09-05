<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    
      <NavBar />
    
    <v-card class="grey">
      <v-card-title>
        Companies
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
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterCompanies" :items-per-page="10" :footer-props="{
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
          <v-container>
            <template>
              <v-tabs color="primary" vertical>
                <v-tab>Servers</v-tab>
                <v-tab>Sites</v-tab>
                <v-tab>Statics</v-tab>
                <v-tab-item>
                  <v-card color="primary">
                    <v-card-title>
                      Servers Details
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="serverheaders" :items="companyServers" :items-per-page="10" :footer-props="{
                      'items-per-page-options': [5, 10, 20, 50]
                    }" class="elevation-1">
                      ></v-data-table>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card color="primary">
                    <v-card-title>
                      Site Details
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="siteheaders" :items="companySites" :items-per-page="10" :footer-props="{
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
                    <v-data-table ></v-data-table>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </template>
          </v-container>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { mapGetters, mapActions } from "vuex";
import { companyService } from '@/services/api/company.service';
export default {
  name: 'company',
  data() {
    return {
      filters: { name: [], },
      dialog: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      search: '',
      companies: [],
      companyServers: [],
      companySites: [],
      headers: [
        { text: 'Company Name', align: 'start', sortable: false, value: 'name' },
        { text: 'View Details', value: 'details' },
      ],
      serverheaders: [
        { text: 'Server Name', align: 'start', sortable: false, value: 'serverName', width: "100px", fixed: true},
        { text: 'Full Name', value: 'fullName', width: "200px", fixed: true},
        { text: 'IP Adress', value: 'ipAddress', width: "100px", fixed: true},
        { text: 'Operating System', value: 'operatingSystem', width: "200px", fixed: true},
        { text: 'Environments', value: 'environments', width: "100px", fixed: true},
        { text: 'App. Type', value: 'applicationType', width: "100px", fixed: true},
        { text: 'Owner', value: 'owner', width: "100px", fixed: true},
        { text: 'Contact', value: 'contact', width: "200px", fixed: true},
        { text: 'Last Backup Date', value: 'lastBackupDate', width: "200px", fixed: true},
      ],
      siteheaders: [
        { text: 'Site Name', align: 'start', sortable: false, value: 'siteName', width: "200px", fixed: true },
        { text: 'Physical Path', value: 'physicalPath', width: "200px", fixed: true},
        { text: 'Domains', value: 'domains', width: "200px", fixed: true},
        { text: 'State', value: 'state', width: "200px", fixed: true},
      ],
      staticheaders: [
        { text: 'Static Name', align: 'start', sortable: false, value: 'staticname' },
        { text: 'Physical Path', value: 'physicalpath', },
        { text: 'Domains', value: 'domains' },
        { text: 'State', value: 'state' },
      ],
      companies: [],
      companyServers: [],
      companySites: [],
      staticitem: [
        {
          staticname: 'Tarık',
          physicalpath: 159,
          domains: 6.0,
          service: 24,
          state: 4.0,
        },
        {
          staticname: 'Frozen Yogurt',
          physicalpath: 159,
          domains: 6.0,
          service: 24,
          state: 4.0,
        },
      ],
      dialogdetail: false,
    }
  },
  computed: {
    ...mapGetters('company', ['getCompanies','getCompanyHeader', 'getCompanyServers', 'getCompanySites']),
  },
  methods: {
    ...mapActions('company', ['setCompanies','setCompanyHeader', 'setCompanyServers', 'setCompanySites']),
    async showDetails(item) {
      this.details = item

      this.companyHeader = await this.setCompanyHeader(item.companyId)

      this.companyServers= await this.setCompanyServers(item.companyId);
     
      this.companySites= await this.setCompanySites(item.companyId);
      this.dialogdetail = true
    },
    columnValueList(val) {
      return this.companies.map((d) => d[val]);
    },
    async GetCompanyList() {
      let count = 1;
      let response = await this.setCompanies(count);
      while (response.length > 0) {
        this.companies = this.companies.concat(response);
        count++;
        response = await this.setCompanies(count);
      }
    },
    ExportExcel(){
      if(this.search.length > 0){
        companyService.getExportSearchList(this.search);
    }else{
        companyService.getExportList();
    }
    }
  },
  created() {
    this.GetCompanyList();
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
    filterCompanies() {
      return this.companies.filter((d) => {
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