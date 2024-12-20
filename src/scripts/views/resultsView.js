import View from './View'

class ResultsView extends View {
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

export default new ResultsView()
