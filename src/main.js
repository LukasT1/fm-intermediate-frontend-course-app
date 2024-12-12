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

const controlQuiz = function (curQuest) {
  try {
    //Set current question&options, render, update progress bar
    _model_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentQA(curQuest)
    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)

    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].updateProgressBar(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)

    //Render options
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state)
  } catch (error) {
    console.error(error)
  }
}

const controlValidateAnswer = function () {
  const answers = _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers
  if (answers.answered) return
  if (!answers.selected[1]) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderError()
    return
  }
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.validateAnswer()) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], 'picked-correct')
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderCorrectAnswer(answers.selected[0], answers.right[0])
  } else {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], 'picked-incorrect')
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderCorrectAnswer()
  }
}

const controlSelectOption = function (answer, option) {
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === null || _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.answered) return
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.setSelectedAnswer(option, answer)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(option, 'active')
}
const init = function () {
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectTopic(controlSelectTopic)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectOption(controlSelectOption)
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerRenderSubmitAnswer(controlValidateAnswer)
}


/***/ }),

/***/ "./src/scripts/helper.js":
/*!*******************************!*\
  !*** ./src/scripts/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData)
/* harmony export */ });
const getData = async function (url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {}
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
  selectedOption: 0,
  selectedAnswer: '',
  rightAnswer: '',
  score: 0,
  answered: false,
  answers: {
    selected: [0, ''],
    right: [0, ''],
    answered: false,
  },

  setRightAnswer() {
    this.answers.right[1] = this.quiz.questions[state.progress].answer
    this.answers.right[0] = this.currOptions.findIndex(
      answer => answer === this.getRightAnswer(),
    )
  },

  getRightAnswer() {
    return this.answers.right[1]
  },

  setSelectedAnswer(option, answer) {
    this.answers.selected[0] = +option
    this.answers.selected[1] = answer
  },
}

const getQuizData = async function (topic) {
  const { quizzes } = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getData)(_config__WEBPACK_IMPORTED_MODULE_1__.QUESTION_DATA_PATH)

  state.quiz = quizzes[topic]
  console.log(state)
}

const setCurrentQA = function (progress) {
  state.progress = progress
  state.currQuestion = state.quiz.questions[state.progress].question
  state.currOptions = state.quiz.questions[state.progress].options
  state.answers.answered = false
}

