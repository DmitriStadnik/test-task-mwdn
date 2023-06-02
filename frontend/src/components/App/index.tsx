import React, { useCallback, useEffect, useState } from 'react';
import styles from './App.module.css';
import Album from '../Album';
import { Image } from '../../types/Image';
import { Api } from '../../api';
import Carousel from '../Carousel';

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isCarousel, setIsCarousel] = useState(true);

  const toggleView = useCallback(async () => {
    setIsCarousel(!isCarousel);
  }, [isCarousel]);

  const fetchImages = async () => {
    try {
      const result = await Api.fetchImages();

      if (result.length > 0) {
        setImages(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className={styles['app']}>
      <button className={styles['app__button']} onClick={toggleView}>
        Toggle View
      </button>
      {isCarousel ? <Carousel images={images} /> : <Album images={images} />}
    </div>
  );
};

export default App;
