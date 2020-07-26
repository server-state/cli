const path = require('path');
const fs = require('fs');
const debug = require('debug')('delete-dir-recursive');

/**
 * Deletes all files in a directory recursively and finally the directory itself.
 * Many thanks to:
 *   https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
 * @param dirPath path of the directory to delete
 */
function deleteDirRecursive(dirPath) {
	if (fs.existsSync(dirPath)) {
		fs.readdirSync(dirPath).forEach((file) => {
			const currentPath = path.join(dirPath, file);
			if (fs.lstatSync(currentPath).isDirectory()) {
				// recurse
				debug('Delete directory:', currentPath);
				deleteDirRecursive(currentPath);
			} else {
				debug('Delete file:', currentPath);
				fs.unlinkSync(currentPath);
			}
		});
		fs.rmdirSync(dirPath);
	}
}

module.exports = deleteDirRecursive;
