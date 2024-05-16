'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html>
			<head></head>
			<body>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</body>
		</html>
	);
}
