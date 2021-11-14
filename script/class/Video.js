export default class Video {
  constructor (data) {
    this.id = data.id
    this.title = data.title
    this.date = data.date
    this.likes = data.likes
    this.authorId = data.photographerId
    this.price = data.price
    this.tags = data.tags
    this.video = data.video
  }

  getHTMLbalise (src) {
    return `
      <video controls>
        <source src="${src + this.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `
  }
}
