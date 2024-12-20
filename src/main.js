/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/config.js":
/*!*******************************!*\
  !*** ./src/scripts/config.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QUESTION_DATA_PATH: () => (/* binding */ QUESTION_DATA_PATH)
/* harmony export */ });
const QUESTION_DATA_PATH = '../data.json'


/***/ }),

/***/ "./src/scripts/controller.js":
/*!***********************************!*\
  !*** ./src/scripts/controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./src/scripts/model.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/scripts/config.js");
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./src/scripts/helper.js");
/* harmony import */ var _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/optionsView.js */ "./src/scripts/views/optionsView.js");
/* harmony import */ var _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/questionView.js */ "./src/scripts/views/questionView.js");
/* harmony import */ var _views_resultsView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/resultsView.js */ "./src/scripts/views/resultsView.js");
/* harmony import */ var _views_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/View.js */ "./src/scripts/views/View.js");









const view = new _views_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]()

const controlSelectTopic = async function (topic) {
  try {
    //Get quiz topic
    await _model_js__WEBPACK_IMPORTED_MODULE_0__.getQuizData(+topic)
    _model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress = 0
    controlQuiz(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress)
  } catch (error) {
    console.error(error)
  }
}

const controlQuiz = function () {
  try {
    if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === null) return
    if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === _model_js__WEBPACK_IMPORTED_MODULE_0__.state.quiz.questions.length) {
      controlRenderResult()
      return
    }

    //Set current question&options, render, update progress bar

    _model_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentQA()
    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)

    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].updateProgressBar(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)

    //Render options
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
  } catch (error) {
    console.error(error)
  }
}

const controlRenderResult = function () {
  try {
    _views_resultsView_js__WEBPACK_IMPORTED_MODULE_5__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
  } catch (error) {
    console.error(error)
  }
}
const controlValidateAnswer = function () {
  const answers = _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers
  if (answers.answered) return
  if (!answers.selected[2]) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderError()
    return
  }
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.validateAnswer()) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses()
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], 'picked-correct')
  } else {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses()
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], 'picked-incorrect')
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.right[0], 'picked-correct')
  }

  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderCorrectAnswer(answers.selected[0], answers.right[0])
}

const controlSelectOption = function (answer, option) {
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === null || _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.answered) return
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.selected[2] = true

  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses()
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.setSelectedAnswer(option, answer)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(option, 'active')
}

const controlNextQuestion = function () {
  if (!_model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.answered) return

  controlQuiz()
}

const controlLightMode = function (colorMode = _model_js__WEBPACK_IMPORTED_MODULE_0__.state.theme) {
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.setColorMode(colorMode)
  view.setColorTheme(colorMode)
}

const controLoad = function () {
  ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.loadLocalStorage)(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
  controlQuiz()
  controlLightMode()
  init()
}

const init = function () {
  view.addHandlerLoad(controLoad)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectTopic(controlSelectTopic)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectOption(controlSelectOption)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerRenderSubmitAnswer(controlValidateAnswer)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerNextQuestion(controlNextQuestion)
  view.addHandlerChangeColorTheme(controlLightMode)
}

init()


/***/ }),

/***/ "./src/scripts/helper.js":
/*!*******************************!*\
  !*** ./src/scripts/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeCode: () => (/* binding */ escapeCode),
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   loadLocalStorage: () => (/* binding */ loadLocalStorage),
/* harmony export */   saveLocalStorage: () => (/* binding */ saveLocalStorage)
/* harmony export */ });
const getData = async function (url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {}
}

const escapeCode = function (string) {
  try {
    if (typeof string === 'string') {
      const escapeCharacter = ['<', '>', '&']
      const escapeMap = ['&lt;', '&gt;', '&amp;']

      return string
        .split('')
        .map(character => {
          if (escapeCharacter.indexOf(character) === -1) {
            return character
          } else {
            return (character =
              escapeMap[escapeCharacter.indexOf(character)])
          }
        })
        .join('')
    } else {
      return string
    }
  } catch (error) {}
}

const saveLocalStorage = function (data) {
  try {
    localStorage.setItem('state', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

const loadLocalStorage = function (object) {
  try {
    const savedState = JSON.parse(localStorage.getItem('state'))
    if (!savedState) return
    Object.assign(object, savedState)
  } catch (error) {
    console.error(error)
  }
}


/***/ }),

/***/ "./src/scripts/model.js":
/*!******************************!*\
  !*** ./src/scripts/model.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getQuizData: () => (/* binding */ getQuizData),
/* harmony export */   setCurrentQA: () => (/* binding */ setCurrentQA),
/* harmony export */   state: () => (/* binding */ state),
/* harmony export */   validateAnswer: () => (/* binding */ validateAnswer)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/scripts/helper.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/scripts/config.js");




const state = {
  quiz: {},
  currQuestion: '',
  currOptions: [],
  progress: null,
  optionsMap: ['A', 'B', 'C', 'D'],
  score: 0,
  answers: {
    selected: [0, '', false],
    right: [0, ''],
    answered: false,
  },
  theme: 'light', //true = light as default

  setQuiz(quiz) {
    this.quiz = quiz
  },

  setCurrQuestion() {
    this.currQuestion = this.quiz.questions[state.progress].question
  },

  setCurrOptions(options) {
    this.currOptions = state.quiz.questions[state.progress].options
  },

  setProgress() {
    this.progress += 1
  },

  setScore() {
    this.score += 1
  },

  setRightAnswer() {
    this.answers.right[1] = this.quiz.questions[state.progress].answer
    this.answers.right[0] = this.currOptions.findIndex(
      answer => answer === this.getRightAnswer(),
    )
  },

  setSelectedAnswer(option, answer) {
    this.answers.selected[0] = +option
    this.answers.selected[1] = answer
  },

  setAnswered(value) {
    this.answers.answered = state.answers.selected[2] = value

    console.log(this.answers.answered)
    console.log(this)
  },
  setColorMode(theme) {
    this.theme = theme
    ;(0,_helper__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(state)
    return this.theme
  },
  getRightAnswer() {
    return this.answers.right[1]
  },
}

const getQuizData = async function (topic) {
  const { quizzes } = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getData)(_config__WEBPACK_IMPORTED_MODULE_1__.QUESTION_DATA_PATH)
  state.setQuiz(quizzes[topic])
}

