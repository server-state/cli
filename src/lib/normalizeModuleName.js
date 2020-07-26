/**
 * Replaces whitespaces with minus and lowercase every character.
 * @param name string to normalize
 * @returns {string} normalized string
 */
function normalizeModuleName(name) {
	return name.split(' ').map(part => part.toLowerCase()).join('-');
}

module.exports = normalizeModuleName;
