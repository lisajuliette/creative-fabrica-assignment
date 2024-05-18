import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import CreatorDetails from './[creatorId]';

jest.mock('axios');
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('CreatorDetails', () => {
	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { creatorId: '1' },
			push: jest.fn(),
		});
		jest.clearAllMocks();
	});

	it('renders loading state initially', async () => {
		render(
			<QueryClientProvider client={getQueryClient()}>
				<CreatorDetails />
			</QueryClientProvider>
		);

		const loaderElement = screen.getByTestId('loader');
		expect(loaderElement).toBeInTheDocument();
	});

	it('renders error state when API call fails', async () => {
		(axios.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

		render(
			<QueryClientProvider client={getQueryClient()}>
				<CreatorDetails />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByTestId('error')).toBeInTheDocument();
		});
	});

	it('renders creator details and products', async () => {
		const creator = {
			creator: {
				id: '1',
				creatorImage: '/images/users/user_1.png',
				username: 'user1',
				email: 'user1@example.com',
				productCount: 10,
			},
			products: [
				{
					id: '1',
					productImage: '/images/products/product_1.png',
					productName: 'product1',
					createTime: new Date().toISOString(),
				},
				{
					id: '2',
					productImage: '/images/products/product_2.png',
					productName: 'product2',
					createTime: new Date().toISOString(),
				},
			],
		};
		(axios.get as jest.Mock).mockResolvedValueOnce({ data: creator });

		render(
			<QueryClientProvider client={getQueryClient()}>
				<CreatorDetails />
			</QueryClientProvider>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText('user1')).toBeInTheDocument();
			expect(screen.getByText('user1@example.com')).toBeInTheDocument();
			expect(screen.getByText('10 Products')).toBeInTheDocument();
			expect(screen.getByText('product1')).toBeInTheDocument();
			expect(screen.getByText('product2')).toBeInTheDocument();
		});
	});
});

const getQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				suspense: false,
			},
		},
	});
