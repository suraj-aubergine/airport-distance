import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AirportSearch.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IAirport } from "../../interfaces";

type Props = {
  label: string,
  getAirport: Function,
}

const AirportSearch = (props: Props) => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const response = async () => {
      let data = await axios.get("USAirports.json");
      setAirports(data.data);
    };
    response();
  }, []);

  return (
    <div className="airport-search">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option: IAirport) => option.name + ` (${option.code})`}
        options={airports}
        onChange={(event, newValue) => {
          if (newValue) {
            props.getAirport(newValue);
          }
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={props.label} />
        )}
        style={{ fontSize: "14px" }}
      ></Autocomplete>
    </div>
  );
};

AirportSearch.propTypes = {};

AirportSearch.defaultProps = {};

export default AirportSearch;
