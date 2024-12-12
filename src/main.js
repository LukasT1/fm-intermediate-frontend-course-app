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
    await _model_js__WEBPACK_IMPORTED_MODULE_0__.getQuizData(+topic);
    _model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress = 0;
    controlQuiz(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress);
  } catch (error) {
    console.error(error);
  }
};

const controlQuiz = function () {
  try {
    if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === null) return;
    //Set current question&options, render, update progress bar
    _model_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentQA();
    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state);

    _views_questionView_js__WEBPACK_IMPORTED_MODULE_4__["default"].updateProgressBar(_model_js__WEBPACK_IMPORTED_MODULE_0__.state);

    //Render options
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].render(_model_js__WEBPACK_IMPORTED_MODULE_0__.state);
    console.log(_model_js__WEBPACK_IMPORTED_MODULE_0__.state);
  } catch (error) {
    console.error(error);
  }
};

const controlValidateAnswer = function () {
  const answers = _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers;
  if (answers.answered) return;
  if (!answers.selected[2]) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderError();
    return;
  }
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.validateAnswer()) {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses();
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], "picked-correct");
  } else {
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses();
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.selected[0], "picked-incorrect");
    _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(answers.right[0], "picked-correct");
  }

  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].renderCorrectAnswer(answers.selected[0], answers.right[0]);
};

const controlSelectOption = function (answer, option) {
  if (_model_js__WEBPACK_IMPORTED_MODULE_0__.state.progress === null || _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.answered) return;
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.selected[2] = true;
  console.log(_model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.selected[2]);
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].resetClasses();
  _model_js__WEBPACK_IMPORTED_MODULE_0__.state.setSelectedAnswer(option, answer);
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].toggleState(option, "active");
};

const controlNextQuestion = function () {
  if (!_model_js__WEBPACK_IMPORTED_MODULE_0__.state.answers.answered) return;

  controlQuiz();
};

const init = function () {
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectTopic(controlSelectTopic);
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerSelectOption(controlSelectOption);
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerRenderSubmitAnswer(controlValidateAnswer);
  _views_optionsView_js__WEBPACK_IMPORTED_MODULE_3__["default"].addHandlerNextQuestion(controlNextQuestion);
};


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
  currQuestion: "",
  currOptions: [],
  progress: null,
  optionsMap: ["A", "B", "C", "D"],
  score: 0,
  answers: {
    selected: [0, "", false],
    right: [0, ""],
    answered: false,
  },

  setRightAnswer() {
    this.answers.right[1] = this.quiz.questions[state.progress].answer;
    this.answers.right[0] = this.currOptions.findIndex(
      (answer) => answer === this.getRightAnswer()
    );
  },

  getRightAnswer() {
    return this.answers.right[1];
  },

  setSelectedAnswer(option, answer) {
    this.answers.selected[0] = +option;
    this.answers.selected[1] = answer;
  },
};

const getQuizData = async function (topic) {
  const { quizzes } = await (0,_helper__WEBPACK_IMPORTED_MODULE_0__.getData)(_config__WEBPACK_IMPORTED_MODULE_1__.QUESTION_DATA_PATH);

  state.quiz = quizzes[topic];
};

const setCurrentQA = function () {
  state.currQuestion = state.quiz.questions[state.progress].question;
  state.currOptions = state.quiz.questions[state.progress].options;
  state.answers.answered = state.answers.selected[2] = false;
};

