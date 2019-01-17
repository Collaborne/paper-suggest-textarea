/**
 * textarea that provides suggestions as the user types
 */
export const SuggestTextareaMixin = parent => class SuggestTextareaMixinImpl extends parent {
	static get properties() {
		return {
			/**
			 * Value as shown in the textarea
			 */
			value: {
				type: String,
				notify: true
			},

			/**
			 * Placeholder of the textarea
			 */
			placeholder: {
				type: String
			},

			/**
			 * True if the input area should be automatically focused
			 */
			autofocus: Boolean,

			/**
			 * Character indicating when suggestions should be shown
			 */
			specialChar: {
				type: String,
				value: '@'
			},

			/**
			 * Maximum number of rows for the textarea
			 */
			maxRows: Number,

			/**
			 * Query for which suggestions should be shown
			 */
			suggestQuery: {
				type: String,
				notify: true,
				computed: '_computeSuggestQuery(value)',
				readOnly: true
			},

			/**
			 * Value of the textarea but all names replaced by IDs
			 */
			valueWithIds: {
				type: String,
				notify: true,
				computed: '_computeValueWithIds(value,_replacements)',
				readOnly: true
			},

			/**
			 * Contains replacements like {id:'joe', name:'Joe Plumber'}
			 */
			_replacements: {
				type: Array,
				value: []
			}
		};
	}

	/**
	 * Focuses on the input element
	 */
	focus() {
		// TODO: Simplify once focus() is exposed by <paper-textarea>
		this.textarea.focus();
	}

	/**
	 * Adds with which an ID the name should be replaced
	 * @param  {String} id   ID beloning to the name
	 * @param  {String} name Name beloning to the ID
	 */
	addReplacement(id, name) {
		this.push('_replacements', {id: id, name: name});
	}

	/**
	 * Replaces the currently entered text with a specific name
	 * @param  {String} name Full name
	 */
	replaceCurrentSelection(name) {
		this._replaceCurrentSelection(name, this._getCursorPos());
	}

	/**
	 * Removes all stored replacements
	 */
	clearReplacements() {
		this._replacements = [];
	}

	/**
	 * Separate method to simplify unit testing
	 * @param  {String} name      Replaces the text at the cursor with the given name
	 * @param  {Number} cursorPos Position where the cursor is within the text
	 */
	_replaceCurrentSelection(name, cursorPos) {
		if (typeof name === 'undefined' || name === null) {
			throw new Error(`Name must be a string but is '${name}'.`);
		}

		var specialCharPos = this._getSpecialCharPosition(this.value, cursorPos);
		if (specialCharPos < 0) {
			return;
		}

		this.value = this.value.substring(0, specialCharPos) + name + this.value.substring(cursorPos);

		// Set cursor to the end of the replaced text
		var newCursorPos = specialCharPos + name.length;
		this.textarea.selectionStart = newCursorPos;
		this.textarea.selectionEnd = newCursorPos;
	}

	_computeSuggestQuery(value) {
		return this._calcSuggestQuery(value, this._getCursorPos());
	}

	// Separate method to simplify unit testing
	_calcSuggestQuery(value, cursorPos) {
		// Find last special character before the cursor position
		var specialCharPos = this._getSpecialCharPosition(value, cursorPos);
		if (specialCharPos < 0) {
			return '';
		}

		return value.substring(specialCharPos + 1, cursorPos);
	}

	_computeValueWithIds(value, _replacements) {
		if (!value || !_replacements) {
			// Ignore initialization call
			return;
		}
		var valueWithIds = value;
		_replacements.forEach(function(replacement) {
			valueWithIds = valueWithIds.replace(replacement.name, this.specialChar + replacement.id);
		}.bind(this));
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
