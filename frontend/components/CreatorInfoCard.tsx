import Image from 'next/image';

interface CreatorInfoCardProps {
	creatorImage: string;
	username: string;
	email: string;
}

const CreatorInfoCard: React.FC<CreatorInfoCardProps> = ({
	creatorImage,
	username,
	email,
}) => {
	return (
		<div className="flex gap-2 items-center p-4 bg-white rounded-lg shadow-md">
			<Image
				src={creatorImage}
				alt={`${username}'s profile`}
				width={75}
				height={75}
				className="rounded-full"
			/>
			<div className="text-left">
				<div className="text-lg font-medium">{username}</div>
				<div className="text-sm text-gray-500">{email}</div>
			</div>
		</div>
	);
};

export default CreatorInfoCard;
