import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Typography 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    height: '90%'
  },
  endList: {
    height: '10%'
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

function SideBar(props) {
  const classes = useStyles();
  const { open, setOpen, weatherList, setDialog, dialog } = props;

  const toggleDrawer = (closeModal) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(closeModal && open && dialog.props){
      setDialog(_v => ({..._v, open: false, props: null}))
    }
    return setOpen(_v => !_v);
  };

  const handleOpenModal = (city) => {
    if(city.name === dialog.props?.name) return;
    return setDialog(_v => ({..._v, open: true, props: city}))
  }

  return (
    <Drawer onBackdropClick={toggleDrawer(true)} anchor="left" open={open} onClose={toggleDrawer}>
      <div 
        className={classes.list} 
        role="presentation" 
        onClick={toggleDrawer} 
        onKeyDown={toggleDrawer}
      > 
        <div 
          className={classes.header}
        >
          <Typography variant="h4">
            Results
          </Typography>
        </div>
        <Divider />
        <List>
          {weatherList?.map((city, index) => (
            <>
              <ListItem onClick={() => handleOpenModal(city)} button key={index}>
                <ListItemText primary={city.name}/>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
      <div className={classes.endList}>
        
      </div>
    </Drawer>
  )
}

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  weatherList: PropTypes.array
}

export default SideBar;