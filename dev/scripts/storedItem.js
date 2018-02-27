import React from 'react';

const StoredItem = (props) => {
    return (
        <li>{props.data}
            <button onClick={() => props.remove((props.itemIndex))}>
            </button>
        </li>
    )
}

export default StoredItem;