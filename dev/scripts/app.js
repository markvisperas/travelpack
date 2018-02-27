import React from 'react';
import ReactDOM from 'react-dom';
import BaggageList from './baggageList';
import axios from 'axios';
import StoredItem from './storedItem';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyANC4hBsaPB1nKYqfo3AgksEVKsHY_bqNE",
  authDomain: "project5-683f1.firebaseapp.com",
  databaseURL: "https://project5-683f1.firebaseio.com",
  projectId: "project5-683f1",
  storageBucket: "",
  messagingSenderId: "361719058852"
};
firebase.initializeApp(config);

const apiURL = 'http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        items: ["tent", "pillows", "air mattress", "knife", "trekking poles", "lanterns", "folding chair", "frying pan", "maps", "hat", "bugspray"],
        coldItems: ["winter coat", "extra blankets", "longjohns", "scarff"],
        item: "",
        bagged: [],
        location: "",
        date: "",
        destination: "",
        icon: "",
        weatherString: "",
        temperature: "",
        uv: "",
        precipitation: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.packItems = this.packItems.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.getWeather = this.getWeather.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.movetoBag = this.movetoBag.bind(this);
      this.removeColdItem = this.removeColdItem.bind(this);
    }
    handleChange(e) {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
    packItems(e) {
      e.preventDefault();
      const itemState = Array.from(this.state.items);
      itemState.push(this.state.item);
      this.setState({
        items: itemState,
        item: ""
      });

    const dbRef=firebase.database().ref();
    dbRef.push('hello');
    }

  getWeather() {
    // e.preventDefault();
    console.log(this.state.destination);
    axios.get(`http://api.wunderground.com/api/fbd50f50cbebf38b/conditions/q/Ontario/${this.state.destination}.json`, {
      params: {
        dataType: 'json'
      }
    })
      .then((res) => {
        this.setState({
          location: res.data.current_observation.display_location.city,
          weatherString: res.data.current_observation.weather,
          uv: res.data.current_observation.UV,
          temperature: res.data.current_observation.temp_c,
          icon: res.data.current_observation.icon_url,
        })
        console.log(res);
      })
    }

    handleSubmit(e){
      e.preventDefault();
      document.getElementById('list-container').classList.remove('hidden');
      this.getWeather();
    }

    removeColdItem(index) {
      const itemState = Array.from(this.state.coldItems);
      const removedItem = itemState.splice(index, 1)

      this.setState({
        coldItems: itemState
      })
      this.movetoBag(removedItem[0]);
    }

    removeItem(index) {
      const itemState = Array.from(this.state.items); 
      const removedItem = itemState.splice(index, 1)

      this.setState({
        items: itemState
      })

      this.movetoBag(removedItem[0]);
    }

    movetoBag(itemIndex){
      const packedItem = Array.from(this.state.bagged);
      packedItem.push(itemIndex);
      this.setState({
        bagged: packedItem,
      })
    }
    render() {
      return (
        <div>
          <div className="destination-container">
            <h1>
              <div className="logo">
              </div>
              PACK-IT
            </h1>
            <h2>Ontario Adventures Pack List</h2>
            <form onSubmit={this.getWeather}>
              <input type="text" name="destination" value={this.state.destination} id="destination" placeholder="which Ontario city?" onChange={this.handleChange}/>
              <button type="submit" onClick={this.handleSubmit}>let's go</button>
            </form>
          </div>
          <div className="list-container hidden" id="list-container">
            <aside className="weatherWidget">
              <div class="weather-container">
                <h2>{this.state.location}</h2>
                <img src={this.state.icon} alt="" />
                <h2>{this.state.weatherString}</h2>
                <h2>{this.state.uv} uv</h2>
                <h2>{this.state.temperature} c</h2>
              </div>
            </aside>
            <div className="wrapper">
              <main>
                <div className="list-wrapper">
                  <h2>To be Packed</h2>
                  <ul className = "items" id="hotItems">
                    {this.state.items.map((item, i) => {
                      return <StoredItem data={item} key={`item-${i}`} remove={this.removeItem} itemIndex={i} />
                    })}
                  </ul>
                  { this.state.temperature < 5
                  ? 
                  <ul className= "coldItems" id="coldItems">
                    {this.state.coldItems.map((item, i) => {
                      return <StoredItem data={item} key={`item-${i}`} remove={this.removeColdItem} itemIndex={i} />
                    })}
                  </ul>
                  :
                  null
                  }
                </div>
                <form onSubmit={this.packItems}>
                  <button type="submit" id="addItem">add item</button>
                  <input type="text" name="pack" value={this.state.item} id="item" onChange={this.handleChange} />
                </form>
              </main>
              <div className="backpack">
                <h2>Packed</h2>
                <ul className="bagged" id="hotItems">
                  {this.state.bagged.map((item, i) => {
                    return <li key={i}>{item}</li>
                  })}
                </ul>
              </div>
            </div>{/* to close wrapper */}
          </div>{/* to close list-container */}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));