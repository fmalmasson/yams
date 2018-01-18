<template>
  <v-layout row :style="{'background-image': 'url(' + wallpaper + ')', 'background-size': 'cover', 'height': '100vh'}">
  <div class="stats_page">
    <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    <v-data-table

      v-bind:search="search"
      v-bind:headers="headers"
      :items="items"
      class="scroll elevation-1 scroll-x"
    >
    <template slot="items" scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.score.total }}</td>
      <td class="text-xs-right">{{ props.item.score.top.one }}</td>
      <td class="text-xs-right">{{ props.item.score.top.two }}</td>
      <td class="text-xs-right">{{ props.item.score.top.three }}</td>
      <td class="text-xs-right">{{ props.item.score.top.four }}</td>
      <td class="text-xs-right">{{ props.item.score.top.five }}</td>
      <td class="text-xs-right">{{ props.item.score.top.six }}</td>
      <td class="text-xs-right">{{ props.item.score.diff.lowest }}</td>
      <td class="text-xs-right">{{ props.item.score.diff.highest }}</td>
      <td class="text-xs-right">{{ props.item.score.straights.small }}</td>
      <td class="text-xs-right">{{ props.item.score.straights.high }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.threeOfAKind }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.fullHouse }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.fourOfAKind }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.yams }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.bonusYams }}</td>
      <td class="text-xs-right">{{ props.item.score.bottom.yamsSec }}</td>
      <td class="text-xs-right">{{ props.item.win }}</td>
    </template>
  </v-data-table>
      <v-btn color="primary" @click.native.stop="getStats">Statistiques</v-btn>
  </div>
</v-layout>
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
    wallpaper: 'https://cdn3.geckoandfly.com/wp-content/uploads/2013/11/Left_Right_Brain.jpg',
    pagination: {
      sortBy: 'total'
    },
    search: '',
    headers: [
      {
        text: 'Joueur',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Total', value: 'score.total' },
      { text: 'Les 1', value: 'score.top.one' },
      { text: 'Les 2', value: 'score.top.two' },
      { text: 'Les 3', value: 'score.top.three' },
      { text: 'Les 4', value: 'score.top.four' },
      { text: 'Les 5', value: 'score.top.five' },
      { text: 'Les 6', value: 'score.top.six' },
      { text: 'moins', value: 'score.diff.lowest' },
      { text: 'plus', value: 'score.diffhighest' },
      { text: 'Petite Suite', value: 'score.straights.small' },
      { text: 'Grande Suite', value: 'score.straights.high' },
      { text: 'Brelan', value: 'score.bottom.threeOfAKind' },
      { text: 'Full', value: 'score.bottom.fullHouse' },
      { text: 'Carré', value: 'score.bottom.fourOfAKind' },
      { text: 'Yams', value: 'score.bottom.yams' },
      { text: 'Bonus Yams', value: 'score.bottom.bonusYams' },
      { text: 'Yams Sec', value: 'score.bottom.yamsSec' },
      { text: 'Win', value: 'win' }
    ],
    items: []
  }),
  methods: {
    ...mapActions(['addUser']),
    getStats () {
      axios.get('https://api.mlab.com/api/1/databases/yams/collections/scores?apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh')
        .then((response) => {
          console.log(response.data)
          _.forEach(response.data, (rep) => {
            this.items.push(rep)
          })
        })
        .catch((error) => {
          console.log(error)
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

th {
  padding: 0;
}

.scroll {
  scrollX: true;
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
