import { PostText } from './postText';
import { PostTitle } from './postTitle';
import { PostSlugId } from './postSlugId';
import { Result } from '@/shared/core/Result';
import { ValueObject } from '@/shared/domain/ValueObject';
import { Guard, IGuardArgument } from '@/shared/core/Guard';

export interface PostDetailsProps {
	text: PostText;
	title: PostTitle;
	slugId: PostSlugId;
	updatedAt: Date | string;
	createdAt: Date | string;
}

export class PostDetails extends ValueObject<PostDetailsProps> {
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

	public static create(props: PostDetailsProps): Result<PostDetails> {
		const guardArgs: IGuardArgument[] = [
			{ argument: props.text, argumentName: 'text' },
			{ argument: props.title, argumentName: 'title' },
			{ argument: props.slugId, argumentName: 'slugId' },
			{ argument: props.updatedAt, argumentName: 'updatedAt' },
			{ argument: props.createdAt, argumentName: 'createdAt' }
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);
		if (guardResult.isFailure) {
			return Result.fail<PostDetails>(guardResult.getErrorValue);
		}

		return Result.ok<PostDetails>(new PostDetails({ ...props }));
	}
}
