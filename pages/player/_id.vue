<template>
  <div>
    <h3 v-if="Player">{{ Player.name }}</h3>
    <li v-for="(cat, idx) in categories">

          {{ cat.name }} : {{ average(cat.name) }}
      </li>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data: () => ({
    categories: {
      'ace': {
        name: 'ace',
        value: null
      },
      'two': {
        name: 'two',
        value: null
      },
      'three': {
        name: 'three',
        value: null
      },
      'four': {
        name: 'four',
        value: null
      },
      'five': {
        name: 'five',
        value: null
      },
      'six': {
        name: 'six',
        value: null
      },
      'totalHaut': {
        name: 'totalHaut',
        value: null
      },
      'moins': {
        name: 'moins',
        value: null
      },
      'plus': {
        name: 'plus',
        value: null
      },
      'totalDiff': {
        name: 'totalDiff',
        value: null
      },
      'petiteSuite': {
        name: 'petiteSuite',
        value: null
      },
      'grandeSuite': {
        name: 'grandeSuite',
        value: null
      },
      'totalSuites': {
        name: 'totalSuites',
        value: null
      },
      'brelan': {
        name: 'brelan',
        value: null
      },
      'full': {
        name: 'full',
        value: null
      },
      'carre': {
        name: 'carre',
        value: null
      },
      'yams': {
        name: 'yams',
        value: null
      },
      'bonusYams': {
        name: 'bonusYams',
        value: null
      },
      'yamsSec': {
        name: 'yamsSec',
        value: null
      },
      'totalBas': {
        name: 'totalBas',
        value: null
      },
      'totalGame': {
        name: 'totalGame',
        value: null
      }
    }
  }),
  methods: {
    average (cat) {
      console.log(cat)
      let array = []
      if (_.indexOf(Object.keys(this.categories), cat !== -1)) {
        console.log('ok')
      }
      _.forEach(this.Player.games, (game) => {
        array.push(game[cat])
      })
      console.log(array)
      let avg = 0
      let sum = 0
      sum = _.sum(array)
      avg = sum / this.Player.games.length
      this.categories[cat].value = avg
      return this.categories[cat].value
    }
  }
}
</script>
