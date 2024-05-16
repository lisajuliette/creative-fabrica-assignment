'use client';

import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCreators = async () => {
	const { data } = await axios.get('http://localhost:8080/api/creators');
	return data;
};

const Home = () => {
	const { data, error, isLoading } = useQuery('creators', fetchCreators);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data</div>;

	return (
		<div>
			<h1>Top 3 Active Creators</h1>
			<ul>
				{data.map((creator: any) => (
					<li key={creator.id}>{creator.email}</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
