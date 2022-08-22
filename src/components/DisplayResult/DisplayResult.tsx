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
      {props.distance ? (
        <div className="distance">
          The distance between <strong>{props.source.name}</strong> and{" "}
          <strong>{props.destination.name}</strong> is{" "}
          <div className="distance-text">{props.distance}</div>{" "}
          <em>nautical miles</em>
        </div>
      ) : (
        <img src="/airplane-logo.svg" alt="logo" />
      )}
    </div>
  );
};

export default DisplayResult;
