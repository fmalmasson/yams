<template>
  <div class="stats">
    <div class="global-stats">
  <global-stats></global-stats>
  </div>
<div class="individual-stats">
  <player-stats></player-stats>
  <player-stats></player-stats>
</div>
  </div>
</template>

<script>
import globalStats from '../components/GlobalStats'
import playerStats from '../components/PlayerStats'

export default {
  components: {
    globalStats,
    playerStats
  },
  data: () => ({
  }),
  methods: {
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
