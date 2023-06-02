import React from 'react';
import styles from './Card.module.css';
import { Image } from '../../../types/Image';

type CardProps = {
  image: Image;
};

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className={styles['card']}>
      <img src={image.url} alt={image.title} className={styles['card__image']} />
      <div className={styles['card__text']}>{image.title}</div>
    </div>
  );
};

export default Card;
