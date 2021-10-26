import file from '../../data.json'

export default class Data {
  constructor () {
    this.photographers = file.photographers
    this.medias = file.media
  }

  getAllTags () {
    let data = this.photographers
    let result = []

    for (let i = 0; i < data.length; i++) {
      const photographer = data[i].tags

      for (let i = 0; i < photographer.length; i++) {
        const tag = photographer[i]
        result.push(tag)
      }
    }
  }

  getPhotographerByTag (tags) {
    let photographers = this.photographers
    let result = []

    if (tags != null) {
      for (const photographer of photographers) {
        if (tags.every((val) => photographer.tags.includes(val))) {
          result.push(photographer)
        }
      }
      return result
    }
  }
}
