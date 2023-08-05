import React from 'react';
import { Link } from 'react-router-dom';
import './EventInfo.css';

function EventInfo({ event }) {
    const processDate = (date) => {
        let dateStr = new Date(date).toDateString();
        let dateArray = dateStr = dateStr.split(' ');
        let newDate = `${dateArray[0]}, ${dateArray[1]}, ${dateArray[2]}`;
        return newDate;
    }

    const processTime = (time) => {
        let timeStr = new Date(time).toLocaleTimeString();
        let timeArray = timeStr.split(':');
        let newTime = `${timeArray[0]}:${timeArray[1]} ${timeArray[2][3]}M`;
        return newTime;
    }

    return (
        <Link className='detail-link' to={`/events/${event.id}`}>
          <div className='event-listing'>
            <div className='listing-image-container'>
              <img className='listing-img' src={event.previewImage} alt={event.name} />
            </div>
            <div className='event-info'>
              <div className='event-date'>{`${processDate(event.startDate).toUpperCase()} · ${processTime(event.startDate)}`}</div>
              <div className='event-title'>Event: {event.name}</div>
              <div className='event-location'>Location: {event.Venue.city} , {event.Venue.state}</div>
              <div className='event-description'>{event.description}</div>
              <div className='event-group-organizer'>
                <span className='event-organizer'>Organizer:</span>
                <span className='event-group'>Group: {event.Group.name}</span>
              </div>
            </div>
            <div className="event-info-separator"></div>
          </div>
        </Link >
      )
}

export default EventInfo;
