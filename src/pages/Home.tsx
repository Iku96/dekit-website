import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Values from '../components/Values';
import PricelistCTA from '../components/PricelistCTA';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Values />
      <PricelistCTA />
      <Gallery />
      <Contact />
    </>
  );
}
