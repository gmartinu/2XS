import React from 'react';
import PropTypes from 'prop-types';

import { Fab, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from "@material-ui/icons";
import { WeatherAPI } from 'data';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    /**
     * Moving the button to center using only absolute 
     * settings without setting any container for flex
     */
    right: '50%',
    transform: "translate(50%)"
  },
}));


function SearchButton(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleSearch = (e) => {
    // Calling stopPropagation only for precaution pourpose 
    e.stopPropagation();

    setLoading(true)
    
    const { lat, lng, setWeatherList, setList } = props;

    WeatherAPI.find(lat, lng).then(res => {
      setLoading(false)
      if(res.data.cod === "200"){
        setWeatherList(res.data.list);
        setList(true);
      }else{
        alert("Error in the Weather API response.");
      }
    }).catch(() => {
      setLoading(false)
      alert("No results found in this region.")
    })
  };

  return (
    <Fab disabled={loading} onClick={handleSearch} color="primary" variant="extended" className={classes.fab}>
      {loading ? 
        <CircularProgress color='inherit' size={25} /> 
        : 
        <Search className={classes.extendedIcon} />
      }
      Search
    </Fab>
  )
}

SearchButton.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  setWeatherList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired
}

export default SearchButton;