export default class Photographer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.price = data.price;
    this.tagline = data.tagline;
    this.tags = data.tags;
    this.portrait = data.portrait;
  }

  init() {
    this.updateTitleHTML()
    this.getTags()
  }

  getPicturePath() {
    return `./assets/img/Photographers/${this.portrait}`
  }

  getTags() {
    return this.tags
  }

  updateTitleHTML () {
    document.title += ` | ${this.name}`
  }

  generateCardDOM() {
    let cardWrapper = document.querySelector('.cards')

    const cardDOM = `
      <article class="card-item">
        <header class="card-header">
          <a class="card-header_link" href="./pages/photographer/${this.id}">
            <img src="${this.getPicturePath()}" alt="#" class="card-header_img"/>
            <h2 class="card-header_title">${this.name}</h2>
          </a>
        </header>
      <p class="card-location">${this.city}, ${this.country}</p>
      <p class="card-description">${this.tagline}</p>
      <p class="card-price">${this.price}</p>
      <footer class="card-footer">
        <ol class="tags">
          ${this.tags.map(tag => `
            <li class="tags_item">
              <a href="#">${tag}</a> 
            </li>
          `).join('')}
        </ol>
      </footer>
    </article>
    `

    cardWrapper.innerHTML += cardDOM
  }
}
