<template>
  <v-card class=" pa-2" outlined tile v-if="forecast != null">
    <v-app-bar><v-toolbar-title>Weather Forecast</v-toolbar-title></v-app-bar><br/>
    <line-chart class="small" :chart-data="datacollection" :descriptions="chartData.descriptions" :days="chartData.days"></line-chart>
  </v-card>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        dates: []
      }
    },
    props: [ 'chartData', 'forecast' ],
    // mounted () {
    //   this.fillData()
    //   console.log("Mounted")
    // },
    watch: {
        forecast: function() {
            this.fillData()
        }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.chartData.dates,
          datasets: [
            {
              label: 'Maximum Temperature',
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              data: this.chartData.maxTemps
            },
            {
              label: 'Minimum Temperature',
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              data: this.chartData.minTemps
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    max-height: 600px;
    /* margin:  20px auto; */
  }
</style>