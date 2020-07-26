const path = require('path');
const fs = require('fs');
const debug = require('debug')('move-files-recursive');

/**
 * Moves all files in old directory to new directory recursively.
 * @param oldDir source directory that contains the files to move
 * @param newDir target directory for the files to move
 */
function moveFilesRecursive(oldDir, newDir) {
	if (fs.existsSync(oldDir)) {
		// create target folder
		if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

		fs.readdirSync(oldDir).forEach((file) => {
			const sourceFile = path.join(oldDir, file);
			const targetPath = path.join(newDir, file);

			if (fs.lstatSync(sourceFile).isDirectory()) {
				debug('Move directory:', sourceFile, '->', targetPath);
				moveFilesRecursive(sourceFile, targetPath);
			} else {
				debug('Move file:', sourceFile, '->', targetPath);
				fs.renameSync(sourceFile, targetPath);
			}
		});
		fs.rmdirSync(oldDir);
	}
}

module.exports = moveFilesRecursive;
