import file from '../../data.json'

export default class Photos {
  constructor() {
    this.datas = file.media;
    console.log('datas :', this.datas);
  }

  getPhotoByPhotographerId(id) {
    let result = []
    this.datas.forEach(photo => {
      if (photo.photographerId === id) {
        result.push(photo)
      }
    });
    return result;
  }
}
