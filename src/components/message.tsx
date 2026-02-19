'useClient';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Message() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((p) => p - 5);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute">
      <Image
        src={'/assets/others/message.png'}
        height={400}
        width={600}
        alt="Message"
        className=""
        style={{ transform: `translateY(${position}px)` }}
      ></Image>
    </div>
  );
}
