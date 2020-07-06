const slugify = require('slugify');

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

const stateNames = Object.values(states);
const stateKeys = Object.keys(states);
const stateEntries = Object.entries(states);

const stateKeySlugs = stateKeys.map(state => slugify(state));
const stateNameSlugs = stateNames.map(state => slugify(state));
const stateEntrySlugs = stateEntries.map(([code, name]) => [
  slugify(code),
  slugify(name),
]);

function findStateByName(input) {
  const state = stateEntries.find(([code, name]) => {
    const inputSlug = slugify(input);
    if (inputSlug === slugify(code) || inputSlug === slugify(name)) {
      return true;
    }
    return false;
  });

  return state ?? [undefined, undefined];
}

module.exports = {
  states,
  stateNames,
  stateKeys,
  stateEntries,
  stateKeySlugs,
  stateNameSlugs,
  stateEntrySlugs,
  findStateByName,
};
