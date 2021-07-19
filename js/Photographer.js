export default class Photographer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.price = data.price;
    this.tagLine = data.tagLine;
    // TODO: Verify type passed to the constructor
    this.tags = data.tags;
    this.portrait = data.portrait;
  }
}
