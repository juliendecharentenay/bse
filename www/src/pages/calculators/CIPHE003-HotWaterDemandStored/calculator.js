/*
 * CIPHE Hot and Cold Water Supplies,
 * Table 6: Daily hot water demand
 */
const table = [
  {key:'ciphe_hwdd_010', name: 'Dwellings, 1 bedroom', use: 115, unit: 'Bedroom'},
  {key:'ciphe_hwdd_011', name: 'Dwellings, 2 bedroom', use: 115, unit: 'Bedroom'},
  {key:'ciphe_hwdd_012', name: 'Dwellings, 3+ bedrooms', use: 115, unit: 'Bedroom'},
  {key:'ciphe_hwdd_013', name: 'Dwellings, Student en-suite', use: 20, unit: 'Bedroom'},
  {key:'ciphe_hwdd_014', name: 'Dwellings, Student, communal', use:  20, unit: 'Bed space'},
  {key:'ciphe_hwdd_015', name: 'Dwellings, Nurses Home', use: 20, unit: 'Bed space'},
  {key:'ciphe_hwdd_016', name: 'Dwellings, Children\'s Home', use: 25, unit: 'Bed space'},
  {key:'ciphe_hwdd_017', name: 'Dwellings, Elderly sheltered', use: 25, unit: 'Bedroom'},
  {key:'ciphe_hwdd_018', name: 'Dwellings, Elderly Care Home', use: 25, unit: 'Bed space'},
  // {key:'ciphe_hwdd_019', name: 'Dwellings, Prison', use: 0, unit: 'Inmate'},

  {key:'ciphe_hwdd_030', name: 'Hotels, Budget', use: 35, unit: 'Bedroom'},
  {key:'ciphe_hwdd_031', name: 'Hotels, Travel Inn/Lodge', use: 35, unit: 'Bedroom'},
  {key:'ciphe_hwdd_032', name: 'Hotels, 4/5 Star Luxury', use: 45, unit: 'Bedroom'},

  {key:'ciphe_hwdd_040', name: 'Offices & general workplaces, with canteen', use: 5, unit: 'Person'},
  {key:'ciphe_hwdd_041', name: 'Offices & general workplaces, without canteen', use: 5, unit: 'Person'},

  {key:'ciphe_hwdd_050', name: 'Shops, with canteen', use: 5, unit: 'Person'},
  {key:'ciphe_hwdd_051', name: 'Shops, without canteen', use: 5, unit: 'Person'},

  {key:'ciphe_hwdd_060', name: 'Factory, with canteen', use: 5, unit: 'Person'},
  {key:'ciphe_hwdd_061', name: 'Factory, without canteen', use: 5, unit: 'Person'},

  {key:'ciphe_hwdd_070', name: 'Schools, Nursery', use: 5, unit: 'Pupil'},
  {key:'ciphe_hwdd_071', name: 'Schools, Primary', use: 5, unit: 'Pupil'},
  {key:'ciphe_hwdd_072', name: 'Schools, Secondary', use: 5, unit: 'Pupil'},
  {key:'ciphe_hwdd_073', name: 'Schools, 6th Form College', use: 5, unit: 'Pupil'},
  {key:'ciphe_hwdd_074', name: 'Schools, Boarding', use: 25, unit: 'Pupil'},

  {key:'ciphe_hwdd_080', name: 'Hospital, District General', use: 50, unit: 'Bed'},
  {key:'ciphe_hwdd_081', name: 'Hospital, Surgical ward', use: 50, unit: 'Bed'},
  {key:'ciphe_hwdd_082', name: 'Hospital, Medical ward', use: 50, unit: 'Bed'},
  {key:'ciphe_hwdd_083', name: 'Hospital, Paediatric ward', use: 70, unit: 'Bed'},
  {key:'ciphe_hwdd_084', name: 'Hospital, Geriatric ward', use: 40, unit: 'Bed'},

  {key:'ciphe_hwdd_090', name: 'Sports Changing, Sports Hall', use: 20, unit: 'Person'},
  {key:'ciphe_hwdd_091', name: 'Sports Changing, Swimming Pool', use: 20, unit: 'Person'},
  {key:'ciphe_hwdd_092', name: 'Sports Changing, Field Sports', use: 35, unit: 'Person'},
  {key:'ciphe_hwdd_093', name: 'Sports Changing, All weather pitch', use: 35, unit: 'Person'},

  {key:'ciphe_hwdd_100', name: 'Places of Assembly (excl staff), Art Gallery', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_101', name: 'Places of Assembly (excl staff), Library', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_102', name: 'Places of Assembly (excl staff), Museum', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_103', name: 'Places of Assembly (excl staff), Theatre', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_104', name: 'Places of Assembly (excl staff), Cinema', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_105', name: 'Places of Assembly (excl staff), Bars', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_106', name: 'Places of Assembly (excl staff), Night Club', use: 1, unit: 'Person'},
  {key:'ciphe_hwdd_107', name: 'Places of Assembly (excl staff), Restaurant', use: 6, unit: 'Cover'},
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
