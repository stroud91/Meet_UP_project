import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createEvent } from '../../store/events';
import { addEventImage } from '../../store/events';
import "react-datepicker/dist/react-datepicker.css"
import './CreateEventForm.css';

function CreateEventForm() {

    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const groupsData = useSelector(state => state.groups.groups)
    let groupName = '';

    if (groupsData) {
    let group = groupsData.find(group => group.id === Number(groupId));
    groupName = group ? group.name : '';
    }

    let groupsArray = [];
    if (groupsData) {
        groupsArray = Object.values(groupsData);
    }
    const groups = groupsArray.filter(group => user.id === group.organizerId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('')
    const [price, setPrice] = useState('0.00');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [type, setType] = useState('')
    const [prevImg, setPrevImg] = useState('');
    const [renderErr, setRenderErr] = useState(false)
    const [backEndErrors, setBackEndErrors] = useState('')
    const [nameErr, setNameErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');
    const [capacityErr, setCapacityErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [startDateErr, setStartDateErr] = useState('');
    const [endDateErr, setEndDateErr] = useState('');
    const [prevImgErr, setPrevImgErr] = useState('');

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    useEffect(() => {

        if (!name.length) {
            setNameErr('name is required');
        } else if (name.length && name.length < 5) {
            setNameErr('name must be greater than 5 characters')
        } else {
            setNameErr('');
        }
         if (!description.length) {
            setDescriptionErr('description is required')
        } else if (description.length && description.length < 50) {
            setDescriptionErr('description must be at least 50 characters')
        } else {
            setDescriptionErr('')
        }
        if (!capacity) {
            setCapacityErr('capacity must be included')
        } else if (capacity < 2) {
            setCapacityErr('capacity must be at least 2')
        } else {
            setCapacityErr('');
        }
        if (!prevImg.length) {
            setPrevImgErr('image URL is required')
        } else if (prevImg.length && !urlValidation(prevImg)) {
            setPrevImgErr('image URL is invalid')
        } else {
            setPrevImgErr('');
        }
        if (!type.length) {
            setTypeErr('Type must be "Online" or "In person"')
        } else {
            setTypeErr('')
        }
        if (startDate - new Date() < 0) {
            setStartDateErr('This start date has already passed.')
        } else {
            setStartDateErr('')
        }
        if (endDate - startDate < 0) { setEndDateErr('The end date must be after the start date.')
        } else { setEndDateErr('')
        }
        setBackEndErrors('')
    }, [name, description, capacity, price, prevImg, type, startDate, endDate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

    const selectedGroup = groups.find((group) => group.id === parseInt(groupId, 10));

    if (!selectedGroup || selectedGroup.organizerId !== user.id) {
        setBackEndErrors('You are not authorized to create an event for this group.');
        return;
    }

        if ( !nameErr && !descriptionErr && !capacityErr && !prevImgErr && !startDateErr && !endDateErr
        ) {
            const payload = { venueId: 1, name, type, capacity, price, description, startDate, endDate }

            const newEvent = await dispatch(createEvent(payload, groupId))
            const newImage = { url: prevImg, preview: true}

            if (prevImg.length > 0) { await dispatch(addEventImage(newEvent.id, newImage));
            }
            history.push(`/events/${newEvent.id}`);
        }
    }
    return (
        <div className='main'>
            <div className='title'>Create An Event for {groupName}</div>

            <div className='backend-errors'>{backEndErrors}</div>

            <form onSubmit={handleSubmit}>
                <div className='full-form-main-div'>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>What is the name of your event?</div>
                        <div className='full-login-input'>
                            <input
                                className={nameErr ? 'full-input-field error' : 'full-input-field'}
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Event Name'
                            />
                        </div>
                        <div className={nameErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && nameErr.length > 0 && nameErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Event Description</div>
                        <div className='full-login-input'>
                            <textarea
                                className={descriptionErr ? 'full-input-block error' : 'full-input-block'}
                                type='text'
                                maxLength={200}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Please, provide a description of at least 50 characters...'
                            />
                        </div>
                        <div className={descriptionErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && descriptionErr.length > 0 && descriptionErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Is this an in-person or online group?</div>
                        <div className='full-login-input'>
                            <select
                                className={typeErr ? 'full-input-field error' : 'full-input-field'}
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value={' '}>Select Event Type</option>
                                <option value={'In person'}>In person</option>
                                <option value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className={typeErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && typeErr.length > 0 && typeErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Capacity</div>
                        <div className='full-login-input'>
                            <input
                                className={capacityErr ? 'full-input-field error' : 'full-input-field'}
                                type='number'
                                value={capacity}
                                min={2}
                                onChange={(e) => setCapacity(e.target.value)}
                                placeholder='Capacity'
                            />
                        </div>
                        <div className={capacityErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && capacityErr.length > 0 && capacityErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>What is the price for your event?</div>
                        <div className='full-login-input'>
                            <input
                                className='full-input-field'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='0.00'
                            />
                        </div>
                        <div className='full-input-error'></div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>When does your event start?</div>
                        <div className='full-login-input'>
                            <DatePicker
                                className={startDateErr ? 'full-input-date error' : 'full-input-date'}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                timeInputLabel="Event Start Time:"
                                dateFormat='MM/dd/yyyy h:mm aa'
                                showTimeInput
                                placeholder='MM/DD/YYYY, HH/mm AM'
                            />
                        </div>
                        <div className={startDateErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && startDateErr.length > 0 && startDateErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>When does your event end?</div>
                        <div className='full-login-input'>
                            <DatePicker
                                className={endDateErr ? 'full-input-date error' : 'full-input-date'}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                timeInputLabel="Event Start Time:"
                                dateFormat='MM/dd/yyyy h:mm aa'
                                showTimeInput
                                placeholder='MM/DD/YYYY, HH/mm PM'
                            />
                        </div>
                        <div className={endDateErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && endDateErr.length > 0 && endDateErr}
                        </div>
                    </div>
                    <div className='full-input-inner-div'>
                        <div className='full-input-header'>Please add an image url for your event below:</div>
                        <div className='full-login-input'>
                            <input
                                className={prevImgErr ? 'full-input-field error' : 'full-input-field'}
                                type='text'
                                value={prevImg}
                                onChange={(e) => setPrevImg(e.target.value)}
                                placeholder='Image URL'
                            />
                        </div>
                        <div className={prevImgErr ? 'full-input-error error' : 'full-input-error'}>
                            {!!renderErr && prevImgErr.length > 0 && prevImgErr}
                        </div>
                    </div>
                    <div className='full-login-button-div'>
                        <button className='full-login-button' type='submit' disabled={backEndErrors.length}>
                            Create Event
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEventForm;
