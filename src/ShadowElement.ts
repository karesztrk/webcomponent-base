/**
 * A custom component base class that uses Shadow DOM.
 * *Inspired by: Hawk Ticehurst*
 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
 */
abstract class ShadowElement extends HTMLElement {
  static register(tagName: string, ctor: new () => HTMLElement) {
    customElements.define(tagName, ctor);
  }

  #shadow: ShadowRoot;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._render();
  }

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

  abstract render(): string;

  protected get shadow() {
    return this.#shadow;
  }

  abstract styles?: string;
}

export default ShadowElement;
