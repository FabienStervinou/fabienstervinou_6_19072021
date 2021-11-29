import Data from '../script/utils/Data.js'
import Photographer from '../script/class/Photographer.js'

let searchParams = new URLSearchParams(window.location.search)
const eventMode = ['click', 'keypress']

if (searchParams.get('page') === 'photographer' && searchParams.get('id')) {
  // Reset Session storage
  if (sessionStorage.getItem('tag') != undefined) {
    sessionStorage.removeItem('tag')
  }
  // DOM Element
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
    let tabs = document.querySelectorAll('[tabindex="0"]')
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      tab.tabIndex = -1
    }

    closeBtn.focus()
  }

  /**
   *
   * @param {Event} e
   */
  function closeModalContact (e) {
    e.preventDefault()
    modalContact.style.display = 'none'
    let tabs = document.querySelectorAll('[tabindex="-1"]')
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      tab.tabIndex = 0
    }
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

  // Close modal if user click outside form
  window.document.getElementById('modalContact').onclick = function (e) {
    if (e.target == document.getElementById('modalContact')) {
      closeModalContact(e)
    }
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

  /**
   *
   * @param {Event} e
   */
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
    let totalLikes = document.getElementById('totalLikes').dataset
    let totalLikesNum = parseInt(totalLikes.likes, 10)

    if (parentData.liked == 'false') {
      parentData.liked = true
      let numberInc = ++number
      counter.value = numberInc
      let totalInc = ++totalLikesNum
      totalLikes.likes = totalInc
    } else {
      parentData.liked = false
      let numberDec = --number
      counter.value = numberDec
      let totalDes = --totalLikesNum
      totalLikes.likes = totalDes
    }
  }

  // UTILS
  function setFlexOrder (array) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      element.card.style.order = i
    }
  }

  // FILTER
  function initFilterListener () {
    let tags = document.querySelectorAll('.tags_item')
    let filters = document.querySelectorAll('.dropdownContent-item a')

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      tag.addEventListener('click', onClickTag)
    }

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i]
      filter.addEventListener('click', onClickFilter)
    }
  }

  function onClickTag (e) {
    let tag = e.target.id.split('_')[1]
    let tagsLocal = JSON.parse(sessionStorage.getItem('tag'))
    let res = []

    // Add new tag and create sessionStorage
    if (tag != null) {
      if (tagsLocal == undefined || tagsLocal.length == 0) {
        res.push(tag)
        sessionStorage.setItem('tag', JSON.stringify(res))
        // Remove single tag
      } else if (tagsLocal.length == 1 && tagsLocal.toString() == tag) {
        sessionStorage.removeItem('tag')
        // Multiple tag
      } else if (tagsLocal.length >= 1 && !tagsLocal.includes(tag)) {
        tagsLocal.push(tag)
        sessionStorage.setItem('tag', JSON.stringify(tagsLocal))
      } else {
        tagsLocal.splice(tagsLocal.indexOf(tag), 1)
        sessionStorage.setItem('tag', JSON.stringify(tagsLocal))
      }
    }

    pictureFilterBy('tag', JSON.parse(sessionStorage.getItem('tag')))
  }

  function onClickFilter (e) {
    pictureFilterBy('filter', e.target.dataset.filter)

    // Manage active class
    let filters = document.querySelectorAll('a[data-filter]')
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i]
      if (filter.classList.contains('active')) {
        filter.classList.toggle('active')
      }
    }
    e.target.classList.toggle('active')
  }

  /**
   *
   * @param {String} key - tag || filter
   * @param {Array, String} value
   */
  function pictureFilterBy (key, value) {
    let id = searchParams.get('id')
    let data = new Data()
    const result = data.photographers.filter(photographer =>
      photographer.id == id
    )
    const photographer = new Photographer(result[0])
    // By tag
    if (key && key == 'tag') {
      if (value) {
        photographer.getPhotosHTMLByTag(value)
      }
      if (value == null) {
        let target = document.querySelector('.pictureList')
        const res = photographer.getPhotosHTML()
        target.innerHTML = res
      }
    }

    // By dropdow filter
    if (key && key == 'filter') {
      let objs = []
      let photoCards = document.querySelectorAll('.pictureList > article')
      for (let i = 0; i < photoCards.length; i++) {
        const photoCard = photoCards[i]
        let res = {
          card: photoCard,
          title: photoCard.dataset.title,
          likes: photoCard.dataset.likes,
          date: photoCard.dataset.date
        }
        objs.push(res)
      }

      switch (value) {
        case 'popularity':
          let popularityList = objs.sort((a, b) => b.likes - a.likes)
          setFlexOrder(popularityList)
          break

        case 'date':
          let dateList = objs.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })
          setFlexOrder(dateList)
          break

        case 'title':
          let titleList = objs.sort((a, b) => {
            let aa = a.title
            let bb = b.title
            return (aa < bb) ? -1 : (aa > bb) ? 1 : 0
          })
          setFlexOrder(titleList)
          break
      }
    }
  }

  initFilterListener()

  // PICTURE SLIDESHOW
  let pictures = document.querySelectorAll('.pictureItem-img')
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i]
    picture.addEventListener('click', onClickPicture)
  }

  function onClickPicture (e) {
    e.preventDefault()
    let target = e.target
    createPictureSlideshow(target)
  }

  function closePictureSlideshow (e) {
    // tabIndex
    let tabsModalClose = document.querySelectorAll('[tabindex="-1"]')
    for (let i = 0; i < tabsModalClose.length; i++) {
      const tab = tabsModalClose[i]
      tab.tabIndex = 0
    }

    let slideshowContainer
    if (e != undefined && e != null) {
      slideshowContainer = e.target.parentNode.parentNode
      return slideshowContainer.remove()
    } else {
      slideshowContainer = document.querySelector('.modalPicture')
      return slideshowContainer.remove()
    }
  }

  function onClickArrow (e) {
    if (e.type == 'click' || e.keyCode == 13) {
      let index = this
      let arrowDir = e.target.parentNode.className.split(' ')[1].split('-')[1]

      let activePicture = document.querySelector('.pictureItem.active')
      let nextPicture = activePicture.nextElementSibling
      let previousPicture = activePicture.previousElementSibling

      let limitIndex = document.querySelectorAll('.modalPicture .pictureItem').length
      let actualIndex = parseInt(activePicture.dataset.index) + 1

      // Right arrow
      if (arrowDir == 'right' && index >= 0 && actualIndex <= limitIndex - 1) {
        activePicture.classList.toggle('active')
        activePicture.style.display = 'none'
        nextPicture.classList.toggle('active')
        nextPicture.style.display = 'block'
      }

      // Left arrow
      if (arrowDir == 'left' && actualIndex >= 2) {
        actualIndex--
        activePicture.classList.toggle('active')
        activePicture.style.display = 'none'
        previousPicture.classList.toggle('active')
        previousPicture.style.display = 'block'
      }

      // Set video controls attribute
      let video = document.querySelector('.pictureItem.active .pictureItem-img video')
      if (video != null) {
        video.setAttribute('controls', true)
      }
    }
  }

  function createPictureSlideshow (target) {
    let dialog = document.createElement('dialog')
    let htmlTarget = target.parentNode.parentNode.parentNode
    const arrowsHTML = `
      <div class="modalPicture-close">
        <i class="fas fa-times" tabindex="-2"></i>
      </div>
      <div class="arrow arrow-left">
        <i class="fas fa-angle-left" tabindex="-2"></i>
      </div>
      <div class="arrow arrow-right">
        <i class="fas fa-angle-right" tabindex="-2"></i>
      </div>
    `

    dialog.className = 'modalPicture'
    htmlTarget.insertAdjacentElement('beforebegin', dialog)
    dialog.innerHTML += arrowsHTML
    dialog.tabIndex = -2

    // Render picture target
    let picture = document.querySelector('.pictureList').children
    for (let i = 0; i < picture.length; i++) {
      const item = picture[i]
      let clone = item.cloneNode(true)
      clone.style.display = 'none'
      dialog.appendChild(clone)
    }

    // let targetHTML = target.parentNode.parentNode
    let targetIndex = parseInt(target.parentNode.parentNode.dataset.index)
    let dialogPictures = dialog.querySelectorAll('.pictureItem')
    let dialogTarget = dialogPictures[targetIndex]
    dialogTarget.style.display = 'block'
    dialogTarget.className += ' active'

    // Arrow logic -> Specific for first and last item
    let arrows = document.querySelectorAll('.arrow')
    for (let i = 0; i < arrows.length; i++) {
      const arrow = arrows[i]
      eventMode.forEach(ev => {
        arrow.addEventListener(ev, onClickArrow.bind(targetIndex), false)
      })
    }

    // close logic -> remove dialog <HTMLElement>
    const closeButton = document.querySelector('.modalPicture-close')
    eventMode.forEach(ev => {
      closeButton.addEventListener(ev, closePictureSlideshow)
    })

    // Tabindex
    let tabs = document.querySelectorAll('[tabindex="0"]')
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      tab.tabIndex = -1
    }

    let tabsModal = document.querySelectorAll('[tabindex="-2"]')
    for (let i = 0; i < tabsModal.length; i++) {
      const tab = tabsModal[i]
      tab.tabIndex = 0
    }
  }
}
