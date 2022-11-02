<template>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on }">

            <v-btn class="ma-2" icon v-on="on">
                <v-icon size="30" color="white">mdi-palette</v-icon>
            </v-btn>

        </template>
        <v-card>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">
                        Dark Mode</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon @click="toggle_dark_mode">
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-card-text>
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" v-on="on">
                                Change Color
                            </v-btn>
                        </template>
                        <v-color-picker value="#7417BE" v-model="color" hide-canvas hide-inputs show-swatches
                            swatches-max-height="300px" class="mx-auto ma-2"></v-color-picker>
                    </v-menu>
                </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-btn text @click="menu = false" color="grey">Close</v-btn>
                <v-spacer />
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: "ThemeChanger",
    data: () => ({
        menu: false,
        color: '#4094e3',
    }),
    methods: {
        toggle_dark_mode: function () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
        },
    },
    mounted() {
        const theme = localStorage.getItem("dark_theme");
        if (theme) {
            if (theme === "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.$vuetify.theme.dark = true;
            localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    },
    watch: {
        color: function (val) {
            localStorage.setItem("sidebar_theme", JSON.stringify(val));
            this.$vuetify.theme.themes.dark.primary = val;
            this.$vuetify.theme.themes.light.primary = val;
        }
    },
    created (){
        this.color = localStorage.getItem("sidebar_theme") ? JSON.parse(localStorage.getItem("sidebar_theme")) : this.color;
        this.$vuetify.theme.themes.dark.primary = this.color;
        this.$vuetify.theme.themes.light.primary = this.color;
        localStorage.setItem("sidebar_theme", JSON.stringify(this.color));

    }
};
</script>
<style scoped>

</style>