import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea'

import { SuggestTextareaMixin } from './suggest-textarea-mixin';

/**
 * A Material Design textarea that provides suggestions as the user types.
 * @demo demo/paper-suggest-textarea.html
 */
class PaperSuggestTextarea extends SuggestTextareaMixin(PolymerElement) {
	static get template() {
		return html`
		<paper-textarea
			id="text"
			placeholder="[[placeholder]]"
			value="{{value::input}}"
			max-rows="[[maxRows]]"
			autofocus="[[autofocus]]"
		></paper-textarea>`;
	}

	static get is() {
		return 'paper-suggest-textarea';
	}

	get textarea() {
		return this.$.text.inputElement.textarea;
	}
}
window.customElements.define(PaperSuggestTextarea.is, PaperSuggestTextarea);
