'use client';

import Link from 'next/link';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Layer from '@/components/utils/Layer';
import TextArea from '@/components/ui/TextArea';
import { postService } from '@/modules/forum/services';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { useToast } from '@/components/utils/toasts/use-toast';

const Create = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [post, setPost] = useState({
		title: "",
		content: "",
		loading: false
	});

	const isFormValid = () => {
		if (typeof post.title !== 'string' || typeof post.content !== 'string') {
			toast({
				title: 'Error',
				description: 'Please only strings',
				variant: 'warning'
			});
			return false;
		}
		if (!post.title) {
			toast({
				title: 'Error',
				description: 'Please enter a post title',
				variant: 'warning'
			});
			return false;
		}
		if (post.title.length > 256) {
			toast({
				title: 'Error',
				description: 'The maximum title size is 256 characters',
				variant: 'destructive'
			});
			return false;
		}

		if (!post.content) {
			toast({
				title: 'Error',
				description: 'Please enter a content',
				variant: 'destructive'
			});
			return false;
		}

		return true;
	};

	const changePost = (prop: Partial<typeof post>) =>
		setPost(prev => ({ ...prev, ...prop }));

	const createPost = () => {
		if (!isFormValid()) return;
		changePost({ loading: true });

		postService
			.createPost(post.title, post.content)
			.then(() => {
				setTimeout(() => router.push('/'), 2000);
				toast({
					title: 'Post created',
					description: 'Your post was created successfully!',
					variant: 'success'
				});
			})
			.catch(() =>
				toast({
					title: 'Error',
					description: "Unfortunately post wasn't created",
					variant: 'destructive'
				})
			)
			.finally(() => changePost({ loading: false }));
	};

	return (
		<Layer>
			<div className="flex flex-col gap-y-8 border border-zinc-400 p-6 w-1/2 rounded-md">
				<Link href={'/'} className="underline underline-offset-2">
					Back to posts
				</Link>
				<div className="flex flex-col gap-y-1">
					<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
						Create a New Post
					</h3>
					<p className="text-sm text-muted-foreground text-zinc-400">
						Share your thoughts with the world
					</p>
				</div>
				<div className="flex flex-col gap-y-6">
					<div className="space-y-2">
						<label className="text-sm font-medium">Title</label>
						<Input
							value={post.title}
							onChange={e => changePost({ title: e.target.value })}
							className="w-full"
							placeholder="Enter your post title"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Content</label>
						<TextArea
							value={post.content}
							onChange={e => changePost({ content: e.target.value })}
							className="w-full max-h-[330px]"
							placeholder="Write your post content here"
						/>
					</div>
				</div>
				{post.loading ? (
					<LoadingIcon />
				) : (
					<Button
						onClick={createPost}
						className="bg-white text-black hover:bg-zinc-300"
					>
						Create Post
					</Button>
				)}
			</div>
		</Layer>
	);
};

export default Create;
