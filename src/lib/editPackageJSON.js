const path = require('path');
const fs = require('fs');
const debug = require('debug')('edit-package-json');

/**
 * Opens the package.json in the root directory
 * and merges the change object onto the package.json.
 * @param rootDir root directory to search for the package.json
 * @param changeObj object to merge onto the package.json
 */
function editPackageJSON(rootDir, changeObj) {
	const packageJSONPath = path.join(rootDir, 'package.json');
	debug('Package JSON path:', packageJSONPath);
	if (!fs.existsSync(packageJSONPath))
		throw new Error(
			`package.json does not exist in the root directory ${rootDir}`
		);

	const packageJSON = JSON.parse(
		fs.readFileSync(packageJSONPath).toString('utf8')
	);
	debug('Read package.json content:', packageJSON);

	const merged = Object.assign({}, packageJSON, changeObj);
	debug('Merged object:', merged);

	fs.writeFileSync(packageJSONPath, JSON.stringify(merged, null, 2), {
		encoding: 'utf8',
	});
	debug('package.json edit finished');
}

module.exports = editPackageJSON;
