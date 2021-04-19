<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title><h3>Weather Updates</h3></v-toolbar-title>
    </v-toolbar>
    <br />
    <v-container style="width: 30%">
      <v-col>
        <v-row>
          <v-text-field
            label="Enter a location"
            v-model="search"
            filled
          >
          </v-text-field>
          <v-btn @click="searchLocation" style="height: 55px"><v-icon>mdi-magnify</v-icon></v-btn>
        </v-row>
      </v-col>
      <WeatherInfo :forecast="forecast" />
      <Graph :forecast="forecast" />

    </v-container>

  </div>
</template>

<script>

import WeatherInfo from './components/WeatherInfo'
import Graph from './components/Graph'

export default {
  name: 'App',
  data: () => ({
    search: '',
    api_key: '02b4b8ed49a645efa6ad10b63f2d9bdc',
    forecast: null
  }),
  components: { WeatherInfo, Graph },
  methods: {
    searchLocation () {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.search}&units=metric&APPID=${this.api_key}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            this.latitude = res.coord.lat
            this.longitude = res.coord.lon
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
            })
        })
              
      }
  }
};
</script>
