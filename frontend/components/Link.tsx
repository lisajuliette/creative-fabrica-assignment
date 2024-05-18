import { useRouter } from 'next/router';

interface LinkProps {
	children: React.ReactNode;
	href: string;
	className?: string;
}

const Link: React.FC<LinkProps> = ({ children, href, className }) => {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		router.push(href);
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={`text-indigo-500 hover:underline ${className}`}
		>
			{children}
		</a>
	);
};

export default Link;
