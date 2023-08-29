import React, { useEffect, useCallback } from 'react';

export function Modal({ image, onClose }) {
  const handleKeyDown = useCallback (e => {
    if (e.code === 'Escape') {
      onClose();
    }
  },
  [onClose]
  );

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}


// Modal.propTypes = {
//   image: PropTypes.shape({
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };


//========= Попередній код ==========
// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleOverlayClick}>
//         <div className="Modal">
//           {this.props.children}
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }