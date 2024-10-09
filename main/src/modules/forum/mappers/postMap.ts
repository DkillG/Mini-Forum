/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../domain/post/post';
import { Mapper } from '@/shared/infrastructure/Mapper';
import { PostTitle } from '../domain/post/postTitle';
import { PostText } from '../domain/post/postText';
import { PostDTO } from '../dtos/postDTO';
import { PostSlugId } from '../domain/post/postSlugId';
import { PostId } from '../domain/post/postId';

export class PostMap implements Mapper<Post> {
	public static toDomain(raw: any) {
		const postOrError = Post.create(
			{
				updatedAt: raw.updatedAt,
				createdAt: raw.createdAt,
				id: PostId.create({ value: raw.id }).getValue,
				text: PostText.create({ value: raw.text }).getValue,
				title: PostTitle.create({ value: raw.title }).getValue,
				slugId: PostSlugId.create({ value: raw.slugId }).getValue
			},
			raw.post_id
		);

		postOrError.isFailure ? console.log(postOrError.getValue) : '';
		return postOrError.getValue;
	}

	public static toPersistence(post: Post) {
		return {
			text: post.text.value,
			title: post.title.value,
            slugId: post.slugId.value,
		};
	}

	public static toDTO(post: Post): PostDTO {

		return {
			text: post.text.value,
			title: post.title.value,
			updatedAt: post.updatedAt,
			createdAt: post.createdAt,
			slugId: post.slugId.value,
		};
	}
}
