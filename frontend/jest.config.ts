const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/pages/(.*)$': '<rootDir>/pages/$1',
		'^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
