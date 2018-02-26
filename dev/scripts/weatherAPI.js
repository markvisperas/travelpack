import React from 'react';


// componentDidMount() {
//     apiCall();
// }


const apiURL = 'http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json';
const apiKey = '61f0a55cb00602dc';

export default WeatherAPI;


//inside componentDidMount
console.log(apiURL)
axios.get(`http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json`, {
    dataType: 'json',
})
    .then((res) => {
        console.log(res);
        this.setState({

        })
    })  

//inside renderdiv
    < form onSubmit = { this.getCity } >
        <label htmlFor="search city">search city</label>
        <input type="text" id="city" />
        <input type="submit" />
    </form>