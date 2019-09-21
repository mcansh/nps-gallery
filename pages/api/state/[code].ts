import ky from 'ky-universal';
import { NextApiRequest, NextApiResponse } from 'next';

const NPS_KEY = process.env.NPS_KEY;

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

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${code}&limit=100&fields=images&api_key=${NPS_KEY}`;

  try {
    const parks: RawParkData = await ky(url).json();

    const parkData: ParkData[] = parks.data.map(p => {
      if (p.images && p.images.length > 0) {
        return { ...p, image: p.images[0] };
      }
      return p;
    });

    res.json(parkData);
  } catch (error) {
    res.json({ error: error.message });
  }
};
