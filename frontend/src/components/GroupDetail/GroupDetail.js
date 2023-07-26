import React from 'react';
import { Link } from 'react-router-dom';
import './GroupDetail.css'

function GroupDetail({ group: { id, previewImage, name, city, state, about, numMembers, isPrivate } }) {
    return (
        <Link className='link-to-group' to={`/groups/${id}`}>
            <div className='main-group-listing'>
                <div className='listing-image'>
                    <img className='img' src={previewImage} alt={name} />
                </div>
                <div className='group-details'>
                    <div className='group-name'>{name}</div>
                    <div className='group-location'>
                        {city}, {state}
                    </div>
                    <div className='group-about'>
                        <div className='group-title'>Group Description:</div>
                        <div className='about-text'>{about}</div>
                    </div>
                    <div className='group-members'>
                        <div className='numMembers'>Members: {numMembers}</div>
                        <div className='private'>
                            {isPrivate ? 'Private' : 'Public'} Group
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GroupDetail;
