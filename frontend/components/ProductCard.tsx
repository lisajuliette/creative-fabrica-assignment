import Image from 'next/image';
import Card from './Card';

interface ProductCardProps {
	productImage: string;
	productName: string;
	createTime: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
	productImage,
	productName,
	createTime,
}) => {
	return (
		<Card aria-label={`Product card for ${productName}`}>
			<article>
				<figure>
					<Image
						src={productImage}
						alt={productName}
						width={275}
						height={275}
						className="rounded-lg"
					/>
				</figure>
				<header className="mt-2">
					<h3 className="text-lg font-medium">{productName}</h3>
				</header>
				<time className="text-xs text-gray-500" dateTime={createTime}>
					Created At: {new Date(createTime).toLocaleString()}
				</time>
			</article>
		</Card>
	);
};

export default ProductCard;
