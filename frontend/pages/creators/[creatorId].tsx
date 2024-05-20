import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import CreatorInfoCard from '../../components/CreatorInfoCard';
import Link from '../../components/Link';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';

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

	if (isLoading) return <Loader data-testid="loader" />;
	if (error) return <div data-testid="error">Error loading data</div>;

	if (!data || !data.creator) {
		return <div>No data available</div>;
	}

	const { creator, products } = data;

	return (
		<div className="container mx-auto p-4">
			<Link
				href="/"
				className="mb-4 block"
				aria-label="Navigate to the home page"
			>
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
					<ProductCard
						key={product.id}
						productImage={product.productImage}
						productName={product.productName}
						createTime={product.createTime}
					/>
				))}
			</div>
		</div>
	);
};

export default CreatorDetails;
