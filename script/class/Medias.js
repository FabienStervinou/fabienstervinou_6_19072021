import data from '../../data.json'
import Factory from './Factory.js'

export default class Medias {
  constructor () {
    this.datas = data.media
  }

  getMediaByPhotographerId (id) {
    let result = []
    let factory = new Factory()

    this.datas.forEach(media => {
      if (media.photographerId === id) {
        result.push(factory.generate(media))
      }
    })
    return result
  }

  getMediaByPhotographerIdTag (id, tags) {
    let result = []
    let factory = new Factory()

    if (tags) {
      this.datas.forEach(media => {
        if (media.photographerId === id) {
          for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]
            if (media.tags.includes(tag)) {
              result.push(factory.generate(media))
            }
          }
        }
      })
    }
    return result
  }
}
