import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { Fab, CircularProgress, Typography } from '@material-ui/core';
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
  const [error, setError] = React.useState(false);

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
      }
    }).catch(() => {
      setLoading(false)
      setError(true)
    })
  };

  return (
    <>
      <Fab disabled={loading} onClick={handleSearch} color="primary" variant="extended" className={classes.fab}>
        {loading ? 
          <CircularProgress color='inherit' size={25} /> 
          : 
          <Search className={classes.extendedIcon} />
        }
        Search
      </Fab>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        title="An error occurred! Sorry :("
        onlyBtn
      >
        <Typography variant='body1'>
          Weather API did not find any results on this area!
          <br />
          Try to move the marker to a populated area.
        </Typography>
      </Dialog>
    </>
  )
}

SearchButton.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  setWeatherList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired
}

export default SearchButton;