<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <NavBar />
    <v-container>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title class="black--text font-weight-bold">Overview</v-toolbar-title>
      </v-toolbar>
      <v-item-group mandatory class="mt-n4">
        <v-container>
          <v-row justify="center" class="space">
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl  text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-server</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Server Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ serverCount.serverCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-earth-americas</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Site Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ siteCount.siteCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-sitemap</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Company Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ companyCount.companyCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">mdi-transit-connection-variant
                            </v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Responsible Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ responsibilityCount.responsibilityCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-database</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">DB Portal Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ dbCount.dbCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl text-center" dark
                  height="150" @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-user</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Total User Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{ userCount.userCount }}</strong>
                          </v-list-item-title>

                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>

                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
      <v-divider class="my-5"></v-divider>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
        <v-toolbar-title class="black--text font-weight-bold mx-auto">Haftanın Nöbetçileri
        </v-toolbar-title>
      </v-toolbar>
      <template>
        <v-layout row wrap>
          <v-flex>
            <v-card shaped class="rounded-xl text-center  mx-auto mt-5" color="primary" max-width="1000">
              <v-list-item three line>
                <v-list-item-content>
                  <!-- <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-col class="text-right">
                        <v-btn class="mx-4 white--text" color="primary" elevation="2" medium rounded to="/sentry" dark
                          v-bind="attrs" v-on="on">
                          Nöbetçi Listesi</v-btn>
                      </v-col>
                    </template>
                    <span>Nöbetçi Listesi için Tıklayınız.</span>
                  </v-tooltip> -->
                  <div class="text-overline black--text mb-1">
                    {{ sentries.dayNumber }} {{ sentries.month }}
                    {{ sentries.year }} {{ sentries.day }}
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn dark outlined rounded class="mt-2" color="black" v-bind="attrs" v-on="on">
                          Nöbetçi Listesi
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar dark color="primary">
                          <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>Aylık Nöbetçi Listesi</v-toolbar-title>
                        </v-toolbar>
                        <template>
                          <v-card-title>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                              hide-details></v-text-field>
                          </v-card-title>
                          <v-data-table :headers="headers" :items="filterMonthlySentry" :options.sync="options"
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
                                        <v-autocomplete multiple dense auto-select-first clearable chips small-chips
                                          color="teal" :items="columnValueList(header.value)" append-icon="mdi-filter"
                                          v-model="filters[header.value]"
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
                        </template>
                      </v-card>
                    </v-dialog>
                  </div>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Uygulama Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.applicationManagement }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 63</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Veri Tabanı Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.db }}</v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 62</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Güvenlik Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.security }}</v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 60</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300" height="100">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Network Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.network }}</v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 64</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Cloud Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.cloud }}</v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 67</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-card shaped class="rounded-xl text-center  mx-auto mt-5" max-width="300">
                    <v-list-item three line>
                      <v-list-item-content>
                        <div class="text-overline primary--text mb-2">Platform Yönetimi</div>
                        <v-list-item-title class="font-weight-black">{{ sentries.platform }}</v-list-item-title>
                        <v-list-item-subtitle class="font-weight-black">0 212 800 04 61</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { dashboardService } from '@/services/api/dashboard.service'
import { todaySentryService } from '@/services/api/sentry.service'
import { monthlySentryService } from '@/services/api/sentryMonth.service'

export default {
  name: 'overview',
  data() {
    return {
      filters: { platform: [], cloud: [], network: [], security: [], db: [], applicationManagement: [], dayNumber: [], month: [], year: [] },
      loaderTable: false,
      dialog: false,
      options: {},
      sentryFetchCount: 1,
      headers: [
        { text: 'Gün', value:'dayNumber', align: 'start', sortable: false, width: "100px" },
        { text: 'Ay', value:'month', align: 'start', sortable: false, width: "100px" },
        { text: 'Yıl', value:'year', align: 'start', sortable: false, width:"100px"},
        { text: 'Platform Yönetimi', align: 'start', sortable: false, value: 'platform', width: "200px" },
        { text: 'Cloud Yönetimi', align: 'start', sortable: false, value: 'cloud', width: "200px", fixed: true },
        { text: 'Network Yönetimi', align: 'start', sortable: false, value: 'network', width: "200px", fixed: true },
        { text: 'Güvenlik Yönetimi', align: 'start', sortable: false, value: 'security', width: "200px", fixed: true },
        { text: 'Veri Tabanı Yönetimi', align: 'start', sortable: false, value: 'db', width: "200px", fixed: true },
        { text: 'Uygulama Yönetimi', align: 'start', sortable: false, value: 'applicationManagement', width: "200px", fixed: true },

      ],
      sentries: { dayNumber: '', month: '', year: '', day: '', platform: '', cloud: '',
       network: '', security: '', db: '', applicationManagement: '' },
      dialogdetail: false,
      serverCount: 0,
      siteCount: 0,
      companyCount: 0,
      userCount: 0,
      dbCount: 0,
      responsibilityCount: 0,
      monthlySentry: [],
      search: '',
    }
  },
  methods: {
    columnValueList(val) {
      return this.monthlySentry.map((d) => d[val]);
    },
    async getMonthlySentry(count) {
      this.loaderTable = true;
      
      let response = await monthlySentryService.getSentries(count)
      this.monthlySentry = this.monthlySentry.concat(response);
      

      this.loaderTable = false;
    },
  },
  computed: {
    filterMonthlySentry() {
      return this.monthlySentry.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  async created() {
    this.serverCount = await dashboardService.getServerCount()
    this.siteCount = await dashboardService.getSiteCount()
    this.userCount = await dashboardService.getUserCount()
    this.dbCount = await dashboardService.getDbCount()
    this.responsibilityCount = await dashboardService.getResponsibilityCount()
    this.companyCount = await dashboardService.getCompanyCount()

    this.sentries = await todaySentryService.getSentries()
  },
  watch: {
    options: {
      handler() {
        if (this.search.length == 0) {
          this.getMonthlySentry(this.sentryFetchCount)
          this.sentryFetchCount++;
        }
      },
      deep: true,
    },
  },  
  components: {
    SideBar,
    NavBar,
  },
  mounted: function () {
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
  },
  destroyed: function () {
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = null
  }
}
</script>

<style>
.v-btn.withoutupercase {
  text-transform: none !important;
}

.v-btn:not(.v-btn--round).v-size--small {
  min-width: 30px !important;
  padding: 0 5px !important;
}
</style>