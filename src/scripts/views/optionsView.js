import View from "./View";
import { escapeCode } from "../helper";

class OptionsView extends View {
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
        ${escapeCode(option)}
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

export default new OptionsView();
