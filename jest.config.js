require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+.(svg)$': 'jest-transform-stub',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@images(.*)$': '<rootDir>/src/assets/images$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@const(.*)$': '<rootDir>/src/utils/const$1',
    '^@helpers(.*)$': '<rootDir>/src/utils/helpers$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@hooks(.*)$': '<rootDir>/src/utils/hooks$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hoc(.*)$': '<rootDir>/src/components/hoc$1',
    '^@layout(.*)$': '<rootDir>/src/components/shared/layout$1',
  },
  collectCoverageFrom: ['<rootDir>/**/*.(ts|tsx)'],
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: [
    // 'node_modules',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { useESM: true }],
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js'
  },
}
