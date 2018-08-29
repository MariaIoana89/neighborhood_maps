import React from 'react';


function PlaceFilter (props) {
	return (
		<input
			type="text" 
			placeholder="Filter locations"
			value={props.queryValue} 
			onClick={props.clearQuery} 
			onChange={props.onQueryChange} 
			autoFocus 
			tabIndex="1"
			aria-label="Type to filter the locations"
		/>
	)
}

export default PlaceFilter