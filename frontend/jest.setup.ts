import '@testing-library/jest-dom';
import { useRouter as useRouterMock } from 'next/router';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

(useRouterMock as jest.Mock).mockImplementation(() => ({
	route: '/',
	pathname: '',
	query: '',
	asPath: '',
	push: jest.fn(),
	replace: jest.fn(),
	reload: jest.fn(),
	back: jest.fn(),
	prefetch: jest.fn().mockResolvedValue(undefined),
	beforePopState: jest.fn(),
	events: {
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
	},
	isFallback: false,
}));
