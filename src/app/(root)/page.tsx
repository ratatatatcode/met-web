import Canvas from '@/components/canvas';
import Hero from '@/components/hero';
import Companion from '@/components/companion';
import Ground from '@/components/ground';

export default function Home() {
  return (
    <Canvas>
      <Hero />
      <Companion />
      <Ground />
    </Canvas>
  );
}
