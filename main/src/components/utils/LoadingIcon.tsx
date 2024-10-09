import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingIcon = () => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<i className="text-bold text-4xl animate-spin">
				<AiOutlineLoading3Quarters />
			</i>
		</div>
	);
};

export default LoadingIcon;
