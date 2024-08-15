<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Mon Application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container>
          <h1 class="text-h3 mb-5">Bienvenue sur notre site</h1>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>Nos Services</v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
                  interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text>En savoir plus</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>À Propos</v-card-title>
                <v-card-text>
                  Nous sommes une entreprise innovante spécialisée dans la création de solutions numériques
                  sur mesure pour répondre à vos besoins spécifiques.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text>Découvrir</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }} - Mon Application</span>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        drawer: false,
        menuItems: [
          { title: 'Accueil', icon: 'mdi-home', to: '/' },
          { title: 'Services', icon: 'mdi-briefcase', to: '/services' },
          { title: 'À Propos', icon: 'mdi-information', to: '/about' },
          { title: 'Contact', icon: 'mdi-email', to: '/contact' },
        ],
      }
    },
  }
  </script>
  