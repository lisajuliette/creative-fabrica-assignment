'use client';

import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import CreatorCard from '../components/CreatorCard';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Collapsible from '../components/Collapsible';
import '../app/styles/globals.css';

const fetchCreators = async () => {
	const { data } = await axios.get('http://localhost:8080/api/creators');
	return data;
};

const Home = () => {
	const router = useRouter();
	const [showAll, setShowAll] = useState(false);

	const { data, error, isLoading } = useQuery('creators', fetchCreators);

	if (isLoading) return <Loader />;
	if (error) return <div data-testid="error">Error loading data</div>;

	const handleCreatorClick = (id: string) => {
		router.push(`/creators/${id}`);
	};

	const handleShowMore = () => {
		setShowAll(true);
	};

	const handleShowLess = () => {
		setShowAll(false);
	};

	const topCreators = data.slice(0, 3);
	const remainingCreators = data.slice(3);

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<h1 className="text-center text-2xl font-bold mb-4">
				Top Active Creators
			</h1>
			<p className="text-center text-gray-500 mb-12 text-base max-w-prose m-auto">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
				elementum sem. Proin lacus ante, condimentum eu efficitur non, fermentum
				quis purus. Aliquam pellentesque sapien quis arcu vestibulum
				sollicitudin. Ut maximus vestibulum nibh a gravida. Quisque et
				scelerisque mi.
			</p>
			<ul
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto"
				data-testid="top-creators"
			>
				{topCreators.map((creator: any) => (
					<li key={creator.id} className="cursor-pointer">
						<CreatorCard
							rank={creator.rank}
							creatorImage={creator.creatorImage}
							username={creator.username}
							email={creator.email}
							productCount={creator.productCount}
							onClick={() => handleCreatorClick(creator.id)}
						/>
					</li>
				))}
			</ul>
			<Collapsible isOpen={showAll} data-testid="collapsible">
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 container mx-auto">
					{remainingCreators.map((creator: any) => (
						<li key={creator.id} className="cursor-pointer">
							<CreatorCard
								rank={creator.rank}
								creatorImage={creator.creatorImage}
								username={creator.username}
								email={creator.email}
								productCount={creator.productCount}
								onClick={() => handleCreatorClick(creator.id)}
							/>
						</li>
					))}
				</ul>
			</Collapsible>
			<div className="mt-4 text-center">
				{showAll ? (
					<Button onClick={handleShowLess} data-testid="show-less-button">
						Show Less
					</Button>
				) : (
					<Button onClick={handleShowMore} data-testid="show-more-button">
						Show More
					</Button>
				)}
			</div>
		</div>
	);
};

export default Home;