const validateAnswer = function () {
  state.setRightAnswer()
  state.answers.answered = true
  console.log(state)

  if (state.getRightAnswer() === state.answers.selected[1]) {
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
        ${option}
      </button>`
          })
          .join()}
       <button class="btn btn-submit type-heading-s">Submit answer</button>`
  }

  _resetClasses() {
    const defaultBtnClass = 'selection type-heading-s'
    const defaultOptionClass =
      'selection-option selection-option--idle type-heading-s'
    this._allButtons.forEach(btn => (btn.className = defaultBtnClass))
    this._allOptions.forEach(el => (el.className = defaultOptionClass))
  }

  toggleState(option, state) {
    this._resetClasses()
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
    if (selectedOption === rightOption) {
      const btn = this._allButtons[selectedOption]
      btn.insertAdjacentHTML(
        'beforeend',
        `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection--correct" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>`,
      )
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlLFNBQVMsMkJBQTJCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9WaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3Mvb3B0aW9uc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9xdWVzdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBRVUVTVElPTl9EQVRBX1BBVEggPSAnLi4vZGF0YS5qc29uJ1xuIiwiaW1wb3J0ICogYXMgbW9kZWwgZnJvbSAnLi9tb2RlbC5qcydcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZy5qcydcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL2hlbHBlci5qcydcbmltcG9ydCBvcHRpb25zVmlldyBmcm9tICcuL3ZpZXdzL29wdGlvbnNWaWV3LmpzJ1xuaW1wb3J0IHF1ZXN0aW9uVmlldyBmcm9tICcuL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcydcblxuY29uc3QgY29udHJvbFNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XG4gIHRyeSB7XG4gICAgLy9HZXQgcXVpeiB0b3BpY1xuICAgIGF3YWl0IG1vZGVsLmdldFF1aXpEYXRhKCt0b3BpYylcbiAgICBtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9IDBcbiAgICBjb250cm9sUXVpeihtb2RlbC5zdGF0ZS5wcm9ncmVzcylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xRdWl6ID0gZnVuY3Rpb24gKGN1clF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy9TZXQgY3VycmVudCBxdWVzdGlvbiZvcHRpb25zLCByZW5kZXIsIHVwZGF0ZSBwcm9ncmVzcyBiYXJcbiAgICBtb2RlbC5zZXRDdXJyZW50UUEoY3VyUXVlc3QpXG4gICAgcXVlc3Rpb25WaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSlcblxuICAgIHF1ZXN0aW9uVmlldy51cGRhdGVQcm9ncmVzc0Jhcihtb2RlbC5zdGF0ZSlcblxuICAgIC8vUmVuZGVyIG9wdGlvbnNcbiAgICBvcHRpb25zVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5jb25zdCBjb250cm9sVmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFuc3dlcnMgPSBtb2RlbC5zdGF0ZS5hbnN3ZXJzXG4gIGlmIChhbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm5cbiAgaWYgKCFhbnN3ZXJzLnNlbGVjdGVkWzFdKSB7XG4gICAgb3B0aW9uc1ZpZXcucmVuZGVyRXJyb3IoKVxuICAgIHJldHVyblxuICB9XG4gIGlmIChtb2RlbC52YWxpZGF0ZUFuc3dlcigpKSB7XG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5zZWxlY3RlZFswXSwgJ3BpY2tlZC1jb3JyZWN0JylcbiAgICBvcHRpb25zVmlldy5yZW5kZXJDb3JyZWN0QW5zd2VyKGFuc3dlcnMuc2VsZWN0ZWRbMF0sIGFuc3dlcnMucmlnaHRbMF0pXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5zZWxlY3RlZFswXSwgJ3BpY2tlZC1pbmNvcnJlY3QnKVxuICAgIG9wdGlvbnNWaWV3LnJlbmRlckNvcnJlY3RBbnN3ZXIoKVxuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xTZWxlY3RPcHRpb24gPSBmdW5jdGlvbiAoYW5zd2VyLCBvcHRpb24pIHtcbiAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBudWxsIHx8IG1vZGVsLnN0YXRlLmFuc3dlcnMuYW5zd2VyZWQpIHJldHVyblxuICBtb2RlbC5zdGF0ZS5zZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcilcbiAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUob3B0aW9uLCAnYWN0aXZlJylcbn1cbmV4cG9ydCBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0VG9waWMoY29udHJvbFNlbGVjdFRvcGljKVxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0T3B0aW9uKGNvbnRyb2xTZWxlY3RPcHRpb24pXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoY29udHJvbFZhbGlkYXRlQW5zd2VyKVxufVxuIiwiZXhwb3J0IGNvbnN0IGdldERhdGEgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG4gICAgcmV0dXJuIGRhdGFcbiAgfSBjYXRjaCAoZXJyb3IpIHt9XG59XG4iLCJpbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9oZWxwZXInXG5pbXBvcnQgeyBRVUVTVElPTl9EQVRBX1BBVEggfSBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0IGNvbnN0IHN0YXRlID0ge1xuICBxdWl6OiB7fSxcbiAgY3VyclF1ZXN0aW9uOiAnJyxcbiAgY3Vyck9wdGlvbnM6IFtdLFxuICBwcm9ncmVzczogbnVsbCxcbiAgb3B0aW9uc01hcDogWydBJywgJ0InLCAnQycsICdEJ10sXG4gIHNlbGVjdGVkT3B0aW9uOiAwLFxuICBzZWxlY3RlZEFuc3dlcjogJycsXG4gIHJpZ2h0QW5zd2VyOiAnJyxcbiAgc2NvcmU6IDAsXG4gIGFuc3dlcmVkOiBmYWxzZSxcbiAgYW5zd2Vyczoge1xuICAgIHNlbGVjdGVkOiBbMCwgJyddLFxuICAgIHJpZ2h0OiBbMCwgJyddLFxuICAgIGFuc3dlcmVkOiBmYWxzZSxcbiAgfSxcblxuICBzZXRSaWdodEFuc3dlcigpIHtcbiAgICB0aGlzLmFuc3dlcnMucmlnaHRbMV0gPSB0aGlzLnF1aXoucXVlc3Rpb25zW3N0YXRlLnByb2dyZXNzXS5hbnN3ZXJcbiAgICB0aGlzLmFuc3dlcnMucmlnaHRbMF0gPSB0aGlzLmN1cnJPcHRpb25zLmZpbmRJbmRleChcbiAgICAgIGFuc3dlciA9PiBhbnN3ZXIgPT09IHRoaXMuZ2V0UmlnaHRBbnN3ZXIoKSxcbiAgICApXG4gIH0sXG5cbiAgZ2V0UmlnaHRBbnN3ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5zd2Vycy5yaWdodFsxXVxuICB9LFxuXG4gIHNldFNlbGVjdGVkQW5zd2VyKG9wdGlvbiwgYW5zd2VyKSB7XG4gICAgdGhpcy5hbnN3ZXJzLnNlbGVjdGVkWzBdID0gK29wdGlvblxuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFsxXSA9IGFuc3dlclxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgZ2V0UXVpekRhdGEgPSBhc3luYyBmdW5jdGlvbiAodG9waWMpIHtcbiAgY29uc3QgeyBxdWl6emVzIH0gPSBhd2FpdCBnZXREYXRhKFFVRVNUSU9OX0RBVEFfUEFUSClcblxuICBzdGF0ZS5xdWl6ID0gcXVpenplc1t0b3BpY11cbiAgY29uc29sZS5sb2coc3RhdGUpXG59XG5cbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50UUEgPSBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgc3RhdGUucHJvZ3Jlc3MgPSBwcm9ncmVzc1xuICBzdGF0ZS5jdXJyUXVlc3Rpb24gPSBzdGF0ZS5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10ucXVlc3Rpb25cbiAgc3RhdGUuY3Vyck9wdGlvbnMgPSBzdGF0ZS5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10ub3B0aW9uc1xuICBzdGF0ZS5hbnN3ZXJzLmFuc3dlcmVkID0gZmFsc2Vcbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQW5zd2VyID0gZnVuY3Rpb24gKCkge1xuICBzdGF0ZS5zZXRSaWdodEFuc3dlcigpXG4gIHN0YXRlLmFuc3dlcnMuYW5zd2VyZWQgPSB0cnVlXG4gIGNvbnNvbGUubG9nKHN0YXRlKVxuXG4gIGlmIChzdGF0ZS5nZXRSaWdodEFuc3dlcigpID09PSBzdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzFdKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIF9kYXRhXG5cbiAgcmVuZGVyKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVyblxuICAgIHRoaXMuX2RhdGEgPSBkYXRhXG5cbiAgICBjb25zdCBtYXJrdXAgPSB0aGlzLl9nZW5lcmF0ZU1hcmt1cCgpXG5cbiAgICB0aGlzLmNsZWFyKClcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIG1hcmt1cClcbiAgfVxuXG4gIHVwZGF0ZSgpIHt9XG5cbiAgcmVuZGVyRXJyb3IoKSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJylcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgfVxufVxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xuXG5jbGFzcyBPcHRpb25zVmlldyBleHRlbmRzIFZpZXcge1xuICBfcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbiAgX2J0bkVsZW1lbnRcbiAgX29wdGlvbkVsZW1lbnRcbiAgX3NlbGVjdGVkT3B0aW9uXG4gIF9hbGxCdXR0b25zXG4gIF9hbGxPcHRpb25zXG4gIF9kYXRhXG5cbiAgaW5pdEVsZW1lbnRzKCkge1xuICAgIHRoaXMuX2FsbEJ1dHRvbnMgPSB0aGlzLl9wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rpb24nKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMgPSB0aGlzLl9wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnLnNlbGVjdGlvbi1vcHRpb24nLFxuICAgIClcbiAgfVxuXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICAke3RoaXMuX2RhdGEuY3Vyck9wdGlvbnNcbiAgICAgICAgICAubWFwKChvcHRpb24sIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cInNlbGVjdGlvbiB0eXBlLWhlYWRpbmctc1wiIGRhdGEtb3B0aW9uPVwiJHtpfVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWlkbGUgdHlwZS1oZWFkaW5nLXNcIj5cbiAgICAgICAgICAke3RoaXMuX2RhdGEub3B0aW9uc01hcFtpXX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICR7b3B0aW9ufVxuICAgICAgPC9idXR0b24+YFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oKX1cbiAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWJtaXQgdHlwZS1oZWFkaW5nLXNcIj5TdWJtaXQgYW5zd2VyPC9idXR0b24+YFxuICB9XG5cbiAgX3Jlc2V0Q2xhc3NlcygpIHtcbiAgICBjb25zdCBkZWZhdWx0QnRuQ2xhc3MgPSAnc2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zJ1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XG4gICAgICAnc2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zJ1xuICAgIHRoaXMuX2FsbEJ1dHRvbnMuZm9yRWFjaChidG4gPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKVxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaChlbCA9PiAoZWwuY2xhc3NOYW1lID0gZGVmYXVsdE9wdGlvbkNsYXNzKSlcbiAgfVxuXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcbiAgICB0aGlzLl9yZXNldENsYXNzZXMoKVxuICAgIHRoaXMuX2FsbEJ1dHRvbnNbb3B0aW9uXS5jbGFzc0xpc3QudG9nZ2xlKGBzZWxlY3Rpb24tLSR7c3RhdGV9YClcbiAgICB0aGlzLl9hbGxPcHRpb25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLW9wdGlvbi0tJHtzdGF0ZX1gKVxuICB9XG5cbiAgYWRkSGFuZGxlclNlbGVjdE9wdGlvbihoYW5kbGVyKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuaW5pdEVsZW1lbnRzKClcbiAgICAgICAgdGhpcy5fYnRuRWxlbWVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rpb24nKVxuICAgICAgICB0aGlzLl9vcHRpb25FbGVtZW50ID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKVxuXG4gICAgICAgIGlmICghdGhpcy5fYnRuRWxlbWVudCB8fCAhdGhpcy5fb3B0aW9uRWxlbWVudCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5fYnRuRWxlbWVudC5kYXRhc2V0Lm9wdGlvblxuICAgICAgICBjb25zdCBhbnN3ZXIgPSB0aGlzLl9idG5FbGVtZW50LmlubmVyVGV4dC5zbGljZSgyKS50cmltKClcblxuICAgICAgICBoYW5kbGVyKGFuc3dlciwgb3B0aW9uKVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIClcbiAgfVxuXG4gIHJlbmRlckNvcnJlY3RBbnN3ZXIoc2VsZWN0ZWRPcHRpb24sIHJpZ2h0T3B0aW9uKSB7XG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uID09PSByaWdodE9wdGlvbikge1xuICAgICAgY29uc3QgYnRuID0gdGhpcy5fYWxsQnV0dG9uc1tzZWxlY3RlZE9wdGlvbl1cbiAgICAgIGJ0bi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQwXCIgY2xhc3M9XCJzZWxlY3Rpb24tLWNvcnJlY3RcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiIzI2RDc4MlwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tMS44NzUgMTUuMTA1TDI1LjMgMTUuNDFhMS4yNSAxLjI1IDAgMCAxIDEuOTE1IDEuNTkzbC0uMTQ1LjE3NC04LjA2IDguMDhhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0OGwtLjE3NS0uMTQ1LTQuMzc1LTQuMzc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0xLjkxM2wuMTc1LjE0MyAzLjQ5IDMuNDlaXCIvPjwvc3ZnPmAsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgYWRkSGFuZGxlclNlbGVjdFRvcGljKGhhbmRsZXIpIHtcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rpb24nKVxuICAgICAgaWYgKCFvcHRpb24pIHJldHVyblxuICAgICAgY29uc3QgdG9waWMgPSArb3B0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJykuZGF0YXNldFxuICAgICAgICAudG9waWNcbiAgICAgIGlmICghdG9waWMgJiYgdG9waWMgIT09IDApIHJldHVyblxuICAgICAgaGFuZGxlcih0b3BpYylcbiAgICB9KVxuICB9XG5cbiAgYWRkSGFuZGxlclJlbmRlclN1Ym1pdEFuc3dlcihoYW5kbGVyKSB7XG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5idG4tc3VibWl0JylcblxuICAgICAgICBpZiAoIXN1Ym1pdEJ1dHRvbikgcmV0dXJuXG5cbiAgICAgICAgaGFuZGxlcigpXG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBPcHRpb25zVmlldygpXG4iLCJpbXBvcnQgVmlldyBmcm9tICcuL1ZpZXcnXG5cbmNsYXNzIFF1ZXN0aW9uVmlldyBleHRlbmRzIFZpZXcge1xuICBfcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19xdWVzdGlvbicpXG4gIF9kYXRhXG5cbiAgX2dlbmVyYXRlTWFya3VwKCkge1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlF1ZXN0aW9uICR7dGhpcy5fZGF0YS5wcm9ncmVzcyArIDF9IG9mICR7dGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGh9PC9wPlxuICAgICAgICAgIDwvZGl2PiAgICBcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XG4gICAgICAgICAgICAgICR7dGhpcy5fZGF0YS5jdXJyUXVlc3Rpb259XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5gXG4gIH1cblxuICB1cGRhdGVQcm9ncmVzc0JhcigpIHtcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzcycsXG4gICAgKVxuXG4gICAgY29uc3QgcXVpelByb2dyZXNzID1cbiAgICAgICgodGhpcy5fZGF0YS5wcm9ncmVzcyArIDEpIC8gdGhpcy5fZGF0YS5xdWl6LnF1ZXN0aW9ucy5sZW5ndGgpICogMTAwXG5cbiAgICBwcm9ncmVzc0Jhci5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCBgJHtxdWl6UHJvZ3Jlc3N9JWApXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBRdWVzdGlvblZpZXcoKVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcidcblxuY29udHJvbGxlci5pbml0KClcblxuLy8gY29uc3QgdG9nZ2xlQ29sb3JNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG4vLyBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4vLyBjb25zdCBxdWVzdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcbi8vIGNvbnN0IG9wdGlvbnNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcbi8vIGNvbnN0IHByb2dyZXNzQmFyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuLy8gICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhcicsXG4vLyApXG5cbi8vIGNvbnN0IHRvcGljTWFwID0ge1xuLy8gICBodG1sOiAwLFxuLy8gICBjc3M6IDEsXG4vLyAgIGpzOiAyLFxuLy8gICBhY2Nlc3NpYmlsaXR5OiAzLFxuLy8gfVxuXG4vLyBjb25zdCBvcHRpb25zTWFwID0gWydBJywgJ0InLCAnQycsICdEJ11cblxuLy8gbGV0IHRvcGljRGF0YSA9IHt9XG4vLyBsZXQgcXVlc3Rpb25Db3VudCA9IDBcblxuLy8gdG9nZ2xlQ29sb3JNb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuLy8gICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0LW1vZGUnKSkge1xuLy8gICAgIGJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoJ2xpZ2h0LW1vZGUnLCAnZGFyay1tb2RlJylcbi8vICAgfSBlbHNlIHtcbi8vICAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdkYXJrLW1vZGUnLCAnbGlnaHQtbW9kZScpXG4vLyAgIH1cbi8vIH0pXG5cbi8vIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XG4vLyAgIGNvbnN0IGVzY2FwZU1hcCA9IHtcbi8vICAgICAnJic6ICcmYW1wOycsXG4vLyAgICAgJzwnOiAnJmx0OycsXG4vLyAgICAgJz4nOiAnJmd0OycsXG4vLyAgICAgJ1wiJzogJyZxdW90OycsXG4vLyAgICAgXCInXCI6ICcmIzAzOTsnLFxuLy8gICB9XG5cbi8vICAgLy8gUmVwbGFjZSBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0eVxuLy8gICByZXR1cm4gc3RyLnJlcGxhY2UoL1smPD5cIiddL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuLy8gICAgIHJldHVybiBlc2NhcGVNYXBbbWF0Y2hdXG4vLyAgIH0pXG4vLyB9XG5cbi8vIGNvbnN0IGlkVG9waWMgPSBmdW5jdGlvbiAoZSkge1xuLy8gICBjb25zdCB0YXJnZXQgPSBbLi4uZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnNlbGVjdGlvbi1vcHRpb24nKS5jbGFzc0xpc3RdXG4vLyAgICAgLmZpbHRlcihlbCA9PiBlbC5zdGFydHNXaXRoKCdzZWxlY3Rpb24tb3B0aW9uLS0nKSlcbi8vICAgICAudG9TdHJpbmcoKVxuLy8gICAgIC5zbGljZSgxOClcbi8vICAgcmV0dXJuIHRhcmdldFxuLy8gfVxuXG4vLyBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRhcmdldCkge1xuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdkYXRhLmpzb24nKVxuLy8gICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4vLyAgIHJldHVybiBkYXRhXG4vLyB9XG5cbi8vIGNvbnN0IHNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gICBpZiAocXVlc3Rpb25Db3VudCA+IDApIHJldHVyblxuLy8gICBjb25zdCB0b3BpY0lkID0gdG9waWNNYXBbaWRUb3BpYyhlKV1cbi8vICAgY29uc3QgeyBxdWl6emVzOiBxdWl6IH0gPSBhd2FpdCBnZXREYXRhKClcbi8vICAgdG9waWNEYXRhID0gcXVpelt0b3BpY0lkXVxuLy8gICBkaXNwbGF5UXVlc3Rpb25zKClcbi8vIH1cblxuLy8gZnVuY3Rpb24gc2V0QWN0aXZlU3RhdGUoZSkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA9PT0gMCkgcmV0dXJuXG4vLyAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XG4vLyAgICAgcmV0dXJuXG4vLyAgIH1cbi8vICAgO1suLi5lLnRhcmdldC5jbG9zZXN0KCdkaXYnKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKV0uZm9yRWFjaChlbCA9PlxuLy8gICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGlvbi0tYWN0aXZlJyksXG4vLyAgIClcbi8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLS1hY3RpdmUnKVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBkaXNwbGF5UXVlc3Rpb25zKCkge1xuLy8gICBpZiAocXVlc3Rpb25Db3VudCA8IHRvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RoKSArK3F1ZXN0aW9uQ291bnRcblxuLy8gICBjb25zdCBxdWVzdGlvbiA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLnF1ZXN0aW9uXG4vLyAgIGNvbnN0IG9wdGlvbnMgPSB0b3BpY0RhdGEucXVlc3Rpb25zW3F1ZXN0aW9uQ291bnQgLSAxXS5vcHRpb25zXG5cbi8vICAgcXVlc3Rpb25FbC5pbm5lckhUTUwgPSBgXG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XG4vLyAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cbi8vICAgICAgICR7cXVlc3Rpb259XG4vLyAgICAgPC9oMj5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxuLy8gICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5RdWVzdGlvbiAke3F1ZXN0aW9uQ291bnR9IG91dCBvZiAke3RvcGljRGF0YS5xdWVzdGlvbnMubGVuZ3RofTwvcD5cbi8vICAgPC9kaXY+XG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cbi8vICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzXCI+PC9kaXY+XG4vLyAgIDwvZGl2PmBcblxuLy8gICBjb25zdCBvcHRpb25zSFRNTCA9IG9wdGlvbnMubWFwKFxuLy8gICAgIChlbCwgaSkgPT5cbi8vICAgICAgIChlbCA9IGA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XG4vLyAgICAgICAgIDxkaXZcbi8vICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxuLy8gICAgICAgICAgICR7b3B0aW9uc01hcFtpXX1cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25zW2ldKX1cblxuLy8gICAgICAgPC9idXR0b24+YCksXG4vLyAgIClcbi8vICAgY29uc29sZS5sb2cob3B0aW9uc0hUTUwpXG4vLyAgIG9wdGlvbnNFbC5pbm5lckhUTUwgPSBbLi4ub3B0aW9uc0hUTUxdXG4vLyB9XG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUb3BpYylcbi8vIG9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldEFjdGl2ZVN0YXRlKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9