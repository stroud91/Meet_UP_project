import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGroups } from '../../store/groups';
import './Groups.css'
import GroupDetail from "../GroupDetail/GroupDetail";


function Groups() {
    const dispatch = useDispatch();
    const groupsData = useSelector(state => state.groups.groups)


    let groupsArray = [];
    if (groupsData) {
        groupsArray = Object.values(groupsData);
    }

    useEffect(() => {
        dispatch(getGroups())
    }, [dispatch,]);

    let renderedGroups;

    if (groupsArray.length > 0) {
        renderedGroups = (
            groupsArray.map(group => (<GroupDetail key={group.id} group={group} />))
        )
    } else {
        renderedGroups = (
            <div className="no-groups-display">
                <img className="no-groups-image" src="https://secure.meetupstatic.com/next/images/home/EmptyGroup.svg?w=384" alt="No groups" />
                <div className="no-groups-text">Argument text here</div>
            </div>)
    }

    return (groupsArray &&
        <div className="group-ensemble">
            <div className="links-container">
                <Link className='groups-link' to='/groups' >Groups</Link>
                <Link className='events-link' to='/events'>Events</Link>
            </div>
            <div className="groups-display">
                {renderedGroups}
            </div>
        </div>
    )
}
export default Groups;
