import React,{useEffect}from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getGroupEvents } from '../../store/events';
import { Link } from 'react-router-dom';
import './GroupDetail.css'

function GroupDetail({ group}) {

    const dispatch = useDispatch();
    const groupEvents = useSelector(state => state.events.groupList);

    useEffect(() => {
        dispatch(getGroupEvents(group.id));
      }, [dispatch, group.id]);

    return (
        <Link className='link-to-group' to={`/groups/${group.id}`}>
            <div className='main-group-listing'>
                <div className='listing-image'>
                    <img className='img' src={group.previewImage} alt={group.name} />
                </div>
                <div className='group-details'>
                    <div className='group-name'>{group.name}</div>
                    <div className='group-location'>
                        {group.city}, {group.state}
                    </div>
                    <div className='group-about'>
                        <div className='group-title'>Group Description:</div>
                        <div className='about-text'>{group.about}</div>
                    </div>
                    <div className='group-members'>
                    <div className='numMembers'>Members: {group.numMembers}</div>
                    <div className='event-infos'>
                    {groupEvents?.length} Events  · {group.private ? 'Private' : 'Public'} Group
                    </div>
                </div>
                </div>
            </div>
        </Link>
    )
}

export default GroupDetail;
