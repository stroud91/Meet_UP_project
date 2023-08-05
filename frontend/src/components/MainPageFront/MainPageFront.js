import React from "react";
import { useSelector } from 'react-redux';
import './MainPageFront.css';
import { Link } from 'react-router-dom';

function MainPageFront() {
    const user = useSelector(state => state.session.user);
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className="main-front">
            <div className="background-svgs-front">
            </div>
            <div className="main-top-front">
                <div className="main-header-left-front">
                    <h1 className="h1-front">Friendships are made on Meetup</h1>
                    <p className="meetup-intro-front">Since 2002, members have used Meetup to make new friends, meet like-minded people, spend time on hobbies, and connect with locals over shared interests. Learn how.</p>
                </div>
                <div className="main-header-right-front">
                    <img className="header-right-img-front" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640" alt=""/>
                </div>
            </div>
            <div className="middle-center-front">
                <h2 className="middle-center-h2-front">How Meetup works</h2>
                <p>See who's hosting local events for all the things you love. It is still considered one of the most effective social networking platforms for meeting new people. Meetup hosts events and groups centered around just about anything.</p>
            </div>
            <div className="interaction-center-front">
                <Link className="link-front" to='/groups'>
                    <div className="card-front">
                        <div className="svg-div-front">
                            <img className="svg-front" src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256" alt=""/>
                        </div>
                        <h3 className="title-front">Join a group</h3>
                        <p className="p-front">Do what you love, meet others who love it, find your community. The rest is history!</p>
                    </div>
                </Link>
                <Link className="link-front" to='/events'>
                    <div className="card-front">
                        <div className="svg-div-front">
                            <img className="svg-front" src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256"alt="" />
                        </div>
                        <h3 className="title-front">Find an event</h3>
                        <p className="p-front">Events are happening on just about any topic you can think of, from online gaming and photography to anything.</p>
                    </div>
                </Link>
                {!user ?
                    <Link className='link-front' to='/'>
                        <div className="card-front">
                            <div className="svg-div-front">
                                <img className="svg-front" src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256" alt=""/>
                            </div>
                            <h3 className="title-front" disabled={!sessionUser}>Start a group</h3>
                            <p className="p-front">You do not have to be an expert to gather people together and explore shared interests.</p>
                        </div>
                    </Link>
                    :
                    <Link className='link-front' to='/groups/new'>
                        <div className="card-front">
                            <div className="svg-div-front">
                                <img className="svg-front" src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256"alt="" />
                            </div>
                            <h3 className="title-front">Start a group</h3>
                            <p className="p-front">You do not have to be an expert to gather people together and explore shared interests.</p>
                        </div>
                    </Link>

                }
            </div>
        </div>
    )
}

export default MainPageFront;
