import * as model from "./model.js";
import * as config from "./config.js";
import { getData } from "./helper.js";
import optionsView from "./views/optionsView.js";
import questionView from "./views/questionView.js";

const controlSelectTopic = async function (topic) {
  try {
    //Get quiz topic
    await model.getQuizData(+topic);
    model.state.progress = 0;
    controlQuiz(model.state.progress);
  } catch (error) {
    console.error(error);
  }
};

const controlQuiz = function () {
  try {
    if (model.state.progress === null) return;
    //Set current question&options, render, update progress bar
    model.setCurrentQA();
    questionView.render(model.state);

    questionView.updateProgressBar(model.state);

    //Render options
    optionsView.render(model.state);
    console.log(model.state);
  } catch (error) {
    console.error(error);
  }
};

const controlValidateAnswer = function () {
  const answers = model.state.answers;
  if (answers.answered) return;
  if (!answers.selected[2]) {
    optionsView.renderError();
    return;
  }
  if (model.validateAnswer()) {
    optionsView.resetClasses();
    optionsView.toggleState(answers.selected[0], "picked-correct");
  } else {
    optionsView.resetClasses();
    optionsView.toggleState(answers.selected[0], "picked-incorrect");
    optionsView.toggleState(answers.right[0], "picked-correct");
  }

  optionsView.renderCorrectAnswer(answers.selected[0], answers.right[0]);
};

const controlSelectOption = function (answer, option) {
  if (model.state.progress === null || model.state.answers.answered) return;
  model.state.answers.selected[2] = true;
  console.log(model.state.answers.selected[2]);
  optionsView.resetClasses();
  model.state.setSelectedAnswer(option, answer);
  optionsView.toggleState(option, "active");
};

const controlNextQuestion = function () {
  if (!model.state.answers.answered) return;

  controlQuiz();
};

export const init = function () {
  optionsView.addHandlerSelectTopic(controlSelectTopic);
  optionsView.addHandlerSelectOption(controlSelectOption);
  optionsView.addHandlerRenderSubmitAnswer(controlValidateAnswer);
  optionsView.addHandlerNextQuestion(controlNextQuestion);
};
