import moment from 'moment';
import { BiComment } from 'react-icons/bi';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { PostDTO } from '@/modules/forum/dtos/postDTO';

const PostRow = ({ post }: { post: PostDTO }) => {
	const upvotes = 122;
	const comments = 431;
	const author = 'dkillgames';

	return (
		<div className="flex items-center border border-zinc-700 shadow-black gap-x-4 px-4 py-2 shadow-sm rounded-md">
			<div className="flex flex-col items-center justify-center font-medium text-lg">
				<i className="text-xl transition-all duration-300 ease-in-out hover:text-zinc-500 cursor-pointer">
					<IoIosArrowUp />
				</i>
				<span>{upvotes}</span>
				<i className="text-xl transition-all duration-300 ease-in-out hover:text-zinc-500 cursor-pointer">
					<IoIosArrowDown />
				</i>
			</div>
			<div className="flex flex-col gap-y-2">
				<a
					href={`/post/${post.slugId}`}
					className="whitespace-nowrap tracking-tight text-lg font-medium transition-all duration-300 ease-in-out hover:text-zinc-500 cursor-pointer"
				>
					{post.title}
				</a>
				<div className="flex gap-x-4 text-sm text-zinc-400">
					<span>
						Posted by{' '}
						<strong className="transition-all duration-300 ease-in-out hover:text-zinc-500 cursor-pointer">
							@{author}
						</strong>
					</span>
					<span>{moment(post.createdAt).fromNow()}</span>
					<div className="flex gap-x-1 items-center">
						<BiComment />
						<span>{comments} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostRow;
