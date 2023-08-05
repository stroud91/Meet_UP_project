import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvents } from '../../store/events';
import EventInfo from '../EventInfo/EventInfo';

import './Events.css'


const Events = () => {
  const dispatch = useDispatch();

  const eventsObj = useSelector(state => state.events.list);
  const events = Object.values(eventsObj);

  const upcomingEvents = events.filter(event => new Date(event.startDate) >= new Date());
  const sortedEvents = upcomingEvents.sort((eventA, eventB) => new Date(eventA.startDate) - new Date(eventB.startDate));

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  let eventsList;
  if (sortedEvents.length > 0) {
    eventsList = sortedEvents.map(event => <EventInfo key={event.id} event={event} />);

  } else {
    eventsList = (
      <>
        <div className='eventsList-main'>There are currently no upcoming Events!</div>
        <Link to={'/events/new'} className='create-events-button-with-link'>Start an Event!</Link>
      </>
    )
  }

  return (
    <div className='general-main'>

         <div className='links-container'>
            <Link className='events-link' to={'/events'}>Events</Link>
            <Link className='groups-link' to={'/groups'}>Groups</Link>
         </div>
      <h1>Events in Meetup</h1>
      <div className='groupList'>
        {eventsList}
      </div>
    </div>
  );
};

export default Events;
