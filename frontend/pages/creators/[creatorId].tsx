import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import CreatorInfoCard from '../../components/CreatorInfoCard';
import Link from '../../components/Link';
import Loader from '../../components/Loader';

const fetchCreatorDetails = async (id: string) => {
	const { data } = await axios.get(`http://localhost:8080/api/creators/${id}`);
	return data;
};

const CreatorDetails = () => {
	const router = useRouter();
	const { creatorId } = router.query;

	const { data, error, isLoading } = useQuery(
		['creatorDetails', creatorId],
		() => fetchCreatorDetails(creatorId as string),
		{
			enabled: !!creatorId,
		}
	);

	if (isLoading) return <Loader />;
	if (error) return <div data-testid="error">Error loading data</div>;

	if (!data || !data.creator) {
		return <div>No data available</div>;
	}

	const { creator, products } = data;

	return (
		<div className="container mx-auto p-4">
			<Link href="/" className="mb-4 block">
				&larr; Back to Home
			</Link>
			<CreatorInfoCard
				creatorImage={creator.creatorImage}
				username={creator.username}
				email={creator.email}
			/>
			<h2 className="mt-8 text-xl font-bold" data-testid="products-header">
				{creator.productCount} Products
			</h2>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
				data-testid="products"
			>
				{products.map((product: any) => (
					<div
						key={product.id}
						className="p-4 bg-white rounded-lg shadow-md"
						data-testid={`product-${product.id}`}
					>
						<Image
							src={product.productImage}
							alt={product.productName}
							width={275}
							height={275}
							className="rounded-lg"
						/>
						<div className="mt-2">
							<div className="text-lg font-medium">{product.productName}</div>
							<div className="text-xs text-gray-500">
								Created At: {new Date(product.createTime).toLocaleString()}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CreatorDetails;
