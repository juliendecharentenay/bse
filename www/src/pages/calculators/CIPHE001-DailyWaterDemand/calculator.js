/*
 * CIPHE Hot and Cold Water Supplies,
 * Table 2: Daily water demand
 */
const table = [
  {key:'ciphe_dwd_010', name: 'Dwellings, 1 bedroom', use: 210, unit: 'Bedroom'},
  {key:'ciphe_dwd_011', name: 'Dwellings, 2 bedroom', use: 130, unit: 'Bedroom'},
  {key:'ciphe_dwd_012', name: 'Dwellings, 3+ bedrooms', use: 100, unit: 'Bedroom'},
  {key:'ciphe_dwd_013', name: 'Dwellings, Student en-suite', use: 100, unit: 'Bedroom'},
  {key:'ciphe_dwd_014', name: 'Dwellings, Student, communal', use:  90, unit: 'Bed space'},
  {key:'ciphe_dwd_015', name: 'Dwellings, Nurses Home', use: 120, unit: 'Bed space'},
  {key:'ciphe_dwd_016', name: 'Dwellings, Children\'s Home', use: 135, unit: 'Bed space'},
  {key:'ciphe_dwd_017', name: 'Dwellings, Elderly sheltered', use: 120, unit: 'Bedroom'},
  {key:'ciphe_dwd_018', name: 'Dwellings, Elderly Care Home', use: 135, unit: 'Bed space'},
  {key:'ciphe_dwd_019', name: 'Dwellings, Prison', use: 150, unit: 'Inmate'},

  {key:'ciphe_dwd_030', name: 'Hotels, Budget', use: 135, unit: 'Bedroom'},
  {key:'ciphe_dwd_031', name: 'Hotels, Travel Inn/Lodge', use: 150, unit: 'Bedroom'},
  {key:'ciphe_dwd_032', name: 'Hotels, 4/5 Star Luxury', use: 200, unit: 'Bedroom'},

  {key:'ciphe_dwd_040', name: 'Offices & general workplaces, with canteen', use: 45, unit: 'Person'},
  {key:'ciphe_dwd_041', name: 'Offices & general workplaces, without canteen', use: 40, unit: 'Person'},

  {key:'ciphe_dwd_050', name: 'Shops, with canteen', use: 45, unit: 'Person'},
  {key:'ciphe_dwd_051', name: 'Shops, without canteen', use: 40, unit: 'Person'},

  {key:'ciphe_dwd_060', name: 'Factory, with canteen', use: 45, unit: 'Person'},
  {key:'ciphe_dwd_061', name: 'Factory, without canteen', use: 40, unit: 'Person'},

  {key:'ciphe_dwd_070', name: 'Schools, Nursery', use: 15, unit: 'Pupil'},
  {key:'ciphe_dwd_071', name: 'Schools, Primary', use: 15, unit: 'Pupil'},
  {key:'ciphe_dwd_072', name: 'Schools, Secondary', use: 20, unit: 'Pupil'},
  {key:'ciphe_dwd_073', name: 'Schools, 6th Form College', use: 20, unit: 'Pupil'},
  {key:'ciphe_dwd_074', name: 'Schools, Boarding', use: 90, unit: 'Pupil'},

  {key:'ciphe_dwd_080', name: 'Hospital, District General', use: 600, unit: 'Bed'},
  {key:'ciphe_dwd_081', name: 'Hospital, Surgical ward', use: 250, unit: 'Bed'},
  {key:'ciphe_dwd_082', name: 'Hospital, Medical ward', use: 220, unit: 'Bed'},
  {key:'ciphe_dwd_083', name: 'Hospital, Paediatric ward', use: 300, unit: 'Bed'},
  {key:'ciphe_dwd_084', name: 'Hospital, Geriatric ward', use: 140, unit: 'Bed'},

  {key:'ciphe_dwd_090', name: 'Sports Changing, Sports Hall', use: 35, unit: 'Person'},
  {key:'ciphe_dwd_091', name: 'Sports Changing, Swimming Pool', use: 20, unit: 'Person'},
  {key:'ciphe_dwd_092', name: 'Sports Changing, Field Sports', use: 35, unit: 'Person'},
  {key:'ciphe_dwd_093', name: 'Sports Changing, All weather pitch', use: 35, unit: 'Person'},

  {key:'ciphe_dwd_100', name: 'Places of Assembly (excl staff), Art Gallery', use: 6, unit: 'Person'},
  {key:'ciphe_dwd_101', name: 'Places of Assembly (excl staff), Library', use: 6, unit: 'Person'},
  {key:'ciphe_dwd_102', name: 'Places of Assembly (excl staff), Museum', use: 6, unit: 'Person'},
  {key:'ciphe_dwd_103', name: 'Places of Assembly (excl staff), Theatre', use: 3, unit: 'Person'},
  {key:'ciphe_dwd_104', name: 'Places of Assembly (excl staff), Cinema', use: 3, unit: 'Person'},
  {key:'ciphe_dwd_105', name: 'Places of Assembly (excl staff), Bars', use: 4, unit: 'Person'},
  {key:'ciphe_dwd_106', name: 'Places of Assembly (excl staff), Night Club', use: 4, unit: 'Person'},
  {key:'ciphe_dwd_107', name: 'Places of Assembly (excl staff), Restaurant', use: 7, unit: 'Cover'},
];

export function get_items() {
  return table.map(({key, name, use, unit}) => ({key, name, unit}));
}

export function get_demand(key, quantity) {
  const e = table.find(e => e.key === key);
  if (e === undefined) { throw new Error(`Item with key {key} does not exist`); }
  return quantity * e.use;
}

export function get_total_demand(quantities) {
  return Object.keys(quantities)
  .reduce((d, k) => {
  console.log(d, k);
    return d+get_demand(k, quantities[k]);
  }, 0.0);
}

export function get_version() { return "0.0.0"; }
