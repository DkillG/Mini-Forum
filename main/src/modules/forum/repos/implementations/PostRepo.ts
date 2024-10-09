/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPostRepo } from '../postRepo';
import { Post } from '../../domain/post/post';
import { PostMap } from '../../mappers/postMap';
import { PostId } from '../../domain/post/postId';
import Prisma from '@/shared/infrastructure/database';
import { PostSlugId } from '../../domain/post/postSlugId';
import { PostDetails } from '../../domain/post/postDetails';

export class PostRepo implements IPostRepo {
	private PostModel: typeof Prisma.getInstance.post;

	constructor() {
		this.PostModel = Prisma.getInstance.post;
	}

	public async getPostByPostId(postId: PostId | string): Promise<Post> {
		postId =
			postId instanceof PostId ? (<PostId>postId).value : postId;

		const post = await this.PostModel.findUnique({ where: { id: postId } });

		if (!post) throw new Error('Post not found');
		return PostMap.toDomain(post);
	}
	public async getPostByPostSlugId(slugId: PostSlugId | string): Promise<Post> {
		slugId =
		slugId instanceof PostSlugId ? (<PostSlugId>slugId).value : slugId;

		const post = await this.PostModel.findUnique({ where: { slugId: slugId } });

		if (!post) throw new Error('Post not found');
		return PostMap.toDomain(post);
	}

	public async getRecentPosts(slugId?: string, offset?: number): Promise<PostDetails[]> {

		if(slugId) {
			const posts = await this.PostModel.findMany({
				where: { slugId: slugId },
				take: 1
			});
			
			return posts.map(p => PostMap.toDomain(p));
		}
		else {
			const posts = await this.PostModel.findMany({
				orderBy: {
					createdAt: 'desc'
				},
				take: 10,
				skip: offset ? offset : 0
			});
			return posts.map(p => PostMap.toDomain(p));
		}
	}

	public async exists(slugId: PostSlugId): Promise<boolean> {
		const post = this.PostModel.findUnique({
			where: { id: slugId.value }
		});
		return !!post;
	}

	public async delete(slugId: PostSlugId): Promise<void> {
		this.PostModel.delete({ where: { id: slugId.value } });
	}

	public async save(post: Post): Promise<void> {
		const exists = post.slugId ? await this.exists(post.slugId) : false;

		const rawPost = PostMap.toPersistence(post);

		if (exists) {
			await this.PostModel.update({
				where: { slugId: rawPost.slugId },
				data: rawPost
			});
		} else {
			try {
				await this.PostModel.create({
					data: {
						text: rawPost.text,
						title: rawPost.title
					}
				});
			} catch (error: any) {
				await this.delete(post.slugId);
				throw new Error(error.toString());
			}
		}
	}
}
