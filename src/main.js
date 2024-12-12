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
/* harmony export */   escapeCode: () => (/* binding */ escapeCode),
/* harmony export */   getData: () => (/* binding */ getData)
/* harmony export */ });
const getData = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {}
};

const escapeCode = function (string) {
  try {
    if (typeof string === "string") {
      const escapeCharacter = ["<", ">", "&"];
      const escapeMap = ["&lt;", "&gt;", "&amp;"];

      return string
        .split("")
        .map((character) => {
          if (escapeCharacter.indexOf(character) === -1) {
            return character;
          } else {
            return (character = escapeMap[escapeCharacter.indexOf(character)]);
          }
        })
        .join("");
    } else {
      return string;
    }
  } catch (error) {}
};


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
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./src/scripts/helper.js");



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
        ${(0,_helper__WEBPACK_IMPORTED_MODULE_1__.escapeCode)(option)}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOMEM7QUFDMUM7QUFDQSw2Q0FBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlLFNBQVMsMkJBQTJCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy9tb2RlbC5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvLi9zcmMvc2NyaXB0cy92aWV3cy9vcHRpb25zVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC8uL3NyYy9zY3JpcHRzL3ZpZXdzL3F1ZXN0aW9uVmlldy5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmRfcXVpel9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udGVuZF9xdWl6X2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250ZW5kX3F1aXpfYXBwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFFVRVNUSU9OX0RBVEFfUEFUSCA9ICcuLi9kYXRhLmpzb24nXHJcbiIsImltcG9ydCAqIGFzIG1vZGVsIGZyb20gXCIuL21vZGVsLmpzXCI7XHJcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tIFwiLi9jb25maWcuanNcIjtcclxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2hlbHBlci5qc1wiO1xyXG5pbXBvcnQgb3B0aW9uc1ZpZXcgZnJvbSBcIi4vdmlld3Mvb3B0aW9uc1ZpZXcuanNcIjtcclxuaW1wb3J0IHF1ZXN0aW9uVmlldyBmcm9tIFwiLi92aWV3cy9xdWVzdGlvblZpZXcuanNcIjtcclxuXHJcbmNvbnN0IGNvbnRyb2xTZWxlY3RUb3BpYyA9IGFzeW5jIGZ1bmN0aW9uICh0b3BpYykge1xyXG4gIHRyeSB7XHJcbiAgICAvL0dldCBxdWl6IHRvcGljXHJcbiAgICBhd2FpdCBtb2RlbC5nZXRRdWl6RGF0YSgrdG9waWMpO1xyXG4gICAgbW9kZWwuc3RhdGUucHJvZ3Jlc3MgPSAwO1xyXG4gICAgY29udHJvbFF1aXoobW9kZWwuc3RhdGUucHJvZ3Jlc3MpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjb250cm9sUXVpeiA9IGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgaWYgKG1vZGVsLnN0YXRlLnByb2dyZXNzID09PSBudWxsKSByZXR1cm47XHJcbiAgICAvL1NldCBjdXJyZW50IHF1ZXN0aW9uJm9wdGlvbnMsIHJlbmRlciwgdXBkYXRlIHByb2dyZXNzIGJhclxyXG4gICAgbW9kZWwuc2V0Q3VycmVudFFBKCk7XHJcbiAgICBxdWVzdGlvblZpZXcucmVuZGVyKG1vZGVsLnN0YXRlKTtcclxuXHJcbiAgICBxdWVzdGlvblZpZXcudXBkYXRlUHJvZ3Jlc3NCYXIobW9kZWwuc3RhdGUpO1xyXG5cclxuICAgIC8vUmVuZGVyIG9wdGlvbnNcclxuICAgIG9wdGlvbnNWaWV3LnJlbmRlcihtb2RlbC5zdGF0ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhtb2RlbC5zdGF0ZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNvbnRyb2xWYWxpZGF0ZUFuc3dlciA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbnN3ZXJzID0gbW9kZWwuc3RhdGUuYW5zd2VycztcclxuICBpZiAoYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuO1xyXG4gIGlmICghYW5zd2Vycy5zZWxlY3RlZFsyXSkge1xyXG4gICAgb3B0aW9uc1ZpZXcucmVuZGVyRXJyb3IoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKG1vZGVsLnZhbGlkYXRlQW5zd2VyKCkpIHtcclxuICAgIG9wdGlvbnNWaWV3LnJlc2V0Q2xhc3NlcygpO1xyXG4gICAgb3B0aW9uc1ZpZXcudG9nZ2xlU3RhdGUoYW5zd2Vycy5zZWxlY3RlZFswXSwgXCJwaWNrZWQtY29ycmVjdFwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgb3B0aW9uc1ZpZXcucmVzZXRDbGFzc2VzKCk7XHJcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnNlbGVjdGVkWzBdLCBcInBpY2tlZC1pbmNvcnJlY3RcIik7XHJcbiAgICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShhbnN3ZXJzLnJpZ2h0WzBdLCBcInBpY2tlZC1jb3JyZWN0XCIpO1xyXG4gIH1cclxuXHJcbiAgb3B0aW9uc1ZpZXcucmVuZGVyQ29ycmVjdEFuc3dlcihhbnN3ZXJzLnNlbGVjdGVkWzBdLCBhbnN3ZXJzLnJpZ2h0WzBdKTtcclxufTtcclxuXHJcbmNvbnN0IGNvbnRyb2xTZWxlY3RPcHRpb24gPSBmdW5jdGlvbiAoYW5zd2VyLCBvcHRpb24pIHtcclxuICBpZiAobW9kZWwuc3RhdGUucHJvZ3Jlc3MgPT09IG51bGwgfHwgbW9kZWwuc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCkgcmV0dXJuO1xyXG4gIG1vZGVsLnN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSB0cnVlO1xyXG4gIGNvbnNvbGUubG9nKG1vZGVsLnN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0pO1xyXG4gIG9wdGlvbnNWaWV3LnJlc2V0Q2xhc3NlcygpO1xyXG4gIG1vZGVsLnN0YXRlLnNldFNlbGVjdGVkQW5zd2VyKG9wdGlvbiwgYW5zd2VyKTtcclxuICBvcHRpb25zVmlldy50b2dnbGVTdGF0ZShvcHRpb24sIFwiYWN0aXZlXCIpO1xyXG59O1xyXG5cclxuY29uc3QgY29udHJvbE5leHRRdWVzdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAoIW1vZGVsLnN0YXRlLmFuc3dlcnMuYW5zd2VyZWQpIHJldHVybjtcclxuXHJcbiAgY29udHJvbFF1aXooKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJTZWxlY3RUb3BpYyhjb250cm9sU2VsZWN0VG9waWMpO1xyXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJTZWxlY3RPcHRpb24oY29udHJvbFNlbGVjdE9wdGlvbik7XHJcbiAgb3B0aW9uc1ZpZXcuYWRkSGFuZGxlclJlbmRlclN1Ym1pdEFuc3dlcihjb250cm9sVmFsaWRhdGVBbnN3ZXIpO1xyXG4gIG9wdGlvbnNWaWV3LmFkZEhhbmRsZXJOZXh0UXVlc3Rpb24oY29udHJvbE5leHRRdWVzdGlvbik7XHJcbn07XHJcbiIsImV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge31cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlc2NhcGVDb2RlID0gZnVuY3Rpb24gKHN0cmluZykge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBjb25zdCBlc2NhcGVDaGFyYWN0ZXIgPSBbXCI8XCIsIFwiPlwiLCBcIiZcIl07XHJcbiAgICAgIGNvbnN0IGVzY2FwZU1hcCA9IFtcIiZsdDtcIiwgXCImZ3Q7XCIsIFwiJmFtcDtcIl07XHJcblxyXG4gICAgICByZXR1cm4gc3RyaW5nXHJcbiAgICAgICAgLnNwbGl0KFwiXCIpXHJcbiAgICAgICAgLm1hcCgoY2hhcmFjdGVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXNjYXBlQ2hhcmFjdGVyLmluZGV4T2YoY2hhcmFjdGVyKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmFjdGVyID0gZXNjYXBlTWFwW2VzY2FwZUNoYXJhY3Rlci5pbmRleE9mKGNoYXJhY3RlcildKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHN0cmluZztcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge31cclxufTtcclxuIiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2hlbHBlclwiO1xyXG5pbXBvcnQgeyBRVUVTVElPTl9EQVRBX1BBVEggfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzdGF0ZSA9IHtcclxuICBxdWl6OiB7fSxcclxuICBjdXJyUXVlc3Rpb246IFwiXCIsXHJcbiAgY3Vyck9wdGlvbnM6IFtdLFxyXG4gIHByb2dyZXNzOiBudWxsLFxyXG4gIG9wdGlvbnNNYXA6IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIl0sXHJcbiAgc2NvcmU6IDAsXHJcbiAgYW5zd2Vyczoge1xyXG4gICAgc2VsZWN0ZWQ6IFswLCBcIlwiLCBmYWxzZV0sXHJcbiAgICByaWdodDogWzAsIFwiXCJdLFxyXG4gICAgYW5zd2VyZWQ6IGZhbHNlLFxyXG4gIH0sXHJcblxyXG4gIHNldFJpZ2h0QW5zd2VyKCkge1xyXG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzFdID0gdGhpcy5xdWl6LnF1ZXN0aW9uc1tzdGF0ZS5wcm9ncmVzc10uYW5zd2VyO1xyXG4gICAgdGhpcy5hbnN3ZXJzLnJpZ2h0WzBdID0gdGhpcy5jdXJyT3B0aW9ucy5maW5kSW5kZXgoXHJcbiAgICAgIChhbnN3ZXIpID0+IGFuc3dlciA9PT0gdGhpcy5nZXRSaWdodEFuc3dlcigpXHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG4gIGdldFJpZ2h0QW5zd2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYW5zd2Vycy5yaWdodFsxXTtcclxuICB9LFxyXG5cclxuICBzZXRTZWxlY3RlZEFuc3dlcihvcHRpb24sIGFuc3dlcikge1xyXG4gICAgdGhpcy5hbnN3ZXJzLnNlbGVjdGVkWzBdID0gK29wdGlvbjtcclxuICAgIHRoaXMuYW5zd2Vycy5zZWxlY3RlZFsxXSA9IGFuc3dlcjtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFF1aXpEYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRvcGljKSB7XHJcbiAgY29uc3QgeyBxdWl6emVzIH0gPSBhd2FpdCBnZXREYXRhKFFVRVNUSU9OX0RBVEFfUEFUSCk7XHJcblxyXG4gIHN0YXRlLnF1aXogPSBxdWl6emVzW3RvcGljXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDdXJyZW50UUEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc3RhdGUuY3VyclF1ZXN0aW9uID0gc3RhdGUucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLnF1ZXN0aW9uO1xyXG4gIHN0YXRlLmN1cnJPcHRpb25zID0gc3RhdGUucXVpei5xdWVzdGlvbnNbc3RhdGUucHJvZ3Jlc3NdLm9wdGlvbnM7XHJcbiAgc3RhdGUuYW5zd2Vycy5hbnN3ZXJlZCA9IHN0YXRlLmFuc3dlcnMuc2VsZWN0ZWRbMl0gPSBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFuc3dlciA9IGZ1bmN0aW9uICgpIHtcclxuICBzdGF0ZS5zZXRSaWdodEFuc3dlcigpO1xyXG4gIHN0YXRlLmFuc3dlcnMuYW5zd2VyZWQgPSB0cnVlO1xyXG4gIHN0YXRlLnByb2dyZXNzICs9IDE7XHJcblxyXG4gIGlmIChzdGF0ZS5nZXRSaWdodEFuc3dlcigpID09PSBzdGF0ZS5hbnN3ZXJzLnNlbGVjdGVkWzFdKSB7XHJcbiAgICBzdGF0ZS5zY29yZSArPSAxO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xyXG4gIF9kYXRhO1xyXG5cclxuICByZW5kZXIoZGF0YSkge1xyXG4gICAgaWYgKCFkYXRhKSByZXR1cm47XHJcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtYXJrdXAgPSB0aGlzLl9nZW5lcmF0ZU1hcmt1cCgpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBtYXJrdXApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge31cclxuXHJcbiAgcmVuZGVyRXJyb3IoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBWaWV3IGZyb20gXCIuL1ZpZXdcIjtcclxuaW1wb3J0IHsgZXNjYXBlQ29kZSB9IGZyb20gXCIuLi9oZWxwZXJcIjtcclxuXHJcbmNsYXNzIE9wdGlvbnNWaWV3IGV4dGVuZHMgVmlldyB7XHJcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5fX29wdGlvbnNcIik7XHJcbiAgX2J0bkVsZW1lbnQ7XHJcbiAgX29wdGlvbkVsZW1lbnQ7XHJcbiAgX3NlbGVjdGVkT3B0aW9uO1xyXG4gIF9hbGxCdXR0b25zO1xyXG4gIF9hbGxPcHRpb25zO1xyXG4gIF9kYXRhO1xyXG5cclxuICBpbml0RWxlbWVudHMoKSB7XHJcbiAgICB0aGlzLl9hbGxCdXR0b25zID0gdGhpcy5fcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvblwiKTtcclxuICAgIHRoaXMuX2FsbE9wdGlvbnMgPVxyXG4gICAgICB0aGlzLl9wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLW9wdGlvblwiKTtcclxuICB9XHJcblxyXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuX2RhdGEpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAke3RoaXMuX2RhdGEuY3Vyck9wdGlvbnNcclxuICAgICAgICAgIC5tYXAoKG9wdGlvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIiBkYXRhLW9wdGlvbj1cIiR7aX1cIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxyXG4gICAgICAgICAgJHt0aGlzLl9kYXRhLm9wdGlvbnNNYXBbaV19XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgJHtlc2NhcGVDb2RlKG9wdGlvbil9XHJcbiAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmpvaW4oKX1cclxuICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Ym1pdCB0eXBlLWhlYWRpbmctc1wiPlN1Ym1pdCBhbnN3ZXI8L2J1dHRvbj5gO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRDbGFzc2VzKCkge1xyXG4gICAgY29uc3QgZGVmYXVsdEJ0bkNsYXNzID0gXCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIjtcclxuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25DbGFzcyA9XHJcbiAgICAgIFwic2VsZWN0aW9uLW9wdGlvbiBzZWxlY3Rpb24tb3B0aW9uLS1pZGxlIHR5cGUtaGVhZGluZy1zXCI7XHJcbiAgICB0aGlzLl9hbGxCdXR0b25zLmZvckVhY2goKGJ0bikgPT4gKGJ0bi5jbGFzc05hbWUgPSBkZWZhdWx0QnRuQ2xhc3MpKTtcclxuICAgIHRoaXMuX2FsbE9wdGlvbnMuZm9yRWFjaCgoZWwpID0+IChlbC5jbGFzc05hbWUgPSBkZWZhdWx0T3B0aW9uQ2xhc3MpKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVN0YXRlKG9wdGlvbiwgc3RhdGUpIHtcclxuICAgIHRoaXMuX2FsbEJ1dHRvbnNbb3B0aW9uXS5jbGFzc0xpc3QudG9nZ2xlKGBzZWxlY3Rpb24tLSR7c3RhdGV9YCk7XHJcbiAgICB0aGlzLl9hbGxPcHRpb25zW29wdGlvbl0uY2xhc3NMaXN0LnRvZ2dsZShgc2VsZWN0aW9uLW9wdGlvbi0tJHtzdGF0ZX1gKTtcclxuICB9XHJcblxyXG4gIGFkZEhhbmRsZXJTZWxlY3RPcHRpb24oaGFuZGxlcikge1xyXG4gICAgdGhpcy5fcGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNsaWNrXCIsXHJcbiAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLl9idG5FbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdChcIi5zZWxlY3Rpb25cIik7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9uRWxlbWVudCA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLW9wdGlvblwiKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9idG5FbGVtZW50IHx8ICF0aGlzLl9vcHRpb25FbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuX2J0bkVsZW1lbnQuZGF0YXNldC5vcHRpb247XHJcbiAgICAgICAgY29uc3QgYW5zd2VyID0gdGhpcy5fYnRuRWxlbWVudC5pbm5lclRleHQuc2xpY2UoMikudHJpbSgpO1xyXG5cclxuICAgICAgICBoYW5kbGVyKGFuc3dlciwgb3B0aW9uKTtcclxuICAgICAgfS5iaW5kKHRoaXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29ycmVjdEFuc3dlcihzZWxlY3RlZE9wdGlvbiwgcmlnaHRPcHRpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkQnRuID0gdGhpcy5fYWxsQnV0dG9uc1tzZWxlY3RlZE9wdGlvbl07XHJcbiAgICBjb25zdCByaWdodEJ0biA9IHRoaXMuX2FsbEJ1dHRvbnNbcmlnaHRPcHRpb25dO1xyXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tc3VibWl0XCIpO1xyXG5cclxuICAgIHJpZ2h0QnRuLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgXCJiZWZvcmVlbmRcIixcclxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIGNsYXNzPVwic2VsZWN0aW9uLXRpY2tcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj48cGF0aCBmaWxsPVwiIzI2RDc4MlwiIGQ9XCJNMjAgNWExNSAxNSAwIDEgMSAwIDMwIDE1IDE1IDAgMCAxIDAtMzBabTAgMi41YTEyLjUgMTIuNSAwIDEgMCAwIDI1IDEyLjUgMTIuNSAwIDAgMCAwLTI1Wm0tMS44NzUgMTUuMTA1TDI1LjMgMTUuNDFhMS4yNSAxLjI1IDAgMCAxIDEuOTE1IDEuNTkzbC0uMTQ1LjE3NC04LjA2IDguMDhhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0OGwtLjE3NS0uMTQ1LTQuMzc1LTQuMzc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0xLjkxM2wuMTc1LjE0MyAzLjQ5IDMuNDlaXCIvPjwvc3ZnPmBcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGVkT3B0aW9uICE9IHJpZ2h0T3B0aW9uKSB7XHJcbiAgICAgIHNlbGVjdGVkQnRuLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICAgICBcImJlZm9yZWVuZFwiLFxyXG4gICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiBjbGFzcz1cInNlbGVjdGlvbi10aWNrXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+PHBhdGggZmlsbD1cIiNFRTU0NTRcIiBkPVwiTTIwIDVhMTUgMTUgMCAxIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMwWm0wIDIuNWExMi41IDEyLjUgMCAxIDAgMCAyNSAxMi41IDEyLjUgMCAwIDAgMC0yNVptLTUuNDAyIDcuNDE1LjE0Mi0uMTc1YTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzTDIwIDE4LjIzM2wzLjQ5LTMuNDkzYTEuMjUgMS4yNSAwIDAgMSAxLjU5NS0uMTQzbC4xNzUuMTQzYTEuMjUgMS4yNSAwIDAgMSAuMTQyIDEuNTk1bC0uMTQyLjE3NUwyMS43NjcgMjBsMy40OTMgMy40OWExLjI1IDEuMjUgMCAwIDEgLjE0MiAxLjU5NWwtLjE0Mi4xNzVhMS4yNSAxLjI1IDAgMCAxLTEuNTk1LjE0MmwtLjE3NS0uMTQyTDIwIDIxLjc2N2wtMy40OSAzLjQ5M2ExLjI1IDEuMjUgMCAwIDEtMS41OTUuMTQybC0uMTc1LS4xNDJhMS4yNSAxLjI1IDAgMCAxLS4xNDMtMS41OTVsLjE0My0uMTc1TDE4LjIzMyAyMGwtMy40OTMtMy40OWExLjI1IDEuMjUgMCAwIDEtLjE0My0xLjU5NVpcIi8+PC9zdmc+YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWxsQnV0dG9ucy5mb3JFYWNoKChidG4pID0+IGJ0bi5jbGFzc0xpc3QuYWRkKFwic2VsZWN0aW9uLWRpc2FibGVkXCIpKTtcclxuICAgIHN1Ym1pdEJ0bi5pbm5lclRleHQgPSBcIk5leHQgUXVlc3Rpb25cIjtcclxuICAgIHN1Ym1pdEJ0bi5jbGFzc0xpc3QucmVwbGFjZShcImJ0bi1zdWJtaXRcIiwgXCJidG4tbmV4dFwiKTtcclxuICB9XHJcblxyXG4gIGFkZEhhbmRsZXJTZWxlY3RUb3BpYyhoYW5kbGVyKSB7XHJcbiAgICB0aGlzLl9wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBjb25zdCBvcHRpb24gPSBlLnRhcmdldC5jbG9zZXN0KFwiLnNlbGVjdGlvblwiKTtcclxuICAgICAgaWYgKCFvcHRpb24pIHJldHVybjtcclxuICAgICAgY29uc3QgdG9waWMgPSArb3B0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0aW9uLW9wdGlvblwiKS5kYXRhc2V0LnRvcGljO1xyXG4gICAgICBpZiAoIXRvcGljICYmIHRvcGljICE9PSAwKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZXIodG9waWMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRIYW5kbGVyUmVuZGVyU3VibWl0QW5zd2VyKGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuYnRuLXN1Ym1pdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCFzdWJtaXRCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICAgICAgaGFuZGxlcigpO1xyXG4gICAgICB9LmJpbmQodGhpcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRIYW5kbGVyTmV4dFF1ZXN0aW9uKGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX3BhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGNvbnN0IG5leHRCdG4gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmJ0bi1uZXh0XCIpO1xyXG4gICAgICBpZiAoIW5leHRCdG4pIHJldHVybjtcclxuICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBoYW5kbGVyKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgT3B0aW9uc1ZpZXcoKTtcclxuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3J1xyXG5cclxuY2xhc3MgUXVlc3Rpb25WaWV3IGV4dGVuZHMgVmlldyB7XHJcbiAgX3BhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbl9fcXVlc3Rpb24nKVxyXG4gIF9kYXRhXHJcblxyXG4gIF9nZW5lcmF0ZU1hcmt1cCgpIHtcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLWhlYWRpbmdcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwidHlwZS1ib2R5LXNcIj5RdWVzdGlvbiAke3RoaXMuX2RhdGEucHJvZ3Jlc3MgKyAxfSBvZiAke3RoaXMuX2RhdGEucXVpei5xdWVzdGlvbnMubGVuZ3RofTwvcD5cclxuICAgICAgICAgIDwvZGl2PiAgICBcclxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cclxuICAgICAgICAgICAgICAke3RoaXMuX2RhdGEuY3VyclF1ZXN0aW9ufVxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XHJcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcubWFpbl9fcXVlc3Rpb24tcHJvZ3Jlc3MtYmFyLXByb2dyZXNzJyxcclxuICAgIClcclxuXHJcbiAgICBjb25zdCBxdWl6UHJvZ3Jlc3MgPVxyXG4gICAgICAoKHRoaXMuX2RhdGEucHJvZ3Jlc3MgKyAxKSAvIHRoaXMuX2RhdGEucXVpei5xdWVzdGlvbnMubGVuZ3RoKSAqIDEwMFxyXG5cclxuICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KCd3aWR0aCcsIGAke3F1aXpQcm9ncmVzc30lYClcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFF1ZXN0aW9uVmlldygpXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInXHJcblxyXG5jb250cm9sbGVyLmluaXQoKVxyXG5cclxuLy8gY29uc3QgdG9nZ2xlQ29sb3JNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXHJcbi8vIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcclxuLy8gY29uc3QgcXVlc3Rpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19xdWVzdGlvbicpXHJcbi8vIGNvbnN0IG9wdGlvbnNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX19vcHRpb25zJylcclxuLy8gY29uc3QgcHJvZ3Jlc3NCYXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbi8vICAgJy5tYWluX19xdWVzdGlvbi1wcm9ncmVzcy1iYXInLFxyXG4vLyApXHJcblxyXG4vLyBjb25zdCB0b3BpY01hcCA9IHtcclxuLy8gICBodG1sOiAwLFxyXG4vLyAgIGNzczogMSxcclxuLy8gICBqczogMixcclxuLy8gICBhY2Nlc3NpYmlsaXR5OiAzLFxyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBvcHRpb25zTWFwID0gWydBJywgJ0InLCAnQycsICdEJ11cclxuXHJcbi8vIGxldCB0b3BpY0RhdGEgPSB7fVxyXG4vLyBsZXQgcXVlc3Rpb25Db3VudCA9IDBcclxuXHJcbi8vIHRvZ2dsZUNvbG9yTW9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuLy8gICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0LW1vZGUnKSkge1xyXG4vLyAgICAgYm9keS5jbGFzc0xpc3QucmVwbGFjZSgnbGlnaHQtbW9kZScsICdkYXJrLW1vZGUnKVxyXG4vLyAgIH0gZWxzZSB7XHJcbi8vICAgICBib2R5LmNsYXNzTGlzdC5yZXBsYWNlKCdkYXJrLW1vZGUnLCAnbGlnaHQtbW9kZScpXHJcbi8vICAgfVxyXG4vLyB9KVxyXG5cclxuLy8gZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuLy8gICBjb25zdCBlc2NhcGVNYXAgPSB7XHJcbi8vICAgICAnJic6ICcmYW1wOycsXHJcbi8vICAgICAnPCc6ICcmbHQ7JyxcclxuLy8gICAgICc+JzogJyZndDsnLFxyXG4vLyAgICAgJ1wiJzogJyZxdW90OycsXHJcbi8vICAgICBcIidcIjogJyYjMDM5OycsXHJcbi8vICAgfVxyXG5cclxuLy8gICAvLyBSZXBsYWNlIGFueSBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXR5XHJcbi8vICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bJjw+XCInXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcclxuLy8gICAgIHJldHVybiBlc2NhcGVNYXBbbWF0Y2hdXHJcbi8vICAgfSlcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgaWRUb3BpYyA9IGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgY29uc3QgdGFyZ2V0ID0gWy4uLmUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rpb24tb3B0aW9uJykuY2xhc3NMaXN0XVxyXG4vLyAgICAgLmZpbHRlcihlbCA9PiBlbC5zdGFydHNXaXRoKCdzZWxlY3Rpb24tb3B0aW9uLS0nKSlcclxuLy8gICAgIC50b1N0cmluZygpXHJcbi8vICAgICAuc2xpY2UoMTgpXHJcbi8vICAgcmV0dXJuIHRhcmdldFxyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKHRhcmdldCkge1xyXG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2RhdGEuanNvbicpXHJcbi8vICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4vLyAgIHJldHVybiBkYXRhXHJcbi8vIH1cclxuXHJcbi8vIGNvbnN0IHNlbGVjdFRvcGljID0gYXN5bmMgZnVuY3Rpb24gKGUpIHtcclxuLy8gICAvLyAgIGlmIChxdWVzdGlvbkNvdW50ID4gMCkgcmV0dXJuXHJcbi8vICAgY29uc3QgdG9waWNJZCA9IHRvcGljTWFwW2lkVG9waWMoZSldXHJcbi8vICAgY29uc3QgeyBxdWl6emVzOiBxdWl6IH0gPSBhd2FpdCBnZXREYXRhKClcclxuLy8gICB0b3BpY0RhdGEgPSBxdWl6W3RvcGljSWRdXHJcbi8vICAgZGlzcGxheVF1ZXN0aW9ucygpXHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIHNldEFjdGl2ZVN0YXRlKGUpIHtcclxuLy8gICBpZiAocXVlc3Rpb25Db3VudCA9PT0gMCkgcmV0dXJuXHJcbi8vICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2J1dHRvbicpIHtcclxuLy8gICAgIHJldHVyblxyXG4vLyAgIH1cclxuLy8gICA7Wy4uLmUudGFyZ2V0LmNsb3Nlc3QoJ2RpdicpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpXS5mb3JFYWNoKGVsID0+XHJcbi8vICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rpb24tLWFjdGl2ZScpLFxyXG4vLyAgIClcclxuLy8gICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rpb24tLWFjdGl2ZScpXHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIGRpc3BsYXlRdWVzdGlvbnMoKSB7XHJcbi8vICAgaWYgKHF1ZXN0aW9uQ291bnQgPCB0b3BpY0RhdGEucXVlc3Rpb25zLmxlbmd0aCkgKytxdWVzdGlvbkNvdW50XHJcblxyXG4vLyAgIGNvbnN0IHF1ZXN0aW9uID0gdG9waWNEYXRhLnF1ZXN0aW9uc1txdWVzdGlvbkNvdW50IC0gMV0ucXVlc3Rpb25cclxuLy8gICBjb25zdCBvcHRpb25zID0gdG9waWNEYXRhLnF1ZXN0aW9uc1txdWVzdGlvbkNvdW50IC0gMV0ub3B0aW9uc1xyXG5cclxuLy8gICBxdWVzdGlvbkVsLmlubmVySFRNTCA9IGBcclxuLy8gICA8ZGl2IGNsYXNzPVwibWFpbl9fcXVlc3Rpb24taGVhZGluZ1wiPlxyXG4vLyAgICAgPGgyIGNsYXNzPVwidHlwZS1oZWFkaW5nLWxcIj5cclxuLy8gICAgICAgJHtxdWVzdGlvbn1cclxuLy8gICAgIDwvaDI+XHJcbi8vICAgPC9kaXY+XHJcbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXN1Yi1oZWFkaW5nXCI+XHJcbi8vICAgICA8cCBjbGFzcz1cInR5cGUtYm9keS1zXCI+UXVlc3Rpb24gJHtxdWVzdGlvbkNvdW50fSBvdXQgb2YgJHt0b3BpY0RhdGEucXVlc3Rpb25zLmxlbmd0aH08L3A+XHJcbi8vICAgPC9kaXY+XHJcbi8vICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhclwiPlxyXG4vLyAgICAgPGRpdiBjbGFzcz1cIm1haW5fX3F1ZXN0aW9uLXByb2dyZXNzLWJhci1wcm9ncmVzc1wiPjwvZGl2PlxyXG4vLyAgIDwvZGl2PmBcclxuXHJcbi8vICAgY29uc3Qgb3B0aW9uc0hUTUwgPSBvcHRpb25zLm1hcChcclxuLy8gICAgIChlbCwgaSkgPT5cclxuLy8gICAgICAgKGVsID0gYDxidXR0b24gY2xhc3M9XCJzZWxlY3Rpb24gdHlwZS1oZWFkaW5nLXNcIj5cclxuLy8gICAgICAgICA8ZGl2XHJcbi8vICAgICAgICAgICBjbGFzcz1cInNlbGVjdGlvbi1vcHRpb24gc2VsZWN0aW9uLW9wdGlvbi0taWRsZSB0eXBlLWhlYWRpbmctc1wiPlxyXG4vLyAgICAgICAgICAgJHtvcHRpb25zTWFwW2ldfVxyXG4vLyAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25zW2ldKX1cclxuXHJcbi8vICAgICAgIDwvYnV0dG9uPmApLFxyXG4vLyAgIClcclxuLy8gICBjb25zb2xlLmxvZyhvcHRpb25zSFRNTClcclxuLy8gICBvcHRpb25zRWwuaW5uZXJIVE1MID0gWy4uLm9wdGlvbnNIVE1MXVxyXG4vLyB9XHJcbi8vIG9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdFRvcGljKVxyXG4vLyBvcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRBY3RpdmVTdGF0ZSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9