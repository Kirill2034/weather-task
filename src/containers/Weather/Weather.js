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

        if (this.state.value) {

            const api_url = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=536ed34d2858d4e397f4175a4e5395a6`)
            const data = await api_url.json()

            const temp = Math.floor(data.main.temp - 273.15)
            this.setState({
                temp,
                humidity: data.main.humidity,
                infoWeather: true,
                errorMessage: false
            })


            if (this.state.temp > 0 && this.state.humidity > 50) {
                this.setState({
                    rainfall: 'Возможны осадки в виде дождя',
                    class: 'fa fa-tint'
                })
            } else {
                this.setState({
                    rainfall: 'Возможны осадки в виде снега',
                    class: 'fa fa-snowflake'
                })
            }

            if (!!data.name) {
                this.setState({
                    city: data.name
                })
            }

        } else {
            this.setState({
                infoWeather: false,
                value: '',
                city: null,
                temp: null,
                humidity: null,
                rainfall: null,
                errorMessage: true
            })
        }
   }, 300)

   getCitiesHandler = debounce(async () => {

        if (this.state.value === '') {

            this.setState({
                listCity: []
            })

        } else {

            const response = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=8yvRrk4W4aaaD4r6R174&app_code=44jQRPjWC1J4gQBmEPYW4w&query=${this.state.value}`)
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
                {this.state.infoWeather 
                ?   <Info
                    city={this.state.city}
                    temp={this.state.temp}
                    humidity={this.state.humidity}
                    rainfall={this.state.rainfall}
                    class={this.state.class}
                    /> 

                : null}
            </div>
        )
    }
}
export default Weather;