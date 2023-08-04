import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewGroup, addImageToGroup } from '../../store/groups';
import './CreateGroupForm.css'

function CreateGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const groups = useSelector(state => state.groups);

    if (!sessionUser) {
        history.push('/');
    }
    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [about, setAbout] = useState('');
    const [aboutErr, setAboutErr] = useState('');
    const [type, setType] = useState('');
    const [typeErr, setTypeErr] = useState('');
    const [groupPrivate, setGroupPrivate] = useState('');
    const [privateErr, setPrivateErr] = useState('');
    const [city, setCity] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [state, setState] = useState('');
    const [stateErr, setStateErr] = useState('');
    const [prevImg, setPrevImg] = useState('');

    const [backEndErrors, setBackEndErrors] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    const [urlErr, setUrlErr] = useState('');

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

     const urlValidation = str => {
         return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
     }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRenderErr(true)

         if (
         !nameErr && !aboutErr && !cityErr && !stateErr && !urlErr && !typeErr && !privateErr
          ) {
           const payload = {name, about, type, private: groupPrivate, city, state}

           const newGroup = await dispatch(createNewGroup(payload));
   
    const newImg = {
        id: newGroup.id,
        url: prevImg,
        preview: true
    }

    if (prevImg.length > 0) {
        await dispatch(addImageToGroup(newGroup.id, newImg))
    }
    history.push(`/groups/${newGroup.id}`)
}

    }



    return (
        <div className='groupMain'>
            <div className='groupTitle'>Create A Group</div>

            <div className='groupBackendErrors'>{backEndErrors}</div>

            <form onSubmit={handleSubmit}>
                <div className='groupFormMainDiv'>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>Group Name</div>
                        <div className='groupLoginInput'>
                            <input
                                className='groupInputField'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && nameErr.length > 0 && nameErr}
                        </div>
                    </div>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>Group Type</div>
                        <div className='groupLoginInput'>
                            <select
                                className='groupInputDropdown'
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option className='groupOption' value={' '}>Select Group Type</option>
                                <option className='groupOption' value={'In person'}>In person</option>
                                <option className='groupOption' value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && typeErr.length > 0 && typeErr}
                        </div>
                    </div>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>Group Access</div>
                        <div className='groupLoginInput'>
                            <select
                                className='groupInputDropdown'
                                type='text'
                                value={groupPrivate}
                                onChange={(e) => setGroupPrivate(e.target.value)}
                            >
                                <option className='groupOption' value={' '}>Select Group Access</option>
                                <option className='groupOption' value={false}>Public</option>
                                <option className='groupOption' value={true}>Private</option>
                            </select>
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && privateErr.length > 0 && privateErr}
                        </div>
                    </div>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>City</div>
                        <div className='groupLoginInput'>
                            <input
                                className='groupInputField'
                                type='text'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && cityErr.length > 0 && cityErr}
                        </div>
                    </div>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>State</div>
                        <div className='groupLoginInput'>
                            <input
                                className='groupInputField'
                                type='text'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && stateErr.length > 0 && stateErr}
                        </div>
                    </div>
                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>Group Image</div>
                        <div className='groupLoginInput'>
                            <input
                                className='groupInputField'
                                type='text'
                                value={prevImg}
                                onChange={(e) => setPrevImg(e.target.value)}
                            />
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && urlErr.length > 0 && urlErr}
                        </div>
                    </div>

                    <div className='groupInputInnerDiv'>
                        <div className='groupInputHeader'>Description</div>
                        <div className='groupLoginInput'>
                            <textarea
                                className='groupInputBlock'
                                type='text'
                                maxLength={200}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>
                        <div className='groupInputError'>
                            {!!renderErr && aboutErr.length > 0 && aboutErr}
                        </div>
                    </div>
                    <div className='groupLoginButtonDiv'>
                        <button className='groupLoginButton'
                            type='submit'
                            disabled={backEndErrors.length}
                        >Create Group</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateGroupForm;