const setCurrentQA = function () {
  state.setCurrQuestion()
  state.setCurrOptions()
  state.setAnswered(false)
  ;(0,_helper__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(state)
}

const validateAnswer = function () {
  state.setRightAnswer()
  state.setProgress()
  state.setAnswered(true)
  ;(0,_helper__WEBPACK_IMPORTED_MODULE_0__.saveLocalStorage)(state)

  if (state.getRightAnswer() === state.answers.selected[1]) {
    state.setScore()
    return true
  } else {
    return false
  }
}


/***/ }),

/***/ "./src/scripts/views/View.js":
/*!***********************************!*\
  !*** ./src/scripts/views/View.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
class View {
  _data

  render(data) {
    console.log(data)
    if (!data) return
    this._data = data

    const markup = this._generateMarkup()

    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  update() {}

  renderError() {
    console.log('error')
  }

  clear() {
    this._parentElement.innerHTML = ''
  }

  addHandlerChangeColorTheme(handler) {
    const toggle = document.querySelector('.toggle')
    toggle.addEventListener('change', function (e) {
      const colorMode = toggle.checked ? 'dark' : 'light'
      handler(colorMode)
    })
  }

  setColorTheme(colorMode) {
    document.querySelector('.toggle').checked =
      colorMode === 'light' ? false : true
    document.body.classList.replace(
      `${colorMode === 'light' ? 'dark' : 'light'}-mode`,
      `${colorMode}-mode`,
    )
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', function (e) {
      handler()
    })
  }
}


/***/ }),

/***/ "./src/scripts/views/optionsView.js":
/*!******************************************!*\
  !*** ./src/scripts/views/optionsView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/scripts/views/View.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./src/scripts/helper.js");



class OptionsView extends _View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _parentElement = document.querySelector('.main__options')
  _btnElement
  _optionElement
  _selectedOption
  _allButtons
  _allOptions
  _data

  initElements() {
    this._allButtons = this._parentElement.querySelectorAll('.selection')
    this._allOptions = this._parentElement.querySelectorAll(
      '.selection-option',
    )
  }

  _generateMarkup() {
    return `
        ${this._data.currOptions
          .map((option, i) => {
            return `<button class="selection type-heading-s" data-option="${i}">
        <div
          class="selection-option selection-option--idle type-heading-s">
          ${this._data.optionsMap[i]}
        </div>
        ${(0,_helper__WEBPACK_IMPORTED_MODULE_1__.escapeCode)(option)}
      </button>`
          })
          .join()}
       <button class="btn btn-submit type-heading-s">Submit answer</button>`
  }

  resetClasses() {
    const defaultBtnClass = 'selection type-heading-s'
    const defaultOptionClass =
      'selection-option selection-option--idle type-heading-s'
    this._allButtons.forEach(btn => (btn.className = defaultBtnClass))
    this._allOptions.forEach(el => (el.className = defaultOptionClass))
  }

  toggleState(option, state) {
    this._allButtons[option].classList.toggle(`selection--${state}`)
    this._allOptions[option].classList.toggle(`selection-option--${state}`)
  }

  addHandlerSelectOption(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        this.initElements()
        this._btnElement = e.target.closest('.selection')
        this._optionElement = e.target.querySelector('.selection-option')

        if (!this._btnElement || !this._optionElement) return
        const option = this._btnElement.dataset.option
        const answer = this._btnElement.innerText.slice(2).trim()

        handler(answer, option)
      }.bind(this),
    )
  }

  renderCorrectAnswer(selectedOption, rightOption) {
    const selectedBtn = this._allButtons[selectedOption]
    const rightBtn = this._allButtons[rightOption]
    const submitBtn = document.querySelector('.btn-submit')

    rightBtn.insertAdjacentHTML(
      'beforeend',
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>`,
    )

    if (selectedOption != rightOption) {
      selectedBtn.insertAdjacentHTML(
        'beforeend',
        `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>`,
      )
    }
    this._allButtons.forEach(btn =>
      btn.classList.add('selection-disabled'),
    )
    if (this._data.progress <= 9) {
      submitBtn.innerText = 'Next Question'
      submitBtn.classList.replace('btn-submit', 'btn-next')
    }
    if (this._data.progress === 10) {
      submitBtn.innerText = 'See Final Score'
      submitBtn.classList.replace('btn-submit', 'btn-again')
    }
  }

  addHandlerSelectTopic(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const option = e.target.closest('.selection')
      if (!option) return
      const topic = +option.querySelector('.selection-option').dataset
        .topic
      if (!topic && topic !== 0) return
      handler(topic)
    })
  }

  addHandlerRenderSubmitAnswer(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const submitButton = e.target.closest('.btn-submit')

        if (!submitButton) return

        handler()
      }.bind(this),
    )
  }

  addHandlerNextQuestion(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const nextBtn =
        e.target.closest('.btn-next') || e.target.closest('.btn-again')
      if (!nextBtn) return
      nextBtn.addEventListener('click', function (e) {
        handler()
      })
    })
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new OptionsView());


/***/ }),

/***/ "./src/scripts/views/questionView.js":
/*!*******************************************!*\
  !*** ./src/scripts/views/questionView.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/scripts/views/View.js");


class QuestionView extends _View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _parentElement = document.querySelector('.main__question')
  _data

  _generateMarkup() {
    return `<div class="main__question-heading">
      <div class="main__question-sub-heading">
            <p class="type-body-s">Question ${this._data.progress + 1} of ${this._data.quiz.questions.length}</p>
          </div>    
            <h2 class="type-heading-l">
              ${this._data.currQuestion}
            </h2>
          </div>
          
          <div class="main__question-progress-bar">
            <div class="main__question-progress-bar-progress"></div>
          </div>`
  }

  updateProgressBar() {
    const progressBar = document.querySelector(
      '.main__question-progress-bar-progress',
    )

    const quizProgress =
      ((this._data.progress + 1) / this._data.quiz.questions.length) * 100

    progressBar.style.setProperty('width', `${quizProgress}%`)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new QuestionView());


/***/ }),

