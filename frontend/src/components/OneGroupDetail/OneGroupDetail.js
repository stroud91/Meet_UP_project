import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneGroup, removeGroup } from '../../store/groups';
import { getGroupEvents } from '../../store/events'; // make sure to replace with your actual path
import EventInfo from '../EventInfo/EventInfo'; // replace with your actual path
import './OneGroupDetail.css';

function OneGroupDetail() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [backEndErrors, setBackEndErrors] = useState('');

  const group = useSelector((state) => state.groups.groupDetails);
  const groupEvents = useSelector(state => state.events.groupList);

  const organizer = group ? group.Organizer : null;
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneGroup(groupId));
    if (groupEvents && groupEvents.length > 0) {
      dispatch(getGroupEvents(groupId));
    }
  }, [dispatch, groupId, groupEvents]);

  let sortedGroupEvents = [];
  if (groupEvents) {
    sortedGroupEvents = groupEvents
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .filter(event => new Date(event.startDate) >= new Date());
  }

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/groups/${groupId}/edit`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeGroup(groupId));
    history.push('/groups');
  };

  const handleEvent = (e) => {
    e.preventDefault();
    history.push(`/groups/${groupId}/events/new`);
  };

  if (!group) {
    return null;
  }

  let buttons;
  if (sessionUser && sessionUser.id === group.organizerId) {
    buttons = (
      <div className='group-buttons-conditional'>
        <button className='general-button' onClick={handleEdit}>Edit</button>
        <button className='general-button' onClick={handleDelete}>Delete</button>
        <button className='general-button' onClick={handleEvent}>Create An Event</button>
      </div>
    );
  } else {
    buttons = null;
  }

  return (
    <div className='details-main-view'>
      <div className='details-inner-div'>
        <div className='backend-server-errors'>{backEndErrors}</div>
        <div className='topsection-div'>
             <button></button>
          <h1 className='detail-title'>{group.name}</h1>
          <h3 className='organizer-part'>
            Organized by: {organizer?.firstName} {organizer?.lastName}
          </h3>
        </div>
        <div className='group-events'>
          <h2>Events ({sortedGroupEvents.length || 0})</h2>
        { sortedGroupEvents.length > 0 ? sortedGroupEvents.map(event => (
         <EventInfo key={event.id} event={event} />
          )) : <p>No events found for this group.</p>}
         </div>
        <div className='bottomsection-div'>
          <div className='group-section'>
            <div className='group-image'>
            {group?.GroupImages?.map((image) =>
                                <img key={image.id} className='group-img' src={image.imageURL} alt=''></img>
                            )}
            </div>
            <div className='group-info'>
              <h3 className='h3'>About</h3>
              <div className='group-about'>{group.about}</div>
            </div>
          </div>
        </div>
        <div className='buttons'>{buttons}</div>
      </div>
    </div>
  );
}

export default OneGroupDetail;
