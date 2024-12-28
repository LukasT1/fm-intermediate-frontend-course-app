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
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper.js */ "./src/scripts/helper.js");
/* harmony import */ var _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/optionsView.js */ "./src/scripts/views/optionsView.js");
/* harmony import */ var _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/questionView.js */ "./src/scripts/views/questionView.js");
/* harmony import */ var _views_resultsView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/resultsView.js */ "./src/scripts/views/resultsView.js");
/* harmony import */ var _views_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/View.js */ "./src/scripts/views/View.js");
/* harmony import */ var _views_initialView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/initialView.js */ "./src/scripts/views/initialView.js");
/* harmony import */ var _views_navView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/navView.js */ "./src/scripts/views/navView.js");












const view = new _views_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]()

const controlSelectTopic = async function (topic) {
  try {
    //Get quiz topic
    await _model_js__WEBPACK_IMPORTED_MODULE_0__.getQuizData(+topic)
    _model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress = 0
    controlQuiz(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress)
    _views_navView_js__WEBPACK_IMPORTED_MODULE_8__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
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
    console.log('calling render error')
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
}

const controlPlayAgain = function () {
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.reset()
  ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.clearLocalStorage)()
  _views_initialView_js__WEBPACK_IMPORTED_MODULE_7__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].initElements()
  _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].initElements()
  _views_resultsView_js__WEBPACK_IMPORTED_MODULE_5__["default"].initElements()
  init()
  console.log(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
}

const init = function () {
  view.addHandlerLoad(controLoad)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectTopic(controlSelectTopic)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectOption(controlSelectOption)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerRenderSubmitAnswer(controlValidateAnswer)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerNextQuestion(controlNextQuestion)
  view.addHandlerChangeColorTheme(controlLightMode)
  _views_resultsView_js__WEBPACK_IMPORTED_MODULE_5__["default"].addHandlerPlayAgain(controlPlayAgain)
}

// init()


/***/ }),

/***/ "./src/scripts/helper.js":
/*!*******************************!*\
  !*** ./src/scripts/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearLocalStorage: () => (/* binding */ clearLocalStorage),
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

const clearLocalStorage = function () {
  localStorage.clear()
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




const defaultState = {
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
}

const state = {
  ...defaultState,

  reset() {
    Object.assign(this, JSON.parse(JSON.stringify(defaultState)))
  },

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
    if (!data) return
    this._data = data

    const markup = this._generateMarkup()

    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
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

/***/ "./src/scripts/views/initialView.js":
/*!******************************************!*\
  !*** ./src/scripts/views/initialView.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/scripts/views/View.js");


class InitalView extends _View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _parentElement = document.querySelector('.container')
  _data

  _generateMarkup() {
    return `<nav class="nav">
        <div class="nav__topic hidden">
          <div class="selection-option selection-option--accessibility">
            <img
              src="assets/images/icon-accessibility.svg"
              class="nav__topic-icon"
              alt="" />
          </div>
          <h4 class="type-heading-s" class="nav__topic-heading">Topic</h4>
        </div>
        <div class="nav__toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              fill="#626C7F"
              d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z" />
          </svg>
          <input type="checkbox" name="" id="" class="toggle" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              fill="#626C7F"
              d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z" />
          </svg>
        </div>
      </nav>

      <main class="main">
        <div class="main__question">
          <div class="main__question-heading">
            <h2 class="type-heading-l">
              <span class="type-regular">Welcome to the</span> Frontend
              Quiz!
            </h2>
          </div>
          <div class="main__question-sub-heading">
            <p class="type-body-s">Pick a subject to get started.</p>
          </div>
          <div class="main__question-progress-bar hidden">
            <div class="main__question-progress-bar-progress"></div>
          </div>
        </div>
        <div class="main__options">
          <button class="selection type-heading-s">
            <div
              data-topic="0"
              class="selection-option selection-option--html type-heading-s">
              <img src="assets/images/icon-html.svg" alt="" />
            </div>
            HTML
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="1"
              class="selection-option selection-option--css type-heading-s">
              <img src="assets/images/icon-css.svg" alt="" />
            </div>
            CSS
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="2"
              class="selection-option selection-option--js type-heading-s">
              <img src="assets/images/icon-js.svg" alt="" />
            </div>
            Javascript
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="3"
              class="selection-option selection-option--accessibility type-heading-s">
              <img src="assets/images/icon-accessibility.svg" alt="" />
            </div>
            Accessibility
          </button>
        </div>
      </main>
     `
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new InitalView());


/***/ }),

