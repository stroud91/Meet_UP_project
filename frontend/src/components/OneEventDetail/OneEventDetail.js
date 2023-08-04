import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getEventDetail, removeEvent } from '../../store/events';
import { getOneGroup } from '../../store/groups';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
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

  let priceDisplay = eventDetail.price === 0 ? "FREE" : `$${eventDetail.price}`;

  return (eventDetail && eventDetail.EventImages && group && group.GroupImages &&

    <div className='details-main'>
      <div className='back-button'><NavLink to='/events'><button>Back To Events</button></NavLink></div>
      <div className='event-title'>{eventDetail.name}</div>
        <div className='hosted-by'>Hosted by: {group.Organizer?.firstName} {group.Organizer?.lastName}</div>
      <div className='top-div'>

        <div className='img'>
          <img className='img' src={eventDetail.EventImages[0].imageURL} alt="event" />
        </div>
        <div className='right-side-conteiner'>
        <div className='group-holder '>
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

        <div className='details-container'>
          <div className='detail-title'>Details</div>
          <div className='event-datetime'>
          <i class="fas fa-clock"></i> START: {`${setDate(eventDetail.startDate).toUpperCase()} · ${setTime(eventDetail.startDate)}`}
        </div>
        <div className='event-datetime'>
          <i class="fas fa-clock"></i> END: {`${setDate(eventDetail.endDate).toUpperCase()} · ${setTime(eventDetail.endDate)}`}
        </div>
          <div className='event-price'><i class="fas fa-money-bill-wave"></i> {priceDisplay}</div>
          <div className='event-type'><i class="fas fa-map-pin"></i> {eventDetail.type}</div>
          <div className='owner-button-conditional'>
          {user && group && user.id === group.organizerId &&
            <button className='general-button' onClick={handleDelete}>Delete Event</button>}
          {user && group && user.id === group.organizerId &&
            <button className='general-button'>Update Event</button>}
          </div>
        </div>
      </div>
      </div>
      <div className='bottom-div'>
        <div className='event-description'>
            <h3>Description</h3>
            {eventDetail.description}
        </div>
        </div>
    </div>
  )
}

export default OneEventDetail;
