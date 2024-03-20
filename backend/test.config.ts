module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Specify where to find test files
    testMatch: [
      "**/tests/**/*.+(ts|tsx)",
      "**/?(*.)+(spec|test).+(ts|tsx)"
    ],
  };
  