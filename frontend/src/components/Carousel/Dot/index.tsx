import { useMemo } from 'react';
import styles from './Dot.module.css';

type CarouselDotProps = {
  isActive: boolean;
  onClick: () => void;
};

const CarouselDot: React.FC<CarouselDotProps> = ({ isActive, onClick }) => {
  const classes = useMemo(() => {
    const defaultClass = styles['carousel__dot'];

    if (isActive) {
      return `${defaultClass} ${styles['carousel__dot_active']}`;
    }

    return defaultClass;
  }, [isActive]);

  return <button onClick={onClick} className={classes} />;
};

export default CarouselDot;
