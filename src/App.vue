<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title><h3>Weather Updates</h3></v-toolbar-title>
    </v-toolbar>
    <br />
    <!-- <center> -->
      <v-container style="width: 50%">
        <center>
          <v-row>
          <v-text-field
            label="Enter a location"
            v-model="search"
            filled
            style="width:50%"
          >
          </v-text-field>
          <v-btn @click="searchLocation" small style="height: 55px"><v-icon>mdi-magnify</v-icon></v-btn>
          </v-row>
        </center>
      </v-container>
      <v-container style="width: 100%">
      <v-row align="center" justify="center">
        <v-col class="flex-column justify-center align-center">
      <v-card class="mx-auto my-12">
        </v-card>
        </v-col>
        <v-col>
        </v-col>
      </v-row>
    </v-container>
    
      <v-container class="grey lighten-5">
    <v-row>
        <v-col>
          <WeatherInfo :forecast="forecast" :loc="loc" :iconcode="iconcode" />
        </v-col>
        <v-col>        
            <Forecast :chartData="chartData" :forecast="forecast" />
        </v-col>
    </v-row>
  </v-container>


  </div>
</template>

<script>

import WeatherInfo from './components/WeatherInfo'
// import Graph from './components/Graph'
import Forecast from './components/Forecast'

export default {
  name: 'App',
  data: () => ({
    search: 'New York',
    loc: '',
    iconcode: '',
    api_key: '02b4b8ed49a645efa6ad10b63f2d9bdc',
    forecast: null,
    chartData: {
      maxTemps: [],
      minTemps: [],
      descriptions: [],
      dates: [],
      days: []
    }
  }),
  components: { WeatherInfo, Forecast },
  methods: {
    searchLocation () {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.search}&units=metric&APPID=${this.api_key}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            this.latitude = res.coord.lat
            this.longitude = res.coord.lon
            this.loc = res.name + ', ' + res.sys.country
            console.log(this.iconcode)
            console.log(this.loc)
            console.log(this.latitude)
            console.log(this.longitude)
        })
        .then(() => {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely,hourly&units=metric&APPID=${this.api_key}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.forecast = res
                this.iconcode = "http://openweathermap.org/img/w/" + res.daily[0].weather[0].icon + ".png"
                for(var i=0; i<this.forecast.daily.length; i++) {
                  this.chartData.maxTemps[i] = this.forecast.daily[i].temp.max
                  this.chartData.minTemps[i] = this.forecast.daily[i].temp.min
                  this.chartData.descriptions[i] = this.forecast.daily[i].weather[0].description
                  // console.log(this.forecast.daily[i].dt)
                  let unix_timestamp = this.forecast.daily[i].dt
                  const milliseconds = unix_timestamp * 1000
                  var date = new Date(milliseconds).getDate()
                  var month = new Date(milliseconds).getMonth()+1
                  var year = new Date(milliseconds).getFullYear()
                  var day = new Date(milliseconds).getDay()
                  this.chartData.dates[i] = date + '/' + month + '/' + year
                  this.chartData.days[i] = day
                }
                console.log(this.chartData)
            })
        })
              
      }
  },
  created () {
    this.searchLocation()
  }
};
</script>
