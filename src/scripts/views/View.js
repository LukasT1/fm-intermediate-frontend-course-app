export default class View {
  _data

  render(data) {
    if (!data) return
    this._data = data

    const markup = this._generateMarkup()

    this.clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  clear() {
    this._parentElement.innerHTML = ''
  }

  addHandlerChangeColorTheme(handler) {
    const toggle = document.querySelector('.toggle')
    toggle.addEventListener('change', function (e) {
      const colorMode = toggle.checked ? 'dark' : 'light'
      handler(colorMode)
    })
  }

  setColorTheme(colorMode) {
    document.querySelector('.toggle').checked =
      colorMode === 'light' ? false : true
    document.body.classList.replace(
      `${colorMode === 'light' ? 'dark' : 'light'}-mode`,
      `${colorMode}-mode`,
    )
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', function (e) {
      handler()
    })
  }
}
