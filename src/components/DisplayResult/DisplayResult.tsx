import React from "react";
import "./DisplayResult.scss";
import {IAirport} from "../../interfaces";


type Props = {
  distance: number
  source: IAirport
  destination: IAirport
}

const DisplayResult = (props: Props) => {
  return (
    <div className="display-result">
      {props.source.code && props.destination.code && (props.distance && props.distance!==0)? (
        <div className="distance">
          <p>The distance between <strong>{props.source.name}</strong> and{" "}
          <strong>{props.destination.name}</strong> is{" "} </p>
          <div className="distance-text">{props.distance}</div>{" "}
          <p><em>nautical miles</em></p>
        </div>
      ) : (
        <img src="/airplane-logo.svg" alt="logo" />
      )}
    </div>
  );
};

export default DisplayResult;
