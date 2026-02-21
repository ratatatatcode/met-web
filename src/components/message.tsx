'useClient';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Message() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (position !== -200) {
        setPosition((p) => p - 5);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [position]);

  return (
    <>
      <Image
        src={'/assets/others/message.png'}
        height={400}
        width={600}
        alt="Message"
        className="absolute z-50"
        style={{ transform: `translateY(${position + 220}px)` }}
      />
    </>
  );
}
