'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../pages/index';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);
};

export default App;
