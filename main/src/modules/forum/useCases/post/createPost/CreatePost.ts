/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from '@/shared/core/Result';
import { UseCase } from '@/shared/core/UseCase';
import { CreatePostDTO } from './CreatePostDTO';
import { ExamplePostError } from './CreatePostError';
import { Post } from '@/modules/forum/domain/post/post';
import { UnexpectedError } from '@/shared/core/AppError';
import { Either, left, right } from '@/shared/core/Either';
import { IPostRepo } from '@/modules/forum/repos/postRepo';
import { PostText } from '@/modules/forum/domain/post/postText';
import { PostTitle } from '@/modules/forum/domain/post/postTitle';

type Response = Either<
	ExamplePostError | UnexpectedError | Result<any>,
	Result<void>
>;

export class CreatePost implements UseCase<CreatePostDTO, Promise<Response>> {
	private postRepo: IPostRepo;

	constructor(postRepo: IPostRepo) {
		this.postRepo = postRepo;
	}

	public async execute(request: CreatePostDTO): Promise<Response> {
		try {
			const textOrError = PostText.create({ value: request.text });
			if (textOrError.isFailure) {
				return left(textOrError);
			}

			const titleOrError = PostTitle.create({ value: request.title });
			if (titleOrError.isFailure) {
				return left(titleOrError);
			}

			const postProps = {
				id: '',
				slugId: '',
				text: textOrError.getValue,
				title: titleOrError.getValue
			};

			const postOrError = Post.create(postProps);
			if (postOrError.isFailure) {
				return left(postOrError);
			}

			await this.postRepo.save(postOrError.getValue);
			return right(Result.ok<void>());
		} catch (error) {
			return left(new UnexpectedError(error));
		}
	}
}
