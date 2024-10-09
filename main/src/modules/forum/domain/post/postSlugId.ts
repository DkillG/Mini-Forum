import { ValueObject } from '@/shared/domain/ValueObject';
import { Result } from '@/shared/core/Result';
import { Guard } from '@/shared/core/Guard';

interface PostSlugIdProps {
	value: string;
}

export class PostSlugId extends ValueObject<PostSlugIdProps> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: PostSlugIdProps) {
		super(props);
	}

	public static create(props: PostSlugIdProps): Result<PostSlugId> {
		const guardResult = Guard.againstNullOrUndefined(props.value, 'value');
		if (guardResult.isFailure) {
			return Result.fail<PostSlugId>(guardResult.getErrorValue);
		}
		return Result.ok<PostSlugId>(new PostSlugId(props));
	}
}
