const Loader = () => {
	return (
		<div className="flex items-center justify-center h-full p-8">
			<div className="loader" data-testid="loader">
				<div className="dot bg-indigo-500"></div>
				<div className="dot bg-indigo-600"></div>
				<div className="dot bg-indigo-500"></div>
			</div>
		</div>
	);
};

export default Loader;
