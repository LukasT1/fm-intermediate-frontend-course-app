import { getData } from './helper'
import { QUESTION_DATA_PATH } from './config'

export const state = {
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

export const getQuizData = async function (topic) {
  const { quizzes } = await getData(QUESTION_DATA_PATH)

  state.quiz = quizzes[topic]
  console.log(state)
}

export const setCurrentQA = function (progress) {
  state.progress = progress
  state.currQuestion = state.quiz.questions[state.progress].question
  state.currOptions = state.quiz.questions[state.progress].options
  state.answers.answered = false
}

export const validateAnswer = function () {
  state.setRightAnswer()
  state.answers.answered = true
  console.log(state)

  if (state.getRightAnswer() === state.answers.selected[1]) {
    return true
  } else {
    return false
  }
}
