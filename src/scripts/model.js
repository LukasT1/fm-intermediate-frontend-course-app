import { getData } from './helper'
import { QUESTION_DATA_PATH } from './config'
import { saveLocalStorage } from './helper'

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

export const state = {
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
    saveLocalStorage(state)
    return this.theme
  },
  getRightAnswer() {
    return this.answers.right[1]
  },
}

export const getQuizData = async function (topic) {
  const { quizzes } = await getData(QUESTION_DATA_PATH)
  state.setQuiz(quizzes[topic])
}

export const setCurrentQA = function () {
  state.setCurrQuestion()
  state.setCurrOptions()
  state.setAnswered(false)
  saveLocalStorage(state)
}

export const validateAnswer = function () {
  state.setRightAnswer()
  state.setProgress()
  state.setAnswered(true)
  saveLocalStorage(state)

  if (state.getRightAnswer() === state.answers.selected[1]) {
    state.setScore()
    return true
  } else {
    return false
  }
}
