<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.dark.background}">
    <SideBar/>
    <v-container>
      <NavBar/>
    </v-container>
    <v-card color="grey lighten-1" >
    <v-card-title>
      Companies
      <v-spacer></v-spacer>
      <v-btn id="downloadexcel" class="ma-1 white--text" color="teal" :loading="loading2" :disabled="loading2" outlined 
      @click="loader = 'loading2'">Export to Excel 
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="filterCompanies" :items-per-page="10" :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50]
      }" class="elevation-1" :search="search">
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
                  <v-list-item > 
                    <div v-if="filters.hasOwnProperty(header.value)">
                      <v-autocomplete multiple dense auto-select-first clearable chips small-chips 
                      color="teal" :items="columnValueList(header.value)" append-icon="mdi-filter" 
                      v-model="filters[header.value]" :label="filters[header.value] ? `${header.text}` : ''" hide-details>
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
    <template v-slot:item.details="{item}">
      <v-btn depressed rounded text color="teal" @click="showDetails(item)"><v-icon>mdi-eye</v-icon>Show Details</v-btn>
    </template>
    </v-data-table>
    <v-dialog v-model="dialogdetail">
      <v-card>
        <v-toolbar dark color="teal" >
          <v-btn icon dark @click="dialogdetail = false"><v-icon>mdi-close</v-icon></v-btn>
          <v-toolbar-title class="flex text-center text-h5">DETAILS</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <template>        
            <v-tabs color="teal" vertical>
              <v-tab>Servers</v-tab>
              <v-tab>Sites</v-tab>
              <v-tab>Statics</v-tab>
      <v-tab-item>
        <v-card color="teal" >
          <v-card-title>
            Servers Details
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
          :headers="serverheaders"
          :items="serveritem"
          ></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="teal" >
          <v-card-title>
            Site Details
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
          :headers="siteheaders"
          :items="siteitem"
          ></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="teal" >
          <v-card-title>
            Statics Details
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
          :headers="staticheaders"
          :items="staticitem"
          ></v-data-table>
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
  export default {
    name: 'company',
    data () {
      return {
        filters: { name: [],},
        dialog :false,
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
        loading6: false,
        search: '',
        companies: [],
        headers: [
          { text: 'Company Name',align: 'start',sortable: false,value: 'name'},
          { text: 'View Details', value: 'details'},
        ],
        serverheaders: [
          { text: 'Server Name',align: 'start',sortable: false,value: 'servername'},
          { text: 'Full Name', value: 'fullname', },
          { text: 'IP Adress', value: 'ipadress', },
          { text: 'Operating System', value: 'opsystem', },
          { text: 'Environments', value: 'environments', },
          { text: 'App. Type', value: 'apptype', },
          { text: 'Owner', value: 'owner', },
          { text: 'Contact', value: 'contact' },
          { text: 'Last Backup Date', value: 'lastbackup' },
        ],
        siteheaders: [
          { text: 'Site Name',align: 'start',sortable: false,value: 'sitename'},
          { text: 'Physical Path', value: 'physicalpath', },
          { text: 'Domains', value: 'domains' },
          { text: 'State', value: 'state' },
        ],
        staticheaders: [
          { text: 'Static Name',align: 'start',sortable: false,value: 'staticname'},
          { text: 'Physical Path', value: 'physicalpath', },
          { text: 'Domains', value: 'domains' },
          { text: 'State', value: 'state' },
        ],
        companies: [],
        serveritem: [
          {
            servername: 'Tarık',
            fullname: 159,
            ipadress: 6.0,
            opsystem: 24,
            environments: 4.0,
            apptype: 159,
            owner: 6.0,
            contact: 24,
            lastbackup: 4.0,
          },
          {
            servername: 'Frozen Yogurt',
            fullname: 159,
            ipadress: 6.0,
            opsystem: 24,
            environments: 4.0,
            apptype: 159,
            owner: 6.0,
            contact: 24,
            lastbackup: 4.0,
          },
        ],
        siteitem: [
          {
            sitename: 'Tarık',
            physicalpath: 159,
            domains: 6.0,
            service: 24,
            state: 4.0,
          },
          {
            sitename: 'Frozen Yogurt',
            physicalpath: 159,
            domains: 6.0,
            service: 24,
            state: 4.0,
          },
        ],
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
        dialogdetail: false
      }
    },
    computed: {
    ...mapGetters({
      get_companies: "company/getCompanyList",
      header: "company/getCompanyHeaders",
      servers: "company/getCompanyServers",
      sites: "company/getCompanySites",
    }),
  },
    methods:{
      ...mapActions('company', ['setCompanies']),
      showDetails(item){
        this.details=item
        this.dialogdetail=true
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
        console.log(response[1]);
      }
    }
    },
    created() {
    this.GetCompanyList();
  },
    watch: {
      loader () {
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
.v-btn.withoutupercase{
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small{
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