import Image from 'next/image';
import leftIdle from '../../public/assets/character/companion-idle.png';

export default function Companion() {
  return (
    <Image
      src={leftIdle}
      className="absolute top-64.25 right-10"
      height={64}
      width={48}
      alt="Main character"
    />
  );
}
