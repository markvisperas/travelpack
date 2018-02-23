import React from 'react';

class BaggageList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <input type="checkbox" name="clothing" value="lightClothing"/>
                    <h3>lightweight clothing</h3>
                    <input type="checkbox" name="clothing" value="longShirt"/>
                    <h3>long sleeve shirt</h3>
                    <input type="checkbox" name="clothing" value="tShirt"/>
                    <h3>t-shirt</h3>
                    <input type="checkbox" name="clothing" value="pants"/>
                    <h3>pants</h3>
                    <input type="checkbox" name="clothing" value="belt"/>
                    <h3>belt</h3>
                    <input type="checkbox" name="clothing" value="socks"/>
                    <h3>socks</h3>
                    <input type="checkbox" name="clothing" value="rainJacket"/>
                    <h3>rain jacket</h3>
                    <input type="checkbox" name="clothing" value="underwear"/>
                    <h3>underwear</h3>
                    <input type="checkbox" name="clothing" value="sunglasses"/>
                    <h3>sunglasses</h3>
                    <input type="checkbox" name="clothing" value="hat"/>
                    <h3>hat</h3>
                </ul>
            </div>
        )
    }
}   

export default BaggageList;