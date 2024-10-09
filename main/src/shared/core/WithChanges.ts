import { Result } from './Result';

export interface WithChanges<U> {
	changes: Changes<U>;
}

export class Changes<K> {
	private changes: Result<K>[];

	constructor() {
		this.changes = [];
	}

	public addChange(result: Result<K>): void {
		this.changes.push(result);
	}

	public getChangeResult(): Result<K> {
		return Result.combine(this.changes);
	}
}
