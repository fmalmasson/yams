<template>
    <v-dialog v-model="playerDialog" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card dark>
        <v-card-title>
          <span class="headline">Ajouter des joueurs
            <!-- <v-btn fab dark color="black" small @click="addPlayer"> -->
      <!-- <v-icon dark>add</v-icon> -->
            <!-- </v-btn> -->
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex class="select-player" xs12 sm12>
                <v-select
                  @change="savePlayer"
                  clearable
                  v-model="playersSelected"
                  label="Joueurs"
                  autocomplete
                  single-line
                  bottom
                  tags
                  :items="existingPlayers"
                ></v-select>
                <!-- <v-btn color="red" dark @click.native="removePlayer(index)"> -->
                  <!-- <v-icon light center>delete</v-icon> -->
                <!-- </v-btn> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="savePlayer(), startGame()">Start</v-btn>
          <v-btn color="blue darken-1" flat @click.native="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
// import axios from 'axios'
// import _ from 'lodash'

export default {
  name: 'playerModal',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    playersSelected: [],
    existingPlayers: [],
    playersPlaying: []
  }),
  methods: {
    ...mapActions(['addPlayer', 'removePlayer', 'reset']),
    closeModal () {
      this.$emit('closeModal')
    },
    cancel () {
      this.reset()
      this.$emit('cancel')
    },
    savePlayer () {
      // const playersFirebase = this.$firebase.database().ref('players')
      // _.forEach(this.playersSelected, (name) => {
      //   if (this.existingPlayers.indexOf(name) === -1) {
      //     playersFirebase.push(
      //       {
      //         name: name,
      //         wins: 0,
      //         lost: 0,
      //         yamsDone: 0,
      //         yamsSecDone: 0
      //       }
      //     )
      //   }
      // })
      // this.getPlayers()
    },
    startGame () {
      // const playersFirebase = this.$firebase.database().ref('players')
      // _.forEach(this.playersSelected, (player) => {
      //   playersFirebase.orderByChild('name').equalTo(player).on('child_added', (data) => {
      //     // this.playersPlaying.push({name: player, id: data.key})
      //     this.players.push(
      //       {
      //         name: player,
      //         id: data.key,
      //         win: false,
      //         score: {
      //           top: {
      //             one: null,
      //             two: null,
      //             three: null,
      //             four: null,
      //             five: null,
      //             six: null
      //           },
      //           diff: {
      //             lowest: null,
      //             highest: null
      //           },
      //           straights: {
      //             small: null,
      //             high: null
      //           },
      //           bottom: {
      //             threeOfAKind: null,
      //             fullHouse: null,
      //             fourOfAKind: null,
      //             yams: null,
      //             bonusYams: null,
      //             yamsSec: null
      //           },
      //           total: null
      //         }
      //       }
      //     )
      //   })
      // })
      // this.closeModal()
    },
    removePlayer (idx) {
      this.players.splice(idx, 1)
    },
    getPlayers () {
    //   this.existingPlayers = []
    //   const playersFirebase = this.$firebase.database().ref('players')
    //   playersFirebase.once('value').then((snapshot) => {
    //     _.forEach(snapshot.val(), (player) => {
    //       this.existingPlayers.push(player.name)
    //     })
    //   })
    }
  },
  computed: {
    playerDialog () {
      return this.dialog
    },
    ...mapGetters(['players'])
  },
  created () {
    this.getPlayers()
  }
}
</script>

<style>
/*.select-player{
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}*/
</style>
