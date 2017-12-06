<template lang="html">
  <v-layout>
    <v-flex xs12>
      <div class="global-stats">
        <span v-if="scores.length > 0"> best player : {{ bestPlayerName }}</span></br>
        <span v-if="scores.length > 0"> score : {{ bestPlayerScore }}</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'globalStats',
  data: () => ({
    scores: []
  }),
  computed: {
    bestPlayerName () {
      let name = ''
      name = this.scores[this.scores.length - 1].name
      return name
    },
    bestPlayerScore () {
      let score = ''
      score = this.scores[this.scores.length - 1].score
      return score
    }
  },
  methods: {
    getStats () {
      this.scores = []
      const ref = this.$firebase.database().ref('total')
      ref.orderByChild('score').on('child_added', (data) => {
        this.scores.push(data.val())
      })
    },
    getHighestYamsRatio () {
    }
  },
  created () {
    this.getStats()
  }
}
</script>

<style>
.global-stats {
  background-color: red;
  height: 99vh;
  width: 40%
}
</style>
