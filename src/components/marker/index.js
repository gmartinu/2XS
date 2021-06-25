import PropTypes from 'prop-types';

import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core';

const MarkerIcon = withStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    left: -24,
    top: -36,
    fontSize: 48,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark
    }
  }
}))(RoomIcon);

export default function Marker(props){
  return ( 
    <MarkerIcon lat={props.lat} lng={props.lng}/>
  )
}

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}