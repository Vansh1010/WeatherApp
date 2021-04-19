<template>
    <div v-if="forecast != ''">
        <v-col>
            <v-row>
              <!-- {{forecast.city.name}}, {{forecast.city.country}} -->
            </v-row>
            <v-row>
              Weather description: {{forecast.daily[0].weather[0].description}}
            </v-row>
            <v-row>
              Current temperature: {{forecast.daily[0].temp.day}}
            </v-row>
            <v-row>          
              Today's high temperature: {{forecast.daily[0].temp.max}}
            </v-row>
            <v-row>          
              Today's low temperature: {{forecast.daily[0].temp.min}}
            </v-row>
            <v-switch
            flat
            value="blue"
            v-model="additionalInfo"
            label="View additional information"
            />
          
          <div v-if="additionalInfo">
            <v-row>
                  Wind speed: {{forecast.current.wind_speed}}
            </v-row>
              <v-row>
                  Humidity: {{forecast.daily[0].humidity}}
              </v-row>
              <v-row>
                  Pressure: {{forecast.current.pressure}}
              </v-row>
              <v-row>
                  Sunrise time: {{data.current.sunrise}}<br/>
                  Sunset time: {{sunset}}
              </v-row>
          </div>
        </v-col>
    </div>
</template>

<script>
export default {
    name: 'WeatherInfo',
    props: [ 'forecast' ],
    data () {
        return {
            sunrise: '',
            sunset: '',
            additionalInfo: true
        }
    },
    methods: {
      calTime () {
        let unix_timestamp = this.data.current.sunset
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        this.sunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        unix_timestamp = this.data.current.sunrise
        date = new Date(unix_timestamp * 1000);
        hours = date.getHours();
        minutes = "0" + date.getMinutes();
        seconds = "0" + date.getSeconds();
        this.sunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    }
}
</script>

<style>

</style>