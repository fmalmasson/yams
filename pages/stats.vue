<template>
  <div class="stats">
    <div class="global-stats">
      <v-btn color="primary" @click.once="getStats">Primary</v-btn>
  <!-- <global-stats></global-stats> -->
  </div>
<div class="individual-stats">
  <!-- <player-stats></player-stats>
  <player-stats></player-stats> -->
</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import globalStats from '../components/GlobalStats'
import playerStats from '../components/PlayerStats'
import _ from 'lodash'
import axios from 'axios'

export default {
  components: {
    globalStats,
    playerStats
  },
  data: () => ({
    statistics: ['toto']
  }),
  methods: {
    ...mapActions(['addUser']),
    getStats () {
      _.forEach(this.users, (user) => {
        axios.get('https://api.mlab.com/api/1/databases/yams/collections/scores?q={"name": "' + user.name + '"}&apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh')
          .then((response) => {
            this.statistics.push({[user.name]: response.data})
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  computed: {
    ...mapGetters(['players', 'users'])
    // getItems () {
    //   return this.users
    // }
  },
  // watch: {
  //   getItems: {
  //     handler () {
  //       this.items = []
  //       _.forEach(this.users, (user) => {
  //         axios.get('https://api.mlab.com/api/1/databases/yams/collections/scores?q={"name": ' + user.name + '}&apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh')
  //           .then(function (response) {
  //             console.log(response)
  //           })
  //           .catch(function (error) {
  //             console.log(error)
  //           })
  //       })
  //     }
  //   }
  // },
  mounted () {
    this.$store.dispatch('addUser')
  }
}
</script>

<style>

.stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}
.individual-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: blue;
  height: 99vh;
  width: 40%;
  justify-content: center;
}
</style>
