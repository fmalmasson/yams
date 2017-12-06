<template lang="html">
  <!-- <v-layout> -->
    <div class="player-stats">
      <v-select
        @change="getStats"
        v-model="player"
        clearable
        label="Joueur"
        autocomplete
        single-line
        bottom
        :items="existingPlayers"
      ></v-select>
      <div v-if="games.length > 0">
        <span>matchs joués : {{ gamesPlayed }}</span></br>
        <span>score le plus haut : {{ highestScore }}</span></br>
        <span>score le plus nul : {{ lowestScore }}</span></br>

        <span>moyenne : {{ avgScore }}</span></br>
        <span>yams faits : {{ yamsDone }}</span><span> yams validés par match : {{ ratio(yamsDone) }}</span></br>
        <span>petites suites faites : {{ smallStraightDone }}</span></br>
        <span>grandes suites faites : {{ highStraightDone }}</span></br>




      </div>
    </div>
  <!-- </v-layout> -->
</template>

<script>
import _ from 'lodash'

export default {
  name: 'playerStats',
  data: () => ({
    player: '',
    existingPlayers: [],
    games: []
  }),
  computed: {
    gamesPlayed () {
      return this.games.length
    },
    scores () {
      let scores = []
      _.forEach(this.games, (game) => {
        scores.push(game.score.total)
      })
      return scores
    },
    highestScore () {
      return Math.max(...this.scores)
    },
    lowestScore () {
      return Math.min(...this.scores)
    },
    avgScore () {
      const avg = _.reduce(this.scores, (a, b) => a + b) / this.games.length
      return Math.round(avg)
    },
    yamsDone () {
      return this.figureDone(['bottom', 'yams'])
    },
    smallStraightDone () {
      return this.figureDone(['straights', 'small'])
    },
    highStraightDone () {
      return this.figureDone(['straights', 'high'])
    }
  },
  methods: {
    removeO (arr, val) {
      let i = arr.length
      while (i--) {
        if (arr[i] === val) {
          arr.splice(i, 1)
        }
      }
      return arr
    },
    figureDone (fig) {
      let arr = []
      _.forEach(this.games, (game) => {
        _.flattenDeep()
        arr.push(game.score[fig[0]][fig[1]])
      })
      this.removeO(arr, 0)
      return arr.length
    },
    getStats (v) {
      this.games = []
      const ref = this.$firebase.database().ref('scores')
      ref.orderByChild('name').equalTo(v).on('value', (data) => {
        _.forEach(data.val(), (game) => this.games.push(game))
      })
    },
    ratio (v) {
      return (v / this.gamesPlayed).toFixed(2)
    }
  },
  created () {
    const playersFirebase = this.$firebase.database().ref('players')
    playersFirebase.once('value').then((snapshot) => {
      _.forEach(snapshot.val(), (player) => {
        this.existingPlayers.push(player.name)
        // const obj = player.getKey()
        // this.existingPlayers.push(
        //   {
        //     name: player.name,
        //     id: 'obj'
        //   }
        // )
      })
    })
  },
  watcher: {
    player: {
      handler () {
        this.getStats(this.player)
      }
    }
  }
}
</script>

<style lang="css">
.player-stats {
  background-color: red;
  height: 46vh;
  width: 100%;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
