import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postData } from "./googleApi";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

export default function GooglePlacesApi() {
  //   let map;
  //   let service;
  //   let infowindow;
  const placeName = "London";
  const googleMapRef = useRef();
  let googleMap;
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [nearbySupermarkets, setNearbySupermarkets] = useState([]);

  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDpN7Gjb7CK5DCgSNTkbBU1jaZ5ZBv4xdg&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      createGoogleMap();
    });
  }, []);

  //   const performSearchBy

  const createGoogleMap = (coordinates) => {
    const sydney = new window.google.maps.LatLng(-33.867, 151.195);
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 12,
      center: sydney,
      disableDefaultUI: true,
    });

    // const request = {
    //   query: "Museum of Contemporary Art Australia",
    //   fields: ["name", "geometry", "rating", "place_id"],
    // };

    let service = new window.google.maps.places.PlacesService(googleMap);

    var request = {
      location: sydney,
      radius: "5000",
      type: ["restaurant"],
    };

    var request2 = {
      query: "ChIJq83iXD2uEmsRtTyD_GTbHTA",
      fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request2, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        console.log("results1", results);
      }
    });

    service.textSearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        console.log("results", results);
        setNearbyRestaurants(results);
        googleMap.setCenter(results[0].geometry.location);
      }
    });

    var request1 = {
      location: sydney,
      radius: "5000",
      type: ["supermarket"],
    };

    service.textSearch(request1, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        console.log("results", results);
        setNearbySupermarkets(results);
      }
    });
  };

  const postDataHandler = async () => {
    const resp = await postData();
    console.log(resp);
  };

  return (
    <div>
      <h1>GooglePlacesApi</h1>
      <div
        id="google-map"
        ref={googleMapRef}
        style={{ width: "400px", height: "300px" }}
      />
      <h1>Restaurants</h1>
      {nearbyRestaurants &&
        nearbyRestaurants.map((place) => <div>{place.name}</div>)}
      <h1>Supermarkets</h1>
      {nearbySupermarkets &&
        nearbySupermarkets.map((place) => <div>{place.name}</div>)}
      <button onClick={() => postDataHandler()}>Make Api Call</button>
      {/* <GooglePlacesAutocomplete apiKey="AIzaSyDpN7Gjb7CK5DCgSNTkbBU1jaZ5ZBv4xdg" />  */}
    </div>
  );
}
