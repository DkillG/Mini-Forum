/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';
import { GetRecentPosts } from './GetRecentPosts';
import { GetRecentPostsRequestDTO } from './GetRecentPostsRquestDTO';
import { GetRecentPostsResponseDTO } from './GetRecentPostsResponseDTO';
import { PostDetailsMap } from '@/modules/forum/mappers/postDetailsMap';
import { BaseController } from '@/shared/infrastructure/http/models/BaseController';

export class GetRecentPostsController extends BaseController {
	private useCase: GetRecentPosts;

	constructor(useCase: GetRecentPosts) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(req: NextRequest): Promise<any> {

        const possibleSlug = req.nextUrl.searchParams.get('slugId');
		const dto: GetRecentPostsRequestDTO = {
            slugId: possibleSlug ? possibleSlug : undefined,
			offset: Number(req.nextUrl.searchParams.get('offset')),
		};

		try {
			const result = await this.useCase.execute(dto);

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					default:
						return this.fail(error.getErrorValue.message);
				}
			} else {
				const postDetails = result.value.getValue;

				return this.ok<GetRecentPostsResponseDTO>({
					posts: postDetails.map(d => PostDetailsMap.toDTO(d))
				});
			}
		} catch (error: any) {
			return this.fail(error);
		}
	}
}
