export default class View {
  _data

  render(data) {
    if (!data) return
    this._data = data

    const markup = this._generateMarkup()

    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  update() {}

  renderError() {
    console.log('error')
  }

  clear() {
    this._parentElement.innerHTML = ''
  }
}
