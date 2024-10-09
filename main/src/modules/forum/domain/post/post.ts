import { PostId } from './postId';
import { PostText } from './postText';
import { PostTitle } from './postTitle';
import { PostSlugId } from './postSlugId';
import { Result } from '@/shared/core/Result';
import { PostDetailsProps } from './postDetails';
import { PostCreated } from '../events/postCreated';
import { UniqueEntityID } from '@/shared/domain/Identifier';
import { Guard, IGuardArgument } from '@/shared/core/Guard';
import { AggregateRoot } from '@/shared/domain/AggregateRoot';

export interface PostProps extends PostDetailsProps {
	id: PostId;
}

export interface CreatePostProps {
	text: PostText;
	title: PostTitle;
}

export class Post extends AggregateRoot<PostProps> {
	get postId(): PostId {
		return PostId.create({ value: this._id }).getValue;
	}

	get title(): PostTitle {
		return this.props.title;
	}

	get text(): PostText {
		return this.props.text;
	}

	get slugId(): PostSlugId {
		return this.props.slugId;
	}

	get updatedAt(): Date | string {
		return this.props.updatedAt;
	}

	get createdAt(): Date | string {
		return this.props.createdAt;
	}

	private constructor(props: PostProps, id: UniqueEntityID) {
		super(props, id);
	}

	public static create(
		props: CreatePostProps | PostProps,
		id?: UniqueEntityID
	): Result<Post> {
		const guardArgs: IGuardArgument[] = [
			{ argument: props.text, argumentName: 'text' },
			{ argument: props.title, argumentName: 'title' }
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

		if (guardResult.isFailure) {
			return Result.fail<Post>(guardResult.getErrorValue);
		}

		const defaultValues: CreatePostProps = {
			...props
		};

		const isNewPost = Boolean(id) === false;
		const post = new Post(defaultValues as PostProps, id!);

		if (isNewPost) {
			post.addDomainEvent(new PostCreated(post));
		}

		return Result.ok<Post>(post);
	}
}
