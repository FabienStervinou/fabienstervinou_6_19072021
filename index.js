import './assets/sass/main.scss';
import Router from './js/Router.js';
// import Photographer from './js/Photographer.js';

let init = async () => {
  await fetch('./data.json', { mode: 'no-cors' })
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log("Error when fetching data", err))
}

init()

// Route logic
const router = new Router()

router.get('/', function(req) {
  console.log('Your on path : ', req.path)
  // run methods create photographer cards 
})

router.get('/photographer', function(req) {
  console.log('Your on path : ', req.path)
})

router.init()

// INSERT one time all photographer on home page
// INSERT one time all photo on photographer page
