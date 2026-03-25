'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// animation:
import idle from '../../public/assets/character/hero-idle.png';
import rightLF from '../../public/assets/character/hero-right-lf.png';
import rightRF from '../../public/assets/character/hero-right-rf.png';
import leftIdle from '../../public/assets/character/hero-left-idle.png';
import leftLF from '../../public/assets/character/hero-left-lf.png';
import leftRF from '../../public/assets/character/hero-left-rf.png';

export default function Hero({
  companionRef,
  changeState,
  hasMet,
}: {
  companionRef: React.RefObject<HTMLImageElement>;
  changeState: () => void;
  hasMet: boolean;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sideMovement = 5;
  const [position, setPosition] = useState(0);
  const [animationState, setAnimationState] = useState(idle);

  useEffect(() => {
    if (!hasMet) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeysRef.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeysRef.current[e.key] = false;

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      if (e.key === 'ArrowLeft') {
        setAnimationState(leftIdle);
      }

      if (e.key === 'ArrowRight') {
        setAnimationState(idle);
      }
    };

    const interval = setInterval(() => {
      if (pressedKeysRef.current['ArrowLeft']) {
        setPosition((p) => p - sideMovement);
        setAnimationState((prev) => (prev === leftRF ? leftLF : leftRF));

        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
          if (!pressedKeysRef.current['ArrowLeft']) {
            setAnimationState(leftIdle);
          }
        }, 150);
      }

      if (pressedKeysRef.current['ArrowRight']) {
        setPosition((p) => p + sideMovement);
        setAnimationState((prev) => (prev === rightRF ? rightLF : rightRF));

        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
          if (!pressedKeysRef.current['ArrowRight']) {
            setAnimationState(idle);
          }
        }, 150);
      }
    }, 90);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [hasMet]);

  useEffect(() => {
    if (!companionRef.current || !heroRef.current) return;

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
  }, [position, companionRef, changeState]);

  return (
    <div
      ref={heroRef}
      className="absolute top-64.25 left-10"
      style={{
        transform: `translateX(${position}px)`,
        width: '48px',
        height: '64px',
      }}
    >
      <Image src={animationState} height={64} width={48} alt="Main character" />
    </div>
  );
}
