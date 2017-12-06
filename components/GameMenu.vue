<template>
  <v-layout wrap>
    <!-- <v-container>
      <v-layout justify-center>
        <v-btn @click.stop="drawer = !drawer" dark color="info">Menu</v-btn>
      </v-layout>
    </v-container> -->
    <v-avatar class="dice-menu" @click.stop="drawer = !drawer" v-if="menu">
        <img src="dice.png" />
    </v-avatar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      temporary
      enable-resize-watcher
      app
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="dice.png" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Yams</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="$emit(item.function)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

          <v-list-tile to="/stats">
            <v-list-tile-action>
              <v-icon>trending_up</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Statistiques</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-list-tile @click="exit">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Quitter</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  name: 'GameMenu',
  props: {
    menu: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Nouvelle partie', icon: 'play_circle_filled', function: 'newGame' },
      { title: 'Partie suivante', icon: 'skip_next', function: 'nextGame' },
      { title: 'Charger partie en cours', icon: 'save', function: 'loadLostGame' }
    ]
  }),
  methods: {
    newGame () {
      this.$emit('newGame')
    },
    nextGame () {
      this.$emit('nextGame')
    },
    // stats () {
    //   router.go('/stats')
    // },
    exit () {
      this.$emit('exit')
    },
    loadLostGame () {
      this.$emit('loadLostGame')
    }
  },
  computed: {
  },
  watch: {
    // menuDrawer: {
    //   handler () {
    //     if (this.menuDrawer === false) {
    //       this.$emit('closeMenu')
    //     }
    //   }
    // }
  }
}
</script>

<style>
.dice-menu {
  position: absolute;
  top: 50vh;
  left: 0px;
  margin-left: 20px;
}
a {
  text-decoration: none;
}
</style>
