import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Groups from './components/Groups/Groups'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPageFront from "./components/MainPageFront/MainPageFront";
import Events from "./components/Events/Events";
import OneGroupDetail from "./components/OneGroupDetail/OneGroupDetail";
import OneEventDetail from "./components/OneEventDetail/OneEventDetail";
import Footer from "./components/Footer/Footer";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route exact path='/'>
            <MainPageFront />
          </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path='/events/:eventId'>
          <OneEventDetail />
        </Route>
        <Route path="/groups/:groupId">
          <OneGroupDetail />
        </Route>
        <Route path="/groups">
          <Groups />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
      </Switch>
    )}
    <Footer isLoaded={isLoaded} />
  </>
  );
}

export default App;
