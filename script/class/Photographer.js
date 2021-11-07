import Photos from '../class/Photos.js'

export default class Photographer {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.firstname = data.name.replace('-', '').replace(' ', '')
    this.city = data.city
    this.country = data.country
    this.price = data.price
    this.tagline = data.tagline
    this.tags = data.tags
    this.portrait = data.portrait
    this.likes = this.getLikes()
  }

  init () {
    this.updateTitleHTML()
    this.getTags()
  }

  getPicturePath () {
    return `./assets/img/Photographers/${this.portrait}`
  }

  getTags () {
    return this.tags
  }

  getTagsHTML () {
    return this.tags.map(tag => `
      <li id="${tag}" class="tags_item" data-active="false">
        <a id="tag_${tag}">${tag}</a> 
      </li>
    `).join('')
  }

  getPhotosHTML () {
    const photos = new Photos()
    let photographerPhotos = photos.getPhotoByPhotographerId(this.id)

    return photographerPhotos.map(photo => `
      <article class="pictureItem">
        <div class="pictureItem-img">
          <img src="../assets/img/${this.name.split(' ')[0]}/${photo.image}" alt="" />
        </div>
        <div class="pictureItem-content">
          <div class="pictureItem-contentText">
            <p>${photo.title}</p>
          </div>
          <div class="pictureItem-contentSocial">
            <span id="counter" data-value="${photo.likes}"></span>
            <div class="likes" data-liked="false">
              <i class="far fa-heart" aria-hidden="true" style="display: block;"></i>
              <i class="fas fa-heart" aria-hidden="true" style="display: none;"></i>
            </div>
          </div>
        </div>
      </article>
    `).join('')
  }

  updateTitleHTML () {
    document.title += ` | ${this.name}`
  }

  generateCardDOM () {
    let cardWrapper = document.querySelector('.cards')

    const cardDOM = `
    <article class="card-item">
        <header class="card-header">
          <a class="card-header_link" href="?page=photographer&id=${this.id}">
            <img src="${this.getPicturePath()}" alt="#" class="card-header_img"/>
            <h2 class="card-header_title">${this.name}</h2>
          </a>
        </header>
      <p class="card-location">${this.city}, ${this.country}</p>
      <p class="card-description">${this.tagline}</p>
      <p class="card-price">${this.price}</p>
      <footer class="card-footer">
        <ol class="tags">
          ${this.getTagsHTML()}
        </ol>
      </footer>
    </article>`

    cardWrapper.innerHTML += cardDOM
  }

  generatePhotographerDOM () {
    let photographerWrapper = document.querySelector('#app')

    const photographerDOM = `
    <header class="header-nav">
      <a class="logo" href="/">
        <img src="../assets/img/logo.png" alt="Fisheye Home page"> 
      </a>
    </header>
    <main id="photographer">
      <section class="card__photographer">
        <div class="card__photographer-content">
          <h1 class="card__photographer-name">${this.name}</h1>
          <p class="card__photographer-location">${this.city}, ${this.country}</p>
          <p class="card__photographer-description">${this.tagline}</p>
          <div class="card-footer">
            <ol class="tags">
              ${this.getTagsHTML()}
            </ol>
          </div>
        </div>
        <div id="contactBtn" class="btn link">
          <a href="#">Contactez-moi</a>
        </div>
        <a class="card__photographer-link" href="./photographer/${this.id}">
          <img class="card__photographer-linkImg" src="../assets/img/Photographers/${this.firstname}.jpg" alt="Profil photo of ${this.name}" />
        </a>
      </section>
      <section class="dropdown">
        <p class="dropdownText">Trier par</p>
        <div id="dropdownContent" class="dropdownContent">
          <div class="dropdownContent-item">
            <a href="#">Popularité</a>
            <i class="fas fa-angle-up"></i>
          </div>
          <div class="dropdownContent-item">
            <a href="#">Date</a>
          </div>
          <div class="dropdownContent-item">
            <a href="#">Titre</a>
          </div>
        </div>
      </section>
      <section class="pictureList">

      ${this.getPhotosHTML()}

      </section>
      <aside class="photographerInfo">
        <div id="totalLikes" class="photographerInfo-likes" data-likes=${this.likes}>
          <i class="fas fa-heart" aria-hidden="true"></i>
        </div>
        <div class="photographerInfo-prices">
          <span class="prices">${this.price}</span>
        </div>
      </aside>
      <dialog id="modalContact" class="modalContact">
        <form id="modalContact-form" name="formContact" class="modalContact-form" >
          <h1>Contactez-moi<br />${this.name}</h1>
          <button id="closeModal" class="close" title="Close Contact modal">
            <i class="fa fa-times"></i>
          </button>
          <div 
            class="modalContact-item"
            data-error="Veuillez saisir 2 caractères minimum"
            data-error-visible="false">
            <label for="firstname" class="modalContact-label">Prénom</label>
            <input 
              id="firstname" 
              type="text" 
              class="modalContact-input">
          </div>
          <div 
            class="modalContact-item"
            data-error="Veuillez saisir 2 caractères minimum"
            data-error-visible="false">
            <label for="lastname" class="modalContact-label">Nom</label>
            <input 
              id="lastname" 
              type="text" 
              class="modalContact-input">
          </div>
          <div 
            class="modalContact-item"
            data-error="Cette adresse n'est pas valide"
            data-error-visible="false">
            <label for="email" class="modalContact-label">Email</label>
            <input 
              id="email" 
              type="email" 
              class="modalContact-input">
          </div>
          <div 
            class="modalContact-item"
            data-error="Votre message est vide ou dépasse 500 caratères"
            data-error-visible="false">
            <label for="message" class="modalContact-label">Message</label>
            <textarea 
              id="message" 
              type="text" 
              class="modalContact-input">
            </textarea>
          </div>
          <div class="modalContact-item">
            <input id="submitBtn" class="btn submit" type="submit" value="Envoyer">
          </div>
        </form>
      </dialog>
    </main>
    <script type="module" src="../dist/photographer.js"></script>
    `

    photographerWrapper.innerHTML = photographerDOM
  }

  getLikes () {
    const photos = new Photos()
    let photographerPhotos = photos.getPhotoByPhotographerId(this.id)
    let likesCounter = 0

    for (const item of photographerPhotos) {
      let likeNum = item.likes
      likesCounter += likeNum
    }
    return likesCounter
  }
}
