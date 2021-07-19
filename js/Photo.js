export default class Photo {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.likes = data.likes;
    this.authorId = data.photographerId;
    this.price = data.price;
    // TODO: Verify type passed to the constructor
    this.tags = data.tags;
    this.file = data.image;
  }
}
