import Hero from '@/components/Hero';
import VerseSection from '@/components/VerseSection';
import OurStory from '@/components/OurStory';
import VenueSection from '@/components/VenueSection';
import GuestGuideSection from '@/components/GuestGuideSection';
import RSVPSection from '@/components/RSVPSection';
import AlbumSection from '@/components/AlbumSection';
import { ceremonyInfo, receptionInfo } from '@/lib/venueData';

export default function Home() {
  return (
    <main>
      <Hero />
      <VerseSection />
      <OurStory />
      <VenueSection id="cerimonia" {...ceremonyInfo} />
      <VenueSection id="recepcao" {...receptionInfo} />
      <GuestGuideSection />
      <RSVPSection />
      <AlbumSection />
    </main>
  );
}