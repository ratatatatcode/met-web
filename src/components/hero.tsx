'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import idle from '../../public/assets/character/hero-idle.png';
import leftIdle from '../../public/assets/character/hero-left-idle.png';

export default function Hero({
  companionRef,
  changeState,
  hasMet,
}: {
  companionRef: React.RefObject<HTMLImageElement>;
  changeState: () => void;
  hasMet: boolean;
}) {
  const heroRef = useRef<HTMLImageElement>(null);
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

    if (hasMet) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [hasMet]);

  // Test ref:
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (companionRef.current && heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const companionRect = companionRef.current.getBoundingClientRect();

        if (
          heroRect.x < companionRect.x + companionRect.width &&
          heroRect.x + heroRect.width > companionRect.x &&
          heroRect.y < companionRect.y + companionRect.height &&
          heroRect.y + heroRect.height > companionRect.y
        ) {
          changeState();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [companionRef, changeState]);

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
      ref={heroRef}
    />
  );
}
