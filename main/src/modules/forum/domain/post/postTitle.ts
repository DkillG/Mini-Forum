import { Guard } from '@/shared/core/Guard';
import { Result } from '@/shared/core/Result';
import { ValueObject } from '@/shared/domain/ValueObject';

interface PostTitleProps {
	value: string;
}

export class PostTitle extends ValueObject<PostTitleProps> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: PostTitleProps) {
		super(props);
	}

	public static create(props: PostTitleProps): Result<PostTitle> {
		const nullGuardResult = Guard.againstNullOrUndefined(
			props.value,
			'postTitle'
		);

		if (nullGuardResult.isFailure) {
			return Result.fail<PostTitle>(nullGuardResult.getErrorValue);
		}

		return Result.ok<PostTitle>(new PostTitle(props));
	}
}
