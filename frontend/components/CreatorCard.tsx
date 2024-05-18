import React from 'react';
import Image from 'next/image';
import Card from './Card';

interface CreatorCardProps {
	rank: number;
	creatorImage: string;
	username: string;
	email: string;
	productCount: number;
	onClick: () => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
	rank,
	creatorImage,
	username,
	email,
	productCount,
	onClick,
}) => {
	return (
		<Card
			onClick={onClick}
			className="hover:shadow-lg transition-shadow duration-300"
			data-testid="creator-card"
		>
			<h2 className="text-lg font-bold">#{rank}</h2>
			<div className="flex justify-center items-center mt-4">
				<Image
					src={creatorImage}
					alt={`${username}'s profile`}
					width={150}
					height={150}
					className="rounded-full"
				/>
			</div>
			<div className="mt-4 text-center">
				<h3 className="text-lg font-medium">{username}</h3>
				<p className="text-sm text-gray-500">{email}</p>
				<p className="mt-2 text-xs">Product Count: {productCount}</p>
			</div>
		</Card>
	);
};

export default CreatorCard;
