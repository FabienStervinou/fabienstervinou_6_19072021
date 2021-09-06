import './assets/sass/main.scss';
import Router from './js/Router.js';
import Photographer from './js/Photographer.js';

let init = async () => {
  await fetch('./data.json', { mode: 'no-cors' })
  .then((res) => res.json())
  .then((res) => {
    for (let i = 0; i < res.photographers.length; i++) {
      const item = res.photographers[i]
      let photographer = new Photographer(item)
      photographer.generateCardDOM()
      console.log(item);
    }
  })
  .catch((err) => console.log("Error when fetching data", err))
}

// Route logic
const router = new Router()

router.get('/', function(req) {
  console.log('Your on path : ', req.path)
})

// TODO: FIX URL REQUEST
router.get('/pages/photographer.html', function(req) {
  console.log('Your on path : ', req.path)
})

router.get('/photographer/:id', function(req) {
  console.log('Your on path : ', req.path)
})

// Catch request URL params / generate photographer pages by the ID
// router.get(`/photographer/${this.id}`, function(req) {
//   console.log('Your on path : ', req.path)
// })

router.init() 
init()

// INSERT one time all photographer on home page
// INSERT one time all photo on photographer page
