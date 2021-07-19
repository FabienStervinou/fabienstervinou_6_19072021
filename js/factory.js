import Video from './Video';
import Photo from './Photo';
import ErrorMesssage from './ErrorMesssage';

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
