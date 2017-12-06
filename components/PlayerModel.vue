<template lang="html">

</template>

<script>
export default {
  name: 'playerModel',
  data: () => ({
    model: {
     name: '',
      score: {
        haut: [
          {
            ref: 'ace',
            value: ''
          },
          {
            ref: 'two',
            value: ''
          },
          {
            ref: 'three',
            value: ''
          },
          {
            ref: 'four',
            value: ''
          },
          {
            ref: 'five',
            value: ''
          },
          {
            ref: 'six',
            value: ''
          }
        ],
        difference: [
          {
            ref: 'moins',
            value: ''
          },
          {
            ref: 'plus',
            value: ''
          }
        ],
        suites: [
          {
            ref: 'petiteSuite',
            value: ''
          },
          {
            ref: 'grandeSuite',
            value: ''
          }
        ],
        bas: [
          {
            ref: 'brelan',
            value: ''
          },
          {
            ref: 'full',
            value: ''
          },
          {
            ref: 'carre',
            value: ''
          },
          {
            ref: 'yams',
            value: ''
          },
          {
            ref: 'bonusYams',
            value: ''
          },
          {
            ref: 'yamsSec',
            value: ''
          }
        ]
      }
    }
  })
}
</script>

<style lang="css">
</style>