/***/ "./src/scripts/views/resultsView.js":
/*!******************************************!*\
  !*** ./src/scripts/views/resultsView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/scripts/views/View.js");


class ResultsView extends _View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _parentElement = document.querySelector('.main')
  _data

  _generateMarkup() {
    return `<div class="main__question">
          <div class="main__question-heading">
            <h2 class="type-heading-l">
            
              <span class="type-regular">Quiz completed</span>
              <br>
              You scored...
            </h2>
          </div>
        </div>
        <div class="main__result">
          <div class="main__result-heading">
            <div class="selection-option selection-option--${this._data.quiz.title.toLowerCase()}">
              <img
                src="${this._data.quiz.icon}"
                alt="${this._data.quiz.title} Icon" />
            </div>
            <h4 class="type-heading-s" class="main__result-heading">
              ${this._data.quiz.title}
            </h4>
          </div>
          <h1 class="type-display">${this._data.score}</h1>
          <div class="main__result-sub-heading">
            <p class="type-body-s">
              out of ${this._data.quiz.questions.length}
            </p>
          </div>
          <button></button>
        </div>`
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ResultsView());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/scripts/controller.js");


_controller__WEBPACK_IMPORTED_MODULE_0__.init()

// const toggleColorMode = document.querySelector('.toggle')
// const body = document.querySelector('body')
// const questionEl = document.querySelector('.main__question')
// const optionsEl = document.querySelector('.main__options')
// const progressBarEl = document.querySelector(
//   '.main__question-progress-bar',
// )

// const topicMap = {
//   html: 0,
//   css: 1,
//   js: 2,
//   accessibility: 3,
// }

// const optionsMap = ['A', 'B', 'C', 'D']

// let topicData = {}
// let questionCount = 0

// toggleColorMode.addEventListener('click', function () {
//   if (body.classList.contains('light-mode')) {
//     body.classList.replace('light-mode', 'dark-mode')
//   } else {
//     body.classList.replace('dark-mode', 'light-mode')
//   }
// })

// function escapeHtml(str) {
//   const escapeMap = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#039;',
//   }

//   // Replace any special characters with their corresponding HTML entity
//   return str.replace(/[&<>"']/g, function (match) {
//     return escapeMap[match]
//   })
// }

// const idTopic = function (e) {
//   const target = [...e.target.querySelector('.selection-option').classList]
//     .filter(el => el.startsWith('selection-option--'))
//     .toString()
//     .slice(18)
//   return target
// }

// const getData = async function (target) {
//   const response = await fetch('data.json')
//   const data = await response.json()
//   return data
// }

// const selectTopic = async function (e) {
//   //   if (questionCount > 0) return
//   const topicId = topicMap[idTopic(e)]
//   const { quizzes: quiz } = await getData()
//   topicData = quiz[topicId]
//   displayQuestions()
// }

// function setActiveState(e) {
//   if (questionCount === 0) return
//   if (e.target.tagName.toLowerCase() !== 'button') {
//     return
//   }
//   ;[...e.target.closest('div').querySelectorAll('button')].forEach(el =>
//     el.classList.remove('selection--active'),
//   )
//   e.target.classList.add('selection--active')
// }

// function displayQuestions() {
//   if (questionCount < topicData.questions.length) ++questionCount

//   const question = topicData.questions[questionCount - 1].question
//   const options = topicData.questions[questionCount - 1].options

//   questionEl.innerHTML = `
//   <div class="main__question-heading">
//     <h2 class="type-heading-l">
//       ${question}
//     </h2>
//   </div>
//   <div class="main__question-sub-heading">
//     <p class="type-body-s">Question ${questionCount} out of ${topicData.questions.length}</p>
//   </div>
//   <div class="main__question-progress-bar">
//     <div class="main__question-progress-bar-progress"></div>
//   </div>`

//   const optionsHTML = options.map(
//     (el, i) =>
//       (el = `<button class="selection type-heading-s">
//         <div
//           class="selection-option selection-option--idle type-heading-s">
//           ${optionsMap[i]}
//         </div>
//         ${escapeHtml(options[i])}

//       </button>`),
//   )
//   console.log(optionsHTML)
//   optionsEl.innerHTML = [...optionsHTML]
// }
// optionsEl.addEventListener('click', selectTopic)
// optionsEl.addEventListener('click', setActiveState)

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTjBDOztBQUUxQyw2Q0FBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZSxTQUFTLDJCQUEyQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvY29uZmlnLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL21vZGVsLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3MvVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL29wdGlvbnNWaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3MvcXVlc3Rpb25WaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3MvcmVzdWx0c1ZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBRVUVTVElPTl9EQVRBX1BBVEggPSAnLi4vZGF0YS5qc29uJ1xuIiwiaW1wb3J0ICogYXMgbW9kZWwgZnJvbSAnLi9tb2RlbC5qcydcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZy5qcydcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2hlbHBlci5qcydcbmltcG9ydCBvcHRpb25zVmlldyBmcm9tICcuL3ZpZXdzL29wdGlvbnNWaWV3LmpzJ1xuaW1wb3J0IHF1ZXN0aW9uVmlldyBmcm9tICcuL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcydcbmltcG9ydCByZXN1bHRzVmlldyBmcm9tICcuL3ZpZXdzL3Jlc3VsdHNWaWV3LmpzJ1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3cy9WaWV3LmpzJ1xuaW1wb3J0IHsgbG9hZExvY2FsU3RvcmFnZSB9IGZyb20gJy4vaGVscGVyJ1xuXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoKVxuXG5jb25zdCBjb250cm9sU2VsZWN0VG9waWMgPSBhc3luYyBmdW5jdGlvbiAodG9waWMpIHtcbiAgdHJ5IHtcbiAgICAvL0dldCBxdWl6IHRvcGljXG4gICAgYXdhaXQgbW9kZWwuZ2V0UXVpekRhdGEoK3RvcGljKVxuICAgIG1vZGVsLnN0YXRlLnByb2dyZXNzID0gMFxuICAgIGNvbnRyb2xRdWl6KG1vZGVsLnN0YXRlLnByb2dyZXNzKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cblxuY29uc3QgY29udHJvbFF1aXogPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBudWxsKSByZXR1cm5cbiAgICBpZiAobW9kZWwuc3RhdGUucHJvZ3Jlc3MgPT09IG1vZGVsLnN0YXRlLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgY29udHJvbFJlbmRlclJlc3VsdCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvL1NldCBjdXJyZW50IHF1ZXN0aW9uJm9wdGlvbnMsIHJlbmRlciwgdXBkYXRlIHByb2dyZXNzIGJhclxuXG4gICAgbW9kZWwuc2V0Q3VycmVudFFBKClcbiAgICBxdWVzdGlvblZpZXcucmVuZGVyKG1vZGVsLnN0YXRlKVxuXG4gICAgcXVlc3Rpb25WaWV3LnVwZGF0ZVByb2dyZXNzQmFyKG1vZGVsLnN0YXRlKVxuXG4gICAgLy9SZW5kZXIgb3B0aW9uc1xuICAgIG9wdGlvbnNWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xSZW5kZXJSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgcmVzdWx0c1ZpZXcucmVuZGVyKG1vZGVsLnN0YXRlKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cbmNvbnN0IGNvbnRyb2xWYWxpZGF0ZUFuc3dlciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYW5zd2VycyA9IG1vZGVsLnN0YXRlLmFuc3dlcnNcbiAgaWYgKGFuc3dlcnMuYW5zd2VyZWQpIHJldHVyblxuICBpZiAoIWFuc3dlcnMuc2VsZWN0ZWRbMl0pIHtcbiAgICBvcHRpb25zVmlldy5yZW5kZXJFcnJvcigpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG1vZGVsLnZhbGlkYXRlQW5zd2VyKCkpIHtcbiAgICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKVxuICAgIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKGFuc3dlcnMuc2VsZWN0ZWRbMF0sICdwaWNrZWQtY29ycmVjdCcpXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnNlbGVjdGVkWzBdLCAncGlja2VkLWluY29ycmVjdCcpXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5yaWdodFswXSwgJ3BpY2tlZC1jb3JyZWN0JylcbiAgfVxuXG4gIG9wdGlvbnNWaWV3LnJlbmRlckNvcnJlY3RBbnN3ZXIoYW5zd2Vycy5zZWxlY3RlZFswXSwgYW5zd2Vycy5yaWdodFswXSlcbn1cblxuY29uc3QgY29udHJvbFNlbGVjdE9wdGlvbiA9IGZ1bmN0aW9uIChhbnN3ZXIsIG9wdGlvbikge1xuICBpZiAobW9kZWwuc3RhdGUucHJvZ3Jlc3MgPT09IG51bGwgfHwgbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuXG4gIG1vZGVsLnN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSB0cnVlXG5cbiAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgbW9kZWwuc3RhdGUuc2V0U2VsZWN0ZWRBbnN3ZXIob3B0aW9uLCBhbnN3ZXIpXG4gIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKG9wdGlvbiwgJ2FjdGl2ZScpXG59XG5cbmNvbnN0IGNvbnRyb2xOZXh0UXVlc3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuXG5cbiAgY29udHJvbFF1aXooKVxufVxuXG5jb25zdCBjb250cm9sTGlnaHRNb2RlID0gZnVuY3Rpb24gKGNvbG9yTW9kZSA9IG1vZGVsLnN0YXRlLnRoZW1lKSB7XG4gIG1vZGVsLnN0YXRlLnNldENvbG9yTW9kZShjb2xvck1vZGUpXG4gIHZpZXcuc2V0Q29sb3JUaGVtZShjb2xvck1vZGUpXG59XG5cbmNvbnN0IGNvbnRyb0xvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIGxvYWRMb2NhbFN0b3JhZ2UobW9kZWwuc3RhdGUpXG4gIGNvbnRyb2xRdWl6KClcbiAgY29udHJvbExpZ2h0TW9kZSgpXG4gIGluaXQoKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmlldy5hZGRIYW5kbGVyTG9hZChjb250cm9Mb2FkKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0VG9waWMoY29udHJvbFNlbGVjdFRvcGljKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0T3B0aW9uKGNvbnRyb2xTZWxlY3RPcHRpb24pXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoY29udHJvbFZhbGlkYXRlQW5zd2VyKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGNvbnRyb2xOZXh0UXVlc3Rpb24pXG4gIHZpZXcuYWRkSGFuZGxlckNoYW5nZUNvbG9yVGhlbWUoY29udHJvbExpZ2h0TW9kZSlcbn1cblxuaW5pdCgpXG4iLCJleHBvcnQgY29uc3QgZ2V0RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICByZXR1cm4gZGF0YVxuICB9IGNhdGNoIChlcnJvcikge31cbn1cblxuZXhwb3J0IGNvbnN0IGVzY2FwZUNvZGUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlc2NhcGVDaGFyYWN0ZXIgPSBbJzwnLCAnPicsICcmJ11cbiAgICAgIGNvbnN0IGVzY2FwZU1hcCA9IFsnJmx0OycsICcmZ3Q7JywgJyZhbXA7J11cblxuICAgICAgcmV0dXJuIHN0cmluZ1xuICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgIC5tYXAoY2hhcmFjdGVyID0+IHtcbiAgICAgICAgICBpZiAoZXNjYXBlQ2hhcmFjdGVyLmluZGV4T2YoY2hhcmFjdGVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChjaGFyYWN0ZXIgPVxuICAgICAgICAgICAgICBlc2NhcGVNYXBbZXNjYXBlQ2hhcmFjdGVyLmluZGV4T2YoY2hhcmFjdGVyKV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuam9pbignJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cmluZ1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHt9XG59XG5cbmV4cG9ydCBjb25zdCBzYXZlTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RhdGUnLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2FkTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNhdmVkU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZScpKVxuICAgIGlmICghc2F2ZWRTdGF0ZSkgcmV0dXJuXG4gICAgT2JqZWN0LmFzc2lnbihvYmplY3QsIHNhdmVkU3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IHsgUVVFU1RJT05fREFUQV9QQVRIIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBzYXZlTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXInXG5cbmV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcbiAgcXVpejoge30sXG4gIGN1cnJRdWVzdGlvbjogJycsXG4gIGN1cnJPcHRpb25zOiBbXSxcbiAgcHJvZ3Jlc3M6IG51bGwsXG4gIG9wdGlvbnNNYXA6IFsnQScsICdCJywgJ0MnLCAnRCddLFxuICBzY29yZTogMCxcbiAgYW5zd2Vyczoge1xuICAgIHNlbGVjdGVkOiBbMCwgJycsIGZhbHNlXSxcbiAgICByaWdodDogWzAsICcnXSxcbiAgICBhbnN3ZXJlZDogZmFsc2UsXG4gIH0sXG4gIHRoZW1lOiAnbGlnaHQnLCAvL3RydWUgPSBsaWdodCBhcyBkZWZhdWx0XG5cbiAgc2V0UXVpeihxdWl6KSB7XG4gICAgdGhpcy5xdWl6ID0gcXVpelxuICB9LFxuXG4gIHNldEN1cnJRdWVzdGlvbigpIHtcbiAgICB0aGlzLmN1cnJRdWVzdGlvbiA9IHRoaXMucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLnF1ZXN0aW9uXG4gIH0sXG5cbiAgc2V0Q3Vyck9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuY3Vyck9wdGlvbnMgPSBzdGF0ZS5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10ub3B0aW9uc1xuICB9LFxuXG4gIHNldFByb2dyZXNzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3MgKz0gMVxuICB9LFxuXG4gIHNldFNjb3JlKCkge1xuICAgIHRoaXMuc2NvcmUgKz0gMVxuICB9LFxuXG4gIHNldFJpZ2h0QW5zd2VyKCkge1xuICAgIHRoaXMuYW5zd2Vycy5yaWdodFsxXSA9IHRoaXMucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLmFuc3dlclxuICAgIHRoaXMuYW5zd2Vycy5yaWdodFswXSA9IHRoaXMuY3Vyck9wdGlvbnMuZmluZEluZGV4KFxuICAgICAgYW5zd2VyID0+IGFuc3dlciA9PT0gdGhpcy5nZXRSaWdodEFuc3dlcigpLFxuICAgIClcbiAgfSxcblxuICBzZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcikge1xuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFswXSA9ICtvcHRpb25cbiAgICB0aGlzLmFuc3dlcnMuc2VsZWN0ZWRbMV0gPSBhbnN3ZXJcbiAgfSxcblxuICBzZXRBbnN3ZXJlZCh2YWx1ZSkge1xuICAgIHRoaXMuYW5zd2Vycy5hbnN3ZXJlZCA9IHN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSB2YWx1ZVxuXG4gICAgY29uc29sZS5sb2codGhpcy5hbnN3ZXJzLmFuc3dlcmVkKVxuICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gIH0sXG4gIHNldENvbG9yTW9kZSh0aGVtZSkge1xuICAgIHRoaXMudGhlbWUgPSB0aGVtZVxuICAgIHNhdmVMb2NhbFN0b3JhZ2Uoc3RhdGUpXG4gICAgcmV0dXJuIHRoaXMudGhlbWVcbiAgfSxcbiAgZ2V0UmlnaHRBbnN3ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5zd2Vycy5yaWdodFsxXVxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgZ2V0UXVpekRhdGEgPSBhc3luYyBmdW5jdGlvbiAodG9waWMpIHtcbiAgY29uc3QgeyBxdWl6emVzIH0gPSBhd2FpdCBnZXREYXRhKFFVRVNUSU9OX0RBVEFfUEFUSClcbiAgc3RhdGUuc2V0UXVpeihxdWl6emVzW3RvcGljXSlcbn1cblxuZXhwb3J0IGNvbnN0IHNldEN1cnJlbnRRQSA9IGZ1bmN0aW9uICgpIHtcbiAgc3RhdGUuc2V0Q3VyclF1ZXN0aW9uKClcbiAgc3RhdGUuc2V0Q3Vyck9wdGlvbnMoKVxuICBzdGF0ZS5zZXRBbnN3ZXJlZChmYWxzZSlcbiAgc2F2ZUxvY2FsU3RvcmFnZShzdGF0ZSlcbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICBzdGF0ZS5zZXRSaWdodEFuc3dlcigpXG4gIHN0YXRlLnNldFByb2dyZXNzKClcbiAgc3RhdGUuc2V0QW5zd2VyZWQodHJ1ZSlcbiAgc2F2ZUxvY2FsU3RvcmFnZShzdGF0ZSlcblxuICBpZiAoc3RhdGUuZ2V0UmlnaHRBbnN3ZXIoKSA9PT0gc3RhdGUuYW5zd2Vycy5zZWxlY3RlZFsxXSkge1xuICAgIHN0YXRlLnNldFNjb3JlKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgX2RhdGFcblxuICByZW5kZXIoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgaWYgKCFkYXRhKSByZXR1cm5cbiAgICB0aGlzLl9kYXRhID0gZGF0YVxuXG4gICAgY29uc3QgbWFya3VwID0gdGhpcy5fZ2VuZXJhdGVNYXJrdXAoKVxuXG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtYXJrdXApXG4gIH1cblxuICB1cGRhdGUoKSB7fVxuXG4gIHJlbmRlckVycm9yKCkge1xuICAgIGNvbnNvbGUubG9nKCdlcnJvcicpXG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBhZGRIYW5kbGVyQ2hhbmdlQ29sb3JUaGVtZShoYW5kbGVyKSB7XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBjb2xvck1vZGUgPSB0b2dnbGUuY2hlY2tlZCA/ICdkYXJrJyA6ICdsaWdodCdcbiAgICAgIGhhbmRsZXIoY29sb3JNb2RlKVxuICAgIH0pXG4gIH1cblxuICBzZXRDb2xvclRoZW1lKGNvbG9yTW9kZSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKS5jaGVja2VkID1cbiAgICAgIGNvbG9yTW9kZSA9PT0gJ2xpZ2h0JyA/IGZhbHNlIDogdHJ1ZVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoXG4gICAgICBgJHtjb2xvck1vZGUgPT09ICdsaWdodCcgPyAnZGFyaycgOiAnbGlnaHQnfS1tb2RlYCxcbiAgICAgIGAke2NvbG9yTW9kZX0tbW9kZWAsXG4gICAgKVxuICB9XG5cbiAgYWRkSGFuZGxlckxvYWQoaGFuZGxlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGhhbmRsZXIoKVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcbmltcG9ydCB7IGVzY2FwZUNvZGUgfSBmcm9tICcuLi9oZWxwZXInXG5cbmNsYXNzIE9wdGlvbnNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX29wdGlvbnMnKVxuICBfYnRuRWxlbWVudFxuICBfb3B0aW9uRWxlbWVudFxuICBfc2VsZWN0ZWRPcHRpb25cbiAgX2FsbEJ1dHRvbnNcbiAgX2FsbE9wdGlvbnNcbiAgX2RhdGFcblxuICBpbml0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5fYWxsQnV0dG9ucyA9IHRoaXMuX3BhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbicpXG4gICAgdGhpcy5fYWxsT3B0aW9ucyA9IHRoaXMuX3BhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICcuc2VsZWN0aW9uLW9wdGlvbicsXG4gICAgKVxuICB9XG5cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgXG4gICAgICAgICR7dGhpcy5fZGF0YS5jdXJyT3B0aW9uc1xuICAgICAgICAgIC5tYXAoKG9wdGlvbiwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCIgZGF0YS1vcHRpb249XCIke2l9XCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICR7dGhpcy5fZGF0YS5vcHRpb25zTWFwW2ldfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgJHtlc2NhcGVDb2RlKG9wdGlvbil9XG4gICAgICA8L2J1dHRvbj5gXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuam9pbigpfVxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Ym1pdCB0eXBlLWhlYWRpbmctc1wiPlN1Ym1pdCBhbnN3ZXI8L2J1dHRvbj5gXG4gIH1cblxuICByZXNldENsYXNzZXMoKSB7XG4gICAgY29uc3QgZGVmYXVsdEJ0bkNsYXNzID0gJ3NlbGVjdGlvbiB0eXBlLWhlYWRpbmctcydcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uQ2xhc3MgPVxuICAgICAgJ3NlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctcydcbiAgICB0aGlzLl9hbGxCdXR0b25zLmZvckVhY2goYnRuID0+IChidG4uY2xhc3NOYW1lID0gZGVmYXVsdEJ0bkNsYXNzKSlcbiAgICB0aGlzLl9hbGxPcHRpb25zLmZvckVhY2goZWwgPT4gKGVsLmNsYXNzTmFtZSA9IGRlZmF1bHRPcHRpb25DbGFzcykpXG4gIH1cblxuICB0b2dnbGVTdGF0ZShvcHRpb24sIHN0YXRlKSB7XG4gICAgdGhpcy5fYWxsQnV0dG9uc1tvcHRpb25dLmNsYXNzTGlzdC50b2dnbGUoYHNlbGVjdGlvbi0tJHtzdGF0ZX1gKVxuICAgIHRoaXMuX2FsbE9wdGlvbnNbb3B0aW9uXS5jbGFzc0xpc3QudG9nZ2xlKGBzZWxlY3Rpb24tb3B0aW9uLS0ke3N0YXRlfWApXG4gIH1cblxuICBhZGRIYW5kbGVyU2VsZWN0T3B0aW9uKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKVxuICAgICAgICB0aGlzLl9idG5FbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdGlvbicpXG4gICAgICAgIHRoaXMuX29wdGlvbkVsZW1lbnQgPSBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0aW9uLW9wdGlvbicpXG5cbiAgICAgICAgaWYgKCF0aGlzLl9idG5FbGVtZW50IHx8ICF0aGlzLl9vcHRpb25FbGVtZW50KSByZXR1cm5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5fYnRuRWxlbWVudC5kYXRhc2V0Lm9wdGlvblxuICAgICAgICBjb25zdCBhbnN3ZXIgPSB0aGlzLl9idG5FbGVtZW50LmlubmVyVGV4dC5zbGljZSgyKS50cmltKClcblxuICAgICAgICBoYW5kbGVyKGFuc3dlciwgb3B0aW9uKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIClcbiAgfVxuXG4gIHJlbmRlckNvcnJlY3RBbnN3ZXIoc2VsZWN0ZWRPcHRpb24sIHJpZ2h0T3B0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRCdG4gPSB0aGlzLl9hbGxCdXR0b25zW3NlbGVjdGVkT3B0aW9uXVxuICAgIGNvbnN0IHJpZ2h0QnRuID0gdGhpcy5fYWxsQnV0dG9uc1tyaWdodE9wdGlvbl1cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXN1Ym1pdCcpXG5cbiAgICByaWdodEJ0bi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiBjbGFzcz1cInNlbGVjdGlvbi10aWNrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+PHBhdGggZmlsbD1cIiMyNkQ3ODJcIiBkPVwiTTIwIDVhMTUgMTUgMCAxIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMwWm0wIDIuNWExMi41IDEyLjUgMCAxIDAgMCAyNSAxMi41IDEyLjUgMCAwIDAgMC0yNVptLTEuODc1IDE1LjEwNUwyNS4zIDE1LjQxYTEuMjUgMS4yNSAwIDAgMSAxLjkxNSAxLjU5M2wtLjE0NS4xNzQtOC4wNiA4LjA4YTEuMjUgMS4yNSAwIDAgMS0xLjU5NS4xNDhsLS4xNzUtLjE0NS00LjM3NS00LjM3NWExLjI1IDEuMjUgMCAwIDEgMS41OTUtMS45MTNsLjE3NS4xNDMgMy40OSAzLjQ5WlwiLz48L3N2Zz5gLFxuICAgIClcblxuICAgIGlmIChzZWxlY3RlZE9wdGlvbiAhPSByaWdodE9wdGlvbikge1xuICAgICAgc2VsZWN0ZWRCdG4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIGNsYXNzPVwic2VsZWN0aW9uLXRpY2tcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiI0VFNTQ1NFwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tNS40MDIgNy40MTUuMTQyLS4xNzVhMS4yNSAxLjI1IDAgMCAxIDEuNTk1LS4xNDNsLjE3NS4xNDNMMjAgMTguMjMzbDMuNDktMy40OTNhMS4yNSAxLjI1IDAgMCAxIDEuNTk1LS4xNDNsLjE3NS4xNDNhMS4yNSAxLjI1IDAgMCAxIC4xNDIgMS41OTVsLS4xNDIuMTc1TDIxLjc2NyAyMGwzLjQ5MyAzLjQ5YTEuMjUgMS4yNSAwIDAgMSAuMTQyIDEuNTk1bC0uMTQyLjE3NWExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQybC0uMTc1LS4xNDJMMjAgMjEuNzY3bC0zLjQ5IDMuNDkzYTEuMjUgMS4yNSAwIDAgMS0xLjU5NS4xNDJsLS4xNzUtLjE0MmExLjI1IDEuMjUgMCAwIDEtLjE0My0xLjU5NWwuMTQzLS4xNzVMMTguMjMzIDIwbC0zLjQ5My0zLjQ5YTEuMjUgMS4yNSAwIDAgMS0uMTQzLTEuNTk1WlwiLz48L3N2Zz5gLFxuICAgICAgKVxuICAgIH1cbiAgICB0aGlzLl9hbGxCdXR0b25zLmZvckVhY2goYnRuID0+XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLWRpc2FibGVkJyksXG4gICAgKVxuICAgIGlmICh0aGlzLl9kYXRhLnByb2dyZXNzIDw9IDkpIHtcbiAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnTmV4dCBRdWVzdGlvbidcbiAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVwbGFjZSgnYnRuLXN1Ym1pdCcsICdidG4tbmV4dCcpXG4gICAgfVxuICAgIGlmICh0aGlzLl9kYXRhLnByb2dyZXNzID09PSAxMCkge1xuICAgICAgc3VibWl0QnRuLmlubmVyVGV4dCA9ICdTZWUgRmluYWwgU2NvcmUnXG4gICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LnJlcGxhY2UoJ2J0bi1zdWJtaXQnLCAnYnRuLWFnYWluJylcbiAgICB9XG4gIH1cblxuICBhZGRIYW5kbGVyU2VsZWN0VG9waWMoaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdGlvbicpXG4gICAgICBpZiAoIW9wdGlvbikgcmV0dXJuXG4gICAgICBjb25zdCB0b3BpYyA9ICtvcHRpb24ucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKS5kYXRhc2V0XG4gICAgICAgIC50b3BpY1xuICAgICAgaWYgKCF0b3BpYyAmJiB0b3BpYyAhPT0gMCkgcmV0dXJuXG4gICAgICBoYW5kbGVyKHRvcGljKVxuICAgIH0pXG4gIH1cblxuICBhZGRIYW5kbGVyUmVuZGVyU3VibWl0QW5zd2VyKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZS50YXJnZXQuY2xvc2VzdCgnLmJ0bi1zdWJtaXQnKVxuXG4gICAgICAgIGlmICghc3VibWl0QnV0dG9uKSByZXR1cm5cblxuICAgICAgICBoYW5kbGVyKClcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICApXG4gIH1cblxuICBhZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IG5leHRCdG4gPVxuICAgICAgICBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLW5leHQnKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLWFnYWluJylcbiAgICAgIGlmICghbmV4dEJ0bikgcmV0dXJuXG4gICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaGFuZGxlcigpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE9wdGlvbnNWaWV3KClcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcblxuY2xhc3MgUXVlc3Rpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbiAgX2RhdGFcblxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHt0aGlzLl9kYXRhLnByb2dyZXNzICsgMX0gb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH08L3A+XG4gICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJRdWVzdGlvbn1cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PmBcbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzJyxcbiAgICApXG5cbiAgICBjb25zdCBxdWl6UHJvZ3Jlc3MgPVxuICAgICAgKCh0aGlzLl9kYXRhLnByb2dyZXNzICsgMSkgLyB0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkgKiAxMDBcblxuICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGAke3F1aXpQcm9ncmVzc30lYClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFF1ZXN0aW9uVmlldygpXG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5cbmNsYXNzIFJlc3VsdHNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICBfZGF0YVxuXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0eXBlLWhlYWRpbmctbFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZS1yZWd1bGFyXCI+UXVpeiBjb21wbGV0ZWQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgWW91IHNjb3JlZC4uLlxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcmVzdWx0LWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLSR7dGhpcy5fZGF0YS5xdWl6LnRpdGxlLnRvTG93ZXJDYXNlKCl9XCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBzcmM9XCIke3RoaXMuX2RhdGEucXVpei5pY29ufVwiXG4gICAgICAgICAgICAgICAgYWx0PVwiJHt0aGlzLl9kYXRhLnF1aXoudGl0bGV9IEljb25cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJ0eXBlLWhlYWRpbmctc1wiIGNsYXNzPVwibWFpbl9fcmVzdWx0LWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLnF1aXoudGl0bGV9XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMSBjbGFzcz1cInR5cGUtZGlzcGxheVwiPiR7dGhpcy5fZGF0YS5zY29yZX08L2gxPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHQtc3ViLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5cbiAgICAgICAgICAgICAgb3V0IG9mICR7dGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGh9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+YFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBSZXN1bHRzVmlldygpXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJ1xuXG5jb250cm9sbGVyLmluaXQoKVxuXG4vLyBjb25zdCB0b2dnbGVDb2xvck1vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlJylcbi8vIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jylcbi8vIGNvbnN0IHF1ZXN0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fcXVlc3Rpb24nKVxuLy8gY29uc3Qgb3B0aW9uc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX29wdGlvbnMnKVxuLy8gY29uc3QgcHJvZ3Jlc3NCYXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4vLyAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyJyxcbi8vIClcblxuLy8gY29uc3QgdG9waWNNYXAgPSB7XG4vLyAgIGh0bWw6IDAsXG4vLyAgIGNzczogMSxcbi8vICAganM6IDIsXG4vLyAgIGFjY2Vzc2liaWxpdHk6IDMsXG4vLyB9XG5cbi8vIGNvbnN0IG9wdGlvbnNNYXAgPSBbJ0EnLCAnQicsICdDJywgJ0QnXVxuXG4vLyBsZXQgdG9waWNEYXRhID0ge31cbi8vIGxldCBxdWVzdGlvbkNvdW50ID0gMFxuXG4vLyB0b2dnbGVDb2xvck1vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4vLyAgIGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHQtbW9kZScpKSB7XG4vLyAgICAgYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnbGlnaHQtbW9kZScsICdkYXJrLW1vZGUnKVxuLy8gICB9IGVsc2Uge1xuLy8gICAgIGJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoJ2RhcmstbW9kZScsICdsaWdodC1tb2RlJylcbi8vICAgfVxuLy8gfSlcblxuLy8gZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcbi8vICAgY29uc3QgZXNjYXBlTWFwID0ge1xuLy8gICAgICcmJzogJyZhbXA7Jyxcbi8vICAgICAnPCc6ICcmbHQ7Jyxcbi8vICAgICAnPic6ICcmZ3Q7Jyxcbi8vICAgICAnXCInOiAnJnF1b3Q7Jyxcbi8vICAgICBcIidcIjogJyYjMDM5OycsXG4vLyAgIH1cblxuLy8gICAvLyBSZXBsYWNlIGFueSBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXR5XG4vLyAgIHJldHVybiBzdHIucmVwbGFjZSgvWyY8PlwiJ10vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4vLyAgICAgcmV0dXJuIGVzY2FwZU1hcFttYXRjaF1cbi8vICAgfSlcbi8vIH1cblxuLy8gY29uc3QgaWRUb3BpYyA9IGZ1bmN0aW9uIChlKSB7XG4vLyAgIGNvbnN0IHRhcmdldCA9IFsuLi5lLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0aW9uLW9wdGlvbicpLmNsYXNzTGlzdF1cbi8vICAgICAuZmlsdGVyKGVsID0+IGVsLnN0YXJ0c1dpdGgoJ3NlbGVjdGlvbi1vcHRpb24tLScpKVxuLy8gICAgIC50b1N0cmluZygpXG4vLyAgICAgLnNsaWNlKDE4KVxuLy8gICByZXR1cm4gdGFyZ2V0XG4vLyB9XG5cbi8vIGNvbnN0IGdldERhdGEgPSBhc3luYyBmdW5jdGlvbiAodGFyZ2V0KSB7XG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2RhdGEuanNvbicpXG4vLyAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbi8vICAgcmV0dXJuIGRhdGFcbi8vIH1cblxuLy8gY29uc3Qgc2VsZWN0VG9waWMgPSBhc3luYyBmdW5jdGlvbiAoZSkge1xuLy8gICAvLyAgIGlmIChxdWVzdGlvbkNvdW50ID4gMCkgcmV0dXJuXG4vLyAgIGNvbnN0IHRvcGljSWQgPSB0b3BpY01hcFtpZFRvcGljKGUpXVxuLy8gICBjb25zdCB7IHF1aXp6ZXM6IHF1aXogfSA9IGF3YWl0IGdldERhdGEoKVxuLy8gICB0b3BpY0RhdGEgPSBxdWl6W3RvcGljSWRdXG4vLyAgIGRpc3BsYXlRdWVzdGlvbnMoKVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBzZXRBY3RpdmVTdGF0ZShlKSB7XG4vLyAgIGlmIChxdWVzdGlvbkNvdW50ID09PSAwKSByZXR1cm5cbi8vICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcbi8vICAgICByZXR1cm5cbi8vICAgfVxuLy8gICA7Wy4uLmUudGFyZ2V0LmNsb3Nlc3QoJ2RpdicpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpXS5mb3JFYWNoKGVsID0+XG4vLyAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uLS1hY3RpdmUnKSxcbi8vICAgKVxuLy8gICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24tLWFjdGl2ZScpXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGRpc3BsYXlRdWVzdGlvbnMoKSB7XG4vLyAgIGlmIChxdWVzdGlvbkNvdW50IDwgdG9waWNEYXRhLnF1ZXN0aW9ucy5sZW5ndGgpICsrcXVlc3Rpb25Db3VudFxuXG4vLyAgIGNvbnN0IHF1ZXN0aW9uID0gdG9waWNEYXRhLnF1ZXN0aW9uc1txdWVzdGlvbkNvdW50IC0gMV0ucXVlc3Rpb25cbi8vICAgY29uc3Qgb3B0aW9ucyA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLm9wdGlvbnNcblxuLy8gICBxdWVzdGlvbkVsLmlubmVySFRNTCA9IGBcbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbi8vICAgICA8aDIgY2xhc3M9XCJ0eXBlLWhlYWRpbmctbFwiPlxuLy8gICAgICAgJHtxdWVzdGlvbn1cbi8vICAgICA8L2gyPlxuLy8gICA8L2Rpdj5cbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XG4vLyAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlF1ZXN0aW9uICR7cXVlc3Rpb25Db3VudH0gb3V0IG9mICR7dG9waWNEYXRhLnF1ZXN0aW9ucy5sZW5ndGh9PC9wPlxuLy8gICA8L2Rpdj5cbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhclwiPlxuLy8gICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cbi8vICAgPC9kaXY+YFxuXG4vLyAgIGNvbnN0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5tYXAoXG4vLyAgICAgKGVsLCBpKSA9PlxuLy8gICAgICAgKGVsID0gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cbi8vICAgICAgICAgPGRpdlxuLy8gICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI+XG4vLyAgICAgICAgICAgJHtvcHRpb25zTWFwW2ldfVxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgJHtlc2NhcGVIdG1sKG9wdGlvbnNbaV0pfVxuXG4vLyAgICAgICA8L2J1dHRvbj5gKSxcbi8vICAgKVxuLy8gICBjb25zb2xlLmxvZyhvcHRpb25zSFRNTClcbi8vICAgb3B0aW9uc0VsLmlubmVySFRNTCA9IFsuLi5vcHRpb25zSFRNTF1cbi8vIH1cbi8vIG9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdFRvcGljKVxuLy8gb3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0QWN0aXZlU3RhdGUpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=