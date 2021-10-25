import file from '../../data.json'

export default class Tags {

  constructor() {
    this.medias = file.media;
    this.allTags = [];
  }

  init() {
    this.allTags = this.getAllTags();
    this.setHTMLTags();
  }

  getAllTags() {
    let tagsArray = [];

    for (let i = 0; i < this.medias.length; i++) {
      const element = this.medias[i];
      if (tagsArray.indexOf(`${element.tags[0]}`) === -1) {
        tagsArray.push(element.tags[0])
      }
    }
    return tagsArray;
  }

  setHTMLTags() {
    let tags = this.allTags;
    let target = document.getElementById('tags');
    let res = tags.map(tag => `
    <li id="${tag}" class="tags_item" data-active="false">
      <a id="tag_${tag}">${tag}</a> 
    </li>
    `).join('');
    target.innerHTML += res;
  }
}
