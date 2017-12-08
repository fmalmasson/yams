import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: {
      players: [],
      users: []
    },
    mutations: {
      ADD_USER: (state, user) => {
        state.users = []
        axios.get('https://api.mlab.com/api/1/databases/yams/collections/players?apiKey=Abe_aqSvB_QidC68ajjmEsIWU6clrskh')
          .then(function (response) {
            _.forEach(response.data, (user) => {
              state.users.push(user)
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      ADD_PLAYER: (state, player) => {
        state.players.push(player)
      },
      REMOVE_PLAYER: (state, player) => {
        state.players.splice()
      },
      RESET: (state) => {
        state.players = []
      },
      SET_PLAYERS: (state) => {
        let newGame = []
        for (let i = 0; i < state.players.length; i += 1) {
          newGame.push(
            {
              name: state.players[i].name,
              score: {
                top: {
                  one: null,
                  two: null,
                  three: null,
                  four: null,
                  five: null,
                  six: null
                },
                diff: {
                  lowest: null,
                  highest: null
                },
                straights: {
                  small: null,
                  high: null
                },
                bottom: {
                  threeOfAKind: null,
                  fullHouse: null,
                  fourOfAKind: null,
                  yams: null,
                  bonusYams: null,
                  yamsSec: null
                },
                total: null
              }
            }
          )
        }
        state.players = newGame
      }
    },
    getters: {
      players: state => (state.players),
      users: state => (state.users)
    },
    actions: {
      addUser ({ commit }, user) {
        commit('ADD_USER', user)
      },
      addPlayer ({ commit }, player) {
        commit('ADD_PLAYER', player)
      },
      removePlayer ({ commit }, player) {
        commit('REMOVE_PLAYER', player)
      },
      reset ({ commit }) {
        commit('RESET')
      },
      setPlayers ({ commit }) {
        commit('SET_PLAYERS')
      }
    }
  })
}

export default createStore
