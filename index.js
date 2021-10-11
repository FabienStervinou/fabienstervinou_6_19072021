import './assets/sass/main.scss';
import Data from './script/utils/Data.js';
import Photographer from './script/class/Photographer.js';
import Photos from './script/class/Photos.js';

/*  Route logic
    /                       OK
    /:tag
    /photographer
    /photographer/:id       OK
    /photographer/:id/:tag
*/
let url = window.location;
let paramsString = window.location.search;
let searchParams = new URLSearchParams(paramsString);

console.log('url :', url.href);

if ((searchParams.get('page') === 'home' && url.pathname === "/") || searchParams.get('page') == null ) { 
  try {
    let data = new Data();

    console.log('data: ', data);

    for (let i = 0; i < data.photographers.length; i++) {
      const item = data.photographers[i];
      let photographer = new Photographer(item);
      photographer.generateCardDOM();
    }

  } catch (error) {
    console.error(error);
  }
}

// /photographer/:id
if (searchParams.get('page') == 'photographer' && searchParams.get('id') != null) {
  try {
    let data = new Data();
    const paramsId = searchParams.get('id');
    const result = data.photographers.filter(photographer => 
      photographer.id == paramsId
    );

    if (result.length > 0) {
      const photographer = new Photographer(result[0]);
      photographer.generatePhotographerDOM();

      const photos = new Photos()
      photos.getPhotoByPhotographerId(parseInt(paramsId, 10))
    }

  } catch (error) {
    console.error(error);
  }
}

// /:tag
if (searchParams.get('tag') != null ) {
  let tags = document.getElementById("tags");
  console.log(tags);
  let tagData = new Data();
  tagData.getAllTags()
}

// TAG logic
function addTagInUrlParam(e) {
  let tag = e.target
  let tagLabel = tag.id.split('_')[1];
  let urlToPush = `&tag=${tagLabel}`;
  
  window.location.href += urlToPush;

  // Toggle data-active
  if (tag.parentNode.dataset.active == "true") {
    tag.parentNode.dataset.active="false"
  } else {
    tag.parentNode.dataset.active="true"
  }
}

let tags = document.getElementsByClassName('tags_item');

for (let i = 0; i < tags.length; i++) {
  const tag = tags[i];
  tag.addEventListener('click', addTagInUrlParam)
}
