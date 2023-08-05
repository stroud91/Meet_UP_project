import React from 'react';
import './DeleteEventModal.css';

function deleteEventModal({ show, closeModal, confirmAction }) {
  if (!show) {
    return null;
  }

  return (
    <div>
     <div id="modal-background" onClick={closeModal} />
     <div id="modal">
      <div id="confirm-delete-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this event?</p>
        <button className="yes-button" onClick={confirmAction}>
          Yes (Delete Event)
        </button>
        <button className="no-button" onClick={closeModal}>
          No (Keep Event)
        </button>
      </div>
    </div>
    </div>
  );
}

export default deleteEventModal;
