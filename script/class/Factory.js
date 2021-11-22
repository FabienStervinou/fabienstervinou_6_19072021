import Video from './Video.js'
import Photo from './Photo.js'
import ErrorMesssage from './ErrorMesssage.js'

export default function Factory () {
  this.generate = (media) => {
    if (media.image) {
      let photo = new Photo(media)
      return photo
    } else if (media.video) {
      let video = new Video(media)
      return video
    } else {
      return new ErrorMesssage('Type de fichier inconnu')
    }
  }
}
