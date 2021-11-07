let searchParams = new URLSearchParams(window.location.search)

if (searchParams.get('page') === 'photographer') {
  // DOM Elmement
  const modalContact = document.getElementById('modalContact')
  const contactBtn = document.getElementById('contactBtn')
  const closeBtn = document.getElementById('closeModal')

  contactBtn.addEventListener('click', openModalContact)
  closeBtn.addEventListener('click', closeModalContact)

  // init oly of modal is open and remove eventlister on close
  let submitBtn = document.getElementById('submitBtn')
  submitBtn.addEventListener('click', submitFormContact)

  function openModalContact () {
    modalContact.style.display = 'block'
  }

  /**
   *
   * @param {Event} e
   */
  function closeModalContact (e) {
    e.preventDefault()
    modalContact.style.display = 'none'
  }

  /**
   *
   * @param {Event} e
   * @returns Boolean isValidate
   */
  function submitFormContact (e) {
    e.preventDefault()

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
      document.forms.formContact.submit()
    }

    return isValidate
  }

  const dropdown = document.getElementById('dropdownContent')
  const filterArrow = document.getElementsByClassName('fa-angle-up')
  filterArrow[0].addEventListener('click', toggleFiltersOpen)

  function toggleFiltersOpen () {
    dropdown.classList.toggle('open')
  }

  // Like counter
  const counters = document.getElementsByClassName('pictureItem-contentSocial')
  for (const counter of counters) {
    counter.addEventListener('click', toggleCounter)
  }

  function toggleCounter (e) {
    let childrens = []
    let childsNode = e.target.parentNode.childNodes

    for (const child of childsNode) {
      if (child.nodeType == Node.ELEMENT_NODE) {
        childrens.push(child)
      }
    }

    for (const item of childrens) {
      if (item.style.display == 'block') {
        item.style.display = 'none'
      } else {
        item.style.display = 'block'
      }
    }

    let parent = e.target.parentNode
    let parentData = parent.dataset
    let counter = e.target.parentNode.parentNode.querySelector('#counter').dataset
    let number = parseInt(counter.value, 10)

    if (parentData.liked == 'false') {
      parentData.liked = true
      let numberInc = ++number
      counter.value = numberInc
    } else {
      parentData.liked = false
      let numberDec = --number
      counter.value = numberDec
    }
  }
}
