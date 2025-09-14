'use client';

import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface LightboxWrapperProps {
  images: { src: string; alt: string }[];
  selectedIndex: number;
  onClose: () => void;
}

const LightboxWrapper: React.FC<LightboxWrapperProps> = ({ images, selectedIndex, onClose }) => {
  return (
    <Lightbox
      open={selectedIndex >= 0}
      close={onClose}
      slides={images}
      index={selectedIndex}
    />
  );
};

export default LightboxWrapper;
