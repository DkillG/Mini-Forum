export class Result<T> {
	public isSuccess: boolean;
	public isFailure: boolean;

	private _value: T;
	private error: T | string;

	public constructor(isSuccess: boolean, error?: T | string, value?: T) {
		if (isSuccess && error)
			throw new Error(
				'InvalidOperation: A result cannot be successful and contain an error'
			);
		if (!isSuccess && !error)
			throw new Error(
				'InvalidOperation: A failing result needs to contain an error message'
			);

		this.error = error as T;
		this._value = value as T;
		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;

		Object.freeze(this);
	}

	public get getValue(): T {
		if (!this.isSuccess) {
			console.log(this.error);
			throw new Error(
				"Can't get the value of an error result. Use 'errorValue' instead."
			);
		}

		return this._value;
	}

	public get getErrorValue(): T {
		return this.error as T;
	}

	public static ok<K>(value?: K): Result<K> {
		return new Result<K>(true, null as K, value);
	}

	public static fail<K>(error: string): Result<K> {
		return new Result<K>(false, error);
	}

	public static combine<K>(results: Result<K>[]): Result<K> {
		for (const result of results) {
			if (result.isFailure) return result;
		}
		return Result.ok();
	}
}
