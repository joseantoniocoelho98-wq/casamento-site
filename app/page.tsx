import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import VenueSection from '@/components/VenueSection';
import { ceremonyInfo, receptionInfo } from '@/lib/venueData';

export default function Home() {
  return (
    <main>
      <Hero />
      <OurStory />
      <VenueSection id="cerimonia" background="cream" {...ceremonyInfo} />
      <VenueSection id="recepcao" background="butter" {...receptionInfo} />
      {/* Próximas seções (Presentes, Lua de Mel...) entram aqui
          nas próximas etapas, uma abaixo da outra */}
    </main>
  );
}