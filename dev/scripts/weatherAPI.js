import React from 'react';


// componentDidMount() {
//     apiCall();
// }

const weatherWidget.apiURL =
    "http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json";

class weatherAPI extends React.Component {

    axios.get(`${apiURL}/weather`, {
        params: {
            key: apiKey
        }
    })
      .then((res) => {
    console.log(res);
    this.setState({
        instructors: res.data.instructors,
        count: res.data.count
    })
});
}

export default WeatherAPI;