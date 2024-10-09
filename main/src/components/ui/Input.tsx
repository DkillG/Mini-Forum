import { cn } from '@/shared/utils/ClassName';
type ElementProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: ElementProps) => {
	return (
		<input
			className={cn(
				'px-4 py-2 text-black text-sm placeholder:text-zinc-500 border border-zinc-400 outline-none rounded-md ring-0 ring-offset-0',
				className
			)}
			{...props}
		/>
	);
};

export default Input;
