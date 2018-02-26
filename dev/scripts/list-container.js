import React from 'react';
import ReactDOM from 'react-dom';

class ListContainer extends React.Component{
    render() {
        return(
            <h3>The weather</h3>
        // <div className="list-container">
        //     <ul>
        //         {this.state.items.map((item, i) => {
        //             return <StoredItem data={item} key={`item-${i}`} remove={this.removeItem} itemIndex={i} />
        //         })}
        //     </ul>
        //     <form onSubmit={this.packItems}>
        //         <input type="text" name="pack" value={this.state.item} id="item" onChange={this.handleChange} />
        //         <button>pack items</button>
        //     </form>
        // </div>            
        )
    }
}


export default ListContainer;