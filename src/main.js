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

init()


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
      console.log('test')
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

  initElements() {
    this._parentElement = document.querySelector('.main__question')
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlLFNBQVMsMkJBQTJCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9WaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3MvaW5pdGlhbFZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9vcHRpb25zVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3Jlc3VsdHNWaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUVVFU1RJT05fREFUQV9QQVRIID0gJy4uL2RhdGEuanNvbidcbiIsImltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4vbW9kZWwuanMnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgb3B0aW9uc1ZpZXcgZnJvbSAnLi92aWV3cy9vcHRpb25zVmlldy5qcydcbmltcG9ydCBxdWVzdGlvblZpZXcgZnJvbSAnLi92aWV3cy9xdWVzdGlvblZpZXcuanMnXG5pbXBvcnQgcmVzdWx0c1ZpZXcgZnJvbSAnLi92aWV3cy9yZXN1bHRzVmlldy5qcydcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlld3MvVmlldy5qcydcbmltcG9ydCB7IGxvYWRMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcidcbmltcG9ydCB7IGNsZWFyTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgaW5pdGlhbFZpZXcgZnJvbSAnLi92aWV3cy9pbml0aWFsVmlldy5qcydcblxuY29uc3QgdmlldyA9IG5ldyBWaWV3KClcblxuY29uc3QgY29udHJvbFNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XG4gIHRyeSB7XG4gICAgLy9HZXQgcXVpeiB0b3BpY1xuICAgIGF3YWl0IG1vZGVsLmdldFF1aXpEYXRhKCt0b3BpYylcbiAgICBtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9IDBcbiAgICBjb250cm9sUXVpeihtb2RlbC5zdGF0ZS5wcm9ncmVzcylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xRdWl6ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmIChtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBtb2RlbC5zdGF0ZS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnRyb2xSZW5kZXJSZXN1bHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy9TZXQgY3VycmVudCBxdWVzdGlvbiZvcHRpb25zLCByZW5kZXIsIHVwZGF0ZSBwcm9ncmVzcyBiYXJcblxuICAgIG1vZGVsLnNldEN1cnJlbnRRQSgpXG4gICAgcXVlc3Rpb25WaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcblxuICAgIHF1ZXN0aW9uVmlldy51cGRhdGVQcm9ncmVzc0Jhcihtb2RlbC5zdGF0ZSlcblxuICAgIC8vUmVuZGVyIG9wdGlvbnNcbiAgICBvcHRpb25zVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5jb25zdCBjb250cm9sUmVuZGVyUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJlc3VsdHNWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5jb25zdCBjb250cm9sVmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFuc3dlcnMgPSBtb2RlbC5zdGF0ZS5hbnN3ZXJzXG4gIGlmIChhbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm5cbiAgaWYgKCFhbnN3ZXJzLnNlbGVjdGVkWzJdKSB7XG4gICAgb3B0aW9uc1ZpZXcucmVuZGVyRXJyb3IoKVxuICAgIHJldHVyblxuICB9XG4gIGlmIChtb2RlbC52YWxpZGF0ZUFuc3dlcigpKSB7XG4gICAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnNlbGVjdGVkWzBdLCAncGlja2VkLWNvcnJlY3QnKVxuICB9IGVsc2Uge1xuICAgIG9wdGlvbnNWaWV3LnJlc2V0Q2xhc3NlcygpXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5zZWxlY3RlZFswXSwgJ3BpY2tlZC1pbmNvcnJlY3QnKVxuICAgIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKGFuc3dlcnMucmlnaHRbMF0sICdwaWNrZWQtY29ycmVjdCcpXG4gIH1cblxuICBvcHRpb25zVmlldy5yZW5kZXJDb3JyZWN0QW5zd2VyKGFuc3dlcnMuc2VsZWN0ZWRbMF0sIGFuc3dlcnMucmlnaHRbMF0pXG59XG5cbmNvbnN0IGNvbnRyb2xTZWxlY3RPcHRpb24gPSBmdW5jdGlvbiAoYW5zd2VyLCBvcHRpb24pIHtcbiAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBudWxsIHx8IG1vZGVsLnN0YXRlLmFuc3dlcnMuYW5zd2VyZWQpIHJldHVyblxuICBtb2RlbC5zdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzJdID0gdHJ1ZVxuXG4gIG9wdGlvbnNWaWV3LnJlc2V0Q2xhc3NlcygpXG4gIG1vZGVsLnN0YXRlLnNldFNlbGVjdGVkQW5zd2VyKG9wdGlvbiwgYW5zd2VyKVxuICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShvcHRpb24sICdhY3RpdmUnKVxufVxuXG5jb25zdCBjb250cm9sTmV4dFF1ZXN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIW1vZGVsLnN0YXRlLmFuc3dlcnMuYW5zd2VyZWQpIHJldHVyblxuXG4gIGNvbnRyb2xRdWl6KClcbn1cblxuY29uc3QgY29udHJvbExpZ2h0TW9kZSA9IGZ1bmN0aW9uIChjb2xvck1vZGUgPSBtb2RlbC5zdGF0ZS50aGVtZSkge1xuICBtb2RlbC5zdGF0ZS5zZXRDb2xvck1vZGUoY29sb3JNb2RlKVxuICB2aWV3LnNldENvbG9yVGhlbWUoY29sb3JNb2RlKVxufVxuXG5jb25zdCBjb250cm9Mb2FkID0gZnVuY3Rpb24gKCkge1xuICBsb2FkTG9jYWxTdG9yYWdlKG1vZGVsLnN0YXRlKVxuICBjb250cm9sUXVpeigpXG4gIGNvbnRyb2xMaWdodE1vZGUoKVxufVxuXG5jb25zdCBjb250cm9sUGxheUFnYWluID0gZnVuY3Rpb24gKCkge1xuICBtb2RlbC5zdGF0ZS5yZXNldCgpXG4gIGNsZWFyTG9jYWxTdG9yYWdlKClcbiAgaW5pdGlhbFZpZXcucmVuZGVyKG1vZGVsLnN0YXRlKVxuICBvcHRpb25zVmlldy5pbml0RWxlbWVudHMoKVxuICBxdWVzdGlvblZpZXcuaW5pdEVsZW1lbnRzKClcbiAgcmVzdWx0c1ZpZXcuaW5pdEVsZW1lbnRzKClcbiAgaW5pdCgpXG4gIGNvbnNvbGUubG9nKG1vZGVsLnN0YXRlKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmlldy5hZGRIYW5kbGVyTG9hZChjb250cm9Mb2FkKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0VG9waWMoY29udHJvbFNlbGVjdFRvcGljKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0T3B0aW9uKGNvbnRyb2xTZWxlY3RPcHRpb24pXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoY29udHJvbFZhbGlkYXRlQW5zd2VyKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGNvbnRyb2xOZXh0UXVlc3Rpb24pXG4gIHZpZXcuYWRkSGFuZGxlckNoYW5nZUNvbG9yVGhlbWUoY29udHJvbExpZ2h0TW9kZSlcbiAgcmVzdWx0c1ZpZXcuYWRkSGFuZGxlclBsYXlBZ2Fpbihjb250cm9sUGxheUFnYWluKVxufVxuXG5pbml0KClcbiIsImV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybClcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxuICAgIHJldHVybiBkYXRhXG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufVxuXG5leHBvcnQgY29uc3QgZXNjYXBlQ29kZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVzY2FwZUNoYXJhY3RlciA9IFsnPCcsICc+JywgJyYnXVxuICAgICAgY29uc3QgZXNjYXBlTWFwID0gWycmbHQ7JywgJyZndDsnLCAnJmFtcDsnXVxuXG4gICAgICByZXR1cm4gc3RyaW5nXG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLm1hcChjaGFyYWN0ZXIgPT4ge1xuICAgICAgICAgIGlmIChlc2NhcGVDaGFyYWN0ZXIuaW5kZXhPZihjaGFyYWN0ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlclxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKGNoYXJhY3RlciA9XG4gICAgICAgICAgICAgIGVzY2FwZU1hcFtlc2NhcGVDaGFyYWN0ZXIuaW5kZXhPZihjaGFyYWN0ZXIpXSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RyaW5nXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge31cbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxvYWRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2F2ZWRTdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0YXRlJykpXG4gICAgaWYgKCFzYXZlZFN0YXRlKSByZXR1cm5cbiAgICBPYmplY3QuYXNzaWduKG9iamVjdCwgc2F2ZWRTdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbGVhckxvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgbG9jYWxTdG9yYWdlLmNsZWFyKClcbn1cbiIsImltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2hlbHBlcidcbmltcG9ydCB7IFFVRVNUSU9OX0RBVEFfUEFUSCB9IGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IHsgc2F2ZUxvY2FsU3RvcmFnZSB9IGZyb20gJy4vaGVscGVyJ1xuXG5jb25zdCBkZWZhdWx0U3RhdGUgPSB7XG4gIHF1aXo6IHt9LFxuICBjdXJyUXVlc3Rpb246ICcnLFxuICBjdXJyT3B0aW9uczogW10sXG4gIHByb2dyZXNzOiBudWxsLFxuICBvcHRpb25zTWFwOiBbJ0EnLCAnQicsICdDJywgJ0QnXSxcbiAgc2NvcmU6IDAsXG4gIGFuc3dlcnM6IHtcbiAgICBzZWxlY3RlZDogWzAsICcnLCBmYWxzZV0sXG4gICAgcmlnaHQ6IFswLCAnJ10sXG4gICAgYW5zd2VyZWQ6IGZhbHNlLFxuICB9LFxuICB0aGVtZTogJ2xpZ2h0JywgLy90cnVlID0gbGlnaHQgYXMgZGVmYXVsdFxufVxuXG5leHBvcnQgY29uc3Qgc3RhdGUgPSB7XG4gIC4uLmRlZmF1bHRTdGF0ZSxcblxuICByZXNldCgpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGVmYXVsdFN0YXRlKSkpXG4gIH0sXG5cbiAgc2V0UXVpeihxdWl6KSB7XG4gICAgdGhpcy5xdWl6ID0gcXVpelxuICB9LFxuXG4gIHNldEN1cnJRdWVzdGlvbigpIHtcbiAgICB0aGlzLmN1cnJRdWVzdGlvbiA9IHRoaXMucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLnF1ZXN0aW9uXG4gIH0sXG5cbiAgc2V0Q3Vyck9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuY3Vyck9wdGlvbnMgPSBzdGF0ZS5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10ub3B0aW9uc1xuICB9LFxuXG4gIHNldFByb2dyZXNzKCkge1xuICAgIHRoaXMucHJvZ3Jlc3MgKz0gMVxuICB9LFxuXG4gIHNldFNjb3JlKCkge1xuICAgIHRoaXMuc2NvcmUgKz0gMVxuICB9LFxuXG4gIHNldFJpZ2h0QW5zd2VyKCkge1xuICAgIHRoaXMuYW5zd2Vycy5yaWdodFsxXSA9IHRoaXMucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLmFuc3dlclxuICAgIHRoaXMuYW5zd2Vycy5yaWdodFswXSA9IHRoaXMuY3Vyck9wdGlvbnMuZmluZEluZGV4KFxuICAgICAgYW5zd2VyID0+IGFuc3dlciA9PT0gdGhpcy5nZXRSaWdodEFuc3dlcigpLFxuICAgIClcbiAgfSxcblxuICBzZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcikge1xuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFswXSA9ICtvcHRpb25cbiAgICB0aGlzLmFuc3dlcnMuc2VsZWN0ZWRbMV0gPSBhbnN3ZXJcbiAgfSxcblxuICBzZXRBbnN3ZXJlZCh2YWx1ZSkge1xuICAgIHRoaXMuYW5zd2Vycy5hbnN3ZXJlZCA9IHN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSB2YWx1ZVxuICB9LFxuICBzZXRDb2xvck1vZGUodGhlbWUpIHtcbiAgICB0aGlzLnRoZW1lID0gdGhlbWVcbiAgICBzYXZlTG9jYWxTdG9yYWdlKHN0YXRlKVxuICAgIHJldHVybiB0aGlzLnRoZW1lXG4gIH0sXG4gIGdldFJpZ2h0QW5zd2VyKCkge1xuICAgIHJldHVybiB0aGlzLmFuc3dlcnMucmlnaHRbMV1cbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IGdldFF1aXpEYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XG4gIGNvbnN0IHsgcXVpenplcyB9ID0gYXdhaXQgZ2V0RGF0YShRVUVTVElPTl9EQVRBX1BBVEgpXG4gIHN0YXRlLnNldFF1aXoocXVpenplc1t0b3BpY10pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50UUEgPSBmdW5jdGlvbiAoKSB7XG4gIHN0YXRlLnNldEN1cnJRdWVzdGlvbigpXG4gIHN0YXRlLnNldEN1cnJPcHRpb25zKClcbiAgc3RhdGUuc2V0QW5zd2VyZWQoZmFsc2UpXG4gIHNhdmVMb2NhbFN0b3JhZ2Uoc3RhdGUpXG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFuc3dlciA9IGZ1bmN0aW9uICgpIHtcbiAgc3RhdGUuc2V0UmlnaHRBbnN3ZXIoKVxuICBzdGF0ZS5zZXRQcm9ncmVzcygpXG4gIHN0YXRlLnNldEFuc3dlcmVkKHRydWUpXG4gIHNhdmVMb2NhbFN0b3JhZ2Uoc3RhdGUpXG5cbiAgaWYgKHN0YXRlLmdldFJpZ2h0QW5zd2VyKCkgPT09IHN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMV0pIHtcbiAgICBzdGF0ZS5zZXRTY29yZSgpXG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIF9kYXRhXG5cbiAgcmVuZGVyKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVyblxuICAgIHRoaXMuX2RhdGEgPSBkYXRhXG5cbiAgICBjb25zdCBtYXJrdXAgPSB0aGlzLl9nZW5lcmF0ZU1hcmt1cCgpXG5cbiAgICB0aGlzLmNsZWFyKClcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1hcmt1cClcbiAgfVxuXG4gIHVwZGF0ZSgpIHt9XG5cbiAgcmVuZGVyRXJyb3IoKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJylcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGFkZEhhbmRsZXJDaGFuZ2VDb2xvclRoZW1lKGhhbmRsZXIpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlJylcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IGNvbG9yTW9kZSA9IHRvZ2dsZS5jaGVja2VkID8gJ2RhcmsnIDogJ2xpZ2h0J1xuICAgICAgaGFuZGxlcihjb2xvck1vZGUpXG4gICAgfSlcbiAgfVxuXG4gIHNldENvbG9yVGhlbWUoY29sb3JNb2RlKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpLmNoZWNrZWQgPVxuICAgICAgY29sb3JNb2RlID09PSAnbGlnaHQnID8gZmFsc2UgOiB0cnVlXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVwbGFjZShcbiAgICAgIGAke2NvbG9yTW9kZSA9PT0gJ2xpZ2h0JyA/ICdkYXJrJyA6ICdsaWdodCd9LW1vZGVgLFxuICAgICAgYCR7Y29sb3JNb2RlfS1tb2RlYCxcbiAgICApXG4gIH1cblxuICBhZGRIYW5kbGVyTG9hZChoYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaGFuZGxlcigpXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBJbml0YWxWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcicpXG4gIF9kYXRhXG5cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgPG5hdiBjbGFzcz1cIm5hdlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2X190b3BpYyBoaWRkZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1hY2Nlc3NpYmlsaXR5XCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cImFzc2V0cy9pbWFnZXMvaWNvbi1hY2Nlc3NpYmlsaXR5LnN2Z1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwibmF2X190b3BpYy1pY29uXCJcbiAgICAgICAgICAgICAgYWx0PVwiXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDQgY2xhc3M9XCJ0eXBlLWhlYWRpbmctc1wiIGNsYXNzPVwibmF2X190b3BpYy1oZWFkaW5nXCI+VG9waWM8L2g0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hdl9fdG9nZ2xlXCI+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGZpbGw9XCIjNjI2QzdGXCJcbiAgICAgICAgICAgICAgZD1cIk0xMiAxLjVhLjc1Ljc1IDAgMCAxIC43NS43NXYxLjVhLjc1Ljc1IDAgMSAxLTEuNSAwdi0xLjVBLjc1Ljc1IDAgMCAxIDEyIDEuNVptMCAxNWE0LjUgNC41IDAgMSAwIDAtOSA0LjUgNC41IDAgMCAwIDAgOVptMC0xLjVhMyAzIDAgMSAxIDAtNiAzIDMgMCAwIDEgMCA2Wm05Ljc1LTIuMjVhLjc1Ljc1IDAgMSAwIDAtMS41aC0xLjVhLjc1Ljc1IDAgMSAwIDAgMS41aDEuNVpNMTIgMTkuNWEuNzUuNzUgMCAwIDEgLjc1Ljc1djEuNWEuNzUuNzUgMCAxIDEtMS41IDB2LTEuNWEuNzUuNzUgMCAwIDEgLjc1LS43NVptLTguMjUtNi43NWEuNzUuNzUgMCAxIDAgMC0xLjVoLTEuNWEuNzUuNzUgMCAxIDAgMCAxLjVoMS41Wm0uOTY5LTguMDMxYS43NS43NSAwIDAgMSAxLjA2MiAwbDEuNSAxLjVhLjc1MS43NTEgMCAwIDEtMS4wNjIgMS4wNjJsLTEuNS0xLjVhLjc1Ljc1IDAgMCAxIDAtMS4wNjJabTEuMDYyIDE0LjU2MmEuNzUuNzUgMCAxIDEtMS4wNjItMS4wNmwxLjUtMS41YS43NS43NSAwIDEgMSAxLjA2MiAxLjA2bC0xLjUgMS41Wm0xMy41LTE0LjU2MmEuNzUuNzUgMCAwIDAtMS4wNjIgMGwtMS41IDEuNWEuNzUxLjc1MSAwIDAgMCAxLjA2MiAxLjA2MmwxLjUtMS41YS43NS43NSAwIDAgMCAwLTEuMDYyWm0tMS4wNjIgMTQuNTYyYS43NS43NSAwIDAgMCAxLjA2Mi0xLjA2bC0xLjUtMS41YS43NS43NSAwIDAgMC0xLjA2MiAxLjA2bDEuNSAxLjVaXCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIlwiIGlkPVwiXCIgY2xhc3M9XCJ0b2dnbGVcIiAvPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgd2lkdGg9XCIyNFwiXG4gICAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBmaWxsPVwiIzYyNkM3RlwiXG4gICAgICAgICAgICAgIGQ9XCJNMTEuNzc1IDQuNTIyQTcuNSA3LjUgMCAxIDEgNC44OTggMTYuMDljMi4xMDQtLjU3IDQuOTc0LTEuOTUzIDYuMjQtNS4zMjYuODI4LTIuMjExLjg3Ni00LjQwOC42MzctNi4yNDFaTTIwLjE4NCAxMmE4Ljk5NyA4Ljk5NyAwIDAgMC05LjMxNS04Ljk5NC43NS43NSAwIDAgMC0uNzEzLjg4OGMuMzQ1IDEuODIxLjQyIDQuMDkyLS40MjQgNi4zNDItMS4yIDMuMjAxLTQuMjAzIDQuMjYtNi4xMTUgNC42MDZhLjc1Ljc1IDAgMCAwLS41NDIgMS4wNjZBOSA5IDAgMCAwIDIwLjE4NCAxMlpcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuXG4gICAgICA8bWFpbiBjbGFzcz1cIm1haW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZS1yZWd1bGFyXCI+V2VsY29tZSB0byB0aGU8L3NwYW4+IEZyb250ZW5kXG4gICAgICAgICAgICAgIFF1aXohXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlBpY2sgYSBzdWJqZWN0IHRvIGdldCBzdGFydGVkLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyIGhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX29wdGlvbnNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtdG9waWM9XCIwXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWh0bWwgdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb24taHRtbC5zdmdcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBIVE1MXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLXRvcGljPVwiMVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1jc3MgdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb24tY3NzLnN2Z1wiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIENTU1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgZGF0YS10b3BpYz1cIjJcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tanMgdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJhc3NldHMvaW1hZ2VzL2ljb24tanMuc3ZnXCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgSmF2YXNjcmlwdFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgZGF0YS10b3BpYz1cIjNcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tYWNjZXNzaWJpbGl0eSB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvaWNvbi1hY2Nlc3NpYmlsaXR5LnN2Z1wiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEFjY2Vzc2liaWxpdHlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21haW4+XG4gICAgIGBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgSW5pdGFsVmlldygpXG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5pbXBvcnQgeyBlc2NhcGVDb2RlIH0gZnJvbSAnLi4vaGVscGVyJ1xuXG5jbGFzcyBPcHRpb25zVmlldyBleHRlbmRzIFZpZXcge1xuICBfcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbiAgX2J0bkVsZW1lbnRcbiAgX29wdGlvbkVsZW1lbnRcbiAgX3NlbGVjdGVkT3B0aW9uXG4gIF9hbGxCdXR0b25zXG4gIF9hbGxPcHRpb25zXG4gIF9kYXRhXG5cbiAgaW5pdEVsZW1lbnRzKCkge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fb3B0aW9ucycpXG4gICAgdGhpcy5fYWxsQnV0dG9ucyA9IHRoaXMuX3BhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24nKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMgPSB0aGlzLl9wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgJy5zZWxlY3Rpb24tb3B0aW9uJyxcbiAgICApXG4gIH1cblxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJPcHRpb25zXG4gICAgICAgICAgLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIiBkYXRhLW9wdGlvbj1cIiR7aX1cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgJHt0aGlzLl9kYXRhLm9wdGlvbnNNYXBbaV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAke2VzY2FwZUNvZGUob3B0aW9uKX1cbiAgICAgIDwvYnV0dG9uPmBcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKCl9XG4gICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VibWl0IHR5cGUtaGVhZGluZy1zXCI+U3VibWl0IGFuc3dlcjwvYnV0dG9uPmBcbiAgfVxuXG4gIHJlc2V0Q2xhc3NlcygpIHtcbiAgICBjb25zdCBkZWZhdWx0QnRuQ2xhc3MgPSAnc2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zJ1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XG4gICAgICAnc2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zJ1xuICAgIHRoaXMuX2FsbEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaChlbCA9PiAoZWwuY2xhc3NOYW1lID0gZGVmYXVsdE9wdGlvbkNsYXNzKSlcbiAgfVxuXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcbiAgICB0aGlzLl9hbGxCdXR0b25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLS0ke3N0YXRlfWApXG4gICAgdGhpcy5fYWxsT3B0aW9uc1tvcHRpb25dLmNsYXNzTGlzdC50b2dnbGUoYHNlbGVjdGlvbi1vcHRpb24tLSR7c3RhdGV9YClcbiAgfVxuXG4gIGFkZEhhbmRsZXJTZWxlY3RPcHRpb24oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpXG4gICAgICAgIHRoaXMuX2J0bkVsZW1lbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0aW9uJylcbiAgICAgICAgdGhpcy5fb3B0aW9uRWxlbWVudCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJylcblxuICAgICAgICBpZiAoIXRoaXMuX2J0bkVsZW1lbnQgfHwgIXRoaXMuX29wdGlvbkVsZW1lbnQpIHJldHVyblxuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLl9idG5FbGVtZW50LmRhdGFzZXQub3B0aW9uXG4gICAgICAgIGNvbnN0IGFuc3dlciA9IHRoaXMuX2J0bkVsZW1lbnQuaW5uZXJUZXh0LnNsaWNlKDIpLnRyaW0oKVxuXG4gICAgICAgIGhhbmRsZXIoYW5zd2VyLCBvcHRpb24pXG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgKVxuICB9XG5cbiAgcmVuZGVyQ29ycmVjdEFuc3dlcihzZWxlY3RlZE9wdGlvbiwgcmlnaHRPcHRpb24pIHtcbiAgICBjb25zdCBzZWxlY3RlZEJ0biA9IHRoaXMuX2FsbEJ1dHRvbnNbc2VsZWN0ZWRPcHRpb25dXG4gICAgY29uc3QgcmlnaHRCdG4gPSB0aGlzLl9hbGxCdXR0b25zW3JpZ2h0T3B0aW9uXVxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc3VibWl0JylcblxuICAgIHJpZ2h0QnRuLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIGNsYXNzPVwic2VsZWN0aW9uLXRpY2tcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiIzI2RDc4MlwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tMS44NzUgMTUuMTA1TDI1LjMgMTUuNDFhMS4yNSAxLjI1IDAgMCAxIDEuOTE1IDEuNTkzbC0uMTQ1LjE3NC04LjA2IDguMDhhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0OGwtLjE3NS0uMTQ1LTQuMzc1LTQuMzc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0xLjkxM2wuMTc1LjE0MyAzLjQ5IDMuNDlaXCIvPjwvc3ZnPmAsXG4gICAgKVxuXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uICE9IHJpZ2h0T3B0aW9uKSB7XG4gICAgICBzZWxlY3RlZEJ0bi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQwXCIgY2xhc3M9XCJzZWxlY3Rpb24tdGlja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCA0MCA0MFwiPjxwYXRoIGZpbGw9XCIjRUU1NDU0XCIgZD1cIk0yMCA1YTE1IDE1IDAgMSAxIDAgMzAgMTUgMTUgMCAwIDEgMC0zMFptMCAyLjVhMTIuNSAxMi41IDAgMSAwIDAgMjUgMTIuNSAxMi41IDAgMCAwIDAtMjVabS01LjQwMiA3LjQxNS4xNDItLjE3NWExLjI1IDEuMjUgMCAwIDEgMS41OTUtLjE0M2wuMTc1LjE0M0wyMCAxOC4yMzNsMy40OS0zLjQ5M2ExLjI1IDEuMjUgMCAwIDEgMS41OTUtLjE0M2wuMTc1LjE0M2ExLjI1IDEuMjUgMCAwIDEgLjE0MiAxLjU5NWwtLjE0Mi4xNzVMMjEuNzY3IDIwbDMuNDkzIDMuNDlhMS4yNSAxLjI1IDAgMCAxIC4xNDIgMS41OTVsLS4xNDIuMTc1YTEuMjUgMS4yNSAwIDAgMS0xLjU5NS4xNDJsLS4xNzUtLjE0MkwyMCAyMS43NjdsLTMuNDkgMy40OTNhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0MmwtLjE3NS0uMTQyYTEuMjUgMS4yNSAwIDAgMS0uMTQzLTEuNTk1bC4xNDMtLjE3NUwxOC4yMzMgMjBsLTMuNDkzLTMuNDlhMS4yNSAxLjI1IDAgMCAxLS4xNDMtMS41OTVaXCIvPjwvc3ZnPmAsXG4gICAgICApXG4gICAgfVxuICAgIHRoaXMuX2FsbEJ1dHRvbnMuZm9yRWFjaChidG4gPT5cbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24tZGlzYWJsZWQnKSxcbiAgICApXG4gICAgaWYgKHRoaXMuX2RhdGEucHJvZ3Jlc3MgPD0gOSkge1xuICAgICAgc3VibWl0QnRuLmlubmVyVGV4dCA9ICdOZXh0IFF1ZXN0aW9uJ1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5yZXBsYWNlKCdidG4tc3VibWl0JywgJ2J0bi1uZXh0JylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RhdGEucHJvZ3Jlc3MgPT09IDEwKSB7XG4gICAgICBzdWJtaXRCdG4uaW5uZXJUZXh0ID0gJ1NlZSBGaW5hbCBTY29yZSdcbiAgICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVwbGFjZSgnYnRuLXN1Ym1pdCcsICdidG4tYWdhaW4nKVxuICAgIH1cbiAgfVxuXG4gIGFkZEhhbmRsZXJTZWxlY3RUb3BpYyhoYW5kbGVyKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBvcHRpb24gPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0aW9uJylcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcbiAgICAgIGlmICghb3B0aW9uKSByZXR1cm5cbiAgICAgIGNvbnN0IHRvcGljID0gK29wdGlvbi5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0aW9uLW9wdGlvbicpLmRhdGFzZXRcbiAgICAgICAgLnRvcGljXG4gICAgICBpZiAoIXRvcGljICYmIHRvcGljICE9PSAwKSByZXR1cm5cbiAgICAgIGhhbmRsZXIodG9waWMpXG4gICAgfSlcbiAgfVxuXG4gIGFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLXN1Ym1pdCcpXG5cbiAgICAgICAgaWYgKCFzdWJtaXRCdXR0b24pIHJldHVyblxuXG4gICAgICAgIGhhbmRsZXIoKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIClcbiAgfVxuXG4gIGFkZEhhbmRsZXJOZXh0UXVlc3Rpb24oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgbmV4dEJ0biA9XG4gICAgICAgIGUudGFyZ2V0LmNsb3Nlc3QoJy5idG4tbmV4dCcpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5idG4tYWdhaW4nKVxuICAgICAgaWYgKCFuZXh0QnRuKSByZXR1cm5cbiAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBoYW5kbGVyKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgT3B0aW9uc1ZpZXcoKVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBRdWVzdGlvblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fcXVlc3Rpb24nKVxuICBfZGF0YVxuXG4gIGluaXRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbiAgfVxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHt0aGlzLl9kYXRhLnByb2dyZXNzICsgMX0gb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH08L3A+XG4gICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJRdWVzdGlvbn1cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PmBcbiAgfVxuXG4gIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzJyxcbiAgICApXG5cbiAgICBjb25zdCBxdWl6UHJvZ3Jlc3MgPVxuICAgICAgKCh0aGlzLl9kYXRhLnByb2dyZXNzICsgMSkgLyB0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkgKiAxMDBcblxuICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGAke3F1aXpQcm9ncmVzc30lYClcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFF1ZXN0aW9uVmlldygpXG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5cbmNsYXNzIFJlc3VsdHNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICBfZGF0YVxuXG4gIGluaXRFbGVtZW50cygpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICB9XG5cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlLXJlZ3VsYXJcIj5RdWl6IGNvbXBsZXRlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICBZb3Ugc2NvcmVkLi4uXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3Jlc3VsdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHQtaGVhZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0tJHt0aGlzLl9kYXRhLnF1aXoudGl0bGUudG9Mb3dlckNhc2UoKX1cIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5fZGF0YS5xdWl6Lmljb259XCJcbiAgICAgICAgICAgICAgICBhbHQ9XCIke3RoaXMuX2RhdGEucXVpei50aXRsZX0gSWNvblwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoNCBjbGFzcz1cInR5cGUtaGVhZGluZy1zXCIgY2xhc3M9XCJtYWluX19yZXN1bHQtaGVhZGluZ1wiPlxuICAgICAgICAgICAgICAke3RoaXMuX2RhdGEucXVpei50aXRsZX1cbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGgxIGNsYXNzPVwidHlwZS1kaXNwbGF5XCI+JHt0aGlzLl9kYXRhLnNjb3JlfTwvaDE+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3Jlc3VsdC1zdWItaGVhZGluZ1wiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlxuICAgICAgICAgICAgICBvdXQgb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBtYWluX19yZXN1bHQtYnRuLWFnYWluIHR5cGUtaGVhZGluZy1zXCI+UGxheSBBZ2FpbjwvYnV0dG9uPmBcbiAgfVxuXG4gIGFkZEhhbmRsZXJQbGF5QWdhaW4oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLm1haW5fX3Jlc3VsdC1idG4tYWdhaW4nKVxuICAgICAgaWYgKCFidG4pIHJldHVyblxuICAgICAgaGFuZGxlcigpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUmVzdWx0c1ZpZXcoKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcidcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3QgdG9nZ2xlQ29sb3JNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG4vLyBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4vLyBjb25zdCBxdWVzdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbi8vIGNvbnN0IG9wdGlvbnNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbi8vIGNvbnN0IHByb2dyZXNzQmFyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuLy8gICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhcicsXG4vLyApXG5cbi8vIGNvbnN0IHRvcGljTWFwID0ge1xuLy8gICBodG1sOiAwLFxuLy8gICBjc3M6IDEsXG4vLyAgIGpzOiAyLFxuLy8gICBhY2Nlc3NpYmlsaXR5OiAzLFxuLy8gfVxuXG4vLyBjb25zdCBvcHRpb25zTWFwID0gWydBJywgJ0InLCAnQycsICdEJ11cblxuLy8gbGV0IHRvcGljRGF0YSA9IHt9XG4vLyBsZXQgcXVlc3Rpb25Db3VudCA9IDBcblxuLy8gdG9nZ2xlQ29sb3JNb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuLy8gICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0LW1vZGUnKSkge1xuLy8gICAgIGJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoJ2xpZ2h0LW1vZGUnLCAnZGFyay1tb2RlJylcbi8vICAgfSBlbHNlIHtcbi8vICAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdkYXJrLW1vZGUnLCAnbGlnaHQtbW9kZScpXG4vLyAgIH1cbi8vIH0pXG5cbi8vIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4vLyAgIGNvbnN0IGVzY2FwZU1hcCA9IHtcbi8vICAgICAnJic6ICcmYW1wOycsXG4vLyAgICAgJzwnOiAnJmx0OycsXG4vLyAgICAgJz4nOiAnJmd0OycsXG4vLyAgICAgJ1wiJzogJyZxdW90OycsXG4vLyAgICAgXCInXCI6ICcmIzAzOTsnLFxuLy8gICB9XG5cbi8vICAgLy8gUmVwbGFjZSBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0eVxuLy8gICByZXR1cm4gc3RyLnJlcGxhY2UoL1smPD5cIiddL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuLy8gICAgIHJldHVybiBlc2NhcGVNYXBbbWF0Y2hdXG4vLyAgIH0pXG4vLyB9XG5cbi8vIGNvbnN0IGlkVG9waWMgPSBmdW5jdGlvbiAoZSkge1xuLy8gICBjb25zdCB0YXJnZXQgPSBbLi4uZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKS5jbGFzc0xpc3RdXG4vLyAgICAgLmZpbHRlcihlbCA9PiBlbC5zdGFydHNXaXRoKCdzZWxlY3Rpb24tb3B0aW9uLS0nKSlcbi8vICAgICAudG9TdHJpbmcoKVxuLy8gICAgIC5zbGljZSgxOClcbi8vICAgcmV0dXJuIHRhcmdldFxuLy8gfVxuXG4vLyBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRhcmdldCkge1xuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdkYXRhLmpzb24nKVxuLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4vLyAgIHJldHVybiBkYXRhXG4vLyB9XG5cbi8vIGNvbnN0IHNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gICBpZiAocXVlc3Rpb25Db3VudCA+IDApIHJldHVyblxuLy8gICBjb25zdCB0b3BpY0lkID0gdG9waWNNYXBbaWRUb3BpYyhlKV1cbi8vICAgY29uc3QgeyBxdWl6emVzOiBxdWl6IH0gPSBhd2FpdCBnZXREYXRhKClcbi8vICAgdG9waWNEYXRhID0gcXVpelt0b3BpY0lkXVxuLy8gICBkaXNwbGF5UXVlc3Rpb25zKClcbi8vIH1cblxuLy8gZnVuY3Rpb24gc2V0QWN0aXZlU3RhdGUoZSkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA9PT0gMCkgcmV0dXJuXG4vLyAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4vLyAgICAgcmV0dXJuXG4vLyAgIH1cbi8vICAgO1suLi5lLnRhcmdldC5jbG9zZXN0KCdkaXYnKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKV0uZm9yRWFjaChlbCA9PlxuLy8gICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbi0tYWN0aXZlJyksXG4vLyAgIClcbi8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLS1hY3RpdmUnKVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBkaXNwbGF5UXVlc3Rpb25zKCkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA8IHRvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RoKSArK3F1ZXN0aW9uQ291bnRcblxuLy8gICBjb25zdCBxdWVzdGlvbiA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLnF1ZXN0aW9uXG4vLyAgIGNvbnN0IG9wdGlvbnMgPSB0b3BpY0RhdGEucXVlc3Rpb25zW3F1ZXN0aW9uQ291bnQgLSAxXS5vcHRpb25zXG5cbi8vICAgcXVlc3Rpb25FbC5pbm5lckhUTUwgPSBgXG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4vLyAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbi8vICAgICAgICR7cXVlc3Rpb259XG4vLyAgICAgPC9oMj5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuLy8gICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5RdWVzdGlvbiAke3F1ZXN0aW9uQ291bnR9IG91dCBvZiAke3RvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RofTwvcD5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cbi8vICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzXCI+PC9kaXY+XG4vLyAgIDwvZGl2PmBcblxuLy8gICBjb25zdCBvcHRpb25zSFRNTCA9IG9wdGlvbnMubWFwKFxuLy8gICAgIChlbCwgaSkgPT5cbi8vICAgICAgIChlbCA9IGA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4vLyAgICAgICAgIDxkaXZcbi8vICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxuLy8gICAgICAgICAgICR7b3B0aW9uc01hcFtpXX1cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25zW2ldKX1cblxuLy8gICAgICAgPC9idXR0b24+YCksXG4vLyAgIClcbi8vICAgY29uc29sZS5sb2cob3B0aW9uc0hUTUwpXG4vLyAgIG9wdGlvbnNFbC5pbm5lckhUTUwgPSBbLi4ub3B0aW9uc0hUTUxdXG4vLyB9XG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUb3BpYylcbi8vIG9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldEFjdGl2ZVN0YXRlKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9