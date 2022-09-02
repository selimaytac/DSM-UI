<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <NavBar />

    <v-container>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title>Overview</v-toolbar-title>
      </v-toolbar>
      <v-item-group mandatory class="mt-n4">
        <v-container>
          <v-row justify="center" class="space">
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-server</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Server Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{serverCount.serverCount}}</strong>
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
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-earth-americas</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Site Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{siteCount.siteCount}}</strong>
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
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-sitemap</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Company Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{companyCount.companyCount}}</strong>
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
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
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
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{responsibilityCount.responsibilityCount}}</strong>
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
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-database</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">DB Portal Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{dbCount.dbCount}}</strong>
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
                <v-card :color="active ? 'primary' : 'white'" class="d-flex align-center rounded-xl" dark height="150"
                  @click="toggle">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-6">

                            <v-icon x-large :color="active ? 'white' : 'primary'">fas fa-user</v-icon>

                          </div>
                          <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Total User Count
                          </v-list-item-subtitle>
                          <v-list-item-title class="headline mb-1" :class="active ? 'white--text' : 'black--text'">
                            <strong>{{userCount.userCount}}</strong>
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
      <v-row class="mt-n6">
        <v-col cols="12" md="7" sm="12">
          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n2">
            <v-toolbar-title>DSM Nedir?</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" sm="12">
          <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n2">
            <v-toolbar-title>DSM News</v-toolbar-title>
          </v-toolbar>
          <v-timeline>
            <v-timeline-item v-for="n in 2" :key="n" color="primary" small>
              <template v-slot:opposite>
                <span>01.09.2022</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="text-h6">Server Eklendi</v-card-title>
                <v-card-text>
                  '' '' IP'li server eklendi.
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n4">
        <v-toolbar-title>Uygulamalarımız</v-toolbar-title>
      </v-toolbar>
      <v-col cols="12" sm="4">
            
            <v-card class="cardOr mx-2 rounded-xl mt-n3" elevation="16">
              <v-row>
                <v-col cols="12" sm="8">
                  <a href="https://scorecard.fw.dteknoloji.com.tr/" target="_blank">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1 primary--text">
                        Scorecard
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </a>
                <v-list-item-subtitle class="primary--text">Ufak bir açıklama yazılabilir</v-list-item-subtitle>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="lineO.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
         
          </v-col>
          <v-col cols="12" sm="4">
             <v-card class="cardVr mx-2 rounded-xl mt-n3" elevation="16">
              <v-row>
                <v-col cols="12" sm="8">
                  <a href="http://dsm/#/login" target="_blank">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1 primary--text">
                        DSM 
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </a>
                <v-list-item-subtitle class="primary--text">Ufak bir açıklama yazılabilir</v-list-item-subtitle>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="logo1.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
         
          </v-col>
          <v-col cols="12" sm="4">
             <v-card class="cardR mx-2 rounded-xl mt-n3" elevation="16">
              <v-row>
                <v-col cols="12" sm="8">
                  <a href="coming soon" target="_blank">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1 primary--text">
                        Arıza Bildiri
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </a>
                <v-list-item-subtitle class="primary--text">Ufak bir açıklama yazılabilir</v-list-item-subtitle>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="line.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
         
          </v-col>

    </v-container>
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
import { dashboardService } from '@/services/api/dashboard.service'

export default {
  name: 'overview',
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      toggle_exclusive: 1,
      orders: [
        {
          id: '10.110.25.78',
          title: 'Server',
          state: 'Eklendi',
        },
        {
          id: '10.110.25.78',
          title: 'Server',
          state: 'Çıkarıldı',
        },
        {
          id: '10.110.25.78',
          title: 'Site',
          state: 'Düzenlendi',
        },
        {
          id: '10.110.25.78',
          title: 'Server',
          state: 'Kullanılmıyor',
        },

      ],
      serverCount: 0,
      siteCount: 0,
      companyCount: 0,
      userCount: 0,
      dbCount: 0,
      responsibilityCount: 0,
    }
  },
  async created() {
    this.serverCount = await dashboardService.getServerCount()
    this.siteCount = await dashboardService.getSiteCount()
    this.userCount = await dashboardService.getUserCount()
    this.dbCount = await dashboardService.getDbCount()
    this.responsibilityCount = await dashboardService.getResponsibilityCount()
    this.companyCount = await dashboardService.getCompanyCount()
  },
  components: {
    SideBar,
    NavBar,
  },
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