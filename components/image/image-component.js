class ImageComponent extends HTMLElement {
  static get observedAttributes() {
    return ["tag", "source", "subtitle", "img-style", "figure-style", "caption-style"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="figure" style="${this["figure-style"] || ""}">
      <img id="${this.tag}" src="${this.source}" alt="${this.subtitle}" style="${this["img-style"] || ""}">
      <sub style="${this["caption-style"] || ""}">${this.subtitle}</sub>
    </div>
    <style>
      :host {
        display: block;
      }

      .figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        text-align: center;
      }

      img {
        display: block;
        width: auto;
        max-width: 100%;
        max-height: 680px;
        margin: 0 auto;
        object-fit: contain;
      }

      sub {
        font-size: 1rem;
        font-style: italic;
        display: block;
        margin-top: 8px;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("image-component", ImageComponent);
