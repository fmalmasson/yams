<template>
  <v-layout row :style="{'background-image': 'url(' + wallpaper + ')', 'background-size': 'cover'}">
    <v-flex class="selectedPlayers" xs2>
      <v-navigation-drawer
  temporary
  v-model="drawer"
  dark
  absolute
>
  <v-list class="pa-1">
      <v-list-tile-content>
        <v-list-tile-title>Menu</v-list-tile-title>
      </v-list-tile-content>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
  <v-list class="pt-0" dense>
    <v-select class="select-input"
          v-bind:items="items"
          v-model="selectedPlayers"
          label="Joueurs"
          single-line
          light
          item-text="name"
          multiple
          tags
          clearable
          @change="reset"
        ></v-select>
    <v-divider></v-divider>
    <v-list-tile @click="startGame">
      <v-list-tile-action>
        <v-icon></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Start</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="nextGame">
      <v-list-tile-action>
        <v-icon></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Partie suivante</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="reload">
      <v-list-tile-action>
        <v-icon></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Recharger partie perdue</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
      <v-list-tile>
      <v-list-tile-action>
        <v-icon></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title><nuxt-link to="/stats">Statistiques</nuxt-link></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="dialog = true">
      <v-list-tile-action>
        <v-icon></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Changer fond d'écran</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
        <v-btn round small color="primary" dark @click.native.stop="drawer = true">Menu</v-btn>
    </v-flex>

    <v-flex class="player" xs2 v-for="(player, index) in players">
    <player @save="saveGame(), whoWins()"
    :index="index"
    :player="player"></player>
  </v-flex>
  <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Changer le fond d'ecran</v-card-title>
        <v-card-text>collez ici l'adresse de votre image préferée</v-card-text>
        <v-flex xs12>
          <v-text-field
            @change="setNewWallpaper"
            name="input-1"
            v-model="wallpaper"
          ></v-text-field>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PlayerModal from './../components/PlayerModal'
  import Player from './../components/Player'
  import GameMenu from './../components/GameMenu'
  import _ from 'lodash'
  import axios from 'axios'
  export default {
    components: {
      PlayerModal,
      Player,
      GameMenu
    },
    // props: {
    //   wallpaper: {
    //     type: String,
    //     default: 'dice3.jpg'
    //   }
    // },
    data: () => ({
      // dialog: true,
      // newGame: false,
      // menu: false,
      // gameLoaded: false,
      // nextGameLoaded: false,
      // playersPlaying: [],
      actions: [
        {
          'name': 'Start',
          'action': this.startGame
        },
        {
          'name': 'Next Game',
          'action': this.nextGame
        },
        {
          'name': 'Reload',
          'action': this.reload
        },
        {
          'name': 'statistiques',
          'action': ''
        },
        {
          'name': 'wallpaper',
          'action': this.setNewWallpaper
        }
      ],
      drawer: false,
      wallpaper: 'https://images.alphacoders.com/257/thumb-1920-257863.jpg',
      dialog: false,
      winner: '',
      items: [],
      selectedPlayers: [],
      posts: null,
      apiKey: 'Abe_aqSvB_QidC68ajjmEsIWU6clrskh',
      game: {
        'firstName': 'Fred',
        'lastName': 'Flintstone'
      }
    }),
    methods: {
      ...mapActions(['reset', 'addPlayer', 'setPlayers', 'addUser']),
      addToApi () {

      },
      startGame () {
        _.forEach(this.selectedPlayers, (player) => {
          if (this.items.indexOf(player.name) === -1) {
            axios.post('https://api.mlab.com/api/1/databases/yams/collections/players?apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh', {'name': player.name})
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        })
        this.$store.dispatch('addUser')
        _.forEach(this.selectedPlayers, (player) => {
          this.addPlayer(
            {
              name: player.name,
              id: player._id.$oid,
              win: '',
              score: {
                top: {
                  one: null,
                  two: null,
                  three: null,
                  four: null,
                  five: null,
                  six: null
                },
                diff: {
                  lowest: null,
                  highest: null
                },
                straights: {
                  small: null,
                  high: null
                },
                bottom: {
                  threeOfAKind: null,
                  fullHouse: null,
                  fourOfAKind: null,
                  yams: null,
                  bonusYams: null,
                  yamsSec: null
                },
                total: null,
                yamsDone: 0
              }
            }
          )
        })
      },
      nextGame () {
        _.forEach(this.players, (player) => {
          player.name === this.winner ? player.win = 'Oui' : player.win = 'Non'
        })
        axios.post('https://api.mlab.com/api/1/databases/yams/collections/scores?apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh', this.players)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        let idxFirstPlayer = ''
        _.forEach(this.players, (player) => {
          if (player.name === this.winner) {
            idxFirstPlayer = idxFirstPlayer === this.players.length - 1 ? 0 : this.players.indexOf(player) + 1
            // alert(idxFirstPlayer)
          }
        })
        const newOrder = this.players.slice(idxFirstPlayer, this.players.length)
        this.players.splice(idxFirstPlayer, this.players.length - 1)
        for (let i = newOrder.length - 1; i >= 0; i -= 1) {
          this.players.unshift(newOrder[i])
        }
        this.setPlayers()
      },
      saveGame () {
        localStorage.clear()
        _.forEach(this.players, (player) => localStorage.setItem(player.name, JSON.stringify(player)))
      },
      reload () {
        this.reset()
        for (let i = 0; i < localStorage.length; i += 1) {
          this.addPlayer(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      },
      whoWins () {
        let score = 0
        let winning = ''
        _.forEach(this.players, (player) => {
          if (player.score.total > score) {
            score = player.score.total
            winning = player.name
          }
          this.winner = winning
        })
      },
      setNewWallpaper () {
        this.$emit('changeWallpaper', this.wallpaper)
      }
    },
    computed: {
      ...mapGetters(['players', 'users']),
      orderItems () {
        return this.items.sort()
      },
      getItems () {
        return this.users
      }
    },
    watch: {
      getItems: {
        handler () {
          this.items = []
          _.forEach(this.users, (user) => this.items.push(user))
        }
      }
    },
    mounted () {
      this.$store.dispatch('addUser')
    }
  }
</script>
<style>
.player {
padding: 5px;
}
.layout {
  height: 100vh;
}
.newGame btn__content {
  color : black;
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
}

.application--light .card, .application .theme--light.card{
  background-color: white;
  border-radius: 5px;
}
.selectedPlayers {
  margin-top: 30vh;
  height: 20vh;
  display: flex;
  flex-direction: column;
align-items: center;
}
.select-input{
padding: 0; /*width: 15vw;*/
padding-top: 2vh;
  margin: 0;
}
</style>
