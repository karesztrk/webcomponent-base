declare module '@karesztrk/webcomponent-base' {
	export default LightElement;
	/**
	 * A custom component base class that uses Light (regular) DOM.
	 * *Inspired by: Hawk Ticehurst*
	 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
	 */
	class LightElement extends HTMLElement {
		
		static register(tagName: string, ctor: new () => HTMLElement): void;
		static handlerSymbol: string;
		
		connectedCallback(): void;
		/**
		 * Manipulate the DOM.
		 * */
		render(): void;
		
		dependencies(): void;
		
		getTemplate(id: string): Node | undefined;
		
		isOwnProperty(name: unknown): boolean;
	}
	export default ShadowElement;
	/**
	 * A custom component base class that uses Shadow DOM.
	 * *Inspired by: Hawk Ticehurst*
	 * @see https://hawkticehurst.com/writing/bring-your-own-base-class/
	 */
	class ShadowElement extends HTMLElement {
		
		static register(tagName: string, ctor: new () => HTMLElement): void;
		
		styles: string | undefined;
		
		connectedCallback(): void;
		
		_render(): void;
		/**
		 * Manipulate the Shadow DOM.
		 * */
		render(): string;
		
		get shadow(): ShadowRoot;
		#private;
	}

	export { LightElement, ShadowElement };
}

//# sourceMappingURL=index.d.ts.map