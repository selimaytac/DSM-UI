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
                Default color is Blue
                <v-card class="my-2" :disabled="$vuetify.theme.themes.name === theme.name" @click="setTheme(theme)"
                    hover outlined v-for="(theme, index) in themes" :key="index">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ theme.name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-avatar color="success" size="30" v-if="$vuetify.theme.themes.name === theme.name">
                                <v-icon>mdi-check</v-icon>
                            </v-avatar>
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
                <!-- <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" v-on="on">
                                Change Color
                            </v-btn>
                        </template>
                        <v-color-picker value="#7417BE" v-model="color" hide-canvas hide-inputs show-swatches
                            swatches-max-height="300px" class="mx-auto ma-2"></v-color-picker>
                    </v-menu>
                </div> -->
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
        themes: [
            { name: "Red", dark: { primary: "#FF0000", }, light: { primary: "#FF0000", } },
            { name: "Green", dark: { primary: "#33691E", }, light: { primary: "#008000", } },
            { name: "Blue", dark: { primary: "#0D47A1", }, light: { primary: "#0000FF", } },
            { name: "Yellow", dark: { primary: "#FFEB3B", }, light: { primary: "#FFFF00", } },
            { name: "Orange", dark: { primary: "#E65100", }, light: { primary: "#ffa450", } },
            { name: "Purple", dark: { primary: "#9C27B0", }, light: { primary: "#800080", } },
            { name: "Brown", dark: { primary: "#795548", }, light: { primary: "#a1887f", } },
            { name: "Grey", dark: { primary: "#9E9E9E", }, light: { primary: "#808080", } },
            { name: "Pink", dark: { primary: "#E91E63", }, light: { primary: "#FF00FF", } },
        ]
        // color: '#4094e3',
    }),
    methods: {
        toggle_dark_mode: function () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
        },
        setTheme(theme) {
            
            this.menu = false;
            
            const name = theme.name;
            const dark = theme.dark;
            const light = theme.light;
            Object.keys(dark).forEach(i => {
                this.$vuetify.theme.themes.dark[i] = dark[i];
            });
            Object.keys(light).forEach(i => {
                this.$vuetify.theme.themes.light[i] = light[i];
            });
            this.$vuetify.theme.themes.name = name;
            localStorage.setItem("sidebar_theme",JSON.stringify(theme));
        }
    },
    mounted() {
        const theme = localStorage.getItem("dark_theme");
        const sidebarTheme = localStorage.getItem("sidebar_theme");
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
        if (sidebarTheme) {
            this.setTheme(JSON.parse(sidebarTheme));
        }
    },
    // watch: {
    //     color: function (val) {
    //         localStorage.setItem("sidebar_theme", JSON.stringify(val));
    //         this.$vuetify.theme.themes.dark.primary = val;
    //         this.$vuetify.theme.themes.light.primary = val;
    //     }
    // },
    // created() {
    //     this.color = localStorage.getItem("sidebar_theme") ? JSON.parse(localStorage.getItem("sidebar_theme")) : this.color;
    //     this.$vuetify.theme.themes.dark.primary = this.color;
    //     this.$vuetify.theme.themes.light.primary = this.color;

    //     if (localStorage.getItem("sidebar_theme") !== this.color) {
    //         localStorage.removeItem("sidebar_theme");
    //     } else {
    //         localStorage.setItem("sidebar_theme", JSON.stringify(this.color));
    //     }

    // }
};
</script>
<style scoped>

</style>