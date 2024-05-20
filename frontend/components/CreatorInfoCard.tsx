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
		<article
			className="flex gap-2 items-center p-4 bg-white rounded-lg shadow-md"
			aria-label="Creator Information"
		>
			<Image
				src={creatorImage}
				alt={`${username}'s profile`}
				width={75}
				height={75}
				className="rounded-full"
			/>
			<div className="text-left">
				<h2 className="text-lg font-medium">{username}</h2>
				<p className="text-sm text-gray-500">{email}</p>
			</div>
		</article>
	);
};

export default CreatorInfoCard;
