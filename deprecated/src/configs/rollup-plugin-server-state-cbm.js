module.exports = function(cbmInfos) {
    // noinspection JSUnusedGlobalSymbols
    return {
        name: 'server-state-cbm',
        generateBundle(_, bundle) {
            let chunk = Object.values(bundle).find(chunk => chunk.isEntry);

            if (chunk) {
                // check if all required information is given
                if (typeof cbmInfos.id !== 'string')
                    this.error('\'id\' is not specified or not of type \'string\' in package.json.');
                if (typeof cbmInfos.name !== 'string')
                    this.error('\'name\' is not specified or not of type \'string\' in package.json.');
                if (typeof cbmInfos.version !== 'string')
                    this.error('\'version\' is not specified or not of type \'string\' in package.json.');
                if (typeof cbmInfos.support_url !== 'string')
                    this.error('\'support_url\' or \'bugs\' are not specified ' +
                        'or not of type \'string\' in package.json.');
                if (typeof cbmInfos.description !== 'string')
                    this.warn('\'description\' is not specified or not of type \'string\' in package.json.');

                // put compiled code in current object
                cbmInfos['code'] = chunk.code;

                // JSON stringify output in shortest possible solution
                // and put it back in the chunk code
                chunk.code = JSON.stringify(cbmInfos);
            } else {
                this.error('No entry chunk is given.');
            }
        }
    };
};
