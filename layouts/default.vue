<template>
  <v-app light>
    <main>
      <v-content>
        <v-container fluid grid-list-xs5 >
          <nuxt @changeWallpaper="setNewWallpaper(str)" />
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    wallpaper: 'https://images.alphacoders.com/257/thumb-1920-257863.jpg'
  }),
  methods: {
    setNewWallpaper (str) {
      console.log(str)
      this.wallpaper = str
    }
  }
}
</script>
<style>
.container {
  padding: 0;
}
</style>
