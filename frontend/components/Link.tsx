import { useRouter } from 'next/router';

interface LinkProps {
	children: React.ReactNode;
	href: string;
	className?: string;
	'aria-label'?: string;
}

const Link: React.FC<LinkProps> = ({
	children,
	href,
	className,
	'aria-label': ariaLabel,
}) => {
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
			aria-label={ariaLabel}
			role="link"
			tabIndex={0}
		>
			{children}
		</a>
	);
};

export default Link;
