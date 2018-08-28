import React from 'react';
import PlaceFilter from './PlaceFilter';
import escregexp from 'escape-string-regexp';

function List(props) {
const trimQuery = new RegExp(escregexp(props.query).toLowerCase().trim())

	return (
		<ul className='list'>
			<PlaceFilter className='search'
				queryValue={props.query}
				clearQuery={props.clearQuery}
				updateQuery={props.updateQuery} 
			/>
			{
                props.locations.filter(location => {
				return trimQuery.test(location.title.toLowerCase())
			})
			.map(location => {
				return (
					<li
						key={location.title}
						onClick={props.clickLocation}
						tabIndex="2"
					>
						{location.title}
					</li>
				)
			})}
		</ul>		
	)
}

export default List