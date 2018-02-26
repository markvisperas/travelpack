import React from 'react';
import ReactDOM from 'react-dom';
import BaggageList from './baggageList';
import axios from 'axios';

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
        items: ["sweater", "sun tan lotion", "sunglasses", "walking shoes", "belt", "sandals", "passport", "foreign currency", "bug spray", "hat", "power charger"],
        coldItems: ["winter coat", "sweater", "longjohns", "scarff"],
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
    }
    handleChange(e) {
      console.log(e.target.value)
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
      console.log('hello');
      document.getElementById('list-container').classList.remove('hidden');
      this.getWeather();
    }

    removeItem(index) {
      const itemState = Array.from(this.state.items);
      itemState.splice(index,1);
      this.setState({
        items: itemState
      })
    }

    movetoBag(itemIndex){
      const packedItem = Array.from(this.state.bagged);
      const selectItem = item[itemIndex];
      packedItem.push(selectItem);
      this.setState({
        bagged: packedItem,
      })
    }
    render() {
      return (
        <div>
          <div className="destination-container">
            <div className="logo">
            </div>
            <h1>
              Ontario Adventures
            </h1>
            <h2>Packing App</h2>
            <form onSubmit={this.getWeather}>
              <input type="text" name="destination" value={this.state.destination} id="destination" onChange={this.handleChange}/>
              <button type="submit" onClick={this.handleSubmit}>let's go</button>
            </form>
          </div>
          <div className="list-container hidden" id="list-container">
            <main>
              <ul className = "items" id="hotItems">
                {this.state.items.map((item, i) => {
                  return <StoredItem data={item} key={`item-${i}`} remove={this.removeItem} itemIndex={i} />
                })}
              </ul>
              { this.state.temperature > 1 
              ? 
              <ul className= "coldItems" id="coldItems">
                {this.state.coldItems.map((item, i) => {
                  return <StoredItem data={item} key={`item-${i}`} remove={this.removeItem} itemIndex={i} />
                })}
              </ul>
              :
              null
              }
              <form onSubmit={this.packItems}>
                <button>add item</button>
                <input type="text" name="pack" value={this.state.item} id="item" onChange={this.handleChange} />
              </form>
            </main>
            <aside className="weatherWidget">
                <div> 
                  <h1>{this.state.location}</h1>
                  <img src={this.state.icon} alt=""/>
                  <h1>{this.state.weatherString}</h1>
                  <h1>{this.state.uv}</h1>  
                  <h1>{this.state.temperature} c</h1>
                </div>
                <div>

                </div>
            </aside>
          </div>
        </div>
      )
    }
}

const StoredItem = (props) => {
  return (
    <li>{props.data} <button onClick={() => props.remove((props.itemIndex))}>✔️</button></li>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));