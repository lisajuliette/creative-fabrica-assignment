import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatorCard from './CreatorCard';

describe('CreatorCard', () => {
	const props = {
		rank: 1,
		creatorImage: '/images/users/user_1.png',
		username: 'test_user',
		email: 'test@example.com',
		productCount: 5,
		onClick: jest.fn(),
	};

	it('renders correctly', () => {
		render(<CreatorCard {...props} />);

		expect(screen.getByText('#1')).toBeInTheDocument();
		expect(screen.getByAltText(`test_user's profile`)).toBeInTheDocument();
		expect(screen.getByText('test_user')).toBeInTheDocument();
		expect(screen.getByText('test@example.com')).toBeInTheDocument();
		expect(screen.getByText('Product Count: 5')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		render(<CreatorCard {...props} />);

		const cardElement = screen.getByTestId('creator-card');
		fireEvent.click(cardElement);

		expect(props.onClick).toHaveBeenCalledTimes(1);
	});
});
