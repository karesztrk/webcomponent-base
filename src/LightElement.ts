/**
 * A custom component base class that uses Light (regular) DOM.
 * *Inspired by: Hawk Ticehurst*
 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
 */
abstract class LightElement extends HTMLElement {
  static register(tagName: string, ctor: new () => HTMLElement) {
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
            name as keyof HTMLElementEventMap,
            this[value] as EventListener,
          );
        }
      }
    }
  }

  connectedCallback() {
    this.dependencies();
    this.render();
  }

  abstract render(): void;

  dependencies() {}

  getTemplate(id: string): HTMLElement {
    const template = document.getElementById(id) as HTMLTemplateElement | null;
    return template?.content.cloneNode(true) as HTMLElement;
  }

  isOwnProperty(name: unknown): name is keyof this {
    const o = Object.getPrototypeOf(this);
    const names = Object.getOwnPropertyNames(o);
    return names.includes(name as string);
  }
}

export default LightElement;
