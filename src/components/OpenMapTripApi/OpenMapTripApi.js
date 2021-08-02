import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OpenMapTripApi() {
  //You should get your API key at https://opentripmap.io
  const apiKey = "";

  const pageLength = 1000; // number of objects per page

  let lon; // place longitude
  let lat; // place latitude

  let offset = 0; // offset from first object in the list
  let count; // total objects count

  const [places, setPlaces] = useState([]);
  const [clickedPlace, setClickedPlace] = useState({});

  function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
      var otmAPI =
        "https://api.opentripmap.com/0.1/en/places/" +
        method +
        "?apikey=" +
        apiKey;
      if (query !== undefined) {
        otmAPI += "&" + query;
      }
      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }

  function firstLoad() {
    apiGet(
      "radius",
      `radius=2000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&kinds=bars%2Cpubs&format=count`
    ).then(function (data) {
      count = data.count;
      offset = 0;
      loadList();
    });
  }

  function loadList() {
    apiGet(
      "radius",
      `radius=2000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&kinds=bars%2Cpubs&format=json`
    ).then(function (data) {
      console.log(data);
      setPlaces(data);
    });
  }

  const showData = (xid) => {
    apiGet("xid/" + xid).then((data) => {
      console.log(data);
      setClickedPlace(data);
    });
  };

  useEffect(() => {
    apiGet("geoname", "name=" + "London").then(function (data) {
      let message = "Name not found";
      if (data.status == "OK") {
        message = data.name + ", " + data.country;
        lon = data.lon;
        lat = data.lat;
        firstLoad();
      }
    });
  }, []);

  return (
    <div>
      <h1>OpenMapTripApi</h1>
      <img
        src={clickedPlace?.preview?.source}
        alt={clickedPlace.name}
        width={clickedPlace?.preview?.width}
        height={clickedPlace?.preview?.height}
      ></img>
      {places.map((place) => (
        <button onClick={() => showData(place.xid)}>{place.name}</button>
      ))}
    </div>
  );
}
