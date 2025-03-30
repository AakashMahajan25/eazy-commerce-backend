export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
      },
      moduleDirectories: ["node_modules", "src"],
  };
  