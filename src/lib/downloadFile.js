const fs = require('fs');
const http = require('http');
const https = require('https');
const debug = require('debug')('download-file');

/**
 * Downloads and saves a file via a http/s GET request to a file descriptor.
 * @param url the given url to the file
 * @param fd the file descriptor to save the file
 * @returns {Promise<undefined>} a Promise that
 * resolves if the file is successfully downloaded and saved or
 * rejects with an error if something gone wrong
 */
function downloadFile(url, fd) {
	if (typeof url === 'string') url = new URL(url);
	debug('Downloadable resource:', url);
	debug('File descriptor:', fd);
	debug('Creating promise');
	return new Promise((resolve, reject) => {
		const writeStream = fs.createWriteStream('', { fd });
		let error;

		const callback = (res) => {
			debug('Status Code', res.statusCode);
			debug('Headers', res.headers);

			if (res.statusCode !== 200) {
				error = new Error('No content to download found');
				writeStream.end();
			}

			res.on('data', (chunk) => {
				writeStream.write(chunk);
			});

			res.on('close', () => {
				debug('Last chunk received. End write stream');
				writeStream.end();
			});

			res.on('error', (err) => {
				debug('Get error happened. End write stream');
				error = err;
				writeStream.end();
			});
		};

		// immediately begin to write chunks to stream
		// because file is already opened via file descriptor
		switch (url.protocol) {
			case 'http:':
				http.get(url, callback);
				break;
			case 'https:':
				https.get(url, callback);
				break;
			default:
				reject(new Error(`Unsupported protocol ${url.protocol}`));
		}

		writeStream.on('finish', () => {
			debug('All data has been flushed');
			if (error) {
				debug('Errors detected. Reject');
				reject(error);
			} else {
				debug('No errors detected. Resolve');
				resolve();
			}
		});

		writeStream.on('error', (err) => {
			debug('Error in write stream. Reject');
			reject(err);
		});
	});
}

module.exports = downloadFile;
