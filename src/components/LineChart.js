import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
      return {
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
            // tooltips: {
            //     enabled: true,
            //     callbacks: {
            //         label: ((tooltipItems, data) => {
            //             console.log(data.datasets)
            //             console.log(tooltipItems)
            //             return data.datasets.label + tooltipItems.yLabel
            //         })
            //     }
            // }
          }
      }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}