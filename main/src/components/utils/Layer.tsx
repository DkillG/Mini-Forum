import { ReactNode } from 'react';

const Layer = ({ children }: { children: ReactNode }) => {
	return (
		<main className="flex items-center justify-center pt-32">
			<div className="flex justify-center gap-8 max-w-[1440px] w-full">
				{children}
			</div>
		</main>
	);
};

export default Layer;
