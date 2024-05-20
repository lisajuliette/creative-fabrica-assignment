import React from 'react';

export interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	'data-testid'?: string;
	'aria-label'?: string;
}

const Card: React.FC<CardProps> = ({
	children,
	className,
	onClick,
	'data-testid': testId,
	'aria-label': ariaLabel,
}) => {
	return (
		<section
			className={`p-4 bg-white rounded-lg shadow-md ${className} ${
				onClick ? 'cursor-pointer' : ''
			}`}
			onClick={onClick}
			data-testid={testId}
			aria-label={ariaLabel}
		>
			{children}
		</section>
	);
};

export default Card;
