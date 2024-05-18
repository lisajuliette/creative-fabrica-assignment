interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
	'data-testid'?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	'data-testid': testId,
}) => {
	return (
		<button
			onClick={onClick}
			className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${className}`}
			data-testid={testId}
		>
			{children}
		</button>
	);
};

export default Button;
