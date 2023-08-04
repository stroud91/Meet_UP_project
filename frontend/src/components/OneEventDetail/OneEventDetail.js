import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getEventDetail, removeEvent } from '../../store/events';
import { getOneGroup } from '../../store/groups';
import { useParams, useHistory, Link } from 'react-router-dom';
import './OneEventDetail.css';

function OneEventDetail() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const eventDetail = useSelector(state => state.events.detail);
  console.log('eventDetail', eventDetail )
  const group = useSelector(state => state.groups.groupDetails);
  console.log("group", group)
  const user = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getEventDetail(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (eventDetail && eventDetail.Group) {
      dispatch(getOneGroup(eventDetail.Group.id))
    }
  }, [dispatch, eventDetail]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const groupId = eventDetail.groupId;
    await dispatch(removeEvent(eventId)).then(() => history.push(`/groups/${groupId}`)); // Redirect to the group page
  }

  let setDate = (date) => {
    let dateStr = new Date(date).toDateString();
    let dateSplit = dateStr.split(' ');
    let returnDate = `${dateSplit[0]}, ${dateSplit[1]}, ${dateSplit[2]}`;
    return returnDate
  }

  let setTime = (time) => {
    let timeStr = new Date(time).toLocaleTimeString();
    let timeSplit = timeStr.split(':');
    let returnTime = `${timeSplit[0]}:${timeSplit[1]} ${timeSplit[2][3]}M`;
    return returnTime
  }

  return (eventDetail && eventDetail.EventImages && group && group.GroupImages &&
    <div className='details-main'>
      <div className='top-div'>
        <div className='event-title'>{eventDetail.name}</div>
        <div className='event-date'>Start Time and Date:{`${setDate(eventDetail.startDate).toUpperCase()} @ ${setTime(eventDetail.startDate)}`}</div>
        <div className='event-date'>End Time and Date:{`${setDate(eventDetail.endDate).toUpperCase()} @ ${setTime(eventDetail.endDate)}`}</div>
        <div className='img'>
          <img className='img' src={eventDetail.EventImages[0].imageURL} alt="event" />
        </div>
        <div className='details-container'>
          <div className='detail-title'>Details</div>
          <div className='event-details'>{eventDetail.description}</div>
          <div className='event-price'>Price: ${eventDetail.price}</div>
          <div className='organizer-name'> The Event Organizer: {group.Organizer?.firstName} {group.Organizer?.lastName}</div>
          <div className='attending'>Attending: {eventDetail.numAttending} Guests</div>
          <div className='capacity'>Capacity: {eventDetail.capacity}</div>
        </div>

        <div className='bottom-div'>
          <Link className='group-container' to={`/groups/${group.id}`}>
            <img className='event-img' src={group.GroupImages[0].imageURL} alt="group"/>
            <div className='group-details'>
              {eventDetail.Group &&
                <>
                  <div className='group-title-1'>{eventDetail.Group.name}</div>
                  <div className='group-private-1'>The Group Membership is : {eventDetail.Group.private ? 'Private' : 'Public'}</div>
                </>
              }
            </div>
          </Link>
        </div>

        <div className='owner-button-conditional'>
          {user && group && user.id === group.organizerId &&
            <button className='general-button' onClick={handleDelete}>Delete Event</button>}
        </div>
      </div>
    </div>
  )
}

export default OneEventDetail;
