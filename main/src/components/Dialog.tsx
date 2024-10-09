'use client';

import Button from '@/components/ui/Button';
import { useState, ReactNode } from 'react';

const Dialog = ({
	content,
	tigger
}: {
	content: ReactNode;
	tigger: ReactNode;
}) => {
	const [modal, setModal] = useState(false);
	return (
		<>
			{modal && (
				<div className="fixed flex items-center justify-center left-0 top-0 w-screen h-screen">
					<div
						onClick={() => setModal(!modal)}
						className="absolute left-0 top-0 w-full h-full bg-[#0008]"
					></div>
					<div className="flex relative bg-zinc-900 p-8 rounded-md w-96">
						{content}
					</div>
				</div>
			)}
			<Button
				onClick={() => setModal(!modal)}
				className="bg-white text-black w-52"
			>
				{tigger}
			</Button>
		</>
	);
};

export default Dialog;
