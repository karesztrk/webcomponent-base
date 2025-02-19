/**
 * A custom component base class that uses Light (regular) DOM.
 * *Inspired by: Hawk Ticehurst*
 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
 */
class LightElement extends HTMLElement {
  /**
   * @param {string} tagName
   * @param {new () => HTMLElement} ctor
   * @returns {void}
   */
  static register(tagName, ctor) {
    customElements.define(tagName, ctor);
  }

  static handlerSymbol = "$";

  constructor() {
    super();

    for (const attribute of this.attributes) {
      if (attribute.name.startsWith(LightElement.handlerSymbol)) {
        const name = attribute.name.slice(1);
        const value = attribute.value;
        if (this.isOwnProperty(value)) {
          this.addEventListener(
            name,
            /** @type {EventListener} */ (
              this[/** @type {keyof this} */ (value)]
            ),
          );
        }
      }
    }
  }

  /**
   * @returns {void}
   */
  connectedCallback() {
    this.dependencies();
    this.render();
  }

  /**
   * Manipulate the DOM.
   * @returns {void}
   */
  render() {}

  /**
   * @returns {void}
   */
  dependencies() {}

  /**
   * @param {string} id
   * @returns {Node | undefined}
   */
  getTemplate(id) {
    const template = document.getElementById(id);
    return /** @type {HTMLTemplateElement | null} */ (
      template
    )?.content.cloneNode(true);
  }

  /**
   * @param {unknown} name
   * @returns {boolean}
   */
  isOwnProperty(name) {
    const o = Object.getPrototypeOf(this);
    const names = Object.getOwnPropertyNames(o);
    return names.includes(/** @type {string} */ (name));
  }

  /**
   * Given a selector, if the target element exists, it will be replace its children with the template instance.
   * If the target element doesn't exist, the template will be appended as a new child.
   * @param {string} selector
   * @param {HTMLElement} template
   * @returns {void}
   */
  addTemplate(selector, template) {
    const target = this.querySelector(selector);
    if (target) {
      target.replaceChildren(...template.children);
    } else {
      this.appendChild(template);
    }
  }
}

export default LightElement;
