import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './index';
import axios from 'axios';
import { useRouter } from 'next/router';

jest.mock('axios');
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('Home', () => {
	let mockPush: jest.Mock;

	beforeEach(() => {
		mockPush = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
		});
		jest.clearAllMocks();
	});

	it('renders loading state initially', async () => {
		render(
			<QueryClientProvider client={getQueryClient()}>
				<Home />
			</QueryClientProvider>
		);

		const loaderElement = screen.getByTestId('loader');
		expect(loaderElement).toBeInTheDocument();
	});

	it('renders error state when API call fails', async () => {
		(axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

		render(
			<QueryClientProvider client={getQueryClient()}>
				<Home />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByTestId('error')).toBeInTheDocument();
		});
	});

	it('renders top creators and handles show more/less functionality', async () => {
		const creators = [
			{
				id: 1,
				rank: 1,
				creatorImage: '/image1.png',
				username: 'user1',
				email: 'user1@example.com',
				productCount: 10,
			},
			{
				id: 2,
				rank: 2,
				creatorImage: '/image2.png',
				username: 'user2',
				email: 'user2@example.com',
				productCount: 20,
			},
			{
				id: 3,
				rank: 3,
				creatorImage: '/image3.png',
				username: 'user3',
				email: 'user3@example.com',
				productCount: 30,
			},
			{
				id: 4,
				rank: 4,
				creatorImage: '/image4.png',
				username: 'user4',
				email: 'user4@example.com',
				productCount: 40,
			},
		];

		(axios.get as jest.Mock).mockResolvedValueOnce({ data: creators });

		render(
			<QueryClientProvider client={getQueryClient()}>
				<Home />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByTestId('top-creators')).toBeInTheDocument();
		});

		expect(screen.getByText('user1')).toBeInTheDocument();
		expect(screen.getByText('user1@example.com')).toBeInTheDocument();
		expect(screen.getByText('user2')).toBeInTheDocument();
		expect(screen.getByText('user2@example.com')).toBeInTheDocument();
		expect(screen.getByText('user3')).toBeInTheDocument();
		expect(screen.getByText('user3@example.com')).toBeInTheDocument();
		expect(screen.getByText('user4')).not.toBeVisible();
		expect(screen.getByText('user4@example.com')).not.toBeVisible();

		const showMoreButton = screen.getByTestId('show-more-button');
		fireEvent.click(showMoreButton);

		await waitFor(() => {
			expect(screen.getByText('user4')).toBeVisible();
			expect(screen.getByText('user4@example.com')).toBeVisible();
		});

		const showLessButton = screen.getByTestId('show-less-button');
		fireEvent.click(showLessButton);

		await waitFor(() => {
			expect(screen.getByText('user4')).not.toBeVisible();
		});
	});

	it('calls handleCreatorClick when a creator card is clicked', async () => {
		const creators = [
			{
				id: 1,
				rank: 1,
				creatorImage: '/image1.png',
				username: 'user1',
				email: 'user1@example.com',
				productCount: 10,
			},
			{
				id: 2,
				rank: 2,
				creatorImage: '/image2.png',
				username: 'user2',
				email: 'user2@example.com',
				productCount: 20,
			},
		];

		(axios.get as jest.Mock).mockResolvedValueOnce({ data: creators });

		render(
			<QueryClientProvider client={getQueryClient()}>
				<Home />
			</QueryClientProvider>
		);

		await waitFor(() => {
			expect(screen.getByTestId('top-creators')).toBeInTheDocument();
		});

		const creatorCard = screen.getByText('user1');
		fireEvent.click(creatorCard);

		expect(mockPush).toHaveBeenCalledWith('/creators/1');
	});
});

const getQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
