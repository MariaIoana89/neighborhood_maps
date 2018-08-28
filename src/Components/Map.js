import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import escregexp from 'escape-string-regexp';


class MyMap extends Component {
	
	state = {
	  activeMarker: {},
	  selectedLocation: {},
	  displayInfoWindow: false
	}	

	onMarkerClick = (props, marker, e) => {
	  this.setState({
	    activeMarker: marker,
	    selectedLocation: props,
	    displayInfoWindow: true
	  })
	}

	render() {

		const bound = new this.props.google.maps.LatLngBounds()
		const expression = new RegExp(escregexp(this.props.query).toLowerCase().trim())

	    for (let i = 0; i < this.props.locations.length; i++) {
      		bound.extend(this.props.locations[i].position)
    	}

		return (
			<Map
				google={this.google} 
				initialCenter={{lat:44.26239950000001, lng:28.6187464}} 
				zoom={13} 
				bounds={bound}				
			>

				{
					this.props.locations.filter(location => {
						return expression.test(location.title.toLowerCase())
					})
					.map(location => {
						return (
							<Marker 
								key={location.id} 
								position={{ lat: location.position.lat, lng: location.position.lng}} 
								title={location.title} 
								animation={this.google.maps.Animation.BOUNCE}
				                category={location.category}
				                address={location.address}
				                state={location.state}
				                postalCode={location.postalCode}
                        onClick={this.onMarkerClick}
							/>
						)
					})
				}

				<InfoWindow 
				marker={this.state.selectedMaker} 
				visible={this.state.selectedMarkerInfoWindow}>
					<div>
					    <h2>{this.state.selectedPlace.title}</h2>
					    <h3>{this.state.selectedPlace.category}</h3>
					    <p>Address: {this.state.selectedPlace.address}</p>				    
					    <p>Postal Code: {this.state.selectedPlace.postalCode}</p>
				    </div>
				</InfoWindow>

			</Map>
		)
	}
}


export default GoogleApiWrapper({
	apiKey: 'AIzaSyAjzYNXjVTALv4l2UqX6UQJYSuX_wZ0cQ8'
})(MyMap)

/*http://maps.googleapis.com/maps/api/geocode/json?address=Mamaia,Constanta&language=en&KEY=AIzaSyAjzYNXjVTALv4l2UqX6UQJYSuX_wZ0cQ8
https://api.foursquare.com/v2/venues/explore?ll=44.26239950000001,28.6187464&client_id=1KSJMZWDGUOZBYIDY3IDQLEFN2HT55TM42QVKGVFAGLG1B40&client_secret=BLPQ4BWFZNCRFONUCD22UVRFR0JYK01CGGDZGWU4F1A3DUQM&v=20180827*/