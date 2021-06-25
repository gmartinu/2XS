import React from 'react';
import PropTypes from 'prop-types';

import GoogleMapReact from 'google-map-react';
import { MapMarker } from 'components';
import { googleMapsToken } from 'config';

function Map(props) {
  const { marker, setMarker } = props;

  const [map, setMap] = React.useState({
    draggable: true,
    defaultCenter: {
      lat: -22.903388367490805,
      lng: -43.17590397664415
    },
    defaultZoom: 13
  })

  const onMouseUpDown = (status) => {
    return setMap(_v => ({..._v, draggable: status}))
  }

  const onMouseMove = (_key, _marker, coords) => {
    return setMarker(_v => ({..._v, lat: coords.lat, lng: coords.lng}))
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: googleMapsToken }}
      onChildMouseUp={() => onMouseUpDown(true)}
      onChildMouseDown={() => onMouseUpDown(false)}
      onChildMouseMove={onMouseMove}
      {...map}
    >
      <MapMarker
        {...marker}
      />
    </GoogleMapReact>
  );
}

Map.propTypes = {
  marker: PropTypes.object.isRequired,
  setMarker: PropTypes.func.isRequired
}

export default Map;