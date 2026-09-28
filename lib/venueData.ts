export interface VenueInfo {
  title: string;
  date: string;
  ceremonyTime: string;
  receptionTime: string;
  address: string;
}

// Cerimônia e recepção no mesmo local — edite aqui se algo mudar
export const venueInfo: VenueInfo = {
  title: 'Rancho Miguel Vieira',
  date: '09/01/2027',
  ceremonyTime: '16h00',
  receptionTime: '19h00',
  address: 'MA-014, 11 - Jacaraí, Vitória do Mearim - MA, 65350-000',
};