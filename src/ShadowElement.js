/**
 * A custom component base class that uses Shadow DOM.
 * *Inspired by: Hawk Ticehurst*
 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
 */
class ShadowElement extends HTMLElement {
  /**
   * @param {string} tagName
   * @param {new () => HTMLElement} ctor
   * @returns {void}
   */
  static register(tagName, ctor) {
    customElements.define(tagName, ctor);
  }

  /** @type {ShadowRoot} */
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  /** @type {string | undefined} */
  styles;

  /**
   * @returns {void}
   */
  connectedCallback() {
    this._render();
  }

  /**
   * @returns {void}
   */
  _render() {
    if (!this.render) {
      throw new Error(
        "Web components extending BaseElement must implement a `render` method.",
      );
    }
    const markup = this.render();
    const styles = this.styles || "";
    const template = document.createElement("template");
    const useConstructableStyleSheets =
      this.shadow.adoptedStyleSheets !== undefined;
    if (styles.length > 0 && useConstructableStyleSheets) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      this.shadow.adoptedStyleSheets = [sheet];
    }
    template.innerHTML = `
      ${styles.length > 0 && !useConstructableStyleSheets ? `<style>${styles}</style>` : ""}
      ${markup}
    `;
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  /**
   * Manipulate the Shadow DOM.
   * @returns {string}
   */
  render() {
    return "";
  }

  /**
   * @returns {ShadowRoot}
   */
  get shadow() {
    return this.#shadow;
  }
}

export default ShadowElement;
