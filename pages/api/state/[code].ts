import { NextApiHandler } from 'next';

import { getFirstParam } from '~/utils/get-first-param';
import { getParks } from '~/utils/get-parks';

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  const parkData = await getParks(getFirstParam(code));
  res.json(parkData);
};

export default handler;
