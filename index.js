import './assets/sass/main.scss'
import Data from './script/utils/Data.js'
import Photographer from './script/class/Photographer.js'
import Photos from './script/class/Photos.js'
import Tags from './script/class/Tags.js'

/*  Route logic
    /
    /:tag
    /photographer/:id/:tag
*/
let url = window.location
let paramsString = window.location.search
let searchParams = new URLSearchParams(paramsString)

function initHomePage () {
  try {
    let data = new Data()
    document.querySelector('.cards').innerHTML = ''

    for (let i = 0; i < data.photographers.length; i++) {
      const item = data.photographers[i]
      let photographer = new Photographer(item)
      photographer.generateCardDOM()
    }
  } catch (error) {
    console.error(error)
  }
}

// home
if ((searchParams.get('page') === 'home' && url.pathname === '/') || searchParams.get('page') == null) {
  const tags = new Tags()
  tags.init()

  initHomePage()
}

// photographer/:id
if (searchParams.get('page') === 'photographer' && searchParams.get('id') != null) {
  try {
    let data = new Data()
    const paramsId = searchParams.get('id')
    const result = data.photographers.filter(photographer =>
      photographer.id == paramsId
    )

    if (result.length > 0) {
      const photographer = new Photographer(result[0])
      photographer.generatePhotographerDOM()

      const photos = new Photos()
      photos.getPhotoByPhotographerId(parseInt(paramsId, 10))
    }
  } catch (error) {
    console.error(error)
  }
}

// :tag
// if (sessionStorage.getItem('tag') === undefined) {
//   let tagData = new Data()
//   tagData.getAllTags()
// }

/**
 *
 * @param {String} tag
 */
function toggleTagActive () {
  let localTags = JSON.parse(sessionStorage.getItem('tag'))
  if (localTags != null && localTags.length > 0) {
    console.log('toggleTagActive')
    for (let i = 0; i < localTags.length; i++) {
      let localTag = localTags[i]
      let tags = document.querySelectorAll(`#${localTag}`)
      for (let i = 0; i < tags.length; i++) {
        const element = tags[i]
        console.log(element)
        if (element.dataset.active == 'true') {
          element.dataset.active = 'false'
        } else if (element.dataset.active == 'false') {
          element.dataset.active = 'true'
        }
      }
    }
  }
}

function togglePhotographerCard () {
  let localTags = JSON.parse(sessionStorage.getItem('tag'))
  let data = new Data()
  let photographerByTags = data.getPhotographerByTag(localTags)

  document.querySelector('.cards').innerHTML = ''

  if (photographerByTags != undefined) {
    for (const photographer of photographerByTags) {
      let photographerToPush = new Photographer(photographer)
      photographerToPush.generateCardDOM()
    }
  } else {
    for (const photographer of data.photographers) {
      let photographerToPush = new Photographer(photographer)
      photographerToPush.generateCardDOM()
    }
  }
  setEventTags()
}

/**
 *
 * @param {Event} e
 */
function onClickTag (e) {
  console.log('onClickTag')
  let tag = e.target
  let tagLabel = tag.id.split('_')[1]
  let tagsLocal = JSON.parse(sessionStorage.getItem('tag'))
  let res = []

  // Add new tag and create sessionStorage
  if (tagsLocal == undefined || tagsLocal.length == 0) {
    res.push(tagLabel)
    sessionStorage.setItem('tag', JSON.stringify(res))
    // Remove single tag
  } else if (tagsLocal.length == 1 && tagsLocal.toString() == tagLabel) {
    initHomePage()
    sessionStorage.removeItem('tag')
    // Multiple tag
  } else if (tagsLocal.length >= 1 && !tagsLocal.includes(tagLabel)) {
    tagsLocal.push(tagLabel)
    sessionStorage.setItem('tag', JSON.stringify(tagsLocal))
  } else {
    tagsLocal.splice(tagsLocal.indexOf(tagLabel), 1)
    sessionStorage.setItem('tag', JSON.stringify(tagsLocal))
  }
}

// Set EventListener on all tags
function setEventTags () {
  let tags = document.getElementsByClassName('tags_item')
  console.log('setEventTags')
  const test = new Tags()
  test.init()

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i]
    let eventTags = function (e) {
      onClickTag(e)
      togglePhotographerCard()
    }
    tag.removeEventListener('click', eventTags)
    tag.addEventListener('click', eventTags)
  }
  toggleTagActive()
}

function toggleTagDataAttribute () {
  let tagsArray = JSON.parse(sessionStorage.getItem('tag'))

  if (tagsArray != null) {
    for (let i = 0; i < tagsArray.length; i++) {
      const tagItem = tagsArray[i]
      document.querySelectorAll(`#${tagItem}`).forEach(element => {
        element.dataset.active = true
      })
    }
  }
}

// If tag in sessionStorage set data-active to TRUE
setEventTags()
toggleTagDataAttribute()
