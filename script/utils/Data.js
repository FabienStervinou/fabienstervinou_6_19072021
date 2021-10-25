import file from '../../data.json'

export default class Data {

  constructor() {
    this.photographers = file.photographers;
    this.medias = file.media;
  }

  getAllTags() {
    let data = this.photographers;
    let result = [];

    for (let i = 0; i < data.length; i++) {
      const photographer = data[i].tags;
      for (let i = 0; i < photographer.length; i++) {
        const tag = photographer[i];
        result.push(tag)
      }
    }
  }

  getUniqueData(array){
    var uniqueArray = [];
    
    for(let i = 0; i < array.length; i++){
      if(uniqueArray.indexOf(array[i]) === -1) {
          uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  getPhotographerByTag(tag) {
    let data = this.photographers;
    let result = [];

    for (let i = 0; i < data.length; i++) {
      const photographer = data[i];

      for (let i = 0; i < tag.length; i++) {
        const tagtest = tag[i];

        if (photographer.tags.indexOf(tagtest) != -1) {
          result.push(photographer);
        }
      }
    }
    return this.getUniqueData(result);
  }
}
