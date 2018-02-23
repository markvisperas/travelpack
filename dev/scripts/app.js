import React from 'react';
import ReactDOM from 'react-dom';
import BaggageList from './baggageList';
import axios from 'axios';

// const apiURL = 'http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/Ontario/Toronto.json';
// const apiKey = 'fbd50f50cbebf38b';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        items: ["sweater", "lotion", "sunglasses", "walking shoes", "belt", "sandals"],
        item: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.packItems = this.packItems.bind(this);
    }
    handleChange(e) {
      console.log(e.target.value)
      this.setState({
        item: e.target.value
      })
    }
    packItems(e) {
      e.preventDefault();
      const itemState = Array.from(this.state.items);
      itemState.push(this.state.item);
      this.setState({
        items: itemState
      });
    }

    // getCity(e) {
    //   e.preventDefault();
    // }

    render() {
      return (
        <div>
          <header>
            <h1>Travel Pack</h1>
          </header>
          <form onSubmit={this.packItems}>
            <input type="text" name="pack" value={this.state.item} onChange={this.handleChange}/>
            <button>pack items</button>
          </form>
          {/* <BaggageList /> */}
          <ul>
            {this.state.items.map((item,i) => {
              return <li key={`item-${i}`}>{item}</li>
            })}
          </ul>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));