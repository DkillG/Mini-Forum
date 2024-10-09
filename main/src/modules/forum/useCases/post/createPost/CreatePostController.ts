/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';
import { CreatePost } from './CreatePost';
import { CreatePostDTO } from './CreatePostDTO';
import { TextUtils } from '@/shared/utils/TextUtils';
import { ExamplePostError } from './CreatePostError';
import { BaseController } from '@/shared/infrastructure/http/models/BaseController';

export class CreatePostController extends BaseController {
	private useCase: CreatePost;

	constructor(useCase: CreatePost) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(req: NextRequest): Promise<any> {
		const { title, text } = await req.json();
		const dto: CreatePostDTO = {
			text: TextUtils.sanitize(text),
			title: TextUtils.sanitize(title)
		};

		try {
			const result = await this.useCase.execute(dto);

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					case ExamplePostError:
						return this.fail(error.getErrorValue);
					default:
						return this.fail(error.getErrorValue);
				}
			} else {
				return this.ok();
			}
		} catch (error: any) {
			this.fail(error);
		}
	}
}
