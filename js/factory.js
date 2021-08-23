import Video from './Video.js';
import Photo from './Photo.js';
import ErrorMesssage from './ErrorMesssage.js';

export default class Factory {
  constructor(data) {
    if (data.type === 'image') {
      return new Photo(data);
    } else if (data.type === 'video') {
      return new Video(data);
    } else {
      return new ErrorMesssage('Type de fichier inconnu')
    }
  }
}
