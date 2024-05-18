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
		<Card>
			<Image
				src={productImage}
				alt={productName}
				width={275}
				height={275}
				className="rounded-lg"
			/>
			<div className="mt-2">
				<div className="text-lg font-medium">{productName}</div>
				<div className="text-xs text-gray-500">
					Created At: {new Date(createTime).toLocaleString()}
				</div>
			</div>
		</Card>
	);
};

export default ProductCard;
