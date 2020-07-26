const path = require('path');
const fs = require('fs');
const extract = require('extract-zip');
const debug = require('debug')('extract-into-dir');

const moveFilesRecursive = require('./moveFilesRecursive');
const deleteDirRecursive = require('./deleteDirRecursive');

/**
 * Extracts the zip file into the target directory.
 * Then it searches for a package.json first in the target directory
 * and after that in every directory in the target directory.
 * If it finds one, it deletes the other files in the target directory
 * and moves the content of the directory with the package.json
 * in the target directory.
 * @param zipFile path to the zip file to extract into target directory
 * @param targetDir path to the target directory
 * @param keepDir keeps the directory if something went wrong
 * @returns {Promise<void>} resolves if successfully found
 * and extracted the zip file into the directory
 * and rejects in something went wrong
 */
async function extractIntoDir(zipFile, targetDir, keepDir) {
	debug('Zip file path:', zipFile);
	debug('Target directory:', targetDir);
	debug('Keep target on error:', keepDir);

	debug('Extract files from zip archive into target directory');
	await extract(zipFile, { dir: targetDir });

	if (!fs.existsSync(path.join(targetDir, 'package.json'))) {
		debug('Search for valid template directories');
		const rootEntries = fs.readdirSync(targetDir);
		debug('Root dirs:', rootEntries);
		const moduleRoot = rootEntries.find((rootDir) =>
			fs.existsSync(path.join(targetDir, rootDir, 'package.json'))
		);
		if (!moduleRoot) throw new Error('No valid module in zip file found');

		debug('Remove all other root entries in target directory');
		rootEntries
			.filter((entry) => entry !== moduleRoot)
			.forEach((entry) => {
				const entryPath = path.join(targetDir, entry);
				if (fs.lstatSync(entryPath).isDirectory()) {
					deleteDirRecursive(entryPath);
				} else {
					fs.unlinkSync(entryPath);
				}
			});

		debug('Move all entries out of module root');
		const moduleRootPath = path.join(targetDir, moduleRoot);
		debug('Module root path:', moduleRootPath);
		moveFilesRecursive(moduleRootPath, targetDir);
	} else {
		debug('package.json in target directory. No further actions required');
	}

	debug('Extracted module');
}

module.exports = extractIntoDir;
