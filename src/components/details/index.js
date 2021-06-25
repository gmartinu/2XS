import PropTypes from 'prop-types'

import { Dialog } from 'components'
import { makeStyles, Typography, withStyles, Box, useTheme, useMediaQuery } from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Navigation } from '@material-ui/icons';
import { blue, red } from '@material-ui/core/colors';

const ArrowUpward = withStyles({
  root:{ 
    color: red[500]
  }
})(ArrowUpwardIcon);

const ArrowDownward = withStyles({
  root:{ 
    color: blue[500]
  }
})(ArrowDownwardIcon);

const useStyles = makeStyles(theme => ({
  flex:{
    display: 'flex'
  },
  temp_margin: {
    marginRight: theme.spacing(2)
  },
  text_center: {
    display: 'flex',
    alignContent: "center"
  },
  min_max_center: {
    display: 'flex',
    alignItems: 'center',
  },
  mdi:{
    fontSize: 20
  }
}))

function DetailsDialog(props) {
  const classes = useStyles();
  const { dialog, setDialog } = props;
  const { open, props: city } = dialog;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const K2C = (temp, noC) => `${(Number(temp) - 273.15).toFixed(1)}${noC ? '' : '°C'}`

  return (
    <Dialog
      onClose={() => 
        setDialog(_v => (
          {
            ..._v, 
            open: false,
          }))
      }
      title={`${city?.name} - Current Weather`}
      open={open}
    >
      {city ? 
        <div>
          <Box display={isMobile ? "block": "flex"}>
            <Typography className={classes.temp_margin} variant='h5'>
              Temperature: {K2C(city.main.temp)}
            </Typography>
            <Box display="flex">
              <Typography className={classes.min_max_center} variant='h6'>
                <ArrowDownward /> {K2C(city.main.temp_min)} &nbsp;
              </Typography>
              <Typography className={classes.min_max_center} variant='h6'>
                <ArrowUpward/> {K2C(city.main.temp_max)}
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle2">
            Feels Like {K2C(city.main.feels_like)} with {city.weather[0].description}.
          </Typography>
          <Box display={isMobile ? "block": "flex"} alignContent="center" >
            <Typography className={[classes.temp_margin, classes.text_center]} variant="body2">
              {/* Using Inline Style only because of to "animate" the wind direction */}
              Wind speed: &nbsp;
              <Navigation 
                className={classes.mdi} 
                style={{transform: `rotate(${city.wind.deg}deg)`}} 
              />
              {city.wind.speed}m/s
            </Typography>
            <Typography variant="body2">
              Pressure: &nbsp; 
              {city.main.pressure}hPa
            </Typography>
          </Box>
          <Box display={isMobile ? "block": "flex"} alignContent="center">
            <Typography className={classes.temp_margin} variant="body2">
              Humidity: &nbsp; 
              {city.main.humidity}% 
            </Typography>
            <Typography variant="body2">
              Dew point: &nbsp;
              {((K2C(city.main.temp, true) - ((100 - city.main.humidity)/5))).toFixed(1)}°C 
            </Typography>
          </Box>
        </div>
      : null}
    </Dialog>
  )
}

DetailsDialog.propTypes = {
  dialog: PropTypes.array.isRequired,
  setDialog: PropTypes.func.isRequired
}

export default DetailsDialog;