<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <SideBar />
    <NavBar />
    <v-container>
      <v-item-group mandatory class="mt-n2">
        <v-container>
          <v-row justify="center" class="space">
            <v-col cols="12" xs="12" sm="4" md="2" v-for="(card, i) in cards" :key="i">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? 'primary' : 'white'" :class="active ? 'borderme' : 'borderout'"
                  class="d-flex rounded-lg mx-auto" dark height="220" width="400" @click="toggle" flat>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <a :href="card.url">
                        <v-img :src="card.image" class="white--text align-end" height="150px" max-width="170px"></v-img>
                        <v-card-title :class="active ? 'white--text' : 'grey--text'" class="caption text-center justify-center font-weight-bold">
                          {{ card.description }}
                        </v-card-title>
                      </a>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
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
import { appManagementService } from "@/services/api/appManagement.service";
export default {
  data() {
    return {
      cards: [],
    };
  },
  async created() {
    this.cards = await appManagementService.getApps();
  },
  components: {
    SideBar,
    NavBar,
  }
}
</script>