import View from './View'

class InitalView extends View {
  _parentElement = document.querySelector('.container')
  _data

  _generateMarkup() {
    return `<nav class="nav">
        <div class="nav__topic hidden">
          <div class="selection-option selection-option--accessibility">
            <img
              src="/assets/images/icon-accessibility.svg"
              class="nav__topic-icon"
              alt="" />
          </div>
          <h4 class="type-heading-s" class="nav__topic-heading">Topic</h4>
        </div>
        <div class="nav__toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              fill="#626C7F"
              d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z" />
          </svg>
          <input type="checkbox" name="" id="" class="toggle" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              fill="#626C7F"
              d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z" />
          </svg>
        </div>
      </nav>

      <main class="main">
        <div class="main__question">
          <div class="main__question-heading">
            <h2 class="type-heading-l">
              <span class="type-regular">Welcome to the</span> Frontend
              Quiz!
            </h2>
          </div>
          <div class="main__question-sub-heading">
            <p class="type-body-s">Pick a subject to get started.</p>
          </div>
          <div class="main__question-progress-bar hidden">
            <div class="main__question-progress-bar-progress"></div>
          </div>
        </div>
        <div class="main__options">
          <button class="selection type-heading-s">
            <div
              data-topic="0"
              class="selection-option selection-option--html type-heading-s">
              <img src="/assets/images/icon-html.svg" alt="" />
            </div>
            HTML
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="1"
              class="selection-option selection-option--css type-heading-s">
              <img src="/assets/images/icon-css.svg" alt="" />
            </div>
            CSS
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="2"
              class="selection-option selection-option--js type-heading-s">
              <img src="/assets/images/icon-js.svg" alt="" />
            </div>
            Javascript
          </button>
          <button class="selection type-heading-s">
            <div
              data-topic="3"
              class="selection-option selection-option--accessibility type-heading-s">
              <img src="/assets/images/icon-accessibility.svg" alt="" />
            </div>
            Accessibility
          </button>
        </div>
      </main>
     `
  }
}

export default new InitalView()
