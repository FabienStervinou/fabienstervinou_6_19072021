import file from '../../data.json'

export default class Data {

  constructor() {
    this.photographers = file.photographers;
    this.medias = file.media;
  }

  getAllTags() {
    var data = this.photographers;
    var result = [];

    for (let i = 0; i < data.length; i++) {
      const photographer = data[i].tags;
      for (let i = 0; i < photographer.length; i++) {
        const tag = photographer[i];
        result.push(tag)
      }
    }
  }
}
