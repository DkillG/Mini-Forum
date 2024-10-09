import { UniqueEntityID } from '@/shared/domain/Identifier';
import { ValueObject } from '@/shared/domain/ValueObject';
import { Result } from '@/shared/core/Result';
import { Guard } from '@/shared/core/Guard';

interface PostIdProps {
	value: UniqueEntityID;
}

export class PostId extends ValueObject<PostIdProps> {
	getStringValue(): string {
		return this.props.value!.toString();
	}

	get value(): string {
		return this.props.value.toString();
	}

	private constructor(props: PostIdProps) {
		super(props);
	}

	public static create(props: PostIdProps): Result<PostId> {
		const guardResult = Guard.againstNullOrUndefined(props.value, 'value');
		if (guardResult.isFailure) {
			return Result.fail<PostId>(guardResult.getErrorValue);
		}
		return Result.ok<PostId>(new PostId(props));
	}
}
