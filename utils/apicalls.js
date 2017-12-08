// import Vue from 'vue'
import axios from 'axios'

export const HTTP = axios.get('https://api.mlab.com/api/1/databases/yams/collections/players?apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh')
  .then(function (response) {
    return console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
