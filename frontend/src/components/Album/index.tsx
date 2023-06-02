import React from 'react';
import styles from './Album.module.css';
import Card from './Card';
import { Image } from '../../types/Image';

type AlbumProps = {
  images: Image[];
};

const Album: React.FC<AlbumProps> = ({ images }) => {
  return (
    <div className={styles['album']}>
      {images.map((image) => (
        <Card key={image.id} image={image} />
      ))}
    </div>
  );
};

export default Album;
