import { css, customElement, html, LitElement, property, query } from 'lit-element';

import { Replacement } from './replacement';
import { computeSuggestQuery, computeValueWithIds, replaceCurrentSelection } from './utils';

/**
 * A textarea that provides suggestions as the user types.
 */
@customElement('iron-suggest-textarea')
export class IronSuggestTextarea extends LitElement {
	/**
	 * Value as shown in the textarea
	 */
	@property({type: String})
	public value?: string;

	@property({type: String})
	public valueWithIds?: string;

	/**
	 * True if the input area should be automatically focused
	 */
	@property({type: Boolean})
	public autofocus: boolean = false;

	/**
	 * Maximum number of rows for the textarea
	 */
	@property({type: Number})
	public maxRows: number = 3;

	/**
	 * Placeholder of the textarea
	 */
	@property({type: String})
	public placeholder?: string;

	/**
	 * Contains replacements like {id:'joe', name:'Joe Plumber'}
	 */
	@property({type: Array})
	public replacements: Replacement[] = [];

	@query('#textarea')
	private textareaEl?: HTMLTextAreaElement;

	static get styles() {
		return css`
			#text {
				@apply --suggest-textarea;
			}
		`;
	}

	/**
	 * Focuses on the input element
	 */
	public focus() {
		this.textareaEl!.focus();
	}

	/**
	 * Adds with which an ID the name should be replaced
	 * @param id   ID beloning to the name
	 * @param name Name beloning to the ID
	 */
	public addReplacement(id: string, name: string) {
		this.replacements = this.replacements.concat({
			id,
			name,
		});
	}

	/**
	 * Removes all stored replacements
	 */
	public clearReplacements() {
		this.replacements = [];
	}

	/**
	 * Replaces the currently entered text with a specific name
	 * @param name Full name
	 */
	public replaceCurrentSelection(name: string) {
		const { newCursorPos, newValue } = replaceCurrentSelection(this.value || '', name, this.getCursorPos());
		this.textareaEl!.selectionStart = newCursorPos;
		this.textareaEl!.selectionEnd = newCursorPos;

		this.value = newValue;
	}

	protected render() {
		return html`
			<textarea
				id="textarea"
				value="${this.value}"
				placeholder="${this.placeholder}"
				max-rows="${this.maxRows}"
				autofocus="${this.autofocus}"
				@focus="${this.onFocus}"
				@keyup="${this.onKeyup}"
			></textarea>
		`;
	}

	protected updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('value') || changedProperties.has('replacements')) {
			this.valueWithIds = computeValueWithIds(this.value || '', this.replacements);
		}
		if (changedProperties.has('valueWithIds')) {
			this.dispatchEvent(new CustomEvent('value-with-ids-changed', {
				detail: {
					valueWithIds: this.valueWithIds,
				},
			}));
		}
	}

	/**
	 * Fired when the user focuses the textarea
	 */
	private onFocus() {
		this.dispatchEvent(new CustomEvent('focus'));
	}

	private onKeyup() {
		this.value = this.textareaEl!.value;

		const suggestQuery = computeSuggestQuery(this.value, this.getCursorPos());
		this.dispatchEvent(new CustomEvent('suggest-query-changed', {
			detail: { suggestQuery },
		}));
	}

	private getCursorPos() {
		return this.textareaEl!.selectionStart;
	}
}
