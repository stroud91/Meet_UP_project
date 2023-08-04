import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <Link className="create-group" to="/groups/new">Create A Group</Link>
      <button onClick={openMenu}>
      <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li> Hello, {user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li><Link to="/groups" class="view-groups-button">View Groups</Link></li>
        <li><Link to="/events" class="view-events-button">View Events</Link></li>
        <li>
          <button onClick={logout} class="logout-button">Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
