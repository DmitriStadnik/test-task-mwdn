import React, { useCallback, useMemo, useState } from 'react';
import styles from './Carousel.module.css';
import { Image } from '../../types/Image';
import CarouselDot from './Dot';

type CarouselProps = {
  images: Image[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateLeft = useCallback(() => {
    const newIndex = currentIndex - 1;

    if (newIndex < 0) {
      setCurrentIndex(images.length - 1);
      return;
    }

    setCurrentIndex(newIndex);
  }, [currentIndex, images]);

  const navigateRight = useCallback(() => {
    const newIndex = currentIndex + 1;

    if (newIndex > images.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(newIndex);
  }, [currentIndex, images]);

  const image = useMemo(() => {
    return images[currentIndex];
  }, [images, currentIndex]);

  if (!images || !image) {
    return <></>;
  }

  return (
    <div className={styles['carousel']}>
      <div className={styles['carousel__image-wrapper']}>
        <button className={styles['carousel__nav-button']} onClick={navigateLeft}>
          {'<'}
        </button>
        <img src={image.url} alt={image.title} className={styles['carousel__image']} />
        <button className={styles['carousel__nav-button']} onClick={navigateRight}>
          {'>'}
        </button>
      </div>

      <div className={styles['carousel__nav']}>
        {images.map((image, index) => (
          <CarouselDot
            key={`nav-${image.id}`}
            onClick={() => setCurrentIndex(index)}
            isActive={currentIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
