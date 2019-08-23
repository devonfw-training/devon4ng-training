export class FakeConsole extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._prompts = "[]";
    this._showsmall = 'true';
  }

  static get observedAttributes() { return ["prompts", "showsmall"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "prompts": {
        this._prompts = newValue;
        break;
      }
      case "showsmall": {
        this._showsmall = newValue;
        break;
      }
      default: {}
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  get prompts() {
    return JSON.parse(this._prompts);
  }
  set prompts(v) {
    this.setAttribute("prompts", v);
  }

  get showsmall() {
    return this._showsmall.toLowerCase() === "true";
  }
  set showsmall(v) {
    this.setAttribute("showsmall", v);
  }

  renderPrompts() {
    return this.prompts.map(p => `<kbd class="console__prompt">${p}</kbd>`).join('');
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  .logo-container {
    overflow: hidden;
    text-align: center;
  }

  .console {
${this.showsmall ? 'width: 360px;max-width: 92vw;margin-right: 40px;' : 'margin-right: 15px;'}
      margin-left: 15px;
      
      text-align: left;
      border-radius: 5px;
      margin-bottom: 10px;
  }

  .mdl-shadow--4dp {
      box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
  }

  .console__head {
      overflow: hidden;
      background-color: #d5d5d5;
      padding: 8px 15px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
  }

  .console__body {
      background-color: #1e1e1e;
      padding: 30px 17px 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
  }

  .console__prompt {
      display: block;
      margin-bottom: 15px;
      font-family: "Source Code Pro",monospace;
      font-size: 15px;
      color: white;
  }

  .console__prompt::before {
      content: ">";
      padding-right: 15px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }

  .console__dot--red {
      background-color: #ff6057;
  }
  .console__dot--green {
      background-color: #28ca40;
  }
  .console__dot--yellow {
      background-color: #ffc22e;
  }
  .console__dot {
      float: left;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 7px;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
  }
</style>
<div class="logo-container">
  <div class="console mdl-shadow--4dp">
    <div class="console__head">
      <div class="console__dot console__dot--red"></div>
      <div class="console__dot console__dot--yellow"></div>
      <div class="console__dot console__dot--green"></div>
    </div>
    <div class="console__body">
      ${this.renderPrompts()}
    </div>
  </div>
</div>
    `;
  }
}
