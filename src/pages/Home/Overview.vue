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
        <v-toolbar-title class="black--text font-weight-bold mx-auto">Haftanın Nöbetçisi (Coming Soon...)
        </v-toolbar-title>
      </v-toolbar>
      <template>
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
                            <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">Koray Ay</v-list-item-title>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Uygulama Yönetimi
                            </v-list-item-subtitle>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">0 212 800 04 63
                            </v-list-item-subtitle>
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
                            <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">Koray Ay</v-list-item-title>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Veri Tabanı Yönetimi
                            </v-list-item-subtitle>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">0 212 800 04 62
                            </v-list-item-subtitle>
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
                            <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">Koray Ay</v-list-item-title>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Network Güvenliği
                              Yönetimi</v-list-item-subtitle>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">0 212 800 04 60
                            </v-list-item-subtitle>
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
                            <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">Koray Ay</v-list-item-title>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Cloud Yönetimi
                            </v-list-item-subtitle>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">0 212 800 0467 
                            </v-list-item-subtitle>
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
                            <v-list-item-title class="headline mb-6" :class="active ? 'white--text' : 'black--text'">Koray Ay</v-list-item-title>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">Platform Yönetimi
                            </v-list-item-subtitle>
                            <v-list-item-subtitle :class="active ? 'white--text' : 'black--text'">0212 800 04 61
                            </v-list-item-subtitle>
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
      </template>
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
  mounted: function() {
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
  },
  destroyed: function() {
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