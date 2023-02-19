import { InView } from "react-intersection-observer";
import { useState } from "react";

export default function Map({ data }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <InView onChange={(inView) => setShowMap(inView)}>
      {showMap ? (
        <iframe
          title="map"
          className="w-full h-96 lg:h-full"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?width=520&height=400&hl=en&q=${data.latitude}%20${data.longitude}+(Towing%20Minniapolis)&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
        ></iframe>
      ) : (
        <div className="w-full h-full bg-secondary/10"></div>
      )}
    </InView>
  );
}
