export default class Photo {
  constructor (data) {
    this.id = data.id
    this.title = data.title
    this.date = data.date
    this.likes = data.likes
    this.authorId = data.photographerId
    this.price = data.price
    this.tags = data.tags
    this.image = data.image
    this.alt = data.alt
  }

  getHTMLbalise (src) {
    return `
      <img src="${src + this.image}" alt="${this.alt}" />
    `
  }
}
