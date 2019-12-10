import React from 'react'
import '../Form/Form.module.css'

class Form extends React.Component {

    // getCitysHandler = async () => {
    //     const input = document.getElementById('input')

    //     const response = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=8yvRrk4W4aaaD4r6R174&app_code=44jQRPjWC1J4gQBmEPYW4w&query=${input.value}`)
    //     const data = await response.json();

    //     const listCity = data.suggestions.map((suggestion) => {
    //         return suggestion.address.city
    //     })
        
    //     console.log(listCity) 
    // }
    

    render() {
        return (
            <form onSubmit={(event) => event.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Город" 
                  value={this.props.value} 
                  onChange={this.props.onChange} 
                />

                <button 
                  onClick={this.props.onClick}>
                    Получить погоду
                </button>
            </form>
        )
    }
}
export default Form;