import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import { SuggestTextareaMixin } from './suggest-textarea-mixin';

/**
 * A textarea that provides suggestions as the user types.
 * 
 * ### Example
 * ```html
 * <iron-suggest-textarea
 *   value={{value}}
 *   suggest-query={{suggestQuery}}
 *   value-with-ids={{valueWithIds}}>
 * </iron-suggest-textarea>
 * ```
 * 
 * @demo demo/iron-suggest-textarea.html
 */
class IronSuggestTextarea extends SuggestTextareaMixin(PolymerElement) {
	static get template() {
		return html`
		<style>
			#text {
				@apply --suggest-textarea;
			}
		</style>
		<textarea
			id="text"
			placeholder$="[[placeholder]]"
			value="{{value::input}}"
			max-rows$="[[maxRows]]"
			on-focus="_onFocus"
			autofocus$="[[autofocus]]"
		></textarea>`;
	}

	static get is() {
		return 'iron-suggest-textarea';
	}

	get textarea() {
		return this.$.text;
	}
	
	/**
		* Fired when the user focuses the textarea
		*
		* @event focus
		*/
	_onFocus() {
		this.dispatchEvent(new CustomEvent('focus'));
	}
}
window.customElements.define(IronSuggestTextarea.is, IronSuggestTextarea);
