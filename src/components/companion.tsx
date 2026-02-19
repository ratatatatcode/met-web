import { forwardRef } from 'react';
import Image from 'next/image';
import leftIdle from '../../public/assets/character/companion-idle.png';

const Companion = forwardRef<HTMLImageElement>(({}, ref) => {
  return (
    <Image
      src={leftIdle}
      className="absolute top-64.25 right-10"
      height={64}
      width={48}
      alt="Main character"
      ref={ref}
    />
  );
});

Companion.displayName = 'Companion';
export default Companion;
