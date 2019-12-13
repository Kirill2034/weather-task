import React from 'react'
import classes from '../Weather/Weather.module.css'
import Form from '../../components/Form/Form'
import Info from '../../components/Info/Info'
import ListCity from '../../components/ListCity/ListCity'
import { debounce } from 'debounce'



class Weather extends React.Component {

    state = {
        infoWeather: false,
        value: '',
        city: null,
        temp: null,
        humidity: null,
        rainfall: null,
        errorMessage: false,
        class: null,
        listCity: []
    }

    onChangeText = event => {
        this.setState({
            value: event.target.value
        }, this.getCitiesHandler)
    }

    getWeatherHandler = debounce(async () => {
        try {
        const newState = {}

        if (this.state.value) {

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=536ed34d2858d4e397f4175a4e5395a6`)
            const data = await response.json()
            const temp = Math.floor(data.main.temp - 273.15)

            newState.temp = temp
            newState.humidity = data.main.humidity
            newState.infoWeather = true
            newState.errorMessage = false

            if (newState.temp > 0 && newState.humidity >= 50) {

                newState.rainfall = 'Возможны осадки в виде дождя'
                newState.class = 'fa fa-tint'

            } else {

                newState.rainfall = 'Возможны осадки в виде снега'
                newState.class = 'fa fa-snowflake'
            }

            if (!!data.name) {
                newState.city = data.name
            }

        } else {
            newState.infoWeather = false
            newState.value = ''
            newState.city = null
            newState.temp = null
            newState.humidity = null
            newState.rainfall = null
            newState.errorMessage = true 
        }

        this.setState(newState)
    } catch(e) {
        console.log(e)
    }
   }, 300)


   getCitiesHandler = debounce(async () => {

        if (this.state.value === '') {

            this.setState({
                listCity: []
            })

        } else {

            const response = await fetch(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=8yvRrk4W4aaaD4r6R174&app_code=44jQRPjWC1J4gQBmEPYW4w&query=${this.state.value}`)
            const data = await response.json();

            const listCity = data.suggestions.map((suggestion) => {
                return suggestion.address.city
            })
            
            this.setState({listCity})
        }
}, 300)



    render() {
        return (
            <div className={classes.Weather}>
                <h1>Погода по всему миру</h1>
                <Form 
                onClick={this.getWeatherHandler}
                getCity={this.getCitiesHandler}
                value={this.state.value}
                onChange={this.onChangeText}
                />
                {this.state.listCity.map((city, index) => {
                    return (
                    <ListCity 
                        key={index} 
                        onClick={() => this.setState({value: city, listCity: []})}
                    >
                    {city}
                    </ListCity>
                    )
                })}
                {this.state.errorMessage ? <p style={{color: 'red'}}>Введите город</p> : null}
                {this.state.infoWeather &&
                 <Info
                    city={this.state.city}
                    temp={this.state.temp}
                    humidity={this.state.humidity}
                    rainfall={this.state.rainfall}
                    class={this.state.class}
                    /> 
                }
            </div>
        )
    }
}
export default Weather;