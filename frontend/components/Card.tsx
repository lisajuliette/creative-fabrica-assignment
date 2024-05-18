import React from 'react';

export interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	'data-testid'?: string;
}

const Card: React.FC<CardProps> = ({
	children,
	className,
	onClick,
	'data-testid': testId,
}) => {
	return (
		<div
			className={`p-4 bg-white rounded-lg shadow-md ${className} ${
				onClick ? 'cursor-pointer' : ''
			}`}
			onClick={onClick}
			data-testid={testId}
		>
			{children}
		</div>
	);
};

export default Card;
