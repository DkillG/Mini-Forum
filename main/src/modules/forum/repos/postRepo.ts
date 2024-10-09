import { Post } from '../domain/post/post';
import { PostId } from '../domain/post/postId';
import { PostSlugId } from '../domain/post/postSlugId';
import { PostDetails } from '../domain/post/postDetails';

export interface IPostRepo {
	save: (post: Post) => Promise<void>;
	delete: (slugId: PostSlugId) => Promise<void>;
	exists: (slugId: PostSlugId) => Promise<boolean>;
	getPostByPostId(postId: PostId | string): Promise<Post>;
	getPostByPostSlugId(slugId: PostSlugId | string): Promise<Post>;
	getRecentPosts: (slugId?: string, offset?: number) => Promise<PostDetails[]>;
}
