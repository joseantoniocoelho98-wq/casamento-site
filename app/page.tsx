import Hero from '@/components/Hero';
import GuestGuideSection from '@/components/GuestGuideSection';
import GiftSection from '@/components/GiftSection';
import VenueSection from '@/components/VenueSection';
import OurStory from '@/components/OurStory';
import VerseSection from '@/components/VerseSection';
import RSVPSection from '@/components/RSVPSection';
import AlbumSection from '@/components/AlbumSection';
import { ceremonyInfo, receptionInfo } from '@/lib/venueData';

export default function Home() {
  return (
    <main>
      <Hero />
      <GuestGuideSection />
      <GiftSection />
      <VenueSection id="cerimonia" {...ceremonyInfo} />
      <VenueSection id="recepcao" {...receptionInfo} />
      <OurStory />
      <VerseSection />
      <RSVPSection />
      <AlbumSection />
    </main>
  );
}