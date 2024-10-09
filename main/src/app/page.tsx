import Link from 'next/link';
import PostRow from '@/components/PostRow';
import Layer from '@/components/utils/Layer';
import { LuPlusCircle } from 'react-icons/lu';
import { cn } from '@/shared/utils/ClassName';
import { postService } from '@/modules/forum/services';
import { PostDTO } from '@/modules/forum/dtos/postDTO';
import Button, { styledClassName } from '@/components/ui/Button';

const Home = async () => {
	const posts: PostDTO[] = [];
	const rawPosts = await postService.getRecentPosts();

  if (rawPosts.isRight()) posts.push(...rawPosts.value.getValue);

	return (
		<Layer>
			<div className="flex-grow space-y-4">
				<div className="flex">
					<h1 className="whitespace-nowrap text-2xl font-bold text-gray-100 w-full">
						Mini Forum | Scripts, Cheats & More
					</h1>
					<Link
						href="post/create"
						className={cn(
							styledClassName,
							'bg-white hover:bg-zinc-300 text-black w-44'
						)}
					>
						<LuPlusCircle />
						{'Create Post'}
					</Link>
				</div>
				<div className="flex flex-col gap-y-4">
					{posts.map((post, i) => (
						<PostRow post={post} key={i} />
					))}
				</div>
			</div>
			<div className="w-80 space-y-4">
				<div className="flex flex-col gap-y-8 justify-center border border-zinc-700 p-8 rounded-md">
					<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
						About Community
					</h3>
					<p className=" text-sm">
						A community for web developers to share knowledge, ask questions,
						and discuss the latest trends in web development.
					</p>
					<Button className="bg-white text-black">Join</Button>
				</div>
				<div className="flex flex-col gap-y-8 justify-center border border-zinc-700 p-8 rounded-md">
					<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
						Community Rules
					</h3>
					<ol className="list-decimal list-inside space-y-2 text-sm">
						<li>Be respectful and helpful</li>
						<li>No spam or self-promotion</li>
						<li>Use descriptive titles</li>
						<li>Tag posts appropriately</li>
						<li>Follow Mini Forum content policy</li>
					</ol>
				</div>
			</div>
		</Layer>
	);
};

export default Home;
