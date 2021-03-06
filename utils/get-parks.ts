import { findStateByName } from './states';

export interface RawParkData {
  total: string;
  limit: string;
  start: string;
  data: {
    states: string;
    directionsInfo: string;
    directionsUrl: string;
    url?: string;
    weatherInfo: string;
    name: string;
    latLong: string;
    description: string;
    images: {
      credit: string;
      altText: string;
      title: string;
      id: string;
      caption: string;
      url: string;
    }[];
    designation: string;
    parkCode: string;
    id: string;
    fullName: string;
  }[];
}

export interface ParkData {
  states: string;
  directionsInfo: string;
  directionsUrl: string;
  url?: string;
  weatherInfo: string;
  name: string;
  latLong: string;
  description: string;
  image?: {
    credit: string;
    altText: string;
    title: string;
    id: string;
    caption: string;
    url: string;
  };
  designation: string;
  parkCode: string;
  id: string;
  fullName: string;
}

async function getParks(statecode: string) {
  const [state] = findStateByName(statecode);

  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=100&fields=images&api_key=${process.env.NPS_KEY}`;

  const parksPromise = await fetch(url);
  const parks = await parksPromise.json();

  const parkData: ParkData[] = parks.data.map(
    (p: RawParkData['data'][number]) => {
      if (p.images && p.images.length > 0) {
        return { ...p, image: p.images[0] };
      }
      return p;
    }
  );

  return parkData;
}

export { getParks };
