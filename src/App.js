import React from 'react';

import { Map, SearchButton, SideBar, DetailsDialog } from 'components';

function App() {
  const [marker, setMarker] = React.useState({
    lat: -22.903388367490805,
    lng: -43.17590397664415,
  })

  const [weatherList, setWeatherList] = React.useState([]);
  const [list, setList] = React.useState(false);
  const [dialog, setDialog] = React.useState({
    open: false,
    props: null
  });

  return (
    <>
      <DetailsDialog 
        dialog={dialog}
        setDialog={setDialog}
      />
      <SideBar 
        open={list}
        setOpen={setList}
        weatherList={weatherList}
        setDialog={setDialog}
        dialog={dialog}
      />
      <Map 
        marker={marker} 
        setMarker={setMarker} 
      />
      <SearchButton 
        {...marker} 
        setWeatherList={setWeatherList} 
        setList={setList}
      />
    </>
  );
}

export default App;
