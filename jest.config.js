// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   roots: ['<rootDir>/src'],
//   jest: {
//     moduleFileExtensions: ['ts', 'tsx'],
//     moduleDirectories: ['src'],
//     moduleNamMapper: {
//       '^@/(.*)$': '<rootDir>/src/$1',
//       '^@src/(.*)$': '<rootDir>/src/$1',
//       '^@assets/(.*)$': '<rootDir>/src/assets/$1',
//       '^@images/(.*)$': '<rootDir>/src/assets/images/$1',
//       '^@routes/(.*)$': '<rootDir>/src/routes/$1',
//       '^@pages/(.*)$': '<rootDir>/src/pages/$1',
//       '^@utils/(.*)$': '<rootDir>/src/utils/$1',
//       '^@const/(.*)$': '<rootDir>/src/utils/const/$1',
//       '^@helpers/(.*)$': '<rootDir>/src/utils/helpers/$1',
//       '^@services/(.*)$': '<rootDir>/src/services/$1',
//       '^@hooks/(.*)$': '<rootDir>/src/utils/hooks/$1',
//       '^@components/(.*)$': '<rootDir>/src/components/$1',
//       '^@hoc/(.*)$': '<rootDir>/src/components/hoc/$1',
//       '^@layout/(.*)$': '<rootDir>/src/components/shared/layout/$1',
//     }
//   }
// }

module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
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
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>'],
  // testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  // testRegex: '',
  testMatch: ['**/tests/**/*.test.ts(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
