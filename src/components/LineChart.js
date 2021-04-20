import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: [ 'descriptions', 'days' ],
  data () {
      return {
        week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    padding: 25
                  }
                }
              ]
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: ((tooltipItems, data) => {
                        // console.log(data)
                        // console.log(tooltipItems)
                         return [data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel, "Weather: " + this.descriptions[tooltipItems.index], this.week[this.days[tooltipItems.index]]]
                    })
                }
            } 
          }
      }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}