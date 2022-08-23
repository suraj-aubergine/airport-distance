import React, { FC, useEffect } from "react";
import "./GMapContainer.scss";
import GoogleMapReact from 'google-map-react';

type MarkerProps = {
    lat?: number
    lng?: number
    text?: string
}

interface GMapProps {    
    sourceLat: number | undefined
    sourceLng: number  | undefined
    sourceCode: string  | undefined
    destinationLat: number  | undefined
    destinationLng: number  | undefined
    destinationCode: string  | undefined
}


const Marker = (props: MarkerProps) => {
    return (
        <div>
            <span className="marker">{props.text}</span>
        </div>
    )
};

let GMapContainer: FC<GMapProps> = (props: GMapProps) => {
  const defaultProps = {
    center: {
        lat: 37.8283,
        lng: -95.5795,
    },
    zoom: 3
  };
  
  return (    
    <div style={{ height: '200px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={props.sourceLat}
          lng={props.sourceLng}
          text={props.sourceCode}
        />

        <Marker
          lat={props.destinationLat}
          lng={props.destinationLng}
          text={props.destinationCode}
        />
      </GoogleMapReact>
    </div>
  );
}

export default GMapContainer;