import React, {Component} from 'react'
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps'

import mapStyle from '../constants/mapStyle.json'
import marker from '../img/weddingicon.png'

class Location extends Component {
  constructor (props) {
    super(props)
    this.markers = [{
      position: {
        lat: 51.749571,
        lng: -2.311404
      },
      key: `Eastington Park`,
      defaultAnimation: 2,
      icon: marker
    }]
  }
  render () {
    return (
      <div style={{height: '70vh'}} className='map-container' id='map'>
        <LocationGoogleMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}
          loadingElement={
            <div style={{ height: `100%` }}>
              <p>Loading...</p>
            </div>
          }
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} className='map' />
          }
          scrollwheel={false}
          gestureHandling='cooperative'
          markers={this.markers} />
      </div>
    )
  }
}

const LocationGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={11}
      defaultOptions={{
        scrollwheel: false,
        gestureHandling: 'cooperative',
        styles: mapStyle
      }}
      defaultCenter={{ lat: 51.749571, lng: -2.311404 }}
    >
      {props.markers.map((marker, index) => (
        <Marker
          {...marker}
        />
      ))}
    </GoogleMap>
)))

export default Location