/***/ "./src/scripts/views/navView.js":
/*!**************************************!*\
  !*** ./src/scripts/views/navView.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/scripts/views/View.js");


class NavView extends _View__WEBPACK_IMPORTED_MODULE_0__["default"] {
  _parentElement = document.querySelector('.nav__topic')
  _data

  _generateMarkup() {
    console.log(this._data)
    return `
      <div class="selection-option selection-option--${this._data.quiz.title.toLowerCase()}">
            <img
              src=${this._data.quiz.icon}
              class="nav__topic-icon"
              alt="${this._data.quiz.title} icon" />
          </div>
          <h4 class="type-heading-s" class="nav__topic-heading">${this._data.quiz.title}</h4>`
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new NavView());


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
    this._parentElement = document.querySelector('.main__options')
    this._allButtons = this._parentElement?.querySelectorAll('.selection')
    this._allOptions = this._parentElement?.querySelectorAll(
      '.selection-option',
    )
  }

  renderError() {
    this._parentElement
      .querySelector('.error-msg')
      .classList.toggle('selection-error--hidden')
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
       <button class="btn btn-submit type-heading-s">Submit answer</button>
       <div class='selection-error error-msg selection-error--hidden'>
  <img src='assets/images/icon-error.svg'>
  <p class='type-medium'>Please select an answer</p>
  </div>`
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
        this._parentElement
          ?.querySelector('.error-msg')
          ?.classList.add('selection-error--hidden')
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
    console.log('Adding submit answer handler') // Debugging log
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

  initElements() {
    this._parentElement = document.querySelector('.main__question')
  }
  _generateMarkup() {
    return `<div class="main__question-heading">
      <div class="main__question-sub-heading">
            <p class="type-body-s">Question ${this._data.progress + 1} of ${this._data.quiz.questions.length}</p>
          </div>    
            <h2 class="type-heading-m">
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

  initElements() {
    this._parentElement = document.querySelector('.main')
  }

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
        </div>
        <button class="btn main__result-btn-again type-heading-s">Play Again</button>`
  }

  addHandlerPlayAgain(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.main__result-btn-again')
      if (!btn) return
      handler()
    })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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X2FwcC8uL3NyYy9zY3JpcHRzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9pbml0aWFsVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL25hdlZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9vcHRpb25zVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3Jlc3VsdHNWaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUVVFU1RJT05fREFUQV9QQVRIID0gJy4uL2RhdGEuanNvbidcbiIsImltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4vbW9kZWwuanMnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgb3B0aW9uc1ZpZXcgZnJvbSAnLi92aWV3cy9vcHRpb25zVmlldy5qcydcbmltcG9ydCBxdWVzdGlvblZpZXcgZnJvbSAnLi92aWV3cy9xdWVzdGlvblZpZXcuanMnXG5pbXBvcnQgcmVzdWx0c1ZpZXcgZnJvbSAnLi92aWV3cy9yZXN1bHRzVmlldy5qcydcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlld3MvVmlldy5qcydcbmltcG9ydCB7IGxvYWRMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcidcbmltcG9ydCB7IGNsZWFyTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgaW5pdGlhbFZpZXcgZnJvbSAnLi92aWV3cy9pbml0aWFsVmlldy5qcydcbmltcG9ydCBuYXZWaWV3IGZyb20gJy4vdmlld3MvbmF2Vmlldy5qcydcblxuY29uc3QgdmlldyA9IG5ldyBWaWV3KClcblxuY29uc3QgY29udHJvbFNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XG4gIHRyeSB7XG4gICAgLy9HZXQgcXVpeiB0b3BpY1xuICAgIGF3YWl0IG1vZGVsLmdldFF1aXpEYXRhKCt0b3BpYylcbiAgICBtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9IDBcbiAgICBjb250cm9sUXVpeihtb2RlbC5zdGF0ZS5wcm9ncmVzcylcbiAgICBuYXZWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xRdWl6ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmIChtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBtb2RlbC5zdGF0ZS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnRyb2xSZW5kZXJSZXN1bHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy9TZXQgY3VycmVudCBxdWVzdGlvbiZvcHRpb25zLCByZW5kZXIsIHVwZGF0ZSBwcm9ncmVzcyBiYXJcblxuICAgIG1vZGVsLnNldEN1cnJlbnRRQSgpXG4gICAgcXVlc3Rpb25WaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcblxuICAgIHF1ZXN0aW9uVmlldy51cGRhdGVQcm9ncmVzc0Jhcihtb2RlbC5zdGF0ZSlcblxuICAgIC8vUmVuZGVyIG9wdGlvbnNcbiAgICBvcHRpb25zVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5jb25zdCBjb250cm9sUmVuZGVyUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJlc3VsdHNWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5jb25zdCBjb250cm9sVmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFuc3dlcnMgPSBtb2RlbC5zdGF0ZS5hbnN3ZXJzXG4gIGlmIChhbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm5cbiAgaWYgKCFhbnN3ZXJzLnNlbGVjdGVkWzJdKSB7XG4gICAgY29uc29sZS5sb2coJ2NhbGxpbmcgcmVuZGVyIGVycm9yJylcbiAgICBvcHRpb25zVmlldy5yZW5kZXJFcnJvcigpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG1vZGVsLnZhbGlkYXRlQW5zd2VyKCkpIHtcbiAgICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKVxuICAgIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKGFuc3dlcnMuc2VsZWN0ZWRbMF0sICdwaWNrZWQtY29ycmVjdCcpXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnNlbGVjdGVkWzBdLCAncGlja2VkLWluY29ycmVjdCcpXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5yaWdodFswXSwgJ3BpY2tlZC1jb3JyZWN0JylcbiAgfVxuXG4gIG9wdGlvbnNWaWV3LnJlbmRlckNvcnJlY3RBbnN3ZXIoYW5zd2Vycy5zZWxlY3RlZFswXSwgYW5zd2Vycy5yaWdodFswXSlcbn1cblxuY29uc3QgY29udHJvbFNlbGVjdE9wdGlvbiA9IGZ1bmN0aW9uIChhbnN3ZXIsIG9wdGlvbikge1xuICBpZiAobW9kZWwuc3RhdGUucHJvZ3Jlc3MgPT09IG51bGwgfHwgbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuXG5cbiAgbW9kZWwuc3RhdGUuYW5zd2Vycy5zZWxlY3RlZFsyXSA9IHRydWVcblxuICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKVxuICBtb2RlbC5zdGF0ZS5zZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcilcbiAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUob3B0aW9uLCAnYWN0aXZlJylcbn1cblxuY29uc3QgY29udHJvbE5leHRRdWVzdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFtb2RlbC5zdGF0ZS5hbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm5cblxuICBjb250cm9sUXVpeigpXG59XG5cbmNvbnN0IGNvbnRyb2xMaWdodE1vZGUgPSBmdW5jdGlvbiAoY29sb3JNb2RlID0gbW9kZWwuc3RhdGUudGhlbWUpIHtcbiAgbW9kZWwuc3RhdGUuc2V0Q29sb3JNb2RlKGNvbG9yTW9kZSlcbiAgdmlldy5zZXRDb2xvclRoZW1lKGNvbG9yTW9kZSlcbn1cblxuY29uc3QgY29udHJvTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgbG9hZExvY2FsU3RvcmFnZShtb2RlbC5zdGF0ZSlcbiAgY29udHJvbFF1aXooKVxuICBjb250cm9sTGlnaHRNb2RlKClcbn1cblxuY29uc3QgY29udHJvbFBsYXlBZ2FpbiA9IGZ1bmN0aW9uICgpIHtcbiAgbW9kZWwuc3RhdGUucmVzZXQoKVxuICBjbGVhckxvY2FsU3RvcmFnZSgpXG4gIGluaXRpYWxWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgb3B0aW9uc1ZpZXcuaW5pdEVsZW1lbnRzKClcbiAgcXVlc3Rpb25WaWV3LmluaXRFbGVtZW50cygpXG4gIHJlc3VsdHNWaWV3LmluaXRFbGVtZW50cygpXG4gIGluaXQoKVxuICBjb25zb2xlLmxvZyhtb2RlbC5zdGF0ZSlcbn1cblxuZXhwb3J0IGNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZpZXcuYWRkSGFuZGxlckxvYWQoY29udHJvTG9hZClcbiAgb3B0aW9uc1ZpZXcuYWRkSGFuZGxlclNlbGVjdFRvcGljKGNvbnRyb2xTZWxlY3RUb3BpYylcbiAgb3B0aW9uc1ZpZXcuYWRkSGFuZGxlclNlbGVjdE9wdGlvbihjb250cm9sU2VsZWN0T3B0aW9uKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyUmVuZGVyU3VibWl0QW5zd2VyKGNvbnRyb2xWYWxpZGF0ZUFuc3dlcilcbiAgb3B0aW9uc1ZpZXcuYWRkSGFuZGxlck5leHRRdWVzdGlvbihjb250cm9sTmV4dFF1ZXN0aW9uKVxuICB2aWV3LmFkZEhhbmRsZXJDaGFuZ2VDb2xvclRoZW1lKGNvbnRyb2xMaWdodE1vZGUpXG4gIHJlc3VsdHNWaWV3LmFkZEhhbmRsZXJQbGF5QWdhaW4oY29udHJvbFBsYXlBZ2Fpbilcbn1cblxuLy8gaW5pdCgpXG4iLCJleHBvcnQgY29uc3QgZ2V0RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICByZXR1cm4gZGF0YVxuICB9IGNhdGNoIChlcnJvcikge31cbn1cblxuZXhwb3J0IGNvbnN0IGVzY2FwZUNvZGUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlc2NhcGVDaGFyYWN0ZXIgPSBbJzwnLCAnPicsICcmJ11cbiAgICAgIGNvbnN0IGVzY2FwZU1hcCA9IFsnJmx0OycsICcmZ3Q7JywgJyZhbXA7J11cblxuICAgICAgcmV0dXJuIHN0cmluZ1xuICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgIC5tYXAoY2hhcmFjdGVyID0+IHtcbiAgICAgICAgICBpZiAoZXNjYXBlQ2hhcmFjdGVyLmluZGV4T2YoY2hhcmFjdGVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXJcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChjaGFyYWN0ZXIgPVxuICAgICAgICAgICAgICBlc2NhcGVNYXBbZXNjYXBlQ2hhcmFjdGVyLmluZGV4T2YoY2hhcmFjdGVyKV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuam9pbignJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cmluZ1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHt9XG59XG5cbmV4cG9ydCBjb25zdCBzYXZlTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RhdGUnLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBsb2FkTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNhdmVkU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZScpKVxuICAgIGlmICghc2F2ZWRTdGF0ZSkgcmV0dXJuXG4gICAgT2JqZWN0LmFzc2lnbihvYmplY3QsIHNhdmVkU3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIGxvY2FsU3RvcmFnZS5jbGVhcigpXG59XG4iLCJpbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9oZWxwZXInXG5pbXBvcnQgeyBRVUVTVElPTl9EQVRBX1BBVEggfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7IHNhdmVMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcidcblxuY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuICBxdWl6OiB7fSxcbiAgY3VyclF1ZXN0aW9uOiAnJyxcbiAgY3Vyck9wdGlvbnM6IFtdLFxuICBwcm9ncmVzczogbnVsbCxcbiAgb3B0aW9uc01hcDogWydBJywgJ0InLCAnQycsICdEJ10sXG4gIHNjb3JlOiAwLFxuICBhbnN3ZXJzOiB7XG4gICAgc2VsZWN0ZWQ6IFswLCAnJywgZmFsc2VdLFxuICAgIHJpZ2h0OiBbMCwgJyddLFxuICAgIGFuc3dlcmVkOiBmYWxzZSxcbiAgfSxcbiAgdGhlbWU6ICdsaWdodCcsIC8vdHJ1ZSA9IGxpZ2h0IGFzIGRlZmF1bHRcbn1cblxuZXhwb3J0IGNvbnN0IHN0YXRlID0ge1xuICAuLi5kZWZhdWx0U3RhdGUsXG5cbiAgcmVzZXQoKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlZmF1bHRTdGF0ZSkpKVxuICB9LFxuXG4gIHNldFF1aXoocXVpeikge1xuICAgIHRoaXMucXVpeiA9IHF1aXpcbiAgfSxcblxuICBzZXRDdXJyUXVlc3Rpb24oKSB7XG4gICAgdGhpcy5jdXJyUXVlc3Rpb24gPSB0aGlzLnF1aXoucXVlc3Rpb25zW3N0YXRlLnByb2dyZXNzXS5xdWVzdGlvblxuICB9LFxuXG4gIHNldEN1cnJPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLmN1cnJPcHRpb25zID0gc3RhdGUucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLm9wdGlvbnNcbiAgfSxcblxuICBzZXRQcm9ncmVzcygpIHtcbiAgICB0aGlzLnByb2dyZXNzICs9IDFcbiAgfSxcblxuICBzZXRTY29yZSgpIHtcbiAgICB0aGlzLnNjb3JlICs9IDFcbiAgfSxcblxuICBzZXRSaWdodEFuc3dlcigpIHtcbiAgICB0aGlzLmFuc3dlcnMucmlnaHRbMV0gPSB0aGlzLnF1aXoucXVlc3Rpb25zW3N0YXRlLnByb2dyZXNzXS5hbnN3ZXJcbiAgICB0aGlzLmFuc3dlcnMucmlnaHRbMF0gPSB0aGlzLmN1cnJPcHRpb25zLmZpbmRJbmRleChcbiAgICAgIGFuc3dlciA9PiBhbnN3ZXIgPT09IHRoaXMuZ2V0UmlnaHRBbnN3ZXIoKSxcbiAgICApXG4gIH0sXG5cbiAgc2V0U2VsZWN0ZWRBbnN3ZXIob3B0aW9uLCBhbnN3ZXIpIHtcbiAgICB0aGlzLmFuc3dlcnMuc2VsZWN0ZWRbMF0gPSArb3B0aW9uXG4gICAgdGhpcy5hbnN3ZXJzLnNlbGVjdGVkWzFdID0gYW5zd2VyXG4gIH0sXG5cbiAgc2V0QW5zd2VyZWQodmFsdWUpIHtcbiAgICB0aGlzLmFuc3dlcnMuYW5zd2VyZWQgPSBzdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzJdID0gdmFsdWVcbiAgfSxcbiAgc2V0Q29sb3JNb2RlKHRoZW1lKSB7XG4gICAgdGhpcy50aGVtZSA9IHRoZW1lXG4gICAgc2F2ZUxvY2FsU3RvcmFnZShzdGF0ZSlcbiAgICByZXR1cm4gdGhpcy50aGVtZVxuICB9LFxuICBnZXRSaWdodEFuc3dlcigpIHtcbiAgICByZXR1cm4gdGhpcy5hbnN3ZXJzLnJpZ2h0WzFdXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBnZXRRdWl6RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh0b3BpYykge1xuICBjb25zdCB7IHF1aXp6ZXMgfSA9IGF3YWl0IGdldERhdGEoUVVFU1RJT05fREFUQV9QQVRIKVxuICBzdGF0ZS5zZXRRdWl6KHF1aXp6ZXNbdG9waWNdKVxufVxuXG5leHBvcnQgY29uc3Qgc2V0Q3VycmVudFFBID0gZnVuY3Rpb24gKCkge1xuICBzdGF0ZS5zZXRDdXJyUXVlc3Rpb24oKVxuICBzdGF0ZS5zZXRDdXJyT3B0aW9ucygpXG4gIHN0YXRlLnNldEFuc3dlcmVkKGZhbHNlKVxuICBzYXZlTG9jYWxTdG9yYWdlKHN0YXRlKVxufVxuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN0YXRlLnNldFJpZ2h0QW5zd2VyKClcbiAgc3RhdGUuc2V0UHJvZ3Jlc3MoKVxuICBzdGF0ZS5zZXRBbnN3ZXJlZCh0cnVlKVxuICBzYXZlTG9jYWxTdG9yYWdlKHN0YXRlKVxuXG4gIGlmIChzdGF0ZS5nZXRSaWdodEFuc3dlcigpID09PSBzdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzFdKSB7XG4gICAgc3RhdGUuc2V0U2NvcmUoKVxuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBfZGF0YVxuXG4gIHJlbmRlcihkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSByZXR1cm5cbiAgICB0aGlzLl9kYXRhID0gZGF0YVxuXG4gICAgY29uc3QgbWFya3VwID0gdGhpcy5fZ2VuZXJhdGVNYXJrdXAoKVxuXG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBtYXJrdXApXG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBhZGRIYW5kbGVyQ2hhbmdlQ29sb3JUaGVtZShoYW5kbGVyKSB7XG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBjb2xvck1vZGUgPSB0b2dnbGUuY2hlY2tlZCA/ICdkYXJrJyA6ICdsaWdodCdcbiAgICAgIGhhbmRsZXIoY29sb3JNb2RlKVxuICAgIH0pXG4gIH1cblxuICBzZXRDb2xvclRoZW1lKGNvbG9yTW9kZSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKS5jaGVja2VkID1cbiAgICAgIGNvbG9yTW9kZSA9PT0gJ2xpZ2h0JyA/IGZhbHNlIDogdHJ1ZVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoXG4gICAgICBgJHtjb2xvck1vZGUgPT09ICdsaWdodCcgPyAnZGFyaycgOiAnbGlnaHQnfS1tb2RlYCxcbiAgICAgIGAke2NvbG9yTW9kZX0tbW9kZWAsXG4gICAgKVxuICB9XG5cbiAgYWRkSGFuZGxlckxvYWQoaGFuZGxlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGhhbmRsZXIoKVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcblxuY2xhc3MgSW5pdGFsVmlldyBleHRlbmRzIFZpZXcge1xuICBfcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKVxuICBfZGF0YVxuXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcbiAgICByZXR1cm4gYDxuYXYgY2xhc3M9XCJuYXZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hdl9fdG9waWMgaGlkZGVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tYWNjZXNzaWJpbGl0eVwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb24tYWNjZXNzaWJpbGl0eS5zdmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cIm5hdl9fdG9waWMtaWNvblwiXG4gICAgICAgICAgICAgIGFsdD1cIlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGg0IGNsYXNzPVwidHlwZS1oZWFkaW5nLXNcIiBjbGFzcz1cIm5hdl9fdG9waWMtaGVhZGluZ1wiPlRvcGljPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYXZfX3RvZ2dsZVwiPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBmaWxsPVwiIzYyNkM3RlwiXG4gICAgICAgICAgICAgIGQ9XCJNMTIgMS41YS43NS43NSAwIDAgMSAuNzUuNzV2MS41YS43NS43NSAwIDEgMS0xLjUgMHYtMS41QS43NS43NSAwIDAgMSAxMiAxLjVabTAgMTVhNC41IDQuNSAwIDEgMCAwLTkgNC41IDQuNSAwIDAgMCAwIDlabTAtMS41YTMgMyAwIDEgMSAwLTYgMyAzIDAgMCAxIDAgNlptOS43NS0yLjI1YS43NS43NSAwIDEgMCAwLTEuNWgtMS41YS43NS43NSAwIDEgMCAwIDEuNWgxLjVaTTEyIDE5LjVhLjc1Ljc1IDAgMCAxIC43NS43NXYxLjVhLjc1Ljc1IDAgMSAxLTEuNSAwdi0xLjVhLjc1Ljc1IDAgMCAxIC43NS0uNzVabS04LjI1LTYuNzVhLjc1Ljc1IDAgMSAwIDAtMS41aC0xLjVhLjc1Ljc1IDAgMSAwIDAgMS41aDEuNVptLjk2OS04LjAzMWEuNzUuNzUgMCAwIDEgMS4wNjIgMGwxLjUgMS41YS43NTEuNzUxIDAgMCAxLTEuMDYyIDEuMDYybC0xLjUtMS41YS43NS43NSAwIDAgMSAwLTEuMDYyWm0xLjA2MiAxNC41NjJhLjc1Ljc1IDAgMSAxLTEuMDYyLTEuMDZsMS41LTEuNWEuNzUuNzUgMCAxIDEgMS4wNjIgMS4wNmwtMS41IDEuNVptMTMuNS0xNC41NjJhLjc1Ljc1IDAgMCAwLTEuMDYyIDBsLTEuNSAxLjVhLjc1MS43NTEgMCAwIDAgMS4wNjIgMS4wNjJsMS41LTEuNWEuNzUuNzUgMCAwIDAgMC0xLjA2MlptLTEuMDYyIDE0LjU2MmEuNzUuNzUgMCAwIDAgMS4wNjItMS4wNmwtMS41LTEuNWEuNzUuNzUgMCAwIDAtMS4wNjIgMS4wNmwxLjUgMS41WlwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJcIiBpZD1cIlwiIGNsYXNzPVwidG9nZ2xlXCIgLz5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZmlsbD1cIiM2MjZDN0ZcIlxuICAgICAgICAgICAgICBkPVwiTTExLjc3NSA0LjUyMkE3LjUgNy41IDAgMSAxIDQuODk4IDE2LjA5YzIuMTA0LS41NyA0Ljk3NC0xLjk1MyA2LjI0LTUuMzI2LjgyOC0yLjIxMS44NzYtNC40MDguNjM3LTYuMjQxWk0yMC4xODQgMTJhOC45OTcgOC45OTcgMCAwIDAtOS4zMTUtOC45OTQuNzUuNzUgMCAwIDAtLjcxMy44ODhjLjM0NSAxLjgyMS40MiA0LjA5Mi0uNDI0IDYuMzQyLTEuMiAzLjIwMS00LjIwMyA0LjI2LTYuMTE1IDQuNjA2YS43NS43NSAwIDAgMC0uNTQyIDEuMDY2QTkgOSAwIDAgMCAyMC4xODQgMTJaXCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cblxuICAgICAgPG1haW4gY2xhc3M9XCJtYWluXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0eXBlLWhlYWRpbmctbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInR5cGUtcmVndWxhclwiPldlbGNvbWUgdG8gdGhlPC9zcGFuPiBGcm9udGVuZFxuICAgICAgICAgICAgICBRdWl6IVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tc3ViLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5QaWNrIGEgc3ViamVjdCB0byBnZXQgc3RhcnRlZC48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhciBoaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19vcHRpb25zXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLXRvcGljPVwiMFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1odG1sIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9pY29uLWh0bWwuc3ZnXCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgSFRNTFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgZGF0YS10b3BpYz1cIjFcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tY3NzIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9pY29uLWNzcy5zdmdcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBDU1NcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtdG9waWM9XCIyXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWpzIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9pY29uLWpzLnN2Z1wiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEphdmFzY3JpcHRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtdG9waWM9XCIzXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWFjY2Vzc2liaWxpdHkgdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb24tYWNjZXNzaWJpbGl0eS5zdmdcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBBY2Nlc3NpYmlsaXR5XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYWluPlxuICAgICBgXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEluaXRhbFZpZXcoKVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBOYXZWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fdG9waWMnKVxuICBfZGF0YVxuXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLl9kYXRhKVxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS0ke3RoaXMuX2RhdGEucXVpei50aXRsZS50b0xvd2VyQ2FzZSgpfVwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9JHt0aGlzLl9kYXRhLnF1aXouaWNvbn1cbiAgICAgICAgICAgICAgY2xhc3M9XCJuYXZfX3RvcGljLWljb25cIlxuICAgICAgICAgICAgICBhbHQ9XCIke3RoaXMuX2RhdGEucXVpei50aXRsZX0gaWNvblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGg0IGNsYXNzPVwidHlwZS1oZWFkaW5nLXNcIiBjbGFzcz1cIm5hdl9fdG9waWMtaGVhZGluZ1wiPiR7dGhpcy5fZGF0YS5xdWl6LnRpdGxlfTwvaDQ+YFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBOYXZWaWV3KClcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcbmltcG9ydCB7IGVzY2FwZUNvZGUgfSBmcm9tICcuLi9oZWxwZXInXG5cbmNsYXNzIE9wdGlvbnNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX29wdGlvbnMnKVxuICBfYnRuRWxlbWVudFxuICBfb3B0aW9uRWxlbWVudFxuICBfc2VsZWN0ZWRPcHRpb25cbiAgX2FsbEJ1dHRvbnNcbiAgX2FsbE9wdGlvbnNcbiAgX2RhdGFcblxuICBpbml0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbiAgICB0aGlzLl9hbGxCdXR0b25zID0gdGhpcy5fcGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbicpXG4gICAgdGhpcy5fYWxsT3B0aW9ucyA9IHRoaXMuX3BhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnLnNlbGVjdGlvbi1vcHRpb24nLFxuICAgIClcbiAgfVxuXG4gIHJlbmRlckVycm9yKCkge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbXNnJylcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3Rpb24tZXJyb3ItLWhpZGRlbicpXG4gIH1cblxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJPcHRpb25zXG4gICAgICAgICAgLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIiBkYXRhLW9wdGlvbj1cIiR7aX1cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgJHt0aGlzLl9kYXRhLm9wdGlvbnNNYXBbaV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAke2VzY2FwZUNvZGUob3B0aW9uKX1cbiAgICAgIDwvYnV0dG9uPmBcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKCl9XG4gICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VibWl0IHR5cGUtaGVhZGluZy1zXCI+U3VibWl0IGFuc3dlcjwvYnV0dG9uPlxuICAgICAgIDxkaXYgY2xhc3M9J3NlbGVjdGlvbi1lcnJvciBlcnJvci1tc2cgc2VsZWN0aW9uLWVycm9yLS1oaWRkZW4nPlxuICA8aW1nIHNyYz0nYXNzZXRzL2ltYWdlcy9pY29uLWVycm9yLnN2Zyc+XG4gIDxwIGNsYXNzPSd0eXBlLW1lZGl1bSc+UGxlYXNlIHNlbGVjdCBhbiBhbnN3ZXI8L3A+XG4gIDwvZGl2PmBcbiAgfVxuXG4gIHJlc2V0Q2xhc3NlcygpIHtcbiAgICBjb25zdCBkZWZhdWx0QnRuQ2xhc3MgPSAnc2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zJ1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XG4gICAgICAnc2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zJ1xuICAgIHRoaXMuX2FsbEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaChlbCA9PiAoZWwuY2xhc3NOYW1lID0gZGVmYXVsdE9wdGlvbkNsYXNzKSlcbiAgfVxuXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcbiAgICB0aGlzLl9hbGxCdXR0b25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLS0ke3N0YXRlfWApXG4gICAgdGhpcy5fYWxsT3B0aW9uc1tvcHRpb25dLmNsYXNzTGlzdC50b2dnbGUoYHNlbGVjdGlvbi1vcHRpb24tLSR7c3RhdGV9YClcbiAgfVxuXG4gIGFkZEhhbmRsZXJTZWxlY3RPcHRpb24oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpXG4gICAgICAgIHRoaXMuX2J0bkVsZW1lbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0aW9uJylcbiAgICAgICAgdGhpcy5fb3B0aW9uRWxlbWVudCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJylcblxuICAgICAgICBpZiAoIXRoaXMuX2J0bkVsZW1lbnQgfHwgIXRoaXMuX29wdGlvbkVsZW1lbnQpIHJldHVyblxuICAgICAgICB0aGlzLl9wYXJlbnRFbGVtZW50XG4gICAgICAgICAgPy5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbXNnJylcbiAgICAgICAgICA/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGlvbi1lcnJvci0taGlkZGVuJylcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5fYnRuRWxlbWVudC5kYXRhc2V0Lm9wdGlvblxuICAgICAgICBjb25zdCBhbnN3ZXIgPSB0aGlzLl9idG5FbGVtZW50LmlubmVyVGV4dC5zbGljZSgyKS50cmltKClcblxuICAgICAgICBoYW5kbGVyKGFuc3dlciwgb3B0aW9uKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIClcbiAgfVxuXG4gIHJlbmRlckNvcnJlY3RBbnN3ZXIoc2VsZWN0ZWRPcHRpb24sIHJpZ2h0T3B0aW9uKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRCdG4gPSB0aGlzLl9hbGxCdXR0b25zW3NlbGVjdGVkT3B0aW9uXVxuICAgIGNvbnN0IHJpZ2h0QnRuID0gdGhpcy5fYWxsQnV0dG9uc1tyaWdodE9wdGlvbl1cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXN1Ym1pdCcpXG5cbiAgICByaWdodEJ0bi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiBjbGFzcz1cInNlbGVjdGlvbi10aWNrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+PHBhdGggZmlsbD1cIiMyNkQ3ODJcIiBkPVwiTTIwIDVhMTUgMTUgMCAxIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMwWm0wIDIuNWExMi41IDEyLjUgMCAxIDAgMCAyNSAxMi41IDEyLjUgMCAwIDAgMC0yNVptLTEuODc1IDE1LjEwNUwyNS4zIDE1LjQxYTEuMjUgMS4yNSAwIDAgMSAxLjkxNSAxLjU5M2wtLjE0NS4xNzQtOC4wNiA4LjA4YTEuMjUgMS4yNSAwIDAgMS0xLjU5NS4xNDhsLS4xNzUtLjE0NS00LjM3NS00LjM3NWExLjI1IDEuMjUgMCAwIDEgMS41OTUtMS45MTNsLjE3NS4xNDMgMy40OSAzLjQ5WlwiLz48L3N2Zz5gLFxuICAgIClcblxuICAgIGlmIChzZWxlY3RlZE9wdGlvbiAhPSByaWdodE9wdGlvbikge1xuICAgICAgc2VsZWN0ZWRCdG4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIGNsYXNzPVwic2VsZWN0aW9uLXRpY2tcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiI0VFNTQ1NFwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tNS40MDIgNy40MTUuMTQyLS4xNzVhMS4yNSAxLjI1IDAgMCAxIDEuNTk1LS4xNDNsLjE3NS4xNDNMMjAgMTguMjMzbDMuNDktMy40OTNhMS4yNSAxLjI1IDAgMCAxIDEuNTk1LS4xNDNsLjE3NS4xNDNhMS4yNSAxLjI1IDAgMCAxIC4xNDIgMS41OTVsLS4xNDIuMTc1TDIxLjc2NyAyMGwzLjQ5MyAzLjQ5YTEuMjUgMS4yNSAwIDAgMSAuMTQyIDEuNTk1bC0uMTQyLjE3NWExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQybC0uMTc1LS4xNDJMMjAgMjEuNzY3bC0zLjQ5IDMuNDkzYTEuMjUgMS4yNSAwIDAgMS0xLjU5NS4xNDJsLS4xNzUtLjE0MmExLjI1IDEuMjUgMCAwIDEtLjE0My0xLjU5NWwuMTQzLS4xNzVMMTguMjMzIDIwbC0zLjQ5My0zLjQ5YTEuMjUgMS4yNSAwIDAgMS0uMTQzLTEuNTk1WlwiLz48L3N2Zz5gLFxuICAgICAgKVxuICAgIH1cbiAgICB0aGlzLl9hbGxCdXR0b25zLmZvckVhY2goYnRuID0+XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLWRpc2FibGVkJyksXG4gICAgKVxuICAgIGlmICh0aGlzLl9kYXRhLnByb2dyZXNzIDw9IDkpIHtcbiAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnTmV4dCBRdWVzdGlvbidcbiAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVwbGFjZSgnYnRuLXN1Ym1pdCcsICdidG4tbmV4dCcpXG4gICAgfVxuICAgIGlmICh0aGlzLl9kYXRhLnByb2dyZXNzID09PSAxMCkge1xuICAgICAgc3VibWl0QnRuLmlubmVyVGV4dCA9ICdTZWUgRmluYWwgU2NvcmUnXG4gICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LnJlcGxhY2UoJ2J0bi1zdWJtaXQnLCAnYnRuLWFnYWluJylcbiAgICB9XG4gIH1cblxuICBhZGRIYW5kbGVyU2VsZWN0VG9waWMoaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdGlvbicpXG5cbiAgICAgIGlmICghb3B0aW9uKSByZXR1cm5cbiAgICAgIGNvbnN0IHRvcGljID0gK29wdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0aW9uLW9wdGlvbicpLmRhdGFzZXRcbiAgICAgICAgLnRvcGljXG4gICAgICBpZiAoIXRvcGljICYmIHRvcGljICE9PSAwKSByZXR1cm5cbiAgICAgIGhhbmRsZXIodG9waWMpXG4gICAgfSlcbiAgfVxuXG4gIGFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoaGFuZGxlcikge1xuICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgc3VibWl0IGFuc3dlciBoYW5kbGVyJykgLy8gRGVidWdnaW5nIGxvZ1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLXN1Ym1pdCcpXG5cbiAgICAgICAgaWYgKCFzdWJtaXRCdXR0b24pIHJldHVyblxuXG4gICAgICAgIGhhbmRsZXIoKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIClcbiAgfVxuXG4gIGFkZEhhbmRsZXJOZXh0UXVlc3Rpb24oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgbmV4dEJ0biA9XG4gICAgICAgIGUudGFyZ2V0LmNsb3Nlc3QoJy5idG4tbmV4dCcpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5idG4tYWdhaW4nKVxuICAgICAgaWYgKCFuZXh0QnRuKSByZXR1cm5cbiAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBoYW5kbGVyKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgT3B0aW9uc1ZpZXcoKVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBRdWVzdGlvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fcXVlc3Rpb24nKVxuICBfZGF0YVxuXG4gIGluaXRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbiAgfVxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHt0aGlzLl9kYXRhLnByb2dyZXNzICsgMX0gb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH08L3A+XG4gICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLW1cIj5cbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJRdWVzdGlvbn1cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PmBcbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzJyxcbiAgICApXG5cbiAgICBjb25zdCBxdWl6UHJvZ3Jlc3MgPVxuICAgICAgKCh0aGlzLl9kYXRhLnByb2dyZXNzICsgMSkgLyB0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkgKiAxMDBcblxuICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGAke3F1aXpQcm9ncmVzc30lYClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFF1ZXN0aW9uVmlldygpXG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5cbmNsYXNzIFJlc3VsdHNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICBfZGF0YVxuXG4gIGluaXRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICB9XG5cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlLXJlZ3VsYXJcIj5RdWl6IGNvbXBsZXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICBZb3Ugc2NvcmVkLi4uXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3Jlc3VsdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHQtaGVhZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tJHt0aGlzLl9kYXRhLnF1aXoudGl0bGUudG9Mb3dlckNhc2UoKX1cIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5fZGF0YS5xdWl6Lmljb259XCJcbiAgICAgICAgICAgICAgICBhbHQ9XCIke3RoaXMuX2RhdGEucXVpei50aXRsZX0gSWNvblwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInR5cGUtaGVhZGluZy1zXCIgY2xhc3M9XCJtYWluX19yZXN1bHQtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAke3RoaXMuX2RhdGEucXVpei50aXRsZX1cbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgxIGNsYXNzPVwidHlwZS1kaXNwbGF5XCI+JHt0aGlzLl9kYXRhLnNjb3JlfTwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3Jlc3VsdC1zdWItaGVhZGluZ1wiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlxuICAgICAgICAgICAgICBvdXQgb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBtYWluX19yZXN1bHQtYnRuLWFnYWluIHR5cGUtaGVhZGluZy1zXCI+UGxheSBBZ2FpbjwvYnV0dG9uPmBcbiAgfVxuXG4gIGFkZEhhbmRsZXJQbGF5QWdhaW4oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLm1haW5fX3Jlc3VsdC1idG4tYWdhaW4nKVxuICAgICAgaWYgKCFidG4pIHJldHVyblxuICAgICAgaGFuZGxlcigpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVzdWx0c1ZpZXcoKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcidcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3QgdG9nZ2xlQ29sb3JNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG4vLyBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4vLyBjb25zdCBxdWVzdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbi8vIGNvbnN0IG9wdGlvbnNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbi8vIGNvbnN0IHByb2dyZXNzQmFyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuLy8gICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhcicsXG4vLyApXG5cbi8vIGNvbnN0IHRvcGljTWFwID0ge1xuLy8gICBodG1sOiAwLFxuLy8gICBjc3M6IDEsXG4vLyAgIGpzOiAyLFxuLy8gICBhY2Nlc3NpYmlsaXR5OiAzLFxuLy8gfVxuXG4vLyBjb25zdCBvcHRpb25zTWFwID0gWydBJywgJ0InLCAnQycsICdEJ11cblxuLy8gbGV0IHRvcGljRGF0YSA9IHt9XG4vLyBsZXQgcXVlc3Rpb25Db3VudCA9IDBcblxuLy8gdG9nZ2xlQ29sb3JNb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuLy8gICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0LW1vZGUnKSkge1xuLy8gICAgIGJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoJ2xpZ2h0LW1vZGUnLCAnZGFyay1tb2RlJylcbi8vICAgfSBlbHNlIHtcbi8vICAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdkYXJrLW1vZGUnLCAnbGlnaHQtbW9kZScpXG4vLyAgIH1cbi8vIH0pXG5cbi8vIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4vLyAgIGNvbnN0IGVzY2FwZU1hcCA9IHtcbi8vICAgICAnJic6ICcmYW1wOycsXG4vLyAgICAgJzwnOiAnJmx0OycsXG4vLyAgICAgJz4nOiAnJmd0OycsXG4vLyAgICAgJ1wiJzogJyZxdW90OycsXG4vLyAgICAgXCInXCI6ICcmIzAzOTsnLFxuLy8gICB9XG5cbi8vICAgLy8gUmVwbGFjZSBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0eVxuLy8gICByZXR1cm4gc3RyLnJlcGxhY2UoL1smPD5cIiddL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuLy8gICAgIHJldHVybiBlc2NhcGVNYXBbbWF0Y2hdXG4vLyAgIH0pXG4vLyB9XG5cbi8vIGNvbnN0IGlkVG9waWMgPSBmdW5jdGlvbiAoZSkge1xuLy8gICBjb25zdCB0YXJnZXQgPSBbLi4uZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKS5jbGFzc0xpc3RdXG4vLyAgICAgLmZpbHRlcihlbCA9PiBlbC5zdGFydHNXaXRoKCdzZWxlY3Rpb24tb3B0aW9uLS0nKSlcbi8vICAgICAudG9TdHJpbmcoKVxuLy8gICAgIC5zbGljZSgxOClcbi8vICAgcmV0dXJuIHRhcmdldFxuLy8gfVxuXG4vLyBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRhcmdldCkge1xuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdkYXRhLmpzb24nKVxuLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4vLyAgIHJldHVybiBkYXRhXG4vLyB9XG5cbi8vIGNvbnN0IHNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gICBpZiAocXVlc3Rpb25Db3VudCA+IDApIHJldHVyblxuLy8gICBjb25zdCB0b3BpY0lkID0gdG9waWNNYXBbaWRUb3BpYyhlKV1cbi8vICAgY29uc3QgeyBxdWl6emVzOiBxdWl6IH0gPSBhd2FpdCBnZXREYXRhKClcbi8vICAgdG9waWNEYXRhID0gcXVpelt0b3BpY0lkXVxuLy8gICBkaXNwbGF5UXVlc3Rpb25zKClcbi8vIH1cblxuLy8gZnVuY3Rpb24gc2V0QWN0aXZlU3RhdGUoZSkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA9PT0gMCkgcmV0dXJuXG4vLyAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4vLyAgICAgcmV0dXJuXG4vLyAgIH1cbi8vICAgO1suLi5lLnRhcmdldC5jbG9zZXN0KCdkaXYnKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKV0uZm9yRWFjaChlbCA9PlxuLy8gICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbi0tYWN0aXZlJyksXG4vLyAgIClcbi8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLS1hY3RpdmUnKVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBkaXNwbGF5UXVlc3Rpb25zKCkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA8IHRvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RoKSArK3F1ZXN0aW9uQ291bnRcblxuLy8gICBjb25zdCBxdWVzdGlvbiA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLnF1ZXN0aW9uXG4vLyAgIGNvbnN0IG9wdGlvbnMgPSB0b3BpY0RhdGEucXVlc3Rpb25zW3F1ZXN0aW9uQ291bnQgLSAxXS5vcHRpb25zXG5cbi8vICAgcXVlc3Rpb25FbC5pbm5lckhUTUwgPSBgXG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4vLyAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbi8vICAgICAgICR7cXVlc3Rpb259XG4vLyAgICAgPC9oMj5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuLy8gICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5RdWVzdGlvbiAke3F1ZXN0aW9uQ291bnR9IG91dCBvZiAke3RvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RofTwvcD5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cbi8vICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzXCI+PC9kaXY+XG4vLyAgIDwvZGl2PmBcblxuLy8gICBjb25zdCBvcHRpb25zSFRNTCA9IG9wdGlvbnMubWFwKFxuLy8gICAgIChlbCwgaSkgPT5cbi8vICAgICAgIChlbCA9IGA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4vLyAgICAgICAgIDxkaXZcbi8vICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxuLy8gICAgICAgICAgICR7b3B0aW9uc01hcFtpXX1cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25zW2ldKX1cblxuLy8gICAgICAgPC9idXR0b24+YCksXG4vLyAgIClcbi8vICAgY29uc29sZS5sb2cob3B0aW9uc0hUTUwpXG4vLyAgIG9wdGlvbnNFbC5pbm5lckhUTUwgPSBbLi4ub3B0aW9uc0hUTUxdXG4vLyB9XG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUb3BpYylcbi8vIG9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldEFjdGl2ZVN0YXRlKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9