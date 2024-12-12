import View from './View'

class OptionsView extends View {
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

export default new OptionsView()
