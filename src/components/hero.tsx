'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import idle from '../../public/assets/character/hero-idle.png';
import leftIdle from '../../public/assets/character/hero-left-idle.png';

export default function Hero() {
  const sideMovement = 5;
  const [position, setPosition] = useState(0);

  const [animationState, setAnimationState] = useState(idle);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPosition((p) => p - sideMovement);
        setAnimationState(leftIdle);
      }

      if (e.key === 'ArrowRight') {
        setPosition((p) => p + sideMovement);
        setAnimationState(idle);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Image
      src={animationState}
      className="absolute top-64.25 left-10"
      height={64}
      width={48}
      style={{
        transform: `translateX(${position}px)`,
      }}
      alt="Main character"
    />
  );
}