const validateAnswer = function () {
  state.setRightAnswer();
  state.answers.answered = true;
  state.progress += 1;

  if (state.getRightAnswer() === state.answers.selected[1]) {
    state.score += 1;
    return true;
  } else {
    return false;
  }
};


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
  _data;

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();

    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update() {}

  renderError() {
    console.log("error");
  }

  clear() {
    this._parentElement.innerHTML = "";
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
  _parentElement = document.querySelector(".main__options");
  _btnElement;
  _optionElement;
  _selectedOption;
  _allButtons;
  _allOptions;
  _data;

  initElements() {
    this._allButtons = this._parentElement.querySelectorAll(".selection");
    this._allOptions =
      this._parentElement.querySelectorAll(".selection-option");
  }

  _generateMarkup() {
    console.log(this._data);
    return `
        ${this._data.currOptions
          .map((option, i) => {
            return `<button class="selection type-heading-s" data-option="${i}">
        <div
          class="selection-option selection-option--idle type-heading-s">
          ${this._data.optionsMap[i]}
        </div>
        ${option}
      </button>`;
          })
          .join()}
       <button class="btn btn-submit type-heading-s">Submit answer</button>`;
  }

  resetClasses() {
    const defaultBtnClass = "selection type-heading-s";
    const defaultOptionClass =
      "selection-option selection-option--idle type-heading-s";
    this._allButtons.forEach((btn) => (btn.className = defaultBtnClass));
    this._allOptions.forEach((el) => (el.className = defaultOptionClass));
  }

  toggleState(option, state) {
    this._allButtons[option].classList.toggle(`selection--${state}`);
    this._allOptions[option].classList.toggle(`selection-option--${state}`);
  }

  addHandlerSelectOption(handler) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        this.initElements();
        this._btnElement = e.target.closest(".selection");
        this._optionElement = e.target.querySelector(".selection-option");

        if (!this._btnElement || !this._optionElement) return;

        const option = this._btnElement.dataset.option;
        const answer = this._btnElement.innerText.slice(2).trim();

        handler(answer, option);
      }.bind(this)
    );
  }

  renderCorrectAnswer(selectedOption, rightOption) {
    const selectedBtn = this._allButtons[selectedOption];
    const rightBtn = this._allButtons[rightOption];
    const submitBtn = document.querySelector(".btn-submit");

    rightBtn.insertAdjacentHTML(
      "beforeend",
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>`
    );

    if (selectedOption != rightOption) {
      selectedBtn.insertAdjacentHTML(
        "beforeend",
        `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>`
      );
    }
    this._allButtons.forEach((btn) => btn.classList.add("selection-disabled"));
    submitBtn.innerText = "Next Question";
    submitBtn.classList.replace("btn-submit", "btn-next");
  }

  addHandlerSelectTopic(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const option = e.target.closest(".selection");
      if (!option) return;
      const topic = +option.querySelector(".selection-option").dataset.topic;
      if (!topic && topic !== 0) return;
      handler(topic);
    });
  }

  addHandlerRenderSubmitAnswer(handler) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const submitButton = e.target.closest(".btn-submit");

        if (!submitButton) return;

        handler();
      }.bind(this)
    );
  }

  addHandlerNextQuestion(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const nextBtn = e.target.closest(".btn-next");
      console.log(nextBtn);
      if (!nextBtn) return;
      nextBtn.addEventListener("click", function (e) {
        handler();
      });
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZSxTQUFTLDJCQUEyQjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9WaWV3LmpzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvdmlld3Mvb3B0aW9uc1ZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9xdWVzdGlvblZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBRVUVTVElPTl9EQVRBX1BBVEggPSAnLi4vZGF0YS5qc29uJ1xyXG4iLCJpbXBvcnQgKiBhcyBtb2RlbCBmcm9tIFwiLi9tb2RlbC5qc1wiO1xyXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnLmpzXCI7XHJcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcclxuaW1wb3J0IG9wdGlvbnNWaWV3IGZyb20gXCIuL3ZpZXdzL29wdGlvbnNWaWV3LmpzXCI7XHJcbmltcG9ydCBxdWVzdGlvblZpZXcgZnJvbSBcIi4vdmlld3MvcXVlc3Rpb25WaWV3LmpzXCI7XHJcblxyXG5jb25zdCBjb250cm9sU2VsZWN0VG9waWMgPSBhc3luYyBmdW5jdGlvbiAodG9waWMpIHtcclxuICB0cnkge1xyXG4gICAgLy9HZXQgcXVpeiB0b3BpY1xyXG4gICAgYXdhaXQgbW9kZWwuZ2V0UXVpekRhdGEoK3RvcGljKTtcclxuICAgIG1vZGVsLnN0YXRlLnByb2dyZXNzID0gMDtcclxuICAgIGNvbnRyb2xRdWl6KG1vZGVsLnN0YXRlLnByb2dyZXNzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY29udHJvbFF1aXogPSBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGlmIChtb2RlbC5zdGF0ZS5wcm9ncmVzcyA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgLy9TZXQgY3VycmVudCBxdWVzdGlvbiZvcHRpb25zLCByZW5kZXIsIHVwZGF0ZSBwcm9ncmVzcyBiYXJcclxuICAgIG1vZGVsLnNldEN1cnJlbnRRQSgpO1xyXG4gICAgcXVlc3Rpb25WaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSk7XHJcblxyXG4gICAgcXVlc3Rpb25WaWV3LnVwZGF0ZVByb2dyZXNzQmFyKG1vZGVsLnN0YXRlKTtcclxuXHJcbiAgICAvL1JlbmRlciBvcHRpb25zXHJcbiAgICBvcHRpb25zVmlldy5yZW5kZXIobW9kZWwuc3RhdGUpO1xyXG4gICAgY29uc29sZS5sb2cobW9kZWwuc3RhdGUpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjb250cm9sVmFsaWRhdGVBbnN3ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYW5zd2VycyA9IG1vZGVsLnN0YXRlLmFuc3dlcnM7XHJcbiAgaWYgKGFuc3dlcnMuYW5zd2VyZWQpIHJldHVybjtcclxuICBpZiAoIWFuc3dlcnMuc2VsZWN0ZWRbMl0pIHtcclxuICAgIG9wdGlvbnNWaWV3LnJlbmRlckVycm9yKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGlmIChtb2RlbC52YWxpZGF0ZUFuc3dlcigpKSB7XHJcbiAgICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKTtcclxuICAgIG9wdGlvbnNWaWV3LnRvZ2dsZVN0YXRlKGFuc3dlcnMuc2VsZWN0ZWRbMF0sIFwicGlja2VkLWNvcnJlY3RcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIG9wdGlvbnNWaWV3LnJlc2V0Q2xhc3NlcygpO1xyXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5zZWxlY3RlZFswXSwgXCJwaWNrZWQtaW5jb3JyZWN0XCIpO1xyXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5yaWdodFswXSwgXCJwaWNrZWQtY29ycmVjdFwiKTtcclxuICB9XHJcblxyXG4gIG9wdGlvbnNWaWV3LnJlbmRlckNvcnJlY3RBbnN3ZXIoYW5zd2Vycy5zZWxlY3RlZFswXSwgYW5zd2Vycy5yaWdodFswXSk7XHJcbn07XHJcblxyXG5jb25zdCBjb250cm9sU2VsZWN0T3B0aW9uID0gZnVuY3Rpb24gKGFuc3dlciwgb3B0aW9uKSB7XHJcbiAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBudWxsIHx8IG1vZGVsLnN0YXRlLmFuc3dlcnMuYW5zd2VyZWQpIHJldHVybjtcclxuICBtb2RlbC5zdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzJdID0gdHJ1ZTtcclxuICBjb25zb2xlLmxvZyhtb2RlbC5zdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzJdKTtcclxuICBvcHRpb25zVmlldy5yZXNldENsYXNzZXMoKTtcclxuICBtb2RlbC5zdGF0ZS5zZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcik7XHJcbiAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUob3B0aW9uLCBcImFjdGl2ZVwiKTtcclxufTtcclxuXHJcbmNvbnN0IGNvbnRyb2xOZXh0UXVlc3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKCFtb2RlbC5zdGF0ZS5hbnN3ZXJzLmFuc3dlcmVkKSByZXR1cm47XHJcblxyXG4gIGNvbnRyb2xRdWl6KCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0VG9waWMoY29udHJvbFNlbGVjdFRvcGljKTtcclxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyU2VsZWN0T3B0aW9uKGNvbnRyb2xTZWxlY3RPcHRpb24pO1xyXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJSZW5kZXJTdWJtaXRBbnN3ZXIoY29udHJvbFZhbGlkYXRlQW5zd2VyKTtcclxuICBvcHRpb25zVmlldy5hZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGNvbnRyb2xOZXh0UXVlc3Rpb24pO1xyXG59O1xyXG4iLCJleHBvcnQgY29uc3QgZ2V0RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIHJldHVybiBkYXRhXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2hlbHBlclwiO1xyXG5pbXBvcnQgeyBRVUVTVElPTl9EQVRBX1BBVEggfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcclxuICBxdWl6OiB7fSxcclxuICBjdXJyUXVlc3Rpb246IFwiXCIsXHJcbiAgY3Vyck9wdGlvbnM6IFtdLFxyXG4gIHByb2dyZXNzOiBudWxsLFxyXG4gIG9wdGlvbnNNYXA6IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIl0sXHJcbiAgc2NvcmU6IDAsXHJcbiAgYW5zd2Vyczoge1xyXG4gICAgc2VsZWN0ZWQ6IFswLCBcIlwiLCBmYWxzZV0sXHJcbiAgICByaWdodDogWzAsIFwiXCJdLFxyXG4gICAgYW5zd2VyZWQ6IGZhbHNlLFxyXG4gIH0sXHJcblxyXG4gIHNldFJpZ2h0QW5zd2VyKCkge1xyXG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzFdID0gdGhpcy5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10uYW5zd2VyO1xyXG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzBdID0gdGhpcy5jdXJyT3B0aW9ucy5maW5kSW5kZXgoXHJcbiAgICAgIChhbnN3ZXIpID0+IGFuc3dlciA9PT0gdGhpcy5nZXRSaWdodEFuc3dlcigpXHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG4gIGdldFJpZ2h0QW5zd2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYW5zd2Vycy5yaWdodFsxXTtcclxuICB9LFxyXG5cclxuICBzZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcikge1xyXG4gICAgdGhpcy5hbnN3ZXJzLnNlbGVjdGVkWzBdID0gK29wdGlvbjtcclxuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFsxXSA9IGFuc3dlcjtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFF1aXpEYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XHJcbiAgY29uc3QgeyBxdWl6emVzIH0gPSBhd2FpdCBnZXREYXRhKFFVRVNUSU9OX0RBVEFfUEFUSCk7XHJcblxyXG4gIHN0YXRlLnF1aXogPSBxdWl6emVzW3RvcGljXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50UUEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc3RhdGUuY3VyclF1ZXN0aW9uID0gc3RhdGUucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLnF1ZXN0aW9uO1xyXG4gIHN0YXRlLmN1cnJPcHRpb25zID0gc3RhdGUucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLm9wdGlvbnM7XHJcbiAgc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCA9IHN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFuc3dlciA9IGZ1bmN0aW9uICgpIHtcclxuICBzdGF0ZS5zZXRSaWdodEFuc3dlcigpO1xyXG4gIHN0YXRlLmFuc3dlcnMuYW5zd2VyZWQgPSB0cnVlO1xyXG4gIHN0YXRlLnByb2dyZXNzICs9IDE7XHJcblxyXG4gIGlmIChzdGF0ZS5nZXRSaWdodEFuc3dlcigpID09PSBzdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzFdKSB7XHJcbiAgICBzdGF0ZS5zY29yZSArPSAxO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xyXG4gIF9kYXRhO1xyXG5cclxuICByZW5kZXIoZGF0YSkge1xyXG4gICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtYXJrdXAgPSB0aGlzLl9nZW5lcmF0ZU1hcmt1cCgpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBtYXJrdXApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge31cclxuXHJcbiAgcmVuZGVyRXJyb3IoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBWaWV3IGZyb20gXCIuL1ZpZXdcIjtcclxuXHJcbmNsYXNzIE9wdGlvbnNWaWV3IGV4dGVuZHMgVmlldyB7XHJcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5fX29wdGlvbnNcIik7XHJcbiAgX2J0bkVsZW1lbnQ7XHJcbiAgX29wdGlvbkVsZW1lbnQ7XHJcbiAgX3NlbGVjdGVkT3B0aW9uO1xyXG4gIF9hbGxCdXR0b25zO1xyXG4gIF9hbGxPcHRpb25zO1xyXG4gIF9kYXRhO1xyXG5cclxuICBpbml0RWxlbWVudHMoKSB7XHJcbiAgICB0aGlzLl9hbGxCdXR0b25zID0gdGhpcy5fcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvblwiKTtcclxuICAgIHRoaXMuX2FsbE9wdGlvbnMgPVxyXG4gICAgICB0aGlzLl9wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLW9wdGlvblwiKTtcclxuICB9XHJcblxyXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2RhdGEpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAke3RoaXMuX2RhdGEuY3Vyck9wdGlvbnNcclxuICAgICAgICAgIC5tYXAoKG9wdGlvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIiBkYXRhLW9wdGlvbj1cIiR7aX1cIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxyXG4gICAgICAgICAgJHt0aGlzLl9kYXRhLm9wdGlvbnNNYXBbaV19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgJHtvcHRpb259XHJcbiAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmpvaW4oKX1cclxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Ym1pdCB0eXBlLWhlYWRpbmctc1wiPlN1Ym1pdCBhbnN3ZXI8L2J1dHRvbj5gO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRDbGFzc2VzKCkge1xyXG4gICAgY29uc3QgZGVmYXVsdEJ0bkNsYXNzID0gXCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIjtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XHJcbiAgICAgIFwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI7XHJcbiAgICB0aGlzLl9hbGxCdXR0b25zLmZvckVhY2goKGJ0bikgPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKTtcclxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaCgoZWwpID0+IChlbC5jbGFzc05hbWUgPSBkZWZhdWx0T3B0aW9uQ2xhc3MpKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcclxuICAgIHRoaXMuX2FsbEJ1dHRvbnNbb3B0aW9uXS5jbGFzc0xpc3QudG9nZ2xlKGBzZWxlY3Rpb24tLSR7c3RhdGV9YCk7XHJcbiAgICB0aGlzLl9hbGxPcHRpb25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLW9wdGlvbi0tJHtzdGF0ZX1gKTtcclxuICB9XHJcblxyXG4gIGFkZEhhbmRsZXJTZWxlY3RPcHRpb24oaGFuZGxlcikge1xyXG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNsaWNrXCIsXHJcbiAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLl9idG5FbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdChcIi5zZWxlY3Rpb25cIik7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9uRWxlbWVudCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLW9wdGlvblwiKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9idG5FbGVtZW50IHx8ICF0aGlzLl9vcHRpb25FbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuX2J0bkVsZW1lbnQuZGF0YXNldC5vcHRpb247XHJcbiAgICAgICAgY29uc3QgYW5zd2VyID0gdGhpcy5fYnRuRWxlbWVudC5pbm5lclRleHQuc2xpY2UoMikudHJpbSgpO1xyXG5cclxuICAgICAgICBoYW5kbGVyKGFuc3dlciwgb3B0aW9uKTtcclxuICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29ycmVjdEFuc3dlcihzZWxlY3RlZE9wdGlvbiwgcmlnaHRPcHRpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkQnRuID0gdGhpcy5fYWxsQnV0dG9uc1tzZWxlY3RlZE9wdGlvbl07XHJcbiAgICBjb25zdCByaWdodEJ0biA9IHRoaXMuX2FsbEJ1dHRvbnNbcmlnaHRPcHRpb25dO1xyXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tc3VibWl0XCIpO1xyXG5cclxuICAgIHJpZ2h0QnRuLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgXCJiZWZvcmVlbmRcIixcclxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIGNsYXNzPVwic2VsZWN0aW9uLXRpY2tcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiIzI2RDc4MlwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tMS44NzUgMTUuMTA1TDI1LjMgMTUuNDFhMS4yNSAxLjI1IDAgMCAxIDEuOTE1IDEuNTkzbC0uMTQ1LjE3NC04LjA2IDguMDhhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0OGwtLjE3NS0uMTQ1LTQuMzc1LTQuMzc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0xLjkxM2wuMTc1LjE0MyAzLjQ5IDMuNDlaXCIvPjwvc3ZnPmBcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uICE9IHJpZ2h0T3B0aW9uKSB7XHJcbiAgICAgIHNlbGVjdGVkQnRuLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgICBcImJlZm9yZWVuZFwiLFxyXG4gICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiBjbGFzcz1cInNlbGVjdGlvbi10aWNrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+PHBhdGggZmlsbD1cIiNFRTU0NTRcIiBkPVwiTTIwIDVhMTUgMTUgMCAxIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMwWm0wIDIuNWExMi41IDEyLjUgMCAxIDAgMCAyNSAxMi41IDEyLjUgMCAwIDAgMC0yNVptLTUuNDAyIDcuNDE1LjE0Mi0uMTc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzTDIwIDE4LjIzM2wzLjQ5LTMuNDkzYTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzYTEuMjUgMS4yNSAwIDAgMSAuMTQyIDEuNTk1bC0uMTQyLjE3NUwyMS43NjcgMjBsMy40OTMgMy40OWExLjI1IDEuMjUgMCAwIDEgLjE0MiAxLjU5NWwtLjE0Mi4xNzVhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0MmwtLjE3NS0uMTQyTDIwIDIxLjc2N2wtMy40OSAzLjQ5M2ExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQybC0uMTc1LS4xNDJhMS4yNSAxLjI1IDAgMCAxLS4xNDMtMS41OTVsLjE0My0uMTc1TDE4LjIzMyAyMGwtMy40OTMtMy40OWExLjI1IDEuMjUgMCAwIDEtLjE0My0xLjU5NVpcIi8+PC9zdmc+YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWxsQnV0dG9ucy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QuYWRkKFwic2VsZWN0aW9uLWRpc2FibGVkXCIpKTtcclxuICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSBcIk5leHQgUXVlc3Rpb25cIjtcclxuICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVwbGFjZShcImJ0bi1zdWJtaXRcIiwgXCJidG4tbmV4dFwiKTtcclxuICB9XHJcblxyXG4gIGFkZEhhbmRsZXJTZWxlY3RUb3BpYyhoYW5kbGVyKSB7XHJcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNlbGVjdGlvblwiKTtcclxuICAgICAgaWYgKCFvcHRpb24pIHJldHVybjtcclxuICAgICAgY29uc3QgdG9waWMgPSArb3B0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLW9wdGlvblwiKS5kYXRhc2V0LnRvcGljO1xyXG4gICAgICBpZiAoIXRvcGljICYmIHRvcGljICE9PSAwKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZXIodG9waWMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRIYW5kbGVyUmVuZGVyU3VibWl0QW5zd2VyKGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuLXN1Ym1pdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCFzdWJtaXRCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICAgICAgaGFuZGxlcigpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNvbnN0IG5leHRCdG4gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bi1uZXh0XCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhuZXh0QnRuKTtcclxuICAgICAgaWYgKCFuZXh0QnRuKSByZXR1cm47XHJcbiAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaGFuZGxlcigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE9wdGlvbnNWaWV3KCk7XHJcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vVmlldydcclxuXHJcbmNsYXNzIFF1ZXN0aW9uVmlldyBleHRlbmRzIFZpZXcge1xyXG4gIF9wYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fX3F1ZXN0aW9uJylcclxuICBfZGF0YVxyXG5cclxuICBfZ2VuZXJhdGVNYXJrdXAoKSB7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1oZWFkaW5nXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHt0aGlzLl9kYXRhLnByb2dyZXNzICsgMX0gb2YgJHt0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aH08L3A+XHJcbiAgICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XHJcbiAgICAgICAgICAgICAgJHt0aGlzLl9kYXRhLmN1cnJRdWVzdGlvbn1cclxuICAgICAgICAgICAgPC9oMj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmBcclxuICB9XHJcblxyXG4gIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xyXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnLm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzcycsXHJcbiAgICApXHJcblxyXG4gICAgY29uc3QgcXVpelByb2dyZXNzID1cclxuICAgICAgKCh0aGlzLl9kYXRhLnByb2dyZXNzICsgMSkgLyB0aGlzLl9kYXRhLnF1aXoucXVlc3Rpb25zLmxlbmd0aCkgKiAxMDBcclxuXHJcbiAgICBwcm9ncmVzc0Jhci5zdHlsZS5zZXRQcm9wZXJ0eSgnd2lkdGgnLCBgJHtxdWl6UHJvZ3Jlc3N9JWApXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBRdWVzdGlvblZpZXcoKVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJ1xyXG5cclxuY29udHJvbGxlci5pbml0KClcclxuXHJcbi8vIGNvbnN0IHRvZ2dsZUNvbG9yTW9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKVxyXG4vLyBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXHJcbi8vIGNvbnN0IHF1ZXN0aW9uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fcXVlc3Rpb24nKVxyXG4vLyBjb25zdCBvcHRpb25zRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fb3B0aW9ucycpXHJcbi8vIGNvbnN0IHByb2dyZXNzQmFyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4vLyAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyJyxcclxuLy8gKVxyXG5cclxuLy8gY29uc3QgdG9waWNNYXAgPSB7XHJcbi8vICAgaHRtbDogMCxcclxuLy8gICBjc3M6IDEsXHJcbi8vICAganM6IDIsXHJcbi8vICAgYWNjZXNzaWJpbGl0eTogMyxcclxuLy8gfVxyXG5cclxuLy8gY29uc3Qgb3B0aW9uc01hcCA9IFsnQScsICdCJywgJ0MnLCAnRCddXHJcblxyXG4vLyBsZXQgdG9waWNEYXRhID0ge31cclxuLy8gbGV0IHF1ZXN0aW9uQ291bnQgPSAwXHJcblxyXG4vLyB0b2dnbGVDb2xvck1vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaWdodC1tb2RlJykpIHtcclxuLy8gICAgIGJvZHkuY2xhc3NMaXN0LnJlcGxhY2UoJ2xpZ2h0LW1vZGUnLCAnZGFyay1tb2RlJylcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnZGFyay1tb2RlJywgJ2xpZ2h0LW1vZGUnKVxyXG4vLyAgIH1cclxuLy8gfSlcclxuXHJcbi8vIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbi8vICAgY29uc3QgZXNjYXBlTWFwID0ge1xyXG4vLyAgICAgJyYnOiAnJmFtcDsnLFxyXG4vLyAgICAgJzwnOiAnJmx0OycsXHJcbi8vICAgICAnPic6ICcmZ3Q7JyxcclxuLy8gICAgICdcIic6ICcmcXVvdDsnLFxyXG4vLyAgICAgXCInXCI6ICcmIzAzOTsnLFxyXG4vLyAgIH1cclxuXHJcbi8vICAgLy8gUmVwbGFjZSBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0eVxyXG4vLyAgIHJldHVybiBzdHIucmVwbGFjZSgvWyY8PlwiJ10vZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcbi8vICAgICByZXR1cm4gZXNjYXBlTWFwW21hdGNoXVxyXG4vLyAgIH0pXHJcbi8vIH1cclxuXHJcbi8vIGNvbnN0IGlkVG9waWMgPSBmdW5jdGlvbiAoZSkge1xyXG4vLyAgIGNvbnN0IHRhcmdldCA9IFsuLi5lLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0aW9uLW9wdGlvbicpLmNsYXNzTGlzdF1cclxuLy8gICAgIC5maWx0ZXIoZWwgPT4gZWwuc3RhcnRzV2l0aCgnc2VsZWN0aW9uLW9wdGlvbi0tJykpXHJcbi8vICAgICAudG9TdHJpbmcoKVxyXG4vLyAgICAgLnNsaWNlKDE4KVxyXG4vLyAgIHJldHVybiB0YXJnZXRcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgZ2V0RGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdkYXRhLmpzb24nKVxyXG4vLyAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuLy8gICByZXR1cm4gZGF0YVxyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBzZWxlY3RUb3BpYyA9IGFzeW5jIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgLy8gICBpZiAocXVlc3Rpb25Db3VudCA+IDApIHJldHVyblxyXG4vLyAgIGNvbnN0IHRvcGljSWQgPSB0b3BpY01hcFtpZFRvcGljKGUpXVxyXG4vLyAgIGNvbnN0IHsgcXVpenplczogcXVpeiB9ID0gYXdhaXQgZ2V0RGF0YSgpXHJcbi8vICAgdG9waWNEYXRhID0gcXVpelt0b3BpY0lkXVxyXG4vLyAgIGRpc3BsYXlRdWVzdGlvbnMoKVxyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBzZXRBY3RpdmVTdGF0ZShlKSB7XHJcbi8vICAgaWYgKHF1ZXN0aW9uQ291bnQgPT09IDApIHJldHVyblxyXG4vLyAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XHJcbi8vICAgICByZXR1cm5cclxuLy8gICB9XHJcbi8vICAgO1suLi5lLnRhcmdldC5jbG9zZXN0KCdkaXYnKS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKV0uZm9yRWFjaChlbCA9PlxyXG4vLyAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0aW9uLS1hY3RpdmUnKSxcclxuLy8gICApXHJcbi8vICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0aW9uLS1hY3RpdmUnKVxyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBkaXNwbGF5UXVlc3Rpb25zKCkge1xyXG4vLyAgIGlmIChxdWVzdGlvbkNvdW50IDwgdG9waWNEYXRhLnF1ZXN0aW9ucy5sZW5ndGgpICsrcXVlc3Rpb25Db3VudFxyXG5cclxuLy8gICBjb25zdCBxdWVzdGlvbiA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLnF1ZXN0aW9uXHJcbi8vICAgY29uc3Qgb3B0aW9ucyA9IHRvcGljRGF0YS5xdWVzdGlvbnNbcXVlc3Rpb25Db3VudCAtIDFdLm9wdGlvbnNcclxuXHJcbi8vICAgcXVlc3Rpb25FbC5pbm5lckhUTUwgPSBgXHJcbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cclxuLy8gICAgIDxoMiBjbGFzcz1cInR5cGUtaGVhZGluZy1sXCI+XHJcbi8vICAgICAgICR7cXVlc3Rpb259XHJcbi8vICAgICA8L2gyPlxyXG4vLyAgIDwvZGl2PlxyXG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1zdWItaGVhZGluZ1wiPlxyXG4vLyAgICAgPHAgY2xhc3M9XCJ0eXBlLWJvZHktc1wiPlF1ZXN0aW9uICR7cXVlc3Rpb25Db3VudH0gb3V0IG9mICR7dG9waWNEYXRhLnF1ZXN0aW9ucy5sZW5ndGh9PC9wPlxyXG4vLyAgIDwvZGl2PlxyXG4vLyAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cclxuLy8gICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXItcHJvZ3Jlc3NcIj48L2Rpdj5cclxuLy8gICA8L2Rpdj5gXHJcblxyXG4vLyAgIGNvbnN0IG9wdGlvbnNIVE1MID0gb3B0aW9ucy5tYXAoXHJcbi8vICAgICAoZWwsIGkpID0+XHJcbi8vICAgICAgIChlbCA9IGA8YnV0dG9uIGNsYXNzPVwic2VsZWN0aW9uIHR5cGUtaGVhZGluZy1zXCI+XHJcbi8vICAgICAgICAgPGRpdlxyXG4vLyAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Rpb24tb3B0aW9uIHNlbGVjdGlvbi1vcHRpb24tLWlkbGUgdHlwZS1oZWFkaW5nLXNcIj5cclxuLy8gICAgICAgICAgICR7b3B0aW9uc01hcFtpXX1cclxuLy8gICAgICAgICA8L2Rpdj5cclxuLy8gICAgICAgICAke2VzY2FwZUh0bWwob3B0aW9uc1tpXSl9XHJcblxyXG4vLyAgICAgICA8L2J1dHRvbj5gKSxcclxuLy8gICApXHJcbi8vICAgY29uc29sZS5sb2cob3B0aW9uc0hUTUwpXHJcbi8vICAgb3B0aW9uc0VsLmlubmVySFRNTCA9IFsuLi5vcHRpb25zSFRNTF1cclxuLy8gfVxyXG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUb3BpYylcclxuLy8gb3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0QWN0aXZlU3RhdGUpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==