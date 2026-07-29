export interface VenueInfo {
  eyebrow: string; // pequeno texto acima do título (ex: "Cerimônia")
  title: string; // nome do local (ex: "Igreja Nossa Senhora Aparecida")
  date: string; // data por extenso (ex: "28 de Fevereiro de 2027")
  time: string; // horário (ex: "16h00")
  address: string; // endereço completo — usado no mapa e no botão do Google Maps
}

// Edite os campos abaixo com as informações reais da cerimônia.
export const ceremonyInfo: VenueInfo = {
  eyebrow: 'Cerimônia',
  title: 'Lugar que Ianca gosta e não sei o nome',
  date: '28 de Fevereiro de 2027',
  time: '16h00',
  address: 'Av. Exemplo, 123 - Centro, Vitória - MA',
};

// Edite os campos abaixo com as informações reais da recepção.
export const receptionInfo: VenueInfo = {
  eyebrow: 'Recepção',
  title: 'Em algum lugar',
  date: '28 de Fevereiro de 2027',
  time: '19h00',
  address: 'Rua 123, 456 - Bairro sei lá, Vitória - MA',
};