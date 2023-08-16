export class Mapping {
  constructor(uniclass_to_key_map = null, get_items_f = null) {
    this.uniclass_to_key_map = uniclass_to_key_map; this.get_items_f = get_items_f;
  }

  map(code) {
    if (this.uniclass_to_key_map === null) { return null; }
    const re = new RegExp(`^${code}`);
    let items = this.uniclass_to_key_map
        .filter(({code}) => re.test(code))
        .map(({key}) => key)
        .filter((v, i, arr) => arr.indexOf(v) === i) // Keep only unique items
        .map((key) => this.get_items_f().find((i) => i.key === key))
        .filter((i) => i !== undefined);
    if (items.length === 0) { return null; }
    return items.map(({name}) => name);
  }
}

