'use client';

import { useState, useRef, useEffect } from 'react';

interface CollapsibleProps {
	children: React.ReactNode;
	isOpen: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ children, isOpen }) => {
	const [maxHeight, setMaxHeight] = useState('0px');
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			if (isOpen) {
				setMaxHeight(`${contentRef.current.scrollHeight}px`);
			} else {
				setMaxHeight('0px');
			}
		}
	}, [isOpen]);

	return (
		<div
			ref={contentRef}
			style={{
				maxHeight,
				transition: 'max-height 0.5s ease, opacity 0.5s ease',
				opacity: isOpen ? 1 : 0,
			}}
			className="overflow-hidden"
			aria-expanded={isOpen}
		>
			{children}
		</div>
	);
};

export default Collapsible;
