import { Result } from '@/shared/core/Result';
import { UseCaseError } from '@/shared/core/UseCaseError';

export class ExamplePostError extends Result<UseCaseError> {
	constructor() {
		super(false, { message: 'This is a error example' } as UseCaseError);
	}
}
