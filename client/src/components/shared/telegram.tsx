'use client'

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Props {
  telegramLink: string;
}

export const Telegram: React.FC<Props> = ({telegramLink}) => {
  const airplaneRef = useRef<HTMLImageElement>(null)
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (!isAnimating && airplaneRef.current) {
      setIsAnimating(true);
      airplaneRef.current.style.animation = 'fly 1.5s forwards';
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    if (airplaneRef.current) {
      airplaneRef.current.style.animation = 'none';
    }
  };

  return (
    <a className="telegram" 
      href={telegramLink}
      onMouseEnter={handleMouseEnter}
    >
      <Image
        alt="Телеграм" 
        loading="lazy" 
        width="50" 
        height="50" 
        decoding="async"
        className="telegram__img"
        src="/img/icons/circle.webp"
      />
      <Image
        alt="Телеграм" 
        loading="lazy" 
        width="50" 
        height="50" 
        decoding="async"
        className="telegram__airplane telegram__img"
        ref={airplaneRef}
        onAnimationEnd={handleAnimationEnd}
        src="/img/icons/tg.webp"
      />
    </a>
  );
};