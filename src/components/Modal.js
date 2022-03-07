import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, goBack }) => isShowing ? ReactDOM.createPortal(
  
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <p style={{textAlign: 'center'}}>
          Are you sure you want to quit?
        </p>
        <div className="divCheck">
          <button onClick={hide}>No</button>
          <button onClick={goBack}>Yes</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;