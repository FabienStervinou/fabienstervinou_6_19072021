import data from '../../data.json'
import Factory from './Factory.js'

export default class Medias {
  constructor () {
    this.datas = data.media
  }

  getMediaByPhotographerId (id) {
    let result = []
    let factory = new Factory()

    this.datas.forEach(photo => {
      if (photo.photographerId === id) {
        result.push(factory.generate(photo)[0])
      }
    })
    return result
  }

  getMediaByPhotographerIdTag (id, tags) {
    let result = []

    if (tags) {
      this.datas.forEach(media => {
        if (media.photographerId === id) {
          for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]

            if (media.tags.includes(tag)) {
              result.push(media)
            }
          }
        }
      })
    }
    return result
  }
}
