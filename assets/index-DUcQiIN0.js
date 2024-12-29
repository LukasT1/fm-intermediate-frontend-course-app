var y=Object.defineProperty;var b=(e,t,s)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var r=(e,t,s)=>b(e,typeof t!="symbol"?t+"":t,s);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const q=async function(e){try{return await(await fetch(e)).json()}catch{}},S=function(e){try{if(typeof e=="string"){const t=["<",">","&"],s=["&lt;","&gt;","&amp;"];return e.split("").map(i=>t.indexOf(i)===-1?i:i=s[t.indexOf(i)]).join("")}else return e}catch{}},h=function(e){try{localStorage.setItem("state",JSON.stringify(e))}catch(t){console.error(t)}},E=function(e){try{const t=JSON.parse(localStorage.getItem("state"));if(!t)return;Object.assign(e,t)}catch(t){console.error(t)}},L=function(){localStorage.clear()},A="./assets/data.json",v={quiz:{},currQuestion:"",currOptions:[],progress:null,optionsMap:["A","B","C","D"],score:0,answers:{selected:[0,"",!1],right:[0,""],answered:!1},theme:"light"},n={...v,reset(){Object.assign(this,JSON.parse(JSON.stringify(v)))},setQuiz(e){this.quiz=e},setCurrQuestion(){this.currQuestion=this.quiz.questions[n.progress].question},setCurrOptions(e){this.currOptions=n.quiz.questions[n.progress].options},setProgress(){this.progress+=1},setScore(){this.score+=1},setRightAnswer(){this.answers.right[1]=this.quiz.questions[n.progress].answer,this.answers.right[0]=this.currOptions.findIndex(e=>e===this.getRightAnswer())},setSelectedAnswer(e,t){this.answers.selected[0]=+e,this.answers.selected[1]=t},setAnswered(e){this.answers.answered=n.answers.selected[2]=e},setColorMode(e){return this.theme=e,h(n),this.theme},getRightAnswer(){return this.answers.right[1]}},C=async function(e){const{quizzes:t}=await q(A);n.setQuiz(t[e])},O=function(){n.setCurrQuestion(),n.setCurrOptions(),n.setAnswered(!1),h(n)},x=function(){return n.setRightAnswer(),n.setProgress(),n.setAnswered(!0),h(n),n.getRightAnswer()===n.answers.selected[1]?(n.setScore(),!0):!1};class d{constructor(){r(this,"_data")}render(t){if(!t)return;this._data=t;const s=this._generateMarkup();this.clear(),this._parentElement.insertAdjacentHTML("afterbegin",s)}clear(){this._parentElement.innerHTML=""}addHandlerChangeColorTheme(t){const s=document.querySelector(".toggle");s.addEventListener("change",function(i){const o=s.checked?"dark":"light";t(o)})}setColorTheme(t){document.querySelector(".toggle").checked=t!=="light",document.body.classList.replace(`${t==="light"?"dark":"light"}-mode`,`${t}-mode`)}addHandlerLoad(t){window.addEventListener("load",function(s){t()})}}class z extends d{constructor(){super(...arguments);r(this,"_parentElement",document.querySelector(".main__options"));r(this,"_btnElement");r(this,"_optionElement");r(this,"_selectedOption");r(this,"_allButtons");r(this,"_allOptions");r(this,"_data")}initElements(){var s,i;this._parentElement=document.querySelector(".main__options"),this._allButtons=(s=this._parentElement)==null?void 0:s.querySelectorAll(".selection"),this._allOptions=(i=this._parentElement)==null?void 0:i.querySelectorAll(".selection-option")}renderError(){this._parentElement.querySelector(".error-msg").classList.toggle("selection-error--hidden")}_generateMarkup(){return`
        ${this._data.currOptions.map((s,i)=>`<button class="selection type-heading-s" data-option="${i}">
        <div
          class="selection-option selection-option--idle type-heading-s">
          ${this._data.optionsMap[i]}
        </div>
        ${S(s)}
      </button>`).join()}
       <button class="btn btn-submit type-heading-s">Submit answer</button>
       <div class='selection-error error-msg selection-error--hidden'>
  <img src='/assets/images/icon-error.svg'>
  <p class='type-medium'>Please select an answer</p>
  </div>`}resetClasses(){const s="selection type-heading-s",i="selection-option selection-option--idle type-heading-s";this._allButtons.forEach(o=>o.className=s),this._allOptions.forEach(o=>o.className=i)}toggleState(s,i){this._allButtons[s].classList.toggle(`selection--${i}`),this._allOptions[s].classList.toggle(`selection-option--${i}`)}addHandlerSelectOption(s){this._parentElement.addEventListener("click",(function(i){var c,u;if(this.initElements(),this._btnElement=i.target.closest(".selection"),this._optionElement=i.target.querySelector(".selection-option"),!this._btnElement||!this._optionElement)return;(u=(c=this._parentElement)==null?void 0:c.querySelector(".error-msg"))==null||u.classList.add("selection-error--hidden");const o=this._btnElement.dataset.option,a=this._btnElement.innerText.slice(2).trim();s(a,o)}).bind(this))}renderCorrectAnswer(s,i){const o=this._allButtons[s],a=this._allButtons[i],c=document.querySelector(".btn-submit");a.insertAdjacentHTML("beforeend",'<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>'),s!=i&&o.insertAdjacentHTML("beforeend",'<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="selection-tick" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>'),this._allButtons.forEach(u=>u.classList.add("selection-disabled")),this._data.progress<=9&&(c.innerText="Next Question",c.classList.replace("btn-submit","btn-next")),this._data.progress===10&&(c.innerText="See Final Score",c.classList.replace("btn-submit","btn-again"))}addHandlerSelectTopic(s){this._parentElement.addEventListener("click",function(i){const o=i.target.closest(".selection");if(!o)return;const a=+o.querySelector(".selection-option").dataset.topic;!a&&a!==0||s(a)})}addHandlerRenderSubmitAnswer(s){console.log("Adding submit answer handler"),this._parentElement.addEventListener("click",(function(i){i.target.closest(".btn-submit")&&s()}).bind(this))}addHandlerNextQuestion(s){this._parentElement.addEventListener("click",function(i){const o=i.target.closest(".btn-next")||i.target.closest(".btn-again");o&&o.addEventListener("click",function(a){s()})})}}const l=new z;class B extends d{constructor(){super(...arguments);r(this,"_parentElement",document.querySelector(".main__question"));r(this,"_data")}initElements(){this._parentElement=document.querySelector(".main__question")}_generateMarkup(){return`<div class="main__question-heading">
      <div class="main__question-sub-heading">
            <p class="type-body-s">Question ${this._data.progress+1} of ${this._data.quiz.questions.length}</p>
          </div>    
            <h2 class="type-heading-m">
              ${this._data.currQuestion}
            </h2>
          </div>
          
          <div class="main__question-progress-bar">
            <div class="main__question-progress-bar-progress"></div>
          </div>`}updateProgressBar(){const s=document.querySelector(".main__question-progress-bar-progress"),i=(this._data.progress+1)/this._data.quiz.questions.length*100;s.style.setProperty("width",`${i}%`)}}const g=new B;class M extends d{constructor(){super(...arguments);r(this,"_parentElement",document.querySelector(".main"));r(this,"_data")}initElements(){this._parentElement=document.querySelector(".main")}_generateMarkup(){return`<div class="main__question">
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
        <button class="btn main__result-btn-again type-heading-s">Play Again</button>`}addHandlerPlayAgain(s){this._parentElement.addEventListener("click",function(i){i.target.closest(".main__result-btn-again")&&s()})}}const m=new M;class $ extends d{constructor(){super(...arguments);r(this,"_parentElement",document.querySelector(".container"));r(this,"_data")}_generateMarkup(){return`<nav class="nav">
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
     `}}const H=new $;class k extends d{constructor(){super(...arguments);r(this,"_parentElement",document.querySelector(".nav__topic"));r(this,"_data")}_generateMarkup(){return console.log(this._data.quiz.icon),`
      <div class="selection-option selection-option--${this._data.quiz.title.toLowerCase()}">
            <img
              src=${this._data.quiz.icon.slice(1)}
              class="nav__topic-icon"
              alt="${this._data.quiz.title} icon" />
          </div>
          <h4 class="type-heading-s" class="nav__topic-heading">${this._data.quiz.title}</h4>`}}const Q=new k,p=new d,T=async function(e){try{await C(+e),n.progress=0,_(n.progress),Q.render(n)}catch(t){console.error(t)}},_=function(){try{if(n.progress===null)return;if(n.progress===n.quiz.questions.length){Z();return}O(),g.render(n),g.updateProgressBar(n),l.render(n)}catch(e){console.error(e)}},Z=function(){try{m.render(n)}catch(e){console.error(e)}},P=function(){const e=n.answers;if(!e.answered){if(!e.selected[2]){console.log("calling render error"),l.renderError();return}x()?(l.resetClasses(),l.toggleState(e.selected[0],"picked-correct")):(l.resetClasses(),l.toggleState(e.selected[0],"picked-incorrect"),l.toggleState(e.right[0],"picked-correct")),l.renderCorrectAnswer(e.selected[0],e.right[0])}},N=function(e,t){n.progress===null||n.answers.answered||(n.answers.selected[2]=!0,l.resetClasses(),n.setSelectedAnswer(t,e),l.toggleState(t,"active"))},j=function(){n.answers.answered&&_()},f=function(e=n.theme){n.setColorMode(e),p.setColorTheme(e)},V=function(){E(n),_(),f()},R=function(){n.reset(),L(),H.render(n),l.initElements(),g.initElements(),m.initElements(),w(),console.log(n)},w=function(){p.addHandlerLoad(V),l.addHandlerSelectTopic(T),l.addHandlerSelectOption(N),l.addHandlerRenderSubmitAnswer(P),l.addHandlerNextQuestion(j),p.addHandlerChangeColorTheme(f),m.addHandlerPlayAgain(R)};w();
