/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
// import { Identifier } from "@/shared/domain/Identifier";
// import { DomainEvents } from "@/shared/domain/events/DomainEvents";

// const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
//   const aggregateId = new Identifier(model[primaryKeyField]);
//   DomainEvents.dispatchEventsForAggregate(aggregateId);
// };

declare const globalThis: {
	prismaGlobal: PrismaClient;
} & typeof global;

class Prisma {
	private static instance: PrismaClient;

	private constructor() {}

	private static createInstance(): PrismaClient {
		const prisma = new PrismaClient();
		Prisma.addHooks(prisma);
		return prisma;
	}

	private static addHooks(prisma: PrismaClient) {
		prisma.$extends({
			query: {
				user: {
					async create(m: any) {
						console.log('user_id', m);
						//dispatchEventsCallback(m, "user_id");
					}
				},
				post: {
					async create(m: any) {
						console.log('post_id', m);
						//dispatchEventsCallback(m, "post_id");
					}
				}
			}
		});
	}

	public static get getInstance(): PrismaClient {
		if (!Prisma.instance) {
			Prisma.instance = globalThis.prismaGlobal ?? Prisma.createInstance();
			if (process.env.NODE_ENV !== 'production') {
				globalThis.prismaGlobal = Prisma.instance;
			}
		}
		return Prisma.instance;
	}
}

export default Prisma;
