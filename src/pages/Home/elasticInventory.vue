<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <NavBar />
    <v-container>
      <v-item-group mandatory class="mt-n2">
        <v-container>
          <v-row justify="center" class="space">
            <v-col md="4" cols="12" xs="12" sm="4" v-for="(inventory, i) in invents" :key="i">
              <v-card class="rounded-lg mx-auto" height="100%">
                <v-card-text>
                  <p class="text-h6 text--primary">
                    <a :href="inventory.url">{{ inventory.url }}</a>
                  </p>
                  <div class="my-4 text-subtitle-4">
                    IP Address : {{ inventory.ipAddress }}
                  </div>
                  <div class="my-4 text-subtitle-4">
                    LoadBalancaer IP : {{ inventory.loadbalancerIp }}
                  </div>
                  <div class="my-4 text-subtitle-4">
                    Company Name :
                    <a :href="inventory.companyName" color="primary">{{ inventory.companyName }}</a>
                  </div>

                </v-card-text>
                <v-card-actions>
                  <v-btn text color="teal accent-4" @click="reveal = true">
                    Learn More
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
                    <v-card-text class="pb-0">
                      <p class="text-h6 text--primary">
                        Host Name :
                        <a :href="inventory.hostname">{{ inventory.hostname }}</a>
                      </p>
                      <div class="my-2 text-subtitle-6">
                        Scope : {{ inventory.description }}
                      </div>
                    </v-card-text>
                    <v-card-actions class="pt-20">
                      <v-btn text color="teal accent-4" class="ma-1" @click="reveal = false">
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

      </v-item-group>

    </v-container>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import NavBar from "@/components/NavBar.vue";
import { elasticSearchService } from "@/services/api/elasticSearch.service";
export default {
  data() {
    return {
      invents: [],
      reveal: false,
    };
  },
  async created() {
    this.invents = await elasticSearchService.getElastics();
  },
  components: {
    SideBar,
    NavBar,
  }
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>