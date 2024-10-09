import { ReactNode } from 'react';
import { cn } from '@/shared/utils/ClassName';

type ElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
};

export const styledClassName =
	'flex items-center justify-center w-full whitespace-nowrap gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out';

const Button = ({ children, className, ...props }: ElementProps) => {
	return (
		<button className={cn(styledClassName, className)} {...props}>
			{children}
		</button>
	);
};

export default Button;
