import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import FullCalendarDemo from "./components/FullCalendar/FullCalendarDemo";
import AppShell from "./components/AppShell/AppShell";
import GooglePlacesApi from "./components/GooglePlacesApi/GooglePlacesApi";
import OpenMapTripApi from "./components/OpenMapTripApi/OpenMapTripApi";

export default function App() {
  return (
    <Router>
      <AppShell>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/googleplacesapi">
            <GooglePlacesApi />
          </Route>
          <Route path="/fullcalendar">
            <FullCalendarDemo />
          </Route>
          <Route path="/openmaptripapi">
            <OpenMapTripApi />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppShell>
    </Router>
  );
}
