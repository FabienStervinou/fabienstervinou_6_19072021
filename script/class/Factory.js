import Video from './Video.js'
import Photo from './Photo.js'
import ErrorMesssage from './ErrorMesssage.js'

export default function Factory () {
  this.generate = (media) => {
    let array = []

    if (media.image) {
      let photo = new Photo(media)
      array.push(photo)
      return array
    } else if (media.video) {
      let video = new Video(media)
      array.push(video)
      return array
    } else {
      return new ErrorMesssage('Type de fichier inconnu')
    }
  }
}
