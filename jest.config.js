require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  // extensionsToTreatAsEsm: ['.cjs'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
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
  collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
  // moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js'
  },
}
