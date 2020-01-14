module.exports = function () {
    return ({
        // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/utils/createJestConfig.js
        transform: {'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'}
    });
};
