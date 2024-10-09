import { Either } from '@/shared/core/Either';
import { Result } from '@/shared/core/Result';
import { APIErrorMessage } from './APIErrorMessage';

export type APIResponse<T> = Either<APIErrorMessage, Result<T>>;
