import { Result } from '@/shared/core/Result';
import { UseCase } from '@/shared/core/UseCase';
import { UnexpectedError } from '@/shared/core/AppError';
import { Either, left, right } from '@/shared/core/Either';
import { IPostRepo } from '@/modules/forum/repos/postRepo';
import { GetRecentPostsRequestDTO } from './GetRecentPostsRquestDTO';
import { PostDetails } from '@/modules/forum/domain/post/postDetails';

type Response = Either<UnexpectedError, Result<PostDetails[]>>;

export class GetRecentPosts
	implements UseCase<GetRecentPostsRequestDTO, Promise<Response>>
{
	private postRepo: IPostRepo;

	constructor(postRepo: IPostRepo) {
		this.postRepo = postRepo;
	}

	public async execute(
		request?: GetRecentPostsRequestDTO | undefined
	): Promise<Response> {
		try {
			const posts = await this.postRepo.getRecentPosts(request?.slugId, request?.offset);
			return right(Result.ok<PostDetails[]>(posts));
		} catch (error) {
			return left(new UnexpectedError(error));
		}
	}
}
