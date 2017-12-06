<template>
  <v-layout row>
    <v-flex class="selectedPlayers" xs2>
      <v-flex d-flex>
        <v-select class="select-input"
              v-bind:items="orderItems"
              v-model="selectedPlayers"
              label="Joueurs"
              single-line
              light
              item-value="text"
              multiple
              tags
              clearable
              @change="reset"
            ></v-select>
      </v-flex>
        <v-btn small color="primary" dark @click.native.stop="startGame">Start</v-btn>
        <v-btn small color="primary" dark @click.native.stop="nextGame">Next</v-btn>
        <v-btn small color="primary" dark @click.native.stop="reload">Reload</v-btn>
    </v-flex>

    <v-flex class="player" xs2 v-for="(player, index) in players">
    <player @save="saveGame(), whoWins()"
    :index="index"
    :player="player"></player>
  </v-flex>

  </v-layout>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PlayerModal from './../components/PlayerModal'
  import Player from './../components/Player'
  import GameMenu from './../components/GameMenu'
  import _ from 'lodash'

  export default {
    components: {
      PlayerModal,
      Player,
      GameMenu
    },
    data: () => ({
      // dialog: true,
      // newGame: false,
      // menu: false,
      // gameLoaded: false,
      // nextGameLoaded: false,
      // playersPlaying: [],
      winner: '',
      items: ['Fab', 'Soso', 'François', 'Alex', 'Clem', 'Jess', 'Judus'],
      selectedPlayers: []
    }),
    methods: {
      ...mapActions(['reset', 'addPlayer', 'setPlayers']),
      startGame () {
        _.forEach(this.selectedPlayers, (player) => {
          this.addPlayer(
            {
              name: player,
              win: false,
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
                total: null
              }
            }
          )
        })
      },
      nextGame () {
        let idxFirstPlayer = ''
        _.forEach(this.players, (player) => {
          if (player.name === this.winner) {
            idxFirstPlayer = idxFirstPlayer === this.players.length - 1 ? 0 : this.players.indexOf(player) + 1
            alert(idxFirstPlayer)
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
      }
    },
    computed: {
      ...mapGetters(['players']),
      orderItems () {
        return this.items.sort()
      }
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
  width: 15vw;
}
</style>
