import React, { useState } from "react";
import axios from "axios";
import "./UserInput.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import AirportSearch from "../AirportSearch/AirportSearch";
import DisplayResult from "../DisplayResult/DisplayResult";
import { IAirport } from "../../interfaces";
import GMapContainer from "../GMapContainer/GMapContainer";

let defaultAirport: IAirport = {
  code: "",
  name: "",
  lat: 0,
  lon:1
}
const UserInput = () => {
  const APIkey = "26431be05amsh229fc53d45d9d6ep136d24jsn9eacc0ac3788";
  const [source, setSource] = useState(defaultAirport);
  const [destination, setDestination] = useState(defaultAirport);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);
  const [isSame, setIsSame] = useState(false);
  let calculateDistance = () => {
    setLoading(true);
    axios
      .get(
        `https://aerodatabox.p.rapidapi.com/airports/iata/${source.code}/distance-time/${destination.code}`,
        {
          headers: {
            "X-RapidAPI-Key": APIkey,
            "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
          },
        },
      )
      .then(function (response) {
        setDistance(response.data.greatCircleDistance.nm);
        setLoading(false);
        if(source.code!=="" && destination.code!==""){
          setIsSame(source.code===destination.code);
        }        
        setDisplayMap(true);
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
      });
  };

  let setSourceAirportCode = (airport:IAirport) => {
    setSource({code:airport.code, name:airport.name, lat: airport.lat, lon: airport.lon});
  };

  let setDestinationAirportCode = (airport: IAirport) => {
    setDestination({ code: airport.code, name: airport.name, lat: airport.lat, lon: airport.lon });
  };

  return (
    <div className="airport-search-container">
      <div className="user-input">
        <div className="airport-select source-select">
          <AirportSearch label={"Source Airport"}
            getAirport={(airport: IAirport) => {
              setSourceAirportCode(airport);
            }}
          ></AirportSearch>
        </div>
        <div className="airport-select destination-select">
          <AirportSearch label={"Destination Airport"}
            getAirport={(airport: IAirport) => {
              setDestinationAirportCode(airport);
            }}
          ></AirportSearch>
        </div>

        <LoadingButton
          size="small"
          onClick={calculateDistance}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Calculate Distance
        </LoadingButton>
      </div>
{isSame?
      <p>Please select different Airports.</p>:
      <DisplayResult
        source={source}
        destination={destination}
        distance={distance}
      ></DisplayResult>
}


<div className={displayMap?'map-container':'no-map'}>
    <GMapContainer 
      sourceLat={source.lat} 
      sourceLng={source.lon} 
      sourceCode={source.code}
      destinationLat={destination.lat} 
      destinationLng={destination.lon} 
      destinationCode={destination.code}
    />
    </div>
    </div>
  );
};

export default UserInput;
