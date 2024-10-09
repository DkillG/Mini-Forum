import { UniqueEntityID } from '@/shared/domain/Identifier';
import { Post } from '../post/post';
import { IDomainEvent } from '@/shared/domain/events/IDomainEvent';

export class PostCreated implements IDomainEvent {
	public post: Post;
	public dateTimeOccurred: Date;

	constructor(post: Post) {
		this.dateTimeOccurred = new Date();
		this.post = post;
	}

	getAggregateId(): UniqueEntityID {
		return this.post.id;
	}
}
