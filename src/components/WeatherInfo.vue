<template>
    <v-card class="" outlined tile v-if="forecast != ''">
    <v-app-bar><v-toolbar-title>Weather Information</v-toolbar-title></v-app-bar><br/>
    <center>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>
          <h1>{{loc}}</h1>
        </v-list-item-title>
        <v-list-item-subtitle style="fontSize: 120%">{{forecast.daily[0].weather[0].description}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </center>

    
    <v-card-text>
      <v-row align="center">
        <v-col
          class="display-3"
          cols="6"
        >
        <center>
          <div class="temp"> {{forecast.current.temp}}&deg;C</div>
        </center>
        </v-col>
        <v-col cols="6">
          <center>
          <img :src="iconcode" width="92" />
          </center>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-col>
      <v-list-item-icon>
        <v-icon >mdi-arrow-up</v-icon>
      </v-list-item-icon>
      </v-col>
      <v-col>
      <v-list-item-subtitle> Max Temperature: {{forecast.daily[0].temp.max}}&deg;C</v-list-item-subtitle>
      </v-col>
      <v-col>
      <v-list-item-icon>
        <v-icon>mdi-arrow-down</v-icon>
      </v-list-item-icon>
      </v-col>
      <v-col>
      <v-list-item-subtitle>Min Temperature: {{forecast.daily[0].temp.min}}&deg;C</v-list-item-subtitle>
      </v-col>
    </v-list-item>

      <v-list-item>
      <v-switch
      flat
      value="blue"
      v-model="additionalInfo"
      label="View additional information"
      />
      </v-list-item>

    
    <div v-if="additionalInfo">
      <v-list-item>
        <v-col>
        <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        </v-col>
      <v-list-item-subtitle> &nbsp; {{forecast.current.wind_speed}} km/h (Wind Speed)</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-col>
        <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        </v-col>
      <v-list-item-subtitle>{{forecast.daily[0].humidity}}% (Humidity percentage)</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-col>
        <v-list-item-icon>
        <v-icon>mdi-speedometer</v-icon>
        </v-list-item-icon>
      </v-col>
      <v-list-item-subtitle>{{forecast.current.pressure}} hPa (Current Pressure)</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-col>
        <v-list-item-icon>
        <v-icon>mdi-weather-sunny</v-icon>
        </v-list-item-icon>
      </v-col>
      <v-list-item-subtitle>{{sunrise}} IST</v-list-item-subtitle>
      <v-col>
        <v-list-item-icon>
        <v-icon>mdi-weather-sunset</v-icon>
        </v-list-item-icon>
      </v-col>
      <v-list-item-subtitle>{{sunset}} IST</v-list-item-subtitle>
    </v-list-item>
    </div>
  </v-card>
</template>

<script>
export default {
    name: 'WeatherInfo',
    props: [ 'forecast', 'loc', 'iconcode' ],
    data () {
        return {
            sunrise: '',
            sunset: '',
            additionalInfo: false
        }
    },
    methods: {
    },
    watch: {
      forecast: function() {
        let unix_timestamp = this.forecast.current.sunset
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        this.sunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(this.sunset)

        unix_timestamp = this.forecast.current.sunrise
        date = new Date(unix_timestamp * 1000);
        hours = date.getHours();
        minutes = "0" + date.getMinutes();
        seconds = "0" + date.getSeconds();
        this.sunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        console.log(this.iconcode)
        console.log("http://openweathermap.org/img/w/10d.png")
      }
    }
}
</script>

<style>
  div.temp {
    font-size: 400%;
  }
</style>