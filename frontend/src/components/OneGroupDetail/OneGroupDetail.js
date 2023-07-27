import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneGroup, removeGroup } from '../../store/groups';
import './OneGroupDetail.css';

function OneGroupDetail() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [backEndErrors, setBackEndErrors] = useState('');

  const group = useSelector((state) => state.groups.groupDetails);
  const organizer = group ? group.Organizer : null;
  console.log('this is organizer' ,organizer)
  const sessionUser = useSelector((state) => state.session.user);
  console.log( "this is session user", sessionUser)
  console.log("this is group", group)
  useEffect(() => {
    dispatch(getOneGroup(groupId))
      .catch(async (res) => {
        const data = await res.json();
        console.log("this is data", data)
        if (data && data.message) {
          setBackEndErrors(data.message);
        }
      });
  }, [dispatch, groupId]);

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
