'use client';

import { useRef, useState } from 'react';
import Canvas from '@/components/canvas';
import Hero from '@/components/hero';
import Companion from '@/components/companion';
import Ground from '@/components/ground';
import Message from './message';

export default function Game() {
  const [hasMet, setHasMet] = useState(false);
  const companionRef = useRef<HTMLImageElement>(null!);

  return (
    <Canvas>
      <Companion ref={companionRef} />
      <Hero companionRef={companionRef} changeState={() => setHasMet(true)} hasMet />
      <Ground />
      {hasMet && <Message />}
    </Canvas>
  );
}
