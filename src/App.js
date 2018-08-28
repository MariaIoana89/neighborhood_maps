import React, { Component } from 'react';
import MyMap from './Components/Map';
import List from './Components/List';
import './App.css';

class App extends Component {
  state = {
  	locations: [],
  	locationInfo: {},
  	query: ''
  }

  // Fetch locations from Forsquare
  componentDidMount() {
    fetch('https://api.foursquare.com/v2/venues/explore?ll=44.26239950000001,28.6187464&client_id=1KSJMZWDGUOZBYIDY3IDQLEFN2HT55TM42QVKGVFAGLG1B40&client_secret=BLPQ4BWFZNCRFONUCD22UVRFR0JYK01CGGDZGWU4F1A3DUQM&v=20180827')
    .then(response => response.json())
    .then(data => {
      const locations = data.response.items.map(item => {
        return {
          position: { lat: item.location.lat, lng: item.location.lng },
          title: item.name,
          id: item.id,
          category: item.categories[0].name,
          address: item.location.address,
          state: item.location.state,
          postalCode: item.location.postalCode
        }
      })
      this.setState({ 
          locations });
    })
    .catch(error => {
      console.log('Foursquare error:', error);
      alert('Not fetching locations from Forsquare. Please try again!');
    })  	
  }

  clickLocation = event => {
  	this.setState({
  		query: event
  	})
  	for (const location of this.state.locations) {
  		if (location.title === event.target) {
  			this.setState({
  				locationInfo: location
  			})
  		}
  	}
  }

clearQuery = () => {
		this.state({
			query: ''
		})
	}

  updateQuery = query => {
  	this.setState({
  		query: query
  	})
  }

  render() {
    return (
    	<div>
	      <List 
	      	locations={this.state.locations}
	      	query={this.state.query}
          clearQuery={this.clearQuery}	      	
	      	updateQuery={b => this.updateQuery(b)}
	      	clickLocation={this.clickLocation}
	      
	      />
	      <MyMap 
	      	locations={this.state.locations}
	      	query={this.state.query}
	      />    		
    	</div>
    );
  }
}

export default App;