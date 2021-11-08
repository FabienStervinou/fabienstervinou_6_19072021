import file from '../../data.json'

export default class Photos {
  constructor () {
    this.datas = file.media
  }

  getPhotoByPhotographerId (id) {
    let result = []

    this.datas.forEach(photo => {
      if (photo.photographerId === id) {
        result.push(photo)
      }
    })
    return result
  }

  // TODO: use filter method
  getPhotoByPhotographerIdTag (id, tags) {
    let result = []

    if (tags) {
      this.datas.forEach(photo => {
        if (photo.photographerId === id) {
          for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]

            if (photo.tags.includes(tag)) {
              result.push(photo)
            }
          }
        }
      })
    }
    return result
  }
}
