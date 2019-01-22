/**
 * Textarea that provides suggestions as the user types
 */

export const SuggestTextareaMixin = parent => class SuggestTextareaMixinImpl extends parent {
	static get properties() {
		return {

			/**
			 * Contains replacements like {id:'joe', name:'Joe Plumber'}
			 */
			_replacements: {
				type: Array,
				value: [],
			},

			/**
			 * True if the input area should be automatically focused
			 */
			autofocus: Boolean,

			/**
			 * Maximum number of rows for the textarea
			 */
			maxRows: Number,

			/**
			 * Placeholder of the textarea
			 */
			placeholder: {
				type: String,
			},

			/**
			 * Character indicating when suggestions should be shown
			 */
			specialChar: {
				type: String,
				value: '@',
			},

			/**
			 * Query for which suggestions should be shown
			 */
			suggestQuery: {
				computed: '_computeSuggestQuery(value)',
				notify: true,
				readOnly: true,
				type: String,
			},

			/**
			 * Value as shown in the textarea
			 */
			value: {
				notify: true,
				type: String,
			},

			/**
			 * Value of the textarea but all names replaced by IDs
			 */
			valueWithIds: {
				computed: '_computeValueWithIds(value,_replacements)',
				notify: true,
				readOnly: true,
				type: String,
			},
		};
	}

	/**
	 * Focuses on the input element
	 * @returns {void}
	 */
	focus() {
		// TODO: Simplify once focus() is exposed by <paper-textarea>
		this.textarea.focus();
	}

	/**
	 * Adds with which an ID the name should be replaced
	 * @param {string} id   ID beloning to the name
	 * @param {string} name Name beloning to the ID
	 * @returns {void}
	 */
	addReplacement(id, name) {
		this.push('_replacements', {id: id, name: name});
	}

	/**
	 * Replaces the currently entered text with a specific name
	 * @param {string} name Full name
	 * @returns {void}
	 */
	replaceCurrentSelection(name) {
		this._replaceCurrentSelection(name, this._getCursorPos());
	}

	/**
	 * Removes all stored replacements
	 * @returns {void}
	 */
	clearReplacements() {
		this._replacements = [];
	}

	/**
	 * Separate method to simplify unit testing
	 * @param {string} name      Replaces the text at the cursor with the given name
	 * @param {Number} cursorPos Position where the cursor is within the text
	 * @returns {void}
	 */
	_replaceCurrentSelection(name, cursorPos) {
		if (typeof name === 'undefined' || name === null) {
			throw new Error(`Name must be a string but is '${name}'.`);
		}

		const specialCharPos = this._getSpecialCharPosition(this.value, cursorPos);
		if (specialCharPos < 0) {
			return;
		}

		this.value = this.value.substring(0, specialCharPos) + name + this.value.substring(cursorPos);

		// Set cursor to the end of the replaced text
		const newCursorPos = specialCharPos + name.length;
		this.textarea.selectionStart = newCursorPos;
		this.textarea.selectionEnd = newCursorPos;
	}

	_computeSuggestQuery(value) {
		return this._calcSuggestQuery(value, this._getCursorPos());
	}

	// Separate method to simplify unit testing
	_calcSuggestQuery(value, cursorPos) {
		// Find last special character before the cursor position
		const specialCharPos = this._getSpecialCharPosition(value, cursorPos);
		if (specialCharPos < 0) {
			return '';
		}

		return value.substring(specialCharPos + 1, cursorPos);
	}

	_computeValueWithIds(value, _replacements) {
		if (!value || !_replacements) {
			// Ignore initialization call
			return undefined;
		}
		let valueWithIds = value;
		_replacements.forEach(replacement => {
			valueWithIds = valueWithIds.replace(replacement.name, this.specialChar + replacement.id);
		});
		return valueWithIds;
	}

	// Helper
	_getCursorPos() {
		// TODO: Remove once the cursor position is bound
		// @see https://github.com/Polymer/paper-input/issues/185
		return this.textarea.selectionStart;
	}

	_getSpecialCharPosition(value, cursorPos) {
		// Finds the last special character before the cursor
		return value.substring(0, cursorPos).lastIndexOf(this.specialChar);
	}
};
