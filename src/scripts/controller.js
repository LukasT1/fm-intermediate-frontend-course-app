import * as model from './model.js'
import * as config from './config.js'
import { getData } from './helper.js'
import optionsView from './views/optionsView.js'
import questionView from './views/questionView.js'
import resultsView from './views/resultsView.js'
import View from './views/View.js'
import { loadLocalStorage } from './helper'
import { clearLocalStorage } from './helper.js'
import initialView from './views/initialView.js'

const view = new View()

const controlSelectTopic = async function (topic) {
  try {
    //Get quiz topic
    await model.getQuizData(+topic)
    model.state.progress = 0
    controlQuiz(model.state.progress)
  } catch (error) {
    console.error(error)
  }
}

const controlQuiz = function () {
  try {
    if (model.state.progress === null) return
    if (model.state.progress === model.state.quiz.questions.length) {
      controlRenderResult()
      return
    }

    //Set current question&options, render, update progress bar

    model.setCurrentQA()
    questionView.render(model.state)

    questionView.updateProgressBar(model.state)

    //Render options
    optionsView.render(model.state)
  } catch (error) {
    console.error(error)
  }
}

const controlRenderResult = function () {
  try {
    resultsView.render(model.state)
  } catch (error) {
    console.error(error)
  }
}
const controlValidateAnswer = function () {
  const answers = model.state.answers
  if (answers.answered) return
  if (!answers.selected[2]) {
    console.log('calling render error')
    optionsView.renderError()
    return
  }
  if (model.validateAnswer()) {
    optionsView.resetClasses()
    optionsView.toggleState(answers.selected[0], 'picked-correct')
  } else {
    optionsView.resetClasses()
    optionsView.toggleState(answers.selected[0], 'picked-incorrect')
    optionsView.toggleState(answers.right[0], 'picked-correct')
  }

  optionsView.renderCorrectAnswer(answers.selected[0], answers.right[0])
}

const controlSelectOption = function (answer, option) {
  if (model.state.progress === null || model.state.answers.answered) return
  model.state.answers.selected[2] = true

  optionsView.resetClasses()
  model.state.setSelectedAnswer(option, answer)
  optionsView.toggleState(option, 'active')
}

const controlNextQuestion = function () {
  if (!model.state.answers.answered) return

  controlQuiz()
}

const controlLightMode = function (colorMode = model.state.theme) {
  model.state.setColorMode(colorMode)
  view.setColorTheme(colorMode)
}

const controLoad = function () {
  loadLocalStorage(model.state)
  controlQuiz()
  controlLightMode()
}

const controlPlayAgain = function () {
  model.state.reset()
  clearLocalStorage()
  initialView.render(model.state)
  optionsView.initElements()
  questionView.initElements()
  resultsView.initElements()
  init()
  console.log(model.state)
}

export const init = function () {
  view.addHandlerLoad(controLoad)
  optionsView.addHandlerSelectTopic(controlSelectTopic)
  optionsView.addHandlerSelectOption(controlSelectOption)
  optionsView.addHandlerRenderSubmitAnswer(controlValidateAnswer)
  optionsView.addHandlerNextQuestion(controlNextQuestion)
  view.addHandlerChangeColorTheme(controlLightMode)
  resultsView.addHandlerPlayAgain(controlPlayAgain)
}

// init()
