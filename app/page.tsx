import Hero from '@/components/Hero';
import VerseSection from '@/components/VerseSection';
import OurStory from '@/components/OurStory';
import VenueSection from '@/components/VenueSection';
import { ceremonyInfo, receptionInfo } from '@/lib/venueData';

export default function Home() {
  return (
    <main>
      <Hero />
      <VerseSection />
      <OurStory />
      <VenueSection id="cerimonia" {...ceremonyInfo} />
      <VenueSection id="recepcao" {...receptionInfo} />
      {/* Próximas seções (Presentes, Lua de Mel...) entram aqui
          nas próximas etapas, uma abaixo da outra */}
    </main>
  );
}