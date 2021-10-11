import Photographer from '../script/class/Photographer';
import Data from '../script/utils/Data';

let initDataPhotographer = async () => {
  await fetch('../data.json', { mode: 'no-cors' })
  .then((res) => res.json())
  .then((res) => {

    // TEST
    let datas = new Data(res)
    datas.showData();

    for (let i = 0; i < res.photographers.length; i++) {
      const item = res.photographers[i]
      let photographer = new Photographer(item)
      photographer.generatePhotographerDOM()
    }
  })
  .catch((err) => console.log("Error when fetching data", err))
}

initDataPhotographer();

// DOM Elmement
let modalContact = document.getElementById('modalContact')
let contactBtn = document.getElementById('contactBtn')
let closeBtn = document.getElementById('close')
let submitBtn = document.getElementById('submitBtn')

// contactBtn.addEventListener('click', openModalContact)
// closeBtn.addEventListener('click', closeModalContact)
// submitBtn.addEventListener('click', submitFormContact)

function openModalContact() {
  modalContact.style.display = 'block'
  console.log('Form click')
}

function closeModalContact() {
  modalContact.style.display = 'none'
  console.log('Form close')
}

function submitFormContact(e) {
  e.preventDefault()

  console.log('Form click')

  // Input 
  let firstnameInput = document.getElementById('firstname')
  let lastnameInput = document.getElementById('lastname')
  let emailInput = document.getElementById('email')
  let messageInput = document.getElementById('message')

  // Regex
  let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  let onlyLetterRegex = /[^a-zA-Z]/

  let isValidate = true

  if (firstnameInput.value.length < 2 || onlyLetterRegex.test(firstnameInput.value)) {
    firstnameInput.parentNode.dataset.errorVisible = true
    isValidate = false
  } else {
    firstnameInput.parentNode.dataset.errorVisible = false
  }

  if (lastnameInput.value.length < 2 || onlyLetterRegex.test(lastnameInput.value)) {
    lastnameInput.parentNode.dataset.errorVisible = true
    isValidate = false
  } else {
    lastnameInput.parentNode.dataset.errorVisible = false
  }

  if (emailRegex.test(emailInput.value) == false) {
    emailInput.parentNode.dataset.errorVisible = true
    isValidate = false
  } else {
    emailInput.parentNode.dataset.errorVisible = false
  }

  if (messageInput.value.length <= 0 || messageInput.value.length > 500) {
    messageInput.parentNode.dataset.errorVisible = true
    isValidate = false
  } else {
    messageInput.parentNode.dataset.errorVisible = false
  }

  if (isValidate == true) {
    document.forms["formContact"].submit()
  }

  return isValidate
}