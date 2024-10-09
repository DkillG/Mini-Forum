/* eslint-disable @typescript-eslint/no-explicit-any */

import { PostDTO } from '../dtos/postDTO';
2;
import { Post } from '../domain/post/post';
import { PostText } from '../domain/post/postText';
import { PostTitle } from '../domain/post/postTitle';
import { Mapper } from '@/shared/infrastructure/Mapper';
import { PostDetails } from '../domain/post/postDetails';
import { PostSlugId } from '../domain/post/postSlugId';

export class PostDetailsMap implements Mapper<Post> {
	public static toDomain(raw: any): PostDetails {
		const postDetailsOrError = PostDetails.create({
			updatedAt: raw.updatedAt,
			createdAt: raw.createdAt,
			text: PostText.create({ value: raw.text }).getValue,
			title: PostTitle.create({ value: raw.title }).getValue,
			slugId: PostSlugId.create({ value: raw.slugId }).getValue
		});
		postDetailsOrError.isFailure
			? console.log(postDetailsOrError.getErrorValue)
			: '';
		return postDetailsOrError.getValue;
	}

	public static toDTO(postDeatils: PostDetails): PostDTO {
		return {
			text: postDeatils.text.value,
			title: postDeatils.title.value,
			slugId: postDeatils.slugId.value,
			createdAt: postDeatils.createdAt,
			updatedAt: postDeatils.updatedAt
		};
	}
}
