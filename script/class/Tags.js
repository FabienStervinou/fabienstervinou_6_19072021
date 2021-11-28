import data from '../../data.json'

export default class Tags {
  constructor () {
    this.medias = data.media
    this.allTags = []
  }

  init () {
    this.allTags = this.getAllTags()
    this.setHTMLTags()
  }

  getAllTags () {
    const tagsArray = []

    for (let i = 0; i < this.medias.length; i++) {
      const element = this.medias[i]
      if (tagsArray.indexOf(`${element.tags[0]}`) === -1) {
        tagsArray.push(element.tags[0])
      }
    }
    return tagsArray
  }

  setHTMLTags () {
    const tags = this.allTags
    const target = document.getElementById('tags')

    if (target != null) {
      const res = tags.map(tag => `
        <li id="${tag}" class="tags_item" data-active="false" tabindex="0">
          <a id="tag_${tag}">${tag}</a> 
        </li>
      `).join('')
      target.innerHTML = res
    }
  }
}
