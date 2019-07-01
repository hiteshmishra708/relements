// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__jest__/styleMock.js',
    '\\.(mdx|md)$': '<rootDir>/__jest__/docsMock.js',
    '\\.(svg)$': '<rootDir>/__jest__/svgMock.js',
  },
  setupFilesAfterEnv: ["<rootDir>/__jest__/setup.js"],
};
