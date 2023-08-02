import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import meetUpSmall from '../../images/meetup-logo-A0A979F531-seeklogo.com.png'
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className="nav-right">
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className="nav-right">
        <div className="login-signup">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </li>
    );
  }

  return (
    <ul className="nav-container">
      <li className="nav-left">
      <NavLink exact to="/"><img className='small-logo' src={meetUpSmall} /></NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
