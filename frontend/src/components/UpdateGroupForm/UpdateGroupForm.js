import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editGroup, getOneGroup, addImageToGroup } from '../../store/groups';

import './UpdateGroupForm.css'

function UpdateGroupForm({ groups }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const group = useSelector(state => state.groups.groups);
    const [name, setName] = useState(group?.name || '');
    const [about, setAbout] = useState(group?.about || '');
    const [type, setType] = useState(group?.type || '');
    const [groupPrivate, setGroupPrivate] = useState(group?.private || '');
    const [city, setCity] = useState(group?.city || '');
    const [state, setState] = useState(group?.state || '');
    const [prevImg, setPrevImg] = useState(group?.GroupImages?.[0]?.url || '');
    const [backEndErrors, setBackEndErrors] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [aboutErr, setAboutErr] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [stateErr, setStateErr] = useState('');
    const [urlErr, setUrlErr] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [privateErr, setPrivateErr] = useState('');
    const [renderErr, setRenderErr] = useState(false);

    const urlValidation = str => {
        return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
    }

    if(!sessionUser){history.push(`/`)}

    useEffect(() => {
        dispatch(getOneGroup(groupId))
    }, [dispatch, groupId]);

    useEffect(() => {
        if (!name.length) { setNameErr('Name is required');
           } else if (name.length > 60) {  setNameErr('Name must be 60 characters or less')
           } else { setNameErr('')
         }
         if (!about.length || about.length && about.length < 50) {
             setAboutErr('About must be 50 characters or more')
         } else { setAboutErr('')
         }
         if (!city.length) { setCityErr('City is required')
         } else { setCityErr('')
         }
         if (!state.length) { setStateErr('State is required')
         } else { setStateErr('')
         }
         if (!type.length) { setTypeErr('Type must be "Online" or "In person"')
         } else { setTypeErr('')
         }
         if (!groupPrivate.length) { setPrivateErr('Access must be Public or Private')
         } else { setPrivateErr('')
         }
         if (!prevImg.length) { setUrlErr('image URL is required')
         } else if (prevImg.length && !urlValidation(prevImg)) {
             setUrlErr('invalid image URL')
         } else { setUrlErr('')
         }
         setBackEndErrors('')
     }, [name, about, city, state, prevImg, groupPrivate, type])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

         if (
         !nameErr && !aboutErr && !cityErr && !stateErr && !urlErr && !typeErr && !privateErr
          ) {
            const payload = {
                id: groupId,
                name,
                about,
                type,
                private: groupPrivate,
                city,
                state
              }
           const newGroup = await dispatch(editGroup(payload));

    const newImg = {
        id: newGroup.id,
        url: prevImg,
        preview: true
    }

    if (prevImg.length > 0) {
        await dispatch(addImageToGroup(groupId, newImg))
    }
    history.push(`/groups/${groupId}`)
}
    };

    return (
        <div className='main-group'>
    <div className='group-title'>Update your Group</div>

    <div className='backend-errors-group'>{backEndErrors}</div>

    <form onSubmit={handleSubmit}>
        <div className='form-main-div-group'>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>Group Name</div>
                <div className='login-input-group'>
                    <input
                        className='input-field-group'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Input New Group Name Please'
                    />
                </div>
                <div className='input-error-group'>
                    {!!renderErr && nameErr.length > 0 && nameErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>City</div>
                <div className='login-input-group'>
                    <input
                        className='input-field-group'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                    />
                </div>
                <div className='input-error-group'>
                    {!!renderErr && cityErr.length > 0 && cityErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>State</div>
                <div className='login-input-group'>
                    <input
                        className='input-field-group'
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='State'
                    />
                </div>
                <div className='input-error-group'>
                    {!!renderErr && stateErr.length > 0 && stateErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>Group Image</div>
                <div className='login-input-group'>
                    <input
                        className='input-field-group'
                        type='text'
                        value={prevImg}
                        onChange={(e) => setPrevImg(e.target.value)}
                        placeholder='Image URL'
                    />
                </div>
                <div className='input-error-group'>
                    {!!renderErr && urlErr.length > 0 && urlErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>Group Type</div>
                <div className='login-input-group'>
                    <select
                        className='input-dropdown-group'
                        type='text'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value={' '}>Select Group Type</option>
                        <option value={'In person'}>In person</option>
                        <option value={'Online'}>Online</option>
                    </select>
                </div>
                <div className='input-error-group'>
                    {!!renderErr && typeErr.length > 0 && typeErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>Group Access</div>
                <div className='login-input-group'>
                    <select
                        className='input-dropdown-group'
                        type='text'
                        value={groupPrivate}
                        onChange={(e) => setGroupPrivate(e.target.value)}
                    >
                        <option value={' '}>Select Group Access</option>
                        <option value={false}>Public</option>
                        <option value={true}>Private</option>
                    </select>
                </div>
                <div className='input-error-group'>
                    {!!renderErr && privateErr.length > 0 && privateErr}
                </div>
            </div>
            <div className='input-inner-div-group'>
                <div className='input-header-group'>Group Description</div>
                <div className='login-input-group'>
                    <textarea
                        className='input-block-group'
                        type='text'
                        maxLength={200}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder='Please input more than 50 characters'
                    />
                </div>
                <div className='input-error-group'>
                    {!!renderErr && aboutErr.length > 0 && aboutErr}
                </div>
            </div>
            <div className='button-div-group'>
                <button className='login-button-group'
                    type='submit'
                    disabled={backEndErrors.length}
                >Update Group</button>
            </div>
        </div>
    </form >
</div>

    )
}

export default UpdateGroupForm;
