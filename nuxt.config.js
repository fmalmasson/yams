
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'yams',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'grilles de yams' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dice.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/vuefire.js'],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/style.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Modules
  */
  // modules: [{
  //     src: '@rafamaciel/firebase',
  //     options: {
  //       apiKey: "AIzaSyC1A-pqyvCExapQ-aU0h-T03SGsQUQjjlM",
  //       authDomain: "yams-ca6b4.firebaseapp.com",
  //       databaseURL: "https://yams-ca6b4.firebaseio.com",
  //       projectId: "yams-ca6b4",
  //       storageBucket: "yams-ca6b4.appspot.com",
  //       messagingSenderId: "1003950231287"
  //     }
  //   }],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
