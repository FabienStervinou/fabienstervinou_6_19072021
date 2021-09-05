/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (() => {

eval("// TODO: remove\nconsole.log('File init'); // DOM Elmement\n\nvar modalContact = document.getElementById('modalContact');\nvar contactBtn = document.getElementById('contactBtn');\nvar closeBtn = document.getElementById('close');\nvar submitBtn = document.getElementById('submitBtn');\ncontactBtn.addEventListener('click', openModalContact);\ncloseBtn.addEventListener('click', closeModalContact);\nsubmitBtn.addEventListener('click', submitFormContact);\n\nfunction openModalContact() {\n  modalContact.style.display = 'block';\n  console.log('Form click');\n}\n\nfunction closeModalContact() {\n  modalContact.style.display = 'none';\n  console.log('Form close');\n}\n\nfunction submitFormContact(e) {\n  e.preventDefault();\n  console.log('Form click'); // Input \n\n  var firstnameInput = document.getElementById('firstname');\n  var lastnameInput = document.getElementById('lastname');\n  var emailInput = document.getElementById('email');\n  var messageInput = document.getElementById('message'); // Regex\n\n  var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/;\n  var onlyLetterRegex = /[^a-zA-Z]/;\n  var isValidate = true;\n\n  if (firstnameInput.value.length < 2 || onlyLetterRegex.test(firstnameInput.value)) {\n    firstnameInput.parentNode.dataset.errorVisible = true;\n    isValidate = false;\n  } else {\n    firstnameInput.parentNode.dataset.errorVisible = false;\n  }\n\n  if (lastnameInput.value.length < 2 || onlyLetterRegex.test(lastnameInput.value)) {\n    lastnameInput.parentNode.dataset.errorVisible = true;\n    isValidate = false;\n  } else {\n    lastnameInput.parentNode.dataset.errorVisible = false;\n  }\n\n  if (emailRegex.test(emailInput.value) == false) {\n    emailInput.parentNode.dataset.errorVisible = true;\n    isValidate = false;\n  } else {\n    emailInput.parentNode.dataset.errorVisible = false;\n  }\n\n  if (messageInput.value.length <= 0 || messageInput.value.length > 500) {\n    messageInput.parentNode.dataset.errorVisible = true;\n    isValidate = false;\n  } else {\n    messageInput.parentNode.dataset.errorVisible = false;\n  }\n\n  if (isValidate == true) {\n    document.forms[\"formContact\"].submit();\n  }\n\n  return isValidate;\n}\n\n//# sourceURL=webpack://fisheye/./pages/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./pages/index.js"]();
/******/ 	
/******/ })()
;