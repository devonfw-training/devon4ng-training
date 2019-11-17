export class HelloParagraph extends HTMLElement {
  constructor() {
    super();
    this._firstname = 'Otto';
  }

  static get observedAttributes() { return ["firstname"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    this._firstname = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
<p>Hello ${this._firstname}!</p>    
    `;
  }
}
