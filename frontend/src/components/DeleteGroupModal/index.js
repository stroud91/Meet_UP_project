import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeGroup } from '../../store/groups';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ groupId, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(removeGroup(groupId));
    history.push('/groups');
    closeModal();
  };

  return (
     <div>
        <div id="modal-background" onClick={closeModal} />
       <div id="modal">

        <div id="confirm-delete-modal">

             <h1>Confirm Delete</h1>
             <p>Are you sure you want to remove this group?</p>
             <button className="yes-button" onClick={handleDelete}>Yes (Delete Group)</button>
             <button className="no-button" onClick={closeModal}>No (Keep Group)</button>
        </div>

       </div>
     </div>


  );
}

export default ConfirmDeleteModal;
