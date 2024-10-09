import { UniqueEntityID } from '../Identifier';

export interface IDomainEvent {
	dateTimeOccurred: Date;
	getAggregateId(): UniqueEntityID;
}
