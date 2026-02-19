import Image from 'next/image';

export default function Ground() {
  return (
    <Image
      src="/assets/others/ground.png"
      height={80}
      width={3200}
      className="absolute top-80 z-10"
      alt="Ground"
    ></Image>
  );
}
