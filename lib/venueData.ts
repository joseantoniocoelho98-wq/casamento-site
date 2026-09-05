export interface VenueInfo {
  eyebrow: string;
  title: string;
  date: string;
  time: string;
  address: string;
}

export const ceremonyInfo: VenueInfo = {
  eyebrow: 'Cerimônia',
  title: 'Rancho Miguel Vieira',
  date: '09/01/2027',
  time: '16h00',
  address: 'MA-014, 11 - Jacaraí, Vitória do Mearim - MA, 65350-000',
};

export const receptionInfo: VenueInfo = {
  eyebrow: 'Recepção',
  title: 'Espaço de Festas Jardim das Flores',
  date: '09/01/2027',
  time: '19h00',
  address: 'Sei lá - Vitória do Meaim - MA',
};