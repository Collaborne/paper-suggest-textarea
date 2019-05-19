// RegEx to find @ signs at the beginning or after a whitespace. It allows for email addresses to be entered.
const REGEX_AT = /(^|\s)@([^\s]*(?: [^\s@]*)?)$/g;

/**
 * Finds the last special character before the cursor
 */
export function getSpecialCharPosition(value: string | undefined, cursorPos: number) {
	const valueBeforeCursor = (value || '').substring(0, cursorPos);
	const match = new RegExp(REGEX_AT).exec(valueBeforeCursor);

	return match ? match.index + match[1].length : -1;
}

/**
 * Separate method to simplify unit testing
 * @param name Replaces the text at the cursor with the given name
 * @param cursorPos Position where the cursor is within the text
 */
export function replaceCurrentSelection(value: string, name: string, cursorPos: number) {
	if (!name) {
		throw new Error(`Name must be a string but is '${name}'.`);
	}

	const specialCharPos = getSpecialCharPosition(value, cursorPos);
	if (specialCharPos < 0) {
		throw new Error(`Can't find special character in value '${value}'.`);
	}

	const valueBeforeReplacement = value.substring(0, specialCharPos);
	const valueAfterReplacement = value.substring(cursorPos);
	const newValue = `${valueBeforeReplacement}${name}${valueAfterReplacement}`;

	// Set cursor to the end of the replaced text
	const newCursorPos = specialCharPos + name.length;

	return {
		newCursorPos,
		newValue,
	};
}

export function computeValueWithIds(value: string, replacements: Replacement[]): string | undefined {
	if (!value || !replacements) {
		// Ignore initialization call
		return undefined;
	}
	let valueWithIds = value;
	replacements.forEach(replacement => {
		valueWithIds = valueWithIds.replace(replacement.name, `@${replacement.id}`);
	});
	return valueWithIds;
}

export function computeSuggestQuery(value: string, cursorPos: number) {
	// Find last special character before the cursor position
	const specialCharPos = getSpecialCharPosition(value, cursorPos);
	if (specialCharPos < 0) {
		return '';
	}

	return value.substring(specialCharPos + 1, cursorPos);
}
