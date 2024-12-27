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

        if (!this._btnElement && !this._optionElement) return
        this._parentElement
          .querySelector('.error-msg')
          .classList.add('selection-error--hidden')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOMEM7O0FBRTFDLDZDQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLGlCQUFpQjtBQUNqQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlLFNBQVMsMkJBQTJCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9WaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3MvaW5pdGlhbFZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9vcHRpb25zVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3Jlc3VsdHNWaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUVVFU1RJT05fREFUQV9QQVRIID0gJy4uL2RhdGEuanNvbidcbiIsImltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4vbW9kZWwuanMnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgb3B0aW9uc1ZpZXcgZnJvbSAnLi92aWV3cy9vcHRpb25zVmlldy5qcydcbmltcG9ydCBxdWVzdGlvblZpZXcgZnJvbSAnLi92aWV3cy9xdWVzdGlvblZpZXcuanMnXG5pbXBvcnQgcmVzdWx0c1ZpZXcgZnJvbSAnLi92aWV3cy9yZXN1bHRzVmlldy5qcydcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlld3MvVmlldy5qcydcbmltcG9ydCB7IGxvYWRMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcidcbmltcG9ydCB7IGNsZWFyTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXIuanMnXG5pbXBvcnQgaW5pdGlhbFZpZXcgZnJvbSAnLi92aWV3cy9pbml0aWFsVmlldy5qcydcblxuY29uc3QgdmlldyA9IG5ldyBWaWV3KClcblxuY29uc3QgY29udHJvbFNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XG4gIHRyeSB7XG4gICAgLy9HZXQgcXVpeiB0b3BpY1xuICAgIGF3YWl0IG1vZGVsLmdldFF1aXpEYXRhKCt0b3BpYylcbiAgICBtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9IDBcbiAgICBjb250cm9sUXVpeihtb2RlbC5zdGF0ZS5wcm9ncmVzcylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xRdWl6ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmIChtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBtb2RlbC5zdGF0ZS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnRyb2xSZW5kZXJSZXN1bHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy9TZXQgY3VycmVudCBxdWVzdGlvbiZvcHRpb25zLCByZW5kZXIsIHVwZGF0ZSBwcm9ncmVzcyBiYXJcblxuICAgIG1vZGVsLnNldEN1cnJlbnRRQSgpXG4gICAgcXVlc3Rpb25WaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcblxuICAgIHF1ZXN0aW9uVmlldy51cGRhdGVQcm9ncmVzc0Jhcihtb2RlbC5zdGF0ZSlcblxuICAgIC8vUmVuZGVyIG9wdGlvbnNcbiAgICBvcHRpb25zVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5jb25zdCBjb250cm9sUmVuZGVyUmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJlc3VsdHNWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5jb25zdCBjb250cm9sVmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFuc3dlcnMgPSBtb2RlbC5zdGF0ZS5hbnN3ZXJzXG4gIGlmIChhbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm5cbiAgaWYgKCFhbnN3ZXJzLnNlbGVjdGVkWzJdKSB7XG4gICAgY29uc29sZS5sb2coJ2NhbGxpbmcgcmVuZGVyIGVycm9yJylcbiAgICBvcHRpb25zVmlldy5yZW5kZXJFcnJvcigpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG1vZGVsLnZhbGlkYXRlQW5zd2VyKCkpIHtcbiAgICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKVxuICAgIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKGFuc3dlcnMuc2VsZWN0ZWRbMF0sICdwaWNrZWQtY29ycmVjdCcpXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnNlbGVjdGVkWzBdLCAncGlja2VkLWluY29ycmVjdCcpXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5yaWdodFswXSwgJ3BpY2tlZC1jb3JyZWN0JylcbiAgfVxuXG4gIG9wdGlvbnNWaWV3LnJlbmRlckNvcnJlY3RBbnN3ZXIoYW5zd2Vycy5zZWxlY3RlZFswXSwgYW5zd2Vycy5yaWdodFswXSlcbn1cblxuY29uc3QgY29udHJvbFNlbGVjdE9wdGlvbiA9IGZ1bmN0aW9uIChhbnN3ZXIsIG9wdGlvbikge1xuICBpZiAobW9kZWwuc3RhdGUucHJvZ3Jlc3MgPT09IG51bGwgfHwgbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuXG4gIG1vZGVsLnN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSB0cnVlXG5cbiAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKClcbiAgbW9kZWwuc3RhdGUuc2V0U2VsZWN0ZWRBbnN3ZXIob3B0aW9uLCBhbnN3ZXIpXG4gIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKG9wdGlvbiwgJ2FjdGl2ZScpXG59XG5cbmNvbnN0IGNvbnRyb2xOZXh0UXVlc3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuXG5cbiAgY29udHJvbFF1aXooKVxufVxuXG5jb25zdCBjb250cm9sTGlnaHRNb2RlID0gZnVuY3Rpb24gKGNvbG9yTW9kZSA9IG1vZGVsLnN0YXRlLnRoZW1lKSB7XG4gIG1vZGVsLnN0YXRlLnNldENvbG9yTW9kZShjb2xvck1vZGUpXG4gIHZpZXcuc2V0Q29sb3JUaGVtZShjb2xvck1vZGUpXG59XG5cbmNvbnN0IGNvbnRyb0xvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIGxvYWRMb2NhbFN0b3JhZ2UobW9kZWwuc3RhdGUpXG4gIGNvbnRyb2xRdWl6KClcbiAgY29udHJvbExpZ2h0TW9kZSgpXG59XG5cbmNvbnN0IGNvbnRyb2xQbGF5QWdhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIG1vZGVsLnN0YXRlLnJlc2V0KClcbiAgY2xlYXJMb2NhbFN0b3JhZ2UoKVxuICBpbml0aWFsVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpXG4gIG9wdGlvbnNWaWV3LmluaXRFbGVtZW50cygpXG4gIHF1ZXN0aW9uVmlldy5pbml0RWxlbWVudHMoKVxuICByZXN1bHRzVmlldy5pbml0RWxlbWVudHMoKVxuICBpbml0KClcbiAgY29uc29sZS5sb2cobW9kZWwuc3RhdGUpXG59XG5cbmV4cG9ydCBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xuICB2aWV3LmFkZEhhbmRsZXJMb2FkKGNvbnRyb0xvYWQpXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJTZWxlY3RUb3BpYyhjb250cm9sU2VsZWN0VG9waWMpXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJTZWxlY3RPcHRpb24oY29udHJvbFNlbGVjdE9wdGlvbilcbiAgb3B0aW9uc1ZpZXcuYWRkSGFuZGxlclJlbmRlclN1Ym1pdEFuc3dlcihjb250cm9sVmFsaWRhdGVBbnN3ZXIpXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJOZXh0UXVlc3Rpb24oY29udHJvbE5leHRRdWVzdGlvbilcbiAgdmlldy5hZGRIYW5kbGVyQ2hhbmdlQ29sb3JUaGVtZShjb250cm9sTGlnaHRNb2RlKVxuICByZXN1bHRzVmlldy5hZGRIYW5kbGVyUGxheUFnYWluKGNvbnRyb2xQbGF5QWdhaW4pXG59XG5cbi8vIGluaXQoKVxuIiwiZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG4gICAgcmV0dXJuIGRhdGFcbiAgfSBjYXRjaCAoZXJyb3IpIHt9XG59XG5cbmV4cG9ydCBjb25zdCBlc2NhcGVDb2RlID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZXNjYXBlQ2hhcmFjdGVyID0gWyc8JywgJz4nLCAnJiddXG4gICAgICBjb25zdCBlc2NhcGVNYXAgPSBbJyZsdDsnLCAnJmd0OycsICcmYW1wOyddXG5cbiAgICAgIHJldHVybiBzdHJpbmdcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKGNoYXJhY3RlciA9PiB7XG4gICAgICAgICAgaWYgKGVzY2FwZUNoYXJhY3Rlci5pbmRleE9mKGNoYXJhY3RlcikgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmFjdGVyID1cbiAgICAgICAgICAgICAgZXNjYXBlTWFwW2VzY2FwZUNoYXJhY3Rlci5pbmRleE9mKGNoYXJhY3RlcildKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJycpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdHJpbmdcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufVxuXG5leHBvcnQgY29uc3Qgc2F2ZUxvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbG9hZExvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzYXZlZFN0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RhdGUnKSlcbiAgICBpZiAoIXNhdmVkU3RhdGUpIHJldHVyblxuICAgIE9iamVjdC5hc3NpZ24ob2JqZWN0LCBzYXZlZFN0YXRlKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFyTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKCkge1xuICBsb2NhbFN0b3JhZ2UuY2xlYXIoKVxufVxuIiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vaGVscGVyJ1xuaW1wb3J0IHsgUVVFU1RJT05fREFUQV9QQVRIIH0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgeyBzYXZlTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXInXG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgcXVpejoge30sXG4gIGN1cnJRdWVzdGlvbjogJycsXG4gIGN1cnJPcHRpb25zOiBbXSxcbiAgcHJvZ3Jlc3M6IG51bGwsXG4gIG9wdGlvbnNNYXA6IFsnQScsICdCJywgJ0MnLCAnRCddLFxuICBzY29yZTogMCxcbiAgYW5zd2Vyczoge1xuICAgIHNlbGVjdGVkOiBbMCwgJycsIGZhbHNlXSxcbiAgICByaWdodDogWzAsICcnXSxcbiAgICBhbnN3ZXJlZDogZmFsc2UsXG4gIH0sXG4gIHRoZW1lOiAnbGlnaHQnLCAvL3RydWUgPSBsaWdodCBhcyBkZWZhdWx0XG59XG5cbmV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcbiAgLi4uZGVmYXVsdFN0YXRlLFxuXG4gIHJlc2V0KCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkZWZhdWx0U3RhdGUpKSlcbiAgfSxcblxuICBzZXRRdWl6KHF1aXopIHtcbiAgICB0aGlzLnF1aXogPSBxdWl6XG4gIH0sXG5cbiAgc2V0Q3VyclF1ZXN0aW9uKCkge1xuICAgIHRoaXMuY3VyclF1ZXN0aW9uID0gdGhpcy5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10ucXVlc3Rpb25cbiAgfSxcblxuICBzZXRDdXJyT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5jdXJyT3B0aW9ucyA9IHN0YXRlLnF1aXoucXVlc3Rpb25zW3N0YXRlLnByb2dyZXNzXS5vcHRpb25zXG4gIH0sXG5cbiAgc2V0UHJvZ3Jlc3MoKSB7XG4gICAgdGhpcy5wcm9ncmVzcyArPSAxXG4gIH0sXG5cbiAgc2V0U2NvcmUoKSB7XG4gICAgdGhpcy5zY29yZSArPSAxXG4gIH0sXG5cbiAgc2V0UmlnaHRBbnN3ZXIoKSB7XG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzFdID0gdGhpcy5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10uYW5zd2VyXG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzBdID0gdGhpcy5jdXJyT3B0aW9ucy5maW5kSW5kZXgoXG4gICAgICBhbnN3ZXIgPT4gYW5zd2VyID09PSB0aGlzLmdldFJpZ2h0QW5zd2VyKCksXG4gICAgKVxuICB9LFxuXG4gIHNldFNlbGVjdGVkQW5zd2VyKG9wdGlvbiwgYW5zd2VyKSB7XG4gICAgdGhpcy5hbnN3ZXJzLnNlbGVjdGVkWzBdID0gK29wdGlvblxuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFsxXSA9IGFuc3dlclxuICB9LFxuXG4gIHNldEFuc3dlcmVkKHZhbHVlKSB7XG4gICAgdGhpcy5hbnN3ZXJzLmFuc3dlcmVkID0gc3RhdGUuYW5zd2Vycy5zZWxlY3RlZFsyXSA9IHZhbHVlXG4gIH0sXG4gIHNldENvbG9yTW9kZSh0aGVtZSkge1xuICAgIHRoaXMudGhlbWUgPSB0aGVtZVxuICAgIHNhdmVMb2NhbFN0b3JhZ2Uoc3RhdGUpXG4gICAgcmV0dXJuIHRoaXMudGhlbWVcbiAgfSxcbiAgZ2V0UmlnaHRBbnN3ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5zd2Vycy5yaWdodFsxXVxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgZ2V0UXVpekRhdGEgPSBhc3luYyBmdW5jdGlvbiAodG9waWMpIHtcbiAgY29uc3QgeyBxdWl6emVzIH0gPSBhd2FpdCBnZXREYXRhKFFVRVNUSU9OX0RBVEFfUEFUSClcbiAgc3RhdGUuc2V0UXVpeihxdWl6emVzW3RvcGljXSlcbn1cblxuZXhwb3J0IGNvbnN0IHNldEN1cnJlbnRRQSA9IGZ1bmN0aW9uICgpIHtcbiAgc3RhdGUuc2V0Q3VyclF1ZXN0aW9uKClcbiAgc3RhdGUuc2V0Q3Vyck9wdGlvbnMoKVxuICBzdGF0ZS5zZXRBbnN3ZXJlZChmYWxzZSlcbiAgc2F2ZUxvY2FsU3RvcmFnZShzdGF0ZSlcbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICBzdGF0ZS5zZXRSaWdodEFuc3dlcigpXG4gIHN0YXRlLnNldFByb2dyZXNzKClcbiAgc3RhdGUuc2V0QW5zd2VyZWQodHJ1ZSlcbiAgc2F2ZUxvY2FsU3RvcmFnZShzdGF0ZSlcblxuICBpZiAoc3RhdGUuZ2V0UmlnaHRBbnN3ZXIoKSA9PT0gc3RhdGUuYW5zd2Vycy5zZWxlY3RlZFsxXSkge1xuICAgIHN0YXRlLnNldFNjb3JlKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgX2RhdGFcblxuICByZW5kZXIoZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuXG4gICAgdGhpcy5fZGF0YSA9IGRhdGFcblxuICAgIGNvbnN0IG1hcmt1cCA9IHRoaXMuX2dlbmVyYXRlTWFya3VwKClcblxuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbWFya3VwKVxuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgYWRkSGFuZGxlckNoYW5nZUNvbG9yVGhlbWUoaGFuZGxlcikge1xuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKVxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgY29sb3JNb2RlID0gdG9nZ2xlLmNoZWNrZWQgPyAnZGFyaycgOiAnbGlnaHQnXG4gICAgICBoYW5kbGVyKGNvbG9yTW9kZSlcbiAgICB9KVxuICB9XG5cbiAgc2V0Q29sb3JUaGVtZShjb2xvck1vZGUpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlJykuY2hlY2tlZCA9XG4gICAgICBjb2xvck1vZGUgPT09ICdsaWdodCcgPyBmYWxzZSA6IHRydWVcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZXBsYWNlKFxuICAgICAgYCR7Y29sb3JNb2RlID09PSAnbGlnaHQnID8gJ2RhcmsnIDogJ2xpZ2h0J30tbW9kZWAsXG4gICAgICBgJHtjb2xvck1vZGV9LW1vZGVgLFxuICAgIClcbiAgfVxuXG4gIGFkZEhhbmRsZXJMb2FkKGhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBoYW5kbGVyKClcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5cbmNsYXNzIEluaXRhbFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJylcbiAgX2RhdGFcblxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGA8bmF2IGNsYXNzPVwibmF2XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuYXZfX3RvcGljIGhpZGRlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWFjY2Vzc2liaWxpdHlcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiYXNzZXRzL2ltYWdlcy9pY29uLWFjY2Vzc2liaWxpdHkuc3ZnXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJuYXZfX3RvcGljLWljb25cIlxuICAgICAgICAgICAgICBhbHQ9XCJcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoNCBjbGFzcz1cInR5cGUtaGVhZGluZy1zXCIgY2xhc3M9XCJuYXZfX3RvcGljLWhlYWRpbmdcIj5Ub3BpYzwvaDQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2X190b2dnbGVcIj5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgIHdpZHRoPVwiMjRcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMjRcIlxuICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZmlsbD1cIiM2MjZDN0ZcIlxuICAgICAgICAgICAgICBkPVwiTTEyIDEuNWEuNzUuNzUgMCAwIDEgLjc1Ljc1djEuNWEuNzUuNzUgMCAxIDEtMS41IDB2LTEuNUEuNzUuNzUgMCAwIDEgMTIgMS41Wm0wIDE1YTQuNSA0LjUgMCAxIDAgMC05IDQuNSA0LjUgMCAwIDAgMCA5Wm0wLTEuNWEzIDMgMCAxIDEgMC02IDMgMyAwIDAgMSAwIDZabTkuNzUtMi4yNWEuNzUuNzUgMCAxIDAgMC0xLjVoLTEuNWEuNzUuNzUgMCAxIDAgMCAxLjVoMS41Wk0xMiAxOS41YS43NS43NSAwIDAgMSAuNzUuNzV2MS41YS43NS43NSAwIDEgMS0xLjUgMHYtMS41YS43NS43NSAwIDAgMSAuNzUtLjc1Wm0tOC4yNS02Ljc1YS43NS43NSAwIDEgMCAwLTEuNWgtMS41YS43NS43NSAwIDEgMCAwIDEuNWgxLjVabS45NjktOC4wMzFhLjc1Ljc1IDAgMCAxIDEuMDYyIDBsMS41IDEuNWEuNzUxLjc1MSAwIDAgMS0xLjA2MiAxLjA2MmwtMS41LTEuNWEuNzUuNzUgMCAwIDEgMC0xLjA2MlptMS4wNjIgMTQuNTYyYS43NS43NSAwIDEgMS0xLjA2Mi0xLjA2bDEuNS0xLjVhLjc1Ljc1IDAgMSAxIDEuMDYyIDEuMDZsLTEuNSAxLjVabTEzLjUtMTQuNTYyYS43NS43NSAwIDAgMC0xLjA2MiAwbC0xLjUgMS41YS43NTEuNzUxIDAgMCAwIDEuMDYyIDEuMDYybDEuNS0xLjVhLjc1Ljc1IDAgMCAwIDAtMS4wNjJabS0xLjA2MiAxNC41NjJhLjc1Ljc1IDAgMCAwIDEuMDYyLTEuMDZsLTEuNS0xLjVhLjc1Ljc1IDAgMCAwLTEuMDYyIDEuMDZsMS41IDEuNVpcIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXCIgaWQ9XCJcIiBjbGFzcz1cInRvZ2dsZVwiIC8+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjI0XCJcbiAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGZpbGw9XCIjNjI2QzdGXCJcbiAgICAgICAgICAgICAgZD1cIk0xMS43NzUgNC41MjJBNy41IDcuNSAwIDEgMSA0Ljg5OCAxNi4wOWMyLjEwNC0uNTcgNC45NzQtMS45NTMgNi4yNC01LjMyNi44MjgtMi4yMTEuODc2LTQuNDA4LjYzNy02LjI0MVpNMjAuMTg0IDEyYTguOTk3IDguOTk3IDAgMCAwLTkuMzE1LTguOTk0Ljc1Ljc1IDAgMCAwLS43MTMuODg4Yy4zNDUgMS44MjEuNDIgNC4wOTItLjQyNCA2LjM0Mi0xLjIgMy4yMDEtNC4yMDMgNC4yNi02LjExNSA0LjYwNmEuNzUuNzUgMCAwIDAtLjU0MiAxLjA2NkE5IDkgMCAwIDAgMjAuMTg0IDEyWlwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG5cbiAgICAgIDxtYWluIGNsYXNzPVwibWFpblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb25cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0eXBlLXJlZ3VsYXJcIj5XZWxjb21lIHRvIHRoZTwvc3Bhbj4gRnJvbnRlbmRcbiAgICAgICAgICAgICAgUXVpeiFcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UGljayBhIHN1YmplY3QgdG8gZ2V0IHN0YXJ0ZWQuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXIgaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fb3B0aW9uc1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgZGF0YS10b3BpYz1cIjBcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taHRtbCB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvaWNvbi1odG1sLnN2Z1wiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEhUTUxcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGRhdGEtdG9waWM9XCIxXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWNzcyB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvaWNvbi1jc3Muc3ZnXCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgQ1NTXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLXRvcGljPVwiMlwiXG4gICAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1qcyB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImFzc2V0cy9pbWFnZXMvaWNvbi1qcy5zdmdcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBKYXZhc2NyaXB0XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBkYXRhLXRvcGljPVwiM1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1hY2Nlc3NpYmlsaXR5IHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiYXNzZXRzL2ltYWdlcy9pY29uLWFjY2Vzc2liaWxpdHkuc3ZnXCIgYWx0PVwiXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgQWNjZXNzaWJpbGl0eVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICAgYFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBJbml0YWxWaWV3KClcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcbmltcG9ydCB7IGVzY2FwZUNvZGUgfSBmcm9tICcuLi9oZWxwZXInXG5cbmNsYXNzIE9wdGlvbnNWaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX29wdGlvbnMnKVxuICBfYnRuRWxlbWVudFxuICBfb3B0aW9uRWxlbWVudFxuICBfc2VsZWN0ZWRPcHRpb25cbiAgX2FsbEJ1dHRvbnNcbiAgX2FsbE9wdGlvbnNcbiAgX2RhdGFcblxuICBpbml0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbiAgICB0aGlzLl9hbGxCdXR0b25zID0gdGhpcy5fcGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdGlvbicpXG4gICAgdGhpcy5fYWxsT3B0aW9ucyA9IHRoaXMuX3BhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnLnNlbGVjdGlvbi1vcHRpb24nLFxuICAgIClcbiAgfVxuXG4gIHJlbmRlckVycm9yKCkge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbXNnJylcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3Rpb24tZXJyb3ItLWhpZGRlbicpXG4gIH1cblxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJPcHRpb25zXG4gICAgICAgICAgLm1hcCgob3B0aW9uLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIiBkYXRhLW9wdGlvbj1cIiR7aX1cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI+XG4gICAgICAgICAgJHt0aGlzLl9kYXRhLm9wdGlvbnNNYXBbaV19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAke2VzY2FwZUNvZGUob3B0aW9uKX1cbiAgICAgIDwvYnV0dG9uPmBcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKCl9XG4gICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VibWl0IHR5cGUtaGVhZGluZy1zXCI+U3VibWl0IGFuc3dlcjwvYnV0dG9uPlxuICAgICAgIDxkaXYgY2xhc3M9J3NlbGVjdGlvbi1lcnJvciBlcnJvci1tc2cgc2VsZWN0aW9uLWVycm9yLS1oaWRkZW4nPlxuICA8aW1nIHNyYz0nYXNzZXRzL2ltYWdlcy9pY29uLWVycm9yLnN2Zyc+XG4gIDxwIGNsYXNzPSd0eXBlLW1lZGl1bSc+UGxlYXNlIHNlbGVjdCBhbiBhbnN3ZXI8L3A+XG4gIDwvZGl2PmBcbiAgfVxuXG4gIHJlc2V0Q2xhc3NlcygpIHtcbiAgICBjb25zdCBkZWZhdWx0QnRuQ2xhc3MgPSAnc2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zJ1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XG4gICAgICAnc2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zJ1xuICAgIHRoaXMuX2FsbEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaChlbCA9PiAoZWwuY2xhc3NOYW1lID0gZGVmYXVsdE9wdGlvbkNsYXNzKSlcbiAgfVxuXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcbiAgICB0aGlzLl9hbGxCdXR0b25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLS0ke3N0YXRlfWApXG4gICAgdGhpcy5fYWxsT3B0aW9uc1tvcHRpb25dLmNsYXNzTGlzdC50b2dnbGUoYHNlbGVjdGlvbi1vcHRpb24tLSR7c3RhdGV9YClcbiAgfVxuXG4gIGFkZEhhbmRsZXJTZWxlY3RPcHRpb24oaGFuZGxlcikge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLmluaXRFbGVtZW50cygpXG4gICAgICAgIHRoaXMuX2J0bkVsZW1lbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0aW9uJylcbiAgICAgICAgdGhpcy5fb3B0aW9uRWxlbWVudCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJylcblxuICAgICAgICBpZiAoIXRoaXMuX2J0bkVsZW1lbnQgJiYgIXRoaXMuX29wdGlvbkVsZW1lbnQpIHJldHVyblxuICAgICAgICB0aGlzLl9wYXJlbnRFbGVtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1tc2cnKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24tZXJyb3ItLWhpZGRlbicpXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuX2J0bkVsZW1lbnQuZGF0YXNldC5vcHRpb25cbiAgICAgICAgY29uc3QgYW5zd2VyID0gdGhpcy5fYnRuRWxlbWVudC5pbm5lclRleHQuc2xpY2UoMikudHJpbSgpXG5cbiAgICAgICAgaGFuZGxlcihhbnN3ZXIsIG9wdGlvbilcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICApXG4gIH1cblxuICByZW5kZXJDb3JyZWN0QW5zd2VyKHNlbGVjdGVkT3B0aW9uLCByaWdodE9wdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdGVkQnRuID0gdGhpcy5fYWxsQnV0dG9uc1tzZWxlY3RlZE9wdGlvbl1cbiAgICBjb25zdCByaWdodEJ0biA9IHRoaXMuX2FsbEJ1dHRvbnNbcmlnaHRPcHRpb25dXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zdWJtaXQnKVxuXG4gICAgcmlnaHRCdG4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQwXCIgY2xhc3M9XCJzZWxlY3Rpb24tdGlja1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCA0MCA0MFwiPjxwYXRoIGZpbGw9XCIjMjZENzgyXCIgZD1cIk0yMCA1YTE1IDE1IDAgMSAxIDAgMzAgMTUgMTUgMCAwIDEgMC0zMFptMCAyLjVhMTIuNSAxMi41IDAgMSAwIDAgMjUgMTIuNSAxMi41IDAgMCAwIDAtMjVabS0xLjg3NSAxNS4xMDVMMjUuMyAxNS40MWExLjI1IDEuMjUgMCAwIDEgMS45MTUgMS41OTNsLS4xNDUuMTc0LTguMDYgOC4wOGExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQ4bC0uMTc1LS4xNDUtNC4zNzUtNC4zNzVhMS4yNSAxLjI1IDAgMCAxIDEuNTk1LTEuOTEzbC4xNzUuMTQzIDMuNDkgMy40OVpcIi8+PC9zdmc+YCxcbiAgICApXG5cbiAgICBpZiAoc2VsZWN0ZWRPcHRpb24gIT0gcmlnaHRPcHRpb24pIHtcbiAgICAgIHNlbGVjdGVkQnRuLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiBjbGFzcz1cInNlbGVjdGlvbi10aWNrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+PHBhdGggZmlsbD1cIiNFRTU0NTRcIiBkPVwiTTIwIDVhMTUgMTUgMCAxIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMwWm0wIDIuNWExMi41IDEyLjUgMCAxIDAgMCAyNSAxMi41IDEyLjUgMCAwIDAgMC0yNVptLTUuNDAyIDcuNDE1LjE0Mi0uMTc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzTDIwIDE4LjIzM2wzLjQ5LTMuNDkzYTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzYTEuMjUgMS4yNSAwIDAgMSAuMTQyIDEuNTk1bC0uMTQyLjE3NUwyMS43NjcgMjBsMy40OTMgMy40OWExLjI1IDEuMjUgMCAwIDEgLjE0MiAxLjU5NWwtLjE0Mi4xNzVhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0MmwtLjE3NS0uMTQyTDIwIDIxLjc2N2wtMy40OSAzLjQ5M2ExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQybC0uMTc1LS4xNDJhMS4yNSAxLjI1IDAgMCAxLS4xNDMtMS41OTVsLjE0My0uMTc1TDE4LjIzMyAyMGwtMy40OTMtMy40OWExLjI1IDEuMjUgMCAwIDEtLjE0My0xLjU5NVpcIi8+PC9zdmc+YCxcbiAgICAgIClcbiAgICB9XG4gICAgdGhpcy5fYWxsQnV0dG9ucy5mb3JFYWNoKGJ0biA9PlxuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGlvbi1kaXNhYmxlZCcpLFxuICAgIClcbiAgICBpZiAodGhpcy5fZGF0YS5wcm9ncmVzcyA8PSA5KSB7XG4gICAgICBzdWJtaXRCdG4uaW5uZXJUZXh0ID0gJ05leHQgUXVlc3Rpb24nXG4gICAgICBzdWJtaXRCdG4uY2xhc3NMaXN0LnJlcGxhY2UoJ2J0bi1zdWJtaXQnLCAnYnRuLW5leHQnKVxuICAgIH1cbiAgICBpZiAodGhpcy5fZGF0YS5wcm9ncmVzcyA9PT0gMTApIHtcbiAgICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSAnU2VlIEZpbmFsIFNjb3JlJ1xuICAgICAgc3VibWl0QnRuLmNsYXNzTGlzdC5yZXBsYWNlKCdidG4tc3VibWl0JywgJ2J0bi1hZ2FpbicpXG4gICAgfVxuICB9XG5cbiAgYWRkSGFuZGxlclNlbGVjdFRvcGljKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rpb24nKVxuXG4gICAgICBpZiAoIW9wdGlvbikgcmV0dXJuXG4gICAgICBjb25zdCB0b3BpYyA9ICtvcHRpb24ucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKS5kYXRhc2V0XG4gICAgICAgIC50b3BpY1xuICAgICAgaWYgKCF0b3BpYyAmJiB0b3BpYyAhPT0gMCkgcmV0dXJuXG4gICAgICBoYW5kbGVyKHRvcGljKVxuICAgIH0pXG4gIH1cblxuICBhZGRIYW5kbGVyUmVuZGVyU3VibWl0QW5zd2VyKGhhbmRsZXIpIHtcbiAgICBjb25zb2xlLmxvZygnQWRkaW5nIHN1Ym1pdCBhbnN3ZXIgaGFuZGxlcicpIC8vIERlYnVnZ2luZyBsb2dcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZS50YXJnZXQuY2xvc2VzdCgnLmJ0bi1zdWJtaXQnKVxuXG4gICAgICAgIGlmICghc3VibWl0QnV0dG9uKSByZXR1cm5cblxuICAgICAgICBoYW5kbGVyKClcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICApXG4gIH1cblxuICBhZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IG5leHRCdG4gPVxuICAgICAgICBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLW5leHQnKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuYnRuLWFnYWluJylcbiAgICAgIGlmICghbmV4dEJ0bikgcmV0dXJuXG4gICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaGFuZGxlcigpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE9wdGlvbnNWaWV3KClcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcblxuY2xhc3MgUXVlc3Rpb25WaWV3IGV4dGVuZHMgVmlldyB7XG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbiAgX2RhdGFcblxuICBpbml0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19xdWVzdGlvbicpXG4gIH1cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlF1ZXN0aW9uICR7dGhpcy5fZGF0YS5wcm9ncmVzcyArIDF9IG9mICR7dGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGh9PC9wPlxuICAgICAgICAgIDwvZGl2PiAgICBcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4gICAgICAgICAgICAgICR7dGhpcy5fZGF0YS5jdXJyUXVlc3Rpb259XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gXG4gIH1cblxuICB1cGRhdGVQcm9ncmVzc0JhcigpIHtcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzcycsXG4gICAgKVxuXG4gICAgY29uc3QgcXVpelByb2dyZXNzID1cbiAgICAgICgodGhpcy5fZGF0YS5wcm9ncmVzcyArIDEpIC8gdGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpICogMTAwXG5cbiAgICBwcm9ncmVzc0Jhci5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCBgJHtxdWl6UHJvZ3Jlc3N9JWApXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBRdWVzdGlvblZpZXcoKVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBSZXN1bHRzVmlldyBleHRlbmRzIFZpZXcge1xuICBfcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJylcbiAgX2RhdGFcblxuICBpbml0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJylcbiAgfVxuXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0eXBlLWhlYWRpbmctbFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidHlwZS1yZWd1bGFyXCI+UXVpeiBjb21wbGV0ZWQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgWW91IHNjb3JlZC4uLlxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcmVzdWx0LWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLSR7dGhpcy5fZGF0YS5xdWl6LnRpdGxlLnRvTG93ZXJDYXNlKCl9XCI+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBzcmM9XCIke3RoaXMuX2RhdGEucXVpei5pY29ufVwiXG4gICAgICAgICAgICAgICAgYWx0PVwiJHt0aGlzLl9kYXRhLnF1aXoudGl0bGV9IEljb25cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJ0eXBlLWhlYWRpbmctc1wiIGNsYXNzPVwibWFpbl9fcmVzdWx0LWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLnF1aXoudGl0bGV9XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMSBjbGFzcz1cInR5cGUtZGlzcGxheVwiPiR7dGhpcy5fZGF0YS5zY29yZX08L2gxPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19yZXN1bHQtc3ViLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5cbiAgICAgICAgICAgICAgb3V0IG9mICR7dGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGh9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvbj48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gbWFpbl9fcmVzdWx0LWJ0bi1hZ2FpbiB0eXBlLWhlYWRpbmctc1wiPlBsYXkgQWdhaW48L2J1dHRvbj5gXG4gIH1cblxuICBhZGRIYW5kbGVyUGxheUFnYWluKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5tYWluX19yZXN1bHQtYnRuLWFnYWluJylcbiAgICAgIGlmICghYnRuKSByZXR1cm5cbiAgICAgIGhhbmRsZXIoKVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFJlc3VsdHNWaWV3KClcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInXG5cbmNvbnRyb2xsZXIuaW5pdCgpXG5cbi8vIGNvbnN0IHRvZ2dsZUNvbG9yTW9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKVxuLy8gY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuLy8gY29uc3QgcXVlc3Rpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19xdWVzdGlvbicpXG4vLyBjb25zdCBvcHRpb25zRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fb3B0aW9ucycpXG4vLyBjb25zdCBwcm9ncmVzc0JhckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcbi8vICAgJy5tYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXInLFxuLy8gKVxuXG4vLyBjb25zdCB0b3BpY01hcCA9IHtcbi8vICAgaHRtbDogMCxcbi8vICAgY3NzOiAxLFxuLy8gICBqczogMixcbi8vICAgYWNjZXNzaWJpbGl0eTogMyxcbi8vIH1cblxuLy8gY29uc3Qgb3B0aW9uc01hcCA9IFsnQScsICdCJywgJ0MnLCAnRCddXG5cbi8vIGxldCB0b3BpY0RhdGEgPSB7fVxuLy8gbGV0IHF1ZXN0aW9uQ291bnQgPSAwXG5cbi8vIHRvZ2dsZUNvbG9yTW9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbi8vICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaWdodC1tb2RlJykpIHtcbi8vICAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdsaWdodC1tb2RlJywgJ2RhcmstbW9kZScpXG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnZGFyay1tb2RlJywgJ2xpZ2h0LW1vZGUnKVxuLy8gICB9XG4vLyB9KVxuXG4vLyBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuLy8gICBjb25zdCBlc2NhcGVNYXAgPSB7XG4vLyAgICAgJyYnOiAnJmFtcDsnLFxuLy8gICAgICc8JzogJyZsdDsnLFxuLy8gICAgICc+JzogJyZndDsnLFxuLy8gICAgICdcIic6ICcmcXVvdDsnLFxuLy8gICAgIFwiJ1wiOiAnJiMwMzk7Jyxcbi8vICAgfVxuXG4vLyAgIC8vIFJlcGxhY2UgYW55IHNwZWNpYWwgY2hhcmFjdGVycyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdHlcbi8vICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bJjw+XCInXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbi8vICAgICByZXR1cm4gZXNjYXBlTWFwW21hdGNoXVxuLy8gICB9KVxuLy8gfVxuXG4vLyBjb25zdCBpZFRvcGljID0gZnVuY3Rpb24gKGUpIHtcbi8vICAgY29uc3QgdGFyZ2V0ID0gWy4uLmUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJykuY2xhc3NMaXN0XVxuLy8gICAgIC5maWx0ZXIoZWwgPT4gZWwuc3RhcnRzV2l0aCgnc2VsZWN0aW9uLW9wdGlvbi0tJykpXG4vLyAgICAgLnRvU3RyaW5nKClcbi8vICAgICAuc2xpY2UoMTgpXG4vLyAgIHJldHVybiB0YXJnZXRcbi8vIH1cblxuLy8gY29uc3QgZ2V0RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh0YXJnZXQpIHtcbi8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnZGF0YS5qc29uJylcbi8vICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuLy8gICByZXR1cm4gZGF0YVxuLy8gfVxuXG4vLyBjb25zdCBzZWxlY3RUb3BpYyA9IGFzeW5jIGZ1bmN0aW9uIChlKSB7XG4vLyAgIC8vICAgaWYgKHF1ZXN0aW9uQ291bnQgPiAwKSByZXR1cm5cbi8vICAgY29uc3QgdG9waWNJZCA9IHRvcGljTWFwW2lkVG9waWMoZSldXG4vLyAgIGNvbnN0IHsgcXVpenplczogcXVpeiB9ID0gYXdhaXQgZ2V0RGF0YSgpXG4vLyAgIHRvcGljRGF0YSA9IHF1aXpbdG9waWNJZF1cbi8vICAgZGlzcGxheVF1ZXN0aW9ucygpXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIHNldEFjdGl2ZVN0YXRlKGUpIHtcbi8vICAgaWYgKHF1ZXN0aW9uQ291bnQgPT09IDApIHJldHVyblxuLy8gICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xuLy8gICAgIHJldHVyblxuLy8gICB9XG4vLyAgIDtbLi4uZS50YXJnZXQuY2xvc2VzdCgnZGl2JykucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyldLmZvckVhY2goZWwgPT5cbi8vICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rpb24tLWFjdGl2ZScpLFxuLy8gICApXG4vLyAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGlvbi0tYWN0aXZlJylcbi8vIH1cblxuLy8gZnVuY3Rpb24gZGlzcGxheVF1ZXN0aW9ucygpIHtcbi8vICAgaWYgKHF1ZXN0aW9uQ291bnQgPCB0b3BpY0RhdGEucXVlc3Rpb25zLmxlbmd0aCkgKytxdWVzdGlvbkNvdW50XG5cbi8vICAgY29uc3QgcXVlc3Rpb24gPSB0b3BpY0RhdGEucXVlc3Rpb25zW3F1ZXN0aW9uQ291bnQgLSAxXS5xdWVzdGlvblxuLy8gICBjb25zdCBvcHRpb25zID0gdG9waWNEYXRhLnF1ZXN0aW9uc1txdWVzdGlvbkNvdW50IC0gMV0ub3B0aW9uc1xuXG4vLyAgIHF1ZXN0aW9uRWwuaW5uZXJIVE1MID0gYFxuLy8gICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxuLy8gICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4vLyAgICAgICAke3F1ZXN0aW9ufVxuLy8gICAgIDwvaDI+XG4vLyAgIDwvZGl2PlxuLy8gICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tc3ViLWhlYWRpbmdcIj5cbi8vICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHtxdWVzdGlvbkNvdW50fSBvdXQgb2YgJHt0b3BpY0RhdGEucXVlc3Rpb25zLmxlbmd0aH08L3A+XG4vLyAgIDwvZGl2PlxuLy8gICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyXCI+XG4vLyAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxuLy8gICA8L2Rpdj5gXG5cbi8vICAgY29uc3Qgb3B0aW9uc0hUTUwgPSBvcHRpb25zLm1hcChcbi8vICAgICAoZWwsIGkpID0+XG4vLyAgICAgICAoZWwgPSBgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiPlxuLy8gICAgICAgICA8ZGl2XG4vLyAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWlkbGUgdHlwZS1oZWFkaW5nLXNcIj5cbi8vICAgICAgICAgICAke29wdGlvbnNNYXBbaV19XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICAke2VzY2FwZUh0bWwob3B0aW9uc1tpXSl9XG5cbi8vICAgICAgIDwvYnV0dG9uPmApLFxuLy8gICApXG4vLyAgIGNvbnNvbGUubG9nKG9wdGlvbnNIVE1MKVxuLy8gICBvcHRpb25zRWwuaW5uZXJIVE1MID0gWy4uLm9wdGlvbnNIVE1MXVxuLy8gfVxuLy8gb3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0VG9waWMpXG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRBY3RpdmVTdGF0ZSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==