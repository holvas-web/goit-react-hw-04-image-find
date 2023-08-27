import React from 'react';

export const ImageGalleryItem = ({ src, onClick }) => (
  <li className="ImageGalleryItem">
    <img className='ImageGalleryIte-image' src={src} alt="" onClick={onClick} />
  </li>
);