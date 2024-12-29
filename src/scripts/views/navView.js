import View from './View'

class NavView extends View {
  _parentElement = document.querySelector('.nav__topic')
  _data

  _generateMarkup() {
    console.log(this._data.quiz.icon)
    return `
      <div class="selection-option selection-option--${this._data.quiz.title.toLowerCase()}">
            <img
              src=${this._data.quiz.icon}
              class="nav__topic-icon"
              alt="${this._data.quiz.title} icon" />
          </div>
          <h4 class="type-heading-s" class="nav__topic-heading">${this._data.quiz.title}</h4>`
  }
}

export default new NavView()
