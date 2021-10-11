import Photos from '../class/Photos'

export default class Photo extends Photos {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.likes = data.likes;
    this.authorId = data.photographerId;
    this.price = data.price;
    this.tags = data.tags;
    this.file = data.image;
  }
}
